"use client";
import { useInquiryModal } from "./ModalProvider";
import {
  ArrowRight,
  BriefcaseIcon,
  PhoneIcon,
  ShieldCheck,
  LaurelWreath,
  GroupIcon,
  HeadsetIcon,
  RibbonIcon,
} from "./Icons";

const STATS = [
  { Icon: LaurelWreath, num: "10+",       label: "Years of\nExperience" },
  { Icon: GroupIcon,    num: "50,000+",   label: "Happy\nTravelers" },
  { Icon: HeadsetIcon,  num: "24/7",      label: "Support\nAvailable" },
  { Icon: ShieldCheck,  num: "100%",      label: "Safe & Secure\nTravel" },
  { Icon: RibbonIcon,   num: "Best Price",label: "Guarantee", isPrice: true },
];

export default function Hero() {
  const { openModal } = useInquiryModal();
  return (
    <section
      id="home"
      className="relative w-full overflow-hidden"
      style={{
        background: "var(--color-navy)",
        height: "min(100vh, 940px)",
        minHeight: 600,
      }}
    >
      {/* Image canvas — sits below the fixed header so the statue is never clipped */}
      <div
        className="absolute right-0 left-0 md:left-[40%] -z-0 hero-image-canvas"
      >
        <picture>
          <source media="(max-width: 767px)" srcSet="/hero-mobile.jpg" />
          <img
            src="/hero-desktop.jpg"
            alt="Gujarat Tour Packages — Temple, Statue of Unity and River at Sunset"
            className="w-full h-full object-cover"
            style={{ objectPosition: "60% 50%" }}
          />
        </picture>
      </div>

      {/* Smooth right→left gradient overlay (deep navy on left, fades to clear on right) */}
      <div
        className="absolute inset-0 -z-0 hidden md:block"
        style={{
          background:
            "linear-gradient(90deg, var(--color-navy) 0%, var(--color-navy) 32%, rgba(13,27,62,0.95) 44%, rgba(13,27,62,0.7) 55%, rgba(13,27,62,0.35) 70%, rgba(13,27,62,0.08) 85%, rgba(13,27,62,0) 100%)",
        }}
      />
      {/* Subtle vertical bottom-fade so river/rocks blend gracefully */}
      <div
        className="absolute inset-x-0 bottom-0 h-[180px] -z-0 hidden md:block"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(13,27,62,0.4) 100%)",
        }}
      />
      {/* Mobile uniform overlay */}
      <div
        className="absolute inset-0 -z-0 md:hidden"
        style={{ background: "rgba(8,18,46,0.78)" }}
      />

      {/* Padding pushes content below header */}
      <div
        className="relative w-full max-w-[1480px] mx-auto px-5 sm:px-7 lg:px-10 flex flex-col h-full hero-content"
      >
        <div className="flex-1 flex items-center py-4 md:py-6">
          <div className="w-full md:w-[44%] max-w-[600px]">
            <div className="prehad mb-4 text-[11px] sm:text-[12px]">EXPLORE THE VIBRANT</div>

            <h1
              className="font-[family-name:var(--font-cinzel)] font-extrabold text-white leading-[1.05] tracking-tight"
              style={{ fontSize: "clamp(32px, 4vw, 52px)" }}
            >
              <span className="block">GUJARAT</span>
              <span className="block mt-1.5">WITH THE BEST</span>
              <span className="block mt-1.5 text-[var(--color-gold)]">TOUR PACKAGES</span>
            </h1>

            <div className="my-4 flex items-center gap-3">
              <span className="w-10 h-px bg-[var(--color-gold)]" />
              <span className="text-[var(--color-gold)] text-[10px]">❖</span>
              <span className="w-10 h-px bg-[var(--color-gold)]" />
            </div>

            <p className="text-white/95 text-[14px] sm:text-[15px] max-w-md leading-relaxed">
              Pilgrimage, Heritage, Wildlife &amp; Family Tours
              <br />
              Tailored for Unforgettable Experiences.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a href="#packages" className="hero-cta hero-cta-gold">
                <BriefcaseIcon width={17} height={17} />
                <span>Explore Packages</span>
                <ArrowRight width={15} height={15} />
              </a>
              <button type="button" onClick={() => openModal()} className="hero-cta hero-cta-outline">
                <PhoneIcon width={15} height={15} />
                <span>Enquiry Now</span>
              </button>
            </div>

            <div className="mt-5 flex items-center gap-2 text-[13px]">
              <span className="text-[var(--color-gold)]">
                <ShieldCheck width={16} height={16} />
              </span>
              <span className="text-white">Owned by</span>
              <span className="text-[var(--color-gold)] font-semibold">Holiday Chaska</span>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="pb-4 md:pb-5">
          <div
            className="rounded-xl border border-[rgba(201,146,42,0.28)]"
            style={{
              background: "rgba(13,27,62,0.55)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
            }}
          >
            <ul className="flex md:justify-around gap-6 md:gap-2 px-4 md:px-5 py-3 md:py-3.5 overflow-x-auto no-scrollbar">
              {STATS.map(({ Icon, num, label, isPrice }, i) => (
                <li
                  key={label}
                  className={`flex items-center gap-2.5 text-white whitespace-nowrap min-w-max relative ${
                    i > 0 ? "md:before:content-[''] md:before:absolute md:before:left-[-10px] md:before:top-1/2 md:before:-translate-y-1/2 md:before:w-px md:before:h-7 md:before:bg-[rgba(201,146,42,0.25)]" : ""
                  }`}
                >
                  <span className="text-[var(--color-gold)] flex-shrink-0">
                    <Icon width={28} height={28} />
                  </span>
                  <div className="leading-tight">
                    <div
                      className={`text-[var(--color-gold)] font-[family-name:var(--font-cinzel)] font-bold ${
                        isPrice ? "text-[13px] md:text-[14px]" : "text-[14px] md:text-[15px]"
                      }`}
                    >
                      {num}
                    </div>
                    <div className="text-[10.5px] md:text-[11px] text-white/85 whitespace-pre-line leading-[1.25]">
                      {label}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
