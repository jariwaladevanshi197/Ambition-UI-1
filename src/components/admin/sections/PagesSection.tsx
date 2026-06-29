"use client";
import { useState } from "react";
import {
  Edit3, Eye, EyeOff, Plus, Trash2, ChevronDown, ChevronUp,
  Image as ImageIcon, Type, BarChart2, Grid, Megaphone, Layout, X, Check
} from "lucide-react";
import { Field, Input, Textarea, Toggle, SaveBtn } from "../AdminField";
import type { PageContent } from "../types";

// ── Available images in /public/images ──────────────────────────
const AVAILABLE_IMAGES = [
  { src:"/images/Gemini_Generated_Image_680jx7680jx7680j.png", label:"Coal Sector Collage" },
  { src:"/images/Gemini_Generated_Image_6wi0526wi0526wi0.png", label:"Steam Coal Indonesia" },
  { src:"/images/Gemini_Generated_Image_imewt4imewt4imew.png", label:"Steam Coal South Africa" },
  { src:"/images/Gemini_Generated_Image_maelcimaelcimael.png", label:"Steam Coal Kenya" },
  { src:"/images/Gemini_Generated_Image_urm0uqurm0uqurm0.png", label:"Coking Coal" },
  { src:"/images/Gemini_Generated_Image_9jp8wd9jp8wd9jp8.png", label:"Coal Operations" },
  { src:"/images/Gemini_Generated_Image_y1eikuy1eikuy1ei.png", label:"Coal Processing" },
  { src:"/images/Gemini_Generated_Image_kt7gkdkt7gkdkt7gb.png", label:"Industrial Salt" },
  { src:"/images/Gemini_Generated_Image_kt7gkdkt7gkdkt7gd.png", label:"Edible Salt" },
  { src:"/images/port.jpg",     label:"Port Operations" },
  { src:"/images/shipping.jpg", label:"Shipping" },
  { src:"/images/mining.jpg",   label:"Mining Site" },
];

// ── Section types ───────────────────────────────────────────────
type SectionType = "hero" | "stats" | "cards" | "text" | "cta" | "image-text" | "gallery";

interface StatItem  { value: string; label: string; }
interface CardItem  { title: string; desc: string; icon?: string; }
interface GalleryItem { src: string; label: string; }

interface PageSection {
  id: string;
  type: SectionType;
  label: string;
  visible: boolean;
  // hero
  headline?: string;
  subtext?: string;
  ctaText?: string;
  ctaLink?: string;
  image?: string;
  // stats
  stats?: StatItem[];
  // cards
  cards?: CardItem[];
  // text
  heading?: string;
  body?: string;
  // cta
  ctaHeading?: string;
  ctaBody?: string;
  ctaBtn?: string;
  // gallery
  gallery?: GalleryItem[];
}

const SECTION_ICONS: Record<SectionType, React.ReactNode> = {
  hero:       <Layout size={14}/>,
  stats:      <BarChart2 size={14}/>,
  cards:      <Grid size={14}/>,
  text:       <Type size={14}/>,
  cta:        <Megaphone size={14}/>,
  "image-text": <ImageIcon size={14}/>,
  gallery:    <ImageIcon size={14}/>,
};

const SECTION_COLORS: Record<SectionType, string> = {
  hero: "#F97316", stats: "#3b82f6", cards: "#8b5cf6",
  text: "#22c55e", cta: "#ec4899", "image-text": "#0ea5e9", gallery: "#D97706",
};

