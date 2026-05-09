import Image from "next/image";
import Link from "next/link";
import { waUrl, PHONE_DISPLAY, PHONE_TEL, SUPPORT_EMAIL } from "@/lib/whatsapp";
import {
  WhatsAppIcon,
  PhoneIcon,
  MailIcon,
  ChevronRight,
  GoldOrnament,
  MandalaIcon,
  ShieldCheck,
  LaurelWreath,
  GroupIcon,
  HeadsetIcon,
} from "./Icons";

const QUICK_LINKS: [string, string][] = [
  ["Home", "#home"],
  ["Tour Packages", "#packages"],
  ["Why Choose Us", "#why-choose-us"],
  ["FAQ", "#faq"],
  ["Inquiry", "#inquiry"],
];

const IMPORTANT_LINKS: [string, string][] = [
  ["Privacy Policy", "/privacy-policy"],
  ["Terms & Conditions", "/terms-conditions"],
  ["Refund Policy", "/refund-policy"],
];

const STATS = [
  { Icon: LaurelWreath, num: "10+",     label: "Years of Experience" },
  { Icon: GroupIcon,    num: "50,000+", label: "Happy Travellers" },
  { Icon: HeadsetIcon,  num: "24/7",    label: "Support Available" },
  { Icon: ShieldCheck,  num: "100%",    label: "Safe & Secure Travel" },
];

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h4 className="text-[var(--color-gold)] uppercase tracking-[0.18em] font-[family-name:var(--font-playfair)] font-bold text-[15px] mb-2">
        {children}
      </h4>
      <GoldOrnament className="text-[var(--color-gold)] h-2 w-[80px]" />
    </div>
  );
}

