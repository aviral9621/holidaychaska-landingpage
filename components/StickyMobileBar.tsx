"use client";
import { useEffect, useState } from "react";
import { useInquiryModal } from "./ModalProvider";
import { waUrl, PHONE_TEL } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./Icons";

export default function StickyMobileBar() {
  const { open: modalOpen, openModal } = useInquiryModal();
  const [hideForInquiry, setHideForInquiry] = useState(false);

  useEffect(() => {
    const target = document.getElementById("inquiry");
    if (!target) return;
    const obs = new IntersectionObserver(
      ([entry]) => setHideForInquiry(entry.isIntersecting),
      { threshold: 0.15 }
    );
    obs.observe(target);
    return () => obs.disconnect();
  }, []);

  if (modalOpen || hideForInquiry) return null;

  return (
    <>
      {/* Floating Call FAB — mobile only, just above the bar */}
      <a
        href={`tel:${PHONE_TEL}`}
        aria-label="Call us"
        title="Call us"
        className="sticky-call-fab lg:hidden"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="#ffffff"
          aria-hidden
        >
          <path d="M20.49 15.51l-2.93-1.27a1.4 1.4 0 0 0-1.55.28l-1.18 1.19a11.2 11.2 0 0 1-4.54-4.54l1.19-1.18a1.4 1.4 0 0 0 .28-1.55L10.49 5.51a1.4 1.4 0 0 0-1.5-.84L5.7 5.27a1.4 1.4 0 0 0-1.13 1.46c.34 8.16 6.84 14.66 15 15a1.4 1.4 0 0 0 1.46-1.13l.6-3.29a1.4 1.4 0 0 0-.84-1.5z" />
        </svg>
      </a>

      <div className="fixed bottom-0 left-0 right-0 z-[90] grid grid-cols-2 lg:hidden h-14 shadow-[0_-4px_12px_rgba(0,0,0,0.25)]">
        <button
          type="button"
          onClick={() => openModal()}
          className="bg-[var(--color-gold)] text-white font-semibold uppercase text-sm tracking-wider flex items-center justify-center gap-1"
        >
          Enquiry Now
        </button>
        <a
          href={waUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[var(--color-green-wa)] text-white font-semibold uppercase text-sm tracking-wider flex items-center justify-center gap-2"
        >
          <WhatsAppIcon width={18} height={18} /> WhatsApp
        </a>
      </div>
    </>
  );
}
