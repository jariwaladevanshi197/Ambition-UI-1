import type { PageSection } from "@/components/admin/types";

// Built-in content for "/": shown when Supabase can't be reached, and the
// source `scripts/sync_site_content.mjs` writes to the Pages editor.
// Pure data only — no runtime imports — so that script can import it too.
export const HOME_SECTIONS: PageSection[] = [
  {
    id: "default-home-0",
    type: "hero",
    label: "Hero Banner",
    visible: true,
    headline: "Powering Industries.\nConnecting the World.",
    subtext: "Building reliable coal supply and logistics solutions across India and global markets — trusted by power plants, steel mills and cement factories for over 15 years.",
    ctaText: "Explore Solutions",
    ctaLink: "/services",
    image: "/images/Gemini_Generated_Image_680jx7680jx7680j.png",
  },
  {
    id: "default-home-1",
    type: "stats",
    label: "Key Stats (By The Numbers)",
    visible: true,
    stats: [
      { value: "15+", label: "Years Experience" },
      { value: "10M+", label: "Tonnes Delivered" },
      { value: "50+", label: "Cities Served" },
      { value: "15+", label: "Indian Ports" },
    ],
  },
  {
    id: "default-home-2",
    type: "cards",
    label: "Services Preview",
    visible: true,
    cards: [
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
        desc: "Beyond coal — Manganese, Chrome, Silica and Zinc ore sourced from verified origins across Indonesia, South Africa, Zimbabwe and Mozambique, expanding into industrial chemicals.",
        image: "/images/minerals.jpg",
      },
    ],
  },
  {
    id: "default-home-3",
    type: "cards",
    label: "Sustainability Pillars",
    visible: true,
    headline: "Our *Commitment*",
    subtext: "Responsible towards our customers — in how we source, trade and supply.",
    cards: [
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
    ],
  },
  {
    id: "default-home-4",
    type: "cards",
    label: "CSR Preview",
    visible: true,
    headline: "Growing *Together*",
    cards: [
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
    ],
  },
];
