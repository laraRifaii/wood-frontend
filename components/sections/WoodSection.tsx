"use client";

import Image from "next/image";
import { Check, X } from "lucide-react";
import { WoodType } from "@/types";

interface WoodSectionProps {
  woodTypes: WoodType[];
}

export default function WoodSection({ woodTypes }: WoodSectionProps) {
  return (
    <section className="bg-charcoal py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="font-kyiv text-body ml-20 mb-20  md:text-[60px] md:leading-18 lg:text-title lg:leading-20 text-white ">
          THE WOOD WE <br /> WORK WITH
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 ">
          {woodTypes.map((wood) => (
            <div key={wood.name} className="flex flex-col gap-4 items-center">
              {/* Image */}
              <div className="w-38 h-38 rounded-2xl overflow-hidden bg-taupe-light">
                <Image
                  src={wood.image}
                  alt={wood.name}
                  width={112}
                  height={112}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display =
                      "none";
                  }}
                />
              </div>

              {/* Name */}
              <p className="text-white text-sm font-bold">{wood.name}</p>

              {/* Pros & Cons */}
              <ul className="flex flex-col gap-2">
                {wood.pros.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-white"
                  >
                    <Check size={14} className="text-steel shrink-0" />
                    {item}
                  </li>
                ))}
                {wood.cons.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-white"
                  >
                    <X size={14} className="text-wood-ember shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
