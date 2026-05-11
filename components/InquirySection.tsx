import InquiryForm from "./InquiryForm";
import { ShieldCheck, CheckIcon } from "./Icons";

export default function InquirySection() {
  return (
    <section
      id="inquiry"
      className="py-20 md:py-24 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at 20% 0%, #1a3a25 0%, var(--color-navy) 50%, #060f0a 100%)",
      }}
    >
      {/* Subtle gold ornamental texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--color-gold) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="relative max-w-[1280px] mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-5">
          <div className="prehad mb-3">PLAN YOUR UTTARAKHAND TRIP</div>
          <h2 className="h2-section text-white mb-4">
            Get a Custom Tour Quote
            <br />
            in Just 2 Minutes
          </h2>
          <p className="text-white/75 text-base mb-7 max-w-md leading-relaxed">
            Fill the form and our Uttarakhand travel expert will connect with you shortly. No
            obligations, no hidden charges — just an honest, tailored plan for your Himalayan adventure.
          </p>
          <ul className="space-y-3 text-white/90 text-[14px]">
            {[
              "100% Secure & Safe",
              "No Hidden Charges",
              "Tailored Himalayan Itineraries",
              "Reply within 2 hours",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-[var(--color-gold)]/15 border border-[var(--color-gold)]/40 text-[var(--color-gold)] flex items-center justify-center">
                  <CheckIcon width={12} height={12} />
                </span>
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex items-center gap-2 text-white/70 text-sm">
            <ShieldCheck width={18} height={18} className="text-[var(--color-gold)]" />
            Trusted by 50,000+ travelers
          </div>
        </div>
        <div
          className="lg:col-span-7 rounded-2xl border border-[rgba(201,146,42,0.3)] p-6 sm:p-8"
          style={{
            background:
              "linear-gradient(180deg, rgba(11,34,24,0.85) 0%, rgba(6,15,10,0.95) 100%)",
            backdropFilter: "blur(8px)",
            boxShadow: "0 16px 48px rgba(0,0,0,0.35)",
          }}
        >
          <InquiryForm />
        </div>
      </div>
    </section>
  );
}
