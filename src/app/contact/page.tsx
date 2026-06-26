"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Send } from "lucide-react";

const locations = [
  { label:"Mumbai — HQ",     color:"#F97316", px:0.32, py:0.54 },
  { label:"Delhi — Office",  color:"#3b82f6", px:0.42, py:0.25 },
  { label:"Kolkata — East",  color:"#3b82f6", px:0.59, py:0.54 },
  { label:"Vizag — Port",    color:"#22c55e", px:0.55, py:0.64 },
  { label:"Dhanbad — Mining",color:"#D97706", px:0.60, py:0.38 },
];

interface Particle { x:number; y:number; vx:number; vy:number; life:number; maxLife:number; color:string; size:number; }

function ContactMap() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const mouseRef   = useRef({ x:-999, y:-999, inside:false });
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf: number;
    let t = 0;

    /* ── mouse tracking ── */
    const toCanvas = (cx:number, cy:number) => {
      const r = canvas.getBoundingClientRect();
      return {
        x: (cx - r.left) * (canvas.width  / r.width),
        y: (cy - r.top)  * (canvas.height / r.height),
      };
    };
    const onMove  = (e:MouseEvent) => { const p = toCanvas(e.clientX, e.clientY); mouseRef.current = { ...p, inside:true }; };
    const onLeave = () => { mouseRef.current = { x:-999, y:-999, inside:false }; };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    /* ── spawn particles near cursor ── */
    const spawnParticles = (mx:number, my:number, W:number, H:number) => {
      if (!mouseRef.current.inside) return;
      const colors = ["#F97316","#D97706","#fb923c","#fed7aa"];
      for (let i = 0; i < 2; i++) {
        particlesRef.current.push({
          x: mx + (Math.random()-0.5)*16,
          y: my + (Math.random()-0.5)*16,
          vx: (Math.random()-0.5)*1.2,
          vy: (Math.random()-0.5)*1.2 - 0.4,
          life: 0,
          maxLife: 40 + Math.random()*30,
          color: colors[Math.floor(Math.random()*colors.length)],
          size:  1.5 + Math.random()*2,
        });
      }
      // cap
      if (particlesRef.current.length > 200) particlesRef.current.splice(0, 20);
    };

    const draw = () => {
      const W = canvas.width  = canvas.offsetWidth;
      const H = canvas.height = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#0a0a0a"; ctx.fillRect(0, 0, W, H);

      const { x:mx, y:my, inside } = mouseRef.current;

      /* ── 1. Hex grid — illuminate near cursor ── */
      const HEX = 14, hW = HEX * Math.sqrt(3), hH = HEX * 1.5;
      for (let row = 0; row <= Math.ceil(H/hH)+1; row++) {
        for (let col = 0; col <= Math.ceil(W/hW)+1; col++) {
          const cx = col*hW + (row%2 ? hW/2 : 0), cy = row*hH;
          const dist = Math.hypot(cx-mx, cy-my);
          const lit  = inside ? Math.max(0, 1 - dist/100) : 0;
          ctx.beginPath();
          for (let k = 0; k < 6; k++) {
            const a = (Math.PI/3)*k - Math.PI/6;
            k===0 ? ctx.moveTo(cx+(HEX-1)*Math.cos(a), cy+(HEX-1)*Math.sin(a))
                  : ctx.lineTo(cx+(HEX-1)*Math.cos(a), cy+(HEX-1)*Math.sin(a));
          }
          ctx.closePath();
          ctx.fillStyle   = lit > 0.02 ? `rgba(249,115,22,${0.02 + lit*0.22})` : "rgba(255,255,255,0.018)";
          ctx.strokeStyle = lit > 0.05 ? `rgba(249,115,22,${lit*0.5})`          : "rgba(249,115,22,0.05)";
          ctx.lineWidth = 0.5;
          ctx.fill(); ctx.stroke();
        }
      }

      /* ── 2. Cursor spotlight ── */
      if (inside) {
        const spot = ctx.createRadialGradient(mx, my, 0, mx, my, 160);
        spot.addColorStop(0, "rgba(249,115,22,0.07)");
        spot.addColorStop(1, "transparent");
        ctx.fillStyle = spot;
        ctx.beginPath(); ctx.arc(mx, my, 160, 0, Math.PI*2); ctx.fill();
      }

      /* ── 3. India outline ── */
      ctx.beginPath();
      const pts = [[.35,.1],[.55,.08],[.7,.25],[.72,.45],[.6,.65],[.5,.85],[.45,.9],[.35,.75],[.25,.55],[.2,.35],[.28,.2]];
      pts.forEach(([px,py],i) => i===0 ? ctx.moveTo(px*W,py*H) : ctx.lineTo(px*W,py*H));
      ctx.closePath();
      ctx.strokeStyle = "rgba(249,115,22,0.25)"; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.fillStyle   = "rgba(249,115,22,0.03)";  ctx.fill();

      /* ── 4. Connection lines from all nodes to cursor ── */
      if (inside) {
        locations.forEach(loc => {
          const nx = loc.px*W, ny = loc.py*H;
          const dist = Math.hypot(nx-mx, ny-my);
          const alpha = Math.max(0, 1 - dist/350) * 0.5;
          if (alpha < 0.02) return;
          ctx.beginPath(); ctx.moveTo(nx, ny); ctx.lineTo(mx, my);
          ctx.strokeStyle = `rgba(249,115,22,${alpha})`;
          ctx.lineWidth   = 1;
          ctx.setLineDash([4,6]); ctx.stroke(); ctx.setLineDash([]);
        });
      }

      /* ── 5. Location dots with pulse + cursor proximity glow ── */
      locations.forEach((loc, i) => {
        const nx = loc.px*W, ny = loc.py*H;
        const dist  = inside ? Math.hypot(nx-mx, ny-my) : 9999;
        const prox  = Math.max(0, 1 - dist/180);   // 0→1 as cursor approaches
        const phase = (t + i*0.4) % 1;

        // pulse ring
        const ring = ctx.createRadialGradient(nx, ny, 0, nx, ny, 45*phase+8);
        ring.addColorStop(0,   loc.color+"00");
        ring.addColorStop(0.5, loc.color+Math.floor((1-phase)*60).toString(16).padStart(2,"0"));
        ring.addColorStop(1,   loc.color+"00");
        ctx.fillStyle = ring;
        ctx.beginPath(); ctx.arc(nx, ny, 55*phase+8, 0, Math.PI*2); ctx.fill();

        // proximity burst
        if (prox > 0.05) {
          const burst = ctx.createRadialGradient(nx, ny, 0, nx, ny, 40*prox);
          burst.addColorStop(0, loc.color+Math.floor(prox*120).toString(16).padStart(2,"0"));
          burst.addColorStop(1, "transparent");
          ctx.fillStyle = burst;
          ctx.beginPath(); ctx.arc(nx, ny, 40*prox, 0, Math.PI*2); ctx.fill();
        }

        // core glow
        const g = ctx.createRadialGradient(nx, ny, 0, nx, ny, 22+prox*14);
        g.addColorStop(0, loc.color+"90"); g.addColorStop(1, "transparent");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(nx, ny, 22+prox*14, 0, Math.PI*2); ctx.fill();

        // dot
        const dotR = 6 + prox*4;
        ctx.beginPath(); ctx.arc(nx, ny, dotR, 0, Math.PI*2);
        ctx.fillStyle = loc.color; ctx.fill();

        // label — brighter when hovered
        ctx.fillStyle = prox>0.3 ? "white" : "rgba(255,255,255,0.8)";
        ctx.font = `${prox>0.3?"bold ":""}${10+prox*2}px system-ui`;
        ctx.textAlign = "center";
        ctx.fillText(loc.label, nx, ny+dotR+12);
      });

      /* ── 6. Particles ── */
      spawnParticles(mx, my, W, H);
      particlesRef.current = particlesRef.current.filter(p => p.life < p.maxLife);
      particlesRef.current.forEach(p => {
        p.life++;
        p.x  += p.vx;  p.y  += p.vy;
        p.vy += 0.03;   // gentle gravity
        p.vx *= 0.97;
        const alpha = 1 - p.life/p.maxLife;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size*(1-p.life/p.maxLife*0.5), 0, Math.PI*2);
        ctx.fillStyle = p.color + Math.floor(alpha*255).toString(16).padStart(2,"0");
        ctx.fill();
      });

      /* ── 7. Cursor crosshair dot ── */
      if (inside) {
        ctx.beginPath(); ctx.arc(mx, my, 4, 0, Math.PI*2);
        ctx.fillStyle = "rgba(249,115,22,0.9)"; ctx.fill();
        ctx.beginPath(); ctx.arc(mx, my, 8, 0, Math.PI*2);
        ctx.strokeStyle = "rgba(249,115,22,0.4)"; ctx.lineWidth = 1; ctx.stroke();
      }

      t += 0.008;
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" style={{ display:"block", cursor:"none" }} />;
}

