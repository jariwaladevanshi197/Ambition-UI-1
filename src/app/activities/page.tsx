"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const activities = [
  { emoji:"🌳", cat:"Environment",      title:"Annual Plantation Drive",           date:"Jun 2024", desc:"Planted 2,000 saplings across 5 locations in Jharkhand with community volunteers.",          highlight:"2,000 Saplings" },
  { emoji:"🏥", cat:"Healthcare",       title:"Free Medical Camp — Dhanbad",       date:"May 2024", desc:"Free health check-ups for 800+ villagers. Doctors from 3 hospitals participated.",           highlight:"800+ Beneficiaries" },
  { emoji:"📚", cat:"Education",        title:"School Supply Distribution",        date:"Apr 2024", desc:"Distributed stationery kits to 450 students across 3 of our adopted schools.",                highlight:"450 Students" },
  { emoji:"👩", cat:"Women Empowerment",title:"Women Skill Development Workshop",  date:"Mar 2024", desc:"2-day workshop on weaving, tailoring and digital literacy for 120 women.",                    highlight:"120 Women" },
  { emoji:"♻️", cat:"Environment",      title:"E-Waste Collection Drive",          date:"Feb 2024", desc:"Collected and responsibly disposed of 1.2 tonnes of electronic waste from our offices.",     highlight:"1.2 Tonnes" },
  { emoji:"🤝", cat:"Community",        title:"Village Infrastructure Support",    date:"Jan 2024", desc:"Funded repair of 3 community halls and 2 bore-well installations in rural Chhattisgarh.",   highlight:"5 Villages" },
  { emoji:"🎨", cat:"Education",        title:"Children Art & Science Festival",   date:"Dec 2023", desc:"Organised inter-school festival for 600 students. Prizes and scholarships awarded.",         highlight:"600 Students" },
  { emoji:"💊", cat:"Healthcare",       title:"Medicine Distribution Drive",       date:"Nov 2023", desc:"Distributed essential medicines worth ₹4 lakh to 12 primary health centres.",               highlight:"12 PHCs" },
  { emoji:"🌱", cat:"Environment",      title:"Sapling Distribution — Diwali",    date:"Oct 2023", desc:"Distributed 5,000 saplings across employees, schools and partner organisations.",            highlight:"5,000 Saplings" },
];

const gallery = [
  { emoji:"📚", caption:"School Library Inauguration",   cat:"Education"        },
  { emoji:"🌳", caption:"Plantation Drive 2024",          cat:"Environment"      },
  { emoji:"🏥", caption:"Free Medical Camp",              cat:"Healthcare"       },
  { emoji:"👩‍🏫", caption:"Teacher Training Program",    cat:"Education"        },
  { emoji:"🎨", caption:"Art Competition Finals",         cat:"Community"        },
  { emoji:"🤝", caption:"Community Welfare Meet",         cat:"Community"        },
  { emoji:"💊", caption:"Medicine Distribution Drive",    cat:"Healthcare"       },
  { emoji:"🌱", caption:"Sapling Distribution",           cat:"Environment"      },
  { emoji:"🎒", caption:"Stationery Kit Distribution",    cat:"Education"        },
];

const ALL_CATS = ["All","Education","Healthcare","Environment","Community","Women Empowerment"];
const GAL_CATS = ["All","Education","Healthcare","Environment","Community"];

const CAT_COLORS: Record<string,string> = {
  Education:"#3b82f6", Healthcare:"#22c55e", Environment:"#16a34a",
  Community:"#8b5cf6", "Women Empowerment":"#ec4899",
};

