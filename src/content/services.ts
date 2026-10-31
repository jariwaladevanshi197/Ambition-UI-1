import type { PageSection } from "@/components/admin/types";

// Built-in content for "/services" (see content/home.ts for how it's used).
// The three product sections are text sections: their heading and intro are
// edited here, the product cards themselves come from the Products screen.
export const SERVICES_SECTIONS: PageSection[] = [
  { id:"default-services-0", type:"hero", label:"Services Hero", visible:true,
    headline:"Quality Trade.\nReliable Supply.",
    subtext:"From coal trading to port operations and minerals — Ambition delivers end-to-end energy and commodity solutions trusted by industries across India.",
    image:"/images/Gemini_Generated_Image_9jp8wd9jp8wd9jp8.png" },
  { id:"default-services-1", type:"cards", label:"Services Grid", visible:true,
    cards:[
      { title:"Coal Trading & Sourcing",       desc:"Our core focus — sourcing and supplying Steam Coal from Indonesia, South Africa and East Africa. Independent international testing at every stage: mine, mother vessel and final delivery. Competitive pricing with quality you can rely on.", image:"/images/Gemini_Generated_Image_680jx7680jx7680j.png" },
      { title:"Stevedoring & Port Operations", desc:"Loading and unloading of ships at 15+ major Indian ports — Paradip, Haldia, Vizag and beyond. Expert personnel and modern equipment handle break bulk to containers with rapid turnaround.", image:"/images/port.jpg" },
      { title:"International Trading",         desc:"Global sourcing partnerships in Australia, Indonesia, South Africa, Kenya and Zimbabwe. Extensive physical trading positions across all major origins.", image:"/images/shipping.jpg" },
      { title:"Road Transportation",           desc:"Doorstep delivery covering 50+ cities. Our experienced network ensures proper quality and quantity dispatch, with loading, unloading and packing available on request.", image:"/images/Gemini_Generated_Image_maelcimaelcimael.png" },
      { title:"Unloading & Stacking",          desc:"Loading and unloading from railway rakes and motor vehicles. Storage units with special platforms, weighing and machinery. Coal stacking using state-of-the-art equipment to prevent oxidation and moisture increase.", image:"/images/mining.jpg" },
      { title:"Minerals Trading",              desc:"Beyond coal — Manganese ore, Chrome ore and Silica ore sourced from major origins including Indonesia, South Africa, Kenya and Zimbabwe.", image:"/images/Gemini_Generated_Image_imewt4imewt4imew.png" },
    ] },
  { id:"default-services-2", type:"text", label:"Coal Products", visible:true,
    heading:"Quality Coal.\nReliable Supply.", body:"" },
  { id:"default-services-3", type:"cards", label:"Port Operations", visible:true,
    cards:[
      { title:"Bulk Vessel Unloading", desc:"High-capacity unloading of bulk carriers at major Indian ports with modern grabs and conveyor systems.", icon:"ship" },
      { title:"Internal Shifting",     desc:"Efficient movement of cargo within port premises between berths, yards and storage zones.", icon:"arrow-shift" },
      { title:"Stacking",              desc:"Systematic stacking of coal and minerals to optimise yard space and preserve material quality.", icon:"layers" },
      { title:"Heaping",               desc:"Controlled heaping operations that guard against oxidation and moisture ingress in stored cargo.", icon:"boxes" },
      { title:"Dispatch by Road",      desc:"Doorstep dispatch via our road transport network covering 50+ cities across India.", icon:"truck" },
      { title:"Dispatch by Rail",      desc:"Bulk dispatch via railway rakes for long-distance, high-volume cargo movement.", icon:"train" },
    ] },
  { id:"default-services-4", type:"text", label:"Minerals (sourced from Zimbabwe, Kenya, Mozambique)", visible:true,
    heading:"Minerals *Trading*",
    body:"Manganese, Silica and Zinc ore sourced from trusted origins across Africa." },
  { id:"default-services-5", type:"text", label:"Salt Products", visible:true,
    heading:"Salt Products",
    body:"Ambition is expanding into essential commodities. Industrial Grade Salt is now available, with a dedicated Edible Salt brand launching soon under the Ambition umbrella." },
];
