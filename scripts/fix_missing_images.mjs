import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";

config({ path: new URL("../.env.local", import.meta.url) });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SECRET_KEY);

async function updateSection(slug, label, patch) {
  const { data: page } = await supabase.from("pages").select("id").eq("slug", slug).single();
  const { data: section } = await supabase.from("page_sections").select("*").eq("page_id", page.id).eq("label", label).single();
  if (!section) { console.log(`SKIP ${slug} / ${label}: not found`); return; }
  const { error } = await supabase.from("page_sections").update(patch).eq("id", section.id);
  console.log(`${slug} / ${label}:`, error ? "ERROR: " + error.message : "ok");
}

function withCardImages(existingCards, imageByTitle) {
  return existingCards.map(c => ({ ...c, image: imageByTitle[c.title] ?? c.image }));
}

async function main() {
  // Home hero — real background image, was missing.
  await updateSection("/", "Hero Banner", { image: "/images/Gemini_Generated_Image_680jx7680jx7680j.png" });

  // Services — Services Grid cards (6), each has its own real image live.
  {
    const { data: page } = await supabase.from("pages").select("id").eq("slug", "/services").single();
    const { data: section } = await supabase.from("page_sections").select("*").eq("page_id", page.id).eq("label", "Services Grid").single();
    if (section) {
      const images = {
        "Coal Trading & Sourcing": "/images/Gemini_Generated_Image_680jx7680jx7680j.png",
        "Stevedoring & Port Operations": "/images/port.jpg",
        "International Trading": "/images/shipping.jpg",
        "Road Transportation": "/images/Gemini_Generated_Image_maelcimaelcimael.png",
        "Unloading & Stacking": "/images/mining.jpg",
        "Minerals Trading": "/images/Gemini_Generated_Image_imewt4imewt4imew.png",
      };
      const cards = withCardImages(section.cards, images);
      const { error } = await supabase.from("page_sections").update({ cards }).eq("id", section.id);
      console.log("/services / Services Grid:", error ? "ERROR: " + error.message : "ok");
    } else console.log("SKIP /services / Services Grid: not found");
  }

  // Services — Coal Products (4)
  {
    const { data: page } = await supabase.from("pages").select("id").eq("slug", "/services").single();
    const { data: section } = await supabase.from("page_sections").select("*").eq("page_id", page.id).eq("label", "Coal Products").single();
    if (section) {
      const images = {
        "Steam Coal — Indonesia": "/images/Gemini_Generated_Image_6wi0526wi0526wi0.png",
        "Steam Coal — South Africa": "/images/Gemini_Generated_Image_imewt4imewt4imew.png",
        "Steam Coal — Kenya / Zimbabwe": "/images/Gemini_Generated_Image_maelcimaelcimael.png",
        "Coking Coal": "/images/Gemini_Generated_Image_urm0uqurm0uqurm0.png",
      };
      const cards = withCardImages(section.cards, images);
      const { error } = await supabase.from("page_sections").update({ cards }).eq("id", section.id);
      console.log("/services / Coal Products:", error ? "ERROR: " + error.message : "ok");
    } else console.log("SKIP /services / Coal Products: not found");
  }

  // Services — Minerals (shared image on live page)
  {
    const { data: page } = await supabase.from("pages").select("id").eq("slug", "/services").single();
    const { data: section } = await supabase.from("page_sections").select("*").ilike("label", "Minerals%").eq("page_id", page.id).maybeSingle();
    if (section) {
      const cards = section.cards.map(c => ({ ...c, image: "/images/minerals.jpg" }));
      const { error } = await supabase.from("page_sections").update({ cards }).eq("id", section.id);
      console.log("/services / Minerals:", error ? "ERROR: " + error.message : "ok");
    } else console.log("SKIP /services / Minerals: not found");
  }

  // Services — Salt Products (2)
  {
    const { data: page } = await supabase.from("pages").select("id").eq("slug", "/services").single();
    const { data: section } = await supabase.from("page_sections").select("*").eq("page_id", page.id).eq("label", "Salt Products").single();
    if (section) {
      const images = {
        "Industrial Grade Salt": "/images/Gemini_Generated_Image_kt7gkdkt7gkdkt7gb.png",
        "Edible Salt": "/images/Gemini_Generated_Image_kt7gkdkt7gkdkt7gd.png",
      };
      const cards = withCardImages(section.cards, images);
      const { error } = await supabase.from("page_sections").update({ cards }).eq("id", section.id);
      console.log("/services / Salt Products:", error ? "ERROR: " + error.message : "ok");
    } else console.log("SKIP /services / Salt Products: not found");
  }

  // CSR — CSR Projects (5), each has its own real image live.
  {
    const { data: page } = await supabase.from("pages").select("id").eq("slug", "/csr").single();
    const { data: section } = await supabase.from("page_sections").select("*").eq("page_id", page.id).eq("label", "CSR Projects").single();
    if (section) {
      const images = {
        "School Adoption Program": "/images/Gemini_Generated_Image_9jp8wd9jp8wd9jp8.png",
        "Community Healthcare Initiative": "/images/Gemini_Generated_Image_y1eikuy1eikuy1ei.png",
        "Clean Water Access": "/images/port.jpg",
        "Women Skill Development": "/images/Gemini_Generated_Image_6wi0526wi0526wi0.png",
        "Green India Drive": "/images/shipping.jpg",
      };
      const cards = withCardImages(section.cards, images);
      const { error } = await supabase.from("page_sections").update({ cards }).eq("id", section.id);
      console.log("/csr / CSR Projects:", error ? "ERROR: " + error.message : "ok");
    } else console.log("SKIP /csr / CSR Projects: not found");
  }

  console.log("Done.");
}

main();
