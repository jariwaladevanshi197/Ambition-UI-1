"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import ImageCarousel from "@/components/about/ImageCarousel";

const milestones = [
  { year:"2003", title:"Foundation",     desc:"Ambition Coal was established in Mumbai with a vision to transform India's coal supply chain. Starting with a small trading desk, we laid the groundwork for a nationally trusted energy company." },
  { year:"2008", title:"First Port",     desc:"Secured our first port operations contract at Paradip, Odisha — marking the beginning of deep integration into India's bulk cargo infrastructure and coastal logistics." },
  { year:"2013", title:"Pan India",      desc:"Pan India expansion achieved with operational presence across 50+ cities. Regional offices opened in Delhi, Kolkata, Chennai, and Hyderabad." },
  { year:"2018", title:"Global Reach",   desc:"Entered global coal trading with partnerships in Australia, Indonesia, and South Africa. International desk established. Company crossed 1 Million Tons annual delivery milestone." },
  { year:"2025+", title:"Future Vision", desc:"Transitioning into integrated energy solutions. Investing in cleaner coal technologies, solar logistics, and building India's next-generation energy supply chain." },
];

const leaders = [
  { initials:"JA", name:"Jayesh Mahesh Agrawal", role:"Director & Promoter"           },
  { initials:"YA", name:"Yashika Jayesh Agrawal",role:"Director & Promoter"           },
];

const whyUs = [
  { icon:"⚡", title:"Competitive Pricing",     text:"We keep prices as low as possible while maintaining the high quality our customers demand." },
  { icon:"🌐", title:"Global Sourcing",          text:"Direct mine relationships in Indonesia, South Africa, Kenya & Zimbabwe for best-quality coal." },
  { icon:"🛡️", title:"Quality Assurance",       text:"Independent international testing institutes verify quality at every step — mine to mother vessel." },
  { icon:"🤝", title:"One Stop Coal Solution",   text:"From sourcing to stevedoring, road transport, unloading and stacking — we manage it all." },
  { icon:"📊", title:"On-Time Delivery",         text:"We recognize the importance of delivery ahead of schedule. Customer satisfaction is our sole motive." },
  { icon:"🌱", title:"Ethical Business",         text:"We strictly follow ethical business principles and abide by existing laws and regulations." },
];

