import type { PageSection } from "@/components/admin/types";

// Built-in content for "/services" (see content/home.ts for how it's used).
// The three product sections are text sections: their heading and intro are
// edited here, the product cards themselves come from the Products screen.
export const SERVICES_SECTIONS: PageSection[] = [
  { id:"default-services-0", type:"hero", label:"Services Hero", visible:true,
    headline:"Quality Trade.\nReliable Supply.",
    subtext:"From coal trading and port operations to minerals and chemicals — Ambition delivers end-to-end energy and commodity solutions trusted by plants and factories across India.",
    image:"/images/vessel_heilan_cruiser.jpg" },
  { id:"default-services-1", type:"cards", label:"Services Grid", visible:true,
    cards:[
      { title:"Coal Trading & Sourcing",       desc:"Our core focus — sourcing and supplying Steam Coal, Non-Coking Coal and Coking Coal from Indonesia, South Africa and East Africa. Quality assured from mines to plants, tailored to boiler specifications.", image:"/images/coal_specimen_grade.jpg" },
      { title:"Stevedoring & Port Operations", desc:"Loading and unloading of bulk vessels at 15+ major Indian ports — Mumbai, Kandla, Mangalore, Tuticorin, Kochi, Vizag, Paradip, Hazira, and Pipavav with rapid turnaround.", image:"/images/vessel_heilan_cruiser.jpg" },
      { title:"International Trading",         desc:"Direct sourcing partnerships across Asian and African markets — Indonesia, South Africa, Kenya, Zimbabwe, Dubai, and Singapore. Extensive physical trading positions.", image:"/images/shipping.jpg" },
      { title:"Road Transportation",           desc:"Doorstep delivery covering 50+ cities. Our experienced logistics network ensures proper quality and quantity dispatch, with loading, unloading and packing on request.", image:"/images/Gemini_Generated_Image_maelcimaelcimael.png" },
      { title:"Yard & Stocking Operations",    desc:"Loading and unloading from railway rakes and motor vehicles. Storage units with weighing machinery, coal stacking and heaping to prevent oxidation and moisture ingress.", image:"/images/operations_collage.jpg" },
      { title:"Minerals & Chemicals Trading",  desc:"Beyond coal — Manganese ore, Chrome ore, Silica ore and industrial chemicals sourced from verified origins across Asia and Africa.", image:"/images/minerals.jpg" },
    ] },
  { id:"default-services-2", type:"text", label:"Coal Products", visible:true,
    heading:"Quality Assurance: From Mines to Plants & Factories",
    body:"Supplying coal strictly according to customer boiler specifications and plant quality requirements. Quotations provided on request." },
  { id:"default-services-3", type:"cards", label:"Port Operations", visible:true,
    cards:[
      { title:"Bulk Vessel Unloading", desc:"High-capacity unloading of bulk carriers at 15+ Indian ports with modern grabs, cranes, and conveyor systems.", icon:"ship" },
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
