"use client";
import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const cards = [
  { icon:"🌱", title:"Responsible Mining",       text:"Adopting best practices to minimise environmental impact across all extraction operations worldwide." },
  { icon:"🌊", title:"Environmental Commitment", text:"Zero-waste initiatives, reforestation programs, and clean water conservation partnerships." },
  { icon:"🤝", title:"Community Development",    text:"Empowering local communities through education, healthcare, and economic inclusion programs." },
  { icon:"⚡", title:"Future Energy",            text:"Investing in cleaner coal technologies and transitioning toward renewable energy solutions." },
  { icon:"👩‍🎓", title:"Women Empowerment",      text:"Skill development and leadership programs for women in mining communities across India." },
  { icon:"♻️", title:"Circular Economy",         text:"Recovering and reusing mine by-products to reduce waste across the supply chain." },
];

export default function SustainSection() {
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
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
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
              <div className="text-3xl mb-4">{c.icon}</div>
              <h3 className="font-bold text-sm mb-3 text-gray-900">{c.title}</h3>
              <p className="text-xs leading-relaxed" style={{ color:"rgba(0,0,0,0.5)" }}>{c.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
