"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { GalleryImage } from "@/types";
import { getImageUrl } from "@/lib/utils";

interface GallerySectionProps {
  images: GalleryImage[];
}

export default function GallerySection({ images }: GallerySectionProps) {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setCurrent((i) => (i === images.length - 1 ? 0 : i + 1));

  if (!images || images.length === 0) return null;

  const currentImage = images[current];

  return (
    <section className="bg-charcoal py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="font-kyiv text-body ml-20 mb-20 md:text-[60px] md:leading-18 lg:text-title lg:leading-20 text-white">
          OUR WORK
        </div>

        <div className="relative flex items-center justify-center mx-10 md:mx-20">
          <button
            onClick={prev}
            className="absolute left-0 z-10 text-white hover:text-steel transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft size={36} />
          </button>

          <div className="w-full rounded-3xl overflow-hidden aspect-4/3">
            {currentImage.src ? (
              <img
                src={getImageUrl(currentImage.src)}
                alt={currentImage.alt}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-taupe-dark" />
            )}
          </div>

          <button
            onClick={next}
            className="absolute right-0 z-10 text-white hover:text-steel transition-colors"
            aria-label="Next"
          >
            <ChevronRight size={36} />
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 mt-6">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="w-3 h-3 rounded-full transition-colors"
              style={{
                background: i === current ? "#728BAD" : "transparent",
                border: "2px solid #728BAD",
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}