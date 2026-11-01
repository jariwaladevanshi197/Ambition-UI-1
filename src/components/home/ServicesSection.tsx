"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { PageSection } from "@/components/admin/types";

// Badge on each card, matched by card title. Cards added in the admin get no
// badge; a title containing "Coming Soon" gets the coming-soon treatment.
const badges: Record<string, { tag: string; tagColor: string }> = {
  "Coal Trading & Delivery":          { tag: "Core Business", tagColor: "#F97316" },
  "Coal Trading & Sourcing":          { tag: "Core Business", tagColor: "#F97316" },
  "Stevedoring & Port Operations":    { tag: "Port Logistics",tagColor: "#3b82f6" },
  "Port Operations":                  { tag: "Port Logistics",tagColor: "#3b82f6" },
  "International Trading":            { tag: "Global Origins",tagColor: "#8b5cf6" },
  "Road & Rail Transportation":       { tag: "Supply Chain",  tagColor: "#22c55e" },
  "Road Transportation":              { tag: "Supply Chain",  tagColor: "#22c55e" },
  "Unloading & Stacking":             { tag: "Operations",    tagColor: "#0ea5e9" },
  "Minerals & Chemicals Trading":     { tag: "Commodities",   tagColor: "#D97706" },
  "Minerals Trading":                 { tag: "Minerals",      tagColor: "#D97706" },
  "Salt — Coming Soon":               { tag: "New Product",   tagColor: "#64748b" },
};

// Dedicated, authentic operational images matched specifically to each service card
const SERVICE_IMAGE_MAP: Record<string, string> = {
  "Coal Trading & Delivery":       "/images/cover-lump.jpg",
  "Coal Trading & Sourcing":       "/images/cover-lump.jpg",
  "Stevedoring & Port Operations": "/images/cover-port.jpg",
  "Port Operations":               "/images/cover-port.jpg",
  "International Trading":         "/images/shipping.jpg",
  "Road & Rail Transportation":    "/images/cover-barges.jpg",
  "Road Transportation":           "/images/cover-barges.jpg",
  "Unloading & Stacking":          "/images/cover-dozer.jpg",
  "Yard & Stocking Operations":    "/images/cover-dozer.jpg",
  "Minerals & Chemicals Trading":  "/images/minerals.jpg",
  "Minerals Trading":              "/images/minerals.jpg",
};

// Verified services matching the latest company profile
const VERIFIED_SERVICES = [
  {
    title: "Coal Trading & Delivery",
    desc: "From trading to delivery, we provide coal to plants and factories according to each customer's requirements — the right size, grade and quality for every boiler.",
    image: "/images/cover-lump.jpg",
  },
  {
    title: "Stevedoring & Port Operations",
    desc: "Loading and unloading of ships at 15+ major Indian ports — Mumbai, Kandla, Mangalore, Tuticorin, Kochi, Vizag, Paradip, Hazira and Pipavav — with expert personnel and rapid turnaround.",
    image: "/images/cover-port.jpg",
  },
  {
    title: "International Trading",
    desc: "Direct sourcing partnerships across Asian and African markets — Indonesia, South Africa, Kenya, Zimbabwe, Dubai and Singapore — with physical trading positions across all major origins.",
    image: "/images/shipping.jpg",
  },
  {
    title: "Road & Rail Transportation",
    desc: "Doorstep delivery by road and rail covering 50+ cities, ensuring proper quality and quantity dispatch — with loading and unloading managed end-to-end.",
    image: "/images/cover-barges.jpg",
  },
  {
    title: "Unloading & Stacking",
    desc: "Handling from railway rakes and motor vehicles. Storage with special platforms, weighing and machinery; stacking that prevents oxidation and moisture gain.",
    image: "/images/cover-dozer.jpg",
  },
  {
    title: "Minerals & Chemicals Trading",
    desc: "Beyond coal — Manganese, Chrome, Silica and Zinc ore sourced from major origins across Indonesia, South Africa, Zimbabwe and Mozambique, expanding into industrial chemicals.",
    image: "/images/minerals.jpg",
  },
];

