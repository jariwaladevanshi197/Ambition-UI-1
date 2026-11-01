"use client";
/* eslint-disable @next/next/no-img-element */
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import type { PageSection } from "@/components/admin/types";
import { cardIcon, type CardDesign } from "@/components/cms/icons";
import { Highlight } from "@/components/cms/Highlight";

// Designed icons and accents for each pillar
const designs: Record<string, CardDesign> = {
  "Responsible Trading":      { icon:"shield",         color:"#D97706" },
  "Responsible Supplying":    { icon:"check-circle",   color:"#3b82f6" },
  "Environmental Care":       { icon:"leaf",           color:"#10b981" },
  "Environmental Commitment": { icon:"droplets",       color:"#10b981" },
  "Community Development":    { icon:"handshake",      color:"#22c55e" },
  "Future Energy":            { icon:"zap",            color:"#F97316" },
  "Women Empowerment":        { icon:"graduation-cap", color:"#a855f7" },
  "Circular Economy":         { icon:"recycle",        color:"#10b981" },
  "Responsible Mining":       { icon:"pickaxe",        color:"#D97706" },
};

// Subtle contextual badges for the default pillars
const pillarTags: Record<string, string> = {
  "Responsible Trading":      "Ethical Deals",
  "Responsible Supplying":    "Quality & On-Time",
  "Environmental Care":       "Eco Stewardship",
  "Environmental Commitment": "Eco Stewardship",
  "Community Development":    "Social Impact",
  "Future Energy":            "Energy Transition",
  "Women Empowerment":        "Inclusive Growth",
  "Circular Economy":         "Zero Waste",
  "Responsible Mining":       "Core Foundation",
};

function getSafeColor(raw: string | undefined): string {
  if (!raw || raw.startsWith("var(")) return "#F97316";
  return raw;
}

// Verified commitment pillars matching executive notes and company profile
const VERIFIED_PILLARS = [
  {
    title: "Responsible Trading",
    desc: "Fair, transparent trading and ethical sourcing in every deal with customers and partners.",
    icon: "shield",
  },
  {
    title: "Responsible Supplying",
    desc: "The right quality and quantity, delivered on time — exactly as committed to each plant and factory.",
    icon: "check-circle",
  },
  {
    title: "Environmental Care",
    desc: "Zero-waste initiatives, reforestation and clean water conservation partnerships.",
    icon: "leaf",
  },
  {
    title: "Community Development",
    desc: "Education and economic inclusion for local communities.",
    icon: "handshake",
  },
  {
    title: "Women Empowerment",
    desc: "Skill development and leadership programmes for women in local communities.",
    icon: "graduation-cap",
  },
  {
    title: "Future Energy",
    desc: "Investing in cleaner coal technologies and the transition to renewables.",
    icon: "zap",
  },
];

function resolvePillars(cards?: PageSection["cards"]) {
  if (!cards || cards.length === 0) return VERIFIED_PILLARS;
  const hasLegacy = cards.some(c => c.title === "Responsible Mining") || !cards.some(c => c.title === "Responsible Supplying");
  if (hasLegacy) return VERIFIED_PILLARS;
  return cards;
}

