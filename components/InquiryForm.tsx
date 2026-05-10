"use client";
import { useRef, useState, FormEvent } from "react";
import CaptchaCanvas, { CaptchaHandle } from "./CaptchaCanvas";
import { PACKAGES } from "@/lib/packages";
import { waUrl } from "@/lib/whatsapp";
import { WhatsAppIcon, CheckIcon, ArrowRight, ShieldCheck } from "./Icons";

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

const FieldLabel = ({ children, required }: { children: React.ReactNode; required?: boolean }) => (
  <label className="block text-[12px] font-semibold uppercase tracking-[0.08em] text-white/75 mb-1.5">
    {children}
    {required && <span className="text-[var(--color-gold)] ml-0.5">*</span>}
  </label>
);

export default function InquiryForm({ prefilledPackage }: Props) {
  const [form, setForm] = useState<FormState>({ ...initial, packageName: prefilledPackage ?? "" });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const captchaRef = useRef<CaptchaHandle>(null);

  const today = new Date().toISOString().split("T")[0];

  function set<K extends keyof FormState>(key: K, val: FormState[K]) {
    setForm((f) => ({ ...f, [key]: val }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): boolean {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (form.fullName.trim().length < 2) e.fullName = "Please enter your full name";
    if (!/^\d{10}$/.test(form.phone.replace(/\D/g, ""))) e.phone = "Enter a 10-digit phone number";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.travelDate) e.travelDate = "Pick a travel date";
    if (!form.packageName) e.packageName = "Select a package";
    const t = parseInt(form.travelers || "0", 10);
    if (!t || t < 1 || t > 50) e.travelers = "Enter 1–50 travelers";
    if (!form.departureCity.trim()) e.departureCity = "Enter departure city";
    if (!captchaRef.current?.validate(form.captcha)) {
      e.captcha = "Characters don't match — please try again";
      captchaRef.current?.refresh();
      setForm((f) => ({ ...f, captcha: "" }));
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    setServerError(null);
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Bad response");
      setSuccess(true);
    } catch {
      setServerError("Something went wrong. Please WhatsApp us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="text-center py-8 px-4">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-gold)]/15 border-2 border-[var(--color-gold)] flex items-center justify-center text-[var(--color-gold)]">
          <CheckIcon width={32} height={32} />
        </div>
        <h3 className="text-white text-2xl font-[family-name:var(--font-playfair)] font-bold mb-2">
          Thank you, {form.fullName}!
        </h3>
        <p className="text-white/85 mb-1">Your inquiry has been received.</p>
        <p className="text-white/70 text-sm mb-6">
          Our travel expert will call you at <strong className="text-white">{form.phone}</strong> within 2 hours.
        </p>
        <a
          href={waUrl(`Hi! I just submitted an inquiry. Name: ${form.fullName}, Phone: ${form.phone}`)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-wa inline-flex"
        >
          <WhatsAppIcon width={18} height={18} /> WhatsApp Us for Faster Reply
        </a>
      </div>
    );
  }

  return (
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
          {errors.fullName && <span className="field-error">{errors.fullName}</span>}
        </div>
        <div>
          <FieldLabel required>Mobile Number</FieldLabel>
          <input
            className={`form-input ${errors.phone ? "error" : ""}`}
            placeholder="10-digit mobile"
            type="tel"
            inputMode="numeric"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            required
          />
          {errors.phone && <span className="field-error">{errors.phone}</span>}
        </div>
        <div>
          <FieldLabel required>Email Address</FieldLabel>
          <input
            className={`form-input ${errors.email ? "error" : ""}`}
            placeholder="you@example.com"
            type="email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            required
          />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>
        <div>
          <FieldLabel required>Travel Date</FieldLabel>
          <div className="form-date-wrap">
            <input
              className={`form-input form-date ${errors.travelDate ? "error" : ""}`}
              type="date"
              min={today}
              value={form.travelDate}
              onChange={(e) => set("travelDate", e.target.value)}
              required
            />
            <svg className="form-date-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          {errors.travelDate && <span className="field-error">{errors.travelDate}</span>}
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
          {errors.travelers && <span className="field-error">{errors.travelers}</span>}
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
          {errors.departureCity && <span className="field-error">{errors.departureCity}</span>}
        </div>
      </div>

      <div>
        <FieldLabel required>Select Package</FieldLabel>
        <div className="form-select-wrap">
          <select
            className={`form-input form-select ${errors.packageName ? "error" : ""}`}
            value={form.packageName}
            onChange={(e) => set("packageName", e.target.value)}
            required
          >
            <option value="" style={{ color: "#000" }}>— Choose a package —</option>
            {PACKAGES.map((p) => (
              <option key={p.id} value={p.name} style={{ color: "#000" }}>
                {p.name}
              </option>
            ))}
            <option value="Not decided yet" style={{ color: "#000" }}>Not decided yet</option>
          </select>
          <svg className="form-select-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
        {errors.packageName && <span className="field-error">{errors.packageName}</span>}
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
        <div className="flex items-center justify-between gap-3 mb-3">
          <CaptchaCanvas ref={captchaRef} />
        </div>
        <input
          className={`form-input ${errors.captcha ? "error" : ""}`}
          placeholder="Type the characters you see above"
          autoComplete="off"
          value={form.captcha}
          onChange={(e) => set("captcha", e.target.value)}
          required
        />
        {errors.captcha && <span className="field-error">{errors.captcha}</span>}
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
  );
}
