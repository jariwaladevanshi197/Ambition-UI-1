"use client";
import { useState, useEffect } from "react";
import type { Activity, School, Product, Message, PageContent, MediaFile, CompanySettings } from "./types";

const DEFAULT_ACTIVITIES: Activity[] = [
  { id:"a1", title:"Plantation Drive — June 2024", description:"Community plantation drive across 5 locations in Jharkhand, planting 2000 saplings.", category:"Environment", date:"2024-06-15", featured:true,  published:true,  emoji:"🌳" },
  { id:"a2", title:"Free Medical Camp — Dhanbad",   description:"Free health check-up camp serving 800+ villagers with doctors from 3 hospitals.", category:"Healthcare",   date:"2024-05-10", featured:false, published:true,  emoji:"🏥" },
  { id:"a3", title:"School Supply Distribution",    description:"Distribution of stationery kits to 450 students across 3 adopted schools.",     category:"Education",    date:"2024-04-22", featured:true,  published:true,  emoji:"📚" },
  { id:"a4", title:"Women Skill Workshop",           description:"2-day skill development workshop for 120 women in weaving and handicrafts.",      category:"Community",    date:"2024-03-08", featured:false, published:false, emoji:"👩" },
];

const DEFAULT_SCHOOLS: School[] = [
  { id:"s1", name:"Govt. Primary School, Dhanbad",    projectType:"School",             location:"Dhanbad",       state:"Jharkhand",     beneficiaries:450,  description:"Adopted in 2018. Infrastructure upgraded, library built.",            status:"Active", emoji:"🏫" },
  { id:"s2", name:"Zilla Parishad School, Nagpur",    projectType:"School",             location:"Nagpur",        state:"Maharashtra",   beneficiaries:320,  description:"Adopted in 2020. Mid-day meal program & digital classroom.",           status:"Active", emoji:"🏫" },
  { id:"s3", name:"Free Medical Camp, Korba",         projectType:"Healthcare",         location:"Korba",         state:"Chhattisgarh",  beneficiaries:1200, description:"Monthly health check-up camp. Doctors from 3 hospitals.",             status:"Active", emoji:"🏥" },
  { id:"s4", name:"Women Skill Centre, Visakhapatnam",projectType:"Women Empowerment",  location:"Visakhapatnam", state:"Andhra Pradesh",beneficiaries:180,  description:"Skill development in weaving, tailoring, and digital literacy.",       status:"Active", emoji:"👩" },
  { id:"s5", name:"Clean Water Project, Dhanbad",     projectType:"Water & Sanitation", location:"Dhanbad",       state:"Jharkhand",     beneficiaries:3000, description:"Installed 12 borewells and 4 water purification units in villages.",    status:"Active", emoji:"💧" },
];

const DEFAULT_PRODUCTS: Product[] = [
  { id:"p1", name:"Thermal Coal (Domestic)", type:"Thermal",     gcv:"3800–5500 kcal/kg", ash:"26–38%", moisture:"8–14%",  applications:"Power plants, captive power",      featured:true  },
  { id:"p2", name:"Imported Thermal Coal",   type:"Imported",    gcv:"5500–6500 kcal/kg", ash:"10–18%", moisture:"8–12%",  applications:"Large power & steel plants",        featured:true  },
  { id:"p3", name:"Coking Coal",             type:"Coking",      gcv:"6000–7500 kcal/kg", ash:"8–12%",  moisture:"8–10%",  applications:"Steel & metallurgy",                featured:false },
  { id:"p4", name:"Petcoke / Blends",        type:"Petcoke",     gcv:"7500–8500 kcal/kg", ash:"<1%",    moisture:"5–8%",   applications:"Cement, lime, glass",               featured:false },
];

