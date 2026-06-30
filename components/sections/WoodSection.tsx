"use client";

import Image from "next/image";
import { WoodType } from "@/types";
import { getImageUrl } from "@/lib/utils";

interface WoodSectionProps {
  woodTypes: WoodType[];
}

export default function WoodSection({ woodTypes }: WoodSectionProps) {
  return (
    <section className="overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 py-6 relative">
        {/* Single responsive title */}
        <h2 className="font-kyiv uppercase text-white mb-10  md:mx-16 pl-0 md:pl-[126px] text-[30px] md:text-[60px] lg:text-[90px] leading-[133%] tracking-normal">
          THE WOOD WE <br /> WORK WITH
        </h2>

        {/* Desktop — horizontal, exact gap-[120px] */}
        <div className="hidden md:flex flex-wrap justify-start gap-[120px] pl-[126px]">
          {woodTypes.map((wood) => {
            const imageSrc = getImageUrl(wood.image ?? wood.images?.[0]?.url);
            return (
              <div key={wood.name} className="flex flex-col items-center pb-5 ">
                <div className="overflow-hidden bg-taupe-light shrink-0 w-[205px] h-[205px] rounded-[42px]">
                  {imageSrc ? (
                    <Image src={imageSrc} alt={wood.name} width={205} height={205} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-taupe-light" />
                  )}
                </div>
                <p className="text-white text-[30px] font-bold mt-4 mb-3 ">{wood.name}</p>
                <ul className="flex flex-col gap-3 ">
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

        {/* Mobile — horizontal scroll, normal flow, no absolute */}
        <div className="md:hidden overflow-x-auto -mx-4 px-4 pb-2">
          <div className="flex gap-6" style={{ width: 'max-content' }}>
            {woodTypes.map((wood) => {
              const imageSrc = getImageUrl(wood.image ?? wood.images?.[0]?.url);
              return (
                <div key={wood.name} className="flex flex-col items-start w-[140px] shrink-0">
                  <div className="overflow-hidden bg-taupe-light shrink-0 w-[90px] h-[90px] rounded-[14px]">
                    {imageSrc ? (
                      <Image src={imageSrc} alt={wood.name} width={90} height={90} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-taupe-light" />
                    )}
                  </div>
                  <p className="text-white text-sm font-bold mt-3 mb-2">{wood.name}</p>
                  <ul className="flex flex-col gap-1.5 items-start">
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
    </section>
  );
}