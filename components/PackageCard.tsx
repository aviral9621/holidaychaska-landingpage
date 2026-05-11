"use client";
import Image from "next/image";
import { useState } from "react";
import type { TourPackage } from "@/lib/packages";
import { useInquiryModal } from "./ModalProvider";
import { waPackageUrl } from "@/lib/whatsapp";
import { WhatsAppIcon, RouteIcon } from "./Icons";

export default function PackageCard({ pkg }: { pkg: TourPackage }) {
  const [open, setOpen] = useState(false);
  const { openModal } = useInquiryModal();

  return (
    <article className="bg-white rounded-[12px] border border-[#E8D9B8] overflow-hidden flex flex-col shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-card-hover)]">
      <div className="relative w-full h-[220px] overflow-hidden">
        <Image
          src={pkg.image}
          alt={pkg.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[var(--color-gold)]/15 text-[var(--color-gold)] border border-[var(--color-gold)]/30">
            {pkg.duration}
          </span>
          {pkg.categories.map((c) => (
            <span
              key={c}
              className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#FAF3E0] text-[var(--color-text-dark)] border border-[#E8D9B8]"
            >
              {c}
            </span>
          ))}
        </div>

        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-[family-name:var(--font-playfair)] font-bold text-[18px] text-[var(--color-navy)] leading-tight flex-1">
            {pkg.name}
          </h3>
          <a
            href={waPackageUrl({ name: pkg.name, duration: pkg.duration, places: pkg.places })}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`WhatsApp now about ${pkg.name}`}
            className="flex-shrink-0 inline-flex items-center gap-1.5 h-8 px-2.5 rounded-full bg-[var(--color-green-wa)] text-white text-[11px] font-semibold uppercase tracking-wider hover:bg-[#1ebe5d] transition shadow-[0_2px_8px_rgba(37,211,102,0.35)]"
          >
            <WhatsAppIcon width={13} height={13} />
            <span>WA Now</span>
          </a>
        </div>

        <div className="mb-3">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-[var(--color-gold)] flex-shrink-0">
              <RouteIcon width={14} height={14} />
            </span>
            <span className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-[var(--color-navy)]">
              Places Covered :
            </span>
          </div>
          <p className="text-[13px] text-[var(--color-gold)] font-medium pl-[22px] leading-snug">
            {pkg.places.join(" · ")}
          </p>
          {"price" in pkg && pkg.price && (
            <p className="pl-[22px] mt-1 text-[13px] font-bold text-[var(--color-navy)]">
              Starting from <span className="text-[var(--color-gold)]">{pkg.price as string}</span>
            </p>
          )}
        </div>
        <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5 mb-4">
          {pkg.amenities.map((a) => (
            <li key={a.label} className="text-[12px] text-[#5B6677] flex items-center gap-1.5">
              <span>{a.icon}</span> {a.label}
            </li>
          ))}
        </ul>

        {open && (
          <div
            className="text-[13px] text-[#3a4658] mb-4 pb-4 border-b border-[#E8D9B8]"
            style={{ animation: "accordionDown 0.3s ease" }}
          >
            <p className="mb-2">{pkg.description}</p>
            <p className="text-[12px] text-[#5B6677]">
              <strong>Stay:</strong> {pkg.accommodation} &nbsp;·&nbsp; <strong>Meals:</strong> {pkg.meals}
            </p>
          </div>
        )}

        <div className="mt-auto grid grid-cols-2 gap-2">
          <button
            type="button"
            className="btn-outline-navy"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
          >
            {open ? "Hide Details" : "View Details"}
          </button>
          <button
            type="button"
            className="btn-gold !py-2.5 !px-3 !text-[12px]"
            onClick={() => openModal(pkg.name)}
          >
            Enquire Now
          </button>
        </div>
      </div>
    </article>
  );
}
