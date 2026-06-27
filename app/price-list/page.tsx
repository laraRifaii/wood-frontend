"use client";

import PriceList from "@/components/sections/PriceList";
import ContactSection from "@/components/sections/ContactSection";
export default function PriceListPage() {
  return (
    <>
      <main className="pt-20">
        <PriceList />
        <ContactSection />
      </main>
    </>
  );
}
