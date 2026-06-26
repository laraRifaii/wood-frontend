import HeroSection from "@/components/sections/HeroSection";
import WoodSection from "@/components/sections/WoodSection";
import GallerySection from "@/components/sections/GallerySection";
import AdvantagesSection from "@/components/sections/AdvantagesSection";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";
import { defaultContent } from "@/lib/content";

export default function HomePage() {
  const content = defaultContent;

  return (
    <>
      <main>
        <HeroSection
          title={content.hero.title}
          subtitle={content.hero.subtitle}
          ctaText={content.hero.ctaText}
          ctaLink={content.hero.ctaLink}
        />
        <WoodSection woodTypes={content.woodTypes} />
        <GallerySection images={content.gallery} />
        <AdvantagesSection
          image={content.advantagesSection.image}
          items={content.advantagesSection.items}
          cta={content.advantagesSection.cta}
        />
        <AboutSection
          brandName={content.aboutSection.brandName}
          description={content.aboutSection.description}
          image1={content.aboutSection.image1}
          image2={content.aboutSection.image2}
          image3={content.aboutSection.image3}
        />
        <ContactSection />
        
      </main>
    </>
  );
}
