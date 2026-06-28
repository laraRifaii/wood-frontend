import Button from "../button/Button";
import { getImageUrl } from "@/lib/utils";

interface AdvantagesProps {
  cta: string;
  image?: string;
  items: { description: string }[];
}

export default function AdvantagesSection({ items, image, cta }: AdvantagesProps) {
  return (
    <section className="bg-charcoal py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">

        {/* Title */}
        <div className="font-kyiv text-body ml-10 md:ml-20 mb-6 md:mb-10 md:text-[60px] md:leading-18 lg:text-title lg:leading-20 text-white">
          ADVANTAGES <br /> WORKING WITH US
        </div>

        {/* List — mobile only, below title */}
        <ul className="flex flex-col gap-3 sm:hidden ml-10 mb-8">
          {items.map((item, i) => (
            <li key={i} className="text-white text-sm font-inter">
              {item.description}
            </li>
          ))}
        </ul>

        {/* Image + list — desktop */}
        <div className="flex flex-col sm:flex-row gap-8 items-start p-8">
          {/* Image */}
          {image && (
            <div className="w-full sm:w-1/2 rounded-2xl overflow-hidden aspect-[4/3] flex-shrink-0">
              <img
                src={getImageUrl(image)}
                alt="Carpentry work"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* List — desktop only */}
          <ul className="hidden sm:flex flex-col gap-3 md:gap-8 justify-center">
            {items.map((item, i) => (
              <li key={i} className="text-white text-sm md:text-body font-inter">
                {item.description}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="flex justify-center md:justify-start md:justify-center md:ml-10">
          <Button text={cta} href="/contact" />
        </div>

      </div>
    </section>
  );
}