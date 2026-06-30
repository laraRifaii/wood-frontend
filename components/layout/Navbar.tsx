"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { X, Phone, Mail } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { href: "/gallery", label: "Gallery" },
  { href: "/price-list", label: "Prices for services" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) return;
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, [isHome]);

  const showSolidBackground = !isHome || scrolled;

  return (
    <header
      className={`absolute top-0 left-0 right-0 z-50 transition-all duration-300 ${
        !isHome ? "md:rounded-bl-[79px] md:rounded-br-[79px] rounded-bl-[24px] rounded-br-[24px]" : ""
      }`}
      style={
        isHome
          ? {
              background: showSolidBackground ? "rgba(30, 12, 6, 0.95)" : "transparent",
              backdropFilter: showSolidBackground ? "blur(10px)" : "none",
              paddingBottom: showSolidBackground ? "50px" : "0",
              borderBottomLeftRadius: "1.5rem",
              borderBottomRightRadius: "1.5rem",
            }
          : {
              background: "#1E0C06",
              boxShadow: "0px -8px 52px 0px #EEEEEE2B",
            }
      }
    >
      {/* Desktop content */}
      <div
        className="hidden md:flex max-w-7xl mx-auto items-center justify-between px-6 lg:px-[102px]"
        style={{
          paddingTop: isHome ? "50px" : "60px",
          paddingBottom: !isHome ? "60px" : undefined,
        }}
      >
        <Link href="/">
          <Image
            src="/icons/logo.svg"
            alt="BioWood Logo"
            width={197}
            height={84}
            style={{ width: "197px", height: "83.8px" }}
          />
        </Link>

        <nav
          className="flex items-center"
          style={{ width: "605px", height: "24px", gap: "57px" }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center justify-center transition-colors duration-200 whitespace-nowrap"
              style={{
                minWidth: "80px",
                height: "24px",
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 700,
                fontSize: "20px",
                lineHeight: "100%",
                letterSpacing: "0%",
                color: pathname === link.href ? "#728BAD" : "#F5F5F5",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#E1764D")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color =
                  pathname === link.href ? "#728BAD" : "#F5F5F5")
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile content */}
      <div
        className="md:hidden relative mx-auto flex items-center justify-between px-6"
        style={{
          width: "100%",
          height: "72px",
          background: isHome ? "transparent" : undefined,
        }}
      >
        <Link href="/">
          <Image
            src="/icons/logo.svg"
            alt="BioWood Logo"
            width={85}
            height={36}
            style={{ width: "85px", height: "36px" }}
          />
        </Link>

        <button
          className="flex items-center justify-center"
          style={{ width: "23px", height: "23px" }}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? (
            <X size={23} color="#F1DED0" strokeWidth={3} />
          ) : (
            <Image src="/icons/menu.png" width={23} height={23} alt="menu" />
          )}
        </button>
      </div>

      {open && (
        <div
          className="md:hidden border-t bg-charcoal"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <nav className="flex flex-col px-6 py-4 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm py-2 border-b text-white tracking-wide"
                style={{ borderColor: "rgba(255,255,255,0.06)" }}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-2 pt-2" style={{ color: "#9F8578" }}>
              <Phone size={13} style={{ color: "#E1764D" }} />
              <span className="text-xs">+961 70 000 000</span>
            </div>
            <div className="flex items-center gap-2" style={{ color: "#9F8578" }}>
              <Mail size={13} style={{ color: "#E1764D" }} />
              <span className="text-xs">info@biowood.com</span>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}