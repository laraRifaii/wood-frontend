"use client";

import { useState } from "react";
import { GalleryImage } from "@/types";
import { getImageUrl } from "@/lib/utils";
import Image from "next/image";
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
    <section className=" py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="font-kyiv text-body ml-10 md:ml-20 mb-10 md:text-title md:leading-18 lg:text-title lg:leading-20 text-white">
          OUR WORK
        </div>

        {/* Full width container, arrows outside */}
        <div className="relative flex items-center gap-4">
          {/* Left arrow — outside image */}
          <button
            onClick={prev}
            className="flex-shrink-0 text-white hover:text-steel transition-colors z-10"
            aria-label="Previous"
          >
            <Image
              src="/icons/vector-left.svg"
              alt="prev"
              width={26}
              height={26}
              className="w-[15px] h-[15px] md:w-[26px] md:h-[25px]"
            />
          </button>

          {/* Image — takes remaining space */}
          <div className="flex-1 rounded-3xl overflow-hidden aspect-4/3">
            {currentImage.src ? (
              <div className="flex-1 rounded-3xl overflow-hidden">
                <img
                  src={getImageUrl(currentImage.src)}
                  alt={currentImage.alt}
                  className="w-full object-cover rounded-3xl"
                  style={{ aspectRatio: "16/9" }}
                />
              </div>
            ) : (
              <div className="w-full h-full bg-taupe-dark" />
            )}
          </div>

          {/* Right arrow — outside image */}
          <button
            onClick={next}
            className="flex-shrink-0 text-white hover:text-steel transition-colors z-10"
            aria-label="Next"
          >
            <Image
              src="/icons/vector-right.svg"
              alt="next"
              width={26}
              height={26}
              className="w-[15px] h-[15px] md:w-[26px] md:h-[25px]"
            />
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 mt-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="w-3 h-3 rounded-full transition-colors "
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
