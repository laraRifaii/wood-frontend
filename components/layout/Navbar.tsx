"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, Phone, Mail } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { href: "/gallery", label: "Gallery" },
  { href: "/price-list", label: "Price for services" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 md:px-6 rounded-bl-3xl rounded-br-3xl border-none"
      style={{
        background: scrolled ? "rgba(30, 12, 6, 0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/icons/logo.png"
            alt="BioWood Logo"
            width={120}
            height={50}
            style={{ width: "auto", height: 50 }}
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-14">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-base font-bold text-white transition-colors duration-200"
              onMouseEnter={(e) => (e.currentTarget.style.color = "#E1764D")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#ffffff")}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? (
            <X size={22} color="#F1DED0" />
          ) : (
            <img
              src="/menu.png"
              alt="Menu"
              width={22}
              height={22}
              style={{ width: 22, height: "auto" }}
            />
          )}
        </button>
      </div>

      {/* Mobile menu */}
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
            <div
              className="flex items-center gap-2 pt-2"
              style={{ color: "#9F8578" }}
            >
              <Phone size={13} style={{ color: "#E1764D" }} />
              <span className="text-xs">+961 70 000 000</span>
            </div>
            <div
              className="flex items-center gap-2"
              style={{ color: "#9F8578" }}
            >
              <Mail size={13} style={{ color: "#E1764D" }} />
              <span className="text-xs">info@biowood.com</span>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
