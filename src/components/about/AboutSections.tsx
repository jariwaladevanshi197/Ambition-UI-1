"use client";
/* The About page's purpose-built sections, each fed by one CMS section. */
import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import type { PageSection, StatItem } from "@/components/admin/types";
import { cardIcon, type CardDesign } from "@/components/cms/icons";
import { initials, splitPair } from "@/lib/cms/format";

/* ── Our Journey — Milestones (card titles: "2003 — Foundation") ── */
export function Timeline({ section }: { section: PageSection }) {
  const milestones = (section.cards ?? []).map((c, i) => {
    const [year, title] = splitPair(c.title);
    return { year: year || String(i + 1), title, desc: c.desc };
  });
  const [activeMilestone, setActiveMilestone] = useState(0);
  const [paused, setPaused]                   = useState(false);
  const [progress, setProgress]               = useState(0);
  const timelineRef = useRef<HTMLElement>(null);
  const t1 = useInView(timelineRef, { once:true, margin:"-80px" });

  // Auto-advance the timeline; show a live progress bar inside the active dot
  useEffect(() => {
    // Progress is reset to 0 wherever the milestone changes (tick, click, mouse leave).
    if (paused || milestones.length < 2) return;
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
  }, [paused, activeMilestone, milestones.length]);

  if (milestones.length === 0) return null;

  return (
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
                width:`${(activeMilestone / Math.max(1, milestones.length - 1)) * 100}%`,
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
                  key={i}
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
  );
}

/* ── Mission & Vision (card titles: "Mission — Why We Exist") ── */
const missionDesigns: Record<string, CardDesign> = {
  MISSION: { icon:"target",    color:"#F97316" },
  VISION:  { icon:"telescope", color:"#3b82f6" },
};

