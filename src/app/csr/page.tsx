"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Users, Heart, Globe, CheckCircle, TreePine, BookOpen, HeartPulse, Droplets, GraduationCap, Leaf, Trees, Recycle, Palette, Pill, Calendar, TrendingUp } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { CSR_CATEGORIES, CSR_CATEGORY_COLORS } from "@/lib/csrCategories";

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
    type:"Education",          Icon:BookOpen,      color:CSR_CATEGORY_COLORS["Education"],
    title:"School Adoption Program",
    desc:"Adopted 4 government schools across Jharkhand, Maharashtra, Chhattisgarh and Andhra Pradesh. Provided infrastructure upgrades, libraries, computer labs and mid-day meal support.",
    stats:[{ val:"4",    label:"Schools" },{ val:"1,810", label:"Students" }],
    items:["Govt. Primary School, Dhanbad — 450 students","Zilla Parishad School, Nagpur — 320 students","Model School, Korba — 580 students","Municipal School, Visakhapatnam — 460 students"],
    image:"/images/Gemini_Generated_Image_9jp8wd9jp8wd9jp8.png",
  },
  {
    type:"Healthcare",         Icon:HeartPulse,    color:CSR_CATEGORY_COLORS["Healthcare"],
    title:"Community Healthcare Initiative",
    desc:"Monthly free medical camps in tribal and mining-adjacent communities. Over 1,200 patients served per year with doctors from partner hospitals.",
    stats:[{ val:"12",   label:"Camps/Year" },{ val:"1,200+", label:"Patients" }],
    items:["Free OPD in Dhanbad, Korba & Raipur","Medicine distribution to 12 PHCs","Eye & dental check-up camps","Mental health awareness drives"],
    image:"/images/Gemini_Generated_Image_y1eikuy1eikuy1ei.png",
  },
  {
    type:"Water & Sanitation", Icon:Droplets,      color:CSR_CATEGORY_COLORS["Water & Sanitation"],
    title:"Clean Water Access",
    desc:"Installed bore-wells and water purification units in 6 villages around our operational areas. Over 3,000 villagers now have clean drinking water.",
    stats:[{ val:"12",   label:"Bore-wells" },{ val:"3,000+", label:"Villagers" }],
    items:["12 bore-well installations","4 community water purification units","3 rainwater harvesting structures","Sanitation block construction"],
    image:"/images/port.jpg",
  },
  {
    type:"Women Empowerment",  Icon:GraduationCap, color:CSR_CATEGORY_COLORS["Women Empowerment"],
    title:"Women Skill Development",
    desc:"Skill development workshops in weaving, tailoring, digital literacy and self-help group formation — including a 120-strong cohort trained in March 2024. 180 women trained to date and linked to livelihood opportunities.",
    stats:[{ val:"180",  label:"Women Trained" },{ val:"8",  label:"SHGs Formed" }],
    items:["Tailoring & weaving workshops","Digital literacy programs","Micro-finance & SHG support","Entrepreneurship mentoring"],
    image:"/images/Gemini_Generated_Image_6wi0526wi0526wi0.png",
  },
  {
    type:"Environment",        Icon:Leaf,          color:CSR_CATEGORY_COLORS["Environment"],
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

interface Initiative {
  Icon: LucideIcon;
  cat: string;
  title: string;
  date: string;
  desc: string;
  highlight: string;
  highlightLabel: string;
}

const initiatives: Initiative[] = [
  { Icon:Trees,      cat:"Environment",       title:"Annual Plantation Drive",          date:"Jun 2024", desc:"Planted 2,000 saplings across 5 locations in Jharkhand with community volunteers.",          highlight:"2,000", highlightLabel:"Saplings Planted" },
  { Icon:HeartPulse, cat:"Healthcare",        title:"Free Medical Camp — Dhanbad",      date:"May 2024", desc:"Free health check-ups for 800+ villagers. Doctors from 3 hospitals participated.",           highlight:"800+",  highlightLabel:"Beneficiaries" },
  { Icon:BookOpen,   cat:"Education",         title:"School Supply Distribution",       date:"Apr 2024", desc:"Distributed stationery kits to 450 students across 3 of our adopted schools.",               highlight:"450",   highlightLabel:"Students" },
  { Icon:Users,      cat:"Women Empowerment", title:"Women Skill Development Workshop", date:"Mar 2024", desc:"2-day workshop on weaving, tailoring and digital literacy for 120 women — part of 180+ trained across all workshops to date.", highlight:"120",   highlightLabel:"Women Trained" },
  { Icon:Recycle,    cat:"Environment",       title:"E-Waste Collection Drive",         date:"Feb 2024", desc:"Collected and responsibly disposed of 1.2 tonnes of electronic waste from our offices.",     highlight:"1.2T",  highlightLabel:"E-Waste Disposed" },
  { Icon:Droplets,   cat:"Water & Sanitation",title:"Village Infrastructure Support",   date:"Jan 2024", desc:"Funded repair of 3 community halls and 2 bore-well installations in rural Chhattisgarh.",   highlight:"5",     highlightLabel:"Villages Helped" },
  { Icon:Palette,    cat:"Education",         title:"Children Art & Science Festival",  date:"Dec 2023", desc:"Organised inter-school festival for 600 students. Prizes and scholarships awarded.",          highlight:"600",   highlightLabel:"Students" },
  { Icon:Pill,       cat:"Healthcare",        title:"Medicine Distribution Drive",      date:"Nov 2023", desc:"Distributed essential medicines worth ₹4 lakh to 12 primary health centres.",               highlight:"12",    highlightLabel:"PHCs Served" },
  { Icon:Leaf,       cat:"Environment",       title:"Sapling Distribution — Diwali",   date:"Oct 2023", desc:"Distributed 5,000 saplings across employees, schools and partner organisations.",            highlight:"5,000", highlightLabel:"Saplings" },
];

const ALL_INIT_CATS = ["All", ...CSR_CATEGORIES];

export default function CSRPage() {
  const [activeProject, setActiveProject] = useState(0);
  const [initCat, setInitCat] = useState("All");
  const counterRef  = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const initRef     = useRef<HTMLElement>(null);
  const c1 = useInView(counterRef,  { once:true, margin:"-60px" });
  const c2 = useInView(projectsRef, { once:true, margin:"-60px" });
  const c3 = useInView(initRef,     { once:true, margin:"-60px" });

  const visibleInitiatives = initCat==="All" ? initiatives : initiatives.filter(a=>a.cat===initCat);

  const proj = projects[activeProject];

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-16 px-6 overflow-hidden"
               style={{ background:"linear-gradient(160deg, #ffffff 0%, #fff7f0 55%, #ffffff 100%)" }}>
        <div className="absolute inset-0 pointer-events-none"
             style={{ background:"radial-gradient(circle 600px at 70% 40%, rgba(249,115,22,0.06), transparent)" }}/>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left — text */}
            <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}>
              <div className="section-tag mb-4">CSR & IMPACT</div>
              <h1 className="font-black mb-4 leading-tight" style={{ fontSize:"clamp(32px,5vw,58px)" }}>
                Creating Impact<br/>
                <span style={{ color:"var(--orange)" }}>Beyond Business.</span>
              </h1>
              <p className="text-base mb-2 leading-relaxed" style={{ color:"rgba(0,0,0,0.55)", maxWidth:480 }}>
                Our commitment to community, education, environment and healthcare shapes every decision we make.
              </p>
            </motion.div>

            {/* Right — stat grid */}
            <motion.div initial={{ opacity:0, x:32 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.65, delay:0.1 }}
                        className="grid grid-cols-2 gap-4">
              {counters.map((c, i) => (
                <motion.div key={c.label}
                            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.15+i*0.07 }}
                            className="rounded-2xl p-6"
                            style={{ background:"rgba(0,0,0,0.025)", border:"1px solid rgba(0,0,0,0.07)" }}>
                  <div className="text-3xl font-black mb-1" style={{ color:c.color }}>{c.num.toLocaleString()}{c.suffix}</div>
                  <div className="text-xs font-semibold" style={{ color:"rgba(0,0,0,0.5)" }}>{c.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
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

      {/* Recent Initiatives */}
      <section ref={initRef} className="py-20 px-6" style={{ background:"#f9f9f9" }}>
        <div className="max-w-6xl mx-auto">

          <motion.div initial={{ opacity:0, y:20 }} animate={c3?{opacity:1,y:0}:{}} transition={{ duration:0.5 }}
                      className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
            <div>
              <div className="section-tag">PROGRAMS</div>
              <h2 className="text-3xl font-black">Recent <span style={{ color:"var(--orange)" }}>Initiatives</span></h2>
            </div>
            {/* Category filter */}
            <div className="flex flex-wrap gap-2">
              {ALL_INIT_CATS.map(c=>(
                <button key={c} onClick={()=>setInitCat(c)}
                        className="px-3.5 py-1.5 rounded-full text-[11px] font-bold transition-all duration-200"
                        style={{
                          background: initCat===c ? (CSR_CATEGORY_COLORS[c]||"var(--orange)") : "white",
                          color:      initCat===c ? "white" : "rgba(0,0,0,0.55)",
                          border:     `1px solid ${initCat===c ? (CSR_CATEGORY_COLORS[c]||"var(--orange)") : "rgba(0,0,0,0.1)"}`,
                        }}>
                  {c}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Cards — 2-col on md, 3-col on lg */}
          <AnimatePresence mode="popLayout">
            <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {visibleInitiatives.map((a, i) => {
                const color = CSR_CATEGORY_COLORS[a.cat] || "#666";
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
