import { getImageUrl } from "@/lib/utils";
import { TextSection } from "@/types";
import Image from "next/image";

export default function AboutSection({
  brandName,
  description,
  image1,
  image2,
  image3,
}: TextSection) {
  return (
    <section className="my-16">
      <div className=" mx-0 ">
        <div className="bg-obsidian/90 w-[1325px] h-[775px] rounded-tr-[42px] rounded-br-[42px] flex flex-col md:flex-row gap-8 mr-[80px] shadow-[0px_4px_52px_0px_rgba(245,245,245,0.17)] ">
          {/* Left — text */}
          <div className="flex-1 min-w-0 pl-[243px] pt-[44px]">
            <h2
              className="font-kyiv text-white leading-tight mb-6"
              style={{ fontSize: "clamp(36px, 5vw, 56px)" }}
            >
              ABOUT US
            </h2>
            <p className="text-white text-sm md:text-[30px] leading-[139%] font-inter">
              <strong>{brandName}</strong>
              {brandName && description ? " — " : ""}
              {description}
            </p>
          </div>

          {/* Right — staggered overlapping images */}
          {(image1 || image2 || image3) && (
            <div className=" flex-1">
              {image1 && (
                <Image
                  src={getImageUrl(image1) || "/images/about1.png"}
                  alt="About 1"
                  className="mt-[61px] ml-[240px]  md:w-[205px] md:h-[205px] rounded-2xl object-cover shadow-lg"
                  style={{ zIndex: 30 }}
                  width={205}
                  height={205}
                />
              )}
              {image2 && (
                <Image
                  src={getImageUrl(image2) || "/images/about2.png"}
                  alt="About 2"
                  className="-mt-[88px]  w-[350px] h-[347px]  rounded-[43px] object-cover"
                  style={{ zIndex: 20 }}
                  width={350}
                  height={347}
                />
              )}
              {image3 && (
                <Image
                  src={getImageUrl(image3) || "/images/about3.png"}
                  alt="About 3"
                  className="ml-[165px] mt-5 md:w-[205px] md:h-[205px] rounded-[42px] object-cover shadow-lg"
                  style={{ zIndex: 10 }}
                  width={205}
                  height={205}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
