"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Button from "../button/Button";
import Image from "next/image";

interface HeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
}

export default function HeroSection({
  title = "SOLID\nWOOD\nPRODUCTS",
  subtitle = "Handcrafted furniture and woodwork from premium hardwoods. Built to last generations.",
  ctaText = "View Our Work",
  ctaLink = "/gallery",
}: HeroProps) {
  const lines = title.split("\n");

  return (
    <>
     <section
  className="w-full relative min-h-[150vh] md:min-h-[120vh] lg:min-h-screen flex items-center justify-center bg-cover bg-left bg-no-repeat overflow-visible z-0"
  style={{ backgroundImage: "url('/images/background.jpg')" }}
>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#343536]/60 " />

        {/* Right side image panel */}
        <div className="absolute right-0 top-0 bottom-0 w-4/12 hidden lg:block">
          {/* Fallback gradient  */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, #222021 0%, #32353C 40%, #32353C 100%)",
              opacity: 0.9,
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(
              170deg,
              transparent,
              transparent 8px,
              rgba(225,118,77,0.04) 8px,
              rgba(225,118,77,0.04) 9px
            )`,
            }}
          />
        </div>
        {/* content section */}
        <div className="absolute right-0 top-30 bottom-18 w-10/12 ">
          <div className="absolute inset-0 bg-obsidian rounded-tl-4xl rounded-bl-4xl" />

          <div className="absolute inset-0 grid lg:grid-cols-[70%_30%] md:grid-cols-[70%_30%] gap-4 pt-6 md:p-9  ">
          <div className="pl-6 pr-13 border-b border-white md:border-b-0 md:border-r text-white">
              <div className="font-kyiv text-body  md:text-[60px] md:leading-18 lg:text-title lg:leading-20 ">
                SOLID <br/> WOOD PRODUCTS
              </div>
              <p className="text-sm md:text-[20px] py-4">
                Oak, beack, ash from <br /> 1700 CSK per m3.
              </p>
              <div className="pb-4">
                <Button href="/" text="Order"></Button>
              </div>
            </div>

            <div className="grid grid-rows-3 gap-4 pl-5 max-w-[95%]">
              <div className="flex justify-end">
                {" "}
                <Image
                  src="/images/hero1.jpg"
                  alt=""
                  width={150}
                  height={60}
                  className="rounded-4xl h-30 w-30 "
                ></Image>
              </div>
              <div className="flex ">
                <Image
                  src="/images/hero2.jpg"
                  alt=""
                  width={150}
                  height={60}
                  className="rounded-4xl h-30 w-30 "
                ></Image>
              </div>
              <div className="flex justify-end ">
                {" "}
                <Image
                  src="/images/hero3.jpg"
                  alt=""
                  width={150}
                  height={60}
                  className="rounded-4xl h-30 w-30 "
                ></Image>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
