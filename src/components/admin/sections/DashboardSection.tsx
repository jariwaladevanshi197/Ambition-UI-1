"use client";
import type { Activity, School, Product, Message, MediaFile } from "../types";
import { CSR_CATEGORY_COLORS } from "@/lib/csrCategories";
import { ACTIVITY_ICONS, findIcon, IconChip } from "../iconRegistry";
import {
  Users, Package, Image, Mail, Globe, Activity as ActivityIcon,
  Plus, School as SchoolIcon, ArrowRight,
} from "lucide-react";

type Section =
  | "dashboard" | "pages" | "activities" | "schools"
  | "products"  | "media" | "messages"   | "settings" | "security";

interface Props {
  activities: Activity[];
  schools: School[];
  products: Product[];
  messages: Message[];
  media: MediaFile[];
  unreadCount: number;
  onNavigate: (section: Section) => void;
}

const SCHOOL_TYPE_COLORS: Record<string,string> = {
  School: CSR_CATEGORY_COLORS["Education"],
  Healthcare: CSR_CATEGORY_COLORS["Healthcare"],
  "Water & Sanitation": CSR_CATEGORY_COLORS["Water & Sanitation"],
  "Women Empowerment": CSR_CATEGORY_COLORS["Women Empowerment"],
  Environment: CSR_CATEGORY_COLORS["Environment"],
};

