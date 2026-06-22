"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const services = [
  {
    icon:"⛏️", title:"Coal Trading & Sourcing",
    desc:"Our main focus is sourcing & supplying Steam Coal from Indonesia and South Africa, delivered to customers nationwide at their doorstep. We provide the highest quality coal from the finest mines across the world at competitive prices — with independent international testing from mine to mother vessel.",
    tags:["Steam Coal","Imported Coal","Indonesia","South Africa"],
    tall:true,
  },
  {
    icon:"🚢", title:"Stevedoring",
    desc:"Loading and unloading ships is specialised work. Our expert personnel and state-of-the-art equipment handle a broad range of cargo — from break bulk to high & heavy and containers — with 'delay recovery' to ensure goods arrive on time.",
    tags:["Loading","Unloading","Delay Recovery"],
    tall:false,
  },
  {
    icon:"🚛", title:"Road Transportation",
    desc:"Road transportation is indispensable to commerce and industry. Our network of experienced personnel ensures dispatch of proper quality & quantity to esteemed clients, with additional services like loading, unloading and packing on request.",
    tags:["Door-step Delivery","Packing","Dispatch"],
    tall:false,
  },
  {
    icon:"🏗️", title:"Unloading",
    desc:"Loading/unloading of cargoes from railway rakes and loading to the client's motor vehicles. Our storage units are equipped with special platforms, weighing and loading/unloading machinery for efficient fuel storage operations.",
    tags:["Railway Rakes","Storage","Weighing"],
    tall:false,
  },
  {
    icon:"📦", title:"Stacking",
    desc:"Efficient coal stacking to produce optimal industrial outcomes — avoiding oxidation, spontaneous combustion, self-heating and moisture increase. Various state-of-the-art machines are used for stacking raw material on the stockpiles.",
    tags:["Stockpiles","Anti-oxidation","Machinery"],
    tall:false,
  },
  {
    icon:"🪨", title:"Minerals Trading",
    desc:"Beyond coal, Ambition is engaged with other minerals — Manganese ore, Chrome ore and Silica ore — applying our extensive physical trading positions across major origins including Indonesia, South Africa, Kenya and Zimbabwe.",
    tags:["Manganese","Chrome Ore","Silica Ore"],
    tall:false,
  },
];

const products = [
  { name:"Steam Coal — Indonesia",    gcv:"5500–6500 kcal/kg", ash:"10–18%", moisture:"8–12%",  use:"Power plants, cement, steel, textile & paper" },
  { name:"Steam Coal — South Africa", gcv:"5800–6200 kcal/kg", ash:"12–16%", moisture:"8–11%",  use:"Power utilities, West & East coast India"      },
  { name:"Steam Coal — Kenya/Zimbabwe",gcv:"5000–6000 kcal/kg",ash:"14–20%", moisture:"9–13%",  use:"Industrial boilers, captive power plants"      },
  { name:"Coking Coal",               gcv:"6000–7500 kcal/kg", ash:"8–12%",  moisture:"8–10%",  use:"Steel & metallurgy customers across India"     },
];

