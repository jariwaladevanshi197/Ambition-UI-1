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
      { title:"International Coal Sourcing", icon:"globe",       desc:"Direct sourcing partnerships across Asian and African markets including Indonesia, South Africa, Kenya and Zimbabwe with rigorous origin verification." },
      { title:"Quality Assurance: Mines to Plants", icon:"shield", desc:"Rigorous quality assurance from mine concessions and vessel discharge to plant boiler delivery — custom graded for every facility." },
      { title:"Salt Trading",                icon:"boxes",       desc:"Industrial Grade Salt available now, with a dedicated Edible Salt brand launching soon." },
      { title:"Road Dispatch",               icon:"truck",       desc:"Doorstep delivery covering 50+ cities through our dedicated road transport network." },
      { title:"Rail Dispatch",               icon:"train",       desc:"Bulk cargo movement via railway rakes for long-distance, high-volume delivery." },
      { title:"Minerals Sourcing",           icon:"pickaxe",     desc:"Manganese, Silica and Zinc ore sourced from Zimbabwe, Kenya and Mozambique." },
    ] },
  { id:"default-activities-3", type:"gallery", label:"Photo Gallery", visible:true,
    gallery:[
      { src:"/images/coal_specimen_grade.jpg",                     label:"High-Grade Coal Specimen" },
      { src:"/images/vessel_heilan_cruiser.jpg",                   label:"Bulk Carrier Heilan Cruiser" },
      { src:"/images/operations_collage.jpg",                      label:"Port Handling & Stockpiling" },
      { src:"/images/Gemini_Generated_Image_680jx7680jx7680j.png", label:"Open Pit Mining" },
      { src:"/images/port.jpg",                                    label:"Port Operations" },
      { src:"/images/shipping.jpg",                                label:"Shipping & Export" },
      { src:"/images/Gemini_Generated_Image_maelcimaelcimael.png", label:"Coal Transport" },
      { src:"/images/Gemini_Generated_Image_urm0uqurm0uqurm0.png", label:"Coal Yard" },
      { src:"/images/Gemini_Generated_Image_imewt4imewt4imew.png", label:"Mineral Processing" },
    ] },
];
