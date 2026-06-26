"use client";
import { useState } from "react";
import { Edit3, Eye, EyeOff, Globe } from "lucide-react";
import Modal from "../Modal";
import { Field, Input, Textarea, Toggle, SaveBtn } from "../AdminField";
import type { PageContent } from "../types";

interface Props {
  pages: PageContent[];
  update: (p:PageContent)=>void;
}

export default function PagesSection({ pages, update }: Props) {
  const [editing, setEditing] = useState<PageContent|null>(null);
  const [toast,   setToast]   = useState("");

  const showToast = (msg:string) => { setToast(msg); setTimeout(()=>setToast(""),2500); };
  const f = (k:keyof PageContent, v:unknown) => setEditing(p=>p?({...p,[k]:v}):p);

  const submit = (e:React.FormEvent) => {
    e.preventDefault();
    if(!editing) return;
    update({...editing, lastEdited: new Date().toISOString().split("T")[0]});
    setEditing(null);
    showToast("Page saved!");
  };

  const PAGE_ICONS: Record<string,string> = { "/":"🏠", "/about":"🏭", "/services":"⚙️", "/activities":"🤝", "/contact":"📬" };

  return (
    <div>
      {toast && (
        <div className="fixed top-20 right-6 z-50 px-4 py-3 rounded-xl text-sm font-bold text-white"
             style={{ background:"var(--orange)", boxShadow:"0 8px 24px rgba(249,115,22,0.35)" }}>✓ {toast}</div>
      )}

      <div className="mb-6">
        <h1 className="text-xl font-black text-gray-900">Pages</h1>
        <p className="text-xs mt-0.5" style={{ color:"rgba(0,0,0,0.4)" }}>Edit hero headlines, subtext, and publish status for each page</p>
      </div>

      <div className="grid gap-3">
        {pages.map(p=>(
          <div key={p.id} className="rounded-2xl p-5 transition-colors"
               style={{ background:"#ffffff", border:"1px solid rgba(0,0,0,0.08)" }}
               onMouseEnter={e=>(e.currentTarget.style.background="rgba(0,0,0,0.02)")}
               onMouseLeave={e=>(e.currentTarget.style.background="#ffffff")}>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
                     style={{ background:"rgba(249,115,22,0.1)" }}>
                  {PAGE_ICONS[p.slug]||"📄"}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-bold text-gray-900 text-sm">{p.title}</span>
                    <code className="text-[9px] px-1.5 py-0.5 rounded font-mono" style={{ background:"rgba(0,0,0,0.05)", color:"rgba(0,0,0,0.5)" }}>{p.slug}</code>
                    <button onClick={()=>update({...p,published:!p.published})}
                            className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold"
                            style={{ background:p.published?"rgba(34,197,94,0.12)":"rgba(0,0,0,0.05)", color:p.published?"#22c55e":"rgba(0,0,0,0.4)" }}>
                      {p.published?<Eye size={8}/>:<EyeOff size={8}/>} {p.published?"Live":"Draft"}
                    </button>
                  </div>
                  <p className="text-[11px] truncate" style={{ color:"rgba(0,0,0,0.45)" }}>{p.heroHeadline}</p>
                  <p className="text-[10px] mt-0.5" style={{ color:"rgba(0,0,0,0.3)" }}>Last edited {p.lastEdited}</p>
                </div>
              </div>
              <button onClick={()=>setEditing({...p})} className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold shrink-0"
                      style={{ background:"rgba(249,115,22,0.1)", color:"var(--orange)" }}
                      onMouseEnter={e=>(e.currentTarget.style.background="rgba(249,115,22,0.25)")}
                      onMouseLeave={e=>(e.currentTarget.style.background="rgba(249,115,22,0.1)")}>
                <Edit3 size={12}/> Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <Modal title={`Edit — ${editing.title}`} onClose={()=>setEditing(null)}>
          <form onSubmit={submit} className="flex flex-col gap-4">
            <div className="flex items-center gap-2 p-3 rounded-xl" style={{ background:"rgba(249,115,22,0.08)", border:"1px solid rgba(249,115,22,0.15)" }}>
              <Globe size={13} style={{ color:"var(--orange)" }}/>
              <code className="text-xs" style={{ color:"var(--orange)" }}>{editing.slug}</code>
            </div>
            <Field label="HERO HEADLINE">
              <Input value={editing.heroHeadline} onChange={e=>f("heroHeadline",e.target.value)} placeholder="Main hero headline"/>
            </Field>
            <Field label="HERO SUBTEXT">
              <Textarea value={editing.heroSubtext} onChange={e=>f("heroSubtext",e.target.value)} rows={3} placeholder="Supporting subtext below headline"/>
            </Field>
            <Toggle checked={editing.published} onChange={v=>f("published",v)} label="Published (visible on website)"/>
            <SaveBtn label="Save Page"/>
          </form>
        </Modal>
      )}
    </div>
  );
}