function BreakdownBars({ title, data }: { title: string; data: { label: string; count: number; color: string }[] }) {
  const max = Math.max(1, ...data.map(d => d.count));
  return (
    <div className="rounded-2xl p-5" style={{ background:"#ffffff", border:"1px solid rgba(0,0,0,0.08)" }}>
      <div className="text-sm font-bold text-gray-900 mb-4">{title}</div>
      {data.length === 0 ? (
        <div className="text-xs py-6 text-center" style={{ color:"rgba(0,0,0,0.35)" }}>No data yet</div>
      ) : (
        <div className="flex flex-col gap-3">
          {data.map(d => (
            <div key={d.label} className="flex items-center gap-3">
              <div className="w-28 shrink-0 text-xs font-semibold truncate" style={{ color:"rgba(0,0,0,0.6)" }} title={d.label}>
                {d.label}
              </div>
              <div className="flex-1 h-5 rounded-full overflow-hidden" style={{ background:"rgba(0,0,0,0.04)" }}>
                <div className="h-full rounded-full transition-all duration-500"
                     style={{ width:`${(d.count/max)*100}%`, background:d.color, minWidth:d.count>0?8:0 }}/>
              </div>
              <div className="w-6 shrink-0 text-xs font-bold text-right" style={{ color:"rgba(0,0,0,0.7)" }}>
                {d.count}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function DashboardSection({ activities, schools, products, messages, media, unreadCount, onNavigate }: Props) {
  const published = activities.filter(a=>a.published).length;
  const activeSchools = schools.filter(s=>s.status==="Active").length;
  const totalBeneficiaries = schools.reduce((s,x)=>s+(x.beneficiaries??0),0);

  const stats = [
    { label:"Activities",     value:activities.length,        sub:`${published} published`,       icon:<ActivityIcon size={18}/>,   color:"#F97316" },
    { label:"CSR Projects",   value:schools.length,           sub:`${activeSchools} active`,       icon:<Globe size={18}/>,      color:"#3b82f6" },
    { label:"Beneficiaries",  value:totalBeneficiaries.toLocaleString(), sub:"across all CSR projects",icon:<Users size={18}/>,      color:"#8b5cf6" },
    { label:"Products",       value:products.length,          sub:`${products.filter(p=>p.featured).length} featured`, icon:<Package size={18}/>, color:"#22c55e" },
    { label:"Media Files",    value:media.length,             sub:"in library",                   icon:<Image size={18}/>,      color:"#f59e0b" },
    { label:"Unread Messages",value:unreadCount,              sub:`of ${messages.length} total`,  icon:<Mail size={18}/>,       color:unreadCount>0?"#ef4444":"#6b7280" },
  ];

  const activityCats = Object.keys(CSR_CATEGORY_COLORS).map(cat => ({
    label: cat, color: CSR_CATEGORY_COLORS[cat],
    count: activities.filter(a=>a.category===cat).length,
  })).filter(d => d.count > 0).sort((a,b)=>b.count-a.count);

  const schoolTypes = Object.keys(SCHOOL_TYPE_COLORS).map(t => ({
    label: t, color: SCHOOL_TYPE_COLORS[t],
    count: schools.filter(s=>s.projectType===t).length,
  })).filter(d => d.count > 0).sort((a,b)=>b.count-a.count);

  const quickActions = [
    { label:"Add Activity",   Icon:ActivityIcon, color:"#F97316", section:"activities" as Section },
    { label:"Add CSR Project",Icon:SchoolIcon,   color:"#3b82f6", section:"schools"    as Section },
    { label:"Add Product",    Icon:Package,      color:"#22c55e", section:"products"   as Section },
    { label:"View Messages",  Icon:Mail,         color:"#ef4444", section:"messages"   as Section },
  ];

  const greeting = (() => {
    const h = new Date().getHours();
    return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
  })();
  const today = new Date().toLocaleDateString("en-IN", { weekday:"long", year:"numeric", month:"long", day:"numeric" });

  const recent = [...messages].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,4);
  const recentActivities = [...activities].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,4);

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-black text-gray-900">{greeting} 👋</h1>
        <p className="text-xs mt-0.5" style={{ color:"rgba(0,0,0,0.4)" }}>{today}</p>
      </div>

      {/* Quick actions */}
      <div className="grid gap-3 mb-6" style={{ gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))" }}>
        {quickActions.map(({ label, Icon, color, section }) => (
          <button key={label} onClick={()=>onNavigate(section)}
                  className="flex items-center gap-3 p-4 rounded-2xl text-left transition-all"
                  style={{ background:"#ffffff", border:"1px solid rgba(0,0,0,0.08)" }}
                  onMouseEnter={e=>{ e.currentTarget.style.borderColor=`${color}50`; e.currentTarget.style.boxShadow=`0 8px 20px ${color}15`; }}
                  onMouseLeave={e=>{ e.currentTarget.style.borderColor="rgba(0,0,0,0.08)"; e.currentTarget.style.boxShadow=""; }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background:`${color}15`, color }}>
              <Icon size={16}/>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-gray-900 truncate">{label}</div>
            </div>
            <Plus size={14} style={{ color:"rgba(0,0,0,0.25)" }}/>
          </button>
        ))}
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
            </div>
            <div className="text-2xl font-black text-gray-900 mb-0.5">{s.value}</div>
            <div className="text-[10px] font-bold mb-0.5" style={{ color:"rgba(0,0,0,0.55)" }}>{s.label}</div>
            <div className="text-[9px]" style={{ color:"rgba(0,0,0,0.35)" }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Breakdown charts */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <BreakdownBars title="Activities by Category" data={activityCats}/>
        <BreakdownBars title="CSR Projects by Type" data={schoolTypes}/>
      </div>

      {/* Two column — recent */}
      <div className="grid grid-cols-2 gap-4">
        {/* Recent messages */}
        <div className="rounded-2xl p-5" style={{ background:"#ffffff", border:"1px solid rgba(0,0,0,0.08)" }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-bold text-gray-900">Recent Messages</span>
            <button onClick={()=>onNavigate("messages")} className="flex items-center gap-1 text-[10px] font-bold" style={{ color:"var(--orange)" }}>
              View all <ArrowRight size={10}/>
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {recent.length === 0 && <div className="text-xs py-6 text-center" style={{ color:"rgba(0,0,0,0.35)" }}>No messages yet</div>}
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
            <button onClick={()=>onNavigate("activities")} className="flex items-center gap-1 text-[10px] font-bold" style={{ color:"var(--orange)" }}>
              View all <ArrowRight size={10}/>
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {recentActivities.length === 0 && <div className="text-xs py-6 text-center" style={{ color:"rgba(0,0,0,0.35)" }}>No activities yet</div>}
            {recentActivities.map(a=>(
              <div key={a.id} className="flex items-start gap-3 p-3 rounded-xl transition-colors"
                   style={{ background:"rgba(0,0,0,0.02)" }}
                   onMouseEnter={e=>(e.currentTarget.style.background="rgba(0,0,0,0.05)")}
                   onMouseLeave={e=>(e.currentTarget.style.background="rgba(0,0,0,0.02)")}>
                <IconChip option={findIcon(ACTIVITY_ICONS, a.emoji)} size={14} box={28}/>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold truncate text-gray-900">{a.title}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full"
                          style={{ background:`${CSR_CATEGORY_COLORS[a.category]||"#F97316"}15`, color:CSR_CATEGORY_COLORS[a.category]||"var(--orange)" }}>{a.category}</span>
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
