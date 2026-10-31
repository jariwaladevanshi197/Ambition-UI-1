"use server";
import { updateTag } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { CMS_TAG } from "@/lib/cms/server";

/**
 * Expire the public site's cached CMS content so an admin's save shows up on
 * the next page view. The admin panel writes to Supabase directly from the
 * browser, then calls this.
 */
export async function refreshPublicSite() {
  const supabase = await createClient();
  const { data: isAdmin } = await supabase.rpc("is_admin");
  if (!isAdmin) return;
  updateTag(CMS_TAG);
}
