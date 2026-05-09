import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    // TODO: integrate email / CRM. For now, log server-side.
    console.log("[inquiry] new submission:", {
      name: data.fullName,
      phone: data.phone,
      email: data.email,
      package: data.packageName,
      date: data.travelDate,
      travelers: data.travelers,
      city: data.departureCity,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
