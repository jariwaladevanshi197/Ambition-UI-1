import type { Activity, PageSection } from "@/components/admin/types";

// Built-in content for "/csr" (see content/home.ts for how it's used).
// "Recent Initiatives" is a text section for its heading; the initiative
// cards come from the Activities screen (DEFAULT_INITIATIVES below).
export const CSR_SECTIONS: PageSection[] = [
  { id:"default-csr-0", type:"hero", label:"CSR Hero", visible:true,
    headline:"Creating Impact\nBeyond Business.",
    subtext:"Our commitment to community, education, environment and healthcare shapes every decision we make." },
  { id:"default-csr-1", type:"stats", label:"Impact at a Glance", visible:true,
    stats:[
      { value:"5",       label:"CSR Project Types" },
      { value:"20+",     label:"Active Projects" },
      { value:"5,000+",  label:"Beneficiaries" },
      { value:"50,000+", label:"Trees Planted" },
    ] },
  { id:"default-csr-2", type:"cards", label:"CSR Projects", visible:true,
    cards:[
      { title:"School Adoption Program", icon:"book-open", image:"/images/Gemini_Generated_Image_9jp8wd9jp8wd9jp8.png",
        desc:"Adopted 4 government schools across Jharkhand, Maharashtra, Chhattisgarh and Andhra Pradesh. Provided infrastructure upgrades, libraries, computer labs and mid-day meal support." },
      { title:"Community Healthcare Initiative", icon:"heart-pulse", image:"/images/Gemini_Generated_Image_y1eikuy1eikuy1ei.png",
        desc:"Monthly free medical camps in tribal and mining-adjacent communities. Over 1,200 patients served per year with doctors from partner hospitals." },
      { title:"Clean Water Access", icon:"droplets", image:"/images/port.jpg",
        desc:"Installed bore-wells and water purification units in 6 villages around our operational areas. Over 3,000 villagers now have clean drinking water." },
      { title:"Women Skill Development", icon:"graduation-cap", image:"/images/Gemini_Generated_Image_6wi0526wi0526wi0.png",
        desc:"Skill development workshops in weaving, tailoring, digital literacy and self-help group formation — including a 120-strong cohort trained in March 2024. 180 women trained to date and linked to livelihood opportunities." },
      { title:"Green India Drive", icon:"leaf", image:"/images/shipping.jpg",
        desc:"Annual plantation drives, e-waste collection and ESG-aligned operational practices. 50,000+ trees planted since 2015 across 5 states." },
    ] },
  { id:"default-csr-3", type:"text", label:"Recent Initiatives", visible:true,
    heading:"Recent *Initiatives*", body:"" },
  { id:"default-csr-4", type:"gallery", label:"CSR Photo Gallery", visible:true, gallery:[] },
  { id:"default-csr-5", type:"cta", label:"Partner CTA", visible:true,
    ctaHeading:"Want to Partner with Us?",
    ctaBody:"We welcome NGOs, government bodies, and corporations to collaborate on CSR initiatives across India.",
    ctaBtn:"Get in Touch" },
];

type DefaultInitiative = Omit<Activity, "id">;

// Icon keys come from INITIATIVE_ICONS in components/admin/iconRegistry.tsx.
export const DEFAULT_INITIATIVES: DefaultInitiative[] = [
  { title:"Annual Plantation Drive",          category:"Environment",        date:"2024-06-01", emoji:"trees",       highlight:"2,000", highlightLabel:"Saplings Planted", featured:true,  published:true,
    description:"Planted 2,000 saplings across 5 locations in Jharkhand with community volunteers." },
  { title:"Free Medical Camp — Dhanbad",      category:"Healthcare",         date:"2024-05-01", emoji:"heart-pulse", highlight:"800+",  highlightLabel:"Beneficiaries",    featured:false, published:true,
    description:"Free health check-ups for 800+ villagers. Doctors from 3 hospitals participated." },
  { title:"School Supply Distribution",       category:"Education",          date:"2024-04-01", emoji:"book-open",   highlight:"450",   highlightLabel:"Students",         featured:true,  published:true,
    description:"Distributed stationery kits to 450 students across 3 of our adopted schools." },
  { title:"Women Skill Development Workshop", category:"Women Empowerment",  date:"2024-03-01", emoji:"users",       highlight:"120",   highlightLabel:"Women Trained",    featured:false, published:true,
    description:"2-day workshop on weaving, tailoring and digital literacy for 120 women — part of 180+ trained across all workshops to date." },
  { title:"E-Waste Collection Drive",         category:"Environment",        date:"2024-02-01", emoji:"recycle",     highlight:"1.2T",  highlightLabel:"E-Waste Disposed", featured:false, published:true,
    description:"Collected and responsibly disposed of 1.2 tonnes of electronic waste from our offices." },
  { title:"Village Infrastructure Support",   category:"Water & Sanitation", date:"2024-01-01", emoji:"droplets",    highlight:"5",     highlightLabel:"Villages Helped",  featured:false, published:true,
    description:"Funded repair of 3 community halls and 2 bore-well installations in rural Chhattisgarh." },
  { title:"Children Art & Science Festival",  category:"Education",          date:"2023-12-01", emoji:"palette",     highlight:"600",   highlightLabel:"Students",         featured:false, published:true,
    description:"Organised inter-school festival for 600 students. Prizes and scholarships awarded." },
  { title:"Medicine Distribution Drive",      category:"Healthcare",         date:"2023-11-01", emoji:"pill",        highlight:"12",    highlightLabel:"PHCs Served",      featured:false, published:true,
    description:"Distributed essential medicines worth ₹4 lakh to 12 primary health centres." },
  { title:"Sapling Distribution — Diwali",    category:"Environment",        date:"2023-10-01", emoji:"leaf",        highlight:"5,000", highlightLabel:"Saplings",         featured:false, published:true,
    description:"Distributed 5,000 saplings across employees, schools and partner organisations." },
];
