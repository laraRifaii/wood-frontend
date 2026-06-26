import { SiteContent } from "../types";

export const defaultContent: SiteContent = {
  hero: {
    title: "SOLID\nWOOD\nPRODUCTS",
    subtitle:
      "Handcrafted furniture and woodwork from premium hardwoods. Built to last generations.",
    ctaText: "View Our Work",
    ctaLink: "/gallery",
    backgroundImage: "/images/hero-bg.jpg",
  },
  woodTypes: [
    {
      name: "Oak",
      image: "/images/oak.jpg",
      pros: ["Durability", "Beautiful texture", "Water resistance"],
      cons: ["Expensive"],
    },
    {
      name: "Buk",
      image: "/images/buk.jpg",
      pros: ["Durability"],
      cons: ["Hard to handle"],
    },
    {
      name: "Ash",
      image: "/images/ash.jpg",
      pros: ["Durability"],
      cons: ["Hard to handle"],
    },
  ],
  services: [
    {
      id: "1",
      title: "Custom Furniture",
      description:
        "Bespoke tables, chairs, shelving, and cabinetry tailored to your exact specifications.",
      icon: "sofa",
      image: "/images/service-furniture.jpg",
    },
    {
      id: "2",
      title: "Interior Woodwork",
      description:
        "Wall cladding, ceiling beams, staircases, and built-in features for any space.",
      icon: "home",
      image: "/images/service-interior.jpg",
    },
    {
      id: "3",
      title: "Restoration",
      description:
        "Expert restoration of antique and damaged wooden pieces back to their original glory.",
      icon: "wrench",
      image: "/images/service-restoration.jpg",
    },
  ],
  gallery: [
    {
      id: "1",
      src: "/images/gallery.jpg",
      alt: "Oak dining table",
      category: "Furniture",
      order: 1,
    },
    {
      id: "2",
      src: "/images/background.jpg",
      alt: "Walnut shelving",
      category: "Interior",
      order: 2,
    },
    {
      id: "3",
      src: "/images/gallery.jpg",
      alt: "Pine cabinet",
      category: "Furniture",
      order: 3,
    },
    {
      id: "4",
      src: "/images/gallery.jpg",
      alt: "Cherry desk",
      category: "Furniture",
      order: 4,
    },
  ],
  aboutSection: {
    brandName: "BIO CWT",
    description:
      "BIO CWT  - We manufacture solid wood products according to individual drawings. We make chairs, armchairs, wardrobes, beds and much more in our own workshop, equipped with all the necessary industrial equipment.",
    image1: "/images/about1.png",
    image2: "/images/about2.png",
    image3: "/images/about3.png",
  },
  advantagesSection: {
    image: "/images/advantages.png",
    cta: "Receive a consultation",
    items: [
      {
        description: "In-house carpentry production",
      },
      {
        description:
          "We only treat wood with environmentally friendly and safe products",
      },
      {
        description: "Prices from the manufacturer, no extra charges",
      },
    ],
  },
};

// In-memory store (replace with DB calls when backend is ready)
// let contentStore: SiteContent = { ...defaultContent };

// export function getContent(): SiteContent {
//   return contentStore;
// }

// export function updateContent(updates: Partial<SiteContent>): SiteContent {
//   contentStore = { ...contentStore, ...updates };
//   return contentStore;
// }

// export function updateHero(hero: Partial<SiteContent['hero']>): SiteContent {
//   contentStore.hero = { ...contentStore.hero, ...hero };
//   return contentStore;
// }

// export function updateWoodType(id: string, data: Partial<import('@/types').WoodType>): SiteContent {
//   contentStore.woodTypes = contentStore.woodTypes.map(w => w.id === id ? { ...w, ...data } : w);
//   return contentStore;
// }

// export function addWoodType(data: Omit<import('@/types').WoodType, 'id'>): SiteContent {
//   const newItem = { ...data, id: Date.now().toString() };
//   contentStore.woodTypes = [...contentStore.woodTypes, newItem];
//   return contentStore;
// }

// export function deleteWoodType(id: string): SiteContent {
//   contentStore.woodTypes = contentStore.woodTypes.filter(w => w.id !== id);
//   return contentStore;
// }

// export function updateService(id: string, data: Partial<import('@/types').Service>): SiteContent {
//   contentStore.services = contentStore.services.map(s => s.id === id ? { ...s, ...data } : s);
//   return contentStore;
// }

// export function addService(data: Omit<import('@/types').Service, 'id'>): SiteContent {
//   const newItem = { ...data, id: Date.now().toString() };
//   contentStore.services = [...contentStore.services, newItem];
//   return contentStore;
// }

// export function deleteService(id: string): SiteContent {
//   contentStore.services = contentStore.services.filter(s => s.id !== id);
//   return contentStore;
// }

// export function updateGalleryImages(images: import('@/types').GalleryImage[]): SiteContent {
//   contentStore.gallery = images;
//   return contentStore;
// }
