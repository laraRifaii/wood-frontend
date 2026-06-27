import AboutSection from "@/components/sections/AboutSection";
import { defaultContent } from "../../lib/content";
import {
  getHero,
  getWoodTypes,
  getGallery,
  getAbout,
  getAdvantages,
} from "@/lib/content.api";
import ContactSection from "@/components/sections/ContactSection";
import GallerySection from "@/components/sections/GallerySection";

export default async function AboutPage() {
  const { aboutSection, advantagesSection } = defaultContent;

  try {
    const [hero, woodTypes, gallery, about, advantages] = await Promise.all([
      getHero(),
      getWoodTypes(),
      getGallery(),
      getAbout(),
      getAdvantages(),
    ]);

    return (
      <main>
        <GallerySection images={gallery} />

        <AboutSection
          brandName={about.brandName}
          description={about.description}
          image1={about.image1}
          image2={about.image2}
          image3={about.image3}
        />
        <ContactSection />
      </main>
    );
  } catch (error) {
    return (
      <main
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#1E0C06" }}
      >
        <div className="text-center">
          <p
            className="text-sm"
            style={{ color: "#7A574B", fontFamily: "Inter, sans-serif" }}
          >
            Unable to load content. Make sure the backend is running on{" "}
            {process.env.NEXT_PUBLIC_API_URL}.
          </p>
        </div>
      </main>
    );
  }
}
