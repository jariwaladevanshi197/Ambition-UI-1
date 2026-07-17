"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { BadgeDollarSign, Globe2, FlaskConical, Layers, TimerReset, Handshake, Target, Telescope } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import ImageCarousel from "@/components/about/ImageCarousel";

const milestones = [
  { year:"2003", title:"Foundation",     desc:"Ambition Coal was established in Mumbai with a vision to transform India's coal supply chain. Starting with a small trading desk, we laid the groundwork for a nationally trusted energy company." },
  { year:"2008", title:"First Port",     desc:"Secured our first port operations contract at Paradip, Odisha — marking the beginning of deep integration into India's bulk cargo infrastructure and coastal logistics." },
  { year:"2013", title:"Pan India",      desc:"Pan India expansion achieved with operational presence across 50+ cities. Regional offices opened in Delhi, Kolkata, Chennai, and Hyderabad." },
  { year:"2018", title:"Global Reach",   desc:"Entered global coal trading with partnerships in Australia, Indonesia, and South Africa. International desk established. Company crossed 1 Million Tons annual delivery milestone." },
  { year:"2025+", title:"Future Vision", desc:"Transitioning into integrated energy solutions. Investing in cleaner coal technologies, solar logistics, and building India's next-generation energy supply chain." },
];

const leaders = [
  {
    initials:"JA",
    name:"Jayesh Mahesh Agrawal",
    role:"Director & Promoter",
    bio:"With over two decades of experience in coal trading and bulk cargo logistics, Jayesh has steered Ambition Coal from a Mumbai trading desk to a pan-India energy powerhouse. His deep relationships with global mines and port operators underpin the company's sourcing strength.",
    expertise:["Coal Trading","Port Logistics","Global Sourcing","Strategic Partnerships"],
    color:"#F97316",
  },
  {
    initials:"YA",
    name:"Yashika Jayesh Agrawal",
    role:"Director & Promoter",
    bio:"Yashika brings strategic clarity and operational discipline to Ambition Coal's growth. Focused on CSR, compliance, and sustainable business practices, she ensures the company's impact extends beyond commerce — powering communities alongside industries.",
    expertise:["Operations","CSR & Sustainability","Compliance","Finance"],
    color:"#D97706",
  },
];

