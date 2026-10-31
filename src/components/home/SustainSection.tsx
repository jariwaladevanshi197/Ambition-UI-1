"use client";
import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import type { PageSection } from "@/components/admin/types";
import { cardIcon, type CardDesign } from "@/components/cms/icons";

// The designed icon colour for each pillar, matched by card title.
const designs: Record<string, CardDesign> = {
  "Responsible Mining":       { icon:"pickaxe",        color:"#D97706" },
  "Environmental Commitment": { icon:"droplets",       color:"#3b82f6" },
  "Community Development":    { icon:"handshake",      color:"#22c55e" },
  "Future Energy":            { icon:"zap",            color:"#F97316" },
  "Women Empowerment":        { icon:"graduation-cap", color:"#a855f7" },
  "Circular Economy":         { icon:"recycle",        color:"#16a34a" },
};

export default function SustainSection({ section }: { section: PageSection }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const inView     = useInView(sectionRef, { once: true, margin:"-80px" });

  useEffect(() => {
    const section = sectionRef.current;
    const track   = trackRef.current;
    if (!section || !track) return;

    let targetX = 0, currentX = 0;
    let isDragging = false, dragStartX = 0, dragStartScroll = 0;
    let raf: number;

    const getExcess = () => Math.max(0, track.scrollWidth - section.getBoundingClientRect().width);

    // Mouse move: map 0→1 to 0→-excess so first card never clips on left,
    // last card never clips on right
    const onMove = (e: MouseEvent) => {
      if (isDragging) return;
      const r   = section.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
      targetX   = -pct * getExcess();
    };

    const onLeave = () => {
      if (!isDragging) targetX = -(getExcess() / 2); // snap back to centre
    };

    const onDown = (e: MouseEvent) => {
      isDragging    = true;
      dragStartX    = e.clientX;
      dragStartScroll = currentX;
      section.style.cursor = "grabbing";
    };
    const onUp = () => {
      isDragging = false;
      section.style.cursor = "grab";
    };
    const onDrag = (e: MouseEvent) => {
      if (!isDragging) return;
      const excess = getExcess();
      targetX = Math.min(0, Math.max(-excess, dragStartScroll + (e.clientX - dragStartX)));
    };

    // Start centered
    targetX = currentX = -(getExcess() / 2);
    track.style.transform = `translateX(${currentX}px)`;

    const loop = () => {
      currentX += (targetX - currentX) * 0.07;
      track.style.transform = `translateX(${currentX}px)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    section.style.cursor = "grab";
    section.addEventListener("mousemove",  onMove);
    section.addEventListener("mouseleave", onLeave);
    track.addEventListener("mousedown",    onDown);
    window.addEventListener("mouseup",     onUp);
    window.addEventListener("mousemove",   onDrag);

    return () => {
      cancelAnimationFrame(raf);
      section.removeEventListener("mousemove",  onMove);
      section.removeEventListener("mouseleave", onLeave);
      track.removeEventListener("mousedown",    onDown);
      window.removeEventListener("mouseup",     onUp);
      window.removeEventListener("mousemove",   onDrag);
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-24" style={{ background:"#f9f9f9", overflow:"hidden" }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity:0, y:20 }} animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ duration:0.5 }} className="text-center mb-12"
        >
          <div className="section-tag">RESPONSIBILITY</div>
          <h2 className="text-3xl md:text-4xl font-black">
            Our <span style={{ color:"var(--orange)" }}>Commitment</span>
          </h2>
          <p className="mt-3 text-sm" style={{ color:"rgba(0,0,0,0.5)" }}>
            Move your mouse left or right to explore our sustainability pillars
          </p>
        </motion.div>
      </div>

      {/* Track wrapper — extra vertical padding so hover lift isn't clipped */}
      <div style={{ paddingTop:16, paddingBottom:16, marginTop:-16, marginBottom:-16, overflow:"hidden" }}>
        <div
          ref={trackRef}
          className="flex gap-5 select-none"
          style={{ width:"max-content", paddingLeft:48, paddingRight:48 }}
        >
          {(section.cards ?? []).map((c, i) => {
            const icon = cardIcon(c.icon, designs[c.title]);
            return (
            <motion.div
              key={`${c.title}-${i}`}
              initial={{ opacity:0, y:30 }}
              animate={inView ? { opacity:1, y:0 } : {}}
              transition={{ duration:0.5, delay: i * 0.08 }}
              className="flex-shrink-0 w-64 rounded-2xl p-7 transition-all duration-300"
              style={{
                background: "rgba(0,0,0,0.02)",
                border: "1px solid rgba(0,0,0,0.08)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = "rgba(249,115,22,0.4)";
                el.style.transform   = "translateY(-6px)";
                el.style.boxShadow   = "0 20px 40px rgba(249,115,22,0.1)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = "rgba(0,0,0,0.08)";
                el.style.transform   = "";
                el.style.boxShadow   = "";
              }}
            >
              {icon && (
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                     style={{ background:`${icon.color}14` }}>
                  <icon.Icon size={20} style={{ color: icon.color }} strokeWidth={1.75} />
                </div>
              )}
              <h3 className="font-bold text-sm mb-3 text-gray-900">{c.title}</h3>
              <p className="text-xs leading-relaxed" style={{ color:"rgba(0,0,0,0.5)" }}>{c.desc}</p>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
