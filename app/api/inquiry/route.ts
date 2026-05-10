import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Payload = {
  fullName?: string;
  phone?: string;
  email?: string;
  travelDate?: string;
  packageName?: string;
  travelers?: string;
  departureCity?: string;
  notes?: string;
  website?: string;
};

function clean(v: unknown): string {
  return typeof v === "string" ? v.trim().replace(/<[^>]*>/g, "") : "";
}

function validate(d: Payload) {
  const errs: string[] = [];
  const fullName = clean(d.fullName);
  const phone = clean(d.phone);
  const email = clean(d.email);
  const travelDate = clean(d.travelDate);
  const packageName = clean(d.packageName);
  const travelers = clean(d.travelers);
  const departureCity = clean(d.departureCity);
  const notes = clean(d.notes);

  if (fullName.length < 2) errs.push("Name");
  if (!/^\d{10}$/.test(phone)) errs.push("Mobile");
  if (!EMAIL_RE.test(email)) errs.push("Email");
  if (!travelDate) errs.push("Travel Date");
  if (!packageName) errs.push("Package");
  const t = parseInt(travelers, 10);
  if (!Number.isFinite(t) || t < 1 || t > 50) errs.push("Travelers");
  if (!departureCity) errs.push("Departure City");

  return {
    errs,
    cleaned: {
      fullName,
      phone,
      email,
      travelDate,
      packageName,
      travelers,
      departureCity,
      notes,
    },
  };
}

async function sendEmail(c: {
  fullName: string;
  phone: string;
  email: string;
  travelDate: string;
  packageName: string;
  travelers: string;
  departureCity: string;
  notes: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.INQUIRY_TO_EMAIL;
  const from = process.env.INQUIRY_FROM_EMAIL;
  if (!apiKey || !to || !from) return { sent: false, reason: "not-configured" };

  const subject = `[Gujarat Tour Packages] Inquiry from ${c.fullName} — ${c.packageName}`;
  const text = [
    "New inquiry from Gujarat Tour Packages website",
    "=".repeat(56),
    "",
    `Name           : ${c.fullName}`,
    `Mobile         : +91-${c.phone}`,
    `Email          : ${c.email}`,
    `Travel Date    : ${c.travelDate}`,
    `Package        : ${c.packageName}`,
    `No. Travelers  : ${c.travelers}`,
    `Departure City : ${c.departureCity}`,
    ...(c.notes ? ["", "Special Requirements:", c.notes] : []),
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: c.email,
      subject,
      text,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    return { sent: false, reason: `resend ${res.status} ${detail}` };
  }
  return { sent: true };
}

export async function POST(request: Request) {
  let data: Payload;
  try {
    data = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (clean(data.website)) {
    return NextResponse.json({ ok: true });
  }

  const { errs, cleaned } = validate(data);
  if (errs.length) {
    return NextResponse.json(
      { ok: false, error: `Invalid: ${errs.join(", ")}` },
      { status: 400 }
    );
  }

  console.log("[inquiry]", JSON.stringify(cleaned));

  try {
    const result = await sendEmail(cleaned);
    if (!result.sent) {
      console.warn("[inquiry] email not sent:", result.reason);
    }
  } catch (e) {
    console.error("[inquiry] email error:", e);
  }

  return NextResponse.json({ ok: true });
}
