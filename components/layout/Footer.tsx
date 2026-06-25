import Link from "next/link";
import { Phone, MapPin } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t w-full bg-charcoal px-6">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
        {/* Brand */}
        <Image
          src="/logo.png"
          alt="BioWood Logo"
          className=""
          width={120}
          height={120}
          style={{ width: "auto" }}
        />

        {/* Contact */}
        <div className="flex flex-col sm:flex-row gap-6">
          <a
            href="tel:+96170000000"
            className="flex items-center gap-2 text-sm text-white hover:text-steel transition-colors"
          >
            <Phone size={16} className="text-steel flex-shrink-0" />
            +961 70 000 000
          </a>

          <div className="flex items-center gap-2 text-sm text-white">
            <MapPin size={16} className="text-steel flex-shrink-0" />
            Beirut, Lebanon
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-2"
        style={{ borderColor: "rgba(255,255,255,0.05)" }}
      >
        <span className="text-xs" style={{ color: "#5B6069" }}>
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
