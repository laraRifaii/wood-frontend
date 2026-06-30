"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { WoodType } from "@/types";
import { getImageUrl } from "@/lib/utils";

interface WoodSectionProps {
  woodTypes: WoodType[];
}

export default function WoodSection({ woodTypes }: WoodSectionProps) {
  const [mobileScale, setMobileScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      setMobileScale(Math.min(1, window.innerWidth / 375));
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <section className="overflow-hidden">
      {/* Desktop */}
      <div className="hidden md:block max-w-[1440px] mx-auto px-0 relative">
        <h2 className="font-kyiv uppercase text-white mb-16 pl-[126px] text-[60px] lg:text-[90px] leading-[133%] tracking-normal max-w-[746px]">
          THE WOOD WE <br /> WORK WITH
        </h2>

        <div className="flex flex-wrap justify-start gap-[175px] pl-[126px]">
          {woodTypes.map((wood) => {
            const imageSrc = getImageUrl(wood.image ?? wood.images?.[0]?.url);
            return (
              <div key={wood.name} className="flex flex-col items-start w-[277px]">
                <div className="overflow-hidden bg-taupe-light shrink-0 w-[205px] h-[205px] rounded-[42px]">
                  {imageSrc ? (
                    <Image src={imageSrc} alt={wood.name} width={205} height={205} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-taupe-light" />
                  )}
                </div>
                <p className="text-white text-xl font-bold mt-4 mb-3">{wood.name}</p>
                <ul className="flex flex-col gap-3">
                  {wood.pros.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <Image src="/icons/check.png" alt="" width={25} height={25} className="shrink-0" />
                      <span className="font-inter font-medium text-[30px] leading-[100%] tracking-normal text-white">{item}</span>
                    </li>
                  ))}
                  {wood.cons.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <Image src="/icons/cross.png" alt="" width={26} height={26} className="shrink-0" />
                      <span className="font-inter font-medium text-[30px] leading-[100%] tracking-normal text-white">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile — fixed 375px reference frame, scaled */}
      <div className="md:hidden relative" style={{ height: `${(woodTypes.length * 360 + 200) * mobileScale}px` }}>
        <div
          className="absolute top-0 left-1/2 origin-top"
          style={{ width: '375px', transform: `translateX(-50%) scale(${mobileScale})` }}
        >
          {/* Title — exact: top 619, left 19, 30px font */}
          <h2
            className="font-kyiv uppercase text-white absolute"
            style={{
              top: '0px',
              left: '19px',
              width: '240px',
              fontSize: '30px',
              fontWeight: 500,
              lineHeight: '133%',
              letterSpacing: '0%',
            }}
          >
            THE WOOD WE <br /> WORK WITH
          </h2>

          {/* Cards stacked vertically on mobile */}
          <div className="absolute" style={{ top: '170px', left: '0', width: '375px' }}>
            <div className="flex flex-col gap-12 items-center">
              {woodTypes.map((wood) => {
                const imageSrc = getImageUrl(wood.image ?? wood.images?.[0]?.url);
                return (
                  <div key={wood.name} className="flex flex-col items-center w-[240px]">
                    {/* Image — exact: 90x90, radius 14px */}
                    <div className="overflow-hidden bg-taupe-light shrink-0 w-[90px] h-[90px] rounded-[14px]">
                      {imageSrc ? (
                        <Image src={imageSrc} alt={wood.name} width={90} height={90} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-taupe-light" />
                      )}
                    </div>

                    {/* Name — exact: 69x18 box */}
                    <p className="text-white text-sm font-bold mt-3 mb-2" style={{ width: '69px', height: '18px', textAlign: 'center' }}>
                      {wood.name}
                    </p>

                    <ul className="flex flex-col gap-2 items-start">
                      {wood.pros.map((item) => (
                        <li key={item} className="flex items-center gap-1.5">
                          <Image src="/icons/check.png" alt="" width={14} height={14} className="shrink-0" />
                          <span className="font-inter font-medium text-xs text-white">{item}</span>
                        </li>
                      ))}
                      {wood.cons.map((item) => (
                        <li key={item} className="flex items-center gap-1.5">
                          <Image src="/icons/cross.png" alt="" width={14} height={14} className="shrink-0" />
                          <span className="font-inter font-medium text-xs text-white">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}