"use client";
import { useEffect } from "react";
import { useInquiryModal } from "./ModalProvider";
import InquiryForm from "./InquiryForm";

export default function InquiryModalMount() {
  const { open, prefilledPackage, closeModal } = useInquiryModal();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, closeModal]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Plan Your Uttarakhand Trip Inquiry"
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ animation: "overlayFadeIn 0.2s ease" }}
    >
      <div
        className="absolute inset-0 bg-black/75"
        onClick={closeModal}
        aria-hidden="true"
      />
      <div
        className="relative w-[95vw] max-w-[640px] max-h-[92vh] overflow-y-auto rounded-2xl bg-[var(--color-navy)] border border-[rgba(201,146,42,0.3)] shadow-[var(--shadow-modal)] sm:m-4
                   max-sm:fixed max-sm:bottom-0 max-sm:left-0 max-sm:right-0 max-sm:w-full max-sm:max-w-none max-sm:max-h-[90vh] max-sm:rounded-b-none"
        style={{ animation: "modalFadeIn 0.25s ease" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={closeModal}
          aria-label="Close"
          className="absolute top-3 right-3 text-white/80 hover:text-white text-2xl w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10 transition z-10"
        >
          ✕
        </button>
        <div className="p-6 sm:p-8">
          <div className="mb-5">
            <div className="flex items-center gap-2 text-[var(--color-gold)] mb-1">
              <span aria-hidden>📍</span>
              <span className="text-xs uppercase tracking-[0.2em] font-[family-name:var(--font-cinzel)] font-medium">
                Plan Your Uttarakhand Trip
              </span>
            </div>
            <h3 className="text-white text-2xl sm:text-3xl font-[family-name:var(--font-playfair)] font-bold leading-tight">
              Get a Custom Quote
            </h3>
            <p className="text-white/70 text-sm mt-1">
              We&apos;ll call you back in 2 hours.
            </p>
          </div>
          <InquiryForm prefilledPackage={prefilledPackage} />
        </div>
      </div>
    </div>
  );
}
