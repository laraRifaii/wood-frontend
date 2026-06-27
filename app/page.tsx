import HeroSection from "@/components/sections/HeroSection";
import WoodSection from "@/components/sections/WoodSection";
import GallerySection from "@/components/sections/GallerySection";
import AdvantagesSection from "@/components/sections/AdvantagesSection";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";
import {
  getHero,
  getWoodTypes,
  getGallery,
  getAbout,
  getAdvantages,
} from "@/lib/content.api";

export default async function HomePage() {
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
        <HeroSection
          title={hero.title}
          subtitle={hero.subtitle}
          ctaText={hero.ctaText}
          ctaLink={hero.ctaLink}
          backgroundImage={hero.backgroundImage}
          image1={hero.image1}
          image2={hero.image2}
          image3={hero.image3}
        />
        <div className="mt-50 md:mt-20">
          <WoodSection woodTypes={woodTypes} />
        </div>

        <GallerySection images={gallery} />
        <AdvantagesSection
          image={advantages.image}
          items={advantages.items}
          cta={advantages.cta}
        />
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
