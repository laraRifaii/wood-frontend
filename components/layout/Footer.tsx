import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-charcoal border-t border-white/10 shadow-[0_-4px_12px_0_rgba(255,255,255,0.09)]">
      <div className="max-w-7xl mx-auto px-6 lg:pl-[102px] py-10 flex flex-col md:flex-row items-center md:items-center gap-8 md:gap-[70px]">
        {/* Logo — exact: 197x83.8 */}
        <Link href="/">
          <Image
            src="/icons/logo.png"
            alt="BioWood Logo"
            width={197}
            height={84}
            className="w-[162px] h-[69px] md:w-[197px] md:h-[83.8px]"
          />
        </Link>

        {/* Contact — row layout, exact gaps */}
        <div className="flex flex-col md:flex-row items-center md:items-center gap-6 md:gap-[107px]">
          
          <a  href="tel:+96170000000"
            className="flex items-center gap-[14px] text-white hover:text-steel transition-colors"
          >
            <Image
              src="/icons/phone.svg"
              width={50}
              height={50}
              className="w-[24px] h-[24px] md:w-[50px] md:h-[50px]"
              alt="phone"
            />
            <span className="font-inter font-medium text-[15px] md:text-[30px] leading-[139%] tracking-normal">
              +420 000 000 000
            </span>
          </a>

          <div className="flex items-center gap-[14px] text-white">
            <Image
              src="/icons/geo.svg"
              width={50}
              height={50}
              className="w-[24px] h-[24px] md:w-[50px] md:h-[50px]"
              alt="geo"
            />
            <span className="font-inter font-medium text-[15px] md:text-[30px] leading-[139%] tracking-normal">
              Na Plzeňce 1166/0 150 00
            </span>
          </div>
        </div>
      </div>

      {/* Bottom bar — exact: privacy policy 134x28, font 20px */}
      <div
        className="border-t px-6 lg:px-[102px] py-4 flex flex-col md:flex-row items-center justify-between gap-2"
        style={{ borderColor: "rgba(255,255,255,0.05)" }}
      >
        <span className="text-xs" style={{ color: "#F5F5F5" }}>
          © {new Date().getFullYear()} BioWood. All rights reserved.
        </span>

        <Link
          href="/privacy-policy"
          className="font-inter font-medium text-[20px] leading-[139%] tracking-normal"
          style={{ color: "#F5F5F5", width: "134px", height: "28px" }}
        >
          Privacy Policy
        </Link>

        <Link
          href="/admin/dashboard"
          className="text-xs"
          style={{ color: "#F5F5F5" }}
        >
          Admin
        </Link>
      </div>
    </footer>
  );
}