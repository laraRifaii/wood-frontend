"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "../button/Button";
import api from "@/lib/api";

type FormState = { name: string; phone: string; question: string };
type Status = "idle" | "loading" | "success" | "error";

const inputClass =
  "w-full px-4 py-3 rounded-[50px] text-sm text-white outline-none bg-transparent border border-steel placeholder:text-white/40 focus:border-steel focus:border-2 transition-colors font-inter";

export default function ContactSection() {
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    question: "",
  });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<Status>("idle");

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (!form.question.trim())
      newErrors.question = "Please enter your question";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setStatus("loading");
    try {
      await api.post("/contact", form);
      setStatus("success");
      setForm({ name: "", phone: "", question: "" });
      setErrors({});
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="pt-16 relative overflow-hidden">
      {/* Bottom shadow */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Title — centered like Figma */}
        <h2
          className="font-kyiv text-white text-center mb-12 leading-tight"
          style={{ fontSize: "clamp(40px, 6vw, 72px)" }}
        >
          ANY QUESTIONS?
        </h2>

        {/* Description — mobile only, below title */}
        <p className="block sm:hidden text-white text-sm leading-relaxed mb-8 font-inter">
          Write to us and we will be sure to answer all your questions and give
          you a comprehensive consultation.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
          {/* Left — form */}
          <div className="flex flex-col gap-4">
            {status === "success" && (
              <div className="px-4 py-3 rounded-2xl border border-steel/40 bg-steel/10 text-sm text-steel-light font-inter">
                ✓ Message sent! We'll be in touch soon.
              </div>
            )}
            {status === "error" && (
              <div className="px-4 py-3 rounded-2xl border border-wood-bark/40 bg-wood-bark/10 text-sm text-wood-sand font-inter">
                Something went wrong. Please try again.
              </div>
            )}

            <div>
              <input
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => {
                  setForm((f) => ({ ...f, name: e.target.value }));
                  setErrors((e) => ({ ...e, name: "" }));
                }}
                className={`${inputClass} ${errors.name ? "border-wood-bark" : ""}`}
              />
              {errors.name && (
                <p className="text-xs text-wood-sand mt-1 pl-4 font-inter">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <input
                type="tel"
                placeholder="Your telephone number"
                value={form.phone}
                onChange={(e) => {
                  setForm((f) => ({ ...f, phone: e.target.value }));
                  setErrors((e) => ({ ...e, phone: "" }));
                }}
                className={`${inputClass} ${errors.phone ? "border-wood-bark" : ""}`}
              />
              {errors.phone && (
                <p className="text-xs text-wood-sand mt-1 pl-4 font-inter">
                  {errors.phone}
                </p>
              )}
            </div>

            <div>
              <textarea
                placeholder="Your question"
                rows={5}
                value={form.question}
                onChange={(e) => {
                  setForm((f) => ({ ...f, question: e.target.value }));
                  setErrors((e) => ({ ...e, question: "" }));
                }}
                className={`w-full px-4 py-3 rounded-2xl text-sm text-white outline-none bg-transparent border placeholder:text-white/40 transition-colors resize-none focus:outline-none ${
                  errors.question
                    ? "border-wood-bark focus:border-wood-bark"
                    : "border-steel focus:border-steel"
                }`}
              />
              {errors.question && (
                <p className="text-xs text-wood-sand mt-1 pl-4 font-inter">
                  {errors.question}
                </p>
              )}
            </div>

            <div className="pb-10 md:pb-2">
              <Button
                text={status === "loading" ? "Sending..." : "Send"}
                onClick={handleSubmit}
                disabled={status === "loading"}
              />
            </div>
          </div>

          {/* Right — description + wood image */}
          <div className="hidden sm:flex flex-col justify-between h-full">
            <p className="text-white text-sm leading-relaxed font-inter md:text-right">
              Write to us and we will be sure to answer all your questions and
              give you a comprehensive consultation.
            </p>
            <div className="flex justify-end mt-auto">
              <Image
                src="/images/image.svg"
                alt="Wood slice"
                width={380}
                height={380}
                className="object-contain opacity-90 -mb-16"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
