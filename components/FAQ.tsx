"use client";
import Image from "next/image";
import { useState } from "react";

const FAQS = [
  { q: "How can I book a tour package?", a: "Click \"Enquiry Now\" on any package, fill the short form, and our travel expert will contact you within 2 hours to guide you through booking." },
  { q: "Can I customise my tour package?", a: "Absolutely! All our packages are fully customizable. Share your preferred dates, number of travelers, accommodation type, and interests — we'll build a plan just for you." },
  { q: "How soon will I receive a quotation?", a: "Within 2 working hours of your inquiry, our travel expert will call or WhatsApp you with a detailed, no-obligation quotation." },
  { q: "Are hotels and transport included?", a: "Yes. All packages include AC vehicle transfers and hotel accommodation on double/triple sharing basis. Daily breakfast is included as a minimum; additional meals vary per package." },
  { q: "Do you provide group discounts?", a: "Yes, we offer special group pricing for parties of 10 or more. WhatsApp us for a custom group quotation." },
  { q: "How can I contact you on WhatsApp?", a: "Click any WhatsApp button on the site. We're available 9 AM – 9 PM, 7 days a week." },
  { q: "Is my payment and personal data secure?", a: "Yes. All payments go through encrypted, verified payment gateways. Your personal data is never sold or shared with third parties." },
  { q: "What is the cancellation and refund policy?", a: "Cancellations 30+ days before travel: 90% refund. 15–29 days: 50%. Under 15 days: no refund. See our Refund Policy page for complete details." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-20 md:py-24" style={{ background: "var(--color-cream)" }}>
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="text-center mb-12">
          <div className="prehad mb-3">FREQUENTLY ASKED QUESTIONS</div>
          <h2 className="h2-section text-[var(--color-navy)]">Got Questions? We Have Answers.</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <ul className="lg:col-span-7 space-y-3">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <li key={i} className="bg-white rounded-lg border border-[#E8D9B8] overflow-hidden">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="font-[family-name:var(--font-playfair)] font-semibold text-[var(--color-navy)] text-[15px] sm:text-[16px]">
                      {f.q}
                    </span>
                    <span
                      className="text-[var(--color-gold)] text-2xl flex-shrink-0 transition-transform"
                      style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0)" }}
                      aria-hidden
                    >
                      +
                    </span>
                  </button>
                  {isOpen && (
                    <div
                      className="px-5 pb-5 text-[14px] text-[#3a4658] leading-relaxed"
                      style={{ animation: "accordionDown 0.25s ease" }}
                    >
                      {f.a}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="hidden lg:block lg:col-span-5 sticky top-24">
            <div className="rounded-2xl overflow-hidden h-[480px] relative">
              <Image
                src="/packages/package-6-rann-kutch.jpg"
                alt="White Desert tents at Rann of Kutch"
                fill
                sizes="(max-width: 1024px) 0px, 40vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
