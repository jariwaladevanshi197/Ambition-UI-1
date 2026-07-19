import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";

config({ path: new URL("../.env.local", import.meta.url) });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SECRET_KEY);

async function main() {
  // 1. Rename the /activities page (it used to mean "Activities & CSR" combined; now it's operations-only)
  const { error: renameErr } = await supabase.from("pages").update({ title: "Activities" }).eq("slug", "/activities");
  console.log("rename /activities:", renameErr ? renameErr.message : "ok");

  // 2. Add the missing /csr page
  const { data: csrPage, error: csrInsertErr } = await supabase.from("pages")
    .upsert({ slug: "/csr", title: "CSR & Impact" }, { onConflict: "slug" })
    .select().single();
  console.log("insert /csr page:", csrInsertErr ? csrInsertErr.message : `ok (${csrPage?.id})`);

  const { data: pages } = await supabase.from("pages").select("id, slug");
  const idBySlug = Object.fromEntries(pages.map(p => [p.slug, p.id]));

  // 3. Replace /activities sections with what's actually live now (operations, not CSR events)
  const activitiesSections = [
    { type:"hero",  label:"Activities Hero", visible:true,
      headline:"Our Activities",
      subtext:"From bulk vessel unloading to nationwide dispatch — here's how we keep India's coal, minerals and salt supply moving." },
    { type:"stats", label:"Hero Stats", visible:true,
      stats:[{value:"20+",label:"Years Experience"},{value:"15+",label:"Ports Operated"},{value:"50+",label:"Cities Served"},{value:"1M+",label:"Tons Delivered"}] },
    { type:"cards", label:"Core Operations", visible:true,
      cards:[
        {title:"Bulk Vessel Unloading",       desc:"High-capacity unloading of bulk carriers at 15+ major Indian ports including Paradip, Haldia and Vizag."},
        {title:"Stacking & Heaping",          desc:"Systematic stacking and heaping of coal and minerals to prevent oxidation and preserve material quality."},
        {title:"Internal Shifting",           desc:"Efficient movement of cargo within port premises between berths, yards and storage zones."},
        {title:"International Coal Sourcing", desc:"Direct sourcing partnerships across Indonesia, South Africa, Kenya and Zimbabwe with independent quality testing."},
        {title:"Quality Assurance Testing",   desc:"Independent international testing at mine, mother vessel and final delivery — for every shipment, every time."},
        {title:"Salt Trading",                desc:"Industrial Grade Salt available now, with a dedicated Edible Salt brand launching soon."},
        {title:"Road Dispatch",               desc:"Doorstep delivery covering 50+ cities through our dedicated road transport network."},
        {title:"Rail Dispatch",               desc:"Bulk cargo movement via railway rakes for long-distance, high-volume delivery."},
        {title:"Minerals Sourcing",           desc:"Manganese, Silica and Zinc ore sourced from Zimbabwe, Kenya and Mozambique."},
      ] },
    { type:"gallery", label:"Photo Gallery", visible:true, gallery:[] },
  ];

  // 4. Add /csr sections matching what's actually live
  const csrSections = [
    { type:"hero",  label:"CSR Hero", visible:true,
      headline:"Creating Impact||Beyond Business.",
      subtext:"Our commitment to community, education, environment and healthcare shapes every decision we make." },
    { type:"stats", label:"Impact at a Glance", visible:true,
      stats:[{value:"5",label:"CSR Project Types"},{value:"20+",label:"Active Projects"},{value:"5,000+",label:"Beneficiaries"},{value:"50,000+",label:"Trees Planted"}] },
    { type:"cards", label:"CSR Projects", visible:true,
      cards:[
        {title:"School Adoption Program",       desc:"Adopted 4 government schools across Jharkhand, Maharashtra, Chhattisgarh and Andhra Pradesh."},
        {title:"Community Healthcare Initiative",desc:"Monthly free medical camps in tribal and mining-adjacent communities."},
        {title:"Clean Water Access",             desc:"Bore-wells and water purification units installed in 6 villages."},
        {title:"Women Skill Development",        desc:"Skill development workshops in weaving, tailoring, digital literacy and self-help groups."},
        {title:"Green India Drive",               desc:"Annual plantation drives, e-waste collection and ESG-aligned operational practices."},
      ] },
    { type:"cards", label:"Recent Initiatives", visible:true,
      cards:[
        {title:"Annual Plantation Drive",          desc:"2,000 saplings planted across 5 locations in Jharkhand — Jun 2024"},
        {title:"Free Medical Camp — Dhanbad",      desc:"800+ villagers served, doctors from 3 hospitals — May 2024"},
        {title:"School Supply Distribution",       desc:"450 students across 3 adopted schools — Apr 2024"},
      ] },
    { type:"gallery", label:"CSR Photo Gallery", visible:true, gallery:[] },
    { type:"cta", label:"Partner CTA", visible:true,
      ctaHeading:"Want to Partner with Us?", ctaBody:"We welcome NGOs, government bodies, and corporations to collaborate on CSR initiatives across India.", ctaBtn:"Get in Touch" },
  ];

  for (const [slug, sections] of [["/activities", activitiesSections], ["/csr", csrSections]]) {
    const pageId = idBySlug[slug];
    await supabase.from("page_sections").delete().eq("page_id", pageId);
    const rows = sections.map(({ ctaHeading, ctaBody, ctaBtn, headline, ...s }, i) => ({
      page_id: pageId, position: i, stats: [], cards: [], gallery: [],
      headline: headline?.replace("||", "\n") ?? null,
      cta_heading: ctaHeading ?? null, cta_body: ctaBody ?? null, cta_btn: ctaBtn ?? null,
      ...s,
    }));
    const { error } = await supabase.from("page_sections").insert(rows);
    console.log(`sections ${slug}:`, error ? error.message : `ok (${rows.length})`);
  }

  console.log("Done.");
}

main();
