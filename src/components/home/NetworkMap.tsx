"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";

interface Node { x: number; y: number; color: string; label: string; size: number; }
interface Ripple { x: number; y: number; t: number; }
interface RawNode { px: number; py: number; color: string; label: string; size: number; }

const GLOBAL_NODES: RawNode[] = [
  { px:0.36, py:0.46, color:"#F97316", label:"India HQ",   size:11 },
  { px:0.79, py:0.63, color:"#22c55e", label:"Australia",  size: 7 },
  { px:0.73, py:0.49, color:"#a855f7", label:"Indonesia",  size: 7 },
  { px:0.52, py:0.73, color:"#22c55e", label:"S. Africa",  size: 7 },
  { px:0.55, py:0.36, color:"#a855f7", label:"Russia",     size: 6 },
  { px:0.28, py:0.30, color:"#3b82f6", label:"Europe",     size: 7 },
  { px:0.16, py:0.47, color:"#3b82f6", label:"Americas",   size: 6 },
];
const INDIA_NODES: RawNode[] = [
  { px:0.42, py:0.25, color:"#3b82f6", label:"Delhi",       size: 8 },
  { px:0.32, py:0.54, color:"#F97316", label:"Mumbai HQ",   size:11 },
  { px:0.53, py:0.72, color:"#22c55e", label:"Chennai Port",size: 7 },
  { px:0.60, py:0.38, color:"#D97706", label:"Dhanbad",     size: 7 },
  { px:0.59, py:0.54, color:"#3b82f6", label:"Kolkata",     size: 8 },
  { px:0.55, py:0.64, color:"#22c55e", label:"Vizag Port",  size: 7 },
  { px:0.38, py:0.64, color:"#3b82f6", label:"Pune",        size: 6 },
];

function drawHex(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, fill: string, stroke: string) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i - Math.PI / 6;
    const x = cx + r * Math.cos(a);
    const y = cy + r * Math.sin(a);
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = fill;   ctx.fill();
  ctx.strokeStyle = stroke; ctx.lineWidth = 0.5; ctx.stroke();
}

