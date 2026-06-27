"use client";
import { Phone, MapPin } from "lucide-react";
import Image from "next/image";
export default function ContactPage() {
  return (
    <section className="bg-charcoal py-10 md:py-16 px-6 mt-14 md:mt-36">
      <div className="max-w-7xl mx-auto ">
        <div className="flex flex-col sm:flex-row items-center  md:items-start justify-center gap-18 ">
          {/* Left — title + contact info */}
          <div className="flex flex-col md:gap-10">
            <div className="flex flex-col gap-8 md:gap-5  ">
              <div className="font-kyiv text-body md:mb-20 md:text-[60px] md:leading-18 lg:text-title lg:leading-20 text-white pt-0 mt-0">
                CONTACT
              </div>
              <div className="flex items-center gap-3">
                <Image src='/icons/geo.svg' alt='map' width={50} height={50}/>
                <a
                  href="tel:+420000000000"
                  className="text-sm md:text-body transition-colors"
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#E1764D")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#D2C8C6")
                  }
                >
                  +420 000 000 000
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Image src='/icons/phone.svg' alt='phone' width={50} height={50}/>
                <address className="text-sm md:text-body not-italic leading-relaxed">
                  Na Plzeňce 1166/0
                  <br />
                  150 00
                </address>
              </div>
            </div>
          </div>

          {/* Right — map */}
          <div className="w-[347px] h-[230px] md:w-[493px] md:h-[428px] rounded-[14px] md:rounded-2xl overflow-hidden shrink-0">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2561.5!2d14.39!3d50.06!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTDCsDAzJzM2LjAiTiAxNMKwMjMnMjQuMCJF!5e0!3m2!1sen!2scz!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(20%)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
