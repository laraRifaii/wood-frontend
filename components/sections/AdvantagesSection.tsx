import Button from "../button/Button";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";

interface AdvantagesProps {
  cta: string;
  image?: string;
  items: { description: string }[];
}

export default function AdvantagesSection({ items, image, cta }: AdvantagesProps) {
  return (
    <section className="overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 py-6 md:px-0 relative">
        <div className="md:pl-[101px] md:w-[1188px]">
          <h2 className="font-kyiv uppercase text-white mb-10 md:mb-16 pl-0 md:pl-[36px] text-[30px] md:text-[60px] lg:text-[90px] leading-[133%] tracking-normal max-w-[1040px]">
            ADVANTAGES <br /> WORKING WITH US
          </h2>

          {/* Mobile list */}
          <ul className="flex flex-col gap-4 md:hidden mb-8">
            {items.map((item, i) => (
              <li key={i} className="text-white text-sm font-inter leading-relaxed">
                {item.description}
              </li>
            ))}
          </ul>

          {/* Mobile image — exact: 350x221, radius 14px, left 11px */}
          {image && (
            <div className="md:hidden mb-8 ml-[11px] w-[350px] h-[221px] rounded-[14px] overflow-hidden">
              <Image
                src={getImageUrl(image)}
                alt="Carpentry work"
                width={350}
                height={221}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Mobile CTA — exact: 219x33, radius 42px, left 76px */}
          <div className="md:hidden mb-8 ml-[76px]">
            
           <a   href="/contact"
              className="flex items-center justify-center bg-steel text-white transition-opacity hover:opacity-80 font-inter font-semibold text-sm"
              style={{
                width: '219px',
                height: '33px',
                borderRadius: '42px',
                paddingTop: '10px',
                paddingRight: '17px',
                paddingBottom: '10px',
                paddingLeft: '17px',
                gap: '10px',
              }}
            >
              {cta}
            </a>
          </div>

          {/* Desktop — image left, text right */}
          <div className="hidden md:flex flex-row gap-12 items-center mb-10">
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
            <ul className="flex flex-col gap-6">
              {items.map((item, i) => (
                <li key={i} className="font-inter font-medium text-[30px] leading-[139%] tracking-normal text-white">
                  {item.description}
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex justify-start pl-[248px]">
            
            <a  href="/contact"
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