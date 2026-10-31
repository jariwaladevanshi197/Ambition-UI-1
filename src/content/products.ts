import type { Product } from "@/components/admin/types";

// Built-in product catalogue for the Services page: shown when Supabase can't
// be reached, and what `scripts/sync_site_content.mjs` seeds into Products.
// Coal specs written as "Label: value" render as the GCV / Ash / Moisture grid.
type DefaultProduct = Omit<Product, "id">;

export const DEFAULT_PRODUCTS: DefaultProduct[] = [
  { name:"Steam Coal — Indonesia", category:"Coal", type:"Imported", description:"",
    image:"/images/Gemini_Generated_Image_6wi0526wi0526wi0.png",
    specs:["GCV: 5500–6500 kcal/kg", "Ash: 10–18%", "Moisture: 8–12%"],
    applications:"Power plants, cement, steel, textile & paper mills", featured:true, comingSoon:false },
  { name:"Steam Coal — South Africa", category:"Coal", type:"Imported", description:"",
    image:"/images/Gemini_Generated_Image_imewt4imewt4imew.png",
    specs:["GCV: 5800–6200 kcal/kg", "Ash: 12–16%", "Moisture: 8–11%"],
    applications:"Power utilities, West & East coast India", featured:true, comingSoon:false },
  { name:"Steam Coal — Kenya / Zimbabwe", category:"Coal", type:"Imported", description:"",
    image:"/images/Gemini_Generated_Image_maelcimaelcimael.png",
    specs:["GCV: 5000–6000 kcal/kg", "Ash: 14–20%", "Moisture: 9–13%"],
    applications:"Industrial boilers, captive power plants", featured:false, comingSoon:false },
  { name:"Coking Coal", category:"Coal", type:"Coking", description:"",
    image:"/images/Gemini_Generated_Image_urm0uqurm0uqurm0.png",
    specs:["GCV: 6000–7500 kcal/kg", "Ash: 8–12%", "Moisture: 8–10%"],
    applications:"Steel & metallurgy customers across India", featured:false, comingSoon:false },

  { name:"Manganese Ore", category:"Minerals", type:"Manganese Ore", image:"/images/minerals.jpg",
    description:"High-grade manganese ore for steel and ferro-alloy manufacturing.",
    specs:["Mn: 38–48%", "Lumpy / Fines", "Bulk / Packed"], applications:"", featured:false, comingSoon:false },
  { name:"Silica Ore", category:"Minerals", type:"Silica Ore", image:"/images/minerals.jpg",
    description:"Premium silica ore for glass, ceramics and foundry industries.",
    specs:["SiO2: 95–99%", "Lumpy / Fines", "Bulk / Packed"], applications:"", featured:false, comingSoon:false },
  { name:"Zinc Ore", category:"Minerals", type:"Zinc Ore", image:"/images/minerals.jpg",
    description:"Quality zinc ore concentrate for smelting and industrial applications.",
    specs:["Zn: 40–55%", "Concentrate", "Bulk / Packed"], applications:"", featured:false, comingSoon:false },

  { name:"Industrial Grade Salt", category:"Salt", type:"Industrial Grade", image:"/images/Gemini_Generated_Image_kt7gkdkt7gkdkt7gb.png",
    description:"High-purity sodium chloride for chemical processing, water treatment, oil & gas, and industrial manufacturing.",
    specs:["NaCl: 98–99.5%", "Moisture: <0.5%", "Bulk / Packed"], applications:"", featured:false, comingSoon:false },
  { name:"Edible Salt", category:"Salt", type:"Edible", image:"/images/Gemini_Generated_Image_kt7gkdkt7gkdkt7gd.png",
    description:"Food-grade iodised and non-iodised salt for FMCG, food processing and consumer retail under a dedicated brand.",
    specs:["Food Grade", "Iodised / Plain", "Branded Packs"], applications:"", featured:false, comingSoon:true },
];
