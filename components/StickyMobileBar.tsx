"use client";
import { useEffect, useState } from "react";
import { useInquiryModal } from "./ModalProvider";
import { waUrl, PHONE_TEL } from "@/lib/whatsapp";
import { WhatsAppIcon, PhoneIcon } from "./Icons";

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
        <PhoneIcon width={20} height={20} />
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
