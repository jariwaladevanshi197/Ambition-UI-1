"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { MapPin, Users, Heart, Globe, CheckCircle, TreePine, BookOpen, HeartPulse, Droplets, GraduationCap, Leaf, X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface Counter { num:number; suffix:string; label:string; Icon:LucideIcon; color:string; }
interface Project { type:string; Icon:LucideIcon; color:string; title:string; desc:string; stats:{val:string;label:string}[]; items:string[]; image:string; }

const counters: Counter[] = [
  { num:5,      suffix:"",  label:"CSR Project Types", Icon:Globe,        color:"#8b5cf6" },
  { num:20,     suffix:"+", label:"Active Projects",   Icon:CheckCircle,  color:"#F97316" },
  { num:5000,   suffix:"+", label:"Beneficiaries",     Icon:Users,        color:"#22c55e" },
  { num:50000,  suffix:"+", label:"Trees Planted",     Icon:TreePine,     color:"#16a34a" },
];

const projects: Project[] = [
  {
    type:"Education",          Icon:BookOpen,      color:"#3b82f6",
    title:"School Adoption Program",
    desc:"Adopted 4 government schools across Jharkhand, Maharashtra, Chhattisgarh and Andhra Pradesh. Provided infrastructure upgrades, libraries, computer labs and mid-day meal support.",
    stats:[{ val:"4",    label:"Schools" },{ val:"1,810", label:"Students" }],
    items:["Govt. Primary School, Dhanbad — 450 students","Zilla Parishad School, Nagpur — 320 students","Model School, Korba — 580 students","Municipal School, Visakhapatnam — 460 students"],
    image:"/images/Gemini_Generated_Image_9jp8wd9jp8wd9jp8.png",
  },
  {
    type:"Healthcare",         Icon:HeartPulse,    color:"#22c55e",
    title:"Community Healthcare Initiative",
    desc:"Monthly free medical camps in tribal and mining-adjacent communities. Over 1,200 patients served per year with doctors from partner hospitals.",
    stats:[{ val:"12",   label:"Camps/Year" },{ val:"1,200+", label:"Patients" }],
    items:["Free OPD in Dhanbad, Korba & Raipur","Medicine distribution to 12 PHCs","Eye & dental check-up camps","Mental health awareness drives"],
    image:"/images/Gemini_Generated_Image_y1eikuy1eikuy1ei.png",
  },
  {
    type:"Water & Sanitation", Icon:Droplets,      color:"#0ea5e9",
    title:"Clean Water Access",
    desc:"Installed bore-wells and water purification units in 6 villages around our operational areas. Over 3,000 villagers now have clean drinking water.",
    stats:[{ val:"12",   label:"Bore-wells" },{ val:"3,000+", label:"Villagers" }],
    items:["12 bore-well installations","4 community water purification units","3 rainwater harvesting structures","Sanitation block construction"],
    image:"/images/port.jpg",
  },
  {
    type:"Women Empowerment",  Icon:GraduationCap, color:"#ec4899",
    title:"Women Skill Development",
    desc:"Skill development workshops in weaving, tailoring, digital literacy and self-help group formation. 180 women trained and linked to livelihood opportunities.",
    stats:[{ val:"180",  label:"Women Trained" },{ val:"8",  label:"SHGs Formed" }],
    items:["Tailoring & weaving workshops","Digital literacy programs","Micro-finance & SHG support","Entrepreneurship mentoring"],
    image:"/images/Gemini_Generated_Image_6wi0526wi0526wi0.png",
  },
  {
    type:"Environment",        Icon:Leaf,          color:"#16a34a",
    title:"Green India Drive",
    desc:"Annual plantation drives, e-waste collection and ESG-aligned operational practices. 50,000+ trees planted since 2015 across 5 states.",
    stats:[{ val:"50K+", label:"Trees Planted" },{ val:"5",  label:"States" }],
    items:["50,000+ saplings across 5 states","E-waste collection drives","Solar panels at offices","Carbon footprint audit & reporting"],
    image:"/images/shipping.jpg",
  },
];

const impactNumbers = [
  { val:"₹2.5 Cr",  label:"CSR Spend (FY 2023–24)" },
  { val:"5 States", label:"Operational Reach" },
  { val:"20+",      label:"Active Projects" },
  { val:"2003",     label:"CSR Journey Began" },
];

