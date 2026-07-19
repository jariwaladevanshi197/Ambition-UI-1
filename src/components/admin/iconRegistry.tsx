import {
  Ship, Layers, ArrowRightLeft, Globe2, FlaskConical, Boxes, Truck, Train, Pickaxe,
  BookOpen, HeartPulse, Droplets, GraduationCap, Leaf,
  Home, Factory, Cog, Handshake, Mail, Gem, Flame,
  HardHat, Palette, Bookmark,
  BadgeDollarSign, TimerReset, Target, Telescope, Star, CheckCircle2, TrendingUp, Award, Shield,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface IconOption { key: string; label: string; Icon: LucideIcon; color: string; }

// Matches the operational cards on the live Activities page exactly.
export const ACTIVITY_ICONS: IconOption[] = [
  { key:"ship",           label:"Bulk Vessel Unloading",       Icon:Ship,           color:"#3b82f6" },
  { key:"layers",         label:"Stacking & Heaping",          Icon:Layers,         color:"#3b82f6" },
  { key:"arrow-shift",    label:"Internal Shifting",           Icon:ArrowRightLeft, color:"#3b82f6" },
  { key:"globe",          label:"International Sourcing",      Icon:Globe2,         color:"#F97316" },
  { key:"flask",          label:"Quality Testing",              Icon:FlaskConical,   color:"#F97316" },
  { key:"boxes",          label:"Salt / Product Lines",         Icon:Boxes,          color:"#F97316" },
  { key:"truck",          label:"Road Dispatch",                Icon:Truck,          color:"#22c55e" },
  { key:"train",          label:"Rail Dispatch",                Icon:Train,          color:"#22c55e" },
  { key:"pickaxe",        label:"Minerals Sourcing",            Icon:Pickaxe,        color:"#64748b" },
];

// Matches the 5 CSR pillars on the live CSR page (CSR_CATEGORY_COLORS), plus
// the extra project types the CSR Projects admin section supports.
export const SCHOOL_ICONS: IconOption[] = [
  { key:"book-open",      label:"Education",           Icon:BookOpen,      color:"#3b82f6" },
  { key:"heart-pulse",    label:"Healthcare",          Icon:HeartPulse,    color:"#22c55e" },
  { key:"droplets",       label:"Water & Sanitation",  Icon:Droplets,      color:"#0ea5e9" },
  { key:"graduation-cap", label:"Women Empowerment",   Icon:GraduationCap, color:"#ec4899" },
  { key:"leaf",           label:"Environment",         Icon:Leaf,          color:"#16a34a" },
];

export const SCHOOL_ICONS_BY_TYPE: Record<string, IconOption> = {
  "School":              { key:"book-open",      label:"School",              Icon:BookOpen,      color:"#3b82f6" },
  "Healthcare":          { key:"heart-pulse",    label:"Healthcare",          Icon:HeartPulse,    color:"#22c55e" },
  "Community Centre":    { key:"handshake",      label:"Community Centre",    Icon:Handshake,     color:"#8b5cf6" },
  "Water & Sanitation":  { key:"droplets",       label:"Water & Sanitation",  Icon:Droplets,      color:"#0ea5e9" },
  "Women Empowerment":   { key:"graduation-cap", label:"Women Empowerment",   Icon:GraduationCap, color:"#ec4899" },
  "Environment":         { key:"leaf",           label:"Environment",         Icon:Leaf,          color:"#16a34a" },
  "Infrastructure":      { key:"hard-hat",       label:"Infrastructure",      Icon:HardHat,       color:"#D97706" },
  "Sports & Culture":    { key:"palette",        label:"Sports & Culture",    Icon:Palette,       color:"#F97316" },
  "Other":               { key:"bookmark",       label:"Other",              Icon:Bookmark,      color:"#6b7280" },
};

export const PRODUCT_CATEGORY_ICONS: Record<string, IconOption> = {
  Coal:     { key:"flame",  label:"Coal",     Icon:Flame,  color:"#F97316" },
  Minerals: { key:"gem",    label:"Minerals", Icon:Gem,    color:"#64748b" },
  Salt:     { key:"boxes",  label:"Salt",     Icon:Boxes,  color:"#0ea5e9" },
};

// General-purpose set for cards inside Pages sections — covers every icon
// style already used across the live site (operations, CSR, why-choose-us,
// mission/vision) so any card can be matched to what's actually shown live.
export const CARD_ICONS: IconOption[] = [
  { key:"ship",           label:"Ship",            Icon:Ship,           color:"#3b82f6" },
  { key:"layers",         label:"Layers",          Icon:Layers,         color:"#3b82f6" },
  { key:"arrow-shift",    label:"Shift/Transfer",  Icon:ArrowRightLeft, color:"#3b82f6" },
  { key:"globe",          label:"Global/Sourcing", Icon:Globe2,         color:"#F97316" },
  { key:"flask",          label:"Quality/Testing", Icon:FlaskConical,   color:"#6366f1" },
  { key:"boxes",          label:"Boxes/Products",  Icon:Boxes,          color:"#F97316" },
  { key:"truck",          label:"Truck/Road",      Icon:Truck,          color:"#22c55e" },
  { key:"train",          label:"Train/Rail",      Icon:Train,          color:"#22c55e" },
  { key:"pickaxe",        label:"Mining/Minerals", Icon:Pickaxe,        color:"#64748b" },
  { key:"book-open",      label:"Education",       Icon:BookOpen,       color:"#3b82f6" },
  { key:"heart-pulse",    label:"Healthcare",      Icon:HeartPulse,     color:"#22c55e" },
  { key:"droplets",       label:"Water",           Icon:Droplets,       color:"#0ea5e9" },
  { key:"graduation-cap", label:"Women/Education", Icon:GraduationCap, color:"#ec4899" },
  { key:"leaf",           label:"Environment",     Icon:Leaf,           color:"#16a34a" },
  { key:"badge-dollar",   label:"Pricing",         Icon:BadgeDollarSign,color:"#F97316" },
  { key:"timer-reset",    label:"On-Time/Speed",   Icon:TimerReset,     color:"#D97706" },
  { key:"handshake",      label:"Partnership",     Icon:Handshake,      color:"#16a34a" },
  { key:"target",         label:"Mission/Goal",    Icon:Target,         color:"var(--orange)" },
  { key:"telescope",      label:"Vision",          Icon:Telescope,      color:"#3b82f6" },
  { key:"star",           label:"Featured",        Icon:Star,           color:"#F97316" },
  { key:"check-circle",   label:"Quality/Verified",Icon:CheckCircle2,   color:"#22c55e" },
  { key:"trending-up",    label:"Growth",          Icon:TrendingUp,     color:"#22c55e" },
  { key:"award",          label:"Achievement",     Icon:Award,          color:"#D97706" },
  { key:"shield",         label:"Trust/Security",  Icon:Shield,         color:"#3b82f6" },
];

export const PAGE_ICONS: Record<string, IconOption> = {
  "/":           { key:"home",      label:"Home",       Icon:Home,      color:"#F97316" },
  "/about":      { key:"factory",   label:"About",      Icon:Factory,   color:"#F97316" },
  "/services":   { key:"cog",       label:"Services",   Icon:Cog,       color:"#F97316" },
  "/activities": { key:"boxes",     label:"Activities", Icon:Boxes,     color:"#F97316" },
  "/csr":        { key:"handshake", label:"CSR",        Icon:Handshake, color:"#F97316" },
  "/contact":    { key:"mail",      label:"Contact",    Icon:Mail,      color:"#F97316" },
};

export function findIcon(options: IconOption[], key: string): IconOption {
  return options.find(o => o.key === key) ?? options[0];
}

export function IconChip({ option, size = 22, box = 44 }: { option: IconOption; size?: number; box?: number }) {
  const { Icon, color } = option;
  return (
    <div className="rounded-xl flex items-center justify-center shrink-0"
         style={{ width:box, height:box, background:`${color}15` }}>
      <Icon size={size} style={{ color }} strokeWidth={1.75}/>
    </div>
  );
}
