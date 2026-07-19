"use client";
import { useState } from "react";
import { Plus, Edit3, Trash2, Star, X } from "lucide-react";
import Modal from "../Modal";
import { Field, Input, Textarea, Toggle, SaveBtn, Select } from "../AdminField";
import type { Product, ProductCategory } from "../types";
import { PRODUCT_CATEGORY_ICONS, IconChip } from "../iconRegistry";

const CATEGORIES: ProductCategory[] = ["Coal", "Minerals", "Salt"];

const TYPES_BY_CATEGORY: Record<ProductCategory, string[]> = {
  Coal: ["Thermal", "Imported", "Coking", "Petcoke", "Washery", "Other"],
  Minerals: ["Manganese Ore", "Silica Ore", "Zinc Ore", "Other"],
  Salt: ["Industrial Grade", "Edible", "Other"],
};

const blank = (category: ProductCategory = "Coal"): Product => ({
  id: Date.now().toString(), name:"", category, type: TYPES_BY_CATEGORY[category][0],
  specs: [], applications:"", featured:false, comingSoon:false,
});

interface Props {
  products: Product[];
  add: (p:Product)=>void;
  update: (p:Product)=>void;
  remove: (id:string)=>void;
}

export default function ProductsSection({ products, add, update, remove }: Props) {
  const [modal,  setModal]  = useState<"add"|"edit"|null>(null);
  const [form,   setForm]   = useState<Product>(blank());
  const [toast,  setToast]  = useState("");
  const [catFilter, setCatFilter] = useState<"All"|ProductCategory>("All");

  const showToast = (msg:string) => { setToast(msg); setTimeout(()=>setToast(""),2500); };
  const f = (k:keyof Product, v:unknown) => setForm(p=>({...p,[k]:v}));

  const openAdd  = () => { setForm(blank(catFilter==="All" ? "Coal" : catFilter)); setModal("add"); };
  const openEdit = (p:Product) => { setForm({...p}); setModal("edit"); };

  const submit = (e:React.FormEvent) => {
    e.preventDefault();
    if(!form.name.trim()) return;
    modal==="add" ? add({...form,id:Date.now().toString()}) : update(form);
    setModal(null);
    showToast(modal==="add"?"Product added!":"Product updated!");
  };

  const visible = catFilter==="All" ? products : products.filter(p=>p.category===catFilter);

  return (
    <div>
      {toast && (
        <div className="fixed top-20 right-6 z-50 px-4 py-3 rounded-xl text-sm font-bold text-white"
             style={{ background:"var(--orange)", boxShadow:"0 8px 24px rgba(249,115,22,0.35)" }}>✓ {toast}</div>
      )}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-black text-gray-900">Products</h1>
          <p className="text-xs mt-0.5" style={{ color:"rgba(0,0,0,0.4)" }}>{products.length} products across Coal, Minerals & Salt · {products.filter(p=>p.featured).length} featured</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white"
                style={{ background:"var(--orange)" }}
                onMouseEnter={e=>(e.currentTarget.style.boxShadow="0 8px 24px rgba(249,115,22,0.35)")}
                onMouseLeave={e=>(e.currentTarget.style.boxShadow="")}>
          <Plus size={15}/> Add Product
        </button>
      </div>

      {/* Category tabs — mirrors the three verticals on the live Services page */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {(["All", ...CATEGORIES] as const).map(c=>{
          const CatIcon = c!=="All" ? PRODUCT_CATEGORY_ICONS[c].Icon : null;
          return (
            <button key={c} onClick={()=>setCatFilter(c)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all"
                    style={{ background:catFilter===c?"var(--orange)":"rgba(0,0,0,0.05)", color:catFilter===c?"white":"rgba(0,0,0,0.55)" }}>
              {CatIcon && <CatIcon size={13}/>} {c}
              <span className="px-1.5 py-0.5 rounded-full text-[9px]"
                    style={{ background:catFilter===c?"rgba(255,255,255,0.25)":"rgba(0,0,0,0.08)" }}>
                {c==="All" ? products.length : products.filter(p=>p.category===c).length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Product cards */}
      <div className="grid gap-3">
        {visible.length === 0 && (
          <div className="py-12 text-center rounded-2xl text-sm" style={{ background:"rgba(0,0,0,0.02)", border:"1px solid rgba(0,0,0,0.07)", color:"rgba(0,0,0,0.4)" }}>
            No products in this category yet
          </div>
        )}
        {visible.map(p=>(
          <div key={p.id} className="rounded-2xl p-5 transition-all"
               style={{ background:"#ffffff", border:"1px solid rgba(0,0,0,0.08)" }}
               onMouseEnter={e=>(e.currentTarget.style.background="rgba(0,0,0,0.02)")}
               onMouseLeave={e=>(e.currentTarget.style.background="#ffffff")}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <IconChip option={PRODUCT_CATEGORY_ICONS[p.category]} size={20} box={40}/>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-bold text-gray-900 text-sm">{p.name}</span>
                    {p.featured && <Star size={11} fill="var(--orange)" style={{ color:"var(--orange)" }}/>}
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold"
                          style={{ background:"rgba(249,115,22,0.1)", color:"var(--orange)" }}>{p.category} · {p.type}</span>
                    {p.comingSoon && (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold" style={{ background:"rgba(100,116,139,0.15)", color:"#64748b" }}>
                        COMING SOON
                      </span>
                    )}
                  </div>
                  {/* Specs */}
                  {p.specs.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {p.specs.map(s=>(
                        <span key={s} className="px-2 py-0.5 rounded text-[10px] font-semibold" style={{ background:"#f5f5f5", border:"1px solid #e5e5e5", color:"#555" }}>{s}</span>
                      ))}
                    </div>
                  )}
                  {p.applications && <p className="text-[10px] mt-2" style={{ color:"rgba(0,0,0,0.45)" }}>Applications: {p.applications}</p>}
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={()=>update({...p,featured:!p.featured})} className="p-2 rounded-lg transition-colors"
                        style={{ background:p.featured?"rgba(249,115,22,0.15)":"rgba(0,0,0,0.05)" }}>
                  <Star size={13} fill={p.featured?"var(--orange)":"transparent"} style={{ color:p.featured?"var(--orange)":"rgba(0,0,0,0.35)" }}/>
                </button>
                <button onClick={()=>openEdit(p)} className="p-2 rounded-lg" style={{ background:"rgba(249,115,22,0.1)" }}
                        onMouseEnter={e=>(e.currentTarget.style.background="rgba(249,115,22,0.25)")}
                        onMouseLeave={e=>(e.currentTarget.style.background="rgba(249,115,22,0.1)")}>
                  <Edit3 size={13} style={{ color:"var(--orange)" }}/>
                </button>
                <button onClick={()=>{ if(confirm("Delete this product? This cannot be undone.")){ remove(p.id); showToast("Deleted."); }}}
                        className="p-2 rounded-lg" style={{ background:"rgba(239,68,68,0.1)" }}
                        onMouseEnter={e=>(e.currentTarget.style.background="rgba(239,68,68,0.25)")}
                        onMouseLeave={e=>(e.currentTarget.style.background="rgba(239,68,68,0.1)")}>
                  <Trash2 size={13} style={{ color:"#ef4444" }}/>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modal && (
        <Modal title={modal==="add"?"Add Product":"Edit Product"} onClose={()=>setModal(null)}>
          <form onSubmit={submit} className="flex flex-col gap-4">
            <Field label="PRODUCT NAME" required><Input value={form.name} onChange={e=>f("name",e.target.value)} placeholder="e.g. Manganese Ore" required/></Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="CATEGORY">
                <Select value={form.category} onChange={e=>{
                  const category = e.target.value as ProductCategory;
                  setForm(p=>({...p, category, type: TYPES_BY_CATEGORY[category][0]}));
                }}>
                  {CATEGORIES.map(c=><option key={c}>{c}</option>)}
                </Select>
              </Field>
              <Field label="TYPE">
                <Select value={form.type} onChange={e=>f("type",e.target.value)}>
                  {TYPES_BY_CATEGORY[form.category].map(t=><option key={t}>{t}</option>)}
                </Select>
              </Field>
            </div>

            <Field label="SPECS">
              <div className="flex flex-col gap-2">
                {form.specs.map((s,i)=>(
                  <div key={i} className="flex gap-2">
                    <input value={s} onChange={e=>{ const specs=[...form.specs]; specs[i]=e.target.value; f("specs",specs); }}
                           placeholder="e.g. NaCl: 98–99.5%"
                           className="flex-1 px-3 py-2 rounded-lg text-sm" style={{ background:"rgba(0,0,0,0.04)", border:"1px solid rgba(0,0,0,0.12)" }}/>
                    <button type="button" onClick={()=>f("specs", form.specs.filter((_,j)=>j!==i))}
                            className="p-2 rounded-lg" style={{ background:"rgba(239,68,68,0.1)", color:"#ef4444" }}>
                      <X size={13}/>
                    </button>
                  </div>
                ))}
                <button type="button" onClick={()=>f("specs",[...form.specs,""])}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold w-fit"
                        style={{ background:"rgba(249,115,22,0.1)", color:"var(--orange)" }}>
                  <Plus size={12}/> Add Spec
                </button>
              </div>
            </Field>

            <Field label="APPLICATIONS"><Textarea value={form.applications} onChange={e=>f("applications",e.target.value)} rows={2} placeholder="Power plants, captive power…"/></Field>

            <div className="flex gap-6">
              <Toggle checked={form.featured} onChange={v=>f("featured",v)} label="Featured on Services page"/>
              <Toggle checked={form.comingSoon} onChange={v=>f("comingSoon",v)} label="Coming soon (not yet available)"/>
            </div>

            <SaveBtn label={modal==="add"?"Add Product":"Save Changes"}/>
          </form>
        </Modal>
      )}
    </div>
  );
}
