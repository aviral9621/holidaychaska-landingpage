"use client";
import Image from "next/image";
import { useInquiryModal } from "./ModalProvider";

const BENEFITS = [
  { icon: "🗺️", title: "Personalized Tour Packages", desc: "Fully customizable itineraries built around your needs." },
  { icon: "🧭", title: "Expert Local Guides", desc: "Travel with experienced locals for deeper cultural experiences." },
  { icon: "🛡️", title: "Best Comfort & Safety", desc: "Quality hotels, safe travel & 24x7 assistance throughout." },
  { icon: "🏷️", title: "Affordable Pricing", desc: "Best value-for-money with no hidden charges, ever." },
  { icon: "💬", title: "Quick Response", desc: "Instant support & fast reply on WhatsApp." },
  { icon: "🏆", title: "Trusted & Reliable", desc: "Hundreds of happy travelers and years of proven experience." },
];

export default function WhyChooseUs() {
  const { openModal } = useInquiryModal();
  return (
    <section id="why-choose-us" className="relative overflow-hidden" style={{ background: "var(--color-navy)" }}>
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-20 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left: dancers panel */}
        <div className="lg:col-span-5 relative flex justify-center">
          <div
            className="relative w-full max-w-md aspect-[4/5] rounded-2xl overflow-hidden flex items-end justify-center"
            style={{
              background:
                "linear-gradient(180deg, #1A2E50 0%, #0D1B3E 100%)",
            }}
          >
            {/* Mandala watermark */}
            <svg
              viewBox="0 0 200 200"
              className="absolute inset-0 w-full h-full opacity-[0.08] text-[var(--color-gold)]"
              aria-hidden
            >
              <g fill="none" stroke="currentColor" strokeWidth="0.6">
                <circle cx="100" cy="100" r="90" />
                <circle cx="100" cy="100" r="70" />
                <circle cx="100" cy="100" r="50" />
                <circle cx="100" cy="100" r="30" />
                {Array.from({ length: 16 }).map((_, i) => {
                  const a = (i * Math.PI * 2) / 16;
                  return (
                    <line
                      key={i}
                      x1="100"
                      y1="100"
                      x2={100 + 90 * Math.cos(a)}
                      y2={100 + 90 * Math.sin(a)}
                    />
                  );
                })}
              </g>
            </svg>
            <Image
              src="/dancers.png"
              alt="Gujarati Garba dancers in traditional attire"
              width={520}
              height={650}
              className="relative z-10 object-contain w-[95%] h-auto"
              style={{ marginBottom: -8 }}
              priority={false}
            />
          </div>
        </div>

        {/* Right: benefits */}
        <div className="lg:col-span-7">
          <div className="prehad mb-3">WHY TRAVEL WITH US</div>
          <h2 className="h2-section text-white mb-8">
            Why Choose Gujarat Tour Packages?
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
            {BENEFITS.map((b) => (
              <li key={b.title} className="flex gap-3">
                <span className="text-2xl text-[var(--color-gold)] leading-none mt-0.5">{b.icon}</span>
                <div>
                  <h4 className="text-white font-semibold text-[15px] mb-1">{b.title}</h4>
                  <p className="text-[var(--color-muted)] text-[13px] leading-snug">{b.desc}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <button type="button" className="btn-gold" onClick={() => openModal()}>
              Enquire Now →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