// Default sections per page slug
const DEFAULT_SECTIONS: Record<string, PageSection[]> = {
  "/": [
    { id:"h1", type:"hero",       label:"Hero Banner",       visible:true, headline:"Powering Industries. Connecting the World.", subtext:"Building sustainable energy and logistics solutions across India and global markets.", ctaText:"Explore Solutions", ctaLink:"/services", image:"/images/Gemini_Generated_Image_680jx7680jx7680j.png" },
    { id:"s1", type:"stats",      label:"Key Stats",          visible:true, stats:[{value:"20+",label:"Years"},{value:"1M+",label:"Tons Delivered"},{value:"50+",label:"Cities"}] },
    { id:"c1", type:"cards",      label:"Services Preview",   visible:true, cards:[{title:"Coal Trading",desc:"End-to-end coal sourcing"},{title:"Port Ops",desc:"Bulk cargo handling"},{title:"Logistics",desc:"Doorstep delivery"}] },
    { id:"t1", type:"text",       label:"About Section",      visible:true, heading:"Trusted Since 2003", body:"Ambition Coal Pvt. Ltd. — pioneers in imported coal supply across India." },
    { id:"a1", type:"cta",        label:"CTA Banner",         visible:true, ctaHeading:"Ready to Partner?", ctaBody:"Get in touch with our team.", ctaBtn:"Contact Us" },
  ],
  "/about": [
    { id:"h2", type:"hero",       label:"Hero Carousel",      visible:true, headline:"Pioneers in Imported Coal.", subtext:"Promoted by Mr. Jayesh Mahesh Agrawal & Yashika Jayesh Agrawal.", image:"/images/Gemini_Generated_Image_680jx7680jx7680j.png" },
    { id:"t2", type:"text",       label:"Our Story",          visible:true, heading:"Our Story", body:"Ambition Coal was established in 2003 in Mumbai with a vision to transform India's coal supply chain." },
    { id:"s2", type:"stats",      label:"Milestones Strip",   visible:true, stats:[{value:"2003",label:"Founded"},{value:"1M+",label:"Tons/Year"},{value:"50+",label:"Cities"}] },
    { id:"i1", type:"image-text", label:"Leadership",         visible:true, heading:"Our Leadership", body:"Directed by Jayesh & Yashika Agrawal with 20+ years of industry expertise.", image:"/images/Gemini_Generated_Image_9jp8wd9jp8wd9jp8.png" },
    { id:"c2", type:"cards",      label:"Why Choose Us",      visible:true, cards:[{title:"Competitive Pricing",desc:"Best rates guaranteed"},{title:"Global Sourcing",desc:"6+ countries"},{title:"Quality Assured",desc:"ISO certified"}] },
  ],
  "/services": [
    { id:"h3", type:"hero",       label:"Services Hero",      visible:true, headline:"Quality Coal. Reliable Supply.", subtext:"From mine to doorstep — end-to-end coal solutions.", image:"/images/Gemini_Generated_Image_680jx7680jx7680j.png" },
    { id:"c3", type:"cards",      label:"Coal Products",      visible:true, cards:[{title:"Steam Coal — Indonesia",desc:"5500–6500 kcal/kg"},{title:"Steam Coal — South Africa",desc:"5800–6200 kcal/kg"},{title:"Coking Coal",desc:"6000–7500 kcal/kg"}] },
    { id:"c4", type:"cards",      label:"Service Types",      visible:true, cards:[{title:"Coal Trading",desc:"End-to-end sourcing"},{title:"Port Operations",desc:"15+ ports"},{title:"Road Transport",desc:"50+ cities"}] },
    { id:"s3", type:"stats",      label:"Salt Products",      visible:true, stats:[{value:"Industrial",label:"Grade Salt"},{value:"Edible",label:"Food Grade"}] },
    { id:"a2", type:"cta",        label:"Request Quote CTA",  visible:true, ctaHeading:"Request a Quote", ctaBody:"Get pricing for your coal requirements.", ctaBtn:"Get Quote" },
  ],
  "/activities": [
    { id:"h4", type:"hero",       label:"Activities Hero",    visible:true, headline:"Our Activities", subtext:"From plantation drives to medical camps — every initiative counts.", image:"/images/Gemini_Generated_Image_9jp8wd9jp8wd9jp8.png" },
    { id:"s4", type:"stats",      label:"Impact Stats",       visible:true, stats:[{value:"9+",label:"2024 Initiatives"},{value:"5K+",label:"Beneficiaries"},{value:"5",label:"States"}] },
    { id:"c5", type:"cards",      label:"Recent Initiatives", visible:true, cards:[{title:"Plantation Drive",desc:"2,000 saplings — Jun 2024"},{title:"Medical Camp",desc:"800+ villagers — May 2024"},{title:"School Supplies",desc:"450 students — Apr 2024"}] },
    { id:"g1", type:"gallery",    label:"Photo Gallery",      visible:true, gallery:[{src:"/images/Gemini_Generated_Image_680jx7680jx7680j.png",label:"Operations"},{src:"/images/port.jpg",label:"Port"}] },
  ],
  "/contact": [
    { id:"h5", type:"hero",       label:"Contact Hero",       visible:true, headline:"Get In Touch", subtext:"Reach out to our team for coal enquiries, partnerships or general questions." },
    { id:"t3", type:"text",       label:"Office Info",        visible:true, heading:"Our Office", body:"Ambition House, BKC, Mumbai 400051\n+91 22 XXXX XXXX\ninfo@ambitioncoal.co.in" },
    { id:"a3", type:"cta",        label:"Quick Contact CTA",  visible:true, ctaHeading:"Ready to talk?", ctaBody:"Fill the form or call us directly.", ctaBtn:"Send Message" },
  ],
};