export default function NetworkMap() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const inView     = useInView(sectionRef, { once: true, margin: "-100px" });
  const [mode, setMode] = useState<"global"|"india">("global");
  const mouseRef   = useRef({ x: -999, y: -999 });
  const ripplesRef = useRef<Ripple[]>([]);
  const modeRef    = useRef(mode);
  modeRef.current  = mode;

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#f5f5f5"; ctx.fillRect(0, 0, W, H);

    const HEX = 17, hW = HEX * Math.sqrt(3), hH = HEX * 1.5;
    const { x: mx, y: my } = mouseRef.current;
    const ripples = ripplesRef.current;

    for (let row = 0; row <= Math.ceil(H / hH) + 1; row++) {
      for (let col = 0; col <= Math.ceil(W / hW) + 1; col++) {
        const cx = col * hW + (row % 2 ? hW / 2 : 0);
        const cy = row * hH;
        const dist = Math.hypot(cx - mx, cy - my);
        const lit  = Math.max(0, 1 - dist / 95);
        const ripLit = ripples.reduce((acc, rp) => {
          const rd   = Math.hypot(cx - rp.x, cy - rp.y);
          const wave = Math.abs(rd - rp.t * 90);
          return acc + Math.max(0, 1 - wave / 22) * 0.65 * (1 - rp.t / 1.2);
        }, 0);
        const total = Math.min(1, lit + ripLit);
        const fill  = total > 0.02
          ? `rgba(249,115,22,${0.03 + total * 0.26})`
          : "rgba(0,0,0,0.05)";
        const stroke = total > 0.05
          ? `rgba(249,115,22,${total * 0.38})`
          : "rgba(249,115,22,0.05)";
        drawHex(ctx, cx, cy, HEX - 1, fill, stroke);
      }
    }

    const rawNodes = modeRef.current === "global" ? GLOBAL_NODES : INDIA_NODES;
    const nodes: Node[] = rawNodes.map((n) => ({ ...n, x: n.px * W, y: n.py * H }));

    // connections
    nodes.forEach((a, i) => nodes.slice(i + 1).forEach((b) => {
      if (Math.hypot(a.x - b.x, a.y - b.y) < W * 0.38) {
        ctx.beginPath(); ctx.moveTo(a.x, a.y);
        const cx2 = (a.x + b.x) / 2 + (a.y - b.y) * 0.12;
        const cy2 = (a.y + b.y) / 2 + (b.x - a.x) * 0.12;
        ctx.quadraticCurveTo(cx2, cy2, b.x, b.y);
        ctx.strokeStyle = "rgba(249,115,22,0.18)"; ctx.lineWidth = 1; ctx.stroke();
      }
    }));

    // cursor dashed line to nearest node
    if (mx > 0 && mx < W) {
      const near = nodes.reduce((a, b) =>
        Math.hypot(b.x - mx, b.y - my) < Math.hypot(a.x - mx, a.y - my) ? b : a);
      ctx.beginPath(); ctx.moveTo(near.x, near.y); ctx.lineTo(mx, my);
      ctx.strokeStyle = "rgba(249,115,22,0.45)"; ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]); ctx.stroke(); ctx.setLineDash([]);
    }

    // draw nodes
    nodes.forEach((n) => {
      const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.size * 5);
      g.addColorStop(0, n.color + "55"); g.addColorStop(1, "transparent");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(n.x, n.y, n.size * 5, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
      ctx.fillStyle = n.color; ctx.fill();
      ctx.beginPath(); ctx.arc(n.x, n.y, n.size + 4, 0, Math.PI * 2);
      ctx.strokeStyle = n.color + "55"; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.fillStyle = "rgba(0,0,0,0.75)"; ctx.font = "11px system-ui";
      ctx.textAlign = "center"; ctx.fillText(n.label, n.x, n.y + n.size + 15);
    });

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

  const legend = [
    { color:"#F97316", label:"Headquarters" },
    { color:"#3b82f6", label:"Offices"      },
    { color:"#22c55e", label:"Ports"        },
    { color:"#a855f7", label:"Partners"     },
    { color:"#D97706", label:"Subsidiaries" },
  ];

  return (
    <section ref={sectionRef} className="py-24" style={{ background: "#f9f9f9" }}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}}
          transition={{ duration:0.5 }} className="text-center mb-10"
        >
          <div className="section-tag">GLOBAL PRESENCE</div>
          <h2 className="text-3xl md:text-4xl font-black mb-3">
            Our <span style={{ color:"var(--orange)" }}>Network</span>
          </h2>
          <p className="text-sm" style={{ color:"rgba(0,0,0,0.5)" }}>
            Move your cursor over the map · Click to send energy ripples
          </p>
        </motion.div>

        {/* Toggle */}
        <div className="flex justify-center mb-8">
          <div className="flex rounded-lg overflow-hidden" style={{ border:"1px solid rgba(0,0,0,0.12)", background:"rgba(0,0,0,0.04)" }}>
            {(["global","india"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className="px-5 py-2.5 text-xs font-bold transition-all duration-200"
                style={{
                  background: mode===m ? "var(--orange)" : "transparent",
                  color:      mode===m ? "white" : "rgba(0,0,0,0.55)",
                }}
              >
                {m==="global" ? "🌍 Global Network" : "🇮🇳 Pan India Network"}
              </button>
            ))}
          </div>
        </div>

        {/* Canvas */}
        <motion.div
          initial={{ opacity:0, scale:0.97 }} animate={inView?{opacity:1,scale:1}:{}}
          transition={{ duration:0.6, delay:0.2 }}
          className="rounded-2xl overflow-hidden"
          style={{ border:"1px solid rgba(249,115,22,0.1)" }}
        >
          <canvas ref={canvasRef} className="w-full" style={{ height:380, display:"block" }} />
        </motion.div>

        {/* Legend */}
        <div className="flex flex-wrap gap-5 justify-center mt-6">
          {legend.map((l) => (
            <div key={l.label} className="flex items-center gap-2 text-xs" style={{ color:"rgba(0,0,0,0.6)" }}>
              <div className="w-2.5 h-2.5 rounded-full" style={{ background:l.color, boxShadow:`0 0 6px ${l.color}` }} />
              {l.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
