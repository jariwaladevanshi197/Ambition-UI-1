"use client";
import type { Activity, School, Product, Message, MediaFile } from "../types";
import { BarChart2, Users, Package, Image, Mail, Globe, TrendingUp, Activity as ActivityIcon } from "lucide-react";

interface Props {
  activities: Activity[];
  schools: School[];
  products: Product[];
  messages: Message[];
  media: MediaFile[];
  unreadCount: number;
}

export default function DashboardSection({ activities, schools, products, messages, media, unreadCount }: Props) {
  const published = activities.filter(a=>a.published).length;
  const activeSchools = schools.filter(s=>s.status==="Active").length;
  const totalStudents = schools.reduce((s,x)=>s+(x.beneficiaries??0),0);

  const stats = [
    { label:"Activities",     value:activities.length,        sub:`${published} published`,       icon:<ActivityIcon size={18}/>,   color:"#F97316" },
    { label:"CSR Schools",    value:schools.length,           sub:`${activeSchools} active`,       icon:<Globe size={18}/>,      color:"#3b82f6" },
    { label:"Beneficiaries",  value:totalStudents.toLocaleString(), sub:"across all CSR projects",icon:<Users size={18}/>,      color:"#8b5cf6" },
    { label:"Products",       value:products.length,          sub:`${products.filter(p=>p.featured).length} featured`, icon:<Package size={18}/>, color:"#22c55e" },
    { label:"Media Files",    value:media.length,             sub:"in library",                   icon:<Image size={18}/>,      color:"#f59e0b" },
    { label:"Unread Messages",value:unreadCount,              sub:`of ${messages.length} total`,  icon:<Mail size={18}/>,       color:unreadCount>0?"#ef4444":"#6b7280" },
  ];

  const recent = [...messages].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,4);
  const recentActivities = [...activities].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,4);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-black text-gray-900">Dashboard</h1>
        <p className="text-xs mt-0.5" style={{ color:"rgba(0,0,0,0.4)" }}>Overview of your website content</p>
      </div>

      {/* Stats grid */}
      <div className="grid gap-3 mb-6" style={{ gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))" }}>
        {stats.map(s=>(
          <div key={s.label} className="p-4 rounded-2xl transition-all"
               style={{ background:"#ffffff", border:"1px solid rgba(0,0,0,0.08)" }}
               onMouseEnter={e=>(e.currentTarget.style.borderColor=`${s.color}40`)}
               onMouseLeave={e=>(e.currentTarget.style.borderColor="rgba(0,0,0,0.08)")}>
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                   style={{ background:`${s.color}15`, color:s.color }}>
                {s.icon}
              </div>
              <TrendingUp size={12} style={{ color:"rgba(0,0,0,0.15)" }}/>
            </div>
            <div className="text-2xl font-black text-gray-900 mb-0.5">{s.value}</div>
            <div className="text-[10px] font-bold mb-0.5" style={{ color:"rgba(0,0,0,0.55)" }}>{s.label}</div>
            <div className="text-[9px]" style={{ color:"rgba(0,0,0,0.35)" }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Two column — recent */}
      <div className="grid grid-cols-2 gap-4">
        {/* Recent messages */}
        <div className="rounded-2xl p-5" style={{ background:"#ffffff", border:"1px solid rgba(0,0,0,0.08)" }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-bold text-gray-900">Recent Messages</span>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[9px] font-black text-white" style={{ background:"var(--orange)" }}>{unreadCount} new</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            {recent.map(m=>(
              <div key={m.id} className="flex items-start gap-3 p-3 rounded-xl transition-colors"
                   style={{ background:"rgba(0,0,0,0.02)" }}
                   onMouseEnter={e=>(e.currentTarget.style.background="rgba(0,0,0,0.05)")}
                   onMouseLeave={e=>(e.currentTarget.style.background="rgba(0,0,0,0.02)")}>
                <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                     style={{ background:m.read?"rgba(0,0,0,0.2)":"var(--orange)" }}/>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold truncate" style={{ color:m.read?"rgba(0,0,0,0.5)":"#111111" }}>{m.name}</div>
                  <div className="text-[10px] truncate mt-0.5" style={{ color:"rgba(0,0,0,0.35)" }}>{m.message}</div>
                </div>
                <span className="text-[9px] shrink-0" style={{ color:"rgba(0,0,0,0.3)" }}>{m.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent activities */}
        <div className="rounded-2xl p-5" style={{ background:"#ffffff", border:"1px solid rgba(0,0,0,0.08)" }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-bold text-gray-900">Recent Activities</span>
          </div>
          <div className="flex flex-col gap-2">
            {recentActivities.map(a=>(
              <div key={a.id} className="flex items-start gap-3 p-3 rounded-xl transition-colors"
                   style={{ background:"rgba(0,0,0,0.02)" }}
                   onMouseEnter={e=>(e.currentTarget.style.background="rgba(0,0,0,0.05)")}
                   onMouseLeave={e=>(e.currentTarget.style.background="rgba(0,0,0,0.02)")}>
                <span className="text-base shrink-0">{a.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold truncate text-gray-900">{a.title}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full" style={{ background:"rgba(249,115,22,0.1)", color:"var(--orange)" }}>{a.category}</span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${a.published?"text-green-600":"text-gray-500"}`}
                          style={{ background:a.published?"rgba(34,197,94,0.1)":"rgba(0,0,0,0.05)" }}>
                      {a.published?"Live":"Draft"}
                    </span>
                  </div>
                </div>
                <span className="text-[9px] shrink-0" style={{ color:"rgba(0,0,0,0.3)" }}>{a.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
