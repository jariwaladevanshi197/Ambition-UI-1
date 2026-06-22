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

export interface Product {
  id: string;
  name: string;
  type: string;
  gcv: string;
  ash: string;
  moisture: string;
  applications: string;
  featured: boolean;
}

export interface Message {
  id: string;
  name: string;
  email: string;
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

export interface MediaFile {
  id: string;
  name: string;
  type: "image" | "video";
  folder: string;
  size: string;
  emoji: string;
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
