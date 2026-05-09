import { PACKAGES } from "@/lib/packages";
import PackageCard from "./PackageCard";

export default function Packages() {
  return (
    <section id="packages" className="py-20 md:py-24" style={{ background: "var(--color-cream)" }}>
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="text-center mb-12">
          <div className="prehad mb-3">HANDPICKED EXPERIENCES</div>
          <h2 className="h2-section text-[var(--color-navy)]">Top Gujarat Tour Packages</h2>
          <div className="gold-divider"><span>❖</span></div>
          <p className="text-[var(--color-muted)] text-base">
            Customizable packages for every kind of traveler
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PACKAGES.map((p) => (
            <PackageCard key={p.id} pkg={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
