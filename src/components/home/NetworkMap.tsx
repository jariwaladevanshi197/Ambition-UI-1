"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Globe, MapPin } from "lucide-react";

interface Node { x: number; y: number; color: string; label: string; size: number; }
interface Ripple { x: number; y: number; t: number; }
interface RawNode { id: string; px: number; py: number; color: string; label: string; size: number; }
interface Route { from: string; to: string; type: "hub" | "maritime" | "global"; }

// Global nodes: Africa, Middle East, Asia, Australia (Russia, Europe, Americas removed)
const GLOBAL_NODES: RawNode[] = [
  { id: "surat",        px: 0.58, py: 0.45, color: "#F97316", label: "Surat HQ",     size: 11 },
  { id: "dubai",        px: 0.50, py: 0.39, color: "#3b82f6", label: "Dubai",        size: 7 },
  { id: "singapore",    px: 0.70, py: 0.55, color: "#3b82f6", label: "Singapore",    size: 7 },
  { id: "nigeria",      px: 0.36, py: 0.51, color: "#3b82f6", label: "Nigeria",      size: 7 },
  { id: "zambia",       px: 0.48, py: 0.64, color: "#3b82f6", label: "Zambia",       size: 6 },
  { id: "zimbabwe",     px: 0.49, py: 0.69, color: "#3b82f6", label: "Zimbabwe",     size: 7 },
  { id: "indonesia",    px: 0.74, py: 0.59, color: "#a855f7", label: "Indonesia",    size: 8 },
  { id: "safrica",      px: 0.47, py: 0.78, color: "#a855f7", label: "South Africa", size: 8 },
  { id: "australia",    px: 0.82, py: 0.71, color: "#a855f7", label: "Australia",    size: 7 },
  { id: "kenya",        px: 0.53, py: 0.55, color: "#a855f7", label: "Kenya",        size: 7 },
  { id: "nepal",        px: 0.62, py: 0.37, color: "#a855f7", label: "Nepal",        size: 6 },
];

const GLOBAL_ROUTES: Route[] = [
  // Major maritime coal import corridors directly into Surat HQ
  { from: "indonesia", to: "surat",     type: "maritime" },
  { from: "safrica",   to: "surat",     type: "maritime" },
  { from: "australia", to: "surat",     type: "maritime" },

  // Key international trading desks & regional hubs
  { from: "surat",     to: "dubai",     type: "hub" },
  { from: "surat",     to: "singapore", type: "hub" },
  { from: "surat",     to: "nepal",     type: "hub" },
  { from: "surat",     to: "kenya",     type: "hub" },

  // African trade & minerals sourcing corridor
  { from: "kenya",     to: "zambia",    type: "global" },
  { from: "zambia",    to: "zimbabwe",  type: "global" },
  { from: "zimbabwe",  to: "safrica",   type: "global" },
  { from: "kenya",     to: "nigeria",   type: "global" },

  // Asian cross-trading corridor
  { from: "singapore", to: "indonesia", type: "global" },
  { from: "dubai",     to: "singapore", type: "global" },
];

// Pan-India Nodes: Clear state branches & coastal ports
const INDIA_NODES: RawNode[] = [
  { id: "surat",        px: 0.36, py: 0.51, color: "#F97316", label: "Surat HQ",       size: 11 },
  { id: "rajasthan",    px: 0.39, py: 0.32, color: "#3b82f6", label: "Rajasthan",      size: 7 },
  { id: "chhattisgarh", px: 0.54, py: 0.49, color: "#3b82f6", label: "Chhattisgarh",   size: 7 },
  { id: "kolkata",      px: 0.69, py: 0.45, color: "#3b82f6", label: "Kolkata",        size: 8 },
  { id: "kandla",       px: 0.30, py: 0.45, color: "#22c55e", label: "Kandla / Hazira",size: 8 },
  { id: "mumbai",       px: 0.37, py: 0.60, color: "#22c55e", label: "Mumbai Port",    size: 8 },
  { id: "mangalore",    px: 0.40, py: 0.74, color: "#22c55e", label: "Mangalore Port", size: 8 },
  { id: "kochi",        px: 0.43, py: 0.85, color: "#22c55e", label: "Kochi Port",     size: 7 },
  { id: "tuticorin",    px: 0.48, py: 0.88, color: "#22c55e", label: "Tuticorin Port", size: 7 },
  { id: "vizag",        px: 0.58, py: 0.63, color: "#22c55e", label: "Vizag Port",     size: 8 },
  { id: "paradip",      px: 0.66, py: 0.54, color: "#22c55e", label: "Paradip Port",   size: 8 },
];

