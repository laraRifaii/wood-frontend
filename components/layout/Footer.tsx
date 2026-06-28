import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-charcoal md:px-6 border-t border-white/10 shadow-[0_-4px_12px_0_rgba(255,255,255,0.09)]">
      <div className=" mx-auto md:px-6 py-10 flex md:flex-row flex-col items-center md:items-start gap-8">
        {/* Brand */}
        <Image
          src="/icons/logo.png"
          alt="BioWood Logo"
          className="md:pl-5 w-[162px] h-[69px] md:w-[193px] md:h-[83px]"
          width={120}
          height={120}
         
        />

        {/* Contact */}
        <div className="flex md:flex-row flex-col gap-6 ml-5 md:ml-30">
          <a
            href="tel:+96170000000"
            className="flex items-center gap-2 text-[15px] md:text-body text-white hover:text-steel transition-colors"
          >
            <Image src='/icons/phone.svg' width={39} height={32} className="w-[24px] h-[24px] md:w-[39px] md:h-[39px]" alt='phone'/>
            +420 000 000 000
          </a>

          <div className="flex items-center gap-2 text-[15px] md:text-body text-white">
            <Image src='/icons/geo.svg' width={39} height={32} className="w-[24px] h-[24px] md:w-[39px] md:h-[39px]" alt='geo' />
            
            Na Plzeňce 1166/0
150 00
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-2"
        style={{ borderColor: "rgba(255,255,255,0.05)" }}
      >
        <span className="text-xs pl-5" style={{ color: "#5B6069" }}>
          © {new Date().getFullYear()} BioWood. All rights reserved.
        </span>
        <Link
          href="/admin/dashboard"
          className="text-xs"
          style={{ color: "#5B6069" }}
        >
          Admin
        </Link>
      </div>
    </footer>
  );
}
