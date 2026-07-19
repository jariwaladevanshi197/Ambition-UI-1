"use client";
import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type {
  Activity, School, Product, Message, PageContent, PageSection, MediaFile, CompanySettings,
} from "./types";

const DEFAULT_SETTINGS: CompanySettings = {
  name:"Ambition Coal Pvt. Ltd.",
  tagline:"Providing a One Stop Coal Solution.",
  email:"info@ambitioncoal.in",
  phone:"+91 XXXXX XXXXX",
  address:"Registered at Registrar of Companies, Ahmedabad, Gujarat",
  linkedin:"https://linkedin.com/company/ambitioncoal",
  twitter:"https://twitter.com/ambitioncoal",
  youtube:"https://youtube.com/@ambitioncoal",
  estYear:"2010",
};

/* ── DB row <-> app type mapping ─────────────────────────────── */
// Activity and Product columns are already camelCase-free / 1:1 with their
// DB columns, so only id needs stripping on insert.

function schoolFromDb(row: Record<string, unknown>): School {
  return {
    id: row.id as string,
    name: row.name as string,
    projectType: row.project_type as string,
    location: row.location as string,
    state: row.state as string,
    beneficiaries: row.beneficiaries as number,
    description: (row.description as string) ?? "",
    status: row.status as School["status"],
    emoji: (row.emoji as string) ?? "",
  };
}
function schoolToDb(s: Omit<School, "id">) {
  return {
    name: s.name, project_type: s.projectType, location: s.location, state: s.state,
    beneficiaries: s.beneficiaries, description: s.description, status: s.status, emoji: s.emoji,
  };
}

function productFromDb(row: Record<string, unknown>): Product {
  return {
    id: row.id as string,
    name: row.name as string,
    category: row.category as Product["category"],
    type: row.type as string,
    specs: (row.specs as string[]) ?? [],
    applications: (row.applications as string) ?? "",
    featured: row.featured as boolean,
    comingSoon: (row.coming_soon as boolean) ?? false,
  };
}
function productToDb(p: Omit<Product, "id">) {
  return {
    name: p.name, category: p.category, type: p.type, specs: p.specs,
    applications: p.applications, featured: p.featured, coming_soon: p.comingSoon,
  };
}

function messageFromDb(row: Record<string, unknown>): Message {
  return {
    id: row.id as string,
    name: row.name as string,
    email: row.email as string,
    phone: (row.phone as string) ?? "",
    type: (row.type as string) ?? "",
    message: row.message as string,
    date: (row.created_at as string)?.slice(0, 10) ?? "",
    read: row.read as boolean,
  };
}

function settingsFromDb(row: Record<string, unknown>): CompanySettings {
  return {
    name: (row.name as string) ?? DEFAULT_SETTINGS.name,
    tagline: (row.tagline as string) ?? "",
    email: (row.email as string) ?? "",
    phone: (row.phone as string) ?? "",
    address: (row.address as string) ?? "",
    linkedin: (row.linkedin as string) ?? "",
    twitter: (row.twitter as string) ?? "",
    youtube: (row.youtube as string) ?? "",
    estYear: (row.est_year as string) ?? "",
  };
}
function settingsToDb(s: CompanySettings) {
  return {
    name: s.name, tagline: s.tagline, email: s.email, phone: s.phone, address: s.address,
    linkedin: s.linkedin, twitter: s.twitter, youtube: s.youtube, est_year: s.estYear,
    updated_at: new Date().toISOString(),
  };
}

function sectionFromDb(row: Record<string, unknown>): PageSection {
  return {
    id: row.id as string,
    type: row.type as PageSection["type"],
    label: row.label as string,
    visible: row.visible as boolean,
    headline: (row.headline as string) ?? undefined,
    subtext: (row.subtext as string) ?? undefined,
    ctaText: (row.cta_text as string) ?? undefined,
    ctaLink: (row.cta_link as string) ?? undefined,
    image: (row.image as string) ?? undefined,
    heading: (row.heading as string) ?? undefined,
    body: (row.body as string) ?? undefined,
    ctaHeading: (row.cta_heading as string) ?? undefined,
    ctaBody: (row.cta_body as string) ?? undefined,
    ctaBtn: (row.cta_btn as string) ?? undefined,
    stats: (row.stats as PageSection["stats"]) ?? [],
    cards: (row.cards as PageSection["cards"]) ?? [],
    gallery: (row.gallery as PageSection["gallery"]) ?? [],
  };
}
function sectionToDb(s: PageSection, pageId: string, position: number) {
  return {
    page_id: pageId, type: s.type, label: s.label, visible: s.visible, position,
    headline: s.headline ?? null, subtext: s.subtext ?? null,
    cta_text: s.ctaText ?? null, cta_link: s.ctaLink ?? null, image: s.image ?? null,
    heading: s.heading ?? null, body: s.body ?? null,
    cta_heading: s.ctaHeading ?? null, cta_body: s.ctaBody ?? null, cta_btn: s.ctaBtn ?? null,
    stats: s.stats ?? [], cards: s.cards ?? [], gallery: s.gallery ?? [],
  };
}

