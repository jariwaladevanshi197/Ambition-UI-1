"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard, Zap, FileText, Activity, School, Package,
  Image, Mail, Settings, Shield, Menu, X, LogOut, Bell
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useAdminData } from "@/components/admin/useAdminData";
import DashboardSection  from "@/components/admin/sections/DashboardSection";
import ActivitiesSection from "@/components/admin/sections/ActivitiesSection";
import SchoolsSection    from "@/components/admin/sections/SchoolsSection";
import PagesSection      from "@/components/admin/sections/PagesSection";
import MessagesSection   from "@/components/admin/sections/MessagesSection";
import MediaSection      from "@/components/admin/sections/MediaSection";
import ProductsSection   from "@/components/admin/sections/ProductsSection";
import SettingsSection   from "@/components/admin/sections/SettingsSection";
import SecuritySection   from "@/components/admin/sections/SecuritySection";

type Section =
  | "dashboard" | "pages" | "activities" | "schools"
  | "products"  | "media" | "messages"   | "settings" | "security";

const NAV: { id: Section; label: string; icon: React.ReactNode; group?: string }[] = [
  { id:"dashboard",  label:"Dashboard",   icon:<LayoutDashboard size={16}/> },
  { id:"pages",      label:"Pages",       icon:<FileText size={16}/>,       group:"Content" },
  { id:"activities", label:"Activities",  icon:<Activity size={16}/>,       group:"Content" },
  { id:"schools",    label:"CSR Projects", icon:<School size={16}/>,         group:"Content" },
  { id:"products",   label:"Products",    icon:<Package size={16}/>,        group:"Content" },
  { id:"media",      label:"Media",       icon:<Image size={16}/>,          group:"Content" },
  { id:"messages",   label:"Messages",    icon:<Mail size={16}/>,           group:"Inbox" },
  { id:"settings",   label:"Settings",    icon:<Settings size={16}/>,       group:"System" },
  { id:"security",   label:"Security",    icon:<Shield size={16}/>,         group:"System" },
];

function NavBtn({
  item, active, onClick, badge,
}: { item:{id:string;label:string;icon:React.ReactNode}; active:boolean; onClick:()=>void; badge:number }) {
  return (
    <button onClick={onClick}
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl w-full text-left text-xs font-bold transition-all mb-0.5 whitespace-nowrap"
            style={{ background:active?"rgba(249,115,22,0.12)":"transparent", color:active?"var(--orange)":"rgba(0,0,0,0.5)" }}
            onMouseEnter={e=>{ if(!active){(e.currentTarget as HTMLButtonElement).style.background="rgba(0,0,0,0.05)";(e.currentTarget as HTMLButtonElement).style.color="#111111";}}}
            onMouseLeave={e=>{ if(!active){(e.currentTarget as HTMLButtonElement).style.background="transparent";(e.currentTarget as HTMLButtonElement).style.color="rgba(0,0,0,0.5)";}}}
    >
      <span className="shrink-0">{item.icon}</span>
      <span className="flex-1">{item.label}</span>
      {badge > 0 && (
        <span className="min-w-[18px] h-[18px] px-1 rounded-full text-[8px] font-black text-white flex items-center justify-center"
              style={{ background:"var(--orange)" }}>{badge}</span>
      )}
    </button>
  );
}

