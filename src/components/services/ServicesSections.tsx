"use client";
/* eslint-disable @next/next/no-img-element */
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Globe, ShieldCheck, Flame, Factory, Ship, Award } from "lucide-react";
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
            {["Coal Trading", "Port Operations", "Minerals", "Chemicals", "Salt — Coming Soon"].map(t=>(
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
  "Coal Trading & Sourcing":       { badge:"Core Business",  badgeColor:"#F97316", tags:["Steam Coal", "Non-Coking", "Coking", "Indonesia", "South Africa"] },
  "Stevedoring & Port Operations": { badge:"Port Logistics", badgeColor:"#3b82f6", tags:["15+ Ports", "Loading", "Unloading", "Bulk Cargo"] },
  "International Trading":         { badge:"Global",         badgeColor:"#8b5cf6", tags:["Indonesia", "South Africa", "Zimbabwe", "Kenya", "Dubai"] },
  "Road Transportation":           { badge:"Supply Chain",   badgeColor:"#22c55e", tags:["Doorstep Delivery", "50+ Cities", "Packing", "Dispatch"] },
  "Yard & Stocking Operations":    { badge:"Operations",     badgeColor:"#D97706", tags:["Railway Rakes", "Stockpiles", "Anti-oxidation", "Storage"] },
  "Unloading & Stacking":          { badge:"Operations",     badgeColor:"#D97706", tags:["Railway Rakes", "Stockpiles", "Anti-oxidation", "Storage"] },
  "Minerals & Chemicals Trading":  { badge:"Diversified",    badgeColor:"#64748b", tags:["Manganese", "Silica Ore", "Chemicals"] },
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

/* ── Coal products & Quality Assurance Table ────────────────────────── */
interface CoalSpecItem {
  name: string;
  category: "Steam Coal" | "Non-Coking Coal" | "Coking Coal" | "Sized Coal";
  origin: string;
  originCountry: string;
  applications: string;
  boilerSpec: string;
  image: string;
  featured?: boolean;
}

const VERIFIED_COAL_PORTFOLIO: CoalSpecItem[] = [
  {
    name: "Steam Coal — Indonesia",
    category: "Steam Coal",
    origin: "Indonesia (Kalimantan / Sumatra)",
    originCountry: "Indonesia",
    applications: "Power utilities, cement kilns, steel mills, textile & paper manufacturing",
    boilerSpec: "Screened 0–50mm / ROM; customized for fluidised bed and pulverised fuel boilers",
    image: "/images/coal_specimen_grade.jpg",
    featured: true,
  },
  {
    name: "Steam Coal — South Africa",
    category: "Steam Coal",
    origin: "South Africa (RB1 / RB2 / RB3)",
    originCountry: "South Africa",
    applications: "Thermal power plants, captive industrial power generation across West & East coast India",
    boilerSpec: "High thermal efficiency, washed & sized per plant boiler combustion requirements",
    image: "/images/vessel_heilan_cruiser.jpg",
    featured: true,
  },
  {
    name: "Non-Coking Coal",
    category: "Non-Coking Coal",
    origin: "Domestic & Prime Imported Concessions",
    originCountry: "Pan-India & Global",
    applications: "Industrial boilers, rotary kilns, process heat plants & manufacturing factories",
    boilerSpec: "Multiple industrial grades and sizing supplied to customer factory quality standards",
    image: "/images/operations_collage.jpg",
    featured: true,
  },
  {
    name: "Coking Coal",
    category: "Coking Coal",
    origin: "Prime International Concessions",
    originCountry: "International",
    applications: "Steel manufacturing, blast furnace operations & metallurgical foundries across India",
    boilerSpec: "High coke strength, low volatile matter, prime metallurgical reduction grade",
    image: "/images/coal_specimen_grade.jpg",
    featured: false,
  },
  {
    name: "Steam Coal — East Africa",
    category: "Steam Coal",
    origin: "Kenya & Zimbabwe",
    originCountry: "East Africa",
    applications: "Captive boilers, brick kilns, regional processing plants and industrial consumers",
    boilerSpec: "Screened sizing and grading delivered on order to client specifications",
    image: "/images/operations_collage.jpg",
    featured: false,
  },
];

export function CoalProducts({ section, products }: { section: PageSection; products: Product[] }) {
  const [ref, s2] = useReveal();
  const [activeTab, setActiveTab] = useState<"table" | "cards">("table");

  // Filter out any legacy GCV / Ash / Moisture specs from incoming products
  const safeProducts = (products ?? []).map(p => ({
    ...p,
    specs: p.specs.filter(sp => !/^(GCV|Ash|Moisture)/i.test(sp.trim())),
  }));

  return (
    <section ref={ref} id="coal-products" className="py-20 px-6" style={{ background:"#ffffff" }}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div initial={{ opacity:0,y:20 }} animate={s2?{opacity:1,y:0}:{}} transition={{ duration:0.5 }}
                    className="mb-10">
          <div className="section-tag mb-2">QUALITY ASSURANCE: FROM MINES TO PLANTS & FACTORIES</div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
                Quality Assured <span style={{ color:"var(--orange)" }}>Coal Portfolio</span>
              </h2>
              <p className="mt-2 text-sm sm:text-base max-w-2xl text-gray-600 leading-relaxed">
                Supplying coal strictly according to customer boiler specifications and factory quality requirements.
                We provide complete quality assurance from origin concessions and port discharge to plant doorstep delivery.
              </p>
            </div>
            {/* View toggle */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-gray-100 border border-gray-200 shrink-0 self-start md:self-auto">
              <button
                onClick={() => setActiveTab("table")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === "table" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"
                }`}
              >
                Specification Table
              </button>
              <button
                onClick={() => setActiveTab("cards")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === "cards" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"
                }`}
              >
                Visual Cards
              </button>
            </div>
          </div>
        </motion.div>

        {/* 3 Quality Assurance Pillars */}
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          {[
            {
              icon: Globe,
              title: "Origin Quality Inspection",
              desc: "Direct partnerships across Indonesia, South Africa, and East Africa with authenticated pre-shipment origin inspection.",
              color: "#3b82f6",
            },
            {
              icon: Flame,
              title: "Boiler-Matched Grading",
              desc: "Screened sizing (0–50mm, ROM, sized) tailored to specific boiler designs, heat parameters, and grate configurations.",
              color: "#F97316",
            },
            {
              icon: Factory,
              title: "Mines to Plants Assurance",
              desc: "Strict quality control across vessel discharge, anti-oxidation yard stacking, and dedicated road/rail plant delivery.",
              color: "#22c55e",
            },
          ].map((qa, i) => (
            <motion.div
              key={qa.title}
              initial={{ opacity:0, y:20 }}
              animate={s2?{opacity:1,y:0}:{}}
              transition={{ duration:0.5, delay: i * 0.1 }}
              className="p-5 rounded-xl border border-gray-200 bg-gray-50/70"
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: `${qa.color}15`, color: qa.color }}
                >
                  <qa.icon size={16} />
                </div>
                <h3 className="font-bold text-sm text-gray-900">{qa.title}</h3>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">{qa.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Primary View: Specification Table (as requested: origin, typical use, remove GCV/Ash/Moisture) */}
        {activeTab === "table" ? (
          <motion.div
            initial={{ opacity:0, y:15 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:0.4 }}
            className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm bg-white mb-10"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-[11px] font-black uppercase tracking-wider text-gray-500">
                    <th className="py-4 px-5">Coal Category / Product</th>
                    <th className="py-4 px-5">Origin</th>
                    <th className="py-4 px-5">Typical Use / Industrial Applications</th>
                    <th className="py-4 px-5">Supply Sizing & Boiler Specs</th>
                    <th className="py-4 px-5 text-right">Quotation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {VERIFIED_COAL_PORTFOLIO.map((item, idx) => (
                    <tr
                      key={item.name}
                      className="hover:bg-orange-50/30 transition-colors group"
                    >
                      <td className="py-4 px-5 align-top">
                        <div className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                          {item.name}
                        </div>
                        <span
                          className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold"
                          style={{
                            background: item.category === "Coking Coal" ? "#eff6ff" : "rgba(249,115,22,0.1)",
                            color: item.category === "Coking Coal" ? "#2563eb" : "var(--orange)",
                          }}
                        >
                          {item.category}
                        </span>
                      </td>
                      <td className="py-4 px-5 align-top whitespace-nowrap">
                        <div className="flex items-center gap-1.5 font-medium text-gray-800">
                          <Globe size={13} className="text-gray-400" />
                          <span>{item.origin}</span>
                        </div>
                      </td>
                      <td className="py-4 px-5 align-top">
                        <p className="text-xs text-gray-600 leading-relaxed max-w-xs sm:max-w-sm">
                          {item.applications}
                        </p>
                      </td>
                      <td className="py-4 px-5 align-top">
                        <div className="text-xs text-gray-700 font-medium leading-relaxed max-w-xs">
                          {item.boilerSpec}
                        </div>
                        <div className="text-[10px] text-gray-400 mt-1">
                          Tailored to boiler & factory quality requirements
                        </div>
                      </td>
                      <td className="py-4 px-5 align-top text-right whitespace-nowrap">
                        <Link
                          href="/contact"
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-white transition-all shadow-sm"
                          style={{ background: "var(--orange)" }}
                        >
                          Request Quote <ArrowRight size={12} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Footer note */}
            <div className="p-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-green-600 shrink-0" />
                <span>All coal grades and sizes provided according to customer plant quality requirements and boiler designs.</span>
              </div>
              <span className="font-semibold text-gray-700 shrink-0">Quotations provided on request</span>
            </div>
          </motion.div>
        ) : (
          /* Cards View */
          <motion.div
            initial={{ opacity:0, y:15 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:0.4 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
          >
            {VERIFIED_COAL_PORTFOLIO.map((p, i) => (
              <div
                key={p.name}
                className="rounded-xl overflow-hidden bg-white border border-gray-200 group hover:shadow-lg transition-all"
              >
                <div className="overflow-hidden relative h-40 bg-gray-100">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    style={{ filter: "brightness(0.88)" }}
                  />
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-bold text-white bg-black/60 backdrop-blur-sm">
                    {p.category}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-base text-gray-900 mb-1.5">{p.name}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
                    <Globe size={13} style={{ color: "var(--orange)" }} />
                    <span className="font-semibold text-gray-700">Origin:</span> {p.origin}
                  </div>
                  <div className="p-3 rounded-lg bg-gray-50 border border-gray-100 text-xs mb-3">
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Typical Use:</div>
                    <p className="text-gray-700 leading-relaxed">{p.applications}</p>
                  </div>
                  <div className="text-xs text-gray-600 mb-4">
                    <span className="font-semibold text-gray-700">Boiler Sizing: </span>
                    {p.boilerSpec}
                  </div>
                  <Link
                    href="/contact"
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold text-white transition-all shadow-sm"
                    style={{ background: "var(--orange)" }}
                  >
                    Request Quotation <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Operational Real Photography Showcase */}
        <div className="mb-12">
          <div className="text-xs font-black uppercase tracking-wider text-gray-400 mb-4">
            Operations & Sourcing in Action
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="group rounded-xl overflow-hidden border border-gray-200 bg-white relative">
              <div className="h-48 overflow-hidden bg-gray-900">
                <img
                  src="/images/coal_specimen_grade.jpg"
                  alt="High Grade Coal Specimen"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-3 bg-white">
                <div className="font-bold text-xs text-gray-900">Direct Sourced Coal Specimen</div>
                <div className="text-[11px] text-gray-500 mt-0.5">High calorific quality & clean fracture</div>
              </div>
            </div>
            <div className="group rounded-xl overflow-hidden border border-gray-200 bg-white relative">
              <div className="h-48 overflow-hidden bg-gray-900">
                <img
                  src="/images/vessel_heilan_cruiser.jpg"
                  alt="Vessel Heilan Cruiser at Port"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-3 bg-white">
                <div className="font-bold text-xs text-gray-900">Vessel & Stevedoring Operations</div>
                <div className="text-[11px] text-gray-500 mt-0.5">Bulk carrier discharge at Indian coastal ports</div>
              </div>
            </div>
            <div className="group rounded-xl overflow-hidden border border-gray-200 bg-white relative">
              <div className="h-48 overflow-hidden bg-gray-900">
                <img
                  src="/images/operations_collage.jpg"
                  alt="Port grab unloader, stockpiles and barge"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-3 bg-white">
                <div className="font-bold text-xs text-gray-900">Yard Management & Barge Transit</div>
                <div className="text-[11px] text-gray-500 mt-0.5">Stockpile preservation and inland logistics</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quotation CTA Banner */}
        <div
          className="rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ background: "#111111", color: "white" }}
        >
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-3"
                 style={{ background: "rgba(249,115,22,0.2)", color: "var(--orange)" }}>
              <ShieldCheck size={13} /> Tailored Plant Supply
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
              Need a Custom Grade for Your Boilers?
            </h3>
            <p className="text-sm text-gray-400 max-w-xl leading-relaxed">
              We supply coal according to specific boiler specifications, sizing requirements (0–50mm, ROM, screened),
              and factory quality standards. Direct mine-to-plant quotations provided on request.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold text-white transition-all shadow-lg"
            style={{ background: "var(--orange)" }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 8px 24px rgba(249,115,22,0.45)")}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = "")}
          >
            Request Plant Quotation <ArrowRight size={15} />
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
