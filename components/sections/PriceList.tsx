"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface PriceRow {
  delka: number;
  sirka: number;
  tloustka: number;
  m3: number;
  cenaM3: number;
  cenaKs: number;
}

interface PriceCategory {
  name: string;
  rows: PriceRow[];
}

const priceData: PriceCategory[] = [
  {
    name: "buk pr",
    rows: [
      {
        delka: 1000,
        sirka: 300,
        tloustka: 40,
        m3: 0.012,
        cenaM3: 1100,
        cenaKs: 462,
      },
      {
        delka: 1100,
        sirka: 300,
        tloustka: 40,
        m3: 0.0132,
        cenaM3: 1100,
        cenaKs: 508.2,
      },
      {
        delka: 800,
        sirka: 300,
        tloustka: 40,
        m3: 0.0096,
        cenaM3: 1100,
        cenaKs: 369.6,
      },
      {
        delka: 900,
        sirka: 300,
        tloustka: 40,
        m3: 0.0108,
        cenaM3: 1100,
        cenaKs: 415.8,
      },
    ],
  },
  {
    name: "buk cink",
    rows: [
      {
        delka: 3000,
        sirka: 400,
        tloustka: 20,
        m3: 0.024,
        cenaM3: 1000,
        cenaKs: 840,
      },
      {
        delka: 4000,
        sirka: 300,
        tloustka: 20,
        m3: 0.024,
        cenaM3: 1000,
        cenaKs: 840,
      },
      {
        delka: 4000,
        sirka: 400,
        tloustka: 20,
        m3: 0.032,
        cenaM3: 1000,
        cenaKs: 1120,
      },
    ],
  },
];

export default function PriceList() {
  const [current, setCurrent] = useState(0);
  const total = priceData.length;
  const prev = () => setCurrent((i) => (i === 0 ? total - 1 : i - 1));
  const next = () => setCurrent((i) => (i === total - 1 ? 0 : i + 1));
  const category = priceData[current];

  return (
    <section className="bg-charcoal mt-16 mx-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="font-kyiv text-body ml-10 md:ml-20 mb-10 md:text-[60px] md:leading-18 lg:text-title lg:leading-20 text-white">
          PRICE LIST
        </div>

        {/* Carousel */}
        <div className="relative flex items-center justify-center gap-4">
          {/* Left arrow */}
          <button
            onClick={prev}
            className="shrink-0 transition-colors text-steel-light"
            onMouseEnter={(e) => (e.currentTarget.style.color = "#A3B8D7")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#728BAD")}
            aria-label="Previous"
          >
            <Image
              src="/icons/vector-left.svg"
              alt="left"
              width={32}
              height={32}
            />
          </button>

          {/* Table card */}
          <div className="flex-1 grid grid-cols-2 gap-3 justify-center">
            {/* Left — dimensions */}
            <div className="rounded-2xl overflow-hidden bg-[#d9d9d9]">
              {/* Header */}
              <div
                className="grid grid-cols-3 px-4 py-3 text-xs font-bold"
                style={{ color: "#32353C", fontFamily: "Inter, sans-serif" }}
              >
                <span>délka</span>
                <span>šiřka</span>
                <span>tloustka</span>
              </div>
              {/* Rows */}
              {category.rows.map((row, i) => (
                <div
                  key={i}
                  className="grid grid-cols-3 px-4 py-3 text-sm border-t"
                  style={{
                    borderColor: "rgba(0,0,0,0.08)",
                    fontFamily: "Inter, sans-serif",
                    color: "#222021",
                  }}
                >
                  {i === 0 && (
                    <>
                      <span
                        className="col-span-3 font-bold text-xs mb-1"
                        style={{ color: "#32353C" }}
                      >
                        {category.name}
                      </span>
                    </>
                  )}
                  <span>{row.delka}</span>
                  <span>{row.sirka}</span>
                  <span>{row.tloustka}</span>
                </div>
              ))}
            </div>

            {/* Right — pricing */}
            <div
              className="rounded-2xl overflow-hidden "
              style={{
                background:
                  "linear-gradient(to right, #d9d9d9 60%, #E59679 30%)",
              }}
            >
              {/* Header */}
              <div
                className="grid grid-cols-3 px-4 py-3 text-xs font-bold"
                style={{ color: "#1E0C06", fontFamily: "Inter, sans-serif" }}
              >
                <span>m3</span>
                <span>cena m3</span>
                <span>cena ks.</span>
              </div>
              {/* Rows */}
              {category.rows.map((row, i) => (
                <div
                  key={i}
                  className="grid grid-cols-3 px-4 py-3 text-sm border-t "
                  style={{
                    borderColor: "rgba(0,0,0,0.1)",
                    fontFamily: "Inter, sans-serif",
                    color: "#1E0C06",
                  }}
                >
                  <span>{row.m3}</span>
                  <span>{row.cenaM3}</span>
                  <span className="font-medium">{row.cenaKs}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right arrow */}
          <button
            onClick={next}
            className="shrink-0 transition-colors"
            onMouseEnter={(e) => (e.currentTarget.style.color = "#A3B8D7")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#728BAD")}
            aria-label="Next"
          >
            <Image
              src="/icons/vector-right.svg"
              alt="right"
              width={32}
              height={32}
            />
          </button>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {priceData.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="w-2.5 h-2.5 rounded-full transition-colors"
              style={{
                background: i === current ? "#728BAD" : "transparent",
                border: "2px solid #728BAD",
              }}
              aria-label={`Go to ${priceData[i].name}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
