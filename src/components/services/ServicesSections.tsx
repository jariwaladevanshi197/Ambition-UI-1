"use client";
/* eslint-disable @next/next/no-img-element */
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Globe } from "lucide-react";
import type { PageSection, Product } from "@/components/admin/types";
import { cardIcon } from "@/components/cms/icons";
import { Highlight, plainText } from "@/components/cms/Highlight";
import { splitSpec } from "@/lib/cms/format";

function useReveal() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once:true, margin:"-60px" });
  return [ref, inView] as const;
}

/* ── Hero ─────────────────────────────────────────────────── */
export function ServicesHero({ section }: { section: PageSection }) {
  return (
    <section className="pt-32 pb-20 px-6" style={{ background:"#ffffff" }}>
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity:0,y:24 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.6 }}>
          <div className="section-tag mb-4">WHAT WE OFFER</div>
          <h1 className="font-black mb-5 leading-tight" style={{ fontSize:"clamp(32px,5vw,56px)", color:"#111111" }}>
            <Highlight text={section.headline ?? ""} />
          </h1>
          <p className="text-base leading-relaxed mb-8" style={{ color:"#555555", maxWidth:480 }}>
            {section.subtext}
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
        {section.image && (
          <motion.div initial={{ opacity:0,x:40 }} animate={{ opacity:1,x:0 }} transition={{ duration:0.7, delay:0.15 }}
                      className="hidden lg:block rounded-xl overflow-hidden shadow-lg" style={{ height:380 }}>
            <img src={section.image} alt={plainText(section.headline ?? "Ambition Coal operations")} className="w-full h-full object-cover"/>
          </motion.div>
        )}
      </div>
    </section>
  );
}

/* ── Services grid ────────────────────────────────────────── */
// Badge and tags for each service, matched by card title.
const serviceDesigns: Record<string, { badge: string; badgeColor: string; tags: string[] }> = {
  "Coal Trading & Sourcing":       { badge:"Core Business",  badgeColor:"#F97316", tags:["Steam Coal", "Indonesia", "South Africa", "East Africa"] },
  "Stevedoring & Port Operations": { badge:"Port Logistics", badgeColor:"#3b82f6", tags:["Loading", "Unloading", "Delay Recovery", "Bulk Cargo"] },
  "International Trading":         { badge:"Global",         badgeColor:"#8b5cf6", tags:["Australia", "Indonesia", "South Africa", "Zimbabwe"] },
  "Road Transportation":           { badge:"Supply Chain",   badgeColor:"#22c55e", tags:["Doorstep Delivery", "50+ Cities", "Packing", "Dispatch"] },
  "Unloading & Stacking":          { badge:"Operations",     badgeColor:"#D97706", tags:["Railway Rakes", "Stockpiles", "Anti-oxidation", "Storage"] },
  "Minerals Trading":              { badge:"Minerals",       badgeColor:"#64748b", tags:["Manganese", "Chrome Ore", "Silica Ore"] },
};

