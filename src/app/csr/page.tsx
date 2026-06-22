"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { MapPin, Users, Heart } from "lucide-react";

const counters = [
  { num:5,      suffix:"",  label:"CSR Project Types",   icon:"🌐" },
  { num:20,     suffix:"+", label:"Active Projects",      icon:"✅" },
  { num:5000,   suffix:"+", label:"Beneficiaries",        icon:"👥" },
  { num:50000,  suffix:"+", label:"Trees Planted",        icon:"🌳" },
];

const projects = [
  {
    type:"Education",       emoji:"🏫", color:"#3b82f6",
    title:"School Adoption Program",
    desc:"Adopted 4 government schools across Jharkhand, Maharashtra, Chhattisgarh and Andhra Pradesh. Provided infrastructure upgrades, libraries, computer labs and mid-day meal support.",
    stats:[{ val:"4",    label:"Schools" },{ val:"1,810", label:"Students" }],
    items:["Govt. Primary School, Dhanbad — 450 students","Zilla Parishad School, Nagpur — 320 students","Model School, Korba — 580 students","Municipal School, Visakhapatnam — 460 students"],
  },
  {
    type:"Healthcare",      emoji:"🏥", color:"#22c55e",
    title:"Community Healthcare Initiative",
    desc:"Monthly free medical camps in tribal and mining-adjacent communities. Over 1,200 patients served per year with doctors from partner hospitals.",
    stats:[{ val:"12",   label:"Camps/Year" },{ val:"1,200+", label:"Patients" }],
    items:["Free OPD in Dhanbad, Korba & Raipur","Medicine distribution to 12 PHCs","Eye & dental check-up camps","Mental health awareness drives"],
  },
  {
    type:"Water & Sanitation", emoji:"💧", color:"#0ea5e9",
    title:"Clean Water Access",
    desc:"Installed bore-wells and water purification units in 6 villages around our operational areas. Over 3,000 villagers now have clean drinking water.",
    stats:[{ val:"12",   label:"Bore-wells" },{ val:"3,000+", label:"Villagers" }],
    items:["12 bore-well installations","4 community water purification units","3 rainwater harvesting structures","Sanitation block construction"],
  },
  {
    type:"Women Empowerment", emoji:"👩", color:"#ec4899",
    title:"Women Skill Development",
    desc:"Skill development workshops in weaving, tailoring, digital literacy and self-help group formation. 180 women trained and linked to livelihood opportunities.",
    stats:[{ val:"180",  label:"Women Trained" },{ val:"8",  label:"SHGs Formed" }],
    items:["Tailoring & weaving workshops","Digital literacy programs","Micro-finance & SHG support","Entrepreneurship mentoring"],
  },
  {
    type:"Environment",     emoji:"🌳", color:"#16a34a",
    title:"Green India Drive",
    desc:"Annual plantation drives, e-waste collection and ESG-aligned operational practices. 50,000+ trees planted since 2015 across 5 states.",
    stats:[{ val:"50K+", label:"Trees Planted" },{ val:"5",  label:"States" }],
    items:["50,000+ saplings across 5 states","E-waste collection drives","Solar panels at offices","Carbon footprint audit & reporting"],
  },
];

const impactNumbers = [
  { val:"₹2.5 Cr",  label:"CSR Spend (FY 2023–24)" },
  { val:"5 States", label:"Operational Reach" },
  { val:"20+",      label:"Active Projects" },
  { val:"2003",     label:"CSR Journey Began" },
];

