"use client";

import { useState } from "react";
import Image from "next/image";
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
    <section className="overflow-hidden pt-6 pl-0">
      <div className="bg-gradient-to-t from-white/5 to-transparent pointer-events-none" />

      <div className="mx-6 md:ml-[100px]">
        <h2 className="font-kyiv uppercase text-white lg:ml-[263px] mb-12 leading-[133%] text-[40px] md:text-[60px] lg:text-[90px] tracking-normal">
          ANY QUESTIONS?
        </h2>

        <p className="sm:hidden text-white text-[30px] leading-relaxed mb-8 font-inter">
          Write to us and we will be sure to answer all your questions and give
          you a comprehensive consultation.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
          <div className="flex flex-col gap-4 w-full w-[400px] md:w-[598px] md:min-h-[555px] ">
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
              {/* Send button — exact: 76x36, font 30px, weight 700, line-height 100% */}
              <button
                onClick={handleSubmit}
                disabled={status === "loading"}
                className="flex items-center justify-center bg-steel text-white rounded-[42px] px-[70px] py-[11px] transition-opacity hover:opacity-80 disabled:opacity-50"
              >
                <span className="font-inter font-bold text-[30px] leading-[100%] tracking-normal w-[76px] h-[36px] flex items-center justify-center">
                  {status === "loading" ? "..." : "Send"}
                </span>
              </button>
            </div>
          </div>

          <div className="hidden sm:flex flex-col justify-between h-full pr-4 md:pr-0">
            <p className="font-inter font-medium text-[20px] md:text-[30px] leading-[139%] tracking-normal text-white text-right ">
              Write to us and we will be sure to answer all your questions and
              give you a comprehensive consultation.
            </p>
            <div className="flex justify-end mt-auto">
              <Image
                src="/images/image.svg"
                alt="Wood slice"
                width={380}
                height={380}
                className="object-contain opacity-90 -mb-36 md:rotate-[27.13deg]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
