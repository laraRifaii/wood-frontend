"use client";

import Image from "next/image";
import { Check, X } from "lucide-react";
import { WoodType } from "@/types";
import { getImageUrl } from "@/lib/utils";

interface WoodSectionProps {
  woodTypes: WoodType[];
}

export default function WoodSection({ woodTypes }: WoodSectionProps) {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="font-kyiv text-white mb-16 md:text-[60px] md:leading-tight lg:text-title lg:leading-20 text-[36px] leading-tight pl-8 md:pl-20">
          THE WOOD WE <br /> WORK WITH
        </div>

        <div className="grid grid-cols-3 gap-4 md:gap-8">
          {woodTypes.map((wood) => {
            const imageSrc = getImageUrl(wood.image ?? wood.images?.[0]?.url);
            return (
              <div key={wood.name} className="flex flex-col gap-3 items-center">
                {/* Image — larger, rounder */}
                <div className="w-24 h-24 md:w-36 md:h-36 rounded-3xl overflow-hidden bg-taupe-light flex-shrink-0">
                  {imageSrc ? (
                    <img
                      src={imageSrc}
                      alt={wood.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-taupe-light" />
                  )}
                </div>

                {/* Name — centered */}
                <p className="text-white text-xs md:text-sm font-bold text-center">
                  {wood.name}
                </p>

                {/* Pros & Cons — centered */}
                <ul className="flex flex-col gap-1.5 items-start">
                  {wood.pros.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-1.5 text-xs text-white"
                    >
                      <Check size={12} className="text-steel shrink-0" />
                      {item}
                    </li>
                  ))}
                  {wood.cons.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-1.5 text-xs text-white"
                    >
                      <X size={12} className="text-wood-ember shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
