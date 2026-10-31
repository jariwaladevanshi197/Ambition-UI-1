// Compares the CMS content in Supabase with the site's built-in content
// (src/content/*.ts — what visitors saw before the pages were wired to the
// CMS) and optionally writes the built-in content into the CMS.
//
//   node scripts/sync_site_content.mjs            dry run: report differences only
//   node scripts/sync_site_content.mjs --write    replace page sections with the built-in
//                                                 ones, and add/update built-in products
//                                                 and activities (matched by name/title)
//   ... --write --prune                           also delete products/activities that
//                                                 aren't in the built-in lists
//
// Needs migration 0007 applied first (products.description/image,
// activities.highlight/highlight_label). Requires Node 22.18+ (imports .ts).
import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { HOME_SECTIONS } from "../src/content/home.ts";
import { ABOUT_SECTIONS } from "../src/content/about.ts";
import { SERVICES_SECTIONS } from "../src/content/services.ts";
import { ACTIVITIES_SECTIONS } from "../src/content/activities.ts";
import { CSR_SECTIONS, DEFAULT_INITIATIVES } from "../src/content/csr.ts";
import { CONTACT_SECTIONS } from "../src/content/contact.ts";
import { DEFAULT_PRODUCTS } from "../src/content/products.ts";

config({ path: new URL("../.env.local", import.meta.url), quiet: true });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SECRET_KEY);

const WRITE = process.argv.includes("--write");
const PRUNE = process.argv.includes("--prune");

const PAGES = [
  { slug: "/",           title: "Home",         sections: HOME_SECTIONS },
  { slug: "/about",      title: "About Us",     sections: ABOUT_SECTIONS },
  { slug: "/services",   title: "Services",     sections: SERVICES_SECTIONS },
  { slug: "/activities", title: "Activities",   sections: ACTIVITIES_SECTIONS },
  { slug: "/csr",        title: "CSR & Impact", sections: CSR_SECTIONS },
  { slug: "/contact",    title: "Contact",      sections: CONTACT_SECTIONS },
];

// Same column mapping as src/lib/cms/mappers.ts (kept local so this script
// doesn't have to resolve the app's "@/" imports).
const SECTION_FIELDS = {
  type: "type", visible: "visible", headline: "headline", subtext: "subtext",
  ctaText: "cta_text", ctaLink: "cta_link", image: "image", heading: "heading", body: "body",
  ctaHeading: "cta_heading", ctaBody: "cta_body", ctaBtn: "cta_btn",
  stats: "stats", cards: "cards", gallery: "gallery",
};
const sectionToRow = (s, pageId, position) => ({
  page_id: pageId, label: s.label, position,
  ...Object.fromEntries(Object.entries(SECTION_FIELDS).map(([k, col]) =>
    [col, s[k] ?? (["stats", "cards", "gallery"].includes(k) ? [] : null)])),
});
const productToRow = p => ({
  name: p.name, category: p.category, type: p.type, description: p.description, image: p.image,
  specs: p.specs, applications: p.applications, featured: p.featured, coming_soon: p.comingSoon,
});
const activityToRow = a => ({
  title: a.title, description: a.description, category: a.category, date: a.date,
  featured: a.featured, published: a.published, emoji: a.emoji,
  highlight: a.highlight, highlight_label: a.highlightLabel,
});

// Canonical JSON for comparisons: jsonb columns come back with their keys
// reordered, and an empty list counts the same as no value.
const canon = v => Array.isArray(v) ? v.map(canon)
  : v && typeof v === "object" ? Object.fromEntries(Object.keys(v).sort().map(k => [k, canon(v[k])]))
  : v;
const norm = v => { const s = JSON.stringify(canon(v ?? null)); return s === "[]" ? "null" : s; };
const fail = (what, error) => { console.error(`${what}: ${error.message}`); process.exit(1); };

