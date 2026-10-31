// DB row <-> app type mapping, shared by the admin panel (browser) and the
// public site's server-side loaders.
import type {
  Activity, School, Product, Message, PageSection, MediaFile, CompanySettings,
} from "@/components/admin/types";
import { DEFAULT_SETTINGS } from "@/content/settings";

type Row = Record<string, unknown>;

export function activityFromDb(row: Row): Activity {
  return {
    id: row.id as string,
    title: row.title as string,
    description: (row.description as string) ?? "",
    category: row.category as string,
    date: (row.date as string) ?? "",
    featured: row.featured as boolean,
    published: row.published as boolean,
    emoji: (row.emoji as string) ?? "",
    highlight: (row.highlight as string) ?? "",
    highlightLabel: (row.highlight_label as string) ?? "",
  };
}
export function activityToDb(a: Omit<Activity, "id">) {
  return {
    title: a.title, description: a.description, category: a.category, date: a.date,
    featured: a.featured, published: a.published, emoji: a.emoji,
    highlight: a.highlight, highlight_label: a.highlightLabel,
  };
}

export function schoolFromDb(row: Row): School {
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
export function schoolToDb(s: Omit<School, "id">) {
  return {
    name: s.name, project_type: s.projectType, location: s.location, state: s.state,
    beneficiaries: s.beneficiaries, description: s.description, status: s.status, emoji: s.emoji,
  };
}

export function productFromDb(row: Row): Product {
  return {
    id: row.id as string,
    name: row.name as string,
    category: row.category as Product["category"],
    type: row.type as string,
    description: (row.description as string) ?? "",
    image: (row.image as string) ?? "",
    specs: (row.specs as string[]) ?? [],
    applications: (row.applications as string) ?? "",
    featured: row.featured as boolean,
    comingSoon: (row.coming_soon as boolean) ?? false,
  };
}
export function productToDb(p: Omit<Product, "id">) {
  return {
    name: p.name, category: p.category, type: p.type, description: p.description, image: p.image,
    specs: p.specs, applications: p.applications, featured: p.featured, coming_soon: p.comingSoon,
  };
}

export function messageFromDb(row: Row): Message {
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

export function settingsFromDb(row: Row): CompanySettings {
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
export function settingsToDb(s: CompanySettings) {
  return {
    name: s.name, tagline: s.tagline, email: s.email, phone: s.phone, address: s.address,
    linkedin: s.linkedin, twitter: s.twitter, youtube: s.youtube, est_year: s.estYear,
    updated_at: new Date().toISOString(),
  };
}

export function sectionFromDb(row: Row): PageSection {
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
export function sectionToDb(s: PageSection, pageId: string, position: number) {
  return {
    page_id: pageId, type: s.type, label: s.label, visible: s.visible, position,
    headline: s.headline ?? null, subtext: s.subtext ?? null,
    cta_text: s.ctaText ?? null, cta_link: s.ctaLink ?? null, image: s.image ?? null,
    heading: s.heading ?? null, body: s.body ?? null,
    cta_heading: s.ctaHeading ?? null, cta_body: s.ctaBody ?? null, cta_btn: s.ctaBtn ?? null,
    stats: s.stats ?? [], cards: s.cards ?? [], gallery: s.gallery ?? [],
  };
}

export function mediaFromDb(row: Row, publicUrl: (path: string) => string): MediaFile {
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