function mediaFromDb(row: Record<string, unknown>, publicUrl: (path: string) => string): MediaFile {
  return {
    id: row.id as string,
    name: row.name as string,
    type: row.type as MediaFile["type"],
    folder: (row.folder as string) ?? "Banners",
    size: (row.size as string) ?? "",
    url: row.storage_path ? publicUrl(row.storage_path as string) : "",
    date: (row.created_at as string)?.slice(0, 10) ?? "",
  };
}

export function useAdminData() {
  const supabase = createClient();

  const [activities, setActivities] = useState<Activity[]>([]);
  const [schools,    setSchools]    = useState<School[]>([]);
  const [products,   setProducts]   = useState<Product[]>([]);
  const [messages,   setMessages]   = useState<Message[]>([]);
  const [pages,      setPages]      = useState<PageContent[]>([]);
  const [sectionsBySlug, setSectionsBySlug] = useState<Record<string, PageSection[]>>({});
  const [pageIdBySlug,   setPageIdBySlug]   = useState<Record<string, string>>({});
  const [media,      setMedia]      = useState<MediaFile[]>([]);
  const [settings,   setSettings]   = useState<CompanySettings>(DEFAULT_SETTINGS);
  const [hydrated,   setHydrated]   = useState(false);

  const publicUrl = useCallback(
    (path: string) => supabase.storage.from("media").getPublicUrl(path).data.publicUrl,
    [supabase]
  );

  const loadAll = useCallback(async () => {
    const [
      { data: activitiesRows },
      { data: schoolsRows },
      { data: productsRows },
      { data: messagesRows },
      { data: pagesRows },
      { data: sectionsRows },
      { data: mediaRows },
      { data: settingsRows },
    ] = await Promise.all([
      supabase.from("activities").select("*").order("date", { ascending: false }),
      supabase.from("schools").select("*").order("created_at", { ascending: false }),
      supabase.from("products").select("*").order("created_at", { ascending: false }),
      supabase.from("messages").select("*").order("created_at", { ascending: false }),
      supabase.from("pages").select("*").order("created_at", { ascending: true }),
      supabase.from("page_sections").select("*").order("position", { ascending: true }),
      supabase.from("media").select("*").order("created_at", { ascending: false }),
      supabase.from("settings").select("*").limit(1).single(),
    ]);

    setActivities((activitiesRows as Activity[]) ?? []);
    setProducts((productsRows ?? []).map(productFromDb));
    setSchools((schoolsRows ?? []).map(schoolFromDb));
    setMessages((messagesRows ?? []).map(messageFromDb));
    setMedia((mediaRows ?? []).map(r => mediaFromDb(r, publicUrl)));
    if (settingsRows) setSettings(settingsFromDb(settingsRows));

    const idBySlug: Record<string, string> = {};
    (pagesRows ?? []).forEach(p => { idBySlug[p.slug as string] = p.id as string; });
    setPageIdBySlug(idBySlug);

    const grouped: Record<string, PageSection[]> = {};
    (sectionsRows ?? []).forEach(row => {
      const slug = Object.keys(idBySlug).find(s => idBySlug[s] === row.page_id);
      if (!slug) return;
      (grouped[slug] ??= []).push(sectionFromDb(row));
    });
    setSectionsBySlug(grouped);

    setPages((pagesRows ?? []).map(p => {
      const hero = (grouped[p.slug as string] ?? []).find(s => s.type === "hero");
      return {
        id: p.id as string,
        slug: p.slug as string,
        title: p.title as string,
        heroHeadline: hero?.headline ?? "",
        heroSubtext: hero?.subtext ?? "",
        published: p.published as boolean,
        lastEdited: (p.updated_at as string)?.slice(0, 10) ?? "",
      };
    }));

    setHydrated(true);
  }, [supabase, publicUrl]);

  useEffect(() => { loadAll(); }, [loadAll]);

  /* ---------- Activities ---------- */
  const addActivity = async (a: Activity) => {
    const { id: _drop, ...rest } = a;
    const { data } = await supabase.from("activities").insert(rest).select().single();
    if (data) setActivities(n => [data as Activity, ...n]);
  };
  const updateActivity = async (a: Activity) => {
    const { id, ...rest } = a;
    const { data } = await supabase.from("activities").update(rest).eq("id", id).select().single();
    if (data) setActivities(n => n.map(x => x.id === id ? data as Activity : x));
  };
  const deleteActivity = async (id: string) => {
    await supabase.from("activities").delete().eq("id", id);
    setActivities(n => n.filter(x => x.id !== id));
  };

  /* ---------- Schools ---------- */
  const addSchool = async (s: School) => {
    const { data } = await supabase.from("schools").insert(schoolToDb(s)).select().single();
    if (data) setSchools(n => [schoolFromDb(data), ...n]);
  };
  const updateSchool = async (s: School) => {
    const { data } = await supabase.from("schools").update(schoolToDb(s)).eq("id", s.id).select().single();
    if (data) setSchools(n => n.map(x => x.id === s.id ? schoolFromDb(data) : x));
  };
  const deleteSchool = async (id: string) => {
    await supabase.from("schools").delete().eq("id", id);
    setSchools(n => n.filter(x => x.id !== id));
  };

  /* ---------- Products ---------- */
  const addProduct = async (p: Product) => {
    const { data } = await supabase.from("products").insert(productToDb(p)).select().single();
    if (data) setProducts(n => [productFromDb(data), ...n]);
  };
  const updateProduct = async (p: Product) => {
    const { data } = await supabase.from("products").update(productToDb(p)).eq("id", p.id).select().single();
    if (data) setProducts(n => n.map(x => x.id === p.id ? productFromDb(data) : x));
  };
  const deleteProduct = async (id: string) => {
    await supabase.from("products").delete().eq("id", id);
    setProducts(n => n.filter(x => x.id !== id));
  };

  /* ---------- Messages ---------- */
  const markRead = async (id: string) => {
    setMessages(n => n.map(x => x.id === id ? { ...x, read: true } : x));
    await supabase.from("messages").update({ read: true }).eq("id", id);
  };
  const deleteMsg = async (id: string) => {
    await supabase.from("messages").delete().eq("id", id);
    setMessages(n => n.filter(x => x.id !== id));
  };

  /* ---------- Pages ---------- */
  const updatePage = async (p: PageContent) => {
    await supabase.from("pages").update({
      title: p.title, published: p.published, updated_at: new Date().toISOString(),
    }).eq("id", p.id);
    setPages(n => n.map(x => x.id === p.id ? { ...p, lastEdited: new Date().toISOString().slice(0, 10) } : x));
  };

  const saveSections = async (slug: string, sections: PageSection[]) => {
    const pageId = pageIdBySlug[slug];
    if (!pageId) return;
    await supabase.from("page_sections").delete().eq("page_id", pageId);
    if (sections.length > 0) {
      await supabase.from("page_sections").insert(sections.map((s, i) => sectionToDb(s, pageId, i)));
    }
    await supabase.from("pages").update({ updated_at: new Date().toISOString() }).eq("id", pageId);
    await loadAll();
  };

  /* ---------- Media ---------- */
  const addMedia = async (file: File, folder: string) => {
    const path = `${folder}/${Date.now()}-${file.name}`;
    const { error: uploadErr } = await supabase.storage.from("media").upload(path, file);
    if (uploadErr) return { error: uploadErr.message };

    const sizeStr = file.size > 1024 * 1024
      ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      : `${Math.round(file.size / 1024)} KB`;
    const { data, error: insertErr } = await supabase.from("media").insert({
      name: file.name,
      type: file.type.startsWith("video") ? "video" : "image",
      folder, storage_path: path, size: sizeStr,
    }).select().single();
    if (insertErr) {
      await supabase.storage.from("media").remove([path]);
      return { error: insertErr.message };
    }
    setMedia(n => [mediaFromDb(data, publicUrl), ...n]);
    return { error: null };
  };
  const deleteMedia = async (id: string) => {
    const { data: row } = await supabase.from("media").select("storage_path").eq("id", id).maybeSingle();
    await supabase.from("media").delete().eq("id", id);
    setMedia(n => n.filter(x => x.id !== id));
    const path = row?.storage_path as string | undefined;
    if (path) await supabase.storage.from("media").remove([path]);
  };

  /* ---------- Settings ---------- */
  const saveSettings = async (s: CompanySettings) => {
    setSettings(s);
    await supabase.from("settings").update(settingsToDb(s)).eq("id", true);
  };

  const unreadCount = messages.filter(m => !m.read).length;

  return {
    activities, addActivity, updateActivity, deleteActivity,
    schools,    addSchool,    updateSchool,    deleteSchool,
    products,   addProduct,   updateProduct,   deleteProduct,
    messages,   markRead,     deleteMsg,
    pages,      updatePage,   sectionsBySlug,  saveSections,
    media,      addMedia,     deleteMedia,
    settings,   saveSettings,
    unreadCount, hydrated,
  };
}
