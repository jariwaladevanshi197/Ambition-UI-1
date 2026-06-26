"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  {
    gradient: "linear-gradient(135deg, #0d0d0d 0%, #1a0a00 40%, #2d1200 100%)",
    accent:   "#F97316",
    tag:      "COAL TRADING",
    title:    "Powering Industries\nAcross India",
    sub:      "Supplying 1M+ tonnes annually to power plants, steel mills & cement factories",
    stat1: { val:"1M+", label:"Tonnes/Year" },
    stat2: { val:"50+", label:"Cities Served" },
    icon:  "⛏️",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=900&q=80&fit=crop",
    imageAlt: "Industrial coal operations",
  },
  {
    gradient: "linear-gradient(135deg, #0a0f1a 0%, #001a2d 50%, #0a1520 100%)",
    accent:   "#3b82f6",
    tag:      "PORT OPERATIONS",
    title:    "World-Class\nPort Logistics",
    sub:      "Handling bulk cargo at India's major ports — Paradip, Haldia, Vizag and beyond",
    stat1: { val:"6",    label:"Major Ports" },
    stat2: { val:"20+", label:"Years Active" },
    icon:  "🚢",
    image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=900&q=80&fit=crop",
    imageAlt: "Shipping port operations",
  },
  {
    gradient: "linear-gradient(135deg, #0a1a0a 0%, #001a00 50%, #0d1a0a 100%)",
    accent:   "#22c55e",
    tag:      "SUSTAINABILITY",
    title:    "Building a Greener\nEnergy Future",
    sub:      "ESG-aligned processes, ISO certified, investing in cleaner coal technologies",
    stat1: { val:"ISO",  label:"Certified" },
    stat2: { val:"ESG",  label:"Compliant" },
    icon:  "🌱",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=900&q=80&fit=crop",
    imageAlt: "Sustainable green energy",
  },
  {
    gradient: "linear-gradient(135deg, #1a0a1a 0%, #2d0030 50%, #1a0020 100%)",
    accent:   "#a855f7",
    tag:      "GLOBAL REACH",
    title:    "Mine to Market\nWorldwide",
    sub:      "Direct partnerships with mines in Australia, Indonesia, South Africa & more",
    stat1: { val:"6",    label:"Countries" },
    stat2: { val:"3",    label:"Continents" },
    icon:  "🌏",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&q=80&fit=crop",
    imageAlt: "Global operations and reach",
  },
  {
    gradient: "linear-gradient(135deg, #1a0d00 0%, #2d1800 50%, #1a0a00 100%)",
    accent:   "#D97706",
    tag:      "CSR IMPACT",
    title:    "Communities First,\nAlways",
    sub:      "5,000+ beneficiaries across schools, healthcare, water & women empowerment",
    stat1: { val:"5K+",  label:"Beneficiaries" },
    stat2: { val:"20+",  label:"CSR Projects" },
    icon:  "🤝",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=900&q=80&fit=crop",
    imageAlt: "Community CSR initiatives",
  },
];

const DURATION = 5000;

