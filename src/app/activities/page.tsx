"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Ship, Layers, ArrowRightLeft, Globe2, FlaskConical, Boxes, Truck, Train, Pickaxe,
  Calendar, TrendingUp, X, ChevronLeft, ChevronRight
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Activity {
  Icon: LucideIcon;
  cat: string;
  title: string;
  date: string;
  desc: string;
  highlight: string;
  highlightLabel: string;
}

const OPS_CATEGORIES = ["Port Operations", "Trading", "Logistics", "Minerals"];

const OPS_CATEGORY_COLORS: Record<string,string> = {
  "Port Operations":"#3b82f6", Trading:"#F97316", Logistics:"#22c55e", Minerals:"#64748b",
};

const activities: Activity[] = [
  { Icon:Ship,           cat:"Port Operations", title:"Bulk Vessel Unloading",       date:"Ongoing", desc:"High-capacity unloading of bulk carriers at 15+ major Indian ports including Paradip, Haldia and Vizag.",                     highlight:"15+",       highlightLabel:"Ports Operated" },
  { Icon:Layers,         cat:"Port Operations", title:"Stacking & Heaping",          date:"Ongoing", desc:"Systematic stacking and heaping of coal and minerals to prevent oxidation and preserve material quality.",                    highlight:"20+",       highlightLabel:"Active Yards" },
  { Icon:ArrowRightLeft, cat:"Port Operations", title:"Internal Shifting",           date:"Ongoing", desc:"Efficient movement of cargo within port premises between berths, yards and storage zones.",                                  highlight:"24/7",      highlightLabel:"Yard Operations" },
  { Icon:Globe2,         cat:"Trading",         title:"International Coal Sourcing", date:"Ongoing", desc:"Direct sourcing partnerships across Indonesia, South Africa, Kenya and Zimbabwe with independent quality testing.",           highlight:"4",         highlightLabel:"Sourcing Countries" },
  { Icon:FlaskConical,   cat:"Trading",         title:"Quality Assurance Testing",   date:"Ongoing", desc:"Independent international testing at mine, mother vessel and final delivery — for every shipment, every time.",               highlight:"3-Stage",   highlightLabel:"Testing Process" },
  { Icon:Boxes,          cat:"Trading",         title:"Salt Trading",                date:"New",     desc:"Industrial Grade Salt available now, with a dedicated Edible Salt brand launching soon.",                                     highlight:"2",         highlightLabel:"Product Lines" },
  { Icon:Truck,          cat:"Logistics",       title:"Road Dispatch",               date:"Ongoing", desc:"Doorstep delivery covering 50+ cities through our dedicated road transport network.",                                        highlight:"50+",       highlightLabel:"Cities Served" },
  { Icon:Train,          cat:"Logistics",       title:"Rail Dispatch",               date:"Ongoing", desc:"Bulk cargo movement via railway rakes for long-distance, high-volume delivery.",                                              highlight:"Pan-India", highlightLabel:"Rail Network" },
  { Icon:Pickaxe,        cat:"Minerals",        title:"Minerals Sourcing",           date:"Ongoing", desc:"Manganese, Silica and Zinc ore sourced from Zimbabwe, Kenya and Mozambique.",                                                 highlight:"3",         highlightLabel:"Ore Types" },
];

const ALL_CATS = ["All", ...OPS_CATEGORIES];

const heroStats = [
  { value:"20+",  label:"Years Experience" },
  { value:"15+",  label:"Ports Operated" },
  { value:"50+",  label:"Cities Served" },
  { value:"1M+",  label:"Tons Delivered" },
];