function resolveServices(cards?: PageSection["cards"]) {
  if (!cards || cards.length === 0) return VERIFIED_SERVICES;
  const hasInappropriate = cards.some(c =>
    !c.image ||
    c.image.includes("heilan_cruiser") ||
    c.image.includes("Gemini_Generated_Image") ||
    c.image.includes("operations_collage") ||
    c.title === "Salt — Coming Soon" ||
    c.title === "Coal Trading & Sourcing"
  );
  if (hasInappropriate) return VERIFIED_SERVICES;
  return cards.map(c => ({
    ...c,
    image: SERVICE_IMAGE_MAP[c.title] ?? c.image,
  }));
}

export default function ServicesSection({ section }: { section: PageSection }) {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const services = resolveServices(section.cards).map(c => ({
    ...c,
    tag: badges[c.title]?.tag,
    tagColor: badges[c.title]?.tagColor ?? "#F97316",
    comingSoon: /coming soon/i.test(c.title),
  }));

  return (
    <section ref={ref} className="py-24" style={{ background: "#f5f5f5" }}>
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}}
          transition={{ duration:0.5 }} className="mb-14"
        >
          <div className="section-tag mb-3">WHAT WE DO</div>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <h2 className="text-3xl md:text-4xl font-black" style={{ color:"#111111" }}>
              Our <span style={{ color:"var(--orange)" }}>Services</span>
            </h2>
            <Link href="/services"
              className="text-sm font-semibold flex items-center gap-1.5 transition-colors"
              style={{ color:"var(--orange)" }}
              onMouseEnter={e=>(e.currentTarget.style.opacity="0.75")}
              onMouseLeave={e=>(e.currentTarget.style.opacity="1")}>
              View all services <ArrowRight size={14}/>
            </Link>
          </div>
        </motion.div>

        {/* Service cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={`${s.title}-${i}`}
              initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}}
              transition={{ duration:0.5, delay: i*0.08 }}
              className="rounded-xl overflow-hidden bg-white group"
              style={{
                border: "1px solid #e5e5e5",
                transition: "box-shadow .25s, transform .25s",
                opacity: s.comingSoon ? 0.85 : 1,
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.boxShadow = "0 12px 40px rgba(0,0,0,0.10)";
                el.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.boxShadow = "";
                el.style.transform = "";
              }}
            >
              {/* Image */}
              <div className="relative overflow-hidden" style={{ height: 180 }}>
                {s.image && <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ filter: s.comingSoon ? "grayscale(0.4) brightness(0.85)" : "brightness(0.88)" }}
                />}
                {/* Tag */}
                {s.tag && <div className="absolute top-3 left-3 px-2.5 py-1 rounded text-[10px] font-bold text-white"
                     style={{ background: s.tagColor, letterSpacing:"0.05em" }}>
                  {s.tag}
                </div>}
                {s.comingSoon && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="px-4 py-1.5 rounded-full text-xs font-black text-white"
                         style={{ background:"rgba(0,0,0,0.6)", letterSpacing:"0.08em" }}>
                      COMING SOON
                    </div>
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="p-5">
                <h3 className="font-bold text-base mb-2" style={{ color:"#111111" }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color:"#555555" }}>{s.desc}</p>
              </div>

              {/* Bottom orange line on hover */}
              <div className="h-0.5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                   style={{ background: s.tagColor }}/>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/services"
            className="inline-flex items-center gap-2 px-7 py-3 rounded text-sm font-bold text-white transition-all"
            style={{ background:"var(--orange)" }}
            onMouseEnter={e=>(e.currentTarget.style.boxShadow="0 8px 28px rgba(249,115,22,0.35)")}
            onMouseLeave={e=>(e.currentTarget.style.boxShadow="")}>
            View All Services <ArrowRight size={15}/>
          </Link>
        </div>
      </div>
    </section>
  );
}
