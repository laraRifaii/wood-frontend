import Button from "../button/Button";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";

interface AdvantagesProps {
  cta: string;
  image?: string;
  items: { description: string }[];
}

export default function AdvantagesSection({
  items,
  image,
  cta,
}: AdvantagesProps) {
  return (
    <section className=" overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 py-6 md:px-0 relative  ">
        {/* Container — exact: 1188px wide, starting at left-[101px] */}
        <div className="md:pl-[101px] md:w-[1188px]">
          {/* Title — exact: 1040x230, 90px font, weight 500, line-height 133%, offset left 36px within container */}
          <h2 className="font-kyiv uppercase text-white mb-10 md:mb-16 pl-0 md:pl-[36px] text-[30px] md:text-[60px] lg:text-[90px] leading-[133%] tracking-normal max-w-[1040px]">
            ADVANTAGES <br /> WORKING WITH US
          </h2>

          {/* Mobile list — below title */}
          <ul className="flex flex-col gap-4 md:hidden mb-8">
            {items.map((item, i) => (
              <li
                key={i}
                className="text-white text-sm font-inter leading-relaxed"
              >
                {item.description}
              </li>
            ))}
          </ul>

          {/* Desktop — image left, text right, exact specs */}
          <div className="hidden md:flex flex-row gap-12 items-center mb-10">
            {/* Image — exact: 609x386, radius 42px */}
            {image && (
              <div className="w-[609px] h-[386px] flex-shrink-0 rounded-[42px] overflow-hidden relative">
                <Image
                  src={getImageUrl(image)}
                  alt="Carpentry work"
                  width={609}
                  height={386}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* List — exact: 30px font, weight 500, line-height 139% */}
            <ul className="flex flex-col gap-6">
              {items.map((item, i) => (
                <li
                  key={i}
                  className="font-inter font-medium text-[30px] leading-[139%] tracking-normal text-white"
                >
                  {item.description}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA — exact: 472x58, radius 42px, offset left 248px within container */}
          <div className="flex justify-center md:justify-start md:pl-[248px]">
            <a
              href="/contact"
              className="flex items-center justify-center bg-steel text-white transition-opacity hover:opacity-80 rounded-[42px] gap-[10px] pt-[11px] pr-[70px] pb-[11px] pl-[70px] w-[472px] h-[58px] font-inter font-semibold text-lg"
            >
              {cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
