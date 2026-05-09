import { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement>;

export const WhatsAppIcon = (props: Props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.967-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413"/>
  </svg>
);

export const PhoneIcon = (props: Props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

export const ArrowRight = (props: Props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

export const ShieldCheck = (props: Props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
    <path d="M12 2 4 5v6c0 5 3.5 9.7 8 11 4.5-1.3 8-6 8-11V5l-8-3z"/>
    <polyline points="9 12 11 14 15 10"/>
  </svg>
);

// Laurel wreath with center number slot — used in hero stats
export const LaurelWreath = (props: Props) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
    <path d="M16 14c-4 6-4 16 0 24 4 6 10 10 16 12"/>
    <path d="M48 14c4 6 4 16 0 24-4 6-10 10-16 12"/>
    <path d="M16 18c2-1 5-1 7 1M14 24c2-1 5-1 7 1M14 32c2-1 5-1 7 1M16 40c2-1 5-1 7 1M21 46c2-1 5-1 7 1"/>
    <path d="M48 18c-2-1-5-1-7 1M50 24c-2-1-5-1-7 1M50 32c-2-1-5-1-7 1M48 40c-2-1-5-1-7 1M43 46c-2-1-5-1-7 1"/>
    <path d="M28 8c2 2 6 2 8 0"/>
  </svg>
);

export const GroupIcon = (props: Props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

export const HeadsetIcon = (props: Props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
    <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
    <path d="M21 19a2 2 0 0 1-2 2h-1v-6h3v4zM3 19a2 2 0 0 0 2 2h1v-6H3v4z"/>
  </svg>
);

export const RibbonIcon = (props: Props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
    <circle cx="12" cy="9" r="6"/>
    <path d="m9 14-2.5 6L12 17.5 17.5 20 15 14"/>
    <path d="M12 6v3M10 9h4"/>
  </svg>
);

export const CheckIcon = (props: Props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

export const HamburgerIcon = (props: Props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);

export const BriefcaseIcon = (props: Props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
    <rect x="2" y="7" width="20" height="14" rx="2"/>
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
  </svg>
);

export const MailIcon = (props: Props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

export const ChevronRight = (props: Props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
    <polyline points="9 6 15 12 9 18" />
  </svg>
);

/**
 * Decorative gold ornament: ◆ — ◆ — ◆
 * Used under section headings as a luxury divider.
 */
export const GoldOrnament = (props: Props) => (
  <svg viewBox="0 0 80 8" fill="currentColor" aria-hidden {...props}>
    <path d="M4 4l3-3 3 3-3 3z" />
    <rect x="11" y="3.6" width="22" height="0.8" />
    <path d="M37 4l3-3 3 3-3 3z" />
    <rect x="44" y="3.6" width="22" height="0.8" />
    <path d="M70 4l3-3 3 3-3 3z" />
  </svg>
);

/**
 * Simplified mandala / lotus emblem — used in the footer bottom bar.
 */
export const MandalaIcon = (props: Props) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
    <circle cx="32" cy="32" r="4" />
    {Array.from({ length: 8 }).map((_, i) => {
      const angle = (i * Math.PI * 2) / 8;
      const x1 = 32 + 6 * Math.cos(angle);
      const y1 = 32 + 6 * Math.sin(angle);
      const x2 = 32 + 14 * Math.cos(angle);
      const y2 = 32 + 14 * Math.sin(angle);
      const x3 = 32 + 22 * Math.cos(angle);
      const y3 = 32 + 22 * Math.sin(angle);
      return (
        <g key={i}>
          <path d={`M${x1} ${y1} Q${x2 + 4 * Math.cos(angle + Math.PI / 2)} ${y2 + 4 * Math.sin(angle + Math.PI / 2)} ${x3} ${y3} Q${x2 - 4 * Math.cos(angle + Math.PI / 2)} ${y2 - 4 * Math.sin(angle + Math.PI / 2)} ${x1} ${y1}Z`} />
        </g>
      );
    })}
    <circle cx="32" cy="32" r="28" strokeDasharray="2 3" opacity="0.6" />
  </svg>
);