const STORAGE_KEY = "ac_page_sections";

function loadSections(): Record<string, PageSection[]> {
  if (typeof window === "undefined") return DEFAULT_SECTIONS;
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); } catch { return {}; }
}
function saveSections(data: Record<string, PageSection[]>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
function getSections(slug: string): PageSection[] {
  const stored = loadSections();
  return stored[slug] ?? DEFAULT_SECTIONS[slug] ?? [];
}

// ── Image Picker Modal ──────────────────────────────────────────
function ImagePicker({ current, onSelect, onClose }: { current?: string; onSelect:(src:string)=>void; onClose:()=>void }) {
  const [custom, setCustom] = useState("");
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center" style={{ background:"rgba(0,0,0,0.6)", backdropFilter:"blur(6px)" }}>
      <div className="bg-white rounded-2xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-gray-900">Select Image</h3>
          <button onClick={onClose}><X size={18} className="text-gray-400"/></button>
        </div>

        {/* Custom URL */}
        <div className="flex gap-2">
          <input value={custom} onChange={e=>setCustom(e.target.value)} placeholder="/images/your-image.jpg or https://..."
                 className="flex-1 px-3 py-2 rounded-lg text-sm border" style={{ border:"1px solid rgba(0,0,0,0.15)" }}/>
          <button onClick={()=>{ if(custom){ onSelect(custom); onClose(); }}}
                  className="px-4 py-2 rounded-lg text-sm font-bold text-white" style={{ background:"var(--orange)" }}>
            Use
          </button>
        </div>

        {/* Grid of available images */}
        <div className="overflow-y-auto grid grid-cols-3 gap-3">
          {AVAILABLE_IMAGES.map(img=>(
            <button key={img.src} onClick={()=>{ onSelect(img.src); onClose(); }}
                    className="relative rounded-xl overflow-hidden group"
                    style={{ aspectRatio:"4/3", border: current===img.src ? "3px solid var(--orange)" : "2px solid transparent" }}>
              <img src={img.src} alt={img.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
              <div className="absolute inset-0 flex flex-col justify-end p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                   style={{ background:"linear-gradient(to top,rgba(0,0,0,0.7),transparent)" }}>
                <span className="text-white text-[10px] font-bold">{img.label}</span>
              </div>
              {current===img.src && (
                <div className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center" style={{ background:"var(--orange)" }}>
                  <Check size={12} className="text-white"/>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Section Editor ──────────────────────────────────────────────
function SectionEditor({ section, onChange }: { section: PageSection; onChange:(s:PageSection)=>void }) {
  const [imgPicker, setImgPicker] = useState(false);
  const [imgPickerTarget, setImgPickerTarget] = useState<"image"|number>("image");
  const f = (k: keyof PageSection, v: unknown) => onChange({...section, [k]: v});

  const openImagePicker = (target: "image" | number) => { setImgPickerTarget(target); setImgPicker(true); };

  return (
    <div className="flex flex-col gap-3 pt-3">
      {imgPicker && (
        <ImagePicker
          current={typeof imgPickerTarget === "number"
            ? section.gallery?.[imgPickerTarget]?.src
            : section.image}
          onSelect={src => {
            if (typeof imgPickerTarget === "number") {
              const g = [...(section.gallery||[])];
              g[imgPickerTarget] = {...g[imgPickerTarget], src};
              f("gallery", g);
            } else {
              f("image", src);
            }
          }}
          onClose={()=>setImgPicker(false)}
        />
      )}

      {/* HERO */}
      {section.type === "hero" && <>
        <Field label="HEADLINE"><Input value={section.headline||""} onChange={e=>f("headline",e.target.value)} placeholder="Main headline"/></Field>
        <Field label="SUBTEXT"><Textarea value={section.subtext||""} onChange={e=>f("subtext",e.target.value)} rows={2} placeholder="Supporting text"/></Field>
        <Field label="CTA BUTTON TEXT"><Input value={section.ctaText||""} onChange={e=>f("ctaText",e.target.value)} placeholder="e.g. Explore Solutions"/></Field>
        <Field label="CTA LINK"><Input value={section.ctaLink||""} onChange={e=>f("ctaLink",e.target.value)} placeholder="/services"/></Field>
        <Field label="BACKGROUND IMAGE">
          <div className="flex gap-2 items-center">
            {section.image && <img src={section.image} alt="" className="w-16 h-10 object-cover rounded-lg"/>}
            <button type="button" onClick={()=>openImagePicker("image")}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold"
                    style={{ background:"rgba(249,115,22,0.1)", color:"var(--orange)", border:"1px solid rgba(249,115,22,0.25)" }}>
              <ImageIcon size={12}/> {section.image ? "Change Image" : "Select Image"}
            </button>
          </div>
        </Field>
      </>}

      {/* STATS */}
      {section.type === "stats" && <>
        <div className="text-[10px] font-black tracking-widest text-gray-400 mb-1">STAT ITEMS</div>
        {(section.stats||[]).map((st,i)=>(
          <div key={i} className="flex gap-2 items-center">
            <input value={st.value} onChange={e=>{ const s=[...(section.stats||[])]; s[i]={...s[i],value:e.target.value}; f("stats",s); }}
                   placeholder="Value" className="flex-1 px-3 py-2 rounded-lg text-sm" style={{ background:"rgba(0,0,0,0.04)", border:"1px solid rgba(0,0,0,0.12)" }}/>
            <input value={st.label} onChange={e=>{ const s=[...(section.stats||[])]; s[i]={...s[i],label:e.target.value}; f("stats",s); }}
                   placeholder="Label" className="flex-1 px-3 py-2 rounded-lg text-sm" style={{ background:"rgba(0,0,0,0.04)", border:"1px solid rgba(0,0,0,0.12)" }}/>
            <button type="button" onClick={()=>{ const s=(section.stats||[]).filter((_,j)=>j!==i); f("stats",s); }}
                    className="p-2 rounded-lg" style={{ background:"rgba(239,68,68,0.1)", color:"#ef4444" }}><Trash2 size={12}/></button>
          </div>
        ))}
        <button type="button" onClick={()=>f("stats",[...(section.stats||[]),{value:"",label:""}])}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold w-fit"
                style={{ background:"rgba(249,115,22,0.1)", color:"var(--orange)" }}>
          <Plus size={12}/> Add Stat
        </button>
      </>}

      {/* CARDS */}
      {section.type === "cards" && <>
        <div className="text-[10px] font-black tracking-widest text-gray-400 mb-1">CARDS</div>
        {(section.cards||[]).map((c,i)=>(
          <div key={i} className="p-3 rounded-xl flex flex-col gap-2" style={{ background:"rgba(0,0,0,0.03)", border:"1px solid rgba(0,0,0,0.08)" }}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-gray-400">Card {i+1}</span>
              <button type="button" onClick={()=>{ const cc=(section.cards||[]).filter((_,j)=>j!==i); f("cards",cc); }}
                      className="p-1 rounded" style={{ color:"#ef4444" }}><Trash2 size={11}/></button>
            </div>
            <input value={c.title} onChange={e=>{ const cc=[...(section.cards||[])]; cc[i]={...cc[i],title:e.target.value}; f("cards",cc); }}
                   placeholder="Card title" className="px-3 py-2 rounded-lg text-sm" style={{ background:"white", border:"1px solid rgba(0,0,0,0.12)" }}/>
            <textarea value={c.desc} onChange={e=>{ const cc=[...(section.cards||[])]; cc[i]={...cc[i],desc:e.target.value}; f("cards",cc); }}
                      placeholder="Card description" rows={2} className="px-3 py-2 rounded-lg text-sm resize-none" style={{ background:"white", border:"1px solid rgba(0,0,0,0.12)" }}/>
          </div>
        ))}
        <button type="button" onClick={()=>f("cards",[...(section.cards||[]),{title:"",desc:""}])}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold w-fit"
                style={{ background:"rgba(249,115,22,0.1)", color:"var(--orange)" }}>
          <Plus size={12}/> Add Card
        </button>
      </>}

      {/* TEXT */}
      {section.type === "text" && <>
        <Field label="HEADING"><Input value={section.heading||""} onChange={e=>f("heading",e.target.value)} placeholder="Section heading"/></Field>
        <Field label="BODY TEXT"><Textarea value={section.body||""} onChange={e=>f("body",e.target.value)} rows={4} placeholder="Section body content"/></Field>
      </>}

      {/* IMAGE + TEXT */}
      {section.type === "image-text" && <>
        <Field label="HEADING"><Input value={section.heading||""} onChange={e=>f("heading",e.target.value)} placeholder="Section heading"/></Field>
        <Field label="BODY TEXT"><Textarea value={section.body||""} onChange={e=>f("body",e.target.value)} rows={3} placeholder="Section body"/></Field>
        <Field label="IMAGE">
          <div className="flex gap-2 items-center">
            {section.image && <img src={section.image} alt="" className="w-16 h-10 object-cover rounded-lg"/>}
            <button type="button" onClick={()=>openImagePicker("image")}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold"
                    style={{ background:"rgba(249,115,22,0.1)", color:"var(--orange)", border:"1px solid rgba(249,115,22,0.25)" }}>
              <ImageIcon size={12}/> {section.image ? "Change" : "Select Image"}
            </button>
          </div>
        </Field>
      </>}

      {/* CTA */}
      {section.type === "cta" && <>
        <Field label="HEADING"><Input value={section.ctaHeading||""} onChange={e=>f("ctaHeading",e.target.value)} placeholder="CTA heading"/></Field>
        <Field label="BODY"><Textarea value={section.ctaBody||""} onChange={e=>f("ctaBody",e.target.value)} rows={2} placeholder="Supporting text"/></Field>
        <Field label="BUTTON TEXT"><Input value={section.ctaBtn||""} onChange={e=>f("ctaBtn",e.target.value)} placeholder="Button label"/></Field>
      </>}

      {/* GALLERY */}
      {section.type === "gallery" && <>
        <div className="text-[10px] font-black tracking-widest text-gray-400 mb-1">GALLERY IMAGES</div>
        <div className="grid grid-cols-3 gap-2">
          {(section.gallery||[]).map((g,i)=>(
            <div key={i} className="relative rounded-xl overflow-hidden group" style={{ aspectRatio:"4/3" }}>
              <img src={g.src} alt={g.label} className="w-full h-full object-cover"/>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2"
                   style={{ background:"rgba(0,0,0,0.55)" }}>
                <button type="button" onClick={()=>{ const gg=(section.gallery||[]).filter((_,j)=>j!==i); f("gallery",gg); }}
                        className="self-end p-1 rounded-lg" style={{ background:"rgba(239,68,68,0.8)" }}><Trash2 size={10} className="text-white"/></button>
                <button type="button" onClick={()=>openImagePicker(i)}
                        className="text-[10px] font-bold text-white px-2 py-1 rounded-lg" style={{ background:"rgba(249,115,22,0.85)" }}>Change</button>
              </div>
            </div>
          ))}
          <button type="button" onClick={()=>openImagePicker(section.gallery?.length||0)}
                  className="rounded-xl flex flex-col items-center justify-center gap-1 border-2 border-dashed transition-colors"
                  style={{ aspectRatio:"4/3", borderColor:"rgba(249,115,22,0.3)", color:"var(--orange)" }}
                  onMouseEnter={e=>(e.currentTarget.style.background="rgba(249,115,22,0.06)")}
                  onMouseLeave={e=>(e.currentTarget.style.background="")}>
            <Plus size={18}/>
            <span className="text-[10px] font-bold">Add Image</span>
          </button>
        </div>
      </>}

      <Toggle checked={section.visible} onChange={v=>f("visible",v)} label="Section visible on page"/>
    </div>
  );
}

// ── Add Section Panel ───────────────────────────────────────────
const SECTION_TEMPLATES: { type: SectionType; label: string; desc: string }[] = [
  { type:"hero",        label:"Hero Banner",   desc:"Full-width headline + image + CTA" },
  { type:"stats",       label:"Stats Bar",     desc:"Row of key numbers/metrics" },
  { type:"cards",       label:"Cards Grid",    desc:"2–4 column card layout" },
  { type:"text",        label:"Text Block",    desc:"Heading + paragraph content" },
  { type:"image-text",  label:"Image + Text",  desc:"Side-by-side image and content" },
  { type:"cta",         label:"CTA Banner",    desc:"Call-to-action with button" },
  { type:"gallery",     label:"Photo Gallery", desc:"Image grid with lightbox" },
];

function AddSectionPanel({ onAdd, onClose }: { onAdd:(type:SectionType)=>void; onClose:()=>void }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center" style={{ background:"rgba(0,0,0,0.5)", backdropFilter:"blur(6px)" }}>
      <div className="bg-white rounded-2xl p-6 max-w-lg w-full mx-4">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-black text-gray-900">Add Section</h3>
          <button onClick={onClose}><X size={18} className="text-gray-400"/></button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {SECTION_TEMPLATES.map(t=>{
            const color = SECTION_COLORS[t.type];
            return (
              <button key={t.type} onClick={()=>{ onAdd(t.type); onClose(); }}
                      className="flex items-start gap-3 p-4 rounded-xl text-left transition-all"
                      style={{ border:`1px solid rgba(0,0,0,0.08)` }}
                      onMouseEnter={e=>{const el=e.currentTarget;el.style.borderColor=color;el.style.background=`${color}08`;}}
                      onMouseLeave={e=>{const el=e.currentTarget;el.style.borderColor="rgba(0,0,0,0.08)";el.style.background="";}}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                     style={{ background:`${color}15`, color }}>
                  {SECTION_ICONS[t.type]}
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900">{t.label}</div>
                  <div className="text-[11px] mt-0.5" style={{ color:"rgba(0,0,0,0.45)" }}>{t.desc}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Props ───────────────────────────────────────────────────────
interface Props {
  pages: PageContent[];
  update: (p: PageContent) => void;
}

// ── Main Component ──────────────────────────────────────────────
export default function PagesSection({ pages, update }: Props) {
  const PAGE_ICONS: Record<string, string> = { "/":"🏠", "/about":"🏭", "/services":"⚙️", "/activities":"🤝", "/contact":"📬" };

  const [activePage, setActivePage] = useState<PageContent | null>(null);
  const [sections,   setSections]   = useState<PageSection[]>([]);
  const [expanded,   setExpanded]   = useState<string | null>(null);
  const [addPanel,   setAddPanel]   = useState(false);
  const [toast,      setToast]      = useState("");

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 2500); };

  const openEditor = (p: PageContent) => {
    setActivePage({...p});
    setSections(getSections(p.slug));
    setExpanded(null);
  };

  const toggleExpand = (id: string) => setExpanded(e => e === id ? null : id);

  const updateSection = (updated: PageSection) =>
    setSections(ss => ss.map(s => s.id === updated.id ? updated : s));

  const deleteSection = (id: string) =>
    setSections(ss => ss.filter(s => s.id !== id));

  const moveSection = (id: string, dir: -1 | 1) => {
    setSections(ss => {
      const idx = ss.findIndex(s => s.id === id);
      if (idx < 0) return ss;
      const next = idx + dir;
      if (next < 0 || next >= ss.length) return ss;
      const arr = [...ss];
      [arr[idx], arr[next]] = [arr[next], arr[idx]];
      return arr;
    });
  };

  const addSection = (type: SectionType) => {
    const template = SECTION_TEMPLATES.find(t => t.type === type)!;
    const newSection: PageSection = {
      id: `sec_${Date.now()}`,
      type,
      label: template.label,
      visible: true,
      ...(type === "stats"   ? { stats: [{value:"",label:""}] } : {}),
      ...(type === "cards"   ? { cards: [{title:"",desc:""}] }  : {}),
      ...(type === "gallery" ? { gallery: [] }                   : {}),
    };
    setSections(ss => [...ss, newSection]);
    setExpanded(newSection.id);
  };

  const saveAll = () => {
    if (!activePage) return;
    const stored = loadSections();
    stored[activePage.slug] = sections;
    saveSections(stored);
    update({...activePage, lastEdited: new Date().toISOString().split("T")[0]});
    showToast("Page saved!");
  };

  // ── Page List View ──────────────────────────────────────────
  if (!activePage) return (
    <div>
      {toast && (
        <div className="fixed top-20 right-6 z-50 px-4 py-3 rounded-xl text-sm font-bold text-white"
             style={{ background:"var(--orange)", boxShadow:"0 8px 24px rgba(249,115,22,0.35)" }}>✓ {toast}</div>
      )}
      <div className="mb-6">
        <h1 className="text-xl font-black text-gray-900">Pages</h1>
        <p className="text-xs mt-0.5" style={{ color:"rgba(0,0,0,0.4)" }}>Click Edit to manage all sections of a page</p>
      </div>
      <div className="grid gap-3">
        {pages.map(p => (
          <div key={p.id} className="rounded-2xl p-5 transition-colors"
               style={{ background:"#ffffff", border:"1px solid rgba(0,0,0,0.08)" }}
               onMouseEnter={e=>(e.currentTarget.style.background="rgba(0,0,0,0.02)")}
               onMouseLeave={e=>(e.currentTarget.style.background="#ffffff")}>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
                     style={{ background:"rgba(249,115,22,0.1)" }}>
                  {PAGE_ICONS[p.slug] || "📄"}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-bold text-gray-900 text-sm">{p.title}</span>
                    <code className="text-[9px] px-1.5 py-0.5 rounded font-mono" style={{ background:"rgba(0,0,0,0.05)", color:"rgba(0,0,0,0.5)" }}>{p.slug}</code>
                    <button onClick={() => update({...p, published:!p.published})}
                            className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold"
                            style={{ background:p.published?"rgba(34,197,94,0.12)":"rgba(0,0,0,0.05)", color:p.published?"#22c55e":"rgba(0,0,0,0.4)" }}>
                      {p.published ? <Eye size={8}/> : <EyeOff size={8}/>} {p.published ? "Live" : "Draft"}
                    </button>
                  </div>
                  <p className="text-[11px] truncate" style={{ color:"rgba(0,0,0,0.45)" }}>{p.heroHeadline}</p>
                  <p className="text-[10px] mt-0.5" style={{ color:"rgba(0,0,0,0.3)" }}>Last edited {p.lastEdited}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] font-bold px-2 py-1 rounded-lg" style={{ background:"rgba(0,0,0,0.05)", color:"rgba(0,0,0,0.4)" }}>
                  {(DEFAULT_SECTIONS[p.slug]||[]).length} sections
                </span>
                <button onClick={() => openEditor(p)}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold"
                        style={{ background:"rgba(249,115,22,0.1)", color:"var(--orange)" }}
                        onMouseEnter={e=>(e.currentTarget.style.background="rgba(249,115,22,0.25)")}
                        onMouseLeave={e=>(e.currentTarget.style.background="rgba(249,115,22,0.1)")}>
                  <Edit3 size={12}/> Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ── Page Editor View ────────────────────────────────────────
  const color = "var(--orange)";
  return (
    <div>
      {toast && (
        <div className="fixed top-20 right-6 z-50 px-4 py-3 rounded-xl text-sm font-bold text-white"
             style={{ background:"var(--orange)", boxShadow:"0 8px 24px rgba(249,115,22,0.35)" }}>✓ {toast}</div>
      )}
      {addPanel && <AddSectionPanel onAdd={addSection} onClose={()=>setAddPanel(false)}/>}

      {/* Top bar */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <button onClick={()=>setActivePage(null)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold"
                  style={{ background:"rgba(0,0,0,0.06)", color:"rgba(0,0,0,0.55)" }}>
            ← Pages
          </button>
          <div>
            <h1 className="text-lg font-black text-gray-900">{PAGE_ICONS[activePage.slug]} {activePage.title}</h1>
            <p className="text-[11px]" style={{ color:"rgba(0,0,0,0.4)" }}>{sections.length} sections · {activePage.slug}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Toggle checked={activePage.published} onChange={v=>setActivePage(p=>p?({...p,published:v}):p)} label="Live"/>
          <button onClick={()=>setAddPanel(true)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold"
                  style={{ background:"rgba(249,115,22,0.1)", color }}>
            <Plus size={13}/> Add Section
          </button>
          <button onClick={saveAll}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white"
                  style={{ background:"var(--orange)" }}>
            <Check size={13}/> Save Page
          </button>
        </div>
      </div>

      {/* Section list */}
      <div className="flex flex-col gap-3">
        {sections.map((sec, idx) => {
          const col = SECTION_COLORS[sec.type];
          const isExp = expanded === sec.id;
          return (
            <div key={sec.id} className="rounded-2xl overflow-hidden"
                 style={{ border:`1px solid ${isExp ? col+"50" : "rgba(0,0,0,0.08)"}`, boxShadow: isExp ? `0 4px 20px ${col}15` : "none" }}>
              {/* Section header */}
              <div className="flex items-center gap-3 px-5 py-4 cursor-pointer select-none"
                   style={{ background: isExp ? `${col}06` : "#ffffff" }}
                   onClick={()=>toggleExpand(sec.id)}>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                     style={{ background:`${col}15`, color:col }}>
                  {SECTION_ICONS[sec.type]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-900">{sec.label}</span>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ background:`${col}15`, color:col }}>
                      {sec.type}
                    </span>
                    {!sec.visible && <span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ background:"rgba(0,0,0,0.06)", color:"rgba(0,0,0,0.4)" }}>Hidden</span>}
                  </div>
                </div>
                {/* Controls */}
                <div className="flex items-center gap-1" onClick={e=>e.stopPropagation()}>
                  <button onClick={()=>moveSection(sec.id,-1)} disabled={idx===0}
                          className="p-1.5 rounded-lg transition-colors disabled:opacity-30"
                          style={{ color:"rgba(0,0,0,0.4)" }}><ChevronUp size={14}/></button>
                  <button onClick={()=>moveSection(sec.id,1)} disabled={idx===sections.length-1}
                          className="p-1.5 rounded-lg transition-colors disabled:opacity-30"
                          style={{ color:"rgba(0,0,0,0.4)" }}><ChevronDown size={14}/></button>
                  <button onClick={()=>deleteSection(sec.id)}
                          className="p-1.5 rounded-lg transition-colors"
                          style={{ color:"#ef4444" }}><Trash2 size={13}/></button>
                </div>
                <div style={{ color:"rgba(0,0,0,0.35)" }}>
                  {isExp ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                </div>
              </div>

              {/* Section fields */}
              {isExp && (
                <div className="px-5 pb-5" style={{ borderTop:`1px solid ${col}20` }}>
                  <SectionEditor section={sec} onChange={updateSection}/>
                </div>
              )}
            </div>
          );
        })}

        {/* Empty state */}
        {sections.length === 0 && (
          <div className="text-center py-16" style={{ border:"2px dashed rgba(0,0,0,0.1)", borderRadius:16 }}>
            <Layout size={32} className="mx-auto mb-3" style={{ color:"rgba(0,0,0,0.2)" }}/>
            <p className="text-sm font-bold" style={{ color:"rgba(0,0,0,0.35)" }}>No sections yet</p>
            <button onClick={()=>setAddPanel(true)}
                    className="mt-4 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold mx-auto"
                    style={{ background:"rgba(249,115,22,0.1)", color }}>
              <Plus size={14}/> Add First Section
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