const DEFAULT_MESSAGES: Message[] = [
  { id:"m1", name:"Ramesh Gupta",    email:"ramesh@steelworks.com",  type:"Coal Trading Inquiry",    message:"We need 500 MT of thermal coal (5000 GCV) delivered to Raipur by end of July. Please share your best price.", date:"2026-06-18", read:false },
  { id:"m2", name:"Anita Sharma",    email:"anita@powergen.in",       type:"Port Operations",         message:"Looking for a handling partner at Paradip port for our upcoming shipment of 10,000 MT. Can you assist?",     date:"2026-06-17", read:false },
  { id:"m3", name:"Vijay Merchant",  email:"vijay@logistics.co.in",   type:"Logistics Partnership",   message:"We're expanding our bulk transport fleet and would like to explore a partnership for coal logistics in MP.",   date:"2026-06-15", read:true  },
  { id:"m4", name:"CSR Foundation",  email:"csr@foundation.org",      type:"CSR Collaboration",       message:"Our NGO works in tribal education in Chhattisgarh. Interested in collaborating on school adoption programs.",  date:"2026-06-12", read:true  },
  { id:"m5", name:"Pradeep Nair",    email:"pradeep@cement.co.in",    type:"Coal Trading Inquiry",    message:"Need 200 MT of petcoke per month for our cement kiln in Kerala. Is this something you can supply?",           date:"2026-06-10", read:true  },
];

const DEFAULT_PAGES: PageContent[] = [
  { id:"pg1", slug:"/",           title:"Home",             heroHeadline:"Powering Industries. Connecting the World.", heroSubtext:"Building sustainable energy and logistics solutions across India and global markets.", published:true, lastEdited:"2026-06-18" },
  { id:"pg2", slug:"/about",      title:"About Us",         heroHeadline:"Built on Coal. Driven by Purpose.",          heroSubtext:"Two decades of industrial leadership, national growth, and community impact.",          published:true, lastEdited:"2026-06-15" },
  { id:"pg3", slug:"/services",   title:"Services",         heroHeadline:"Industrial Solutions",                       heroSubtext:"Comprehensive energy and logistics services tailored for every industrial need.",        published:true, lastEdited:"2026-06-10" },
  { id:"pg4", slug:"/activities", title:"Activities & CSR", heroHeadline:"Creating Impact Beyond Business.",           heroSubtext:"Our commitment to community, education, and environment shapes every decision.",          published:true, lastEdited:"2026-06-08" },
  { id:"pg5", slug:"/contact",    title:"Contact",          heroHeadline:"Get In Touch",                               heroSubtext:"Tell us about your requirements and we'll connect you with the right team.",            published:true, lastEdited:"2026-06-05" },
];

const DEFAULT_MEDIA: MediaFile[] = [
  { id:"md1", name:"hero-banner.jpg",           type:"image", folder:"Banners",     size:"2.4 MB", emoji:"🏭", date:"2026-06-18" },
  { id:"md2", name:"school-dhanbad.jpg",        type:"image", folder:"CSR",         size:"1.1 MB", emoji:"🏫", date:"2026-06-15" },
  { id:"md3", name:"plantation-drive.jpg",      type:"image", folder:"Activities",  size:"900 KB", emoji:"🌳", date:"2026-06-14" },
  { id:"md4", name:"thermal-coal.jpg",          type:"image", folder:"Products",    size:"1.8 MB", emoji:"⛏️", date:"2026-06-12" },
  { id:"md5", name:"medical-camp.jpg",          type:"image", folder:"Activities",  size:"780 KB", emoji:"🏥", date:"2026-06-10" },
  { id:"md6", name:"port-operations.mp4",       type:"video", folder:"Banners",     size:"18 MB",  emoji:"🎬", date:"2026-06-08" },
  { id:"md7", name:"coal-logistics.jpg",        type:"image", folder:"Products",    size:"1.3 MB", emoji:"🚛", date:"2026-06-06" },
  { id:"md8", name:"nagpur-school.jpg",         type:"image", folder:"CSR",         size:"950 KB", emoji:"📚", date:"2026-06-04" },
];

const DEFAULT_SETTINGS: CompanySettings = {
  name:"Ambition Coal Pvt. Ltd.",
  tagline:"Providing a One Stop Coal Solution.",
  email:"info@ambitioncoal.in",
  phone:"+91 XXXXX XXXXX",
  address:"Registered at Registrar of Companies, Ahmedabad, Gujarat",
  linkedin:"https://linkedin.com/company/ambitioncoal",
  twitter:"https://twitter.com/ambitioncoal",
  youtube:"https://youtube.com/@ambitioncoal",
  estYear:"2010",
};