export default function SustainSection({ section }: { section: PageSection }) {
  const sectionRef = useRef<HTMLElement>(null);
  const inView     = useInView(sectionRef, { once: true, margin: "-80px" });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  if (section.visible === false) return null;

  const cards = resolvePillars(section.cards);

  // Responsive Bento span calculation based on card index
  const getBentoColSpan = (index: number, total: number) => {
    if (total === 6) {
      if (index === 0) return "col-span-1 sm:col-span-2 lg:col-span-7";
      if (index === 1) return "col-span-1 sm:col-span-2 lg:col-span-5";
      if (index === 2) return "col-span-1 sm:col-span-1 lg:col-span-4";
      if (index === 3) return "col-span-1 sm:col-span-1 lg:col-span-4";
      if (index === 4) return "col-span-1 sm:col-span-2 lg:col-span-4";
      if (index === 5) return "col-span-1 sm:col-span-2 lg:col-span-12";
    }
    if (total % 3 === 0) return "col-span-1 sm:col-span-1 lg:col-span-4";
    return "col-span-1 sm:col-span-1 lg:col-span-6";
  };

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden" style={{ background: "#f8f9fa" }}>
      {/* Decorative background grid pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
          backgroundSize: "28px 28px"
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase mb-3"
               style={{ background: "rgba(249,115,22,0.1)", color: "var(--orange)" }}>
            <Sparkles size={12} /> Responsibility & ESG
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight" style={{ color: "#111111" }}>
            {section.headline ? (
              <Highlight text={section.headline} />
            ) : (
              <>Our <span style={{ color: "var(--orange)" }}>Commitment</span></>
            )}
          </h2>
          <p className="mt-4 text-sm md:text-base max-w-2xl mx-auto leading-relaxed" style={{ color: "rgba(0,0,0,0.6)" }}>
            {section.subtext || "Responsible towards our customers — in how we source, trade and supply."}
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5 md:gap-6">
          {cards.map((c, i) => {
            const icon = cardIcon(c.icon, designs[c.title]);
            const accentColor = getSafeColor(icon?.color ?? designs[c.title]?.color);
            const tag = pillarTags[c.title] ?? `Pillar 0${i + 1}`;
            const colSpan = getBentoColSpan(i, cards.length);
            const isHeroCard = cards.length === 6 && i === 0;
            const isBannerCard = cards.length === 6 && i === 5;
            const isHovered = hoveredCard === i;

            return (
              <motion.div
                key={`${c.title}-${i}`}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className={colSpan}
              >
                <div
                  onMouseEnter={() => setHoveredCard(i)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="group relative rounded-3xl p-7 md:p-8 flex flex-col justify-between bg-white h-full overflow-hidden select-none cursor-default"
                  style={{
                    border: "1px solid",
                    borderColor: isHovered ? `${accentColor}55` : "rgba(0,0,0,0.08)",
                    boxShadow: isHovered
                      ? `0 20px 40px -8px ${accentColor}25, 0 10px 20px -5px rgba(0,0,0,0.04)`
                      : "0 2px 10px rgba(0,0,0,0.02)",
                    transform: isHovered ? "translateY(-6px)" : "translateY(0px)",
                    transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease, border-color 0.25s ease",
                  }}
                >
                  {/* Top highlight line on hover */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1 transition-opacity duration-300"
                    style={{
                      background: accentColor,
                      opacity: isHovered ? 1 : 0,
                    }}
                  />

                  {/* Ambient glow in card corner */}
                  <div
                    className="absolute -top-16 -right-16 w-44 h-44 rounded-full blur-3xl pointer-events-none transition-opacity duration-500"
                    style={{
                      background: accentColor,
                      opacity: isHovered ? 0.15 : 0,
                    }}
                  />

                  {/* Card Content Layout */}
                  <div className="relative z-10 flex-1">
                    {/* Top Bar: Icon + Pill Badge */}
                    <div className="flex items-center justify-between gap-3 mb-6">
                      {icon && (
                        <div
                          className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                          style={{
                            background: `${accentColor}12`,
                            border: `1px solid ${accentColor}25`,
                          }}
                        >
                          <icon.Icon size={22} style={{ color: accentColor }} strokeWidth={1.8} />
                        </div>
                      )}
                      <span
                        className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase transition-colors duration-300"
                        style={{
                          background: `${accentColor}10`,
                          color: accentColor,
                        }}
                      >
                        {tag}
                      </span>
                    </div>

                    {c.image && (
                      <div className="mb-5 rounded-2xl overflow-hidden h-44 w-full">
                        <img
                          src={c.image}
                          alt={c.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}

                    {/* Wide Banner Special Layout (Future Energy) */}
                    {isBannerCard ? (
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                        <div className="lg:col-span-8">
                          <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-2 group-hover:text-black transition-colors">
                            {c.title}
                          </h3>
                          <p className="text-sm md:text-base leading-relaxed" style={{ color: "rgba(0,0,0,0.65)" }}>
                            {c.desc}
                          </p>
                        </div>
                        <div className="lg:col-span-4 flex lg:justify-end">
                          <div
                            className="px-5 py-3.5 rounded-2xl flex items-center gap-3 w-full lg:w-auto transition-colors duration-300"
                            style={{
                              background: isHovered ? `${accentColor}15` : "rgba(249,115,22,0.06)",
                              border: `1px dashed ${isHovered ? accentColor : "rgba(249,115,22,0.3)"}`,
                            }}
                          >
                            <CheckCircle2 size={18} style={{ color: accentColor }} />
                            <span className="text-xs font-semibold text-gray-800">
                              Renewable Transition Pipeline
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <h3 className={`font-bold text-gray-900 mb-2.5 group-hover:text-black transition-colors ${
                          isHeroCard ? "text-xl md:text-2xl font-black" : "text-base md:text-lg"
                        }`}>
                          {c.title}
                        </h3>
                        <p className={`leading-relaxed ${
                          isHeroCard ? "text-sm md:text-base text-gray-600" : "text-xs md:text-sm text-gray-500"
                        }`}>
                          {c.desc}
                        </p>

                        {/* Extra feature line for the Hero card */}
                        {isHeroCard && (
                          <div className="mt-5 pt-5 border-t border-gray-100 flex items-center gap-4 text-xs font-medium text-gray-500">
                            <span className="flex items-center gap-1.5 text-gray-700">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
                              Fair & transparent deals
                            </span>
                            <span className="flex items-center gap-1.5 text-gray-700">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
                              Ethical global sourcing
                            </span>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA / Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-14 text-center"
        >
          <Link
            href="/csr"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 group bg-white border border-black/10 text-gray-900 shadow-sm hover:border-[var(--orange)] hover:text-[var(--orange)] hover:shadow-md"
          >
            Explore all CSR & Sustainability Initiatives
            <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