const galleryItems = [
  { src:"/images/Gemini_Generated_Image_680jx7680jx7680j.png",    label:"Open Pit Mining",        cat:"Mining"    },
  { src:"/images/Gemini_Generated_Image_9jp8wd9jp8wd9jp8.png",    label:"Coal Processing",        cat:"Coal"      },
  { src:"/images/port.jpg",                                        label:"Port Operations",        cat:"Logistics" },
  { src:"/images/Gemini_Generated_Image_y1eikuy1eikuy1ei.png",    label:"Mining Operations",      cat:"Mining"    },
  { src:"/images/shipping.jpg",                                    label:"Shipping & Export",      cat:"Logistics" },
  { src:"/images/Gemini_Generated_Image_maelcimaelcimael.png",    label:"Coal Transport",         cat:"Logistics" },
  { src:"/images/Gemini_Generated_Image_urm0uqurm0uqurm0.png",   label:"Coal Yard",              cat:"Coal"      },
  { src:"/images/Gemini_Generated_Image_imewt4imewt4imew.png",    label:"Mineral Processing",     cat:"Coal"      },
  { src:"/images/Gemini_Generated_Image_6wi0526wi0526wi0.png",    label:"Bulk Cargo Handling",    cat:"Logistics" },
];

function Gallery() {
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once:true, margin:"-60px" });
  const [lightbox, setLightbox] = useState<number|null>(null);
  const [filter, setFilter]     = useState("All");

  const cats = ["All", "Mining", "Coal", "Logistics"];
  const visible = filter === "All" ? galleryItems : galleryItems.filter(g => g.cat === filter);

  const prev = () => setLightbox(i => i !== null ? (i - 1 + visible.length) % visible.length : null);
  const next = () => setLightbox(i => i !== null ? (i + 1) % visible.length : null);

  return (
    <section ref={ref} className="py-24 px-6" style={{ background:"#0f0f0f" }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity:0, y:20 }} animate={inV?{opacity:1,y:0}:{}} transition={{ duration:0.5 }}
                    className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
               style={{ background:"rgba(249,115,22,0.12)", border:"1px solid rgba(249,115,22,0.25)", color:"var(--orange)" }}>
            Photo Gallery
          </div>
          <h2 className="text-3xl font-black text-white mb-2">
            Our <span style={{ color:"var(--orange)" }}>Operations</span> in Pictures
          </h2>
          <p className="text-sm" style={{ color:"rgba(255,255,255,0.4)" }}>
            A visual journey through our mining, logistics & port activities
          </p>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {cats.map(c => (
            <button key={c} onClick={() => setFilter(c)}
                    className="px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200"
                    style={{
                      background: filter===c ? "var(--orange)" : "rgba(255,255,255,0.06)",
                      color:      filter===c ? "white" : "rgba(255,255,255,0.5)",
                      border:     `1px solid ${filter===c ? "var(--orange)" : "rgba(255,255,255,0.1)"}`,
                    }}>
              {c}
            </button>
          ))}
        </div>

        {/* Masonry-style grid */}
        <AnimatePresence mode="popLayout">
          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {visible.map((g, i) => (
              <motion.div
                key={g.src + g.label + i}
                layout
                initial={{ opacity:0, scale:0.95 }}
                animate={{ opacity:1, scale:1 }}
                exit={{ opacity:0, scale:0.9 }}
                transition={{ duration:0.35, delay:i*0.04 }}
                className="relative group cursor-pointer overflow-hidden rounded-2xl"
                style={{ aspectRatio: i % 5 === 0 ? "16/10" : "4/3" }}
                onClick={() => setLightbox(i)}
              >
                <img src={g.src} alt={g.label}
                     className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                     style={{ filter:"brightness(0.8)" }}/>
                {/* hover overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                     style={{ background:"linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)" }}>
                  <span className="text-white text-sm font-bold">{g.label}</span>
                  <span className="text-[10px] font-semibold mt-0.5" style={{ color:"var(--orange)" }}>{g.cat}</span>
                </div>
                {/* category pill */}
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[9px] font-bold backdrop-blur-sm"
                     style={{ background:"rgba(249,115,22,0.75)", color:"white" }}>
                  {g.cat}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background:"rgba(0,0,0,0.92)", backdropFilter:"blur(12px)" }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale:0.88 }} animate={{ scale:1 }} exit={{ scale:0.88 }}
              transition={{ duration:0.25 }}
              className="relative max-w-4xl w-full mx-6"
              onClick={e => e.stopPropagation()}
            >
              <img src={visible[lightbox].src} alt={visible[lightbox].label}
                   className="w-full rounded-2xl object-cover"
                   style={{ maxHeight:"80vh" }}/>
              <div className="absolute bottom-0 left-0 right-0 p-5 rounded-b-2xl"
                   style={{ background:"linear-gradient(to top, rgba(0,0,0,0.8), transparent)" }}>
                <div className="text-white font-bold">{visible[lightbox].label}</div>
                <div className="text-xs mt-0.5" style={{ color:"var(--orange)" }}>{visible[lightbox].cat}</div>
              </div>
              {/* Close */}
              <button onClick={() => setLightbox(null)}
                      className="absolute -top-4 -right-4 w-9 h-9 rounded-full flex items-center justify-center"
                      style={{ background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.2)" }}>
                <X size={16} className="text-white"/>
              </button>
              {/* Prev / Next */}
              <button onClick={prev}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all"
                      style={{ background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.2)" }}
                      onMouseEnter={e=>(e.currentTarget.style.background="rgba(249,115,22,0.7)")}
                      onMouseLeave={e=>(e.currentTarget.style.background="rgba(255,255,255,0.1)")}>
                <ChevronLeft size={20} className="text-white"/>
              </button>
              <button onClick={next}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all"
                      style={{ background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.2)" }}
                      onMouseEnter={e=>(e.currentTarget.style.background="rgba(249,115,22,0.7)")}
                      onMouseLeave={e=>(e.currentTarget.style.background="rgba(255,255,255,0.1)")}>
                <ChevronRight size={20} className="text-white"/>
              </button>
              {/* Counter */}
              <div className="absolute bottom-4 right-5 text-xs font-bold" style={{ color:"rgba(255,255,255,0.5)" }}>
                {lightbox + 1} / {visible.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default function ActivitiesPage() {
  const [actCat, setActCat] = useState("All");
  const heroRef  = useRef<HTMLElement>(null);
  const listRef  = useRef<HTMLElement>(null);
  const h1 = useInView(heroRef, { once:true, margin:"-40px" });
  const l1 = useInView(listRef, { once:true, margin:"-60px" });

  const visible = actCat==="All" ? activities : activities.filter(a=>a.cat===actCat);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative pt-28 pb-16 px-6 overflow-hidden"
               style={{ background:"linear-gradient(160deg, #ffffff 0%, #fff7f0 55%, #ffffff 100%)" }}>
        <div className="absolute inset-0 pointer-events-none"
             style={{ background:"radial-gradient(circle 600px at 70% 40%, rgba(249,115,22,0.06), transparent)" }}/>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left — text */}
            <motion.div initial={{ opacity:0, y:24 }} animate={h1?{opacity:1,y:0}:{}} transition={{ duration:0.6 }}>
              <div className="section-tag mb-4">WHAT WE DO</div>
              <h1 className="font-black mb-4 leading-tight" style={{ fontSize:"clamp(32px,5vw,58px)" }}>
                Our <span style={{ color:"var(--orange)" }}>Activities</span>
              </h1>
              <p className="text-base mb-8 leading-relaxed" style={{ color:"rgba(0,0,0,0.55)", maxWidth:480 }}>
                From bulk vessel unloading to nationwide dispatch — here's how we keep India's coal, minerals and salt supply moving.
              </p>
            </motion.div>

            {/* Right — stat grid */}
            <motion.div initial={{ opacity:0, x:32 }} animate={h1?{opacity:1,x:0}:{}} transition={{ duration:0.65, delay:0.1 }}
                        className="grid grid-cols-2 gap-4">
              {heroStats.map((s, i) => (
                <motion.div key={s.label}
                            initial={{ opacity:0, y:20 }} animate={h1?{opacity:1,y:0}:{}} transition={{ duration:0.5, delay:0.15+i*0.07 }}
                            className="rounded-2xl p-6"
                            style={{ background:"rgba(0,0,0,0.025)", border:"1px solid rgba(0,0,0,0.07)" }}>
                  <div className="text-3xl font-black mb-1" style={{ color:"var(--orange)" }}>{s.value}</div>
                  <div className="text-xs font-semibold" style={{ color:"rgba(0,0,0,0.5)" }}>{s.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Core Operations ─────────────────────────────────── */}
      <section ref={listRef} className="py-20 px-6" style={{ background:"#f9f9f9" }}>
        <div className="max-w-6xl mx-auto">

          <motion.div initial={{ opacity:0, y:20 }} animate={l1?{opacity:1,y:0}:{}} transition={{ duration:0.5 }}
                      className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
            <div>
              <div className="section-tag">CAPABILITIES</div>
              <h2 className="text-3xl font-black">Our Core <span style={{ color:"var(--orange)" }}>Operations</span></h2>
            </div>
            {/* Category filter */}
            <div className="flex flex-wrap gap-2">
              {ALL_CATS.map(c=>(
                <button key={c} onClick={()=>setActCat(c)}
                        className="px-3.5 py-1.5 rounded-full text-[11px] font-bold transition-all duration-200"
                        style={{
                          background: actCat===c ? (OPS_CATEGORY_COLORS[c]||"var(--orange)") : "white",
                          color:      actCat===c ? "white" : "rgba(0,0,0,0.55)",
                          border:     `1px solid ${actCat===c ? (OPS_CATEGORY_COLORS[c]||"var(--orange)") : "rgba(0,0,0,0.1)"}`,
                        }}>
                  {c}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Cards — 2-col on md, 3-col on lg */}
          <AnimatePresence mode="popLayout">
            <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {visible.map((a, i) => {
                const color = OPS_CATEGORY_COLORS[a.cat] || "#666";
                return (
                  <motion.div
                    key={a.title}
                    layout
                    initial={{ opacity:0, y:28 }}
                    animate={{ opacity:1, y:0 }}
                    exit={{ opacity:0, scale:0.95 }}
                    transition={{ duration:0.38, delay: i*0.05 }}
                    className="rounded-2xl overflow-hidden flex flex-col"
                    style={{ background:"#ffffff", border:"1px solid rgba(0,0,0,0.07)", boxShadow:"0 2px 8px rgba(0,0,0,0.04)", transition:"all 0.25s" }}
                    onMouseEnter={e=>{const el=e.currentTarget as HTMLDivElement;el.style.borderColor=`${color}40`;el.style.boxShadow=`0 12px 32px ${color}18`;el.style.transform="translateY(-3px)";}}
                    onMouseLeave={e=>{const el=e.currentTarget as HTMLDivElement;el.style.borderColor="rgba(0,0,0,0.07)";el.style.boxShadow="0 2px 8px rgba(0,0,0,0.04)";el.style.transform="";}}
                  >
                    {/* Coloured top bar */}
                    <div className="h-1 w-full" style={{ background:`linear-gradient(90deg, ${color}, ${color}88)` }}/>

                    <div className="p-6 flex flex-col gap-4 flex-1">
                      {/* Icon + category */}
                      <div className="flex items-center justify-between">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                             style={{ background:`${color}14` }}>
                          <a.Icon size={22} style={{ color }} strokeWidth={1.75}/>
                        </div>
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold"
                              style={{ background:`${color}12`, color }}>
                          {a.cat}
                        </span>
                      </div>

                      {/* Title + date */}
                      <div>
                        <h3 className="font-bold text-sm text-gray-900 mb-1 leading-snug">{a.title}</h3>
                        <div className="flex items-center gap-1 text-[10px]" style={{ color:"rgba(0,0,0,0.38)" }}>
                          <Calendar size={10}/>
                          {a.date}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs leading-relaxed flex-1" style={{ color:"rgba(0,0,0,0.55)" }}>{a.desc}</p>

                      {/* Highlight metric */}
                      <div className="flex items-center gap-3 pt-3" style={{ borderTop:`1px solid ${color}18` }}>
                        <TrendingUp size={13} style={{ color }} />
                        <div>
                          <span className="text-base font-black" style={{ color }}>{a.highlight}</span>
                          <span className="text-[10px] ml-1.5 font-semibold" style={{ color:"rgba(0,0,0,0.4)" }}>{a.highlightLabel}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <Gallery />
    </>
  );
}
