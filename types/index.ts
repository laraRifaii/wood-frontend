export interface HeroContent {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage: string;
}

export interface WoodType {
  name: string;
  image: string;
  pros: string[];
  cons: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category?: string;
  order?: number;
}

export interface TextSection {
  brandName:string,
  description:string,
  image1:string,
  image2:string,
  image3:string
}

export interface SiteContent {
  hero: HeroContent;
  woodTypes: WoodType[];
  services: Service[];
  gallery: GalleryImage[];
  aboutSection: TextSection;
  advantagesSection: {
    cta: string;
    items: { description: string }[];
    image: string;
  };
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}