export default function AdminPage() {
  const router = useRouter();
  const supabase = createClient();
  const data = useAdminData();
  const [active,   setActive]   = useState<Section>("dashboard");
  const [sidebar,  setSidebar]  = useState(true);

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  /* ── Loading ────────────────────────────────────────── */
  if (!data.hydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background:"#f9f9f9" }}>
        <div className="text-center">
          <div className="w-8 h-8 rounded-full border-2 mx-auto mb-3 animate-spin"
               style={{ borderColor:"rgba(249,115,22,0.3)", borderTopColor:"var(--orange)" }}/>
          <p className="text-xs" style={{ color:"rgba(0,0,0,0.4)" }}>Loading…</p>
        </div>
      </div>
    );
  }

  const groups = ["Content","Inbox","System"] as const;

  /* ── Shell ──────────────────────────────────────────── */
  return (
    <div className="flex h-screen overflow-hidden" style={{ background:"#f5f5f5" }}>

      {/* Sidebar */}
      <aside className="flex flex-col shrink-0 transition-all duration-300 overflow-hidden"
             style={{ width:sidebar?220:0, minWidth:sidebar?220:0, background:"#ffffff", borderRight:"1px solid rgba(0,0,0,0.08)" }}>

        {/* Logo */}
        <div className="flex items-center gap-2 px-5 py-5 shrink-0"
             style={{ borderBottom:"1px solid rgba(0,0,0,0.08)" }}>
          <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background:"var(--orange)" }}>
            <Zap size={14} className="text-white"/>
          </div>
          <span className="font-black text-gray-900 text-sm tracking-tight whitespace-nowrap">
            Ambition <span style={{ color:"var(--orange)" }}>CMS</span>
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-2.5 overflow-y-auto">
          {NAV.filter(n=>!n.group).map(n=>(
            <NavBtn key={n.id} item={n} active={active===n.id} onClick={()=>setActive(n.id)} badge={0}/>
          ))}
          {groups.map(g=>(
            <div key={g} className="mt-5">
              <div className="px-3 mb-2 text-[9px] font-black tracking-widest" style={{ color:"rgba(0,0,0,0.3)" }}>{g}</div>
              {NAV.filter(n=>n.group===g).map(n=>(
                <NavBtn key={n.id} item={n} active={active===n.id}
                        onClick={()=>setActive(n.id)}
                        badge={n.id==="messages"?data.unreadCount:0}/>
              ))}
            </div>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-2.5 py-4 shrink-0" style={{ borderTop:"1px solid rgba(0,0,0,0.08)" }}>
          <button onClick={signOut}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl w-full text-left text-xs font-bold transition-colors whitespace-nowrap"
                  style={{ color:"rgba(0,0,0,0.4)" }}
                  onMouseEnter={e=>{ const b=e.currentTarget; b.style.background="rgba(239,68,68,0.08)"; b.style.color="#ef4444"; }}
                  onMouseLeave={e=>{ const b=e.currentTarget; b.style.background=""; b.style.color="rgba(0,0,0,0.4)"; }}>
            <LogOut size={14}/> Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Topbar */}
        <header className="flex items-center justify-between px-6 shrink-0"
                style={{ height:56, borderBottom:"1px solid rgba(0,0,0,0.08)", background:"rgba(255,255,255,0.97)", backdropFilter:"blur(10px)" }}>
          <div className="flex items-center gap-3">
            <button onClick={()=>setSidebar(p=>!p)}
                    className="w-8 h-8 flex items-center justify-center rounded-xl transition-colors"
                    style={{ background:"rgba(0,0,0,0.05)" }}
                    onMouseEnter={e=>(e.currentTarget.style.background="rgba(0,0,0,0.1)")}
                    onMouseLeave={e=>(e.currentTarget.style.background="rgba(0,0,0,0.05)")}>
              {sidebar ? <X size={14} className="text-gray-900"/> : <Menu size={14} className="text-gray-900"/>}
            </button>
            <span className="text-sm font-bold text-gray-900">
              {NAV.find(n=>n.id===active)?.label}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {data.unreadCount > 0 && (
              <button onClick={()=>setActive("messages")}
                      className="relative w-8 h-8 flex items-center justify-center rounded-xl"
                      style={{ background:"rgba(0,0,0,0.05)" }}>
                <Bell size={14} className="text-gray-900"/>
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[8px] font-black flex items-center justify-center text-white"
                      style={{ background:"var(--orange)" }}>{data.unreadCount}</span>
              </button>
            )}
            <a href="/" target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold transition-colors"
               style={{ background:"rgba(0,0,0,0.05)", color:"rgba(0,0,0,0.55)" }}
               onMouseEnter={e=>{ e.currentTarget.style.background="rgba(0,0,0,0.1)"; e.currentTarget.style.color="#111111"; }}
               onMouseLeave={e=>{ e.currentTarget.style.background="rgba(0,0,0,0.05)"; e.currentTarget.style.color="rgba(0,0,0,0.55)"; }}>
              View Site ↗
            </a>
          </div>
        </header>

        {/* Section content */}
        <main className="flex-1 overflow-y-auto p-7">
          {active==="dashboard"  && <DashboardSection  activities={data.activities} schools={data.schools} products={data.products} messages={data.messages} media={data.media} unreadCount={data.unreadCount} onNavigate={setActive}/>}
          {active==="pages"      && <PagesSection      pages={data.pages}      sectionsBySlug={data.sectionsBySlug} media={data.media} update={data.updatePage} saveSections={data.saveSections}/>}
          {active==="activities" && <ActivitiesSection activities={data.activities} add={data.addActivity} update={data.updateActivity} remove={data.deleteActivity}/>}
          {active==="schools"    && <SchoolsSection    schools={data.schools}   add={data.addSchool}    update={data.updateSchool}    remove={data.deleteSchool}/>}
          {active==="products"   && <ProductsSection   products={data.products} add={data.addProduct}   update={data.updateProduct}   remove={data.deleteProduct}/>}
          {active==="media"      && <MediaSection      media={data.media}       add={data.addMedia}     remove={data.deleteMedia}/>}
          {active==="messages"   && <MessagesSection   messages={data.messages} markRead={data.markRead} deleteMsg={data.deleteMsg}/>}
          {active==="settings"   && <SettingsSection   settings={data.settings} save={data.saveSettings}/>}
          {active==="security"   && <SecuritySection/>}
        </main>
      </div>
    </div>
  );
}
