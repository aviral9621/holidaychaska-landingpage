"use client";
import Image from "next/image";
import { useState } from "react";
import { ShieldCheck, RibbonIcon, HeadsetIcon, WhatsAppIcon } from "./Icons";
import { waUrl } from "@/lib/whatsapp";

const FAQS = [
  { q: "How can I book a tour package?", a: "Click \"Enquire Now\" on any package, fill the short form, and our travel expert will contact you within 2 hours to guide you through booking." },
  { q: "Can I customise my tour package?", a: "Absolutely! All our packages are fully customizable. Share your preferred dates, number of travelers, accommodation type, and interests — we'll build a plan just for you." },
  { q: "How soon will I receive a quotation?", a: "Within 2 working hours of your inquiry, our travel expert will call or WhatsApp you with a detailed, no-obligation quotation." },
  { q: "Are hotels and transport included?", a: "Yes. All packages include AC vehicle transfers and hotel accommodation on double/triple sharing basis. Daily breakfast is included as a minimum; additional meals vary per package." },
  { q: "Do you provide group discounts?", a: "Yes, we offer special group pricing for parties of 10 or more. WhatsApp us for a custom group quotation." },
  { q: "How can I contact you on WhatsApp?", a: "Click any WhatsApp button on the site. We're available 9 AM – 9 PM, 7 days a week." },
  { q: "Is my payment and personal data secure?", a: "Yes. All payments go through encrypted, verified payment gateways. Your personal data is never sold or shared with third parties." },
  { q: "What is the cancellation and refund policy?", a: "Cancellations 30+ days before travel: 90% refund. 15–29 days: 50%. Under 15 days: no refund. See our Refund Policy page for complete details." },
];

const BENEFITS = [
  {
    Icon: ShieldCheck,
    title: "Trusted & Reliable",
    desc: "10+ years of experience in crafting memorable Gujarat journeys.",
    descShort: "10+ Years Experience",
  },
  {
    Icon: RibbonIcon,
    title: "Tailored Itineraries",
    desc: "Custom-crafted journeys designed around your preferences.",
    descShort: "Custom-Crafted for You",
  },
  {
    Icon: HeadsetIcon,
    title: "24/7 Travel Support",
    desc: "Our team is always available to assist you anytime, anywhere.",
    descShort: "We're Here for You Anytime",
  },
];

