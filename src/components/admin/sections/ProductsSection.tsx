"use client";
import { useState } from "react";
import { Plus, Edit3, Trash2, Star } from "lucide-react";
import Modal from "../Modal";
import { Field, Input, Textarea, Toggle, SaveBtn, Select } from "../AdminField";
import type { Product } from "../types";

const PRODUCT_TYPES = ["Thermal","Imported","Coking","Petcoke","Washery","Other"];

const blank = (): Product => ({
  id: Date.now().toString(), name:"", type:"Thermal", gcv:"", ash:"", moisture:"", applications:"", featured:false,
});

interface Props {
  products: Product[];
  add: (p:Product)=>void;
  update: (p:Product)=>void;
  remove: (id:string)=>void;
}

const ICONS: Record<string,string> = { Thermal:"🔥", Imported:"🚢", Coking:"🏗️", Petcoke:"⚡", Washery:"♻️", Other:"⛏️" };

export default function ProductsSection({ products, add, update, remove }: Props) {
  const [modal,  setModal]  = useState<"add"|"edit"|null>(null);
  const [form,   setForm]   = useState<Product>(blank());
  const [toast,  setToast]  = useState("");

  const showToast = (msg:string) => { setToast(msg); setTimeout(()=>setToast(""),2500); };
  const f = (k:keyof Product, v:unknown) => setForm(p=>({...p,[k]:v}));

  const openAdd  = () => { setForm(blank()); setModal("add"); };
  const openEdit = (p:Product) => { setForm({...p}); setModal("edit"); };

  const submit = (e:React.FormEvent) => {
    e.preventDefault();
    if(!form.name.trim()) return;
    modal==="add" ? add({...form,id:Date.now().toString()}) : update(form);
    setModal(null);
    showToast(modal==="add"?"Product added!":"Product updated!");
  };

  return (
    <div>
      {toast && (
        <div className="fixed top-20 right-6 z-50 px-4 py-3 rounded-xl text-sm font-bold text-white"
             style={{ background:"var(--orange)", boxShadow:"0 8px 24px rgba(249,115,22,0.35)" }}>✓ {toast}</div>
      )}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-black text-gray-900">Products</h1>
          <p className="text-xs mt-0.5" style={{ color:"rgba(0,0,0,0.4)" }}>{products.length} products · {products.filter(p=>p.featured).length} featured</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white"
                style={{ background:"var(--orange)" }}
                onMouseEnter={e=>(e.currentTarget.style.boxShadow="0 8px 24px rgba(249,115,22,0.35)")}
                onMouseLeave={e=>(e.currentTarget.style.boxShadow="")}>
          <Plus size={15}/> Add Product
        </button>
      </div>

      {/* Product cards */}
      <div className="grid gap-3">
        {products.map(p=>(
          <div key={p.id} className="rounded-2xl p-5 transition-all"
               style={{ background:"#ffffff", border:"1px solid rgba(0,0,0,0.08)" }}
               onMouseEnter={e=>(e.currentTarget.style.background="rgba(0,0,0,0.02)")}
               onMouseLeave={e=>(e.currentTarget.style.background="#ffffff")}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                     style={{ background:"rgba(249,115,22,0.1)" }}>
                  {ICONS[p.type]||"⛏️"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-gray-900 text-sm">{p.name}</span>
                    {p.featured && <Star size={11} fill="var(--orange)" style={{ color:"var(--orange)" }}/>}
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold"
                          style={{ background:"rgba(249,115,22,0.1)", color:"var(--orange)" }}>{p.type}</span>
                  </div>
                  {/* Specs */}
                  <div className="grid gap-x-4 gap-y-1 mt-2" style={{ gridTemplateColumns:"repeat(3,auto) 1fr" }}>
                    {[
                      { label:"GCV",      val:p.gcv },
                      { label:"Ash",      val:p.ash },
                      { label:"Moisture", val:p.moisture },
                    ].map(s=>(
                      <div key={s.label}>
                        <div className="text-[9px] font-bold mb-0.5" style={{ color:"rgba(0,0,0,0.35)", letterSpacing:"0.06em" }}>{s.label}</div>
                        <div className="text-[11px] font-semibold" style={{ color:"rgba(0,0,0,0.65)" }}>{s.val||"—"}</div>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] mt-2" style={{ color:"rgba(0,0,0,0.45)" }}>Applications: {p.applications}</p>
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
                <button onClick={()=>{ if(confirm("Delete this product?")){ remove(p.id); showToast("Deleted."); }}}
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
            <Field label="PRODUCT NAME" required><Input value={form.name} onChange={e=>f("name",e.target.value)} placeholder="e.g. Thermal Coal (Domestic)" required/></Field>
            <Field label="TYPE">
              <Select value={form.type} onChange={e=>f("type",e.target.value)}>
                {PRODUCT_TYPES.map(t=><option key={t}>{t}</option>)}
              </Select>
            </Field>
            <div className="grid grid-cols-3 gap-3">
              <Field label="GCV (kcal/kg)"><Input value={form.gcv} onChange={e=>f("gcv",e.target.value)} placeholder="3800–5500"/></Field>
              <Field label="ASH %"><Input value={form.ash} onChange={e=>f("ash",e.target.value)} placeholder="26–38%"/></Field>
              <Field label="MOISTURE %"><Input value={form.moisture} onChange={e=>f("moisture",e.target.value)} placeholder="8–14%"/></Field>
            </div>
            <Field label="APPLICATIONS"><Textarea value={form.applications} onChange={e=>f("applications",e.target.value)} rows={2} placeholder="Power plants, captive power…"/></Field>
            <Toggle checked={form.featured} onChange={v=>f("featured",v)} label="Featured on Services page"/>
            <SaveBtn label={modal==="add"?"Add Product":"Save Changes"}/>
          </form>
        </Modal>
      )}
    </div>
  );
}
