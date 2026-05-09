import { LaurelWreath, GroupIcon, HeadsetIcon, ShieldCheck, RibbonIcon } from "./Icons";

const STATS = [
  { Icon: LaurelWreath, num: "4.8/5",   label: "Google Rating" },
  { Icon: GroupIcon,    num: "5,000+",  label: "Successful Trips" },
  { Icon: RibbonIcon,   num: "98%",     label: "Happy Travelers" },
  { Icon: HeadsetIcon,  num: "24/7",    label: "Customer Support" },
  { Icon: ShieldCheck,  num: "100%",    label: "Travel Safety" },
];

const BADGES = [
  { Icon: ShieldCheck, title: "100% Secure & Safe", copy: "All bookings are fully secure with no data sharing." },
  { Icon: RibbonIcon,  title: "No Hidden Charges",  copy: "Transparent pricing — what you see is what you pay." },
  { Icon: LaurelWreath,title: "Best Price Guarantee", copy: "We match any lower price — guaranteed." },
];

export default function TrustSection() {
  return (
    <section
      id="trust"
      className="py-16 md:py-20 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #FAF3E0 0%, #F5EBD0 100%)",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 relative">
        <div className="text-center mb-10">
          <div className="prehad mb-3">OUR HAPPY TRAVELERS</div>
          <h2 className="h2-section text-[var(--color-navy)]">Trusted by Thousands of Travelers</h2>
          <div className="gold-divider"><span>❖</span></div>
        </div>

        <ul className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-0 bg-white rounded-2xl p-5 md:p-7 border border-[#E8D9B8] shadow-[0_8px_30px_rgba(13,27,62,0.08)]">
          {STATS.map(({ Icon, num, label }, i) => (
            <li
              key={label}
              className={`flex flex-col items-center text-center gap-1.5 px-2 ${
                i < STATS.length - 1 ? "md:border-r md:border-[#E8D9B8]" : ""
              }`}
            >
              <span className="text-[var(--color-gold)] mb-1">
                <Icon width={36} height={36} />
              </span>
              <div className="text-[var(--color-navy)] font-[family-name:var(--font-cinzel)] font-bold text-2xl md:text-[28px] leading-none">
                {num}
              </div>
              <div className="text-[var(--color-text-dark)]/70 text-[12px] md:text-[13px]">{label}</div>
            </li>
          ))}
        </ul>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {BADGES.map(({ Icon, title, copy }) => (
            <div
              key={title}
              className="bg-white rounded-xl border border-[#E8D9B8] p-5 flex items-start gap-3 shadow-[0_4px_18px_rgba(13,27,62,0.05)]"
            >
              <span className="text-[var(--color-gold)] flex-shrink-0">
                <Icon width={28} height={28} />
              </span>
              <div>
                <h4 className="text-[var(--color-navy)] font-semibold text-[15px] mb-1">{title}</h4>
                <p className="text-[var(--color-text-dark)]/70 text-[13px] leading-snug">{copy}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
