import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";

config({ path: new URL("../.env.local", import.meta.url) });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SECRET_KEY);

async function main() {
  // ── Activities ──────────────────────────────────────────────
  const { data: existingActs } = await supabase.from("activities").select("id").limit(1);
  if (existingActs?.length) {
    console.log("activities: already seeded, skipping");
  } else {
    const { error: actErr } = await supabase.from("activities").insert([
      { title:"Plantation Drive — June 2024", description:"Community plantation drive across 5 locations in Jharkhand, planting 2000 saplings.", category:"Environment", date:"2024-06-15", featured:true,  published:true,  emoji:"🌳" },
      { title:"Free Medical Camp — Dhanbad",   description:"Free health check-up camp serving 800+ villagers with doctors from 3 hospitals.", category:"Healthcare",   date:"2024-05-10", featured:false, published:true,  emoji:"🏥" },
      { title:"School Supply Distribution",    description:"Distribution of stationery kits to 450 students across 3 adopted schools.",     category:"Education",    date:"2024-04-22", featured:true,  published:true,  emoji:"📚" },
      { title:"Women Skill Workshop",           description:"2-day skill development workshop for 120 women in weaving and handicrafts.",      category:"Community",    date:"2024-03-08", featured:false, published:false, emoji:"👩" },
    ]);
    console.log("activities:", actErr ? actErr.message : "ok");
  }

  // ── Schools ─────────────────────────────────────────────────
  const { data: existingSchools } = await supabase.from("schools").select("id").limit(1);
  if (existingSchools?.length) {
    console.log("schools: already seeded, skipping");
  } else {
    const { error: schErr } = await supabase.from("schools").insert([
      { name:"Govt. Primary School, Dhanbad",    project_type:"School",             location:"Dhanbad",       state:"Jharkhand",     beneficiaries:450,  description:"Adopted in 2018. Infrastructure upgraded, library built.",            status:"Active", emoji:"🏫" },
      { name:"Zilla Parishad School, Nagpur",    project_type:"School",             location:"Nagpur",        state:"Maharashtra",   beneficiaries:320,  description:"Adopted in 2020. Mid-day meal program & digital classroom.",           status:"Active", emoji:"🏫" },
      { name:"Free Medical Camp, Korba",         project_type:"Healthcare",         location:"Korba",         state:"Chhattisgarh",  beneficiaries:1200, description:"Monthly health check-up camp. Doctors from 3 hospitals.",             status:"Active", emoji:"🏥" },
      { name:"Women Skill Centre, Visakhapatnam",project_type:"Women Empowerment",  location:"Visakhapatnam", state:"Andhra Pradesh",beneficiaries:180,  description:"Skill development in weaving, tailoring, and digital literacy.",       status:"Active", emoji:"👩" },
      { name:"Clean Water Project, Dhanbad",     project_type:"Water & Sanitation", location:"Dhanbad",       state:"Jharkhand",     beneficiaries:3000, description:"Installed 12 borewells and 4 water purification units in villages.",    status:"Active", emoji:"💧" },
    ]);
    console.log("schools:", schErr ? schErr.message : "ok");
  }

  // ── Products ────────────────────────────────────────────────
  const { data: existingProducts } = await supabase.from("products").select("id").limit(1);
  if (existingProducts?.length) {
    console.log("products: already seeded, skipping");
  } else {
    const { error: prodErr } = await supabase.from("products").insert([
      { name:"Thermal Coal (Domestic)", type:"Thermal",     gcv:"3800–5500 kcal/kg", ash:"26–38%", moisture:"8–14%",  applications:"Power plants, captive power",      featured:true  },
      { name:"Imported Thermal Coal",   type:"Imported",    gcv:"5500–6500 kcal/kg", ash:"10–18%", moisture:"8–12%",  applications:"Large power & steel plants",        featured:true  },
      { name:"Coking Coal",             type:"Coking",      gcv:"6000–7500 kcal/kg", ash:"8–12%",  moisture:"8–10%",  applications:"Steel & metallurgy",                featured:false },
      { name:"Petcoke / Blends",        type:"Petcoke",     gcv:"7500–8500 kcal/kg", ash:"<1%",    moisture:"5–8%",   applications:"Cement, lime, glass",               featured:false },
    ]);
    console.log("products:", prodErr ? prodErr.message : "ok");
  }

  // ── Settings (single row) ──────────────────────────────────
  const { error: setErr } = await supabase.from("settings").update({
    name:"Ambition Coal Pvt. Ltd.",
    tagline:"Providing a One Stop Coal Solution.",
    email:"info@ambitioncoal.in",
    phone:"+91 XXXXX XXXXX",
    address:"Registered at Registrar of Companies, Ahmedabad, Gujarat",
    linkedin:"https://linkedin.com/company/ambitioncoal",
    twitter:"https://twitter.com/ambitioncoal",
    youtube:"https://youtube.com/@ambitioncoal",
    est_year:"2010",
  }).eq("id", true);
  console.log("settings:", setErr ? setErr.message : "ok");

  // ── Pages + Sections ────────────────────────────────────────
  const pagesData = [
    { slug:"/",           title:"Home" },
    { slug:"/about",      title:"About Us" },
    { slug:"/services",   title:"Services" },
    { slug:"/activities", title:"Activities & CSR" },
    { slug:"/contact",    title:"Contact" },
  ];
  const { data: pageRows, error: pageErr } = await supabase.from("pages").upsert(pagesData, { onConflict: "slug" }).select();
  console.log("pages:", pageErr ? pageErr.message : `ok (${pageRows?.length})`);

  const idBySlug = Object.fromEntries((pageRows ?? []).map(p => [p.slug, p.id]));

  const sectionsBySlug = {
    "/": [
      { type:"hero",  label:"Hero Banner",     visible:true, headline:"Powering Industries. Connecting the World.", subtext:"Building sustainable energy and logistics solutions across India and global markets.", cta_text:"Explore Solutions", cta_link:"/services", image:"/images/Gemini_Generated_Image_680jx7680jx7680j.png" },
      { type:"stats", label:"Key Stats",       visible:true, stats:[{value:"20+",label:"Years"},{value:"1M+",label:"Tons Delivered"},{value:"50+",label:"Cities"}] },
      { type:"cards", label:"Services Preview",visible:true, cards:[{title:"Coal Trading",desc:"End-to-end coal sourcing"},{title:"Port Ops",desc:"Bulk cargo handling"},{title:"Logistics",desc:"Doorstep delivery"}] },
      { type:"text",  label:"About Section",   visible:true, heading:"Trusted Since 2003", body:"Ambition Coal Pvt. Ltd. — pioneers in imported coal supply across India." },
      { type:"cta",   label:"CTA Banner",      visible:true, cta_heading:"Ready to Partner?", cta_body:"Get in touch with our team.", cta_btn:"Contact Us" },
    ],
    "/about": [
      { type:"hero",       label:"Hero Carousel", visible:true, headline:"Pioneers in Imported Coal.", subtext:"Promoted by Mr. Jayesh Mahesh Agrawal & Yashika Jayesh Agrawal.", image:"/images/Gemini_Generated_Image_680jx7680jx7680j.png" },
      { type:"text",       label:"Our Story",     visible:true, heading:"Our Story", body:"Ambition Coal was established in 2003 in Mumbai with a vision to transform India's coal supply chain." },
      { type:"stats",      label:"Milestones Strip", visible:true, stats:[{value:"2003",label:"Founded"},{value:"1M+",label:"Tons/Year"},{value:"50+",label:"Cities"}] },
      { type:"image-text", label:"Leadership",    visible:true, heading:"Our Leadership", body:"Directed by Jayesh & Yashika Agrawal with 20+ years of industry expertise.", image:"/images/Gemini_Generated_Image_9jp8wd9jp8wd9jp8.png" },
      { type:"cards",      label:"Why Choose Us", visible:true, cards:[{title:"Competitive Pricing",desc:"Best rates guaranteed"},{title:"Global Sourcing",desc:"6+ countries"},{title:"Quality Assured",desc:"ISO certified"}] },
    ],
    "/services": [
      { type:"hero",  label:"Services Hero", visible:true, headline:"Quality Coal. Reliable Supply.", subtext:"From mine to doorstep — end-to-end coal solutions.", image:"/images/Gemini_Generated_Image_680jx7680jx7680j.png" },
      { type:"cards", label:"Coal Products", visible:true, cards:[{title:"Steam Coal — Indonesia",desc:"5500–6500 kcal/kg"},{title:"Steam Coal — South Africa",desc:"5800–6200 kcal/kg"},{title:"Coking Coal",desc:"6000–7500 kcal/kg"}] },
      { type:"cards", label:"Service Types", visible:true, cards:[{title:"Coal Trading",desc:"End-to-end sourcing"},{title:"Port Operations",desc:"15+ ports"},{title:"Road Transport",desc:"50+ cities"}] },
      { type:"stats", label:"Salt Products", visible:true, stats:[{value:"Industrial",label:"Grade Salt"},{value:"Edible",label:"Food Grade"}] },
      { type:"cta",   label:"Request Quote CTA", visible:true, cta_heading:"Request a Quote", cta_body:"Get pricing for your coal requirements.", cta_btn:"Get Quote" },
    ],
    "/activities": [
      { type:"hero",    label:"Activities Hero",    visible:true, headline:"Our Activities", subtext:"From plantation drives to medical camps — every initiative counts.", image:"/images/Gemini_Generated_Image_9jp8wd9jp8wd9jp8.png" },
      { type:"stats",   label:"Impact Stats",       visible:true, stats:[{value:"9+",label:"2024 Initiatives"},{value:"5K+",label:"Beneficiaries"},{value:"5",label:"States"}] },
      { type:"cards",   label:"Recent Initiatives", visible:true, cards:[{title:"Plantation Drive",desc:"2,000 saplings — Jun 2024"},{title:"Medical Camp",desc:"800+ villagers — May 2024"},{title:"School Supplies",desc:"450 students — Apr 2024"}] },
      { type:"gallery", label:"Photo Gallery",      visible:true, gallery:[{src:"/images/Gemini_Generated_Image_680jx7680jx7680j.png",label:"Operations"},{src:"/images/port.jpg",label:"Port"}] },
    ],
    "/contact": [
      { type:"hero", label:"Contact Hero", visible:true, headline:"Get In Touch", subtext:"Reach out to our team for coal enquiries, partnerships or general questions." },
      { type:"text", label:"Office Info",  visible:true, heading:"Our Office", body:"Ambition House, BKC, Mumbai 400051\n+91 22 XXXX XXXX\ninfo@ambitioncoal.co.in" },
      { type:"cta",  label:"Quick Contact CTA", visible:true, cta_heading:"Ready to talk?", cta_body:"Fill the form or call us directly.", cta_btn:"Send Message" },
    ],
  };

  for (const [slug, sections] of Object.entries(sectionsBySlug)) {
    const pageId = idBySlug[slug];
    if (!pageId) { console.log(`skip ${slug}: no page id`); continue; }
    await supabase.from("page_sections").delete().eq("page_id", pageId);
    const rows = sections.map((s, i) => ({ page_id: pageId, position: i, stats: [], cards: [], gallery: [], ...s }));
    const { error } = await supabase.from("page_sections").insert(rows);
    console.log(`sections ${slug}:`, error ? error.message : `ok (${rows.length})`);
  }

  console.log("Seed complete.");
}

main();
