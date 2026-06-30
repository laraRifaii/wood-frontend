"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
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
  subtitle = "Oak, beech, ash from 1700 CZK per m3",
  ctaText = "Order",
  ctaLink = "/",
  backgroundImage = "/images/background.jpg",
  image1 = "/images/hero1.jpg",
  image2 = "/images/hero2.jpg",
  image3 = "/images/hero3.jpg",
}: HeroProps) {
  const [scale, setScale] = useState(1);
  const [mobileScale, setMobileScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const width = window.innerWidth;
      setScale(width >= 1440 ? 1 : Math.max(0.7, width / 1440));
      setMobileScale(width / 375);
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <section className="relative w-full overflow-hidden z-0 lg:h-[1080px]" style={{ height: `${536 * mobileScale}px` }}>
      <style jsx>{`
        @media (min-width: 1024px) {
          section {
            height: 1080px !important;
          }
        }
      `}</style>

      {/* Desktop background — anchored directly to the section (full viewport width),
          NOT inside the centered 1440px wrapper, so it always touches the left edge
          and scales proportionally with the viewport instead of leaving gaps. */}
      <div className="hidden lg:block absolute top-0 left-0 w-[63.0556%] h-[1080px] overflow-hidden">
        <Image
          src={getImageUrl(backgroundImage)}
          alt="Wood background"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-slate-dark/60" />
      </div>

      {/* Desktop right panel — flush with the actual right edge of the screen
          at any viewport width, including ultra-wide screens beyond 1440px. */}
      <div className="absolute right-0 top-0 bottom-0 w-[36.9444%] hidden lg:block" />

      {/* Desktop card — kept inside the scaled/centered 1440px wrapper since its
          measurements are fixed pixel values relative to the 1440px design. */}
      <div
        className="hidden lg:block absolute inset-0 max-w-[1440px] mx-auto origin-top-left"
        style={{ transform: `scale(${scale})` }}
      >
        <div className="absolute z-10 top-[218px] left-[195px] w-[1245px] h-[714px] shadow-[0px_4px_52px_0px_#F5F5F52B] overflow-hidden rounded-tl-[43px] rounded-bl-[43px]">
          <div className="absolute inset-0 bg-obsidian" />
          <div className="relative w-full h-full text-white">
            <div className="font-kyiv uppercase absolute top-[75px] left-[50px] w-[622px] text-[90px] font-medium leading-[115%] tracking-normal text-white">
              {title}
            </div>
            <div className="absolute top-[418px] left-[62px] w-[333px] font-inter font-normal text-[30px] leading-[130%] tracking-normal text-wood-mist">
              {subtitle.includes("1700") ? (
                <>
                  {subtitle.split("1700")[0]}
                  <span className="font-bold">1700</span>
                  {subtitle.split("1700")[1]}
                </>
              ) : (
                subtitle
              )}
            </div>

            <a
              href={ctaLink}
              className="absolute top-[554px] left-[50px] w-[225px] h-[58px] rounded-[42px] px-[70px] py-[11px] flex items-center justify-center bg-steel transition-opacity hover:opacity-80"
            >
              <span className="font-inter font-bold text-[30px] leading-[100%] tracking-normal text-white w-[85px] h-[36px]">
                {ctaText}
              </span>
            </a>
            <div className="absolute top-[43px] left-[634px] w-px h-[511px] bg-white/30" />

            <div className="absolute top-[43px] left-[925px] w-[205px] h-[205px] rounded-[42px] overflow-hidden">
              <Image
                src={getImageUrl(image1) || "/images/hero1.jpg"}
                alt="Wood product 1"
                width={205}
                height={205}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="absolute top-[316px] left-[680px] w-[205px] h-[205px] rounded-[42px] overflow-hidden">
              <Image
                src={getImageUrl(image2) || "/images/hero2.jpg"}
                alt="Wood product 2"
                width={205}
                height={205}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="absolute top-[452px] left-[925px] w-[205px] h-[205px] rounded-[42px] overflow-hidden">
              <Image
                src={getImageUrl(image3) || "/images/hero3.jpg"}
                alt="Wood product 3"
                width={205}
                height={205}
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile — fixed 375px reference frame, scaled to fit any screen */}
      <div
        className="lg:hidden absolute top-0 left-1/2 origin-top"
        style={{ width: "375px", height: "536px", transform: `translateX(-50%) scale(${mobileScale})` }}
      >
        <div className="absolute w-[286px] h-[465px] overflow-hidden ">
          <Image
            src={getImageUrl(backgroundImage)}
            alt="Wood background"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-slate-dark/60" />
        </div>

        <div className="absolute z-10 top-[130px] left-[49px] w-[326px] h-[280px]">
          <div className="absolute inset-0 bg-obsidian overflow-hidden rounded-tl-[14px] rounded-bl-[14px] shadow-[0px_4px_52px_0px_#F5F5F52B]" />
          <div className="relative w-full h-full text-white">
            <div className="font-kyiv uppercase absolute top-[39px] left-[16px] w-[289px] text-[30px] font-medium leading-[108%] tracking-normal text-white">
              {title}
            </div>
            <div className="absolute top-[112px] left-[20px] w-[165px] font-inter font-medium text-[15px] leading-[100%] tracking-normal text-wood-mist">
              {subtitle.includes("1700") ? (
                <>
                  {subtitle.split("1700")[0]}
                  <span className="font-bold">1700</span>
                  {subtitle.split("1700")[1]}
                </>
              ) : (
                subtitle
              )}
            </div>

            <a
              href={ctaLink}
              className="absolute flex items-center justify-center bg-steel text-white transition-opacity hover:opacity-80 top-[168px] left-[16px] w-[86px] h-[21px] rounded-[42px] pt-[10px] pr-[17px] pb-[10px] pl-[17px] font-inter font-semibold text-xs"
            >
              {ctaText}
            </a>
          </div>
        </div>

        <div className="absolute overflow-hidden z-20 top-[260px] left-[274px] w-[90px] h-[90px] rounded-[14px]">
          <Image
            src={getImageUrl(image1) || "/images/hero1.jpg"}
            alt="Wood product 1"
            width={90}
            height={90}
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="absolute bg-white/30 top-[361px] left-[65px] w-[290px] h-px" />

        <div className="absolute overflow-hidden z-20 top-[375px] left-[85px] w-[90px] h-[90px] rounded-[14px]">
          <Image
            src={getImageUrl(image2) || "/images/hero2.jpg"}
            alt="Wood product 2"
            width={90}
            height={90}
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="absolute overflow-hidden z-20 top-[446px] left-[241px] w-[90px] h-[90px] rounded-[14px]">
          <Image
            src={getImageUrl(image3) || "/images/hero3.jpg"}
            alt="Wood product 3"
            width={90}
            height={90}
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}