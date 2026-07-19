"use client";
import { useState } from "react";
import { Trash2, Mail, MailOpen, Reply, Phone, ChevronDown, ChevronUp, Search } from "lucide-react";
import type { Message } from "../types";

interface Props {
  messages: Message[];
  markRead: (id:string)=>void;
  deleteMsg: (id:string)=>void;
}

const TYPES = ["Coal Trading Inquiry","Port Operations","Logistics Partnership","CSR Collaboration","General Inquiry"];

const TYPE_COLORS: Record<string,string> = {
  "Coal Trading Inquiry": "#F97316",
  "Port Operations":      "#3b82f6",
  "Logistics Partnership":"#8b5cf6",
  "CSR Collaboration":    "#22c55e",
  "General Inquiry":      "#6b7280",
};

export default function MessagesSection({ messages, markRead, deleteMsg }: Props) {
  const [expanded, setExpanded] = useState<string|null>(null);
  const [filter,   setFilter]   = useState<"all"|"unread"|"read">("all");
  const [typeFilter, setTypeFilter] = useState("All");
  const [search, setSearch] = useState("");

  const toggle = (m:Message) => {
    setExpanded(e => e === m.id ? null : m.id);
    if (!m.read) markRead(m.id);
  };
  const unread = messages.filter(m=>!m.read).length;
  const visible = messages.filter(m=>
    (filter==="all" ? true : filter==="unread" ? !m.read : m.read) &&
    (typeFilter==="All" || m.type===typeFilter) &&
    (search==="" || m.name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase()) || m.message.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
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

      {/* Search + type filter */}
      <div className="flex items-center gap-3 mb-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color:"rgba(0,0,0,0.3)" }}/>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search name, email or message…"
                 className="w-full pl-8 pr-3 py-2 rounded-xl text-xs outline-none"
                 style={{ background:"rgba(0,0,0,0.04)", border:"1px solid rgba(0,0,0,0.1)", color:"#111111" }}/>
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {["All", ...TYPES].map(t=>(
            <button key={t} onClick={()=>setTypeFilter(t)}
                    className="px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-all"
                    style={{
                      background: typeFilter===t ? (TYPE_COLORS[t]||"var(--orange)") : "rgba(0,0,0,0.04)",
                      color:      typeFilter===t ? "white" : "rgba(0,0,0,0.5)",
                    }}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        {visible.length === 0 && (
          <div className="py-12 text-center rounded-2xl" style={{ background:"rgba(0,0,0,0.02)", border:"1px solid rgba(0,0,0,0.07)", color:"rgba(0,0,0,0.4)", fontSize:13 }}>
            No messages in this category
          </div>
        )}
        {visible.map(m=>{
          const isOpen = expanded === m.id;
          const color = TYPE_COLORS[m.type] || "#6b7280";
          return (
            <div key={m.id} className="group rounded-2xl overflow-hidden transition-all"
                 style={{ background:m.read?"rgba(0,0,0,0.02)":"rgba(249,115,22,0.05)", border:`1px solid ${isOpen ? color+"50" : m.read?"rgba(0,0,0,0.07)":"rgba(249,115,22,0.2)"}` }}>

              {/* Row header — click to expand */}
              <div onClick={()=>toggle(m)} className="flex items-start gap-4 p-4 cursor-pointer select-none">
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
                            style={{ background:`${color}15`, color }}>
                        {m.type}
                      </span>
                      {!m.read && <div className="w-1.5 h-1.5 rounded-full" style={{ background:"var(--orange)" }}/>}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px]" style={{ color:"rgba(0,0,0,0.3)" }}>{m.date}</span>
                      <button onClick={e=>{e.stopPropagation(); if(confirm("Delete this message? This cannot be undone.")) deleteMsg(m.id);}}
                              className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                              style={{ background:"rgba(239,68,68,0.1)" }}
                              onMouseEnter={e=>{e.stopPropagation();e.currentTarget.style.background="rgba(239,68,68,0.25)";e.currentTarget.style.opacity="1"}}
                              onMouseLeave={e=>{e.currentTarget.style.background="rgba(239,68,68,0.1)"}}>
                        <Trash2 size={11} style={{ color:"#ef4444" }}/>
                      </button>
                      {isOpen ? <ChevronUp size={14} style={{ color:"rgba(0,0,0,0.35)" }}/> : <ChevronDown size={14} style={{ color:"rgba(0,0,0,0.35)" }}/>}
                    </div>
                  </div>
                  <p className="text-[10px]" style={{ color:"rgba(0,0,0,0.4)" }}>
                    {m.email}{m.phone && ` · ${m.phone}`}
                  </p>
                  {!isOpen && (
                    <p className="text-[11px] mt-1.5 line-clamp-2 leading-relaxed" style={{ color:"rgba(0,0,0,0.55)" }}>{m.message}</p>
                  )}
                </div>
              </div>

              {/* Expanded detail */}
              {isOpen && (
                <div className="px-4 pb-4" style={{ borderTop:`1px solid ${color}18` }} onClick={e=>e.stopPropagation()}>
                  <div className="p-4 mt-3 rounded-xl text-sm leading-relaxed" style={{ background:"rgba(0,0,0,0.03)", border:"1px solid rgba(0,0,0,0.08)", color:"rgba(0,0,0,0.75)" }}>
                    {m.message}
                  </div>
                  <div className="flex gap-3 mt-3">
                    <a href={`mailto:${m.email}?subject=${encodeURIComponent(`Re: ${m.type}`)}&body=${encodeURIComponent(`Hi ${m.name},\n\nThanks for reaching out about "${m.type}".\n\n\n\n---\nYour original message (${m.date}):\n${m.message}`)}`}
                       className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-white transition-all"
                       style={{ background:"var(--orange)" }}
                       onMouseEnter={e=>(e.currentTarget.style.boxShadow="0 8px 24px rgba(249,115,22,0.35)")}
                       onMouseLeave={e=>(e.currentTarget.style.boxShadow="")}>
                      <Reply size={14}/> Reply via Email
                    </a>
                    {m.phone && (
                      <a href={`tel:${m.phone}`}
                         className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all"
                         style={{ background:"rgba(34,197,94,0.1)", color:"#22c55e" }}
                         onMouseEnter={e=>(e.currentTarget.style.background="rgba(34,197,94,0.2)")}
                         onMouseLeave={e=>(e.currentTarget.style.background="rgba(34,197,94,0.1)")}>
                        <Phone size={14}/> Call
                      </a>
                    )}
                    <button onClick={()=>{ if(confirm("Delete message? This cannot be undone.")){ deleteMsg(m.id); setExpanded(null); }}}
                            className="px-4 py-2.5 rounded-xl text-sm font-bold transition-all"
                            style={{ background:"rgba(239,68,68,0.1)", color:"#ef4444" }}
                            onMouseEnter={e=>(e.currentTarget.style.background="rgba(239,68,68,0.2)")}
                            onMouseLeave={e=>(e.currentTarget.style.background="rgba(239,68,68,0.1)")}>
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
