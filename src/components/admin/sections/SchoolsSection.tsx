"use client";
import { useState } from "react";
import { Plus, Edit3, Trash2, MapPin, Users } from "lucide-react";
import Modal from "../Modal";
import { Field, Input, Textarea, Select, SaveBtn } from "../AdminField";
import type { School } from "../types";

const PROJECT_TYPES = [
  "School","Healthcare","Community Centre","Water & Sanitation",
  "Women Empowerment","Environment","Infrastructure","Sports & Culture","Other",
];

const PROJECT_EMOJIS: Record<string, string> = {
  "School":"🏫","Healthcare":"🏥","Community Centre":"🤝",
  "Water & Sanitation":"💧","Women Empowerment":"👩",
  "Environment":"🌳","Infrastructure":"🏗️","Sports & Culture":"🎨","Other":"📌",
};

const STATES = [
  "Jharkhand","Maharashtra","Chhattisgarh","Andhra Pradesh","Odisha",
  "Madhya Pradesh","West Bengal","Bihar","Uttar Pradesh","Rajasthan","Other",
];

const BENEFICIARY_LABELS: Record<string, string> = {
  "School":"Students",
  "Healthcare":"Patients / Beneficiaries",
  "Community Centre":"Community Members",
  "Water & Sanitation":"Villagers",
  "Women Empowerment":"Women",
  "Environment":"Hectares / Trees (optional)",
  "Infrastructure":"Households",
  "Sports & Culture":"Participants",
  "Other":"Beneficiaries",
};

const blank = (): School => ({
  id: Date.now().toString(), name:"", projectType:"School", location:"",
  state:"", beneficiaries:0, description:"", status:"Active", emoji:"🏫",
});

interface Props {
  schools: School[];
  add: (s:School)=>void;
  update: (s:School)=>void;
  remove: (id:string)=>void;
}

