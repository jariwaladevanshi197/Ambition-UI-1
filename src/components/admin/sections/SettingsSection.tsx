"use client";
import { useState } from "react";
import { Field, Input, Textarea, SaveBtn } from "../AdminField";
import type { CompanySettings } from "../types";

interface Props {
  settings: CompanySettings;
  save: (s:CompanySettings)=>void;
}

export default function SettingsSection({ settings, save }: Props) {
  const [form,  setForm]  = useState<CompanySettings>({...settings});
  const [toast, setToast] = useState("");

  const f = (k:keyof CompanySettings, v:string) => setForm(p=>({...p,[k]:v}));

  const submit = (e:React.FormEvent) => {
    e.preventDefault();
    save(form);
    setToast("Settings saved!"); setTimeout(()=>setToast(""),2500);
  };

  return (
    <div>
      {toast && (
        <div className="fixed top-20 right-6 z-50 px-4 py-3 rounded-xl text-sm font-bold text-white"
             style={{ background:"var(--orange)", boxShadow:"0 8px 24px rgba(249,115,22,0.35)" }}>✓ {toast}</div>
      )}

      <div className="mb-6">
        <h1 className="text-xl font-black text-white">Company Settings</h1>
        <p className="text-xs mt-0.5" style={{ color:"rgba(255,255,255,0.3)" }}>Core information used across the website</p>
      </div>

      <form onSubmit={submit} className="max-w-xl flex flex-col gap-5">
        <div className="p-5 rounded-2xl flex flex-col gap-4" style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)" }}>
          <div className="text-[10px] font-black tracking-widest mb-1" style={{ color:"var(--orange)" }}>BRAND</div>
          <Field label="COMPANY NAME"><Input value={form.name} onChange={e=>f("name",e.target.value)} placeholder="Ambition Coal & Mining Ltd."/></Field>
          <Field label="TAGLINE"><Input value={form.tagline} onChange={e=>f("tagline",e.target.value)} placeholder="Powering Industries…"/></Field>
          <Field label="ESTABLISHED YEAR"><Input value={form.estYear} onChange={e=>f("estYear",e.target.value)} placeholder="2003"/></Field>
        </div>

        <div className="p-5 rounded-2xl flex flex-col gap-4" style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)" }}>
          <div className="text-[10px] font-black tracking-widest mb-1" style={{ color:"var(--orange)" }}>CONTACT</div>
          <Field label="EMAIL"><Input type="email" value={form.email} onChange={e=>f("email",e.target.value)} placeholder="info@ambitioncoal.co.in"/></Field>
          <Field label="PHONE"><Input value={form.phone} onChange={e=>f("phone",e.target.value)} placeholder="+91 22 XXXX XXXX"/></Field>
          <Field label="ADDRESS">
            <textarea value={form.address} onChange={e=>f("address",e.target.value)} rows={2}
                      placeholder="Full registered address…"
                      className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none resize-none"
                      style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", color:"white" }}/>
          </Field>
        </div>

        <div className="p-5 rounded-2xl flex flex-col gap-4" style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)" }}>
          <div className="text-[10px] font-black tracking-widest mb-1" style={{ color:"var(--orange)" }}>SOCIAL LINKS</div>
          <Field label="LINKEDIN URL"><Input value={form.linkedin} onChange={e=>f("linkedin",e.target.value)} placeholder="https://linkedin.com/company/…"/></Field>
          <Field label="TWITTER / X URL"><Input value={form.twitter} onChange={e=>f("twitter",e.target.value)} placeholder="https://twitter.com/…"/></Field>
          <Field label="YOUTUBE URL"><Input value={form.youtube} onChange={e=>f("youtube",e.target.value)} placeholder="https://youtube.com/@…"/></Field>
        </div>

        <SaveBtn label="Save Settings"/>
      </form>
    </div>
  );
}
