import ContactSection from "@/components/sections/ContactSection";
import GallerySection from "@/components/sections/GallerySection";
import WoodSection from "@/components/sections/WoodSection";
import { defaultContent } from "@/lib/content";

export default function GalleryPage() {
  const content = defaultContent;
  return (
    <>
      <main className="pt-20">
        <GallerySection images={content.gallery} />
        <WoodSection woodTypes={content.woodTypes} />
        <ContactSection />
      </main>
    </>
  );
}