export function ServicesGrid({ section }: { section: PageSection }) {
  const [ref, s1] = useReveal();
  const services = (section.cards ?? []).map(c => ({ ...c, ...serviceDesigns[c.title] }));
  // The first service gets the wide feature card; the rest go in the grid.
  const [wide, ...rest] = services;

  return (
    <section ref={ref} className="py-20 px-6" style={{ background:"#f5f5f5" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity:0,y:20 }} animate={s1?{opacity:1,y:0}:{}} transition={{ duration:0.5 }}
                    className="mb-12">
          <div className="section-tag mb-2">OUR SERVICES</div>
          <h2 className="text-3xl font-black" style={{ color:"#111111" }}>
            What We <span style={{ color:"var(--orange)" }}>Do</span>
          </h2>
        </motion.div>

        {wide && (
          <motion.div
            initial={{ opacity:0,y:30 }} animate={s1?{opacity:1,y:0}:{}} transition={{ duration:0.5 }}
            className="rounded-xl overflow-hidden bg-white mb-6 grid lg:grid-cols-2"
            style={{ border:"1px solid #e5e5e5", boxShadow:"0 2px 16px rgba(0,0,0,0.05)" }}>
            <div className="relative" style={{ minHeight:280 }}>
              {wide.image && <img src={wide.image} alt={wide.title} className="w-full h-full object-cover" style={{ filter:"brightness(0.88)" }}/>}
              {wide.badge && (
                <div className="absolute top-4 left-4 px-2.5 py-1 rounded text-[10px] font-bold text-white"
                     style={{ background:wide.badgeColor }}>{wide.badge}</div>
              )}
            </div>
            <div className="p-8 flex flex-col justify-center">
              <h3 className="text-xl font-bold mb-3" style={{ color:"#111111" }}>{wide.title}</h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color:"#555555" }}>{wide.desc}</p>
              <div className="flex flex-wrap gap-2">
                {(wide.tags ?? []).map(t=>(
                  <span key={t} className="px-2.5 py-1 rounded text-[11px] font-semibold"
                        style={{ background:"rgba(249,115,22,0.08)", color:"var(--orange)" }}>{t}</span>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((s,i)=>(
            <motion.div key={`${s.title}-${i}`}
              initial={{ opacity:0,y:30 }} animate={s1?{opacity:1,y:0}:{}}
              transition={{ duration:0.5, delay: i*0.08 }}
              className="rounded-xl overflow-hidden bg-white group"
              style={{ border:"1px solid #e5e5e5", transition:"box-shadow .25s, transform .25s" }}
              onMouseEnter={e=>{const el=e.currentTarget as HTMLDivElement;el.style.boxShadow="0 12px 36px rgba(0,0,0,0.10)";el.style.transform="translateY(-4px)";}}
              onMouseLeave={e=>{const el=e.currentTarget as HTMLDivElement;el.style.boxShadow="";el.style.transform="";}}>
              <div className="relative overflow-hidden" style={{ height:160, background:"#eeeeee" }}>
                {s.image && (
                  <img src={s.image} alt={s.title}
                       className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                       style={{ filter:"brightness(0.85)" }}/>
                )}
                {s.badge && (
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded text-[10px] font-bold text-white"
                       style={{ background:s.badgeColor }}>{s.badge}</div>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-bold text-sm mb-2" style={{ color:"#111111" }}>{s.title}</h3>
                <p className="text-xs leading-relaxed mb-4" style={{ color:"#666666" }}>{s.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {(s.tags ?? []).map(t=>(
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
  );
}

/* ── Coal products ────────────────────────────────────────── */
export function CoalProducts({ section, products }: { section: PageSection; products: Product[] }) {
  const [ref, s2] = useReveal();
  return (
    <section ref={ref} className="py-20 px-6" style={{ background:"#ffffff" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity:0,y:20 }} animate={s2?{opacity:1,y:0}:{}} transition={{ duration:0.5 }}
                    className="mb-12">
          <div className="section-tag mb-2">COAL PORTFOLIO</div>
          <h2 className="text-3xl font-black" style={{ color:"#111111" }}>
            <Highlight text={section.heading ?? ""} />
          </h2>
          {section.body && <p className="mt-2 text-sm max-w-lg" style={{ color:"#666666" }}>{section.body}</p>}
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((p,i)=>{
            // "GCV: 5500–6500 kcal/kg" style specs become the stat boxes; the rest are chips.
            const pairs = p.specs.map(splitSpec).filter((x): x is [string, string] => !!x);
            const chips = p.specs.filter(sp => !splitSpec(sp));
            return (
              <motion.div key={p.id}
                initial={{ opacity:0,y:30 }} animate={s2?{opacity:1,y:0}:{}}
                transition={{ duration:0.5, delay:i*0.08 }}
                className="rounded-xl overflow-hidden bg-white group"
                style={{ border:"1px solid #e5e5e5", transition:"box-shadow .25s, transform .25s" }}
                onMouseEnter={e=>{const el=e.currentTarget as HTMLDivElement;el.style.boxShadow="0 12px 32px rgba(0,0,0,0.09)";el.style.transform="translateY(-3px)";}}
                onMouseLeave={e=>{const el=e.currentTarget as HTMLDivElement;el.style.boxShadow="";el.style.transform="";}}>
                <div className="overflow-hidden" style={{ height:140, background:"#eeeeee" }}>
                  {p.image && <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" style={{ filter:"brightness(0.82)" }}/>}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-sm mb-3" style={{ color:"var(--orange)" }}>{p.name}</h3>
                  {pairs.length > 0 && (
                    <div className="grid grid-cols-3 gap-1.5 mb-3">
                      {pairs.map(([l, v])=>(
                        <div key={l} className="p-2 rounded text-center" style={{ background:"#f7f7f7", border:"1px solid #ebebeb" }}>
                          <div className="text-[9px] font-bold mb-0.5" style={{ color:"#888888", letterSpacing:"0.05em" }}>{l}</div>
                          <div className="text-[10px] font-bold" style={{ color:"#333333" }}>{v}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  {chips.length > 0 && <SpecChips specs={chips} small />}
                  {p.description && <p className="text-[11px] leading-relaxed mb-2" style={{ color:"#666666" }}>{p.description}</p>}
                  {p.applications && (
                    <p className="text-[11px] leading-relaxed" style={{ color:"#666666" }}>
                      <span className="font-semibold" style={{ color:"#444444" }}>Use: </span>{p.applications}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
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
  );
}

/* ── Port operations ─────────────────────────────────────── */
export function PortOperations({ section }: { section: PageSection }) {
  const [ref, s4] = useReveal();
  return (
    <section ref={ref} className="py-20 px-6" style={{ background:"#f5f5f5" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity:0,y:20 }} animate={s4?{opacity:1,y:0}:{}} transition={{ duration:0.5 }}
                    className="mb-12">
          <div className="section-tag mb-2">PORT LOGISTICS</div>
          <h2 className="text-3xl font-black" style={{ color:"#111111" }}>
            Port <span style={{ color:"var(--orange)" }}>Operations</span>
          </h2>
          <p className="mt-2 text-sm max-w-lg" style={{ color:"#666666" }}>
            End-to-end handling at major Indian ports — from vessel to final dispatch.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(section.cards ?? []).map((c,i)=>{
            const icon = cardIcon(c.icon);
            return (
              <motion.div key={`${c.title}-${i}`}
                initial={{ opacity:0,y:30 }} animate={s4?{opacity:1,y:0}:{}}
                transition={{ duration:0.5, delay:i*0.08 }}
                className="rounded-xl p-6 bg-white"
                style={{ border:"1px solid #e5e5e5", transition:"box-shadow .25s, transform .25s" }}
                onMouseEnter={e=>{const el=e.currentTarget as HTMLDivElement;el.style.boxShadow="0 12px 32px rgba(0,0,0,0.08)";el.style.transform="translateY(-3px)";}}
                onMouseLeave={e=>{const el=e.currentTarget as HTMLDivElement;el.style.boxShadow="";el.style.transform="";}}>
                {icon && (
                  <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-4"
                       style={{ background:"rgba(249,115,22,0.1)" }}>
                    <icon.Icon size={20} style={{ color:"var(--orange)" }}/>
                  </div>
                )}
                <h3 className="font-bold text-sm mb-2" style={{ color:"#111111" }}>{c.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color:"#666666" }}>{c.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Minerals ─────────────────────────────────────────────── */
const mineralOrigins = ["Zimbabwe", "Kenya", "Mozambique"];

export function MineralProducts({ section, products }: { section: PageSection; products: Product[] }) {
  const [ref, s5] = useReveal();
  return (
    <section ref={ref} className="py-20 px-6" style={{ background:"#ffffff" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity:0,y:20 }} animate={s5?{opacity:1,y:0}:{}} transition={{ duration:0.5 }}
                    className="mb-12">
          <div className="section-tag mb-2">BEYOND COAL</div>
          <h2 className="text-3xl font-black" style={{ color:"#111111" }}>
            <Highlight text={section.heading ?? ""} />
          </h2>
          {section.body && <p className="mt-2 text-sm max-w-lg" style={{ color:"#666666" }}>{section.body}</p>}
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-6 mb-10">
          {products.map((m,i)=>(
            <motion.div key={m.id}
              initial={{ opacity:0,y:30 }} animate={s5?{opacity:1,y:0}:{}}
              transition={{ duration:0.5, delay:i*0.1 }}
              className="rounded-xl overflow-hidden"
              style={{ background:"white", border:"1px solid #e5e5e5" }}>
              <div className="overflow-hidden" style={{ height:150, background:"#eeeeee" }}>
                {m.image && <img src={m.image} alt={m.name} className="w-full h-full object-cover" style={{ filter:"brightness(0.85)" }}/>}
              </div>
              <div className="p-5">
                <h3 className="font-bold text-sm mb-2" style={{ color:"#111111" }}>{m.name}</h3>
                {m.description && <p className="text-xs leading-relaxed mb-3" style={{ color:"#666666" }}>{m.description}</p>}
                <SpecChips specs={m.specs} small />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity:0,y:20 }} animate={s5?{opacity:1,y:0}:{}} transition={{ duration:0.5, delay:0.3 }}
                    className="rounded-xl p-7" style={{ background:"#f5f5f5", border:"1px solid #e5e5e5" }}>
          <div className="font-bold text-sm mb-3" style={{ color:"#111111" }}>Sourced From</div>
          <div className="flex flex-wrap gap-3">
            {mineralOrigins.map(o=>(
              <span key={o} className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold bg-white"
                    style={{ border:"1px solid #e0e0e0", color:"#444444" }}>
                <Globe size={12} style={{ color:"var(--orange)" }}/> {o}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Salt ─────────────────────────────────────────────────── */
export function SaltProducts({ section, products }: { section: PageSection; products: Product[] }) {
  const [ref, s3] = useReveal();
  return (
    <section ref={ref} className="py-20 px-6" style={{ background:"#f5f5f5" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity:0,y:20 }} animate={s3?{opacity:1,y:0}:{}} transition={{ duration:0.5 }}
                    className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="section-tag">NEW VERTICAL</div>
          </div>
          <h2 className="text-3xl font-black" style={{ color:"#111111" }}>
            <Highlight text={section.heading ?? ""} />
          </h2>
          {section.body && <p className="mt-2 text-sm max-w-lg" style={{ color:"#666666" }}>{section.body}</p>}
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {products.map((s,i)=>(
            <motion.div key={s.id}
              initial={{ opacity:0,y:30 }} animate={s3?{opacity:1,y:0}:{}}
              transition={{ duration:0.5, delay:i*0.1 }}
              className="rounded-xl overflow-hidden relative"
              style={{ background:"white", border:"1px solid #e5e5e5" }}>
              {/* Coming soon overlay badge — only for products not yet launched */}
              {s.comingSoon && (
                <div className="absolute top-4 right-4 z-10 px-2.5 py-1 rounded text-[10px] font-black"
                     style={{ background:"#64748b", color:"white", letterSpacing:"0.06em" }}>
                  COMING SOON
                </div>
              )}
              <div className="relative overflow-hidden" style={{ height:200, background:"#eeeeee" }}>
                {s.image && (
                  <img src={s.image}
                       alt={s.name} className="w-full h-full object-cover"
                       style={{ filter: s.comingSoon ? "grayscale(0.2) brightness(0.8)" : "none" }}/>
                )}
                <div className="absolute inset-0" style={{ background:"linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 60%)" }}/>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-base mb-2" style={{ color:"#111111" }}>{s.name}</h3>
                {s.description && <p className="text-sm leading-relaxed mb-4" style={{ color:"#555555" }}>{s.description}</p>}
                <SpecChips specs={s.specs} />
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
            <p className="text-sm" style={{ color:"#666666" }}>Contact us to register your interest — we&apos;ll be in touch when we launch.</p>
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
  );
}

function SpecChips({ specs, small }: { specs: string[]; small?: boolean }) {
  if (!specs.length) return null;
  return (
    <div className={`flex flex-wrap ${small ? "gap-1.5 mb-3" : "gap-2"}`}>
      {specs.map(sp=>(
        <span key={sp} className={small ? "px-2 py-0.5 rounded text-[10px] font-semibold" : "px-2.5 py-1 rounded text-[11px] font-semibold"}
              style={{ background: small ? "#f5f5f5" : "#f0f0f0", border: small ? "1px solid #e5e5e5" : "1px solid #e0e0e0", color:"#555555" }}>{sp}</span>
      ))}
    </div>
  );
}
