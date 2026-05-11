"use client";
import { useRef, useState, useEffect, FormEvent } from "react";
import CaptchaCanvas, { CaptchaHandle } from "./CaptchaCanvas";
import CustomSelect, { SelectOption } from "./CustomSelect";
import CustomDatePicker from "./CustomDatePicker";
import { PACKAGES } from "@/lib/packages";
import { waUrl } from "@/lib/whatsapp";
import { WhatsAppIcon, CheckIcon, ArrowRight, ShieldCheck } from "./Icons";

const INQUIRY_ENDPOINT =
  process.env.NEXT_PUBLIC_INQUIRY_ENDPOINT || "/api/inquiry";

type Props = {
  prefilledPackage?: string;
};

type FormState = {
  fullName: string;
  phone: string;
  email: string;
  travelDate: string;
  packageName: string;
  travelers: string;
  departureCity: string;
  notes: string;
  captcha: string;
};

const initial: FormState = {
  fullName: "",
  phone: "",
  email: "",
  travelDate: "",
  packageName: "",
  travelers: "",
  departureCity: "",
  notes: "",
  captcha: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const FieldLabel = ({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}) => (
  <label className="block text-[12px] font-semibold uppercase tracking-[0.08em] text-white/75 mb-1.5">
    {children}
    {required && <span className="text-[var(--color-gold)] ml-0.5">*</span>}
  </label>
);

const PACKAGE_OPTIONS: SelectOption[] = [
  ...PACKAGES.map((p) => ({ value: p.name, label: p.name, hint: p.duration })),
  {
    value: "Want a Customized Package",
    label: "Want a Customized Package",
    hint: "Tell us your preferences and we'll craft it",
  },
];

function ValidationToast({
  msgs,
  onClose,
}: {
  msgs: string[];
  onClose: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(onClose, 5000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div
      className="fixed z-[300] bottom-[72px] lg:bottom-6 left-3 right-3 sm:left-auto sm:right-4 sm:max-w-xs"
      role="alert"
      aria-live="assertive"
    >
      <div
        className="rounded-xl border border-red-500/40 shadow-2xl p-4"
        style={{ background: "rgba(30,8,8,0.97)", backdropFilter: "blur(8px)" }}
      >
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <span className="text-[13px] font-semibold text-[#ff8a85] flex items-center gap-1.5">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            Please fill in required fields
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Dismiss"
            className="shrink-0 text-white/40 hover:text-white/80 transition leading-none text-xl -mt-0.5"
          >
            ×
          </button>
        </div>
        <ul className="space-y-1.5">
          {msgs.map((msg, i) => (
            <li key={i} className="text-[12px] text-white/75 flex items-start gap-1.5">
              <span className="text-red-400 shrink-0 mt-0.5">•</span>
              {msg}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function InquiryForm({ prefilledPackage }: Props) {
  const [form, setForm] = useState<FormState>({
    ...initial,
    packageName: prefilledPackage ?? "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [toastMsgs, setToastMsgs] = useState<string[] | null>(null);
  const captchaRef = useRef<CaptchaHandle>(null);

  const today = new Date().toISOString().split("T")[0];

  function set<K extends keyof FormState>(key: K, val: FormState[K]) {
    setForm((f) => ({ ...f, [key]: val }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function setPhone(raw: string) {
    const digits = raw.replace(/\D/g, "").slice(0, 10);
    set("phone", digits);
  }

  function validateEmail(value: string): string | undefined {
    const v = value.trim();
    if (!v) return "Email address is required";
    if (!EMAIL_RE.test(v)) return "Enter a valid email (e.g. you@example.com)";
    return undefined;
  }

  function validatePhone(value: string): string | undefined {
    if (!/^\d{10}$/.test(value)) return "Enter a valid 10-digit mobile number";
    return undefined;
  }

  function validate(): boolean {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (form.fullName.trim().length < 2) e.fullName = "Full name is required";
    const phErr = validatePhone(form.phone);
    if (phErr) e.phone = phErr;
    const emErr = validateEmail(form.email);
    if (emErr) e.email = emErr;
    if (!form.travelDate) e.travelDate = "Travel date is required";
    if (!form.packageName) e.packageName = "Please select a package";
    const t = parseInt(form.travelers || "0", 10);
    if (!t || t < 1 || t > 50) e.travelers = "Number of travelers must be 1–50";
    if (!form.departureCity.trim()) e.departureCity = "Departure city is required";
    if (!captchaRef.current?.validate(form.captcha)) {
      e.captcha = "Captcha characters don't match — try again";
      captchaRef.current?.refresh();
      setForm((f) => ({ ...f, captcha: "" }));
    }
    setErrors(e);
    const msgs = Object.values(e).filter(Boolean) as string[];
    if (msgs.length > 0) setToastMsgs(msgs);
    return msgs.length === 0;
  }

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    setServerError(null);
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await fetch(INQUIRY_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Bad response");
      try {
        sessionStorage.setItem(
          "inquirySuccess",
          JSON.stringify({ name: form.fullName, phone: form.phone })
        );
      } catch {}
      window.location.href = "/thank-you/";
    } catch {
      setServerError("Something went wrong. Please WhatsApp us directly.");
      setSubmitting(false);
    }
  }

  return (
    <>
      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <FieldLabel required>Full Name</FieldLabel>
            <input
              className={`form-input ${errors.fullName ? "error" : ""}`}
              placeholder="e.g. Aviral Sharma"
              value={form.fullName}
              onChange={(e) => set("fullName", e.target.value)}
              required
            />
          </div>
          <div>
            <FieldLabel required>Mobile Number</FieldLabel>
            <input
              className={`form-input ${errors.phone ? "error" : ""}`}
              placeholder="10-digit mobile"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              maxLength={10}
              pattern="\d{10}"
              value={form.phone}
              onChange={(e) => setPhone(e.target.value)}
              onBlur={() => {
                if (form.phone) {
                  const err = validatePhone(form.phone);
                  if (err) setErrors((s) => ({ ...s, phone: err }));
                }
              }}
              required
            />
          </div>
          <div>
            <FieldLabel required>Email Address</FieldLabel>
            <input
              className={`form-input ${errors.email ? "error" : ""}`}
              placeholder="you@example.com"
              type="email"
              autoComplete="email"
              inputMode="email"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              onBlur={() => {
                if (form.email) {
                  const err = validateEmail(form.email);
                  if (err) setErrors((s) => ({ ...s, email: err }));
                }
              }}
              required
            />
          </div>
          <div>
            <FieldLabel required>Travel Date</FieldLabel>
            <CustomDatePicker
              value={form.travelDate}
              onChange={(v) => set("travelDate", v)}
              min={today}
              error={!!errors.travelDate}
            />
          </div>
          <div>
            <FieldLabel required>Number of Travelers</FieldLabel>
            <input
              className={`form-input ${errors.travelers ? "error" : ""}`}
              type="number"
              min={1}
              max={50}
              placeholder="e.g. 4"
              value={form.travelers}
              onChange={(e) => set("travelers", e.target.value)}
              required
            />
          </div>
          <div>
            <FieldLabel required>Departure City</FieldLabel>
            <input
              className={`form-input ${errors.departureCity ? "error" : ""}`}
              placeholder="e.g. Mumbai, Delhi"
              value={form.departureCity}
              onChange={(e) => set("departureCity", e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <FieldLabel required>Select Package</FieldLabel>
          <CustomSelect
            value={form.packageName}
            onChange={(v) => set("packageName", v)}
            options={PACKAGE_OPTIONS}
            placeholder="— Choose a package —"
            error={!!errors.packageName}
            ariaLabel="Select tour package"
          />
        </div>

        <div>
          <FieldLabel>Special Requirements</FieldLabel>
          <textarea
            className="form-input"
            placeholder="Any preferences? Dietary needs, accessibility, special occasions..."
            rows={3}
            value={form.notes}
            onChange={(e) => set("notes", e.target.value)}
          />
        </div>

        <div className="rounded-lg border border-[rgba(201,146,42,0.25)] bg-[rgba(255,255,255,0.03)] p-4">
          <div className="text-[12px] font-semibold uppercase tracking-[0.08em] text-white/75 mb-2.5 flex items-center gap-2">
            <ShieldCheck width={14} height={14} className="text-[var(--color-gold)]" />
            Verify you&apos;re human
          </div>
          <div className="flex flex-col sm:flex-row sm:items-stretch gap-3">
            <CaptchaCanvas ref={captchaRef} />
            <div className="flex-1 min-w-0">
              <input
                className={`form-input h-full ${errors.captcha ? "error" : ""}`}
                placeholder="Type the characters you see"
                autoComplete="off"
                value={form.captcha}
                onChange={(e) => set("captcha", e.target.value)}
                required
              />
            </div>
          </div>
          <p className="text-[11px] text-white/55 mt-2">
            Case-insensitive. Click the refresh icon for a new code.
          </p>
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-2 text-[12px] text-white/75 pt-1">
          <span className="inline-flex items-center gap-1.5"><CheckIcon width={12} height={12} className="text-[var(--color-gold)]" /> 100% Secure</span>
          <span className="inline-flex items-center gap-1.5"><CheckIcon width={12} height={12} className="text-[var(--color-gold)]" /> No Hidden Charges</span>
          <span className="inline-flex items-center gap-1.5"><CheckIcon width={12} height={12} className="text-[var(--color-gold)]" /> Tailored Itineraries</span>
        </div>

        {serverError && (
          <div className="text-[#ff8a85] text-sm bg-red-900/20 border border-red-500/30 rounded p-3">
            {serverError}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 pt-1">
          <button type="submit" disabled={submitting} className="btn-gold w-full disabled:opacity-60 h-12">
            {submitting ? "Submitting..." : (<><span>Submit Inquiry</span> <ArrowRight width={16} height={16} /></>)}
          </button>
          <a
            href={waUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wa h-12"
          >
            <WhatsAppIcon width={18} height={18} /> <span className="sm:hidden">WhatsApp Us</span><span className="hidden sm:inline">WhatsApp</span>
          </a>
        </div>
      </form>

      {toastMsgs && (
        <ValidationToast msgs={toastMsgs} onClose={() => setToastMsgs(null)} />
      )}
    </>
  );
}