function CounterCard({ num, suffix, label, icon, active }: { num:number; suffix:string; label:string; icon:string; active:boolean }) {
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
    <div className="text-center p-6 rounded-2xl transition-all duration-300"
         style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)" }}
         onMouseEnter={e=>{const el=e.currentTarget as HTMLDivElement;el.style.borderColor="rgba(249,115,22,0.3)";el.style.transform="translateY(-4px)";}}
         onMouseLeave={e=>{const el=e.currentTarget as HTMLDivElement;el.style.borderColor="";el.style.transform="";}}>
      <div className="text-3xl mb-3">{icon}</div>
      <div className="text-4xl font-black mb-2" style={{ color:"var(--orange)" }}>
        {val.toLocaleString()}{suffix}
      </div>
      <div className="text-xs font-bold" style={{ color:"rgba(255,255,255,0.4)" }}>{label}</div>
    </div>
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
               style={{ background:"linear-gradient(135deg, #0d0d0d, #001a0a 50%, #0a0a0a)" }}>
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
          <p className="max-w-xl mx-auto text-base mb-8" style={{ color:"rgba(255,255,255,0.45)" }}>
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
      <section ref={counterRef} className="py-16 px-6" style={{ background:"#111" }}>
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {counters.map(c=>(
            <CounterCard key={c.label} {...c} active={c1}/>
          ))}
        </div>
      </section>

      {/* Impact Numbers strip */}
      <div className="py-5 px-6 overflow-x-auto" style={{ background:"rgba(249,115,22,0.06)", borderTop:"1px solid rgba(249,115,22,0.1)", borderBottom:"1px solid rgba(249,115,22,0.1)" }}>
        <div className="flex items-center justify-center gap-8 min-w-max mx-auto">
          {impactNumbers.map((n,i)=>(
            <div key={n.label} className="flex items-center gap-8">
              <div className="text-center">
                <div className="text-lg font-black" style={{ color:"var(--orange)" }}>{n.val}</div>
                <div className="text-[10px] font-bold mt-0.5" style={{ color:"rgba(255,255,255,0.35)" }}>{n.label}</div>
              </div>
              {i < impactNumbers.length-1 && <div style={{ width:1, height:32, background:"rgba(255,255,255,0.1)" }}/>}
            </div>
          ))}
        </div>
      </div>

      {/* Projects explorer */}
      <section ref={projectsRef} className="py-20 px-6" style={{ background:"#0d0d0d" }}>
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
                          background: activeProject===i ? `${p.color}15` : "rgba(255,255,255,0.03)",
                          border: `1px solid ${activeProject===i ? p.color+"50" : "rgba(255,255,255,0.07)"}`,
                          borderLeft: activeProject===i ? `3px solid ${p.color}` : "1px solid rgba(255,255,255,0.07)",
                          boxShadow: activeProject===i ? `0 0 18px ${p.color}18` : "none",
                        }}>
                  <span className="text-lg shrink-0">{p.emoji}</span>
                  <span className="text-xs font-bold leading-tight" style={{ color:activeProject===i?p.color:"rgba(255,255,255,0.45)" }}>{p.type}</span>
                </button>
              ))}
            </div>

            {/* Detail panel */}
            <motion.div
              key={activeProject}
              initial={{ opacity:0, x:16 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.35 }}
              className="rounded-2xl p-7"
              style={{ background:"rgba(255,255,255,0.03)", border:`1px solid ${proj.color}25` }}
            >
              <div className="flex items-start gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0"
                     style={{ background:`${proj.color}15` }}>{proj.emoji}</div>
                <div>
                  <div className="text-[10px] font-black tracking-widest mb-1" style={{ color:proj.color }}>{proj.type.toUpperCase()}</div>
                  <h3 className="text-xl font-black text-white">{proj.title}</h3>
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-6" style={{ color:"rgba(255,255,255,0.5)" }}>{proj.desc}</p>

              {/* Stats */}
              <div className="flex gap-6 mb-6 pb-6" style={{ borderBottom:"1px solid rgba(255,255,255,0.07)" }}>
                {proj.stats.map(s=>(
                  <div key={s.label}>
                    <div className="text-2xl font-black" style={{ color:proj.color }}>{s.val}</div>
                    <div className="text-[10px] font-bold mt-0.5" style={{ color:"rgba(255,255,255,0.35)" }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Items */}
              <ul className="flex flex-col gap-2.5">
                {proj.items.map(item=>(
                  <li key={item} className="flex items-start gap-2.5 text-sm" style={{ color:"rgba(255,255,255,0.55)" }}>
                    <div className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ background:proj.color }}/>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="py-16 px-6 text-center" style={{ background:"#111" }}>
        <div className="max-w-2xl mx-auto">
          <Heart size={28} className="mx-auto mb-4" style={{ color:"var(--orange)" }}/>
          <h2 className="text-2xl font-black text-white mb-3">Want to Partner with Us?</h2>
          <p className="text-sm mb-6" style={{ color:"rgba(255,255,255,0.4)" }}>
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
