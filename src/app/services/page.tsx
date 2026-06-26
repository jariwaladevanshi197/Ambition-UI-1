"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

/* ── Services ─────────────────────────────────────────────── */
const services = [
  {
    title: "Coal Trading & Sourcing",
    desc:  "Our core focus — sourcing and supplying Steam Coal from Indonesia, South Africa and East Africa. Independent international testing at every stage: mine, mother vessel and final delivery. Competitive pricing with quality you can rely on.",
    tags:  ["Steam Coal", "Indonesia", "South Africa", "East Africa"],
    image: "https://images.unsplash.com/photo-1529579917-0a5d4f8b4a82?w=800&q=80&fit=crop",
    badge: "Core Business",
    badgeColor: "#F97316",
    wide: true,
  },
  {
    title: "Stevedoring & Port Operations",
    desc:  "Loading and unloading of ships at 15+ major Indian ports — Paradip, Haldia, Vizag and beyond. Expert personnel and modern equipment handle break bulk to containers with rapid turnaround.",
    tags:  ["Loading", "Unloading", "Delay Recovery", "Bulk Cargo"],
    image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=800&q=80&fit=crop",
    badge: "Port Logistics",
    badgeColor: "#3b82f6",
    wide: false,
  },
  {
    title: "International Trading",
    desc:  "Global sourcing partnerships in Australia, Indonesia, South Africa, Kenya and Zimbabwe. Extensive physical trading positions across all major origins.",
    tags:  ["Australia", "Indonesia", "South Africa", "Zimbabwe"],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80&fit=crop",
    badge: "Global",
    badgeColor: "#8b5cf6",
    wide: false,
  },
  {
    title: "Road Transportation",
    desc:  "Doorstep delivery covering 50+ cities. Our experienced network ensures proper quality and quantity dispatch, with loading, unloading and packing available on request.",
    tags:  ["Doorstep Delivery", "50+ Cities", "Packing", "Dispatch"],
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80&fit=crop",
    badge: "Supply Chain",
    badgeColor: "#22c55e",
    wide: false,
  },
  {
    title: "Unloading & Stacking",
    desc:  "Loading and unloading from railway rakes and motor vehicles. Storage units with special platforms, weighing and machinery. Coal stacking using state-of-the-art equipment to prevent oxidation and moisture increase.",
    tags:  ["Railway Rakes", "Stockpiles", "Anti-oxidation", "Storage"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&fit=crop",
    badge: "Operations",
    badgeColor: "#D97706",
    wide: false,
  },
  {
    title: "Minerals Trading",
    desc:  "Beyond coal — Manganese ore, Chrome ore and Silica ore sourced from major origins including Indonesia, South Africa, Kenya and Zimbabwe.",
    tags:  ["Manganese", "Chrome Ore", "Silica Ore"],
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80&fit=crop",
    badge: "Minerals",
    badgeColor: "#64748b",
    wide: false,
  },
];

/* ── Coal products ─────────────────────────────────────────── */
const coalProducts = [
  {
    name:"Steam Coal — Indonesia",
    gcv:"5500–6500 kcal/kg", ash:"10–18%", moisture:"8–12%",
    use:"Power plants, cement, steel, textile & paper mills",
    image:"https://images.unsplash.com/photo-1529579917-0a5d4f8b4a82?w=500&q=80&fit=crop",
  },
  {
    name:"Steam Coal — South Africa",
    gcv:"5800–6200 kcal/kg", ash:"12–16%", moisture:"8–11%",
    use:"Power utilities, West & East coast India",
    image:"https://images.unsplash.com/photo-1561489413-985b06da5bee?w=500&q=80&fit=crop",
  },
  {
    name:"Steam Coal — Kenya / Zimbabwe",
    gcv:"5000–6000 kcal/kg", ash:"14–20%", moisture:"9–13%",
    use:"Industrial boilers, captive power plants",
    image:"https://images.unsplash.com/photo-1609252509102-aa7f64d50ef7?w=500&q=80&fit=crop",
  },
  {
    name:"Coking Coal",
    gcv:"6000–7500 kcal/kg", ash:"8–12%", moisture:"8–10%",
    use:"Steel & metallurgy customers across India",
    image:"https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=500&q=80&fit=crop",
  },
];

/* ── Salt products (coming soon) ───────────────────────────── */
const saltProducts = [
  {
    name: "Industrial Grade Salt",
    desc: "High-purity sodium chloride for chemical processing, water treatment, oil & gas, and industrial manufacturing.",
    specs: ["NaCl: 98–99.5%", "Moisture: <0.5%", "Bulk / Packed"],
    icon: "🏭",
  },
  {
    name: "Edible Salt",
    desc: "Food-grade iodised and non-iodised salt for FMCG, food processing and consumer retail under a dedicated brand.",
    specs: ["Food Grade", "Iodised / Plain", "Branded Packs"],
    icon: "🧂",
  },
];

export default function ServicesPage() {
  const servRef    = useRef<HTMLElement>(null);
  const coalRef    = useRef<HTMLElement>(null);
  const saltRef    = useRef<HTMLElement>(null);
  const s1 = useInView(servRef, { once:true, margin:"-60px" });
  const s2 = useInView(coalRef, { once:true, margin:"-60px" });
  const s3 = useInView(saltRef, { once:true, margin:"-60px" });

  return (
    <>
      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="pt-32 pb-20 px-6" style={{ background:"#ffffff" }}>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity:0,y:24 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.6 }}>
            <div className="section-tag mb-4">WHAT WE OFFER</div>
            <h1 className="font-black mb-5 leading-tight" style={{ fontSize:"clamp(32px,5vw,56px)", color:"#111111" }}>
              Quality Trade.<br/>
              <span style={{ color:"var(--orange)" }}>Reliable Supply.</span>
            </h1>
            <p className="text-base leading-relaxed mb-8" style={{ color:"#555555", maxWidth:480 }}>
              From coal trading to port operations and minerals — Ambition delivers end-to-end energy and commodity solutions trusted by industries across India.
            </p>
            <div className="flex flex-wrap gap-3">
              {["Coal Trading","Port Operations","Minerals","Salt — Coming Soon"].map(t=>(
                <span key={t} className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold"
                      style={{ background:"#f5f5f5", border:"1px solid #e0e0e0", color:"#444444" }}>
                  <CheckCircle2 size={12} style={{ color:"var(--orange)" }}/> {t}
                </span>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity:0,x:40 }} animate={{ opacity:1,x:0 }} transition={{ duration:0.7, delay:0.15 }}
                      className="hidden lg:block rounded-xl overflow-hidden shadow-lg" style={{ height:380 }}>
            <img src="https://images.unsplash.com/photo-1529579917-0a5d4f8b4a82?w=900&q=80&fit=crop"
                 alt="Ambition Coal operations" className="w-full h-full object-cover"/>
          </motion.div>
        </div>
      </section>

      {/* ── Services grid ───────────────────────────────────── */}
      <section ref={servRef} className="py-20 px-6" style={{ background:"#f5f5f5" }}>
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity:0,y:20 }} animate={s1?{opacity:1,y:0}:{}} transition={{ duration:0.5 }}
                      className="mb-12">
            <div className="section-tag mb-2">OUR SERVICES</div>
            <h2 className="text-3xl font-black" style={{ color:"#111111" }}>
              What We <span style={{ color:"var(--orange)" }}>Do</span>
            </h2>
          </motion.div>

          {/* Wide card first */}
          {services.filter(s=>s.wide).map((s,i)=>(
            <motion.div key={s.title}
              initial={{ opacity:0,y:30 }} animate={s1?{opacity:1,y:0}:{}} transition={{ duration:0.5 }}
              className="rounded-xl overflow-hidden bg-white mb-6 grid lg:grid-cols-2"
              style={{ border:"1px solid #e5e5e5", boxShadow:"0 2px 16px rgba(0,0,0,0.05)" }}>
              <div className="relative" style={{ minHeight:280 }}>
                <img src={s.image} alt={s.title} className="w-full h-full object-cover" style={{ filter:"brightness(0.88)" }}/>
                <div className="absolute top-4 left-4 px-2.5 py-1 rounded text-[10px] font-bold text-white"
                     style={{ background:s.badgeColor }}>{s.badge}</div>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <h3 className="text-xl font-bold mb-3" style={{ color:"#111111" }}>{s.title}</h3>
                <p className="text-sm leading-relaxed mb-5" style={{ color:"#555555" }}>{s.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {s.tags.map(t=>(
                    <span key={t} className="px-2.5 py-1 rounded text-[11px] font-semibold"
                          style={{ background:"rgba(249,115,22,0.08)", color:"var(--orange)" }}>{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}

          {/* 3-column grid for the rest */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.filter(s=>!s.wide).map((s,i)=>(
              <motion.div key={s.title}
                initial={{ opacity:0,y:30 }} animate={s1?{opacity:1,y:0}:{}}
                transition={{ duration:0.5, delay: i*0.08 }}
                className="rounded-xl overflow-hidden bg-white group"
                style={{ border:"1px solid #e5e5e5", transition:"box-shadow .25s, transform .25s" }}
                onMouseEnter={e=>{const el=e.currentTarget as HTMLDivElement;el.style.boxShadow="0 12px 36px rgba(0,0,0,0.10)";el.style.transform="translateY(-4px)";}}
                onMouseLeave={e=>{const el=e.currentTarget as HTMLDivElement;el.style.boxShadow="";el.style.transform="";}}>
                <div className="relative overflow-hidden" style={{ height:160 }}>
                  <img src={s.image} alt={s.title}
                       className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                       style={{ filter:"brightness(0.85)" }}/>
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded text-[10px] font-bold text-white"
                       style={{ background:s.badgeColor }}>{s.badge}</div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-sm mb-2" style={{ color:"#111111" }}>{s.title}</h3>
                  <p className="text-xs leading-relaxed mb-4" style={{ color:"#666666" }}>{s.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {s.tags.map(t=>(
                      <span key={t} className="px-2 py-0.5 rounded text-[10px] font-semibold"
                            style={{ background:"#f5f5f5", border:"1px solid #e5e5e5", color:"#555555" }}>{t}</span>
                    ))}
                  </div>
                </div>
                <div className="h-0.5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                     style={{ background:"var(--orange)" }}/>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Coal Products ───────────────────────────────────── */}
      <section ref={coalRef} className="py-20 px-6" style={{ background:"#ffffff" }}>
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity:0,y:20 }} animate={s2?{opacity:1,y:0}:{}} transition={{ duration:0.5 }}
                      className="mb-12">
            <div className="section-tag mb-2">COAL PORTFOLIO</div>
            <h2 className="text-3xl font-black" style={{ color:"#111111" }}>
              Quality Coal.<br/><span style={{ color:"var(--orange)" }}>Reliable Supply.</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {coalProducts.map((p,i)=>(
              <motion.div key={p.name}
                initial={{ opacity:0,y:30 }} animate={s2?{opacity:1,y:0}:{}}
                transition={{ duration:0.5, delay:i*0.08 }}
                className="rounded-xl overflow-hidden bg-white group"
                style={{ border:"1px solid #e5e5e5", transition:"box-shadow .25s, transform .25s" }}
                onMouseEnter={e=>{const el=e.currentTarget as HTMLDivElement;el.style.boxShadow="0 12px 32px rgba(0,0,0,0.09)";el.style.transform="translateY(-3px)";}}
                onMouseLeave={e=>{const el=e.currentTarget as HTMLDivElement;el.style.boxShadow="";el.style.transform="";}}>
                <div className="overflow-hidden" style={{ height:140 }}>
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" style={{ filter:"brightness(0.82)" }}/>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-sm mb-3" style={{ color:"var(--orange)" }}>{p.name}</h3>
                  <div className="grid grid-cols-3 gap-1.5 mb-3">
                    {[{l:"GCV",v:p.gcv},{l:"Ash",v:p.ash},{l:"Moisture",v:p.moisture}].map(s=>(
                      <div key={s.l} className="p-2 rounded text-center" style={{ background:"#f7f7f7", border:"1px solid #ebebeb" }}>
                        <div className="text-[9px] font-bold mb-0.5" style={{ color:"#888888", letterSpacing:"0.05em" }}>{s.l}</div>
                        <div className="text-[10px] font-bold" style={{ color:"#333333" }}>{s.v}</div>
                      </div>
                    ))}
                  </div>
                  <p className="text-[11px] leading-relaxed" style={{ color:"#666666" }}>
                    <span className="font-semibold" style={{ color:"#444444" }}>Use: </span>{p.use}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3 rounded text-sm font-bold text-white transition-all"
              style={{ background:"var(--orange)" }}
              onMouseEnter={e=>(e.currentTarget.style.boxShadow="0 8px 24px rgba(249,115,22,0.35)")}
              onMouseLeave={e=>(e.currentTarget.style.boxShadow="")}>
              Request a Quote <ArrowRight size={15}/>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Salt — Coming Soon ──────────────────────────────── */}
      <section ref={saltRef} className="py-20 px-6" style={{ background:"#f5f5f5" }}>
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity:0,y:20 }} animate={s3?{opacity:1,y:0}:{}} transition={{ duration:0.5 }}
                      className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <div className="section-tag">NEW VERTICAL</div>
              <span className="px-2.5 py-1 rounded text-[10px] font-black text-white"
                    style={{ background:"#64748b", letterSpacing:"0.06em" }}>COMING SOON</span>
            </div>
            <h2 className="text-3xl font-black" style={{ color:"#111111" }}>
              Salt Products
            </h2>
            <p className="mt-2 text-sm max-w-lg" style={{ color:"#666666" }}>
              Ambition is expanding into essential commodities. Industrial Grade Salt and a dedicated Edible Salt brand will be launching soon under the Ambition umbrella.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {saltProducts.map((s,i)=>(
              <motion.div key={s.name}
                initial={{ opacity:0,y:30 }} animate={s3?{opacity:1,y:0}:{}}
                transition={{ duration:0.5, delay:i*0.1 }}
                className="rounded-xl overflow-hidden relative"
                style={{ background:"white", border:"1px solid #e5e5e5" }}>
                {/* Coming soon overlay badge */}
                <div className="absolute top-4 right-4 z-10 px-2.5 py-1 rounded text-[10px] font-black"
                     style={{ background:"#64748b", color:"white", letterSpacing:"0.06em" }}>
                  COMING SOON
                </div>
                <div className="relative overflow-hidden" style={{ height:200 }}>
                  <img src="https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80&fit=crop"
                       alt="Salt" className="w-full h-full object-cover" style={{ filter:"grayscale(0.2) brightness(0.8)" }}/>
                  <div className="absolute inset-0" style={{ background:"linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 60%)" }}/>
                  <div className="absolute bottom-4 left-5 text-3xl">{s.icon}</div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-base mb-2" style={{ color:"#111111" }}>{s.name}</h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color:"#555555" }}>{s.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {s.specs.map(sp=>(
                      <span key={sp} className="px-2.5 py-1 rounded text-[11px] font-semibold"
                            style={{ background:"#f0f0f0", border:"1px solid #e0e0e0", color:"#555555" }}>{sp}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Notify / contact strip */}
          <motion.div initial={{ opacity:0,y:20 }} animate={s3?{opacity:1,y:0}:{}} transition={{ duration:0.5, delay:0.3 }}
                      className="mt-10 rounded-xl p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
                      style={{ background:"#ffffff", border:"1px solid #e5e5e5" }}>
            <div>
              <div className="font-bold text-base mb-1" style={{ color:"#111111" }}>Interested in our Salt vertical?</div>
              <p className="text-sm" style={{ color:"#666666" }}>Contact us to register your interest — we'll be in touch when we launch.</p>
            </div>
            <Link href="/contact"
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded text-sm font-bold text-white transition-all whitespace-nowrap"
              style={{ background:"var(--orange)" }}
              onMouseEnter={e=>(e.currentTarget.style.boxShadow="0 8px 24px rgba(249,115,22,0.35)")}
              onMouseLeave={e=>(e.currentTarget.style.boxShadow="")}>
              Get in Touch <ArrowRight size={14}/>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
