// ─── Auth ───────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

// ─── Hero ────────────────────────────────────────────────────────────────────

export interface HeroContent {
  id?: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage?: string;
  updatedAt?: string;
}

// ─── Wood Types ──────────────────────────────────────────────────────────────

export interface WoodTypeImage {
  id: string;
  url: string;
  order: number;
  woodTypeId: string;
  createdAt?: string;
}

export interface WoodType {
  id?: string;
  name: string;
  pros: string[];
  cons: string[];
  order?: number;
  image?: string;        // used in static/fallback content
  images?: WoodTypeImage[]; // returned by backend
  createdAt?: string;
  updatedAt?: string;
}

// ─── Services ────────────────────────────────────────────────────────────────

export interface Service {
  id: string;
  title: string;
  description: string;
  icon?: string;
  image?: string;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

// ─── Gallery ─────────────────────────────────────────────────────────────────

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category?: string;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

// ─── About ───────────────────────────────────────────────────────────────────

export interface TextSection {
  id?: string;
  brandName: string;
  description: string;
  image1?: string;
  image2?: string;
  image3?: string;
  updatedAt?: string;
}

// ─── Advantages ──────────────────────────────────────────────────────────────

export interface AdvantageItem {
  id?: string;
  description: string;
  order?: number;
  advantagesSectionId?: string;
}

export interface AdvantagesSection {
  id?: string;
  image?: string;
  cta: string;
  items: AdvantageItem[];
  updatedAt?: string;
}

// ─── Full site content (used for static fallback) ────────────────────────────

export interface SiteContent {
  hero: HeroContent;
  woodTypes: WoodType[];
  services: Service[];
  gallery: GalleryImage[];
  aboutSection: TextSection;
  advantagesSection: AdvantagesSection;
}