export default function AboutPage() {
  const [activeMilestone, setActiveMilestone] = useState(0);
  const [paused, setPaused]                   = useState(false);
  const [progress, setProgress]               = useState(0);
  const timelineRef = useRef<HTMLElement>(null);
  const leaderRef   = useRef<HTMLElement>(null);
  const whyRef      = useRef<HTMLElement>(null);
  const t1 = useInView(timelineRef, { once:true, margin:"-80px" });
  const t2 = useInView(leaderRef,   { once:true, margin:"-80px" });
  const t3 = useInView(whyRef,      { once:true, margin:"-80px" });

  // Auto-advance timeline every 2 s; show a live progress bar inside the active dot
  useEffect(() => {
    if (paused) return;
    setProgress(0);
    const DURATION = 5500;
    const TICK     = 30;
    let elapsed    = 0;
    const id = setInterval(() => {
      elapsed += TICK;
      setProgress(Math.min((elapsed / DURATION) * 100, 100));
      if (elapsed >= DURATION) {
        setActiveMilestone((prev) => (prev + 1) % milestones.length);
        elapsed = 0;
        setProgress(0);
      }
    }, TICK);
    return () => clearInterval(id);
  }, [paused, activeMilestone]);

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 text-center px-6"
               style={{ background:"linear-gradient(135deg, #ffffff, #fff7f0 50%, #ffffff)" }}>
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}>
          <div className="section-tag mb-4">OUR STORY</div>
          <h1 className="font-black mb-4" style={{ fontSize:"clamp(32px,5vw,60px)", lineHeight:1.1 }}>
            Pioneers in{" "}
            <span style={{ color:"var(--orange)" }}>Imported Coal.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-base" style={{ color:"rgba(0,0,0,0.55)" }}>
            Ambition Coal Pvt. Ltd. — a Non-govt company registered at Ahmedabad, promoted by
            Mr. Jayesh Mahesh Agrawal & Yashika Jayesh Agrawal, with more than a decade of experience
            supplying imported coal across Gujarat, Karnataka, Andhra Pradesh & Chhattisgarh.
          </p>
        </motion.div>
      </section>

      {/* Image Carousel */}
      <ImageCarousel />

      {/* Timeline */}
      <section ref={timelineRef} className="py-20 px-6" style={{ background:"var(--offwhite)" }}>
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity:0,y:20 }} animate={t1?{opacity:1,y:0}:{}} transition={{ duration:0.5 }}
                      className="text-center mb-14">
            <div className="section-tag">MILESTONES</div>
            <h2 className="text-3xl font-black" style={{ color:"var(--text-primary)" }}>Our Journey</h2>
            <p className="text-xs mt-2" style={{ color:"var(--text-secondary)" }}>
              Auto-advancing every 2s · hover to pause · click any milestone to jump
            </p>
          </motion.div>

          {/* Track */}
          <div
            className="relative"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => { setPaused(false); setProgress(0); }}
          >
            {/* Rail */}
            <div className="h-1 rounded-full" style={{ background:"#e5e5e5" }}>
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  background:"linear-gradient(90deg, var(--orange), var(--gold))",
                  width:`${(activeMilestone / (milestones.length - 1)) * 100}%`,
                }}
              />
            </div>

            {/* Nodes */}
            <div className="flex justify-between" style={{ marginTop:-14 }}>
              {milestones.map((m, i) => {
                const isActive = i === activeMilestone;
                const isDone   = i < activeMilestone;
                // SVG ring circumference for a r=11 circle
                const r = 11, circ = 2 * Math.PI * r;
                const dash = isActive ? circ - (circ * progress) / 100 : isDone ? 0 : circ;
                return (
                  <button
                    key={m.year}
                    onClick={() => { setActiveMilestone(i); setProgress(0); }}
                    className="flex flex-col items-center gap-0"
                    style={{ outline:"none" }}
                  >
                    {/* SVG progress ring */}
                    <div className="relative" style={{ width:28, height:28 }}>
                      <svg width="28" height="28" style={{ position:"absolute", top:0, left:0, transform:"rotate(-90deg)" }}>
                        {/* background circle */}
                        <circle cx="14" cy="14" r={r}
                          fill={isDone || isActive ? "var(--orange)" : "white"}
                          stroke={isDone || isActive ? "var(--orange)" : "#ddd"}
                          strokeWidth="2"
                        />
                        {/* progress arc — only visible on active */}
                        {isActive && (
                          <circle cx="14" cy="14" r={r}
                            fill="none"
                            stroke="white"
                            strokeWidth="2.5"
                            strokeDasharray={circ}
                            strokeDashoffset={dash}
                            strokeLinecap="round"
                            style={{ transition:"stroke-dashoffset 0.03s linear" }}
                          />
                        )}
                      </svg>
                      {/* glow on active */}
                      {isActive && (
                        <div className="absolute inset-0 rounded-full animate-ping"
                             style={{ background:"rgba(249,115,22,0.25)", animationDuration:"1.2s" }} />
                      )}
                    </div>

                    <span className="text-xs font-bold mt-3" style={{ color: isActive ? "var(--orange)" : "var(--text-secondary)" }}>
                      {m.year}
                    </span>
                    <span className="text-[10px] text-center mt-0.5" style={{ maxWidth:80, color:"var(--text-secondary)" }}>
                      {m.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detail card */}
          <motion.div
            key={activeMilestone}
            initial={{ opacity:0, y:12 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:0.4 }}
            className="mt-12 p-7 rounded-2xl relative overflow-hidden"
            style={{
              background:"white",
              border:"1px solid #e8e8e8",
              borderLeft:"4px solid var(--orange)",
            }}
          >
            {/* thin progress bar along the bottom of the card */}
            <div className="absolute bottom-0 left-0 h-0.5 transition-all"
                 style={{
                   width: `${progress}%`,
                   background:"linear-gradient(90deg, var(--orange), var(--gold))",
                   transition: paused ? "none" : "width 0.03s linear",
                 }}
            />
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold"
                    style={{ background:"rgba(249,115,22,0.08)", color:"var(--orange)" }}>
                {milestones[activeMilestone].year}
              </span>
              <span className="text-sm font-black" style={{ color:"var(--text-primary)" }}>
                {milestones[activeMilestone].title}
              </span>
              {!paused && (
                <span className="ml-auto text-[10px]" style={{ color:"rgba(0,0,0,0.25)" }}>
                  Next in {Math.ceil(((100 - progress) / 100) * 5.5)}s
                </span>
              )}
              {paused && (
                <span className="ml-auto text-[10px]" style={{ color:"var(--orange)" }}>⏸ Paused</span>
              )}
            </div>
            <p className="text-sm leading-relaxed" style={{ color:"var(--text-secondary)" }}>
              {milestones[activeMilestone].desc}
            </p>
          </motion.div>

          {/* Dot nav indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {milestones.map((_, i) => (
              <button
                key={i}
                onClick={() => { setActiveMilestone(i); setProgress(0); }}
                className="rounded-full transition-all duration-300"
                style={{
                  width:  i === activeMilestone ? 20 : 6,
                  height: 6,
                  background: i === activeMilestone ? "var(--orange)" : "#ddd",
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-6" style={{ background:"#f9f9f9" }}>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {[
            { label:"MISSION", title:"Why We Exist", icon:"🎯",
              text:"To supply an energy mix that is competitive, environment-friendly and adds value to customers — and hence become a trusted preferred supplier. Customer satisfaction is our sole motive." },
            { label:"VISION",  title:"Where We're Going", icon:"🔭",
              text:"To earn the consistent trust of our customers by providing quality, quantity and service consistency in every aspect of coal supply — growing day by day as a one-stop coal solution." },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity:0, x: i===0 ? -30 : 30 }}
              whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true }}
              transition={{ duration:0.6, delay:0.1*i }}
              className="rounded-2xl p-8"
              style={{ background:"rgba(0,0,0,0.03)", border:"1px solid rgba(0,0,0,0.08)" }}
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <div className="section-tag">{item.label}</div>
              <h3 className="text-xl font-black mb-3">{item.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color:"rgba(0,0,0,0.55)" }}>{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Leadership */}
      <section ref={leaderRef} id="leadership" className="py-20 px-6" style={{ background:"#ffffff" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity:0,y:20 }} animate={t2?{opacity:1,y:0}:{}} transition={{ duration:0.5 }}
                      className="text-center mb-14">
            <div className="section-tag">OUR PEOPLE</div>
            <h2 className="text-3xl font-black">Leadership <span style={{ color:"var(--orange)" }}>Team</span></h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {leaders.map((l, i) => (
              <motion.div
                key={l.name}
                initial={{ opacity:0, y:30 }} animate={t2?{opacity:1,y:0}:{}}
                transition={{ duration:0.5, delay: i*0.08 }}
                className="rounded-2xl p-7 text-center"
                style={{ background:"rgba(0,0,0,0.02)", border:"1px solid rgba(0,0,0,0.08)", transition:"all .3s" }}
                onMouseMove={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  const r  = el.getBoundingClientRect();
                  const x  = e.clientX - r.left, y = e.clientY - r.top;
                  el.style.transform = `perspective(700px) rotateX(${-((y-r.height/2)/r.height)*16}deg) rotateY(${((x-r.width/2)/r.width)*16}deg) scale(1.04)`;
                  el.style.borderColor = "rgba(249,115,22,0.3)";
                  el.style.boxShadow   = "0 24px 60px rgba(0,0,0,0.3)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = ""; el.style.borderColor = ""; el.style.boxShadow = "";
                }}
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-black mx-auto mb-4"
                     style={{ background:"linear-gradient(135deg, var(--orange), var(--gold))" }}>
                  {l.initials}
                </div>
                <div className="font-bold text-sm mb-1">{l.name}</div>
                <div className="text-xs" style={{ color:"rgba(0,0,0,0.45)" }}>{l.role}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section ref={whyRef} className="py-20 px-6" style={{ background:"var(--offwhite)" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity:0,y:20 }} animate={t3?{opacity:1,y:0}:{}} transition={{ duration:0.5 }}
                      className="text-center mb-14">
            <div className="section-tag">WHY AMBITION COAL</div>
            <h2 className="text-3xl font-black" style={{ color:"var(--text-primary)" }}>
              Why <span style={{ color:"var(--orange)" }}>Choose Us</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {whyUs.map((w, i) => (
              <motion.div
                key={w.title}
                initial={{ opacity:0, y:30 }} animate={t3?{opacity:1,y:0}:{}}
                transition={{ duration:0.5, delay: i*0.08 }}
                className="p-6 rounded-2xl group transition-all duration-300"
                style={{ background:"white", border:"1px solid #ebebeb" }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = "rgba(249,115,22,0.3)";
                  el.style.boxShadow   = "0 16px 40px rgba(0,0,0,0.06)";
                  el.style.transform   = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor=""; el.style.boxShadow=""; el.style.transform="";
                }}
              >
                <div className="text-3xl mb-3">{w.icon}</div>
                <h3 className="font-bold text-sm mb-2" style={{ color:"var(--text-primary)" }}>{w.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color:"var(--text-secondary)" }}>{w.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
