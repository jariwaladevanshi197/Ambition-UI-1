"use client";
import { useState } from "react";
import { Plus, Edit3, Trash2, Eye, EyeOff, Star } from "lucide-react";
import Modal from "../Modal";
import { Field, Input, Textarea, Select, Toggle, SaveBtn, DeleteBtn } from "../AdminField";
import type { Activity } from "../types";

const EMOJIS = ["🌳","🏥","📚","👩","♻️","🤝","⚡","🎨","🏫","💊","🌱","🎒"];
const CATEGORIES = ["Education","Healthcare","Environment","Community","Infrastructure","Women Empowerment"];

const blank = (): Activity => ({
  id: Date.now().toString(), title:"", description:"", category:"Education",
  date: new Date().toISOString().split("T")[0], featured:false, published:true, emoji:"📚",
});

interface Props {
  activities: Activity[];
  add: (a:Activity)=>void;
  update: (a:Activity)=>void;
  remove: (id:string)=>void;
}

export default function ActivitiesSection({ activities, add, update, remove }: Props) {
  const [modal, setModal]   = useState<"add"|"edit"|null>(null);
  const [form,  setForm]    = useState<Activity>(blank());
  const [search, setSearch] = useState("");
  const [catFilter, setCat] = useState("All");
  const [toast, setToast]   = useState("");

  const showToast = (msg:string) => { setToast(msg); setTimeout(()=>setToast(""),2500); };
  const f = (k:keyof Activity, v:unknown) => setForm(p=>({...p,[k]:v}));

  const openAdd  = () => { setForm(blank()); setModal("add"); };
  const openEdit = (a:Activity) => { setForm({...a}); setModal("edit"); };

  const submit = (e:React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    modal==="add" ? add(form) : update(form);
    setModal(null);
    showToast(modal==="add" ? "Activity added!" : "Activity updated!");
  };

  const cats = ["All", ...CATEGORIES];
  const visible = activities.filter(a =>
    (catFilter==="All" || a.category===catFilter) &&
    (a.title.toLowerCase().includes(search.toLowerCase()) || a.category.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      {toast && (
        <div className="fixed top-20 right-6 z-50 px-4 py-3 rounded-xl text-sm font-bold text-white"
             style={{ background:"var(--orange)", boxShadow:"0 8px 24px rgba(249,115,22,0.35)" }}>
          ✓ {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-black text-white">Activities</h1>
          <p className="text-xs mt-0.5" style={{ color:"rgba(255,255,255,0.3)" }}>{activities.length} total · {activities.filter(a=>a.published).length} published</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all"
                style={{ background:"var(--orange)" }}
                onMouseEnter={e=>(e.currentTarget.style.boxShadow="0 8px 24px rgba(249,115,22,0.35)")}
                onMouseLeave={e=>(e.currentTarget.style.boxShadow="")}>
          <Plus size={15}/> Add Activity
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search activities…"
               className="px-3 py-2 rounded-xl text-xs outline-none flex-1 min-w-[180px]"
               style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)", color:"white" }} />
        <div className="flex gap-1.5 flex-wrap">
          {cats.map(c=>(
            <button key={c} onClick={()=>setCat(c)} className="px-3 py-2 rounded-xl text-xs font-bold transition-all"
                    style={{ background:catFilter===c?"var(--orange)":"rgba(255,255,255,0.05)", color:catFilter===c?"white":"rgba(255,255,255,0.4)" }}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={{ border:"1px solid rgba(255,255,255,0.07)" }}>
        <div className="grid text-[10px] font-bold tracking-widest px-5 py-3"
             style={{ gridTemplateColumns:"2fr 1fr 1fr auto auto", background:"rgba(255,255,255,0.03)", color:"rgba(255,255,255,0.3)", borderBottom:"1px solid rgba(255,255,255,0.07)" }}>
          <span>TITLE</span><span>CATEGORY</span><span>DATE</span><span>STATUS</span><span>ACTIONS</span>
        </div>
        {visible.length === 0 && (
          <div className="py-12 text-center text-sm" style={{ color:"rgba(255,255,255,0.3)" }}>No activities found</div>
        )}
        {visible.map(a=>(
          <div key={a.id} className="grid items-center px-5 py-3.5 transition-colors"
               style={{ gridTemplateColumns:"2fr 1fr 1fr auto auto", borderBottom:"1px solid rgba(255,255,255,0.04)" }}
               onMouseEnter={e=>(e.currentTarget.style.background="rgba(255,255,255,0.02)")}
               onMouseLeave={e=>(e.currentTarget.style.background="")}>
            <div className="flex items-center gap-2.5 pr-4">
              <span className="text-lg">{a.emoji}</span>
              <div>
                <div className="text-sm font-semibold text-white flex items-center gap-1.5">
                  {a.title}
                  {a.featured && <Star size={10} fill="var(--orange)" style={{ color:"var(--orange)" }} />}
                </div>
                <div className="text-[10px] mt-0.5 line-clamp-1" style={{ color:"rgba(255,255,255,0.3)" }}>{a.description}</div>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold w-fit"
                  style={{ background:"rgba(249,115,22,0.1)", color:"var(--orange)" }}>{a.category}</span>
            <span className="text-xs" style={{ color:"rgba(255,255,255,0.4)" }}>{a.date}</span>
            <button onClick={()=>update({...a,published:!a.published})} className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-colors"
                    style={{ background:a.published?"rgba(34,197,94,0.1)":"rgba(255,255,255,0.05)", color:a.published?"#22c55e":"rgba(255,255,255,0.3)" }}>
              {a.published ? <Eye size={10}/> : <EyeOff size={10}/>} {a.published?"Live":"Draft"}
            </button>
            <div className="flex gap-2 justify-end">
              <button onClick={()=>openEdit(a)} className="p-1.5 rounded-lg transition-colors"
                      style={{ background:"rgba(249,115,22,0.1)" }}
                      onMouseEnter={e=>(e.currentTarget.style.background="rgba(249,115,22,0.25)")}
                      onMouseLeave={e=>(e.currentTarget.style.background="rgba(249,115,22,0.1)")}>
                <Edit3 size={12} style={{ color:"var(--orange)" }}/>
              </button>
              <button onClick={()=>{ if(confirm("Delete this activity?")) { remove(a.id); showToast("Deleted."); }}}
                      className="p-1.5 rounded-lg transition-colors" style={{ background:"rgba(239,68,68,0.1)" }}
                      onMouseEnter={e=>(e.currentTarget.style.background="rgba(239,68,68,0.25)")}
                      onMouseLeave={e=>(e.currentTarget.style.background="rgba(239,68,68,0.1)")}>
                <Trash2 size={12} style={{ color:"#ef4444" }}/>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modal && (
        <Modal title={modal==="add"?"Add New Activity":"Edit Activity"} onClose={()=>setModal(null)}>
          <form onSubmit={submit} className="flex flex-col gap-4">
            {/* Emoji picker */}
            <Field label="ICON">
              <div className="flex flex-wrap gap-2">
                {EMOJIS.map(e=>(
                  <button type="button" key={e} onClick={()=>f("emoji",e)}
                          className="w-9 h-9 rounded-lg text-lg transition-all"
                          style={{ background:form.emoji===e?"rgba(249,115,22,0.2)":"rgba(255,255,255,0.05)", border:`1px solid ${form.emoji===e?"var(--orange)":"transparent"}` }}>
                    {e}
                  </button>
                ))}
              </div>
            </Field>
            <Field label="TITLE" required><Input value={form.title} onChange={e=>f("title",e.target.value)} placeholder="Activity title" required /></Field>
            <Field label="DESCRIPTION"><Textarea value={form.description} onChange={e=>f("description",e.target.value)} placeholder="Short description…" rows={3}/></Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="CATEGORY">
                <Select value={form.category} onChange={e=>f("category",e.target.value)}>
                  {CATEGORIES.map(c=><option key={c}>{c}</option>)}
                </Select>
              </Field>
              <Field label="DATE"><Input type="date" value={form.date} onChange={e=>f("date",e.target.value)}/></Field>
            </div>
            <div className="flex gap-6">
              <Toggle checked={form.published} onChange={v=>f("published",v)} label="Published (Live)" />
              <Toggle checked={form.featured}  onChange={v=>f("featured",v)}  label="Featured" />
            </div>
            <SaveBtn label={modal==="add"?"Add Activity":"Save Changes"} />
          </form>
        </Modal>
      )}
    </div>
  );
}
