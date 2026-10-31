import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import type { Activity, CompanySettings, PageSection, Product } from "@/components/admin/types";
import { activityFromDb, productFromDb, sectionFromDb, settingsFromDb } from "./mappers";

// Everything the public site reads from Supabase is cached under this tag;
// the admin panel expires it after every save (see app/admin/actions.ts).
export const CMS_TAG = "cms";

// Anon key, no cookies: public reads only ever see what RLS exposes to
// visitors (published pages, visible sections, published activities), and
// keeping cookies out lets these results be cached and prerendered.
function publicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}

// Each loader returns null when Supabase can't be reached, so callers fall
// back to the built-in content. Failures get the short "minutes" lifetime so
// the site picks the real content back up soon after Supabase recovers.
function logFailure(what: string, err: unknown) {
  console.error(`[cms] could not load ${what}:`, err instanceof Error ? err.message : err);
}

export type CmsPage =
  | { status: "ok"; sections: PageSection[] }
  // Query worked but RLS returned no row: the page is unpublished (or missing).
  | { status: "unpublished" };

export async function getCmsPage(slug: string): Promise<CmsPage | null> {
  "use cache";
  cacheTag(CMS_TAG);
  try {
    const supabase = publicClient();
    const { data: page, error } = await supabase.from("pages").select("id").eq("slug", slug).maybeSingle();
    if (error) throw error;
    if (!page) {
      cacheLife("hours");
      return { status: "unpublished" };
    }

    const { data: rows, error: secErr } = await supabase
      .from("page_sections").select("*").eq("page_id", page.id).order("position", { ascending: true });
    if (secErr) throw secErr;
    cacheLife("hours");
    return { status: "ok", sections: (rows ?? []).map(sectionFromDb).filter(s => s.visible) };
  } catch (err) {
    logFailure(`page ${slug}`, err);
    cacheLife("minutes");
    return null;
  }
}

export async function getProducts(): Promise<Product[] | null> {
  "use cache";
  cacheTag(CMS_TAG);
  try {
    const { data, error } = await publicClient().from("products").select("*").order("created_at", { ascending: true });
    if (error) throw error;
    cacheLife("hours");
    return (data ?? []).map(productFromDb);
  } catch (err) {
    logFailure("products", err);
    cacheLife("minutes");
    return null;
  }
}

export async function getActivities(): Promise<Activity[] | null> {
  "use cache";
  cacheTag(CMS_TAG);
  try {
    const { data, error } = await publicClient().from("activities").select("*").order("date", { ascending: false });
    if (error) throw error;
    cacheLife("hours");
    return (data ?? []).map(activityFromDb);
  } catch (err) {
    logFailure("activities", err);
    cacheLife("minutes");
    return null;
  }
}

export async function getSettings(): Promise<CompanySettings | null> {
  "use cache";
  cacheTag(CMS_TAG);
  try {
    const { data, error } = await publicClient().from("settings").select("*").limit(1).maybeSingle();
    if (error) throw error;
    cacheLife("hours");
    return data ? settingsFromDb(data) : null;
  } catch (err) {
    logFailure("settings", err);
    cacheLife("minutes");
    return null;
  }
}