function PlusMinus({ open }: { open: boolean }) {
  return (
    <span
      className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
        open
          ? "bg-[var(--color-gold)] text-white"
          : "bg-transparent border border-[var(--color-gold)] text-[var(--color-gold)]"
      }`}
      aria-hidden
    >
      {open ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      )}
    </span>
  );
}

function BenefitCard({ Icon, title, desc }: { Icon: typeof ShieldCheck; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-4 bg-white rounded-xl border border-[#EFE3C8] p-4 shadow-[0_4px_18px_rgba(13,27,62,0.05)]">
      <div className="w-12 h-12 rounded-full bg-[var(--color-navy)] text-[var(--color-gold)] flex items-center justify-center flex-shrink-0">
        <Icon width={22} height={22} />
      </div>
      <div className="min-w-0">
        <h4 className="font-[family-name:var(--font-playfair)] font-bold text-[15px] text-[var(--color-navy)] leading-tight mb-1">
          {title}
        </h4>
        <p className="text-[13px] text-[#5B6677] leading-snug">{desc}</p>
      </div>
    </div>
  );
}

function CompactBenefit({ Icon, title, descShort }: { Icon: typeof ShieldCheck; title: string; descShort: string }) {
  return (
    <div className="flex flex-col items-center text-center px-2">
      <div className="w-12 h-12 rounded-full bg-[var(--color-navy)] text-[var(--color-gold)] flex items-center justify-center mb-2">
        <Icon width={20} height={20} />
      </div>
      <h5 className="font-[family-name:var(--font-playfair)] font-bold text-[13px] text-[var(--color-navy)] leading-tight mb-1">
        {title}
      </h5>
      <p className="text-[11.5px] text-[#5B6677] leading-snug">{descShort}</p>
    </div>
  );
}

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative py-16 md:py-24 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, var(--color-cream) 0%, #F7EED5 100%)",
      }}
    >
      {/* Decorative mandala corners — desktop only */}
      <svg
        className="absolute top-8 left-4 lg:left-12 w-32 lg:w-44 h-32 lg:h-44 text-[var(--color-gold)] opacity-[0.18] pointer-events-none hidden md:block"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        aria-hidden
      >
        <circle cx="50" cy="50" r="48" />
        <circle cx="50" cy="50" r="38" />
        <circle cx="50" cy="50" r="28" />
        <circle cx="50" cy="50" r="18" />
        {Array.from({ length: 16 }).map((_, i) => {
          const a = (i * Math.PI * 2) / 16;
          return (
            <line key={i} x1="50" y1="50" x2={50 + 48 * Math.cos(a)} y2={50 + 48 * Math.sin(a)} />
          );
        })}
      </svg>
      <svg
        className="absolute top-8 right-4 lg:right-12 w-32 lg:w-44 h-32 lg:h-44 text-[var(--color-gold)] opacity-[0.18] pointer-events-none hidden md:block"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        aria-hidden
      >
        <circle cx="50" cy="50" r="48" />
        <circle cx="50" cy="50" r="38" />
        <circle cx="50" cy="50" r="28" />
        <circle cx="50" cy="50" r="18" />
        {Array.from({ length: 16 }).map((_, i) => {
          const a = (i * Math.PI * 2) / 16;
          return (
            <line key={i} x1="50" y1="50" x2={50 + 48 * Math.cos(a)} y2={50 + 48 * Math.sin(a)} />
          );
        })}
      </svg>

      <div className="relative max-w-[1280px] mx-auto px-5 sm:px-8">
        {/* Heading */}
        <div className="text-center mb-10 md:mb-14 max-w-3xl mx-auto">
          <div className="prehad mb-4 text-[12px]">FREQUENTLY ASKED QUESTIONS</div>
          <h2
            className="font-[family-name:var(--font-playfair)] font-bold text-[var(--color-navy)] leading-[1.1]"
            style={{ fontSize: "clamp(30px, 4.2vw, 52px)" }}
          >
            Got Questions? We Have Answers.
          </h2>
          <div className="my-5 flex items-center justify-center gap-3">
            <span className="w-12 h-px bg-[var(--color-gold)]/60" />
            <span className="text-[var(--color-gold)] text-[10px]">❖</span>
            <span className="w-12 h-px bg-[var(--color-gold)]/60" />
          </div>
          <p className="text-[15px] text-[#5B6677] leading-relaxed">
            Find answers to the most common questions about our Gujarat tour
            packages and services.
          </p>
        </div>

        {/* MOBILE: image + 3 compact benefits inside one card */}
        <div className="lg:hidden mb-8">
          <div className="relative rounded-2xl overflow-hidden border border-[#EFE3C8] bg-white shadow-[0_8px_24px_rgba(13,27,62,0.08)]">
            <div className="relative w-full aspect-[16/11]">
              <Image
                src="/faq-image.png"
                alt="Camel cart at sunset in the Rann of Kutch desert"
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
            <div className="grid grid-cols-3 gap-2 p-4 bg-white">
              {BENEFITS.map((b) => (
                <CompactBenefit key={b.title} Icon={b.Icon} title={b.title} descShort={b.descShort} />
              ))}
            </div>
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* FAQ Accordion column */}
          <div className="lg:col-span-7 space-y-3">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={i}
                  className={`rounded-xl bg-white shadow-[0_2px_10px_rgba(13,27,62,0.04)] transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "border border-[#EFE3C8] border-l-[3px] border-l-[var(--color-gold)] shadow-[0_6px_22px_rgba(13,27,62,0.08)]"
                      : "border border-[#EFE3C8]"
                  }`}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 text-left"
                  >
                    <span className="font-[family-name:var(--font-playfair)] font-bold text-[var(--color-navy)] text-[15px] sm:text-[17px] leading-snug">
                      {f.q}
                    </span>
                    <PlusMinus open={isOpen} />
                  </button>
                  {isOpen && (
                    <div
                      className="px-5 sm:px-6 pb-5 text-[14px] text-[#5B6677] leading-relaxed"
                      style={{ animation: "accordionDown 0.25s ease" }}
                    >
                      {f.a}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Still have questions card */}
            <div className="mt-5 rounded-xl bg-white border border-[#EFE3C8] p-5 sm:p-6 shadow-[0_2px_10px_rgba(13,27,62,0.04)] flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-12 h-12 rounded-full bg-[var(--color-gold)]/15 border border-[var(--color-gold)]/30 text-[var(--color-gold)] flex items-center justify-center flex-shrink-0">
                  <HeadsetIcon width={22} height={22} />
                </div>
                <div className="min-w-0">
                  <h4 className="font-[family-name:var(--font-playfair)] font-bold text-[16px] text-[var(--color-navy)] leading-tight">
                    Still have questions?
                  </h4>
                  <p className="text-[13px] text-[#5B6677] mt-0.5">
                    Our travel experts are here to help you 24/7.
                  </p>
                </div>
              </div>
              <a
                href={waUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-lg bg-[var(--color-navy)] hover:bg-[var(--color-navy-mid)] text-white font-semibold text-[14px] transition flex-shrink-0 shadow-[0_4px_14px_rgba(13,27,62,0.2)]"
              >
                <WhatsAppIcon width={18} height={18} />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* DESKTOP: image + 3 stacked benefit cards on the right */}
          <div className="hidden lg:flex lg:col-span-5 flex-col gap-4 sticky top-28">
            <div className="relative rounded-2xl overflow-hidden shadow-[0_12px_30px_rgba(13,27,62,0.12)] border border-[#EFE3C8] aspect-[5/4]">
              <Image
                src="/faq-image.png"
                alt="Camel cart at sunset in the Rann of Kutch desert"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 0px, 40vw"
                priority={false}
              />
            </div>
            {BENEFITS.map((b) => (
              <BenefitCard key={b.title} Icon={b.Icon} title={b.title} desc={b.desc} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
