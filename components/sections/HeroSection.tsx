"use client";

import { useState, useEffect } from "react";
import Button from "../button/Button";
import { getImageUrl } from "@/lib/utils";

interface HeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundImage?: string;
  image1?: string;
  image2?: string;
  image3?: string;
}

export default function HeroSection({
  title = "SOLID WOOD PRODUCTS",
  subtitle = "Oak, beech, ash from 1700 CZK per m3",
  ctaText = "Order",
  ctaLink = "/",
  backgroundImage = "/images/background.jpg",
  image1 = "/images/hero1.jpg",
  image2 = "/images/hero2.jpg",
  image3 = "/images/hero3.jpg",
}: HeroProps) {
  const [scale, setScale] = useState(1);
  const [mobileScale, setMobileScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const width = window.innerWidth;
      setScale(width >= 1440 ? 1 : Math.max(0.7, width / 1440));
      setMobileScale(Math.min(1, width / 375));
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden z-0 "
      style={{ height: `${536 * mobileScale}px`}}
    >
      <style jsx>{`
        @media (min-width: 1024px) {
          section {
            height: 1080px !important;
          }
        }
      `}</style>

      {/* Desktop background */}
      <div
        className="hidden lg:block absolute top-0 left-0 w-[908px] h-[1080px] bg-cover bg-center"
        style={{
          backgroundImage: `url('${getImageUrl(backgroundImage)}')`,
          borderTopLeftRadius: "3px",
          borderTopRightRadius: "62px",
          borderBottomRightRadius: "62px",
        }}
      >
        <div className="absolute inset-0 bg-[#343536]/60" />
      </div>

      {/* Desktop right panel */}
      <div className="absolute right-0 top-0 bottom-0 w-5/12 hidden lg:block bg-none">
        <div className="absolute inset-0 " />
      </div>

      {/* Desktop card */}
      <div
        className="hidden lg:block absolute inset-0 max-w-[1440px] mx-auto origin-top-left"
        style={{ transform: `scale(${scale})` }}
      >
        <div className="absolute z-10 top-[218px] left-[195px] w-[1245px] h-[714px] shadow-[0px_4px_52px_0px_#F5F5F52B] overflow-hidden rounded-tl-[43px] rounded-bl-[43px]">
          <div className="absolute inset-0 bg-obsidian" />
          <div className="relative w-full h-full text-white">
            <div className="font-kyiv uppercase absolute top-[75px] left-[50px] w-[622px] text-[90px] font-medium leading-[115%] tracking-normal text-white">
              {title}
            </div>
            <div className="absolute top-[418px] left-[62px] w-[333px] font-inter font-normal text-[30px] leading-[130%] tracking-normal text-[#FFDBBB]">
              {subtitle.includes("1700") ? (
                <>
                  {subtitle.split("1700")[0]}
                  <span className="font-bold">1700</span>
                  {subtitle.split("1700")[1]}
                </>
              ) : (
                subtitle
              )}
            </div>
            <a
              href={ctaLink}
              className="absolute top-[554px] left-[50px] w-[225px] h-[58px] rounded-[42px] px-[70px] py-[11px] flex items-center justify-center bg-steel transition-opacity hover:opacity-80"
            >
              <span
                className="font-inter font-bold text-[30px] leading-[100%] tracking-normal text-white"
                style={{ width: "85px", height: "36px" }}
              >
                {ctaText}
              </span>
            </a>
            <div className="absolute top-[43px] left-[634px] w-px h-[511px] bg-white/30" />
            <div className="absolute top-[43px] left-[925px] w-[205px] h-[205px] rounded-[42px] overflow-hidden">
              <img
                src={getImageUrl(image1) || "/images/hero1.jpg"}
                alt="Wood product 1"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="absolute top-[316px] left-[680px] w-[205px] h-[205px] rounded-[42px] overflow-hidden">
              <img
                src={getImageUrl(image2) || "/images/hero2.jpg"}
                alt="Wood product 2"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="absolute top-[452px] left-[925px] w-[205px] h-[205px] rounded-[42px] overflow-hidden">
              <img
                src={getImageUrl(image3) || "/images/hero3.jpg"}
                alt="Wood product 3"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile — fixed 375px reference frame, scaled to fit any screen */}
      <div
        className="lg:hidden absolute top-0 left-0 origin-top-left"
        style={{
          maxWidth: "375px",
          height: "536px",
          transform: `scale(${mobileScale})`,
        }}
      >
        <div
          className="absolute w-[286px] h-[465px] bg-cover bg-center"
          style={{
            backgroundImage: `url('${getImageUrl(backgroundImage)}')`,
            borderTopLeftRadius: "3px",
            borderTopRightRadius: "41px",
            borderBottomRightRadius: "35px",
          }}
        >
          <div className="absolute inset-0 bg-[#343536]/60" />
        </div>

        <div
          className="absolute z-10"
          style={{
            top: "130px",
            left: "49px",
            width: "326px",
            height: "280px",
          }}
        >
          <div
            className="absolute inset-0 bg-obsidian overflow-hidden"
            style={{
              borderTopLeftRadius: "14px",
              borderBottomLeftRadius: "14px",
              boxShadow: "0px 4px 52px 0px #F5F5F52B",
            }}
          />
          <div className="relative w-full h-full text-white">
            <div
              className="font-kyiv uppercase absolute"
              style={{
                top: "39px",
                left: "16px",
                width: "289px",
                fontSize: "30px",
                fontWeight: 500,
                lineHeight: "108%",
                letterSpacing: "0%",
                color: "#F5F5F5",
              }}
            >
              {title}
            </div>
            <div
              className="absolute"
              style={{
                top: "112px",
                left: "20px",
                width: "165px",
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                fontSize: "15px",
                lineHeight: "100%",
                letterSpacing: "0%",
                color: "#FFDBBB",
              }}
            >
              {subtitle.includes("1700") ? (
                <>
                  {subtitle.split("1700")[0]}
                  <span className="font-bold">1700</span>
                  {subtitle.split("1700")[1]}
                </>
              ) : (
                subtitle
              )}
            </div>

            <a
              href={ctaLink}
              className="absolute flex items-center justify-center bg-steel text-white transition-opacity hover:opacity-80"
              style={{
                top: "168px",
                left: "16px",
                width: "86px",
                height: "21px",
                borderRadius: "42px",
                paddingTop: "10px",
                paddingRight: "17px",
                paddingBottom: "10px",
                paddingLeft: "17px",
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                fontSize: "12px",
              }}
            >
              {ctaText}
            </a>
          </div>
        </div>

        <div
          className="absolute overflow-hidden z-20"
          style={{
            top: "260px",
            left: "274px",
            width: "90px",
            height: "90px",
            borderRadius: "14px",
          }}
        >
          <img
            src={getImageUrl(image1) || "/images/hero1.jpg"}
            alt="Wood product 1"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div
          className="absolute bg-white/30"
          style={{ top: "361px", left: "65px", width: "290px", height: "1px" }}
        />

        <div
          className="absolute overflow-hidden z-20"
          style={{
            top: "375px",
            left: "85px",
            width: "90px",
            height: "90px",
            borderRadius: "14px",
          }}
        >
          <img
            src={getImageUrl(image2) || "/images/hero2.jpg"}
            alt="Wood product 2"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div
          className="absolute overflow-hidden z-20"
          style={{
            top: "446px",
            left: "241px",
            width: "90px",
            height: "90px",
            borderRadius: "14px",
          }}
        >
          <img
            src={getImageUrl(image3) || "/images/hero3.jpg"}
            alt="Wood product 3"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}
