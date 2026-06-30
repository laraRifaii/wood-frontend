import { getImageUrl } from "@/lib/utils";
import { TextSection } from "@/types";

export default function AboutSection({
  brandName,
  description,
  image1,
  image2,
  image3,
}: TextSection) {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="bg-obsidian rounded-3xl p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">

          {/* Left — text */}
          <div className="flex-1 min-w-0">
            <h2 className="font-kyiv text-white leading-tight mb-6"
              style={{ fontSize: 'clamp(36px, 5vw, 56px)' }}>
              ABOUT US
            </h2>
            <p className="text-white text-sm md:text-base leading-relaxed font-inter">
              <strong>{brandName}</strong>{brandName && description ? ' — ' : ''}{description}
            </p>
          </div>

          {/* Right — staggered overlapping images */}
          {(image1 || image2 || image3) && (
            <div className="relative flex-shrink-0 w-48 md:w-64 h-56 md:h-72">
              {image1 && (
                <img
                  src={getImageUrl(image1)}
                  alt="About 1"
                  className="absolute top-0 right-0 w-32 h-32 md:w-44 md:h-44 rounded-2xl object-cover shadow-lg"
                  style={{ zIndex: 30 }}
                />
              )}
              {image2 && (
                <img
                  src={getImageUrl(image2)}
                  alt="About 2"
                  className="absolute top-14 left-0 w-28 h-28 md:w-36 md:h-36 rounded-2xl object-cover shadow-lg"
                  style={{ zIndex: 20 }}
                />
              )}
              {image3 && (
                <img
                  src={getImageUrl(image3)}
                  alt="About 3"
                  className="absolute bottom-0 right-6 w-20 h-20 md:w-28 md:h-28 rounded-2xl object-cover shadow-lg"
                  style={{ zIndex: 10 }}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}