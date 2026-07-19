import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";

config({ path: new URL("../.env.local", import.meta.url) });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SECRET_KEY);

const sections = {
  "/": [
    { type:"hero", label:"Hero Banner", visible:true,
      headline:"Powering Industries.\nConnecting the World.",
      subtext:"Building sustainable energy and logistics solutions across India and global markets. Trusted by industries, driven by purpose.",
      ctaText:"Explore Solutions", ctaLink:"/services" },
    { type:"stats", label:"Key Stats (By The Numbers)", visible:true,
      stats:[{value:"20+",label:"Years Experience"},{value:"15+",label:"Ports Operated"},{value:"50+",label:"Cities Served"},{value:"1M+",label:"Tons Delivered"}] },
    { type:"cards", label:"Services Preview", visible:true,
      cards:[
        {title:"Coal Trading & Sourcing", desc:"End-to-end procurement of Steam Coal from Indonesia, South Africa and East Africa. Quality assured from mine to mother vessel."},
        {title:"Port Operations",         desc:"Stevedoring and bulk cargo handling at 15+ major Indian ports — Paradip, Haldia, Vizag and beyond."},
        {title:"International Trading",   desc:"Global sourcing partnerships in Australia, Indonesia, South Africa, Kenya and Zimbabwe."},
        {title:"Road Transportation",     desc:"Doorstep delivery network covering 50+ cities. Loading, unloading, packing and dispatch managed end-to-end."},
        {title:"Minerals Trading",        desc:"Manganese ore, Chrome ore and Silica ore sourced from major origins across Indonesia, South Africa and Zimbabwe."},
        {title:"Salt — Coming Soon",      desc:"Industrial Grade Salt and Edible Salt. A new vertical under Ambition — expanding beyond coal into essential commodities."},
      ] },
    { type:"cards", label:"Sustainability Pillars", visible:true,
      cards:[
        {title:"Responsible Mining",          desc:"Adopting best practices to minimise environmental impact across all extraction operations worldwide."},
        {title:"Environmental Commitment",    desc:"Zero-waste initiatives, reforestation programs, and clean water conservation partnerships."},
        {title:"Community Development",       desc:"Empowering local communities through education, healthcare, and economic inclusion programs."},
        {title:"Future Energy",               desc:"Investing in cleaner coal technologies and transitioning toward renewable energy solutions."},
        {title:"Women Empowerment",           desc:"Skill development and leadership programs for women in mining communities across India."},
        {title:"Circular Economy",            desc:"Recovering and reusing mine by-products to reduce waste across the supply chain."},
      ] },
    { type:"cards", label:"CSR Preview", visible:true,
      cards:[
        {title:"Adopted Schools",             desc:"24 schools · 8,500+ students"},
        {title:"Health Initiatives",          desc:"120+ medical camps annually"},
        {title:"Women Empowerment",           desc:"Skill development & leadership"},
        {title:"Environmental Programs",      desc:"50,000+ trees planted"},
      ] },
  ],

  "/services": [
    { type:"hero", label:"Services Hero", visible:true,
      headline:"Quality Trade.\nReliable Supply.",
      subtext:"From coal trading to port operations and minerals — Ambition delivers end-to-end energy and commodity solutions trusted by industries across India." },
    { type:"cards", label:"Services Grid", visible:true,
      cards:[
        {title:"Coal Trading & Sourcing",        desc:"Our core focus — sourcing and supplying Steam Coal from Indonesia, South Africa and East Africa. Independent international testing at every stage: mine, mother vessel and final delivery."},
        {title:"Stevedoring & Port Operations",   desc:"Loading and unloading of ships at 15+ major Indian ports — Paradip, Haldia, Vizag and beyond."},
        {title:"International Trading",           desc:"Global sourcing partnerships in Australia, Indonesia, South Africa, Kenya and Zimbabwe."},
        {title:"Road Transportation",             desc:"Doorstep delivery covering 50+ cities. Loading, unloading and packing available on request."},
        {title:"Unloading & Stacking",            desc:"Loading and unloading from railway rakes and motor vehicles. Coal stacking using state-of-the-art equipment to prevent oxidation."},
        {title:"Minerals Trading",                desc:"Beyond coal — Manganese ore, Chrome ore and Silica ore sourced from major origins including Indonesia, South Africa, Kenya and Zimbabwe."},
      ] },
    { type:"cards", label:"Coal Products", visible:true,
      cards:[
        {title:"Steam Coal — Indonesia",         desc:"GCV: 5500–6500 kcal/kg · Ash: 10–18% · Moisture: 8–12%. Use: Power plants, cement, steel, textile & paper mills."},
        {title:"Steam Coal — South Africa",      desc:"GCV: 5800–6200 kcal/kg · Ash: 12–16% · Moisture: 8–11%. Use: Power utilities, West & East coast India."},
        {title:"Steam Coal — Kenya / Zimbabwe",  desc:"GCV: 5000–6000 kcal/kg · Ash: 14–20% · Moisture: 9–13%. Use: Industrial boilers, captive power plants."},
        {title:"Coking Coal",                    desc:"GCV: 6000–7500 kcal/kg · Ash: 8–12% · Moisture: 8–10%. Use: Steel & metallurgy customers across India."},
      ] },
    { type:"cards", label:"Port Operations", visible:true,
      cards:[
        {title:"Bulk Vessel Unloading",  desc:"High-capacity unloading of bulk carriers at major Indian ports with modern grabs and conveyor systems."},
        {title:"Internal Shifting",      desc:"Efficient movement of cargo within port premises between berths, yards and storage zones."},
        {title:"Stacking",               desc:"Systematic stacking of coal and minerals to optimise yard space and preserve material quality."},
        {title:"Heaping",                desc:"Controlled heaping operations that guard against oxidation and moisture ingress in stored cargo."},
        {title:"Dispatch by Road",       desc:"Doorstep dispatch via our road transport network covering 50+ cities across India."},
        {title:"Dispatch by Rail",       desc:"Bulk dispatch via railway rakes for long-distance, high-volume cargo movement."},
      ] },
    { type:"cards", label:"Minerals (sourced from Zimbabwe, Kenya, Mozambique)", visible:true,
      cards:[
        {title:"Manganese Ore", desc:"High-grade manganese ore for steel and ferro-alloy manufacturing. Mn: 38–48%, Lumpy/Fines, Bulk/Packed."},
        {title:"Silica Ore",    desc:"Premium silica ore for glass, ceramics and foundry industries. SiO2: 95–99%, Lumpy/Fines, Bulk/Packed."},
        {title:"Zinc Ore",      desc:"Quality zinc ore concentrate for smelting and industrial applications. Zn: 40–55%, Concentrate, Bulk/Packed."},
      ] },
    { type:"cards", label:"Salt Products", visible:true,
      cards:[
        {title:"Industrial Grade Salt",       desc:"High-purity sodium chloride for chemical processing, water treatment, oil & gas. NaCl: 98–99.5%, Moisture: <0.5%. Available now."},
        {title:"Edible Salt (Coming Soon)",   desc:"Food-grade iodised and non-iodised salt for FMCG, food processing and consumer retail under a dedicated brand."},
      ] },
  ],

  "/about": [
    { type:"text", label:"Hero Carousel (5 rotating slides)", visible:true,
      heading:"Hero Carousel",
      body:"1. Coal Trading — \"Powering Industries Across India\" (1M+ Tonnes/Year, 50+ Cities Served)\n2. Port Operations — \"World-Class Port Logistics\" (6 Major Ports, 20+ Years Active)\n3. Sustainability — \"Building a Greener Energy Future\" (ISO Certified, ESG Compliant)\n4. Global Reach — \"Mine to Market Worldwide\" (6 Countries, 3 Continents)\n5. CSR Impact — \"Communities First, Always\" (5K+ Beneficiaries, 20+ CSR Projects)" },
    { type:"cards", label:"Our Journey — Milestones", visible:true,
      cards:[
        {title:"2003 — Foundation",     desc:"Ambition Coal was established in Mumbai with a vision to transform India's coal supply chain."},
        {title:"2008 — First Port",     desc:"Secured our first port operations contract at Paradip, Odisha."},
        {title:"2013 — Pan India",      desc:"Pan India expansion achieved with operational presence across 50+ cities."},
        {title:"2018 — Global Reach",   desc:"Entered global coal trading with partnerships in Australia, Indonesia, and South Africa. Crossed 1M Tons annual delivery."},
        {title:"2025+ — Future Vision", desc:"Transitioning into integrated energy solutions, cleaner coal technologies and solar logistics."},
      ] },
    { type:"cards", label:"Mission & Vision", visible:true,
      cards:[
        {title:"Mission — Why We Exist",        desc:"To supply an energy mix that is competitive, environment-friendly and adds value to customers — and hence become a trusted preferred supplier."},
        {title:"Vision — Where We're Going",    desc:"To earn the consistent trust of our customers by providing quality, quantity and service consistency — growing day by day as a one-stop coal solution."},
      ] },
    { type:"cards", label:"Leadership Team", visible:true,
      cards:[
        {title:"Jayesh Mahesh Agrawal — Director & Promoter",  desc:"Two decades of experience in coal trading and bulk cargo logistics. Deep relationships with global mines and port operators."},
        {title:"Yashika Jayesh Agrawal — Director & Promoter", desc:"Strategic clarity and operational discipline. Focused on CSR, compliance, and sustainable business practices."},
      ] },
    { type:"cards", label:"Why Choose Us", visible:true,
      cards:[
        {title:"Competitive Pricing",        desc:"We keep prices as low as possible while maintaining the high quality our customers demand."},
        {title:"Global Sourcing",            desc:"Direct mine relationships in Indonesia, South Africa, Kenya & Zimbabwe for best-quality coal."},
        {title:"Quality Assurance",          desc:"Independent international testing institutes verify quality at every step."},
        {title:"One Stop Coal Solution",     desc:"From sourcing to stevedoring, road transport, unloading and stacking — we manage it all."},
        {title:"On-Time Delivery",           desc:"We recognize the importance of delivery ahead of schedule."},
        {title:"Ethical Business",           desc:"We strictly follow ethical business principles and abide by existing laws and regulations."},
      ] },
    { type:"stats", label:"Trust Stats", visible:true,
      stats:[{value:"20+",label:"Years in Business"},{value:"1M+",label:"Tonnes Delivered Annually"},{value:"50+",label:"Cities Served"},{value:"ISO",label:"Certified Operations"}] },
  ],
};

async function main() {
  const { data: pages } = await supabase.from("pages").select("id, slug");
  const idBySlug = Object.fromEntries(pages.map(p => [p.slug, p.id]));

  for (const [slug, secs] of Object.entries(sections)) {
    const pageId = idBySlug[slug];
    if (!pageId) { console.log(`skip ${slug}: no page row`); continue; }
    await supabase.from("page_sections").delete().eq("page_id", pageId);
    const rows = secs.map(({ ctaText, ctaLink, headline, ...s }, i) => ({
      page_id: pageId, position: i, stats: [], cards: [], gallery: [],
      headline: headline ?? null, cta_text: ctaText ?? null, cta_link: ctaLink ?? null,
      ...s,
    }));
    const { error } = await supabase.from("page_sections").insert(rows);
    console.log(`${slug}:`, error ? error.message : `ok (${rows.length} sections)`);
  }
  console.log("Done.");
}

main();