// Structured, clear routes for Pan-India (Hub transit + Maritime coastal lane)
const INDIA_ROUTES: Route[] = [
  // Central logistics corridors (Surat HQ Hub)
  { from: "surat", to: "mumbai",       type: "hub" },
  { from: "surat", to: "kandla",       type: "hub" },
  { from: "surat", to: "rajasthan",    type: "hub" },
  { from: "surat", to: "chhattisgarh", type: "hub" },
  { from: "surat", to: "mangalore",    type: "hub" },
  { from: "chhattisgarh", to: "kolkata", type: "hub" },
  { from: "chhattisgarh", to: "vizag",   type: "hub" },
  { from: "rajasthan", to: "kandla",     type: "hub" },

  // Maritime shipping routes (Ports corridor)
  { from: "kandla", to: "mumbai",      type: "maritime" },
  { from: "mumbai", to: "mangalore",   type: "maritime" },
  { from: "mangalore", to: "kochi",    type: "maritime" },
  { from: "kochi", to: "tuticorin",    type: "maritime" },
  { from: "tuticorin", to: "vizag",    type: "maritime" },
  { from: "vizag", to: "paradip",      type: "maritime" },
  { from: "paradip", to: "kolkata",    type: "maritime" },
];

// Geometric contour points of India outline (Pan India mode)
const INDIA_CONTOUR: [number, number][] = [
  [0.46, 0.12], [0.49, 0.10], [0.52, 0.14],
  [0.47, 0.22],
  [0.37, 0.28], [0.32, 0.36],
  [0.26, 0.43], [0.23, 0.47], [0.28, 0.52], [0.33, 0.53],
  [0.34, 0.59], [0.36, 0.66], [0.38, 0.74], [0.41, 0.83],
  [0.45, 0.90], [0.48, 0.92],
  [0.51, 0.87], [0.54, 0.79], [0.57, 0.71], [0.62, 0.61],
  [0.66, 0.53], [0.69, 0.48], [0.72, 0.44],
  [0.76, 0.37], [0.81, 0.35], [0.77, 0.31],
  [0.66, 0.33], [0.57, 0.29], [0.50, 0.23]
];

// Continent outlines for Global Network mode:
const GLOBAL_CONTINENTS: [number, number][][] = [
  // 1. Africa
  [
    [0.34, 0.35], [0.42, 0.33], [0.48, 0.35], [0.52, 0.41],
    [0.55, 0.48], [0.53, 0.56], [0.52, 0.65], [0.50, 0.73],
    [0.47, 0.81], [0.44, 0.80], [0.42, 0.70], [0.42, 0.60],
    [0.36, 0.52], [0.31, 0.46], [0.31, 0.40]
  ],
  // 2. Arabian Peninsula / Middle East
  [
    [0.48, 0.34], [0.52, 0.35], [0.54, 0.39], [0.53, 0.43], [0.49, 0.42], [0.47, 0.38]
  ],
  // 3. Indian Subcontinent & South Asia
  [
    [0.57, 0.35], [0.63, 0.36], [0.64, 0.42], [0.61, 0.49], [0.58, 0.52], [0.57, 0.47], [0.55, 0.41]
  ],
  // 4. Southeast Asia & Indonesian Archipelago
  [
    [0.67, 0.42], [0.69, 0.48], [0.70, 0.55], [0.68, 0.53], [0.66, 0.46]
  ],
  [
    [0.70, 0.57], [0.76, 0.58], [0.79, 0.62], [0.75, 0.63], [0.70, 0.60]
  ],
  // 5. Australia
  [
    [0.78, 0.66], [0.83, 0.64], [0.87, 0.67], [0.88, 0.74], [0.85, 0.78], [0.80, 0.78], [0.77, 0.72]
  ]
];

