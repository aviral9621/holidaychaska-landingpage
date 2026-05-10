"use client";
import { useEffect } from "react";
import { useInquiryModal } from "./ModalProvider";
import { CheckIcon, WhatsAppIcon } from "./Icons";
import { waUrl } from "@/lib/whatsapp";

export default function ThankYouModal() {
  const { thankYouOpen, thankYouData, closeThankYou } = useInquiryModal();

  useEffect(() => {
    if (!thankYouOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeThankYou();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [thankYouOpen, closeThankYou]);

  if (!thankYouOpen || !thankYouData) return null;

  const { fullName, phone } = thankYouData;
  const firstName = fullName.trim().split(/\s+/)[0] || fullName;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Inquiry submitted successfully"
      className="fixed inset-0 z-[300] flex items-center justify-center"
      style={{ animation: "overlayFadeIn 0.2s ease" }}
    >
      <div
        className="absolute inset-0 bg-black/80"
        onClick={closeThankYou}
        aria-hidden="true"
      />
      <div
        className="relative w-[95vw] max-w-[520px] max-h-[92vh] overflow-y-auto rounded-2xl bg-[var(--color-navy)] border border-[rgba(201,146,42,0.4)] shadow-[var(--shadow-modal)] sm:m-4
                   max-sm:fixed max-sm:bottom-0 max-sm:left-0 max-sm:right-0 max-sm:w-full max-sm:max-w-none max-sm:rounded-b-none"
        style={{ animation: "modalFadeIn 0.3s ease" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={closeThankYou}
          aria-label="Close"
          className="absolute top-3 right-3 text-white/80 hover:text-white text-2xl w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10 transition z-10"
        >
          ✕
        </button>

        <div className="p-7 sm:p-9 text-center">
          <div
            className="w-20 h-20 mx-auto mb-5 rounded-full bg-[var(--color-gold)]/15 border-2 border-[var(--color-gold)] flex items-center justify-center text-[var(--color-gold)]"
            style={{ animation: "modalFadeIn 0.45s ease" }}
          >
            <CheckIcon width={40} height={40} />
          </div>

          <div className="text-[var(--color-gold)] text-xs uppercase tracking-[0.22em] font-[family-name:var(--font-cinzel)] font-medium mb-2">
            Inquiry Received
          </div>

          <h3 className="text-white text-2xl sm:text-3xl font-[family-name:var(--font-playfair)] font-bold leading-tight mb-3">
            Thank You, {firstName}!
          </h3>

          <p className="text-white/85 text-base mb-2">
            Your inquiry has been submitted successfully.
          </p>
          <p className="text-white/70 text-sm mb-6 leading-relaxed">
            Our travel expert will call you on{" "}
            <strong className="text-white whitespace-nowrap">+91 {phone}</strong>{" "}
            within the next <strong className="text-white">2 hours</strong> to craft your perfect Gujarat itinerary.
          </p>

          <div className="rounded-lg border border-[rgba(201,146,42,0.25)] bg-[rgba(255,255,255,0.03)] p-4 mb-6 text-left">
            <p className="text-white/85 text-sm font-semibold mb-2">What happens next?</p>
            <ul className="space-y-1.5 text-white/75 text-[13px]">
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-gold)] mt-0.5">•</span>
                Our expert reviews your preferences
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-gold)] mt-0.5">•</span>
                You receive a personalized quote on call
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-gold)] mt-0.5">•</span>
                We finalize the itinerary together
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3">
            <a
              href={waUrl(`Hi! I just submitted an inquiry. Name: ${fullName}, Phone: ${phone}. Looking forward to your call.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wa h-12 inline-flex"
            >
              <WhatsAppIcon width={18} height={18} /> WhatsApp Us for Faster Reply
            </a>
            <button
              type="button"
              onClick={closeThankYou}
              className="btn-gold h-12"
            >
              Close
            </button>
          </div>

          <p className="text-white/50 text-[11px] mt-5">
            Need urgent help? Call us at{" "}
            <a href="tel:+919717580259" className="text-[var(--color-gold)] hover:underline">
              +91 97175 80259
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
