import type { PageSection } from "@/components/admin/types";

// Built-in content for "/about" (see content/home.ts for how it's used).
// Card titles written "A — B" are split into two fields by the page
// (milestone year — title, person — role, MISSION — heading).
export const ABOUT_SECTIONS: PageSection[] = [
  { id:"default-about-0", type:"text", label:"Hero Carousel (5 rotating slides)", visible:true,
    heading:"Hero Carousel",
    body:"1. Coal Trading — \"Powering Industries Across India\" (1M+ Tonnes/Year, 50+ Cities Served)\n2. Port Operations — \"World-Class Port Logistics\" (6 Major Ports, 20+ Years Active)\n3. Sustainability — \"Building a Greener Energy Future\" (ISO Certified, ESG Compliant)\n4. Global Reach — \"Mine to Market Worldwide\" (6 Countries, 3 Continents)\n5. CSR Impact — \"Communities First, Always\" (5K+ Beneficiaries, 20+ CSR Projects)" },
  { id:"default-about-1", type:"cards", label:"Our Journey — Milestones", visible:true,
    cards:[
      { title:"2003 — Foundation",     desc:"Ambition Coal was established in Mumbai with a vision to transform India's coal supply chain. Starting with a small trading desk, we laid the groundwork for a nationally trusted energy company." },
      { title:"2008 — First Port",     desc:"Secured our first port operations contract at Paradip, Odisha — marking the beginning of deep integration into India's bulk cargo infrastructure and coastal logistics." },
      { title:"2013 — Pan India",      desc:"Pan India expansion achieved with operational presence across 50+ cities. Regional offices opened in Delhi, Kolkata, Chennai, and Hyderabad." },
      { title:"2018 — Global Reach",   desc:"Entered global coal trading with partnerships in Australia, Indonesia, and South Africa. International desk established. Company crossed 1 Million Tons annual delivery milestone." },
      { title:"2025+ — Future Vision", desc:"Transitioning into integrated energy solutions. Investing in cleaner coal technologies, solar logistics, and building India's next-generation energy supply chain." },
    ] },
  { id:"default-about-2", type:"cards", label:"Mission & Vision", visible:true,
    cards:[
      { title:"Mission — Why We Exist",     icon:"target",
        desc:"To supply an energy mix that is competitive, environment-friendly and adds value to customers — and hence become a trusted preferred supplier. Customer satisfaction is our sole motive." },
      { title:"Vision — Where We're Going", icon:"telescope",
        desc:"To earn the consistent trust of our customers by providing quality, quantity and service consistency in every aspect of coal supply — growing day by day as a one-stop coal solution." },
    ] },
  { id:"default-about-3", type:"cards", label:"Leadership Team", visible:true,
    cards:[
      { title:"Jayesh Mahesh Agrawal — Director & Promoter",
        desc:"With over two decades of experience in coal trading and bulk cargo logistics, Jayesh has steered Ambition Coal from a Mumbai trading desk to a pan-India energy powerhouse. His deep relationships with global mines and port operators underpin the company's sourcing strength." },
      { title:"Yashika Jayesh Agrawal — Director & Promoter",
        desc:"Yashika brings strategic clarity and operational discipline to Ambition Coal's growth. Focused on CSR, compliance, and sustainable business practices, she ensures the company's impact extends beyond commerce — powering communities alongside industries." },
    ] },
  { id:"default-about-4", type:"cards", label:"Why Choose Us", visible:true,
    cards:[
      { title:"Competitive Pricing",    icon:"badge-dollar", desc:"We keep prices as low as possible while maintaining the high quality our customers demand." },
      { title:"Global Sourcing",        icon:"globe",        desc:"Direct mine relationships in Indonesia, South Africa, Kenya & Zimbabwe for best-quality coal." },
      { title:"Quality Assurance",      icon:"flask",        desc:"Independent international testing institutes verify quality at every step — mine to mother vessel." },
      { title:"One Stop Coal Solution", icon:"layers",       desc:"From sourcing to stevedoring, road transport, unloading and stacking — we manage it all." },
      { title:"On-Time Delivery",       icon:"timer-reset",  desc:"We recognize the importance of delivery ahead of schedule. Customer satisfaction is our sole motive." },
      { title:"Ethical Business",       icon:"handshake",    desc:"We strictly follow ethical business principles and abide by existing laws and regulations." },
    ] },
  { id:"default-about-5", type:"stats", label:"Trust Stats", visible:true,
    stats:[
      { value:"20+", label:"Years in Business" },
      { value:"1M+", label:"Tonnes Delivered Annually" },
      { value:"50+", label:"Cities Served" },
      { value:"ISO", label:"Certified Operations" },
    ] },
];