function FooterLink({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) {
  const cls =
    "group flex items-center gap-2.5 text-[14px] text-white/85 hover:text-[var(--color-gold-light)] transition-colors py-1.5";
  const inner = (
    <>
      <ChevronRight
        width={11}
        height={11}
        className="text-[var(--color-gold)] flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
      />
      <span>{children}</span>
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
  ) : (
    <Link href={href} className={cls}>{inner}</Link>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden text-white" style={{ background: "var(--color-navy)" }}>
      {/* Watermark hero image — very subtle */}
      <div
        className="absolute inset-0 pointer-events-none -z-0"
        style={{
          backgroundImage: "url(/hero-desktop.jpg)",
          backgroundPosition: "center 40%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          opacity: 0.07,
          filter: "saturate(0.6)",
        }}
        aria-hidden
      />
      {/* Navy gradient overlay to keep things readable */}
      <div
        className="absolute inset-0 pointer-events-none -z-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,18,46,0.88) 0%, rgba(13,27,62,0.82) 50%, rgba(8,18,46,0.95) 100%)",
        }}
        aria-hidden
      />
      {/* Subtle gold radial glow on each side */}
      <div
        className="absolute inset-0 pointer-events-none -z-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle at 0% 50%, rgba(201,146,42,0.12) 0%, transparent 50%), radial-gradient(circle at 100% 50%, rgba(201,146,42,0.10) 0%, transparent 50%)",
        }}
        aria-hidden
      />

      <div className="relative max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 pt-16 md:pt-24 pb-10">
        {/* Main 4-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column 1 — Brand */}
          <div className="lg:col-span-4">
            <Image
              src="/logo.png"
              alt="Gujarat Tour Packages — A Holiday Chaska Company"
              width={320}
              height={84}
              style={{ width: "auto", height: 88 }}
              className="object-contain object-left mb-5"
            />
            <p className="text-[14px] text-white/70 leading-relaxed mb-6 max-w-sm">
              We offer the best Gujarat tour packages with reliable service,
              comfortable travel and unforgettable experiences.
            </p>

            {/* Trust card */}
            <div
              className="rounded-xl border border-[rgba(201,146,42,0.25)] p-4 max-w-sm"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(201,146,42,0.05) 100%)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
              }}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-[var(--color-gold)]/15 border border-[var(--color-gold)]/40 flex items-center justify-center text-[var(--color-gold)] flex-shrink-0">
                  <ShieldCheck width={20} height={20} />
                </div>
                <div>
                  <h5 className="text-[var(--color-gold)] font-semibold text-[14px] mb-1">
                    Trusted Travel Partner
                  </h5>
                  <p className="text-white/70 text-[12.5px] leading-snug">
                    Committed to providing safe, reliable and memorable journeys
                    across Gujarat.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <div className="lg:col-span-2 lg:border-l lg:border-[rgba(201,146,42,0.18)] lg:pl-8">
            <ColumnHeading>Quick Links</ColumnHeading>
            <ul className="space-y-0.5">
              {QUICK_LINKS.map(([label, href]) => (
                <li key={href}>
                  <FooterLink href={href}>{label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Important Links */}
          <div className="lg:col-span-3 lg:border-l lg:border-[rgba(201,146,42,0.18)] lg:pl-8">
            <ColumnHeading>Important</ColumnHeading>
            <ul className="space-y-0.5">
              {IMPORTANT_LINKS.map(([label, href]) => (
                <li key={href}>
                  <FooterLink href={href} external>
                    {label}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact */}
          <div className="lg:col-span-3 lg:border-l lg:border-[rgba(201,146,42,0.18)] lg:pl-8">
            <ColumnHeading>Contact Us</ColumnHeading>
            <ul className="space-y-3 mb-6">
              <li>
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="flex items-start gap-3 text-[14px] text-white/90 hover:text-[var(--color-gold-light)] transition group"
                >
                  <span className="w-9 h-9 rounded-full bg-[rgba(201,146,42,0.1)] border border-[rgba(201,146,42,0.3)] flex items-center justify-center text-[var(--color-gold)] flex-shrink-0 group-hover:bg-[rgba(201,146,42,0.2)] transition">
                    <PhoneIcon width={15} height={15} />
                  </span>
                  <span className="pt-2">{PHONE_DISPLAY}</span>
                </a>
              </li>
              <li>
                <a
                  href={waUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-[14px] text-white/90 hover:text-[var(--color-gold-light)] transition group"
                >
                  <span className="w-9 h-9 rounded-full bg-[rgba(201,146,42,0.1)] border border-[rgba(201,146,42,0.3)] flex items-center justify-center text-[var(--color-gold)] flex-shrink-0 group-hover:bg-[rgba(201,146,42,0.2)] transition">
                    <WhatsAppIcon width={15} height={15} />
                  </span>
                  <span className="pt-2">
                    {PHONE_DISPLAY}
                    <span className="text-white/50 text-[12px] ml-1">(WhatsApp)</span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="flex items-start gap-3 text-[14px] text-white/90 hover:text-[var(--color-gold-light)] transition group break-all"
                >
                  <span className="w-9 h-9 rounded-full bg-[rgba(201,146,42,0.1)] border border-[rgba(201,146,42,0.3)] flex items-center justify-center text-[var(--color-gold)] flex-shrink-0 group-hover:bg-[rgba(201,146,42,0.2)] transition">
                    <MailIcon width={15} height={15} />
                  </span>
                  <span className="pt-2">{SUPPORT_EMAIL}</span>
                </a>
              </li>
            </ul>

            <a
              href={waUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-wa-btn w-full sm:w-auto"
            >
              <WhatsAppIcon width={18} height={18} />
              <span>WhatsApp Us</span>
            </a>
            <p className="text-[11.5px] text-white/55 mt-3">
              Available 24×7 for travel assistance
            </p>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-14 pt-10 border-t border-[rgba(201,146,42,0.18)]">
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
            {STATS.map(({ Icon, num, label }, i) => (
              <li
                key={label}
                className={`flex items-center gap-3 ${
                  i < STATS.length - 1
                    ? "md:border-r md:border-[rgba(201,146,42,0.12)] md:pr-6"
                    : ""
                }`}
              >
                <span className="w-12 h-12 rounded-lg border border-[rgba(201,146,42,0.3)] bg-[rgba(201,146,42,0.06)] flex items-center justify-center text-[var(--color-gold)] flex-shrink-0">
                  <Icon width={26} height={26} />
                </span>
                <div className="leading-tight">
                  <div className="text-[var(--color-gold)] font-[family-name:var(--font-cinzel)] font-bold text-[18px]">
                    {num}
                  </div>
                  <div className="text-white/75 text-[12px]">{label}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom copyright bar */}
      <div
        className="relative border-t border-[rgba(201,146,42,0.18)]"
        style={{ background: "rgba(6,14,32,0.88)" }}
      >
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 relative">
          <p className="text-[12px] text-white/55 order-2 sm:order-1">
            © 2025 Gujarat Tour Packages. All Rights Reserved.
          </p>
          <span
            className="text-[var(--color-gold)]/40 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block"
            aria-hidden
          >
            <MandalaIcon width={32} height={32} />
          </span>
          <p className="text-[12px] text-white/55 order-1 sm:order-2">
            A Unit of <span className="text-[var(--color-gold)] font-semibold">Holiday Chaska</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