export default function SchoolsSection({ schools, add, update, remove }: Props) {
  const [modal,      setModal]   = useState<"add"|"edit"|null>(null);
  const [form,       setForm]    = useState<School>(blank());
  const [toast,      setToast]   = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [search,     setSearch]  = useState("");

  const showToast = (msg:string) => { setToast(msg); setTimeout(()=>setToast(""),2500); };
  const f = (k:keyof School, v:unknown) => {
    setForm(p=>{
      const next = {...p,[k]:v} as School;
      if(k==="projectType") next.emoji = PROJECT_EMOJIS[v as string] ?? "📌";
      return next;
    });
  };

  const openAdd  = () => { setForm(blank()); setModal("add"); };
  const openEdit = (s:School) => { setForm({...s}); setModal("edit"); };

  const submit = (e:React.FormEvent) => {
    e.preventDefault();
    if(!form.name.trim()) return;
    modal==="add" ? add({...form, id:Date.now().toString()}) : update(form);
    setModal(null);
    showToast(modal==="add"?"Project added!":"Project updated!");
  };

  const types = ["All", ...PROJECT_TYPES];
  const visible = schools.filter(s=>
    (typeFilter==="All" || s.projectType===typeFilter) &&
    (s.name.toLowerCase().includes(search.toLowerCase()) || s.location.toLowerCase().includes(search.toLowerCase()))
  );

  const totalBeneficiaries = schools.reduce((n,s)=>n+s.beneficiaries,0);

  return (
    <div>
      {toast && (
        <div className="fixed top-20 right-6 z-50 px-4 py-3 rounded-xl text-sm font-bold text-white"
             style={{ background:"var(--orange)", boxShadow:"0 8px 24px rgba(249,115,22,0.35)" }}>✓ {toast}</div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-black text-white">CSR Projects</h1>
          <p className="text-xs mt-0.5" style={{ color:"rgba(255,255,255,0.3)" }}>
            {schools.length} projects · {totalBeneficiaries.toLocaleString()} total beneficiaries
          </p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white"
                style={{ background:"var(--orange)" }}
                onMouseEnter={e=>(e.currentTarget.style.boxShadow="0 8px 24px rgba(249,115,22,0.35)")}
                onMouseLeave={e=>(e.currentTarget.style.boxShadow="")}>
          <Plus size={15}/> Add Project
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid gap-3 mb-5" style={{ gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))" }}>
        {PROJECT_TYPES.filter(t=>schools.some(s=>s.projectType===t)).map(t=>{
          const count = schools.filter(s=>s.projectType===t).length;
          const bene  = schools.filter(s=>s.projectType===t).reduce((n,s)=>n+s.beneficiaries,0);
          return (
            <button key={t} onClick={()=>setTypeFilter(typeFilter===t?"All":t)}
                    className="p-3.5 rounded-2xl text-left transition-all"
                    style={{ background:typeFilter===t?"rgba(249,115,22,0.12)":"rgba(255,255,255,0.03)", border:`1px solid ${typeFilter===t?"rgba(249,115,22,0.3)":"rgba(255,255,255,0.07)"}` }}>
              <div className="text-2xl mb-2">{PROJECT_EMOJIS[t]}</div>
              <div className="text-sm font-black" style={{ color:typeFilter===t?"var(--orange)":"white" }}>{count}</div>
              <div className="text-[10px] font-bold mt-0.5" style={{ color:typeFilter===t?"var(--orange)":"rgba(255,255,255,0.4)" }}>{t}</div>
              <div className="text-[9px] mt-0.5" style={{ color:"rgba(255,255,255,0.2)" }}>{bene.toLocaleString()} beneficiaries</div>
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div className="flex gap-3 mb-4">
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by name or location…"
               className="flex-1 px-3 py-2 rounded-xl text-xs outline-none"
               style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)", color:"white" }}/>
        {typeFilter!=="All" && (
          <button onClick={()=>setTypeFilter("All")} className="px-3 py-2 rounded-xl text-xs font-bold"
                  style={{ background:"rgba(249,115,22,0.12)", color:"var(--orange)" }}>
            ✕ {typeFilter}
          </button>
        )}
      </div>

      {/* Project list */}
      <div className="grid gap-3">
        {visible.length===0 && (
          <div className="py-12 text-center rounded-2xl text-sm" style={{ background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.06)", color:"rgba(255,255,255,0.3)" }}>
            No projects found
          </div>
        )}
        {visible.map(s=>(
          <div key={s.id} className="rounded-2xl p-5 transition-colors"
               style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)" }}
               onMouseEnter={e=>(e.currentTarget.style.background="rgba(255,255,255,0.05)")}
               onMouseLeave={e=>(e.currentTarget.style.background="rgba(255,255,255,0.03)")}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                     style={{ background:"rgba(249,115,22,0.1)" }}>
                  {s.emoji || PROJECT_EMOJIS[s.projectType] || "📌"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center flex-wrap gap-2 mb-1">
                    <span className="font-bold text-white text-sm">{s.name}</span>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold"
                          style={{ background:"rgba(249,115,22,0.1)", color:"var(--orange)" }}>
                      {s.projectType}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold`}
                          style={{ background:s.status==="Active"?"rgba(34,197,94,0.1)":"rgba(239,68,68,0.1)", color:s.status==="Active"?"#22c55e":"#ef4444" }}>
                      {s.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-[11px] mb-1.5" style={{ color:"rgba(255,255,255,0.4)" }}>
                    <span className="flex items-center gap-1"><MapPin size={10}/> {s.location}{s.state ? `, ${s.state}` : ""}</span>
                    {s.beneficiaries > 0 && (
                      <span className="flex items-center gap-1">
                        <Users size={10}/> {s.beneficiaries.toLocaleString()} {BENEFICIARY_LABELS[s.projectType]||"beneficiaries"}
                      </span>
                    )}
                  </div>
                  {s.description && (
                    <p className="text-[11px] leading-relaxed" style={{ color:"rgba(255,255,255,0.35)" }}>{s.description}</p>
                  )}
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={()=>openEdit(s)} className="p-2 rounded-lg" style={{ background:"rgba(249,115,22,0.1)" }}
                        onMouseEnter={e=>(e.currentTarget.style.background="rgba(249,115,22,0.25)")}
                        onMouseLeave={e=>(e.currentTarget.style.background="rgba(249,115,22,0.1)")}>
                  <Edit3 size={13} style={{ color:"var(--orange)" }}/>
                </button>
                <button onClick={()=>{ if(confirm("Remove this project?")){ remove(s.id); showToast("Removed."); }}}
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

      {/* Modal */}
      {modal && (
        <Modal title={modal==="add"?"Add CSR Project":"Edit CSR Project"} onClose={()=>setModal(null)}>
          <form onSubmit={submit} className="flex flex-col gap-4">
            {/* Type picker */}
            <Field label="PROJECT TYPE">
              <div className="grid gap-2" style={{ gridTemplateColumns:"repeat(3,1fr)" }}>
                {PROJECT_TYPES.map(t=>(
                  <button type="button" key={t} onClick={()=>f("projectType",t)}
                          className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold transition-all"
                          style={{ background:form.projectType===t?"rgba(249,115,22,0.15)":"rgba(255,255,255,0.04)", border:`1px solid ${form.projectType===t?"var(--orange)":"transparent"}`, color:form.projectType===t?"var(--orange)":"rgba(255,255,255,0.5)" }}>
                    <span>{PROJECT_EMOJIS[t]}</span> {t}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="PROJECT / INITIATIVE NAME" required>
              <Input value={form.name} onChange={e=>f("name",e.target.value)} placeholder={`e.g. Govt. School Dhanbad, Free Medical Camp…`} required/>
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="LOCATION / CITY">
                <Input value={form.location} onChange={e=>f("location",e.target.value)} placeholder="City or village"/>
              </Field>
              <Field label="STATE">
                <Select value={form.state} onChange={e=>f("state",e.target.value)}>
                  <option value="">Select state…</option>
                  {STATES.map(st=><option key={st}>{st}</option>)}
                </Select>
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field label={`${(BENEFICIARY_LABELS[form.projectType]||"BENEFICIARIES").toUpperCase()}`}>
                <Input type="number" value={form.beneficiaries} onChange={e=>f("beneficiaries",Number(e.target.value))} min={0} placeholder="0"/>
              </Field>
              <Field label="STATUS">
                <Select value={form.status} onChange={e=>f("status",e.target.value as "Active"|"Inactive")}>
                  <option>Active</option><option>Inactive</option>
                </Select>
              </Field>
            </div>

            <Field label="DESCRIPTION">
              <Textarea value={form.description} onChange={e=>f("description",e.target.value)} rows={3} placeholder="What was done, impact achieved…"/>
            </Field>

            <SaveBtn label={modal==="add"?"Add Project":"Save Changes"}/>
          </form>
        </Modal>
      )}
    </div>
  );
}