export function MissionVision({ section }: { section: PageSection }) {
  const items = (section.cards ?? []).map(c => {
    const [label, title] = splitPair(c.title);
    const key = label.toUpperCase();
    return { label: key, title, text: c.desc, icon: cardIcon(c.icon, missionDesigns[key]) };
  });
  return (
    <section className="py-20 px-6" style={{ background:"#f9f9f9" }}>
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity:0, x: i===0 ? -30 : 30 }}
            whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }}
            transition={{ duration:0.6, delay:0.1*i }}
            className="rounded-2xl p-8"
            style={{ background:"rgba(0,0,0,0.03)", border:"1px solid rgba(0,0,0,0.08)" }}
          >
            {item.icon && (
              <div className="rounded-xl flex items-center justify-center mb-5"
                   style={{ width:52, height:52, background:`${item.icon.color}12`, border:`1px solid ${item.icon.color}30`, boxShadow:`0 4px 16px ${item.icon.color}15` }}>
                <item.icon.Icon size={24} style={{ color: item.icon.color }} strokeWidth={1.6}/>
              </div>
            )}
            {item.label && <div className="section-tag">{item.label}</div>}
            <h3 className="text-xl font-black mb-3">{item.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color:"rgba(0,0,0,0.55)" }}>{item.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ── Leadership Team (card titles: "Name — Role") ── */
const expertiseByName: Record<string, string[]> = {
  "Jayesh Mahesh Agrawal":  ["Coal Trading","Port Logistics","Global Sourcing","Strategic Partnerships"],
  "Yashika Jayesh Agrawal": ["Operations","CSR & Sustainability","Compliance","Finance"],
};
const LEADER_COLORS = ["#F97316", "#D97706"];

export function Leadership({ section }: { section: PageSection }) {
  const leaders = (section.cards ?? []).map((c, i) => {
    const [name, role] = splitPair(c.title);
    const fullName = name || role;
    return {
      name: fullName, role: name ? role : "", bio: c.desc, initials: initials(fullName),
      expertise: expertiseByName[fullName] ?? [], color: LEADER_COLORS[i % LEADER_COLORS.length],
    };
  });
  const leaderRef = useRef<HTMLElement>(null);
  const t2 = useInView(leaderRef, { once:true, margin:"-80px" });
  return (
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
            Guided by experience and driven by a shared vision for India&apos;s energy future.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {leaders.map((l, i) => (
            <motion.div
              key={i}
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
              {l.expertise.length > 0 && <div>
                <div className="text-[10px] font-black tracking-widest mb-2.5" style={{ color:"rgba(0,0,0,0.35)" }}>AREAS OF EXPERTISE</div>
                <div className="flex flex-wrap gap-2">
                  {l.expertise.map(tag => (
                    <span key={tag} className="px-2.5 py-1 rounded-lg text-xs font-semibold"
                          style={{ background:"rgba(0,0,0,0.04)", color:"rgba(0,0,0,0.6)", border:"1px solid rgba(0,0,0,0.06)" }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Why Choose Us (+ the "Trust Stats" strip) ── */
const whyDesigns: Record<string, CardDesign> = {
  "Competitive Pricing":    { icon:"badge-dollar", color:"#F97316" },
  "Global Sourcing":        { icon:"globe",        color:"#3b82f6" },
  "Quality Assurance":      { icon:"flask",        color:"#6366f1" },
  "One Stop Coal Solution": { icon:"layers",       color:"#22c55e" },
  "On-Time Delivery":       { icon:"timer-reset",  color:"#D97706" },
  "Ethical Business":       { icon:"handshake",    color:"#16a34a" },
};

export function WhyChooseUs({ section, trust }: { section: PageSection; trust?: StatItem[] }) {
  const whyUs = (section.cards ?? []).map(c => ({ ...c, icon: cardIcon(c.icon, whyDesigns[c.title]) }));
  const whyRef = useRef<HTMLElement>(null);
  const t3 = useInView(whyRef, { once:true, margin:"-80px" });
  return (
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
            Here&apos;s what sets us apart from the competition.
          </motion.p>
        </div>

        {/* 3-col grid — clean card style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px"
             style={{ background:"#e8e8e8", border:"1px solid #e8e8e8", borderRadius:16, overflow:"hidden" }}>
          {whyUs.map((w, i) => (
            <motion.div
              key={i}
              initial={{ opacity:0, y:24 }} animate={t3?{opacity:1,y:0}:{}}
              transition={{ duration:0.45, delay: i*0.07 }}
              className="p-8 group transition-all duration-250"
              style={{ background:"#ffffff" }}
              onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = "#fffaf7"}
              onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = "#ffffff"}
            >
              {/* Icon box */}
              {w.icon && (
                <div className="w-13 h-13 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                     style={{ width:52, height:52, background:`${w.icon.color}12`, border:`1px solid ${w.icon.color}30`, boxShadow:`0 4px 16px ${w.icon.color}15` }}>
                  <w.icon.Icon size={24} style={{ color: w.icon.color }} strokeWidth={1.6}/>
                </div>
              )}

              {/* Orange accent line */}
              <div className="w-8 h-0.5 mb-4 transition-all duration-300 group-hover:w-14"
                   style={{ background:"var(--orange)" }}/>

              <h3 className="font-bold text-sm mb-2.5" style={{ color:"#111111", letterSpacing:"-0.01em" }}>{w.title}</h3>
              <p className="text-xs leading-relaxed" style={{ color:"#666666", lineHeight:1.7 }}>{w.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom trust strip (the page's "Trust Stats" section) */}
        {trust && trust.length > 0 && <motion.div initial={{ opacity:0,y:16 }} animate={t3?{opacity:1,y:0}:{}} transition={{ duration:0.5, delay:0.5 }}
                    className="mt-10 flex flex-wrap items-center justify-between gap-6 px-8 py-5 rounded-xl"
                    style={{ background:"#f9f9f9", border:"1px solid #e8e8e8" }}>
          {trust.map((s, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-xl font-black" style={{ color:"var(--orange)" }}>{s.value}</span>
              <span className="text-xs" style={{ color:"#666666" }}>{s.label}</span>
            </div>
          ))}
        </motion.div>}
      </div>
    </section>
  );
}
