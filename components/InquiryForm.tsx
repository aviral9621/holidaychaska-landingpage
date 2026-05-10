"use client";
import { useRef, useState, FormEvent } from "react";
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

export default function InquiryForm({ prefilledPackage }: Props) {
  const [form, setForm] = useState<FormState>({
    ...initial,
    packageName: prefilledPackage ?? "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
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
    if (!v) return "Enter your email address";
    if (!EMAIL_RE.test(v)) return "Enter a valid email address (e.g. you@example.com)";
    return undefined;
  }

  function validatePhone(value: string): string | undefined {
    if (!/^\d{10}$/.test(value)) return "Enter a valid 10-digit mobile number";
    return undefined;
  }

  function validate(): boolean {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (form.fullName.trim().length < 2) e.fullName = "Please enter your full name";
    const phErr = validatePhone(form.phone);
    if (phErr) e.phone = phErr;
    const emErr = validateEmail(form.email);
    if (emErr) e.email = emErr;
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
      const res = await fetch(INQUIRY_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Bad response");
      const params = new URLSearchParams({
        name: form.fullName,
        phone: form.phone,
      });
      window.location.href = `/thank-you/?${params.toString()}`;
    } catch {
      setServerError("Something went wrong. Please WhatsApp us directly.");
      setSubmitting(false);
    }
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
          {errors.phone && <span className="field-error">{errors.phone}</span>}
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
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>
        <div>
          <FieldLabel required>Travel Date</FieldLabel>
          <CustomDatePicker
            value={form.travelDate}
            onChange={(v) => set("travelDate", v)}
            min={today}
            error={!!errors.travelDate}
          />
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
        <CustomSelect
          value={form.packageName}
          onChange={(v) => set("packageName", v)}
          options={PACKAGE_OPTIONS}
          placeholder="— Choose a package —"
          error={!!errors.packageName}
          ariaLabel="Select tour package"
        />
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