export default function ImageCarousel() {
  const [current,  setCurrent]  = useState(0);
  const [prev,     setPrev]     = useState<number|null>(null);
  const [dir,      setDir]      = useState<1|-1>(1);
  const [paused,   setPaused]   = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval>|null>(null);
  const elapsedRef = useRef(0);

  const goTo = useCallback((idx: number, direction: 1|-1) => {
    setPrev(current);
    setDir(direction);
    setCurrent(idx);
    setProgress(0);
    elapsedRef.current = 0;
  }, [current]);

  const next  = useCallback(() => goTo((current + 1) % SLIDES.length,  1), [current, goTo]);
  const prev2 = useCallback(() => goTo((current - 1 + SLIDES.length) % SLIDES.length, -1), [current, goTo]);

  useEffect(() => {
    if (paused) return;
    const TICK = 30;
    timerRef.current = setInterval(() => {
      elapsedRef.current += TICK;
      setProgress(Math.min((elapsedRef.current / DURATION) * 100, 100));
      if (elapsedRef.current >= DURATION) {
        elapsedRef.current = 0;
        setProgress(0);
        setCurrent(c => {
          const n = (c + 1) % SLIDES.length;
          setPrev(c);
          setDir(1);
          return n;
        });
      }
    }, TICK);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused, current]);

  const slide = SLIDES[current];

  return (
    <div
      className="relative overflow-hidden"
      style={{ height: "clamp(340px, 50vw, 520px)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      {SLIDES.map((s, i) => {
        const isActive = i === current;
        const isPrev   = i === prev;
        return (
          <div
            key={i}
            className="absolute inset-0 transition-all duration-700"
            style={{
              background: s.gradient,
              opacity:    isActive ? 1 : 0,
              transform:  isActive ? "translateX(0)" : isPrev ? `translateX(${dir * -6}%)` : "translateX(0)",
              zIndex:     isActive ? 2 : isPrev ? 1 : 0,
              pointerEvents: isActive ? "auto" : "none",
            }}
          >
            {/* Background blur blobs */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(4)].map((_, j) => (
                <div key={j} className="absolute rounded-full"
                     style={{
                       width: `${100 + j * 50}px`, height: `${100 + j * 50}px`,
                       left: `${8 + j * 12}%`, top: `${10 + (j % 3) * 28}%`,
                       background: `radial-gradient(circle, ${s.accent}10, transparent 70%)`,
                       animation: `float${j%2} ${6 + j}s ease-in-out infinite`,
                     }}/>
              ))}
            </div>

            {/* ── Layout: left text + right image ── */}
            <div className="relative z-10 h-full grid lg:grid-cols-[1fr_42%]">

              {/* Left — text */}
              <div className="flex flex-col justify-center px-10 lg:px-16">
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black tracking-widest mb-5 w-fit"
                  style={{ background:`${s.accent}18`, border:`1px solid ${s.accent}30`, color:s.accent }}
                >
                  <span>{s.icon}</span> {s.tag}
                </div>

                <h2 className="font-black text-white leading-tight mb-4"
                    style={{ fontSize:"clamp(22px,3.2vw,46px)", whiteSpace:"pre-line" }}>
                  {s.title}
                </h2>

                <p className="mb-8 max-w-sm" style={{ color:"rgba(255,255,255,0.5)", fontSize:"clamp(12px,1.1vw,14px)" }}>
                  {s.sub}
                </p>

                <div className="flex items-center gap-8">
                  {[s.stat1, s.stat2].map((st, si) => (
                    <div key={si}>
                      <div className="text-2xl font-black" style={{ color: s.accent }}>{st.val}</div>
                      <div className="text-[10px] font-bold mt-0.5" style={{ color:"rgba(255,255,255,0.35)", letterSpacing:"0.08em" }}>{st.label}</div>
                    </div>
                  ))}
                  <div style={{ width:1, height:32, background:"rgba(255,255,255,0.1)" }}/>
                  <div className="text-[11px]" style={{ color:"rgba(255,255,255,0.3)" }}>{i + 1} / {SLIDES.length}</div>
                </div>
              </div>

              {/* Right — image */}
              <div className="hidden lg:block relative overflow-hidden">
                {/* Diagonal mask on left edge */}
                <div className="absolute inset-0 z-10 pointer-events-none"
                     style={{ background:"linear-gradient(to right, var(--slide-bg,#0d0d0d) 0%, transparent 40%)" }}/>
                {/* Accent gradient on right */}
                <div className="absolute inset-0 z-10 pointer-events-none"
                     style={{ background:`linear-gradient(135deg, transparent 40%, ${s.accent}18 100%)` }}/>

                <img
                  src={s.image}
                  alt={s.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-700"
                  style={{
                    transform: isActive ? "scale(1.04)" : "scale(1.0)",
                    transition: "transform 5s ease-out",
                    filter: "brightness(0.7) saturate(0.85)",
                  }}
                />

                {/* Corner accent badge */}
                <div className="absolute top-5 right-5 z-20 px-3 py-1.5 rounded-xl text-[10px] font-black backdrop-blur-sm"
                     style={{ background:`${s.accent}30`, border:`1px solid ${s.accent}50`, color:s.accent }}>
                  {s.icon} {s.tag}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 z-20" style={{ background:"rgba(255,255,255,0.06)" }}>
        <div className="h-full transition-none"
             style={{ width:`${progress}%`, background:`linear-gradient(90deg, ${slide.accent}, ${slide.accent}aa)` }}/>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        {SLIDES.map((s, i) => (
          <button key={i}
                  onClick={() => goTo(i, i > current ? 1 : -1)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width:  i === current ? 24 : 6,
                    height: 6,
                    background: i === current ? slide.accent : "rgba(255,255,255,0.25)",
                  }}/>
        ))}
      </div>

      {/* Prev / Next arrows */}
      <button onClick={prev2}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
              style={{ background:"rgba(255,255,255,0.08)", backdropFilter:"blur(8px)", border:"1px solid rgba(255,255,255,0.12)" }}
              onMouseEnter={e=>(e.currentTarget.style.background="rgba(255,255,255,0.2)")}
              onMouseLeave={e=>(e.currentTarget.style.background="rgba(255,255,255,0.08)")}>
        <ChevronLeft size={18} className="text-white"/>
      </button>
      <button onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
              style={{ background:"rgba(255,255,255,0.08)", backdropFilter:"blur(8px)", border:"1px solid rgba(255,255,255,0.12)" }}
              onMouseEnter={e=>(e.currentTarget.style.background="rgba(255,255,255,0.2)")}
              onMouseLeave={e=>(e.currentTarget.style.background="rgba(255,255,255,0.08)")}>
        <ChevronRight size={18} className="text-white"/>
      </button>

      {paused && (
        <div className="absolute top-4 right-16 z-20 px-2.5 py-1 rounded-full text-[10px] font-bold"
             style={{ background:"rgba(0,0,0,0.5)", color:"rgba(255,255,255,0.5)", backdropFilter:"blur(4px)" }}>
          ⏸ Paused
        </div>
      )}

      <style>{`
        @keyframes float0 { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-20px) scale(1.05)} }
        @keyframes float1 { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(20px) scale(0.95)} }
      `}</style>
    </div>
  );
}
