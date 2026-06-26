"use client";
import { useState } from "react";
import { Trash2, Mail, MailOpen, Reply } from "lucide-react";
import Modal from "../Modal";
import type { Message } from "../types";

interface Props {
  messages: Message[];
  markRead: (id:string)=>void;
  deleteMsg: (id:string)=>void;
}

const TYPE_COLORS: Record<string,string> = {
  "Coal Trading Inquiry": "#F97316",
  "Port Operations":      "#3b82f6",
  "Logistics Partnership":"#8b5cf6",
  "CSR Collaboration":    "#22c55e",
  "General Inquiry":      "#6b7280",
};

export default function MessagesSection({ messages, markRead, deleteMsg }: Props) {
  const [selected, setSelected] = useState<Message|null>(null);
  const [filter,   setFilter]   = useState<"all"|"unread"|"read">("all");

  const open = (m:Message) => { setSelected(m); if(!m.read) markRead(m.id); };
  const unread = messages.filter(m=>!m.read).length;
  const visible = messages.filter(m=>filter==="all" ? true : filter==="unread" ? !m.read : m.read);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-black text-gray-900 flex items-center gap-2">
            Messages
            {unread > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black text-white" style={{ background:"var(--orange)" }}>{unread}</span>
            )}
          </h1>
          <p className="text-xs mt-0.5" style={{ color:"rgba(0,0,0,0.4)" }}>{messages.length} total · {unread} unread</p>
        </div>
        <div className="flex gap-1.5">
          {(["all","unread","read"] as const).map(f=>(
            <button key={f} onClick={()=>setFilter(f)}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all"
                    style={{ background:filter===f?"var(--orange)":"rgba(0,0,0,0.05)", color:filter===f?"white":"rgba(0,0,0,0.55)" }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-2">
        {visible.length === 0 && (
          <div className="py-12 text-center rounded-2xl" style={{ background:"rgba(0,0,0,0.02)", border:"1px solid rgba(0,0,0,0.07)", color:"rgba(0,0,0,0.4)", fontSize:13 }}>
            No messages in this category
          </div>
        )}
        {visible.map(m=>(
          <div key={m.id} onClick={()=>open(m)} className="flex items-start gap-4 p-4 rounded-2xl cursor-pointer transition-all"
               style={{ background:m.read?"rgba(0,0,0,0.02)":"rgba(249,115,22,0.05)", border:`1px solid ${m.read?"rgba(0,0,0,0.07)":"rgba(249,115,22,0.2)"}` }}
               onMouseEnter={e=>(e.currentTarget.style.background=m.read?"rgba(0,0,0,0.04)":"rgba(249,115,22,0.09)")}
               onMouseLeave={e=>(e.currentTarget.style.background=m.read?"rgba(0,0,0,0.02)":"rgba(249,115,22,0.05)")}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                 style={{ background:"rgba(0,0,0,0.05)" }}>
              {m.read ? <MailOpen size={15} style={{ color:"rgba(0,0,0,0.35)" }}/> : <Mail size={15} style={{ color:"var(--orange)" }}/>}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-bold ${m.read?"":"text-gray-900"}`} style={{ color:m.read?"rgba(0,0,0,0.55)":undefined }}>
                    {m.name}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold"
                        style={{ background:`${TYPE_COLORS[m.type]||"#6b7280"}15`, color:TYPE_COLORS[m.type]||"#6b7280" }}>
                    {m.type}
                  </span>
                  {!m.read && <div className="w-1.5 h-1.5 rounded-full" style={{ background:"var(--orange)" }}/>}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px]" style={{ color:"rgba(0,0,0,0.3)" }}>{m.date}</span>
                  <button onClick={e=>{e.stopPropagation(); if(confirm("Delete this message?")) deleteMsg(m.id);}}
                          className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                          style={{ background:"rgba(239,68,68,0.1)" }}
                          onMouseEnter={e=>{e.stopPropagation();e.currentTarget.style.background="rgba(239,68,68,0.25)";e.currentTarget.style.opacity="1"}}
                          onMouseLeave={e=>{e.currentTarget.style.background="rgba(239,68,68,0.1)"}}>
                    <Trash2 size={11} style={{ color:"#ef4444" }}/>
                  </button>
                </div>
              </div>
              <p className="text-[10px]" style={{ color:"rgba(0,0,0,0.4)" }}>{m.email}</p>
              <p className="text-[11px] mt-1.5 line-clamp-2 leading-relaxed" style={{ color:"rgba(0,0,0,0.55)" }}>{m.message}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Message detail modal */}
      {selected && (
        <Modal title="Message" onClose={()=>setSelected(null)} width="600px">
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-bold text-gray-900 text-base">{selected.name}</div>
                <div className="text-xs mt-0.5" style={{ color:"rgba(0,0,0,0.5)" }}>{selected.email}</div>
              </div>
              <div className="text-right">
                <div className="px-2.5 py-1 rounded-full text-[10px] font-bold"
                     style={{ background:`${TYPE_COLORS[selected.type]||"#6b7280"}15`, color:TYPE_COLORS[selected.type]||"#6b7280" }}>
                  {selected.type}
                </div>
                <div className="text-[10px] mt-1" style={{ color:"rgba(0,0,0,0.35)" }}>{selected.date}</div>
              </div>
            </div>
            <div className="p-4 rounded-xl text-sm leading-relaxed" style={{ background:"rgba(0,0,0,0.03)", border:"1px solid rgba(0,0,0,0.08)", color:"rgba(0,0,0,0.75)" }}>
              {selected.message}
            </div>
            <div className="flex gap-3">
              <a href={`mailto:${selected.email}?subject=Re: ${selected.type}`}
                 className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-white transition-all"
                 style={{ background:"var(--orange)" }}
                 onMouseEnter={e=>(e.currentTarget.style.boxShadow="0 8px 24px rgba(249,115,22,0.35)")}
                 onMouseLeave={e=>(e.currentTarget.style.boxShadow="")}>
                <Reply size={14}/> Reply via Email
              </a>
              <button onClick={()=>{ if(confirm("Delete message?")){ deleteMsg(selected.id); setSelected(null); }}}
                      className="px-4 py-2.5 rounded-xl text-sm font-bold transition-all"
                      style={{ background:"rgba(239,68,68,0.1)", color:"#ef4444" }}
                      onMouseEnter={e=>(e.currentTarget.style.background="rgba(239,68,68,0.2)")}
                      onMouseLeave={e=>(e.currentTarget.style.background="rgba(239,68,68,0.1)")}>
                Delete
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