function CounterCard({ num, suffix, label, Icon, color, active }: Counter & { active:boolean }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let cur = 0;
    const steps = 70, inc = num / steps;
    const id = setInterval(() => {
      cur += inc;
      if (cur >= num) { setVal(num); clearInterval(id); }
      else setVal(Math.floor(cur));
    }, 22);
    return () => clearInterval(id);
  }, [active, num]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="relative group flex flex-col items-center text-center p-8 rounded-3xl overflow-hidden transition-all duration-300 cursor-default"
      style={{
        background: "white",
        border: "1px solid rgba(0,0,0,0.07)",
        boxShadow: "0 2px 20px rgba(0,0,0,0.05)",
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "translateY(-6px)";
        el.style.boxShadow = `0 20px 48px ${color}22, 0 4px 12px rgba(0,0,0,0.06)`;
        el.style.borderColor = `${color}40`;
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "";
        el.style.boxShadow = "0 2px 20px rgba(0,0,0,0.05)";
        el.style.borderColor = "rgba(0,0,0,0.07)";
      }}
    >
      {/* subtle top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-3xl"
           style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }} />

      {/* icon bubble */}
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
           style={{ background: `${color}12`, border: `1px solid ${color}25` }}>
        <Icon size={26} style={{ color }} strokeWidth={1.6} />
      </div>

      {/* animated number */}
      <div className="text-5xl font-black mb-2 leading-none tabular-nums"
           style={{ color, letterSpacing: "-1px" }}>
        {val.toLocaleString()}{suffix}
      </div>

      {/* label */}
      <div className="text-xs font-semibold uppercase tracking-widest mt-1"
           style={{ color: "rgba(0,0,0,0.4)" }}>
        {label}
      </div>
    </motion.div>
  );
}

const csrGallery = [
  { src:"/images/Gemini_Generated_Image_9jp8wd9jp8wd9jp8.png",     label:"Community Outreach",       tag:"Education"         },
  { src:"/images/Gemini_Generated_Image_680jx7680jx7680j.png",     label:"Mining Site Operations",   tag:"Environment"       },
  { src:"/images/port.jpg",                                         label:"Port Logistics",           tag:"Water & Sanitation" },
  { src:"/images/Gemini_Generated_Image_y1eikuy1eikuy1ei.png",     label:"Coal Processing Plant",    tag:"Healthcare"        },
  { src:"/images/shipping.jpg",                                     label:"Shipping & Export",        tag:"Environment"       },
  { src:"/images/Gemini_Generated_Image_maelcimaelcimael.png",     label:"Coal Transport",           tag:"Community"         },
  { src:"/images/Gemini_Generated_Image_urm0uqurm0uqurm0.png",    label:"Coal Yard Operations",     tag:"Education"         },
  { src:"/images/Gemini_Generated_Image_imewt4imewt4imew.png",     label:"Mineral Processing",       tag:"Women Empowerment" },
];

const TAG_COLORS: Record<string,string> = {
  Education:"#3b82f6", Healthcare:"#22c55e", "Water & Sanitation":"#0ea5e9",
  "Women Empowerment":"#ec4899", Environment:"#16a34a", Community:"#8b5cf6",
};