export default function ActivitiesPage() {
  const [actCat,  setActCat]  = useState("All");
  const [galCat,  setGalCat]  = useState("All");
  const listRef   = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLElement>(null);
  const l1 = useInView(listRef,    { once:true, margin:"-60px" });
  const l2 = useInView(galleryRef, { once:true, margin:"-60px" });

  const visibleActs = actCat==="All" ? activities : activities.filter(a=>a.cat===actCat);
  const visibleGal  = galCat==="All" ? gallery    : gallery.filter(g=>g.cat===galCat);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 text-center px-6 overflow-hidden"
               style={{ background:"linear-gradient(135deg, #0d0d0d, #1a0800 50%, #0a0a0a)" }}>
        <div className="absolute inset-0 pointer-events-none"
             style={{ background:"radial-gradient(circle 500px at 50% 60%, rgba(249,115,22,0.06), transparent)" }}/>
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}>
          <div className="section-tag mb-4">WHAT WE DO</div>
          <h1 className="font-black mb-4" style={{ fontSize:"clamp(30px,5vw,60px)", lineHeight:1.1 }}>
            Our <span style={{ color:"var(--orange)" }}>Activities</span>
          </h1>
          <p className="max-w-xl mx-auto text-base mb-8" style={{ color:"rgba(255,255,255,0.45)" }}>
            From plantation drives to medical camps — every initiative is a step toward a better India.
          </p>
          <Link href="/csr"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all"
                style={{ background:"rgba(249,115,22,0.12)", border:"1px solid rgba(249,115,22,0.3)", color:"var(--orange)" }}
                onMouseEnter={e=>(e.currentTarget.style.background="rgba(249,115,22,0.2)")}
                onMouseLeave={e=>(e.currentTarget.style.background="rgba(249,115,22,0.12)")}>
            View CSR Impact & Schools →
          </Link>
        </motion.div>
      </section>

      {/* Activity list */}
      <section ref={listRef} className="py-20 px-6" style={{ background:"#0d0d0d" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity:0,y:20 }} animate={l1?{opacity:1,y:0}:{}} transition={{ duration:0.5 }}
                      className="text-center mb-10">
            <div className="section-tag">PROGRAMS</div>
            <h2 className="text-3xl font-black">Recent <span style={{ color:"var(--orange)" }}>Initiatives</span></h2>
          </motion.div>

          {/* Category filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {ALL_CATS.map(c=>(
              <button key={c} onClick={()=>setActCat(c)}
                      className="px-4 py-2 rounded-full text-xs font-bold transition-all duration-200"
                      style={{ background:actCat===c?"var(--orange)":"rgba(255,255,255,0.06)", color:actCat===c?"white":"rgba(255,255,255,0.45)", border:"1px solid", borderColor:actCat===c?"var(--orange)":"rgba(255,255,255,0.08)" }}>
                {c}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {visibleActs.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity:0, y:24 }} animate={l1?{opacity:1,y:0}:{}}
                transition={{ duration:0.45, delay: i*0.06 }}
                className="rounded-2xl p-5 flex flex-col gap-3 transition-all duration-300"
                style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)" }}
                onMouseEnter={e=>{const el=e.currentTarget as HTMLDivElement;el.style.borderColor="rgba(249,115,22,0.3)";el.style.transform="translateY(-4px)";el.style.boxShadow="0 16px 40px rgba(0,0,0,0.3)";}}
                onMouseLeave={e=>{const el=e.currentTarget as HTMLDivElement;el.style.borderColor="";el.style.transform="";el.style.boxShadow="";}}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-3xl">{a.emoji}</span>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold shrink-0"
                        style={{ background:`${CAT_COLORS[a.cat]||"#666"}18`, color:CAT_COLORS[a.cat]||"#aaa" }}>
                    {a.cat}
                  </span>
                </div>
                <div>
                  <div className="font-bold text-sm text-white mb-1">{a.title}</div>
                  <div className="text-[10px] mb-2" style={{ color:"rgba(255,255,255,0.3)" }}>{a.date}</div>
                  <p className="text-xs leading-relaxed" style={{ color:"rgba(255,255,255,0.4)" }}>{a.desc}</p>
                </div>
                <div className="mt-auto pt-3" style={{ borderTop:"1px solid rgba(255,255,255,0.06)" }}>
                  <span className="text-xs font-black" style={{ color:"var(--orange)" }}>{a.highlight}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section ref={galleryRef} className="py-20 px-6" style={{ background:"var(--offwhite)" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity:0,y:20 }} animate={l2?{opacity:1,y:0}:{}} transition={{ duration:0.5 }}
                      className="text-center mb-8">
            <div className="section-tag">GALLERY</div>
            <h2 className="text-3xl font-black" style={{ color:"var(--text-primary)" }}>
              Impact in <span style={{ color:"var(--orange)" }}>Pictures</span>
            </h2>
          </motion.div>

          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {GAL_CATS.map(c=>(
              <button key={c} onClick={()=>setGalCat(c)}
                      className="px-4 py-2 rounded-full text-xs font-bold transition-all duration-200"
                      style={{ background:galCat===c?"var(--orange)":"white", border:"1px solid", borderColor:galCat===c?"var(--orange)":"#ddd", color:galCat===c?"white":"var(--text-secondary)" }}>
                {c}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {visibleGal.map((item, i) => (
              <motion.div
                key={item.caption}
                initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }}
                transition={{ duration:0.35, delay: i*0.05 }}
                className="relative rounded-2xl overflow-hidden group"
                style={{ aspectRatio: i%3===1 ? "3/4" : "1/1", background:"linear-gradient(135deg, #2a1800, #1a0d00)" }}
              >
                <div className="absolute inset-0 flex items-center justify-center text-5xl">{item.emoji}</div>
                <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                     style={{ background:"linear-gradient(to top, rgba(249,115,22,0.85), transparent)" }}>
                  <span className="text-xs font-bold text-white">{item.caption}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
