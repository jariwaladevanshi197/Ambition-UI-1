"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const services = [
  {
    icon: "⛏️", title: "Coal Trading",
    desc: "End-to-end coal procurement and trading across domestic and international markets. Quality assurance from source to delivery.",
    tag: "FLAGSHIP", tall: true,
  },
  {
    icon: "🚢", title: "Port Operations",
    desc: "15+ major Indian ports handling bulk commodities with rapid turnaround.", tall: false,
  },
  {
    icon: "🌐", title: "International Trading",
    desc: "Global sourcing from Australia, Indonesia, South Africa and Russia.", tall: false,
  },
  {
    icon: "🚛", title: "Logistics & Supply Chain",
    desc: "End-to-end logistics from mine mouth to factory gate across 50+ cities.", tall: false,
  },
  {
    icon: "🏭", title: "Mining Solutions",
    desc: "Technical consulting, project management, and operational support.", tall: false,
  },
];

export default function ServicesSection() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const applyTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r  = el.getBoundingClientRect();
    const x  = e.clientX - r.left, y = e.clientY - r.top;
    const cx = r.width / 2, cy = r.height / 2;
    el.style.transform = `perspective(700px) rotateX(${-((y-cy)/cy)*7}deg) rotateY(${((x-cx)/cx)*7}deg)`;
    const spot = el.querySelector(".bento-spot") as HTMLElement;
    if (spot) { spot.style.left = x+"px"; spot.style.top = y+"px"; spot.style.opacity = "1"; }
  };
  const removeTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.style.transform = "";
    const spot = el.querySelector(".bento-spot") as HTMLElement;
    if (spot) spot.style.opacity = "0";
  };

  return (
    <section ref={ref} className="py-24" style={{ background: "var(--offwhite)" }}>
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}}
          transition={{ duration:0.5 }} className="text-center mb-12"
        >
          <div className="section-tag">WHAT WE DO</div>
          <h2 className="text-3xl md:text-4xl font-black" style={{ color:"var(--text-primary)" }}>
            Our <span style={{ color:"var(--orange)" }}>Services</span>
          </h2>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ gridTemplateRows: "auto auto" }}>
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}}
              transition={{ duration:0.5, delay: i*0.08 }}
              onMouseMove={applyTilt}
              className="relative overflow-hidden rounded-2xl p-8 group"
              style={{
                background: "white",
                border: "1px solid #ebebeb",
                gridRow: s.tall ? "span 2" : "span 1",
                transition: "border-color .3s, box-shadow .3s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(249,115,22,0.3)";
                (e.currentTarget as HTMLDivElement).style.boxShadow   = "0 20px 50px rgba(0,0,0,0.07)";
              }}
              onMouseLeave={(e) => {
                removeTilt(e);
                (e.currentTarget as HTMLDivElement).style.borderColor = "#ebebeb";
                (e.currentTarget as HTMLDivElement).style.boxShadow   = "";
              }}
            >
              {/* Orange bar bottom */}
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100"
                style={{ background: "var(--orange)" }}
              />
              {/* Spotlight */}
              <div
                className="bento-spot absolute w-48 h-48 rounded-full pointer-events-none transition-opacity duration-200"
                style={{
                  transform: "translate(-50%,-50%)",
                  background: "radial-gradient(circle, rgba(249,115,22,0.1) 0%, transparent 70%)",
                  opacity: 0,
                }}
              />
              <span className="text-4xl mb-4 block">{s.icon}</span>
              <h3 className="text-lg font-bold mb-3" style={{ color:"var(--text-primary)" }}>{s.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color:"var(--text-secondary)" }}>{s.desc}</p>
              {s.tag && (
                <div className="inline-block mt-5 px-3 py-1 rounded-full text-xs font-bold"
                     style={{ background:"rgba(249,115,22,0.08)", color:"var(--orange)" }}>
                  {s.tag}
                </div>
              )}
              {s.tall && (
                <Link href="/services" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold transition-colors duration-200"
                      style={{ color:"var(--orange)" }}>
                  Learn more <ArrowUpRight size={14} />
                </Link>
              )}
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-sm font-bold transition-all duration-200"
            style={{ background:"var(--orange)", color:"white" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 10px 30px rgba(249,115,22,0.35)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = ""; }}
          >
            View All Services <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
