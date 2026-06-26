"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { num: 20,  suffix: "+", label: "Years Experience",  desc: "Since 2003"           },
  { num: 15,  suffix: "+", label: "Ports Operated",    desc: "Across India"         },
  { num: 50,  suffix: "+", label: "Cities Served",     desc: "Pan India network"    },
  { num: 1,   suffix: "M+",label: "Tons Delivered",    desc: "Annually & growing"   },
];

function CountUp({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const steps = 50;
    const inc   = target / steps;
    const id = setInterval(() => {
      start += inc;
      if (start >= target) { setVal(target); clearInterval(id); }
      else setVal(Math.floor(start));
    }, 28);
    return () => clearInterval(id);
  }, [active, target]);
  return <>{val}{suffix}</>;
}

export default function StatsSection() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24" style={{ background: "#f9f9f9" }}>
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="section-tag">BY THE NUMBERS</div>
          <h2 className="text-3xl md:text-4xl font-black">
            20+ Years of{" "}
            <span style={{ color: "var(--orange)" }}>Industrial Excellence</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative overflow-hidden rounded-2xl p-7 text-center group"
              style={{
                background: "rgba(0,0,0,0.03)",
                border: "1px solid rgba(0,0,0,0.08)",
              }}
              onMouseMove={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                const r  = el.getBoundingClientRect();
                const x  = e.clientX - r.left;
                const y  = e.clientY - r.top;
                el.style.setProperty("--mx", `${x}px`);
                el.style.setProperty("--my", `${y}px`);
                const cx = r.width / 2, cy = r.height / 2;
                el.style.transform = `perspective(600px) rotateX(${-((y - cy) / cy) * 12}deg) rotateY(${((x - cx) / cx) * 12}deg) scale(1.04)`;
                el.style.borderColor = "rgba(249,115,22,0.5)";
                el.style.boxShadow   = "0 20px 40px rgba(249,115,22,0.1)";
                const glow = el.querySelector(".glow") as HTMLElement;
                if (glow) glow.style.background = `radial-gradient(circle 70px at ${x}px ${y}px, rgba(249,115,22,0.28), transparent 70%)`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform   = "";
                el.style.borderColor = "";
                el.style.boxShadow   = "";
                const glow = el.querySelector(".glow") as HTMLElement;
                if (glow) glow.style.background = "";
              }}
            >
              {/* glow overlay */}
              <div className="glow absolute inset-0 rounded-2xl pointer-events-none transition-all duration-100" />

              <div
                className="text-4xl md:text-5xl font-black mb-2 leading-none"
                style={{ color: "var(--orange)" }}
              >
                <CountUp target={s.num} suffix={s.suffix} active={inView} />
              </div>
              <div className="font-semibold text-sm text-gray-900 mb-1">{s.label}</div>
              <div className="text-xs" style={{ color: "rgba(0,0,0,0.45)" }}>{s.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
