import Image from "next/image";
import Button from "../button/Button";

interface AdvantagesProps {
  cta: string;
  image: string;
  items: { description: string }[];
}

export default function AdvantagesSection({
  items,
  image,
  cta,
}: AdvantagesProps) {
  return (
    <section className="bg-charcoal py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="font-kyiv text-body ml-20 mb-20  md:text-[60px] md:leading-18 lg:text-title lg:leading-20 text-white">
          ADVANTAGES <br /> WORKING WITH US
        </div>
        {/* Image + list */}
        <div className="flex flex-col sm:flex-row gap-8 items-start mb-10 mx-10 md:mx-20 ">
          {/* Image */}
          <div className="w-full sm:w-1/2 rounded-2xl overflow-hidden aspect-[4/3] flex-shrink-0">
            <Image
              src={image}
              alt="Carpentry work"
              width={400}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>

          {/* List */}
          <ul className="flex flex-col gap-8 justify-center pt-0 mt-0 ">
            {items.map((item, i) => (
              <li
                key={i}
                className="text-white text-body"
              >
                
                {item.description}
              </li>
            ))}
          </ul>
        </div>
        {/* CTA */}
        <div className="flex justify-center mx-10 md:mx-20 ">
          <Button text={cta} href="/contact" />
        </div>
      </div>
    </section>
  );
}
