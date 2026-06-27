import { getImageUrl } from "@/lib/utils";
import { TextSection } from "@/types";

export default function AboutSection({
  brandName,
  description,
  image1,
  image2,
  image3,
}: TextSection) {
  if (!image1 || !image2 || !image3) return null;

  return (
    <section className="bg-charcoal">
      <div className="max-w-7xl m-0 p-0 ">
        <div className="max-w-[90%] flex flex-col md:justify-start sm:flex-row gap-6 rounded-tr-3xl rounded-br-3xl py-10   overflow-hidden bg-obsidian ">
          {/* Left — text */}
          <div className="flex-1 justify-center ml-20 md:ml-36">
            <div className="font-kyiv text-body mb-20  md:text-[60px] md:leading-18 lg:text-title lg:leading-20 text-white">
              ABOUT US
            </div>
            <p className="text-white text-sm md:text-body leading-relaxed">
              <span className="font-bold">{brandName}</span> — {description}
            </p>
          </div>

          <div className="relative flex flex-1 flex-col items-center justify-center shrink-0 ">
            {/* Image 1 — right aligned, behind image 2 */}
            <div className="w-32 h-32 rounded-2xl overflow-hidden  relative z-10 ml-30 ">
              <img
                src={getImageUrl(image1)}
                alt="About us 1"
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Image 2 — left aligned, overlaps image 1 from top */}
            <div className="w-46 h-46 rounded-2xl overflow-hidden relative z-20 -mt-16 mr-10">
              <img
                src={getImageUrl(image2)}  
                alt="About us 2"
                width={200}
                height={200}
                className="w-full h-full object-cover "
              />
            </div>

            {/* Image 3 — right aligned, below */}
            <div className="w-30 h-30 rounded-2xl overflow-hidden  relative z-10 mt-2 ml-25 ">
              <img
                src={getImageUrl(image3)}
                alt="About us 3"
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
