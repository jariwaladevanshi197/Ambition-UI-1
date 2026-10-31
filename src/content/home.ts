import type { PageSection } from "@/components/admin/types";

// Built-in content for "/": shown when Supabase can't be reached, and the
// source `scripts/sync_site_content.mjs` writes to the Pages editor.
// Pure data only — no runtime imports — so that script can import it too.
export const HOME_SECTIONS: PageSection[] = [
  { id:"default-home-0", type:"hero", label:"Hero Banner", visible:true,
    headline:"Powering Industries.\nConnecting the World.",
    subtext:"Building sustainable energy and logistics solutions across India and global markets. Trusted by industries, driven by purpose.",
    ctaText:"Explore Solutions", ctaLink:"/services",
    image:"/images/Gemini_Generated_Image_680jx7680jx7680j.png" },
  { id:"default-home-1", type:"stats", label:"Key Stats (By The Numbers)", visible:true,
    stats:[
      { value:"20+", label:"Years Experience" },
      { value:"15+", label:"Ports Operated" },
      { value:"50+", label:"Cities Served" },
      { value:"1M+", label:"Tons Delivered" },
    ] },
  { id:"default-home-2", type:"cards", label:"Services Preview", visible:true,
    cards:[
      { title:"Coal Trading & Sourcing", desc:"End-to-end procurement of Steam Coal from Indonesia, South Africa and East Africa. Quality assured from mine to mother vessel.", image:"/images/Gemini_Generated_Image_680jx7680jx7680j.png" },
      { title:"Port Operations",         desc:"Stevedoring and bulk cargo handling at 15+ major Indian ports — Paradip, Haldia, Vizag and beyond.", image:"/images/port.jpg" },
      { title:"International Trading",   desc:"Global sourcing partnerships in Australia, Indonesia, South Africa, Kenya and Zimbabwe.", image:"/images/shipping.jpg" },
      { title:"Road Transportation",     desc:"Doorstep delivery network covering 50+ cities. Loading, unloading, packing and dispatch managed end-to-end.", image:"/images/Gemini_Generated_Image_maelcimaelcimael.png" },
      { title:"Minerals Trading",        desc:"Manganese ore, Chrome ore and Silica ore sourced from major origins across Indonesia, South Africa and Zimbabwe.", image:"/images/Gemini_Generated_Image_imewt4imewt4imew.png" },
      { title:"Salt — Coming Soon",      desc:"Industrial Grade Salt and Edible Salt. A new vertical under Ambition — expanding beyond coal into essential commodities.", image:"/images/Gemini_Generated_Image_kt7gkdkt7gkdkt7gb.png" },
    ] },
  { id:"default-home-3", type:"cards", label:"Sustainability Pillars", visible:true,
    cards:[
      { title:"Responsible Mining",       desc:"Adopting best practices to minimise environmental impact across all extraction operations worldwide.", icon:"pickaxe" },
      { title:"Environmental Commitment", desc:"Zero-waste initiatives, reforestation programs, and clean water conservation partnerships.", icon:"droplets" },
      { title:"Community Development",    desc:"Empowering local communities through education, healthcare, and economic inclusion programs.", icon:"handshake" },
      { title:"Future Energy",            desc:"Investing in cleaner coal technologies and transitioning toward renewable energy solutions.", icon:"zap" },
      { title:"Women Empowerment",        desc:"Skill development and leadership programs for women in mining communities across India.", icon:"graduation-cap" },
      { title:"Circular Economy",         desc:"Recovering and reusing mine by-products to reduce waste across the supply chain.", icon:"recycle" },
    ] },
  { id:"default-home-4", type:"cards", label:"CSR Preview", visible:true,
    cards:[
      { title:"Adopted Schools",        desc:"24 schools · 8,500+ students", icon:"graduation-cap" },
      { title:"Health Initiatives",     desc:"120+ medical camps annually", icon:"heart-pulse" },
      { title:"Women Empowerment",      desc:"Skill development & leadership", icon:"users" },
      { title:"Environmental Programs", desc:"50,000+ trees planted", icon:"leaf" },
    ] },
];
