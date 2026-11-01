"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CardItem, PageSection } from "@/components/admin/types";
import { cardIcon, type CardDesign } from "@/components/cms/icons";

// The designed icon colour for each card, matched by card title.
const designs: Record<string, CardDesign> = {
  "Educational Support":    { icon:"book-open",      color:"#3b82f6" },
  "Environmental Programs": { icon:"leaf",           color:"#10b981" },
  "Women Empowerment":      { icon:"users",          color:"#a855f7" },
  "Adopted Schools":        { icon:"graduation-cap", color:"#F97316" },
  "Health Initiatives":     { icon:"heart-pulse",    color:"#22c55e" },
};

// Verified CSR impact data: Adopted Schools merged into Educational Support
const VERIFIED_CSR: CardItem[] = [
  {
    title: "Educational Support",
    desc: "1,300+ students reached across 6 adopted schools",
    icon: "book-open",
  },
  {
    title: "Environmental Programs",
    desc: "11,000+ environmental initiatives sustained",
    icon: "leaf",
  },
  {
    title: "Women Empowerment",
    desc: "Empowerment, skill development & leadership",
    icon: "users",
  },
];

function resolveCsrCards(cards?: CardItem[]): CardItem[] {
  if (!cards || cards.length === 0) return VERIFIED_CSR;

  // If DB still has separate "Adopted Schools" card or legacy items, merge into Educational Support
  const hasLegacy = cards.some(
    c => c.title === "Adopted Schools" || c.title === "Health Initiatives" || (c.desc && (c.desc.includes("24 schools") || c.desc.includes("50,000+")))
  );
  if (hasLegacy) return VERIFIED_CSR;

  return cards;
}

export default function CSRPreview({ section }: { section: PageSection }) {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin:"-80px" });
  const cards  = resolveCsrCards(section.cards);

  return (
    <section ref={ref} className="py-24" style={{ background:"#ffffff" }}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}}
          transition={{ duration:0.5 }} className="text-center mb-14"
        >
          <div className="section-tag">SOCIAL RESPONSIBILITY</div>
          <h2 className="text-3xl md:text-4xl font-black">
            Growing <span style={{ color:"var(--orange)" }}>Together</span>
          </h2>
        </motion.div>

        {/* 3-column responsive layout for merged educational support */}
        <div className={`grid grid-cols-1 ${cards.length <= 3 ? "sm:grid-cols-2 md:grid-cols-3" : "sm:grid-cols-2 md:grid-cols-4"} gap-6`}>
          {cards.map((c, i) => {
            const icon = cardIcon(c.icon, designs[c.title]);
            const color = icon?.color ?? "#F97316";
            return (
            <motion.div
              key={`${c.title}-${i}`}
              initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}}
              transition={{ duration:0.5, delay: i*0.1 }}
              className="relative overflow-hidden rounded-2xl p-8 group cursor-default transition-all duration-300 bg-white"
              style={{
                border: "1px solid rgba(0,0,0,0.08)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = color + "55";
                el.style.transform   = "translateY(-6px)";
                el.style.boxShadow   = `0 20px 40px ${color}18`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = "rgba(0,0,0,0.08)";
                el.style.transform   = "";
                el.style.boxShadow   = "0 2px 8px rgba(0,0,0,0.02)";
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: color }}
              />
              {icon && (
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                     style={{ background:`${color}14`, border:`1px solid ${color}25` }}>
                  <icon.Icon size={24} style={{ color }} strokeWidth={1.8} />
                </div>
              )}
              <h3 className="font-bold text-lg text-gray-900 mb-2.5">{c.title}</h3>
              <p className="text-sm leading-relaxed text-gray-600 font-medium">{c.desc}</p>
            </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link href="/csr"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-200"
            style={{ color:"var(--orange)" }}
          >
            Explore all CSR & Community Initiatives <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
