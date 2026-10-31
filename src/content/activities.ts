import type { PageSection } from "@/components/admin/types";

// Built-in content for "/activities" (see content/home.ts for how it's used).
export const ACTIVITIES_SECTIONS: PageSection[] = [
  { id:"default-activities-0", type:"hero", label:"Activities Hero", visible:true,
    headline:"Our *Activities*",
    subtext:"From bulk vessel unloading to nationwide dispatch — here's how we keep India's coal, minerals and salt supply moving." },
  { id:"default-activities-1", type:"stats", label:"Hero Stats", visible:true,
    stats:[
      { value:"20+", label:"Years Experience" },
      { value:"15+", label:"Ports Operated" },
      { value:"50+", label:"Cities Served" },
      { value:"1M+", label:"Tons Delivered" },
    ] },
  { id:"default-activities-2", type:"cards", label:"Core Operations", visible:true,
    cards:[
      { title:"Bulk Vessel Unloading",       icon:"ship",        desc:"High-capacity unloading of bulk carriers at 15+ major Indian ports including Paradip, Haldia and Vizag." },
      { title:"Stacking & Heaping",          icon:"layers",      desc:"Systematic stacking and heaping of coal and minerals to prevent oxidation and preserve material quality." },
      { title:"Internal Shifting",           icon:"arrow-shift", desc:"Efficient movement of cargo within port premises between berths, yards and storage zones." },
      { title:"International Coal Sourcing", icon:"globe",       desc:"Direct sourcing partnerships across Indonesia, South Africa, Kenya and Zimbabwe with independent quality testing." },
      { title:"Quality Assurance Testing",   icon:"flask",       desc:"Independent international testing at mine, mother vessel and final delivery — for every shipment, every time." },
      { title:"Salt Trading",                icon:"boxes",       desc:"Industrial Grade Salt available now, with a dedicated Edible Salt brand launching soon." },
      { title:"Road Dispatch",               icon:"truck",       desc:"Doorstep delivery covering 50+ cities through our dedicated road transport network." },
      { title:"Rail Dispatch",               icon:"train",       desc:"Bulk cargo movement via railway rakes for long-distance, high-volume delivery." },
      { title:"Minerals Sourcing",           icon:"pickaxe",     desc:"Manganese, Silica and Zinc ore sourced from Zimbabwe, Kenya and Mozambique." },
    ] },
  { id:"default-activities-3", type:"gallery", label:"Photo Gallery", visible:true,
    gallery:[
      { src:"/images/Gemini_Generated_Image_680jx7680jx7680j.png", label:"Open Pit Mining" },
      { src:"/images/Gemini_Generated_Image_9jp8wd9jp8wd9jp8.png", label:"Coal Processing" },
      { src:"/images/port.jpg",                                    label:"Port Operations" },
      { src:"/images/Gemini_Generated_Image_y1eikuy1eikuy1ei.png", label:"Mining Operations" },
      { src:"/images/shipping.jpg",                                label:"Shipping & Export" },
      { src:"/images/Gemini_Generated_Image_maelcimaelcimael.png", label:"Coal Transport" },
      { src:"/images/Gemini_Generated_Image_urm0uqurm0uqurm0.png", label:"Coal Yard" },
      { src:"/images/Gemini_Generated_Image_imewt4imewt4imew.png", label:"Mineral Processing" },
      { src:"/images/Gemini_Generated_Image_6wi0526wi0526wi0.png", label:"Bulk Cargo Handling" },
    ] },
];
