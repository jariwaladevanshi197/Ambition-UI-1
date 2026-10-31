"use client";
import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type {
  Activity, School, Product, Message, PageContent, PageSection, MediaFile, CompanySettings,
} from "./types";
import {
  activityFromDb, activityToDb, schoolFromDb, schoolToDb, productFromDb, productToDb,
  messageFromDb, settingsFromDb, settingsToDb, sectionFromDb, sectionToDb, mediaFromDb,
} from "@/lib/cms/mappers";
import { DEFAULT_SETTINGS } from "@/content/settings";
import { refreshPublicSite } from "@/app/admin/actions";

// After a write that changes what visitors see, expire the public site's
// cached content. Fire-and-forget: a failure only delays the update until
// the cache's normal lifetime runs out.
function refreshSite() {
  refreshPublicSite().catch(err => console.error("Could not refresh the public site:", err));
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

    setActivities((activitiesRows ?? []).map(activityFromDb));
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
    const { data } = await supabase.from("activities").insert(activityToDb(a)).select().single();
    if (data) setActivities(n => [activityFromDb(data), ...n]);
    refreshSite();
  };
  const updateActivity = async (a: Activity) => {
    const { data } = await supabase.from("activities").update(activityToDb(a)).eq("id", a.id).select().single();
    if (data) setActivities(n => n.map(x => x.id === a.id ? activityFromDb(data) : x));
    refreshSite();
  };
  const deleteActivity = async (id: string) => {
    await supabase.from("activities").delete().eq("id", id);
    setActivities(n => n.filter(x => x.id !== id));
    refreshSite();
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
    refreshSite();
  };
  const updateProduct = async (p: Product) => {
    const { data } = await supabase.from("products").update(productToDb(p)).eq("id", p.id).select().single();
    if (data) setProducts(n => n.map(x => x.id === p.id ? productFromDb(data) : x));
    refreshSite();
  };
  const deleteProduct = async (id: string) => {
    await supabase.from("products").delete().eq("id", id);
    setProducts(n => n.filter(x => x.id !== id));
    refreshSite();
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
    refreshSite();
  };

  const saveSections = async (slug: string, sections: PageSection[]) => {
    const pageId = pageIdBySlug[slug];
    if (!pageId) return;
    await supabase.from("page_sections").delete().eq("page_id", pageId);
    if (sections.length > 0) {
      await supabase.from("page_sections").insert(sections.map((s, i) => sectionToDb(s, pageId, i)));
    }
    await supabase.from("pages").update({ updated_at: new Date().toISOString() }).eq("id", pageId);
    refreshSite();
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
    refreshSite();
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
