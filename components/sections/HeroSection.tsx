"use client";

import Button from "../button/Button";
import { getImageUrl } from "@/lib/utils";
interface HeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundImage?: string;
  image1?: string;
  image2?: string;
  image3?: string;
}

export default function HeroSection({
  title = "SOLID WOOD PRODUCTS",
  subtitle = "Handcrafted furniture and woodwork from premium hardwoods.",
  ctaText = "Order",
  ctaLink = "/",
  backgroundImage = "/images/background.jpg",
  image1 = "/images/hero1.jpg",
  image2 = "/images/hero2.jpg",
  image3 = "/images/hero3.jpg",
}: HeroProps) {
  return (
    <section
      className="w-full relative min-h-[60vh] md:min-h-[100vh] lg:min-h-screen flex items-center justify-center bg-cover bg-left bg-no-repeat overflow-visible z-0"
      style={{ backgroundImage: `url('${getImageUrl(backgroundImage)}')` }}
    >
      <div className="absolute inset-0 bg-[#343536]/60" />

      <div className="absolute right-0 top-0 bottom-0 w-4/12 hidden lg:block">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #222021 0%, #32353C 40%, #32353C 100%)",
            opacity: 0.9,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              170deg, transparent, transparent 8px,
              rgba(225,118,77,0.04) 8px, rgba(225,118,77,0.04) 9px
            )`,
          }}
        />
      </div>

      <div className="absolute right-0 top-30 md:top-25 w-10/12 z-10">
        <div
          className="absolute inset-0 rounded-tl-4xl rounded-bl-4xl
                bg-linear-to-b from-obsidian from-55% to-transparent to-45%
                md:bg-obsidian"
        />
        <div className="relative grid lg:grid-cols-[70%_30%] md:grid-cols-[70%_30%] gap-4 pt-6 md:p-9 h-full">
          <div className="pl-6 pr-13 pb-6 border-b border-white md:border-b-0 md:border-r text-white flex flex-col justify-center">
            <div className="font-kyiv text-body md:text-[60px] md:leading-18 lg:text-title lg:leading-20">
              {title}
            </div>
            <p className="text-sm md:text-[20px] py-4">{subtitle}</p>
            <div className="pb-4">
              <Button href={ctaLink} text={ctaText} />
            </div>
          </div>

          <div className="grid grid-rows-3 gap-4 pl-5 max-w-[95%] py-6 md:-m-0 -mt-38">
            <div className="flex justify-end items-center">
              <img
                src={getImageUrl(image1) || "/images/hero1.jpg"}
                alt="Wood product 1"
                className="rounded-4xl h-28 w-28 lg:h-30 lg:w-30 object-cover"
              />
            </div>
            <div className="flex items-center">
              <img
                src={getImageUrl(image2) || "/images/hero2.jpg"}
                alt="Wood product 2"
                className="rounded-4xl h-28 w-28 lg:h-30 lg:w-30 object-cover"
              />
            </div>
            <div className="flex justify-end items-center">
              <img
                src={getImageUrl(image3) || "/images/hero3.jpg"}
                alt="Wood product 3"
                className="rounded-4xl h-28 w-28 lg:h-30 lg:w-30 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
