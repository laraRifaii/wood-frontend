"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { GalleryImage } from "@/types";

interface GallerySectionProps {
  images: GalleryImage[];
}

export default function GallerySection({ images }: GallerySectionProps) {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setCurrent((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <section className="bg-charcoal py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="font-kyiv text-body ml-20 mb-20  md:text-[60px] md:leading-18 lg:text-title lg:leading-20 text-white">
          OUR WORK
        </div>

        {/* Carousel */}
        <div className="relative flex items-center justify-center mx-10 md:mx-20 ">
          {/* Left arrow */}
          <button
            onClick={prev}
            className="absolute-left-10 z-10 text-white hover:text-steel transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft size={36} />
          </button>

          {/* Image */}
          <div className="w-full rounded-3xl overflow-hidden aspect-4/3">
            <Image
              src={images[current].src}
              alt={images[current].alt}
              width={800}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right arrow */}
          <button
            onClick={next}
            className="absolute-right-10 z-10 text-white hover:text-steel transition-colors"
            aria-label="Next"
          >
            <ChevronRight size={36} />
          </button>
        </div>

        {/* Dots */}
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
