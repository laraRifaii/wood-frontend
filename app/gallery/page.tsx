import ContactSection from "@/components/sections/ContactSection";
import GallerySection from "@/components/sections/GallerySection";
import WoodSection from "@/components/sections/WoodSection";
import { getGallery, getWoodTypes } from "@/lib/content.api";

export default async function GalleryPage() {
  const [gallery, woodType] = await Promise.all([getGallery(), getWoodTypes()]);
  return (
    <>
      <main>
        <GallerySection images={gallery} />
        <WoodSection woodTypes={woodType} />
        <ContactSection />
      </main>
    </>
  );
}