function drawContour(ctx: CanvasRenderingContext2D, points: [number, number][], W: number, H: number) {
  ctx.save();
  ctx.beginPath();
  points.forEach(([px, py], idx) => {
    const x = px * W, y = py * H;
    idx === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.closePath();

  ctx.fillStyle = "rgba(249, 115, 22, 0.035)";
  ctx.fill();
  ctx.strokeStyle = "rgba(249, 115, 22, 0.22)";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.shadowColor = "rgba(0, 0, 0, 0.04)";
  ctx.shadowBlur = 10;
  ctx.stroke();
  ctx.restore();
}

function drawHex(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, fill: string, stroke: string) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i - Math.PI / 6;
    const x = cx + r * Math.cos(a);
    const y = cy + r * Math.sin(a);
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.strokeStyle = stroke;
  ctx.lineWidth = 0.5;
  ctx.stroke();
}

export default function NetworkMap() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const inView     = useInView(sectionRef, { once: true, margin: "-100px" });
  const [mode, setMode] = useState<"india" | "global">("india");
  const mouseRef   = useRef({ x: -999, y: -999 });
  const ripplesRef = useRef<Ripple[]>([]);
  const pulseOffsetRef = useRef(0);
  const modeRef    = useRef(mode);
  modeRef.current  = mode;

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    // Warm, high-contrast canvas backdrop
    ctx.fillStyle = "#fafafa";
    ctx.fillRect(0, 0, W, H);

    const isIndia = modeRef.current === "india";

    // ── 1. Draw Map Silhouettes (India outline or World Continents) ──
    if (isIndia) {
      drawContour(ctx, INDIA_CONTOUR, W, H);
    } else {
      GLOBAL_CONTINENTS.forEach(contour => {
        drawContour(ctx, contour, W, H);
      });
    }

    // ── 2. Background Hex grid with mouse glow & energy ripples ──
    const HEX = 18, hW = HEX * Math.sqrt(3), hH = HEX * 1.5;
    const { x: mx, y: my } = mouseRef.current;
    const ripples = ripplesRef.current;

    for (let row = 0; row <= Math.ceil(H / hH) + 1; row++) {
      for (let col = 0; col <= Math.ceil(W / hW) + 1; col++) {
        const cx = col * hW + (row % 2 ? hW / 2 : 0);
        const cy = row * hH;
        const dist = Math.hypot(cx - mx, cy - my);
        const lit  = Math.max(0, 1 - dist / 110);
        const ripLit = ripples.reduce((acc, rp) => {
          const rd   = Math.hypot(cx - rp.x, cy - rp.y);
          const wave = Math.abs(rd - rp.t * 90);
          return acc + Math.max(0, 1 - wave / 24) * 0.7 * (1 - rp.t / 1.2);
        }, 0);
        const total = Math.min(1, lit + ripLit);
        const fill  = total > 0.02
          ? `rgba(249,115,22,${0.04 + total * 0.28})`
          : "rgba(0,0,0,0.025)";
        const stroke = total > 0.05
          ? `rgba(249,115,22,${total * 0.35})`
          : "rgba(0,0,0,0.04)";
        drawHex(ctx, cx, cy, HEX - 1, fill, stroke);
      }
    }

    // ── 3. Resolve Active Nodes and Routes ──
    const rawNodes = isIndia ? INDIA_NODES : GLOBAL_NODES;
    const routes   = isIndia ? INDIA_ROUTES : GLOBAL_ROUTES;
    const nodeMap = new Map<string, Node>();

    rawNodes.forEach((n) => {
      nodeMap.set(n.id, { ...n, x: n.px * W, y: n.py * H });
    });

    // ── 4. Draw Clear, High-Contrast Connection Lines ──
    pulseOffsetRef.current = (pulseOffsetRef.current + 0.008) % 1;
    const pOffset = pulseOffsetRef.current;

    routes.forEach((rt) => {
      const a = nodeMap.get(rt.from);
      const b = nodeMap.get(rt.to);
      if (!a || !b) return;

      const midX = (a.x + b.x) / 2 + (a.y - b.y) * (rt.type === "maritime" ? 0.12 : 0.06);
      const midY = (a.y + b.y) / 2 + (b.x - a.x) * (rt.type === "maritime" ? 0.12 : 0.06);

      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.quadraticCurveTo(midX, midY, b.x, b.y);

      if (rt.type === "maritime") {
        // Crisp green coastal sea route & global coal import sea lanes
        ctx.strokeStyle = "rgba(34, 197, 94, 0.55)";
        ctx.lineWidth = 2.4;
        ctx.setLineDash([6, 4]);
      } else if (rt.type === "hub") {
        // High-contrast orange inland transit corridors & primary international desks
        ctx.strokeStyle = "rgba(249, 115, 22, 0.48)";
        ctx.lineWidth = 2.2;
        ctx.setLineDash([]);
      } else {
        // Intercontinental trade routes
        ctx.strokeStyle = "rgba(59, 130, 246, 0.4)";
        ctx.lineWidth = 1.8;
        ctx.setLineDash([5, 4]);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Animated energy flow pulses along supply corridors
      const t = (pOffset + (a.x % 100) / 100) % 1;
      const px = (1 - t) * (1 - t) * a.x + 2 * (1 - t) * t * midX + t * t * b.x;
      const py = (1 - t) * (1 - t) * a.y + 2 * (1 - t) * t * midY + t * t * b.y;

      ctx.beginPath();
      ctx.arc(px, py, rt.type === "maritime" ? 3.2 : 2.5, 0, Math.PI * 2);
      ctx.fillStyle = rt.type === "maritime" ? "#22c55e" : "#F97316";
      ctx.shadowColor = rt.type === "maritime" ? "#22c55e" : "#F97316";
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    // ── 5. Cursor Interaction Dash ──
    if (mx > 0 && mx < W) {
      const nodesArr = Array.from(nodeMap.values());
      const near = nodesArr.reduce((prev, curr) =>
        Math.hypot(curr.x - mx, curr.y - my) < Math.hypot(prev.x - mx, prev.y - my) ? curr : prev);
      ctx.beginPath();
      ctx.moveTo(near.x, near.y);
      ctx.lineTo(mx, my);
      ctx.strokeStyle = "rgba(249,115,22,0.55)";
      ctx.lineWidth = 1.2;
      ctx.setLineDash([4, 5]);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // ── 6. Draw Nodes with Glow + High-Legibility Pill Badges ──
    Array.from(nodeMap.values()).forEach((n) => {
      // Ambient radial aura
      const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.size * 3.5);
      g.addColorStop(0, n.color + "45");
      g.addColorStop(1, "transparent");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.size * 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Outer ring
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.size + 3.5, 0, Math.PI * 2);
      ctx.strokeStyle = n.color + "70";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Inner solid node
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
      ctx.fillStyle = n.color;
      ctx.fill();

      // Center white dot for hub
      if (n.size >= 10) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
      }

      // Crisp label pill for razor-sharp legibility
      ctx.font = "bold 11px system-ui, -apple-system, sans-serif";
      const textMetrics = ctx.measureText(n.label);
      const tw = textMetrics.width;
      const th = 18;
      const lx = n.x - tw / 2 - 6;
      const ly = n.y + n.size + 7;

      ctx.save();
      ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
      ctx.strokeStyle = "rgba(0, 0, 0, 0.1)";
      ctx.lineWidth = 1;
      ctx.shadowColor = "rgba(0, 0, 0, 0.08)";
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.roundRect(lx, ly, tw + 12, th, 9);
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      ctx.fillStyle = "#111827";
      ctx.textAlign = "center";
      ctx.fillText(n.label, n.x, ly + 13);
    });

    // Ripple updates
    ripples.forEach((rp) => { rp.t += 0.016; });
    ripplesRef.current = ripples.filter((rp) => rp.t < 1.2);

    requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - r.left) * (canvas.width  / r.width),
        y: (e.clientY - r.top)  * (canvas.height / r.height),
      };
    };
    const onClick = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      ripplesRef.current.push({
        x: (e.clientX - r.left) * (canvas.width  / r.width),
        y: (e.clientY - r.top)  * (canvas.height / r.height),
        t: 0,
      });
    };
    const onLeave = () => { mouseRef.current = { x: -999, y: -999 }; };

    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("click",     onClick);
    canvas.addEventListener("mouseleave",onLeave);

    const raf = requestAnimationFrame(draw);
    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("click",     onClick);
      canvas.removeEventListener("mouseleave",onLeave);
      cancelAnimationFrame(raf);
    };
  }, [draw]);

  // Merged "Offices" & "Subsidiaries" into "Offices & Subs"
  const legend = [
    { color: "#F97316", label: "Headquarters" },
    { color: "#3b82f6", label: "Offices & Subs" },
    { color: "#22c55e", label: "Ports" },
    { color: "#a855f7", label: "Partners" },
  ];

  return (
    <section ref={sectionRef} className="pt-12 pb-24" style={{ background: "#f9f9f9" }}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity:0, y:20 }} animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ duration:0.5 }} className="text-center mb-10"
        >
          <div className="section-tag">SUPPLY CHAIN & LOGISTICS</div>
          <h2 className="text-3xl md:text-4xl font-black mb-3">
            Our <span style={{ color:"var(--orange)" }}>Network</span>
          </h2>
          <p className="text-sm max-w-xl mx-auto" style={{ color:"rgba(0,0,0,0.55)" }}>
            Explore our multimodal supply chain network across major ports, state branches, and international origins.
          </p>
        </motion.div>

        {/* Toggle */}
        <div className="flex justify-center mb-8">
          <div className="flex rounded-xl p-1 overflow-hidden" style={{ border:"1px solid rgba(0,0,0,0.12)", background:"white", boxShadow:"0 2px 8px rgba(0,0,0,0.03)" }}>
            {(["india", "global"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer"
                style={{
                  background: mode === m ? "var(--orange)" : "transparent",
                  color:      mode === m ? "white" : "rgba(0,0,0,0.6)",
                  boxShadow:  mode === m ? "0 4px 12px rgba(249,115,22,0.25)" : "none",
                }}
              >
                {m === "india" ? <MapPin size={14} /> : <Globe size={14} />}
                {m === "india" ? "Pan India Network" : "Global Network"}
              </button>
            ))}
          </div>
        </div>

        {/* Canvas */}
        <motion.div
          initial={{ opacity:0, scale:0.98 }} animate={inView ? { opacity:1, scale:1 } : {}}
          transition={{ duration:0.6, delay:0.2 }}
          className="rounded-3xl overflow-hidden shadow-xl"
          style={{ border:"1px solid rgba(0,0,0,0.08)", background:"white" }}
        >
          <canvas ref={canvasRef} className="w-full" style={{ height: 460, display:"block" }} />
        </motion.div>

        {/* Legend */}
        <div className="flex flex-wrap gap-6 justify-center mt-7">
          {legend.map((l) => (
            <div key={l.label} className="flex items-center gap-2 text-xs font-semibold" style={{ color:"rgba(0,0,0,0.7)" }}>
              <div className="w-3 h-3 rounded-full" style={{ background:l.color, boxShadow:`0 0 8px ${l.color}66` }} />
              {l.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
