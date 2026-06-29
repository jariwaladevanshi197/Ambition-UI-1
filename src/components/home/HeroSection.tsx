"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronDown, Flame, Globe, Truck } from "lucide-react";

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  size: number; alpha: number; color: string;
}

export default function HeroSection() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const spotRef    = useRef<HTMLDivElement>(null);
  const heroRef    = useRef<HTMLElement>(null);
  const mouseRef   = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let W = 0, H = 0, particles: Particle[] = [], raf: number;

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const build = () => {
      particles = Array.from({ length: 110 }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size:  Math.random() * 1.8 + 0.4,
        alpha: Math.random() * 0.45 + 0.08,
        color: Math.random() > 0.5 ? "#F97316" : "#D97706",
      }));
    };
    build();

    const hero = heroRef.current;
    const onMove = (e: MouseEvent) => {
      if (!hero) return;
      const r = hero.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
      if (spotRef.current) {
        spotRef.current.style.background =
          `radial-gradient(circle 260px at ${mouseRef.current.x}px ${mouseRef.current.y}px, rgba(249,115,22,0.09) 0%, transparent 70%)`;
      }
    };
    hero?.addEventListener("mousemove", onMove);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const { x: hx, y: hy } = mouseRef.current;
      particles.forEach((p) => {
        const dx = hx - p.x, dy = hy - p.y;
        const d  = Math.hypot(dx, dy);
        if (d < 140) { p.vx += (dx / d) * 0.025; p.vy += (dy / d) * 0.025; }
        p.vx *= 0.97; p.vy *= 0.97;
        p.x = (p.x + p.vx + W) % W;
        p.y = (p.y + p.vy + H) % H;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle   = p.color;
        ctx.fill();
        ctx.globalAlpha = 1;
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const d = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
          if (d < 80) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.globalAlpha = (1 - d / 80) * 0.12;
            ctx.strokeStyle = "#F97316";
            ctx.lineWidth   = 0.6;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      hero?.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #ffffff 0%, #fff7f0 45%, #ffffff 100%)",
      }}
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(249,115,22,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Spotlight */}
      <div ref={spotRef} className="absolute inset-0 pointer-events-none transition-all duration-75" />

      {/* 2-column content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-center py-24">

        {/* ── Left: Text ── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase"
            style={{
              background: "rgba(249,115,22,0.1)",
              border: "1px solid rgba(249,115,22,0.3)",
              color: "var(--orange)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            Est. 2003 · Pan India · Global Reach
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-black leading-[1.05] mb-6"
            style={{ fontSize: "clamp(36px, 5vw, 68px)", letterSpacing: "-2px" }}
          >
            Powering Industries.
            <br />
            <span style={{ color: "var(--orange)" }}>Connecting the World.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg mb-10 leading-relaxed max-w-xl"
            style={{ color: "rgba(0,0,0,0.55)" }}
          >
            Building sustainable energy and logistics solutions across India and global markets.
            Trusted by industries, driven by purpose.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <Link
              href="/services"
              className="mag-btn group flex items-center gap-2 px-7 py-3.5 rounded-md text-sm font-bold transition-all duration-200"
              style={{ background: "var(--orange)", color: "white" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 12px 40px rgba(249,115,22,0.4)";
                (e.currentTarget as HTMLAnchorElement).style.transform  = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "";
                (e.currentTarget as HTMLAnchorElement).style.transform  = "";
              }}
            >
              Explore Solutions
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/about"
              className="mag-btn px-7 py-3.5 rounded-md text-sm font-bold transition-all duration-200"
              style={{
                background: "transparent",
                color: "#111111",
                border: "1px solid rgba(0,0,0,0.2)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--orange)";
                (e.currentTarget as HTMLAnchorElement).style.color        = "var(--orange)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(0,0,0,0.2)";
                (e.currentTarget as HTMLAnchorElement).style.color        = "#111111";
              }}
            >
              Our Network
            </Link>
          </motion.div>

          {/* Mini stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex gap-8"
          >
            {[
              { icon: <Flame size={15} />, value: "20+", label: "Years" },
              { icon: <Truck size={15} />, value: "1M+", label: "Tons Delivered" },
              { icon: <Globe size={15} />, value: "50+", label: "Cities" },
            ].map((s) => (
              <div key={s.label}>
                <div className="flex items-center gap-1.5 text-xl font-black mb-0.5" style={{ color: "var(--orange)" }}>
                  {s.icon} {s.value}
                </div>
                <div className="text-xs" style={{ color: "rgba(0,0,0,0.45)" }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right: Visual ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden lg:block relative"
        >
          {/* Main image */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl"
               style={{ aspectRatio: "4/3" }}>
            <img
              src="/images/Gemini_Generated_Image_680jx7680jx7680j.png"
              alt="Ambition Coal — industrial operations"
              className="w-full h-full object-cover"
            />
            {/* orange tint overlay */}
            <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.15) 0%, transparent 60%)" }} />
            {/* bottom gradient for readability */}
            <div className="absolute bottom-0 left-0 right-0 h-1/3" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55), transparent)" }} />

            {/* Badge on image */}
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
              <div className="px-3 py-1.5 rounded-full text-xs font-bold text-white backdrop-blur-sm"
                   style={{ background: "rgba(249,115,22,0.85)" }}>
                🏭 Pan India Operations
              </div>
              <div className="px-3 py-1.5 rounded-full text-xs font-bold text-white backdrop-blur-sm"
                   style={{ background: "rgba(0,0,0,0.5)" }}>
                Est. 2003
              </div>
            </div>
          </div>

          {/* Floating card — top right */}
          <div className="absolute -top-4 -right-4 p-4 rounded-2xl shadow-xl"
               style={{ background: "white", border: "1px solid rgba(249,115,22,0.15)", minWidth: 150 }}>
            <div className="text-2xl font-black" style={{ color: "var(--orange)" }}>5+</div>
            <div className="text-xs font-bold mt-0.5" style={{ color: "rgba(0,0,0,0.55)" }}>Countries Sourced</div>
            <div className="flex gap-1 mt-2">
              {["🇦🇺","🇮🇩","🇿🇦","🇰🇪","🇿🇼"].map(f => (
                <span key={f} className="text-sm">{f}</span>
              ))}
            </div>
          </div>

          {/* Floating card — bottom left */}
          <div className="absolute -bottom-4 -left-4 p-4 rounded-2xl shadow-xl"
               style={{ background: "white", border: "1px solid rgba(249,115,22,0.15)" }}>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#22c55e" }} />
              <span className="text-xs font-bold" style={{ color: "#22c55e" }}>Live Operations</span>
            </div>
            <div className="text-xl font-black" style={{ color: "#111111" }}>1M+</div>
            <div className="text-xs" style={{ color: "rgba(0,0,0,0.45)" }}>Tons / Year</div>
          </div>

          {/* Decorative ring */}
          <div className="absolute -z-10 inset-0 rounded-3xl"
               style={{ border: "1.5px solid rgba(249,115,22,0.15)", transform: "translate(12px, 12px)" }} />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: "rgba(0,0,0,0.35)" }}
      >
        <span className="text-[10px] tracking-[3px] uppercase">Scroll</span>
        <ChevronDown size={16} className="animate-bounce" />
      </motion.div>
    </section>
  );
}
