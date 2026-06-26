"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const services = [
  {
    title: "Coal Trading & Sourcing",
    desc: "End-to-end procurement of Steam Coal from Indonesia, South Africa and East Africa. Quality assured from mine to mother vessel.",
    image: "/images/coal-dark.jpg",
    tag: "Core Business",
    tagColor: "#F97316",
  },
  {
    title: "Port Operations",
    desc: "Stevedoring and bulk cargo handling at 15+ major Indian ports — Paradip, Haldia, Vizag and beyond.",
    image: "/images/port.jpg",
    tag: "Logistics",
    tagColor: "#3b82f6",
  },
  {
    title: "International Trading",
    desc: "Global sourcing partnerships in Australia, Indonesia, South Africa, Kenya and Zimbabwe.",
    image: "/images/shipping.jpg",
    tag: "Global",
    tagColor: "#8b5cf6",
  },
  {
    title: "Road Transportation",
    desc: "Doorstep delivery network covering 50+ cities. Loading, unloading, packing and dispatch managed end-to-end.",
    image: "/images/truck.jpg",
    tag: "Supply Chain",
    tagColor: "#22c55e",
  },
  {
    title: "Minerals Trading",
    desc: "Manganese ore, Chrome ore and Silica ore sourced from major origins across Indonesia, South Africa and Zimbabwe.",
    image: "/images/minerals.jpg",
    tag: "Minerals",
    tagColor: "#D97706",
  },
  {
    title: "Salt — Coming Soon",
    desc: "Industrial Grade Salt and Edible Salt. A new vertical under Ambition — expanding beyond coal into essential commodities.",
    image: "/images/salt1.jpg",
    tag: "New Product",
    tagColor: "#64748b",
    comingSoon: true,
  },
];

export default function ServicesSection() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24" style={{ background: "#f5f5f5" }}>
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}}
          transition={{ duration:0.5 }} className="mb-14"
        >
          <div className="section-tag mb-3">WHAT WE DO</div>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <h2 className="text-3xl md:text-4xl font-black" style={{ color:"#111111" }}>
              Our <span style={{ color:"var(--orange)" }}>Services</span>
            </h2>
            <Link href="/services"
              className="text-sm font-semibold flex items-center gap-1.5 transition-colors"
              style={{ color:"var(--orange)" }}
              onMouseEnter={e=>(e.currentTarget.style.opacity="0.75")}
              onMouseLeave={e=>(e.currentTarget.style.opacity="1")}>
              View all services <ArrowRight size={14}/>
            </Link>
          </div>
        </motion.div>

        {/* Service cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}}
              transition={{ duration:0.5, delay: i*0.08 }}
              className="rounded-xl overflow-hidden bg-white group"
              style={{
                border: "1px solid #e5e5e5",
                transition: "box-shadow .25s, transform .25s",
                opacity: s.comingSoon ? 0.85 : 1,
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.boxShadow = "0 12px 40px rgba(0,0,0,0.10)";
                el.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.boxShadow = "";
                el.style.transform = "";
              }}
            >
              {/* Image */}
              <div className="relative overflow-hidden" style={{ height: 180 }}>
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ filter: s.comingSoon ? "grayscale(0.4) brightness(0.85)" : "brightness(0.88)" }}
                />
                {/* Tag */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded text-[10px] font-bold text-white"
                     style={{ background: s.tagColor, letterSpacing:"0.05em" }}>
                  {s.tag}
                </div>
                {s.comingSoon && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="px-4 py-1.5 rounded-full text-xs font-black text-white"
                         style={{ background:"rgba(0,0,0,0.6)", letterSpacing:"0.08em" }}>
                      COMING SOON
                    </div>
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="p-5">
                <h3 className="font-bold text-base mb-2" style={{ color:"#111111" }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color:"#555555" }}>{s.desc}</p>
              </div>

              {/* Bottom orange line on hover */}
              <div className="h-0.5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                   style={{ background: s.tagColor }}/>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/services"
            className="inline-flex items-center gap-2 px-7 py-3 rounded text-sm font-bold text-white transition-all"
            style={{ background:"var(--orange)" }}
            onMouseEnter={e=>(e.currentTarget.style.boxShadow="0 8px 28px rgba(249,115,22,0.35)")}
            onMouseLeave={e=>(e.currentTarget.style.boxShadow="")}>
            View All Services <ArrowRight size={15}/>
          </Link>
        </div>
      </div>
    </section>
  );
}
