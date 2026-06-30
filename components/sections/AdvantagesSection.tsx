import Button from "../button/Button";
import { getImageUrl } from "@/lib/utils";

interface AdvantagesProps {
  cta: string;
  image?: string;
  items: { description: string }[];
}

export default function AdvantagesSection({ items, image, cta }: AdvantagesProps) {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">

        {/* Title */}
        <h2
          className="font-kyiv text-white mb-8 md:mb-12 leading-tight pl-4 md:pl-16"
          style={{ fontSize: 'clamp(36px, 5vw, 60px)' }}
        >
          ADVANTAGES <br /> WORKING WITH US
        </h2>

        {/* List — mobile only, below title */}
        <ul className="flex flex-col gap-4 sm:hidden mb-8 pl-4">
          {items.map((item, i) => (
            <li key={i} className="text-white text-sm font-inter leading-relaxed">
              {item.description}
            </li>
          ))}
        </ul>

        {/* Image + list — desktop */}
        <div className="hidden sm:flex flex-row gap-12 items-center pl-4 md:pl-16 mb-10">
          {/* Image — smaller, square */}
          {image && (
            <div className="w-48 md:w-64 flex-shrink-0 rounded-2xl overflow-hidden aspect-square">
              <img
                src={getImageUrl(image)}
                alt="Carpentry work"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* List */}
          <ul className="flex flex-col gap-6">
            {items.map((item, i) => (
              <li key={i} className="text-white text-sm font-inter leading-relaxed">
                {item.description}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA — centered */}
        <div className="flex justify-center">
          <Button text={cta} href="/contact" />
        </div>

      </div>
    </section>
  );
}