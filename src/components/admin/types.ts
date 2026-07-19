export interface Activity {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  featured: boolean;
  published: boolean;
  emoji: string;
}

export interface School {
  id: string;
  name: string;
  projectType: string;
  location: string;
  state: string;
  beneficiaries: number;
  description: string;
  status: "Active" | "Inactive";
  emoji: string;
}

export type ProductCategory = "Coal" | "Minerals" | "Salt";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  type: string;
  specs: string[];
  applications: string;
  featured: boolean;
  comingSoon: boolean;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: string;
  message: string;
  date: string;
  read: boolean;
}

export interface PageContent {
  id: string;
  slug: string;
  title: string;
  heroHeadline: string;
  heroSubtext: string;
  published: boolean;
  lastEdited: string;
}

export type SectionType = "hero" | "stats" | "cards" | "text" | "cta" | "image-text" | "gallery";

export interface StatItem  { value: string; label: string; }
export interface CardItem  { title: string; desc: string; icon?: string; image?: string; }
export interface GalleryItem { src: string; label: string; }

export interface PageSection {
  id: string;
  type: SectionType;
  label: string;
  visible: boolean;
  // hero / image-text
  headline?: string;
  subtext?: string;
  ctaText?: string;
  ctaLink?: string;
  image?: string;
  // stats
  stats?: StatItem[];
  // cards
  cards?: CardItem[];
  // text
  heading?: string;
  body?: string;
  // cta
  ctaHeading?: string;
  ctaBody?: string;
  ctaBtn?: string;
  // gallery
  gallery?: GalleryItem[];
}

export interface MediaFile {
  id: string;
  name: string;
  type: "image" | "video";
  folder: string;
  size: string;
  url: string;
  date: string;
}

export interface CompanySettings {
  name: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  linkedin: string;
  twitter: string;
  youtube: string;
  estYear: string;
}
