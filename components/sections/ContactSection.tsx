"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "../button/Button";

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    question: "",
  });

  const handleSubmit = () => {
    console.log(form);
    setForm({ name: "", phone: "", question: "" });
  };

  const inputClass = "w-full px-4 py-3 rounded-[50px] text-sm text-white outline-none bg-transparent border border-white/20 placeholder:text-white/40 focus:border-steel transition-colors";

  return (
    <section className="bg-charcoal pt-16 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="font-kyiv text-body mb-20  md:text-[60px] md:leading-18 lg:text-title lg:leading-20 text-white text-end ">
          ANY QUESTIONS?
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
          {/* Left — form */}
          <div className="flex flex-col gap-4 px-20">
            <input
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className={inputClass}
            />
            <input
              type="tel"
              placeholder="Your telephone number"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              className={inputClass}
            />
            <textarea
              placeholder="Your question"
              rows={5}
              value={form.question}
              onChange={(e) => setForm((f) => ({ ...f, question: e.target.value }))}
              className={`w-full px-4 py-3 rounded-2xl text-sm text-white outline-none bg-transparent border border-white/20 placeholder:text-white/40 focus:border-steel transition-colors `}
            />
            <div>
              <Button text="Send" onClick={handleSubmit} />
            </div>
          </div>

          {/* Right — text + wood image */}
          <div className="flex flex-col gap-6">
            <p className="text-white text-body leading-relaxed text-right pl-20">
              Write to us and we will be sure to answer all your questions and give
              you a comprehensive consultation.
            </p>
            <div className="flex justify-end">
              <Image
                src="/images/image.svg"
                alt="Wood slice"
                width={300}
                height={300}
                className="w-78 h-78 object-contain opacity-80 -mb-24"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}