export default function ContactPage() {
  const [form, setForm] = useState({ name:"", email:"", type:"Coal Trading Inquiry", message:"" });
  const [sent, setSent] = useState(false);

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="pt-16 min-h-screen" style={{ background:"var(--offwhite)" }}>
      <div className="grid grid-cols-1 md:grid-cols-2" style={{ minHeight:"calc(100vh - 64px)" }}>

        {/* Map side */}
        <div className="relative" style={{ background:"#e8e8e8", minHeight:400 }}>
          <ContactMap />
          <div className="absolute top-6 left-6">
            <div className="section-tag">OUR LOCATIONS</div>
          </div>
        </div>

        {/* Form side */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <motion.div
            initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.6 }}
            className="w-full max-w-md mx-auto"
          >
            <div className="rounded-2xl p-8 shadow-sm"
                 style={{ background:"white", border:"1px solid rgba(249,115,22,0.15)" }}>
              <h1 className="text-2xl font-black mb-1" style={{ color:"var(--text-primary)" }}>Get In Touch</h1>
              <p className="text-sm mb-7" style={{ color:"var(--text-secondary)" }}>
                Tell us about your requirements and we'll connect you with the right team.
              </p>

              {sent ? (
                <motion.div initial={{ scale:0.9, opacity:0 }} animate={{ scale:1, opacity:1 }}
                            className="text-center py-10">
                  <div className="text-4xl mb-3">✅</div>
                  <div className="font-bold" style={{ color:"var(--text-primary)" }}>Inquiry Sent!</div>
                  <div className="text-sm mt-1" style={{ color:"var(--text-secondary)" }}>
                    We'll get back to you within 24 hours.
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handle} className="flex flex-col gap-4">
                  {[
                    { label:"FULL NAME",      id:"name",  type:"text",  placeholder:"Your Name"         },
                    { label:"EMAIL ADDRESS",  id:"email", type:"email", placeholder:"you@company.com"   },
                  ].map((f) => (
                    <div key={f.id}>
                      <label className="block text-[10px] font-bold mb-1.5 tracking-wider"
                             style={{ color:"var(--text-secondary)" }}>{f.label}</label>
                      <input
                        type={f.type} placeholder={f.placeholder} required
                        value={form[f.id as "name"|"email"]}
                        onChange={(e) => setForm({...form, [f.id]: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                        style={{
                          background:"var(--offwhite)", border:"1px solid #e0e0e0",
                          color:"var(--text-primary)",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "var(--orange)";
                          e.target.style.boxShadow   = "0 0 0 3px rgba(249,115,22,0.1)";
                          e.target.style.background   = "white";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "#e0e0e0";
                          e.target.style.boxShadow   = "";
                          e.target.style.background   = "var(--offwhite)";
                        }}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-[10px] font-bold mb-1.5 tracking-wider"
                           style={{ color:"var(--text-secondary)" }}>INQUIRY TYPE</label>
                    <select
                      value={form.type} onChange={(e) => setForm({...form, type: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                      style={{ background:"var(--offwhite)", border:"1px solid #e0e0e0", color:"var(--text-primary)" }}
                    >
                      {["Coal Trading Inquiry","Port Operations","Logistics Partnership","CSR Collaboration","Other"].map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold mb-1.5 tracking-wider"
                           style={{ color:"var(--text-secondary)" }}>MESSAGE</label>
                    <textarea
                      rows={4} placeholder="Tell us about your requirements..." required
                      value={form.message} onChange={(e) => setForm({...form, message: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 resize-none"
                      style={{ background:"var(--offwhite)", border:"1px solid #e0e0e0", color:"var(--text-primary)" }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "var(--orange)";
                        e.target.style.boxShadow   = "0 0 0 3px rgba(249,115,22,0.1)";
                        e.target.style.background   = "white";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#e0e0e0";
                        e.target.style.boxShadow   = "";
                        e.target.style.background   = "var(--offwhite)";
                      }}
                    />
                  </div>
                  <button type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-200"
                    style={{ background:"var(--orange)", color:"white" }}
                    onMouseEnter={(e) => { (e.currentTarget).style.boxShadow="0 10px 30px rgba(249,115,22,0.35)"; }}
                    onMouseLeave={(e) => { (e.currentTarget).style.boxShadow=""; }}
                  >
                    Send Inquiry <Send size={14} />
                  </button>
                </form>
              )}

              {/* Contact info */}
              <div className="mt-7 pt-6 flex flex-col gap-3" style={{ borderTop:"1px solid #eee" }}>
                {[
                  { Icon:MapPin, text:"Ambition House, BKC, Mumbai 400051" },
                  { Icon:Phone,  text:"+91 22 XXXX XXXX"                    },
                  { Icon:Mail,   text:"info@ambitioncoal.co.in"             },
                ].map(({ Icon, text }) => (
                  <div key={text} className="flex items-center gap-3 text-sm" style={{ color:"var(--text-secondary)" }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                         style={{ background:"rgba(249,115,22,0.08)" }}>
                      <Icon size={14} style={{ color:"var(--orange)" }} />
                    </div>
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
