"use client";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { CheckIcon, WhatsAppIcon, ShieldCheck } from "@/components/Icons";
import { waUrl, PHONE_DISPLAY, PHONE_TEL } from "@/lib/whatsapp";

const REDIRECT_SECONDS = 15;

function subscribeNoop() {
  return () => {};
}
function getSuccessSnapshot() {
  if (typeof window === "undefined") return "";
  try {
    return sessionStorage.getItem("inquirySuccess") || "";
  } catch {
    return "";
  }
}
function getServerSuccessSnapshot() {
  return "";
}

export default function ThankYouPage() {
  const raw = useSyncExternalStore(
    subscribeNoop,
    getSuccessSnapshot,
    getServerSuccessSnapshot
  );
  let name = "";
  let phone = "";
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as { name?: unknown; phone?: unknown };
      if (typeof parsed.name === "string") name = parsed.name;
      if (typeof parsed.phone === "string") phone = parsed.phone;
    } catch {}
  }

  const [seconds, setSeconds] = useState(REDIRECT_SECONDS);
  const cancelled = useRef(false);

  useEffect(() => {
    document.title = "Thank You — Inquiry Received | Holiday Chaska";
  }, []);

  useEffect(() => {
    if (cancelled.current) return;
    if (seconds <= 0) {
      window.location.href = "/";
      return;
    }
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  function cancelRedirect() {
    cancelled.current = true;
    setSeconds(-1);
  }

  const firstName = name.trim().split(/\s+/)[0] || "Traveler";
  const waMessage = name && phone
    ? `Hi! I just submitted an inquiry. Name: ${name}, Phone: ${phone}. Looking forward to your call.`
    : "Hi! I just submitted an inquiry on your website.";

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at 20% 0%, #1a3a25 0%, var(--color-navy) 50%, #060f0a 100%)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--color-gold) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      {seconds > 0 && (
        <div className="relative z-10 bg-[var(--color-gold)]/10 border-b border-[var(--color-gold)]/30 backdrop-blur">
          <div className="max-w-[1100px] mx-auto px-5 sm:px-8 py-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-white/85 text-center">
            <span>
              Redirecting to home in{" "}
              <strong className="text-[var(--color-gold)] tabular-nums">
                {seconds}s
              </strong>
            </span>
            <span className="text-white/40 hidden sm:inline">·</span>
            <Link
              href="/"
              className="text-[var(--color-gold)] hover:text-[var(--color-gold-light)] underline underline-offset-2 font-semibold"
            >
              Go to home now
            </Link>
            <span className="text-white/40 hidden sm:inline">·</span>
            <button
              type="button"
              onClick={cancelRedirect}
              className="text-white/65 hover:text-white underline underline-offset-2"
            >
              Stay on this page
            </button>
          </div>
        </div>
      )}

      <main className="relative z-0 max-w-[760px] mx-auto px-5 sm:px-8 py-14 sm:py-20">
        <div className="text-center">
          <div
            className="w-24 h-24 mx-auto mb-6 rounded-full bg-[var(--color-gold)]/15 border-2 border-[var(--color-gold)] flex items-center justify-center text-[var(--color-gold)]"
            style={{ animation: "modalFadeIn 0.4s ease" }}
          >
            <CheckIcon width={48} height={48} />
          </div>

          <div className="text-[var(--color-gold)] text-xs uppercase tracking-[0.22em] font-[family-name:var(--font-cinzel)] font-medium mb-3">
            Inquiry Received
          </div>

          <h1 className="text-white text-4xl sm:text-5xl font-[family-name:var(--font-playfair)] font-bold leading-tight mb-4">
            Thank You, {firstName}!
          </h1>

          <p className="text-white/85 text-lg mb-2">
            Your inquiry has been submitted successfully.
          </p>
          {phone ? (
            <p className="text-white/70 text-base mb-8 leading-relaxed">
              Our travel expert will call you on{" "}
              <strong className="text-white whitespace-nowrap">+91 {phone}</strong>{" "}
              within the next <strong className="text-white">2 hours</strong> to craft
              your perfect Uttarakhand itinerary.
            </p>
          ) : (
            <p className="text-white/70 text-base mb-8 leading-relaxed">
              Our travel expert will reach out shortly to craft your perfect Uttarakhand
              itinerary.
            </p>
          )}
        </div>

        <div
          className="rounded-2xl border border-[rgba(201,146,42,0.3)] p-6 sm:p-8 mb-8"
          style={{
            background:
              "linear-gradient(180deg, rgba(11,34,24,0.85) 0%, rgba(6,15,10,0.95) 100%)",
            backdropFilter: "blur(8px)",
            boxShadow: "0 16px 48px rgba(0,0,0,0.35)",
          }}
        >
          <div className="prehad mb-3 text-center sm:text-left">What Happens Next</div>
          <ol className="space-y-4">
            {[
              {
                t: "We review your preferences",
                d: "Our travel expert studies your dates, group size, and special requirements within minutes.",
              },
              {
                t: "You receive a personalised quote on call",
                d: "Expect a callback within 2 hours with itinerary options, hotels, transfers, and pricing.",
              },
              {
                t: "We finalise the itinerary together",
                d: "Tweak hotels, add experiences, lock in dates — only confirm when you are 100% happy.",
              },
            ].map((step, i) => (
              <li key={step.t} className="flex items-start gap-4">
                <span
                  className="shrink-0 w-9 h-9 rounded-full bg-[var(--color-gold)]/15 border border-[var(--color-gold)]/50 text-[var(--color-gold)] flex items-center justify-center font-[family-name:var(--font-cinzel)] font-bold"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <div>
                  <div className="text-white font-semibold mb-0.5">{step.t}</div>
                  <p className="text-white/70 text-sm leading-relaxed">{step.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          <a
            href={waUrl(waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wa h-12"
          >
            <WhatsAppIcon width={18} height={18} />
            <span>WhatsApp Us for Faster Reply</span>
          </a>
          <Link href="/" className="btn-gold h-12 justify-center">
            Back to Home
          </Link>
        </div>

        <div className="text-center text-white/60 text-sm flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck width={14} height={14} className="text-[var(--color-gold)]" />
            Trusted by 50,000+ travelers
          </span>
          <span className="text-white/30 hidden sm:inline">·</span>
          <span>
            Need urgent help? Call{" "}
            <a
              href={`tel:${PHONE_TEL}`}
              className="text-[var(--color-gold)] hover:underline whitespace-nowrap"
            >
              {PHONE_DISPLAY}
            </a>
          </span>
        </div>
      </main>
    </div>
  );
}
