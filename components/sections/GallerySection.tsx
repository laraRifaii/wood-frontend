"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { GalleryImage } from "@/types";
import { getImageUrl } from "@/lib/utils";

interface GallerySectionProps {
  images: GalleryImage[];
}

export default function GallerySection({ images }: GallerySectionProps) {
  const [current, setCurrent] = useState(0);
  const [mobileScale, setMobileScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      setMobileScale(Math.min(1, window.innerWidth / 375));
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const prev = () => setCurrent((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setCurrent((i) => (i === images.length - 1 ? 0 : i + 1));

  if (!images || images.length === 0) return null;

  const currentImage = images[current];

  return (
    <section className="overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6">
        {/* Single responsive title — no absolute positioning */}
         <h2 className="font-kyiv uppercase text-white md:mt-56 mb-10 md:mb-16 pl-0 md:pl-[126px] text-[30px] md:text-[60px] lg:text-[90px] leading-[133%] tracking-normal">
          OUR WORK
        </h2>

        {/* Desktop carousel */}
        <div className="hidden md:flex relative pl-[40px] pr-[94px] items-center">
          <button
            onClick={prev}
            className="flex shrink-0 items-center justify-center text-white hover:text-steel transition-colors z-10 w-[100px] h-[100px]"
            aria-label="Previous"
          >
            <Image
              src="/icons/vector-left.svg"
              alt="prev"
              width={26}
              height={25}
            />
          </button>

          <div className="flex-1 w-[1130px] h-[754px] rounded-[42px] overflow-hidden relative">
            {currentImage.src ? (
              <Image
                src={getImageUrl(currentImage.src)}
                alt={currentImage.alt}
                width={1130}
                height={754}
                className="w-full h-full object-cover rounded-[42px]"
              />
            ) : (
              <div className="w-full h-full bg-taupe-dark" />
            )}
          </div>

          <button
            onClick={next}
            className="flex shrink-0 items-center justify-center text-white hover:text-steel transition-colors z-10 ml-6 w-[52px] h-[50px]"
            aria-label="Next"
          >
            <Image
              src="/icons/vector-right.svg"
              alt="next"
              width={26}
              height={25}
            />
          </button>
        </div>

        <div className="hidden md:flex items-center justify-center gap-2 mt-8">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 rounded-full border-2 border-steel transition-colors ${
                i === current ? "bg-steel" : "bg-transparent"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Mobile carousel — fixed 375px reference frame, scaled */}
        <div
          className="md:hidden relative"
          style={{ height: `${244 * mobileScale}px` }}
        >
          <div
            className="absolute top-0 left-1/2 origin-top"
            style={{
              width: "375px",
              transform: `translateX(-50%) scale(${mobileScale})`,
            }}
          >
            <div
              className="relative"
              style={{ width: "348px", height: "229px" }}
            >
              <div
                className="absolute overflow-hidden rounded-[14px]"
                style={{
                  top: "0px",
                  left: "26.64px",
                  width: "301px",
                  height: "201px",
                }}
              >
                {currentImage.src ? (
                  <Image
                    src={getImageUrl(currentImage.src)}
                    alt={currentImage.alt}
                    width={301}
                    height={201}
                    className="w-full h-full object-cover rounded-[14px]"
                  />
                ) : (
                  <div className="w-full h-full bg-taupe-dark" />
                )}
              </div>

              <button
                onClick={prev}
                className="absolute flex items-center justify-center text-white"
                style={{
                  top: "87.13px",
                  left: "0px",
                  width: "26.64px",
                  height: "26.64px",
                }}
                aria-label="Previous"
              >
                <Image
                  src="/icons/vector-left.svg"
                  alt="prev"
                  width={16}
                  height={16}
                />
              </button>

              <button
                onClick={next}
                className="absolute flex items-center justify-center text-white"
                style={{
                  top: "93.79px",
                  left: "334.12px",
                  width: "13.88px",
                  height: "13.32px",
                }}
                aria-label="Next"
              >
                <Image
                  src="/icons/vector-right.svg"
                  alt="next"
                  width={14}
                  height={13}
                />
              </button>
            </div>

            <div
              className="flex items-center justify-center gap-2"
              style={{ marginTop: "16px" }}
            >
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full border-2 border-steel transition-colors ${
                    i === current ? "bg-steel" : "bg-transparent"
                  }`}
                  style={{ width: "13.42px", height: "13.42px" }}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