function CSRGallery() {
  const ref = useRef<HTMLElement>(null);
  const inV = useInView(ref, { once:true, margin:"-60px" });
  const [active, setActive] = useState<number|null>(null);

  const prev = () => setActive(i => i !== null ? (i - 1 + csrGallery.length) % csrGallery.length : null);
  const next = () => setActive(i => i !== null ? (i + 1) % csrGallery.length : null);

  return (
    <section ref={ref} className="py-24 px-6" style={{ background:"linear-gradient(135deg,#0f0f0f,#1a1a1a,#111)" }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity:0, y:20 }} animate={inV?{opacity:1,y:0}:{}} transition={{ duration:0.5 }}
                    className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
               style={{ background:"rgba(249,115,22,0.12)", border:"1px solid rgba(249,115,22,0.25)", color:"var(--orange)" }}>
            CSR Gallery
          </div>
          <h2 className="text-3xl font-black text-white mb-2">
            Impact in <span style={{ color:"var(--orange)" }}>Pictures</span>
          </h2>
          <p className="text-sm" style={{ color:"rgba(255,255,255,0.4)" }}>
            A glimpse into our community programs, environmental drives & operational activities
          </p>
        </motion.div>

        {/* Bento-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[180px]">
          {csrGallery.map((g, i) => {
            const color = TAG_COLORS[g.tag] || "#F97316";
            // Make first and 5th items span 2 rows for bento effect
            const tall = i === 0 || i === 5;
            return (
              <motion.div
                key={i}
                initial={{ opacity:0, scale:0.94 }}
                animate={inV ? { opacity:1, scale:1 } : {}}
                transition={{ duration:0.4, delay:i*0.06 }}
                className={`relative group cursor-pointer overflow-hidden rounded-2xl ${tall ? "row-span-2" : ""}`}
                onClick={() => setActive(i)}
              >
                <img src={g.src} alt={g.label}
                     className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                     style={{ filter:"brightness(0.75)" }} />

                {/* Hover overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center"
                     style={{ background:"rgba(0,0,0,0.45)" }}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center"
                       style={{ background:"rgba(255,255,255,0.15)", border:"1px solid rgba(255,255,255,0.3)" }}>
                    <ZoomIn size={20} className="text-white"/>
                  </div>
                </div>

                {/* Bottom info */}
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-1 group-hover:translate-y-0 transition-transform duration-300"
                     style={{ background:"linear-gradient(to top, rgba(0,0,0,0.8), transparent)" }}>
                  <div className="text-white text-xs font-bold leading-tight">{g.label}</div>
                  <div className="text-[10px] font-semibold mt-0.5" style={{ color }}>● {g.tag}</div>
                </div>

                {/* Top color accent */}
                <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background:color }}/>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background:"rgba(0,0,0,0.93)", backdropFilter:"blur(14px)" }}
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale:0.87, y:20 }} animate={{ scale:1, y:0 }} exit={{ scale:0.87 }}
              transition={{ duration:0.28, ease:"easeOut" }}
              className="relative max-w-4xl w-full mx-6"
              onClick={e => e.stopPropagation()}
            >
              <img src={csrGallery[active].src} alt={csrGallery[active].label}
                   className="w-full rounded-2xl object-cover shadow-2xl"
                   style={{ maxHeight:"80vh" }}/>

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-5 rounded-b-2xl"
                   style={{ background:"linear-gradient(to top,rgba(0,0,0,0.85),transparent)" }}>
                <div className="text-white font-bold text-base">{csrGallery[active].label}</div>
                <div className="text-xs mt-0.5 font-semibold" style={{ color:TAG_COLORS[csrGallery[active].tag]||"var(--orange)" }}>
                  {csrGallery[active].tag}
                </div>
              </div>

              {/* Counter */}
              <div className="absolute top-4 left-5 px-3 py-1 rounded-full text-xs font-bold"
                   style={{ background:"rgba(0,0,0,0.5)", color:"rgba(255,255,255,0.6)", backdropFilter:"blur(6px)" }}>
                {active+1} / {csrGallery.length}
              </div>

              {/* Close */}
              <button onClick={() => setActive(null)}
                      className="absolute -top-4 -right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all"
                      style={{ background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.2)" }}
                      onMouseEnter={e=>(e.currentTarget.style.background="rgba(249,115,22,0.8)")}
                      onMouseLeave={e=>(e.currentTarget.style.background="rgba(255,255,255,0.1)")}>
                <X size={16} className="text-white"/>
              </button>

              {/* Prev / Next */}
              {[{ Icon:ChevronLeft, fn:prev, side:"left-3" }, { Icon:ChevronRight, fn:next, side:"right-3" }].map(({Icon,fn,side})=>(
                <button key={side} onClick={fn}
                        className={`absolute ${side} top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center transition-all`}
                        style={{ background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.18)" }}
                        onMouseEnter={e=>(e.currentTarget.style.background="rgba(249,115,22,0.75)")}
                        onMouseLeave={e=>(e.currentTarget.style.background="rgba(255,255,255,0.08)")}>
                  <Icon size={22} className="text-white"/>
                </button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default function CSRPage() {
  const [activeProject, setActiveProject] = useState(0);
  const counterRef  = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const c1 = useInView(counterRef,  { once:true, margin:"-60px" });
  const c2 = useInView(projectsRef, { once:true, margin:"-60px" });

  const proj = projects[activeProject];

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 text-center px-6 overflow-hidden"
               style={{ background:"linear-gradient(135deg, #ffffff, #f0fff4 50%, #ffffff)" }}>
        <div className="absolute inset-0 pointer-events-none"
             style={{ background:"radial-gradient(circle 500px at 50% 60%, rgba(34,197,94,0.06), transparent)" }}/>
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}>
          <div className="section-tag mb-4" style={{ color:"#22c55e", borderColor:"rgba(34,197,94,0.3)", background:"rgba(34,197,94,0.08)" }}>
            CSR & IMPACT
          </div>
          <h1 className="font-black mb-4" style={{ fontSize:"clamp(30px,5vw,60px)", lineHeight:1.1 }}>
            Creating Impact<br/>
            <span style={{ color:"var(--orange)" }}>Beyond Business.</span>
          </h1>
          <p className="max-w-xl mx-auto text-base mb-8" style={{ color:"rgba(0,0,0,0.55)" }}>
            Our commitment to community, education, environment and healthcare shapes every decision we make.
          </p>
          <Link href="/activities"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all"
                style={{ background:"rgba(249,115,22,0.1)", border:"1px solid rgba(249,115,22,0.3)", color:"var(--orange)" }}
                onMouseEnter={e=>(e.currentTarget.style.background="rgba(249,115,22,0.2)")}
                onMouseLeave={e=>(e.currentTarget.style.background="rgba(249,115,22,0.1)")}>
            See All Activities →
          </Link>
        </motion.div>
      </section>

      {/* Counters */}
      <section ref={counterRef} className="relative py-24 px-6 overflow-hidden"
               style={{ background:"linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #111111 100%)" }}>
        {/* decorative blobs */}
        <div className="absolute inset-0 pointer-events-none"
             style={{ background:"radial-gradient(circle 600px at 20% 50%, rgba(249,115,22,0.07), transparent), radial-gradient(circle 400px at 80% 50%, rgba(139,92,246,0.06), transparent)" }} />
        <div className="absolute inset-0 pointer-events-none"
             style={{ backgroundImage:"linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize:"48px 48px" }} />

        <div className="relative max-w-5xl mx-auto">
          {/* section label */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
                 style={{ background:"rgba(249,115,22,0.12)", border:"1px solid rgba(249,115,22,0.25)", color:"var(--orange)" }}>
              Impact at a Glance
            </div>
            <h2 className="text-3xl font-black text-white">Our <span style={{ color:"var(--orange)" }}>Numbers</span> Speak</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {counters.map(c=>(
              <CounterCard key={c.label} {...c} active={c1}/>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Numbers strip */}
      <div className="py-5 px-6 overflow-x-auto" style={{ background:"rgba(249,115,22,0.06)", borderTop:"1px solid rgba(249,115,22,0.1)", borderBottom:"1px solid rgba(249,115,22,0.1)" }}>
        <div className="flex items-center justify-center gap-8 min-w-max mx-auto">
          {impactNumbers.map((n,i)=>(
            <div key={n.label} className="flex items-center gap-8">
              <div className="text-center">
                <div className="text-lg font-black" style={{ color:"var(--orange)" }}>{n.val}</div>
                <div className="text-[10px] font-bold mt-0.5" style={{ color:"rgba(0,0,0,0.5)" }}>{n.label}</div>
              </div>
              {i < impactNumbers.length-1 && <div style={{ width:1, height:32, background:"rgba(0,0,0,0.12)" }}/>}
            </div>
          ))}
        </div>
      </div>

      {/* Projects explorer */}
      <section ref={projectsRef} className="py-20 px-6" style={{ background:"#ffffff" }}>
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity:0,y:20 }} animate={c2?{opacity:1,y:0}:{}} transition={{ duration:0.5 }}
                      className="text-center mb-12">
            <div className="section-tag">OUR PROGRAMS</div>
            <h2 className="text-3xl font-black">CSR <span style={{ color:"var(--orange)" }}>Projects</span></h2>
          </motion.div>

          <div style={{ display:"grid", gridTemplateColumns:"200px 1fr", gap:"20px", alignItems:"start" }}>
            {/* Sidebar tabs */}
            <div className="flex flex-col gap-2">
              {projects.map((p,i)=>(
                <button key={p.type} onClick={()=>setActiveProject(i)}
                        className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-all duration-200 w-full"
                        style={{
                          background: activeProject===i ? `${p.color}15` : "rgba(0,0,0,0.03)",
                          border: `1px solid ${activeProject===i ? p.color+"50" : "rgba(0,0,0,0.08)"}`,
                          borderLeft: activeProject===i ? `3px solid ${p.color}` : "1px solid rgba(0,0,0,0.08)",
                          boxShadow: activeProject===i ? `0 0 18px ${p.color}18` : "none",
                        }}>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                       style={{ background:`${p.color}18` }}>
                    <p.Icon size={15} style={{ color:p.color }} strokeWidth={1.75}/>
                  </div>
                  <span className="text-xs font-bold leading-tight" style={{ color:activeProject===i?p.color:"rgba(0,0,0,0.55)" }}>{p.type}</span>
                </button>
              ))}
            </div>

            {/* Detail panel */}
            <motion.div
              key={activeProject}
              initial={{ opacity:0, x:16 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.35 }}
              className="rounded-2xl overflow-hidden"
              style={{ background:"rgba(0,0,0,0.02)", border:`1px solid ${proj.color}25` }}
            >
              <div className="grid md:grid-cols-[1fr_280px]">
                {/* Left: content */}
                <div className="p-7">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                         style={{ background:`${proj.color}15` }}>
                      <proj.Icon size={28} style={{ color:proj.color }} strokeWidth={1.5}/>
                    </div>
                    <div>
                      <div className="text-[10px] font-black tracking-widest mb-1" style={{ color:proj.color }}>{proj.type.toUpperCase()}</div>
                      <h3 className="text-xl font-black text-gray-900">{proj.title}</h3>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed mb-6" style={{ color:"rgba(0,0,0,0.6)" }}>{proj.desc}</p>

                  {/* Stats */}
                  <div className="flex gap-6 mb-6 pb-6" style={{ borderBottom:"1px solid rgba(0,0,0,0.1)" }}>
                    {proj.stats.map(s=>(
                      <div key={s.label}>
                        <div className="text-2xl font-black" style={{ color:proj.color }}>{s.val}</div>
                        <div className="text-[10px] font-bold mt-0.5" style={{ color:"rgba(0,0,0,0.45)" }}>{s.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Items */}
                  <ul className="flex flex-col gap-2.5">
                    {proj.items.map(item=>(
                      <li key={item} className="flex items-start gap-2.5 text-sm" style={{ color:"rgba(0,0,0,0.65)" }}>
                        <div className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ background:proj.color }}/>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right: image */}
                <div className="relative hidden md:block overflow-hidden" style={{ minHeight:280 }}>
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
                    style={{ transform:"scale(1.04)", filter:"brightness(0.85) saturate(0.9)" }}
                  />
                  {/* gradient fade left */}
                  <div className="absolute inset-0" style={{ background:`linear-gradient(to right, rgba(248,249,250,0.95) 0%, transparent 35%)` }}/>
                  {/* color tint */}
                  <div className="absolute inset-0" style={{ background:`${proj.color}18` }}/>
                  {/* label badge */}
                  <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-xl text-[10px] font-black backdrop-blur-sm"
                       style={{ background:`${proj.color}cc`, color:"white" }}>
                    {proj.type}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CSR Gallery */}
      <CSRGallery />

      {/* CTA strip */}
      <section className="py-16 px-6 text-center" style={{ background:"#f9f9f9" }}>
        <div className="max-w-2xl mx-auto">
          <Heart size={28} className="mx-auto mb-4" style={{ color:"var(--orange)" }}/>
          <h2 className="text-2xl font-black text-gray-900 mb-3">Want to Partner with Us?</h2>
          <p className="text-sm mb-6" style={{ color:"rgba(0,0,0,0.5)" }}>
            We welcome NGOs, government bodies, and corporations to collaborate on CSR initiatives across India.
          </p>
          <Link href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all"
                style={{ background:"var(--orange)" }}
                onMouseEnter={e=>(e.currentTarget.style.boxShadow="0 8px 24px rgba(249,115,22,0.4)")}
                onMouseLeave={e=>(e.currentTarget.style.boxShadow="")}>
            Get in Touch →
          </Link>
        </div>
      </section>
    </>
  );
}