export default function ServicesPage() {
  const gridRef    = useRef<HTMLElement>(null);
  const productRef = useRef<HTMLElement>(null);
  const t1 = useInView(gridRef,    { once:true, margin:"-80px" });
  const t2 = useInView(productRef, { once:true, margin:"-80px" });

  const tilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget as HTMLDivElement;
    const r  = el.getBoundingClientRect();
    const x  = e.clientX - r.left, y = e.clientY - r.top;
    el.style.transform = `perspective(800px) rotateX(${-((y-r.height/2)/r.height)*8}deg) rotateY(${((x-r.width/2)/r.width)*8}deg)`;
    const spot = el.querySelector(".spot") as HTMLElement;
    if (spot) { spot.style.left = x+"px"; spot.style.top = y+"px"; spot.style.opacity = "1"; }
  };
  const resetTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget as HTMLDivElement;
    el.style.transform = "";
    const spot = el.querySelector(".spot") as HTMLElement;
    if (spot) spot.style.opacity = "0";
  };

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 text-center px-6"
               style={{ background:"linear-gradient(135deg, #0a0a0a, #140800 50%, #0a0a0a)" }}>
        <motion.div initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.6 }}>
          <div className="section-tag mb-4">WHAT WE DO</div>
          <h1 className="font-black mb-4" style={{ fontSize:"clamp(32px,5vw,60px)", lineHeight:1.1 }}>
            Industrial <span style={{ color:"var(--orange)" }}>Solutions</span>
          </h1>
          <p className="max-w-lg mx-auto text-base" style={{ color:"rgba(255,255,255,0.45)" }}>
            Comprehensive energy and logistics services tailored for every industrial need.
          </p>
        </motion.div>
      </section>

      {/* Bento grid */}
      <section ref={gridRef} className="py-20 px-6" style={{ background:"var(--offwhite)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ gridAutoRows:"220px" }}>
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity:0,y:30 }} animate={t1?{opacity:1,y:0}:{}}
                transition={{ duration:0.5, delay: i*0.07 }}
                onMouseMove={tilt}
                onMouseLeave={(e) => {
                  resetTilt(e);
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor=""; el.style.boxShadow="";
                }}
                className="relative overflow-hidden rounded-2xl p-7 group"
                style={{
                  background:"white", border:"1px solid #ebebeb",
                  gridRow: s.tall ? "span 2" : "span 1",
                  transition:"border-color .3s, box-shadow .3s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = "rgba(249,115,22,0.3)";
                  el.style.boxShadow   = "0 16px 50px rgba(0,0,0,0.07)";
                }}
              >
                <div className="spot absolute w-44 h-44 rounded-full pointer-events-none transition-opacity duration-200"
                     style={{ transform:"translate(-50%,-50%)", background:"radial-gradient(circle, rgba(249,115,22,0.1) 0%, transparent 70%)", opacity:0 }} />
                <div className="absolute bottom-0 left-0 right-0 h-0.5 origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100"
                     style={{ background:"var(--orange)" }} />
                <span className="text-3xl mb-4 block">{s.icon}</span>
                <h3 className="font-bold text-base mb-2" style={{ color:"var(--text-primary)" }}>{s.title}</h3>
                <p className="text-xs leading-relaxed mb-4" style={{ color:"var(--text-secondary)" }}>{s.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {s.tags.map((t) => (
                    <span key={t} className="px-2 py-1 rounded-full text-[10px] font-bold"
                          style={{ background:"rgba(249,115,22,0.07)", color:"var(--orange)" }}>{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products table */}
      <section ref={productRef} className="py-20 px-6" style={{ background:"var(--charcoal)" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity:0,y:20 }} animate={t2?{opacity:1,y:0}:{}} transition={{ duration:0.5 }}
                      className="text-center mb-12">
            <div className="section-tag">PRODUCTS</div>
            <h2 className="text-3xl font-black">Coal <span style={{ color:"var(--orange)" }}>Portfolio</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {products.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity:0,y:30 }} animate={t2?{opacity:1,y:0}:{}}
                transition={{ duration:0.5, delay: i*0.1 }}
                className="rounded-2xl p-6 transition-all duration-300"
                style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)" }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor="rgba(249,115,22,0.3)"; el.style.transform="translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor=""; el.style.transform="";
                }}
              >
                <h3 className="font-bold text-sm mb-4" style={{ color:"var(--orange)" }}>{p.name}</h3>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label:"GCV", value:p.gcv },
                    { label:"Ash", value:p.ash },
                    { label:"Moisture", value:p.moisture },
                  ].map((spec) => (
                    <div key={spec.label} className="rounded-xl p-3 text-center"
                         style={{ background:"rgba(255,255,255,0.04)" }}>
                      <div className="text-xs font-bold mb-1" style={{ color:"rgba(255,255,255,0.3)" }}>{spec.label}</div>
                      <div className="text-xs font-bold text-white">{spec.value}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-xs" style={{ color:"rgba(255,255,255,0.35)" }}>
                  <span className="font-bold" style={{ color:"rgba(255,255,255,0.5)" }}>Applications: </span>
                  {p.use}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-sm font-bold"
              style={{ background:"var(--orange)", color:"white" }}>
              Request a Quote <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
