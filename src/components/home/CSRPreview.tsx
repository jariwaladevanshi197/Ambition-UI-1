"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { PageSection } from "@/components/admin/types";
import { cardIcon, type CardDesign } from "@/components/cms/icons";

// The designed icon colour for each card, matched by card title.
const designs: Record<string, CardDesign> = {
  "Adopted Schools":        { icon:"graduation-cap", color:"#F97316" },
  "Health Initiatives":     { icon:"heart-pulse",    color:"#22c55e" },
  "Women Empowerment":      { icon:"users",          color:"#a855f7" },
  "Environmental Programs": { icon:"leaf",           color:"#D97706" },
};

export default function CSRPreview({ section }: { section: PageSection }) {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin:"-80px" });

  return (
    <section ref={ref} className="py-24" style={{ background:"#ffffff" }}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}}
          transition={{ duration:0.5 }} className="text-center mb-12"
        >
          <div className="section-tag">CSR IMPACT</div>
          <h2 className="text-3xl md:text-4xl font-black">
            Growing <span style={{ color:"var(--orange)" }}>Together</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {(section.cards ?? []).map((c, i) => {
            const icon = cardIcon(c.icon, designs[c.title]);
            const color = icon?.color ?? "#F97316";
            return (
            <motion.div
              key={`${c.title}-${i}`}
              initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}}
              transition={{ duration:0.5, delay: i*0.1 }}
              className="relative overflow-hidden rounded-2xl p-7 group cursor-none"
              style={{
                background: "rgba(0,0,0,0.02)",
                border: "1px solid rgba(0,0,0,0.08)",
                transition: "all .3s",
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
                el.style.boxShadow   = "";
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
              />
              {icon && (
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                     style={{ background:`${color}14` }}>
                  <icon.Icon size={22} style={{ color }} strokeWidth={1.75} />
                </div>
              )}
              <h3 className="font-bold text-sm text-gray-900 mb-2">{c.title}</h3>
              <p className="text-xs" style={{ color }}>{c.desc}</p>
            </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link href="/activities"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-200"
            style={{ color:"var(--orange)" }}
          >
            Explore all CSR activities <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