interface WhyCard { Icon: LucideIcon; color: string; title: string; text: string; }
const whyUs: WhyCard[] = [
  { Icon:BadgeDollarSign, color:"#F97316", title:"Competitive Pricing",    text:"We keep prices as low as possible while maintaining the high quality our customers demand." },
  { Icon:Globe2,          color:"#3b82f6", title:"Global Sourcing",         text:"Direct mine relationships in Indonesia, South Africa, Kenya & Zimbabwe for best-quality coal." },
  { Icon:FlaskConical,    color:"#6366f1", title:"Quality Assurance",      text:"Independent international testing institutes verify quality at every step — mine to mother vessel." },
  { Icon:Layers,          color:"#22c55e", title:"One Stop Coal Solution",  text:"From sourcing to stevedoring, road transport, unloading and stacking — we manage it all." },
  { Icon:TimerReset,      color:"#D97706", title:"On-Time Delivery",        text:"We recognize the importance of delivery ahead of schedule. Customer satisfaction is our sole motive." },
  { Icon:Handshake,       color:"#16a34a", title:"Ethical Business",        text:"We strictly follow ethical business principles and abide by existing laws and regulations." },
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
      {/* Hero Carousel */}
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
            { label:"MISSION", title:"Why We Exist", Icon: Target, color:"var(--orange)",
              text:"To supply an energy mix that is competitive, environment-friendly and adds value to customers — and hence become a trusted preferred supplier. Customer satisfaction is our sole motive." },
            { label:"VISION",  title:"Where We're Going", Icon: Telescope, color:"#3b82f6",
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
              <div className="rounded-xl flex items-center justify-center mb-5"
                   style={{ width:52, height:52, background:`${item.color}12`, border:`1px solid ${item.color}30`, boxShadow:`0 4px 16px ${item.color}15` }}>
                <item.Icon size={24} style={{ color: item.color }} strokeWidth={1.6}/>
              </div>
              <div className="section-tag">{item.label}</div>
              <h3 className="text-xl font-black mb-3">{item.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color:"rgba(0,0,0,0.55)" }}>{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Leadership */}
      <section ref={leaderRef} id="leadership" className="py-20 px-6 relative overflow-hidden" style={{ background:"#ffffff" }}>
        {/* Decorative background */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage:"radial-gradient(circle at 20% 50%, rgba(249,115,22,0.04) 0%, transparent 60%), radial-gradient(circle at 80% 50%, rgba(249,115,22,0.04) 0%, transparent 60%)"
        }}/>
        <div className="max-w-5xl mx-auto relative">
          <motion.div initial={{ opacity:0,y:20 }} animate={t2?{opacity:1,y:0}:{}} transition={{ duration:0.5 }}
                      className="text-center mb-14">
            <div className="section-tag">OUR PEOPLE</div>
            <h2 className="text-3xl font-black">Leadership <span style={{ color:"var(--orange)" }}>Team</span></h2>
            <p className="text-sm mt-3 max-w-lg mx-auto" style={{ color:"rgba(0,0,0,0.45)" }}>
              Guided by experience and driven by a shared vision for India's energy future.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {leaders.map((l, i) => (
              <motion.div
                key={l.name}
                initial={{ opacity:0, y:40 }} animate={t2?{opacity:1,y:0}:{}}
                transition={{ duration:0.6, delay: i*0.12 }}
                className="rounded-3xl p-8 relative overflow-hidden group"
                style={{ background:"#ffffff", border:"1px solid rgba(0,0,0,0.08)", transition:"all .35s", boxShadow:"0 4px 20px rgba(0,0,0,0.04)" }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = "rgba(249,115,22,0.35)";
                  el.style.boxShadow   = "0 20px 60px rgba(249,115,22,0.12)";
                  el.style.transform   = "translateY(-6px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = "rgba(0,0,0,0.08)";
                  el.style.boxShadow   = "0 4px 20px rgba(0,0,0,0.04)";
                  el.style.transform   = "";
                }}
              >
                {/* Subtle top accent */}
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
                     style={{ background:`linear-gradient(90deg, ${l.color}, transparent)` }}/>

                {/* Avatar + Name row */}
                <div className="flex items-center gap-5 mb-6">
                  {/* Avatar with ring */}
                  <div className="relative shrink-0">
                    <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-black text-white shadow-lg"
                         style={{ background:`linear-gradient(135deg, ${l.color}, ${l.color}bb)` }}>
                      {l.initials}
                    </div>
                    {/* decorative ring */}
                    <div className="absolute -inset-1.5 rounded-2xl -z-10"
                         style={{ border:`2px solid ${l.color}25` }}/>
                  </div>
                  <div>
                    <div className="font-black text-base mb-1" style={{ color:"#111111" }}>{l.name}</div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
                         style={{ background:`${l.color}12`, color:l.color }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background:l.color }}/>
                      {l.role}
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-sm leading-relaxed mb-6" style={{ color:"rgba(0,0,0,0.55)" }}>
                  {l.bio}
                </p>

                {/* Expertise tags */}
                <div>
                  <div className="text-[10px] font-black tracking-widest mb-2.5" style={{ color:"rgba(0,0,0,0.35)" }}>AREAS OF EXPERTISE</div>
                  <div className="flex flex-wrap gap-2">
                    {l.expertise.map(tag => (
                      <span key={tag} className="px-2.5 py-1 rounded-lg text-xs font-semibold"
                            style={{ background:"rgba(0,0,0,0.04)", color:"rgba(0,0,0,0.6)", border:"1px solid rgba(0,0,0,0.06)" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section ref={whyRef} className="py-24 px-6" style={{ background:"#ffffff" }}>
        <div className="max-w-6xl mx-auto">

          {/* Header row */}
          <div className="grid lg:grid-cols-2 gap-12 items-end mb-16">
            <motion.div initial={{ opacity:0,y:20 }} animate={t3?{opacity:1,y:0}:{}} transition={{ duration:0.5 }}>
              <div className="section-tag mb-3">WHY AMBITION COAL</div>
              <h2 className="text-3xl md:text-4xl font-black leading-tight" style={{ color:"#111111" }}>
                Why <span style={{ color:"var(--orange)" }}>Choose Us</span>
              </h2>
            </motion.div>
            <motion.p initial={{ opacity:0,y:20 }} animate={t3?{opacity:1,y:0}:{}} transition={{ duration:0.5, delay:0.1 }}
                      className="text-sm leading-relaxed" style={{ color:"#666666" }}>
              For over two decades, Ambition Coal has built its reputation on reliability, quality and integrity.
              Here's what sets us apart from the competition.
            </motion.p>
          </div>

          {/* 3-col grid — clean card style */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px"
               style={{ background:"#e8e8e8", border:"1px solid #e8e8e8", borderRadius:16, overflow:"hidden" }}>
            {whyUs.map((w, i) => (
              <motion.div
                key={w.title}
                initial={{ opacity:0, y:24 }} animate={t3?{opacity:1,y:0}:{}}
                transition={{ duration:0.45, delay: i*0.07 }}
                className="p-8 group transition-all duration-250"
                style={{ background:"#ffffff" }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = "#fffaf7"}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = "#ffffff"}
              >
                {/* Icon box */}
                <div className="w-13 h-13 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                     style={{ width:52, height:52, background:`${w.color}12`, border:`1px solid ${w.color}30`, boxShadow:`0 4px 16px ${w.color}15` }}>
                  <w.Icon size={24} style={{ color: w.color }} strokeWidth={1.6}/>
                </div>

                {/* Orange accent line */}
                <div className="w-8 h-0.5 mb-4 transition-all duration-300 group-hover:w-14"
                     style={{ background:"var(--orange)" }}/>

                <h3 className="font-bold text-sm mb-2.5" style={{ color:"#111111", letterSpacing:"-0.01em" }}>{w.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color:"#666666", lineHeight:1.7 }}>{w.text}</p>
              </motion.div>
            ))}
          </div>

          {/* Bottom trust strip */}
          <motion.div initial={{ opacity:0,y:16 }} animate={t3?{opacity:1,y:0}:{}} transition={{ duration:0.5, delay:0.5 }}
                      className="mt-10 flex flex-wrap items-center justify-between gap-6 px-8 py-5 rounded-xl"
                      style={{ background:"#f9f9f9", border:"1px solid #e8e8e8" }}>
            {[
              { val:"20+", label:"Years in Business" },
              { val:"1M+", label:"Tonnes Delivered Annually" },
              { val:"50+", label:"Cities Served" },
              { val:"ISO", label:"Certified Operations" },
            ].map(s => (
              <div key={s.label} className="flex items-center gap-3">
                <span className="text-xl font-black" style={{ color:"var(--orange)" }}>{s.val}</span>
                <span className="text-xs" style={{ color:"#666666" }}>{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
