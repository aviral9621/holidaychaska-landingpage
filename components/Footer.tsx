import Image from "next/image";
import Link from "next/link";
import { waUrl, PHONE_DISPLAY, PHONE_TEL, SUPPORT_EMAIL } from "@/lib/whatsapp";
import { WhatsAppIcon, PhoneIcon } from "./Icons";

const MailIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

export default function Footer() {
  return (
    <footer style={{ background: "var(--color-navy)" }} className="text-white">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <div>
          <Image
            src="/logo.png"
            alt="Gujarat Tour Packages"
            width={260}
            height={64}
            style={{ width: "auto", height: 64 }}
            className="mb-4 object-contain object-left"
          />
          <p className="text-[13px] text-[var(--color-muted)] leading-relaxed">
            We offer the best Gujarat tour packages with reliable service, comfortable travel and unforgettable experiences.
          </p>
        </div>

        <div>
          <h4 className="text-[var(--color-gold)] uppercase tracking-widest font-semibold text-sm mb-4">Quick Links</h4>
          <ul className="space-y-2 text-[14px] text-white/85">
            {[
              ["Home", "#home"],
              ["Tour Packages", "#packages"],
              ["Why Choose Us", "#why-choose-us"],
              ["FAQ", "#faq"],
              ["Inquiry", "#inquiry"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="hover:text-[var(--color-gold-light)] transition">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <h4 className="text-[var(--color-gold)] uppercase tracking-widest font-semibold text-sm mt-6 mb-3">Important</h4>
          <ul className="space-y-2 text-[14px] text-white/85">
            {[
              ["Privacy Policy", "/privacy-policy"],
              ["Terms & Conditions", "/terms-conditions"],
              ["Refund Policy", "/refund-policy"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link href={href} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-gold-light)] transition">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[var(--color-gold)] uppercase tracking-widest font-semibold text-sm mb-4">Contact Us</h4>
          <ul className="space-y-3 text-[14px] text-white/90 mb-5">
            <li>
              <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center gap-2.5 hover:text-[var(--color-gold-light)] transition">
                <PhoneIcon width={16} height={16} className="text-[var(--color-gold)]" />
                <span>{PHONE_DISPLAY}</span>
              </a>
            </li>
            <li>
              <a href={waUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 hover:text-[var(--color-gold-light)] transition">
                <WhatsAppIcon width={16} height={16} className="text-[var(--color-gold)]" />
                <span>{PHONE_DISPLAY}</span>
                <span className="text-[var(--color-muted)] text-[12px]">(WhatsApp)</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${SUPPORT_EMAIL}`} className="inline-flex items-center gap-2.5 hover:text-[var(--color-gold-light)] transition break-all">
                <MailIcon width={16} height={16} className="text-[var(--color-gold)] flex-shrink-0" />
                <span>{SUPPORT_EMAIL}</span>
              </a>
            </li>
          </ul>
          <a href={waUrl()} target="_blank" rel="noopener noreferrer" className="btn-wa">
            <WhatsAppIcon width={18} height={18} /> WhatsApp Us
          </a>
        </div>
      </div>
      <div style={{ background: "var(--color-navy-dark)" }}>
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[12px] text-[#556677]">
          <span>© 2025 Gujarat Tour Packages. All Rights Reserved.</span>
          <span>A Unit of Holiday Chaska</span>
        </div>
      </div>
    </footer>
  );
}