async function main() {
  console.log(WRITE ? `WRITING built-in content${PRUNE ? " (with --prune)" : ""}\n` : "DRY RUN — nothing is written. Pass --write to apply.\n");

  // ── Pages & sections ────────────────────────────────────────────
  const { data: pageRows, error: pagesErr } = await supabase.from("pages").select("id, slug, title, published");
  if (pagesErr) fail("pages", pagesErr);

  for (const page of PAGES) {
    let row = pageRows.find(p => p.slug === page.slug);
    console.log(`── ${page.slug}  (${row ? `"${row.title}"${row.published ? "" : ", UNPUBLISHED"}` : "no page row"})`);

    const { data: dbSections, error } = row
      ? await supabase.from("page_sections").select("*").eq("page_id", row.id).order("position")
      : { data: [], error: null };
    if (error) fail(`sections ${page.slug}`, error);

    for (const s of page.sections) {
      const db = dbSections.find(d => d.label === s.label);
      if (!db) { console.log(`   + ${s.label}  (missing in CMS)`); continue; }
      const want = sectionToRow(s, row.id, 0);
      const changed = Object.values(SECTION_FIELDS).filter(col => norm(db[col]) !== norm(want[col]));
      console.log(changed.length ? `   ~ ${s.label}  differs: ${changed.join(", ")}` : `   = ${s.label}`);
    }
    for (const d of dbSections.filter(d => !page.sections.some(s => s.label === d.label))) {
      console.log(`   - ${d.label}  (${d.type}; only in CMS — ${WRITE ? "removed" : "would be removed"})`);
    }

    if (WRITE) {
      if (!row) {
        const { data, error: insErr } = await supabase.from("pages").insert({ slug: page.slug, title: page.title }).select().single();
        if (insErr) fail(`create page ${page.slug}`, insErr);
        row = data;
      }
      const { error: delErr } = await supabase.from("page_sections").delete().eq("page_id", row.id);
      if (delErr) fail(`clear sections ${page.slug}`, delErr);
      const { error: insErr } = await supabase.from("page_sections").insert(page.sections.map((s, i) => sectionToRow(s, row.id, i)));
      if (insErr) fail(`write sections ${page.slug}`, insErr);
      console.log(`   → wrote ${page.sections.length} sections`);
    }
  }

  // ── Products (by name) and activities (by title) ────────────────
  await syncRows("products", "name", DEFAULT_PRODUCTS, productToRow);
  await syncRows("activities", "title", DEFAULT_INITIATIVES, activityToRow);

  console.log(WRITE ? "\nDone." : "\nDry run complete.");
}

async function syncRows(table, key, defaults, toRow) {
  const { data: rows, error } = await supabase.from(table).select("*");
  if (error) fail(table, error);
  console.log(`\n── ${table}`);
  // The site lists products oldest-first, so on write stamp created_at in
  // built-in order (one second apart) to keep that order.
  const base = Date.now() - defaults.length * 1000;
  for (const [i, d] of defaults.entries()) {
    const row = rows.find(r => r[key] === d[key]);
    const want = toRow(d);
    if (!row) console.log(`   + ${d[key]}`);
    else {
      const changed = Object.keys(want).filter(col => norm(row[col]) !== norm(want[col]));
      console.log(changed.length ? `   ~ ${d[key]}  differs: ${changed.join(", ")}` : `   = ${d[key]}`);
    }
    if (WRITE) {
      const stamped = { ...want, created_at: new Date(base + i * 1000).toISOString() };
      const { error: wErr } = row
        ? await supabase.from(table).update(stamped).eq("id", row.id)
        : await supabase.from(table).insert(stamped);
      if (wErr) fail(`${table} ${d[key]}`, wErr);
    }
  }
  for (const r of rows.filter(r => !defaults.some(d => d[key] === r[key]))) {
    console.log(`   ! ${r[key]}  (only in CMS — ${PRUNE ? (WRITE ? "deleted" : "would be deleted with --prune") : "kept; shown on the site"})`);
    if (WRITE && PRUNE) {
      const { error: dErr } = await supabase.from(table).delete().eq("id", r.id);
      if (dErr) fail(`delete ${table} ${r[key]}`, dErr);
    }
  }
}

main();