function load<T>(key: string, def: T): T {
  if (typeof window === "undefined") return def;
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : def; } catch { return def; }
}
function save<T>(key: string, val: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(val));
}

export function useAdminData() {
  const [activities, setActivities]   = useState<Activity[]>([]);
  const [schools,    setSchools]       = useState<School[]>([]);
  const [products,   setProducts]      = useState<Product[]>([]);
  const [messages,   setMessages]      = useState<Message[]>([]);
  const [pages,      setPages]         = useState<PageContent[]>([]);
  const [media,      setMedia]         = useState<MediaFile[]>([]);
  const [settings,   setSettings]      = useState<CompanySettings>(DEFAULT_SETTINGS);
  const [hydrated,   setHydrated]      = useState(false);

  useEffect(() => {
    setActivities(load("ac_activities", DEFAULT_ACTIVITIES));
    setSchools(load("ac_schools",    DEFAULT_SCHOOLS));
    setProducts(load("ac_products",  DEFAULT_PRODUCTS));
    setMessages(load("ac_messages",  DEFAULT_MESSAGES));
    setPages(load("ac_pages",        DEFAULT_PAGES));
    setMedia(load("ac_media",        DEFAULT_MEDIA));
    setSettings(load("ac_settings",  DEFAULT_SETTINGS));
    setHydrated(true);
  }, []);

  /* ---------- Activities ---------- */
  const addActivity    = (a: Activity)    => { const n=[...activities,a]; setActivities(n); save("ac_activities",n); };
  const updateActivity = (a: Activity)    => { const n=activities.map(x=>x.id===a.id?a:x); setActivities(n); save("ac_activities",n); };
  const deleteActivity = (id: string)     => { const n=activities.filter(x=>x.id!==id); setActivities(n); save("ac_activities",n); };

  /* ---------- Schools ---------- */
  const addSchool    = (s: School)  => { const n=[...schools,s]; setSchools(n); save("ac_schools",n); };
  const updateSchool = (s: School)  => { const n=schools.map(x=>x.id===s.id?s:x); setSchools(n); save("ac_schools",n); };
  const deleteSchool = (id: string) => { const n=schools.filter(x=>x.id!==id); setSchools(n); save("ac_schools",n); };

  /* ---------- Products ---------- */
  const addProduct    = (p: Product)  => { const n=[...products,p]; setProducts(n); save("ac_products",n); };
  const updateProduct = (p: Product)  => { const n=products.map(x=>x.id===p.id?p:x); setProducts(n); save("ac_products",n); };
  const deleteProduct = (id: string)  => { const n=products.filter(x=>x.id!==id); setProducts(n); save("ac_products",n); };

  /* ---------- Messages ---------- */
  const markRead    = (id: string) => { const n=messages.map(x=>x.id===id?{...x,read:true}:x); setMessages(n); save("ac_messages",n); };
  const deleteMsg   = (id: string) => { const n=messages.filter(x=>x.id!==id); setMessages(n); save("ac_messages",n); };

  /* ---------- Pages ---------- */
  const updatePage = (p: PageContent) => { const n=pages.map(x=>x.id===p.id?p:x); setPages(n); save("ac_pages",n); };

  /* ---------- Media ---------- */
  const addMedia    = (f: MediaFile)  => { const n=[f,...media]; setMedia(n); save("ac_media",n); };
  const deleteMedia = (id: string)    => { const n=media.filter(x=>x.id!==id); setMedia(n); save("ac_media",n); };

  /* ---------- Settings ---------- */
  const saveSettings = (s: CompanySettings) => { setSettings(s); save("ac_settings",s); };

  const unreadCount = messages.filter(m=>!m.read).length;

  return {
    activities, addActivity, updateActivity, deleteActivity,
    schools,    addSchool,    updateSchool,    deleteSchool,
    products,   addProduct,   updateProduct,   deleteProduct,
    messages,   markRead,     deleteMsg,
    pages,      updatePage,
    media,      addMedia,     deleteMedia,
    settings,   saveSettings,
    unreadCount, hydrated,
  };
}
