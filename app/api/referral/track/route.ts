// app/api/referral/track/route.ts
// Track referral events

import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { referral_code, event_type, contact_type } = body;

    if (!referral_code || !event_type) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const userAgent = req.headers.get("user-agent") || null;
    const referrer = req.headers.get("referer") || null;

    const forwardedFor = req.headers.get("x-forwarded-for");
    const ip = forwardedFor?.split(",")[0]?.trim() || null;
    const ipHash = ip ? Buffer.from(ip).toString("base64").slice(0, 16) : null;

    await supabaseServer.from("referral_events").insert({
      referral_code,
      event_type: contact_type ? `${event_type}_${contact_type}` : event_type,
      user_agent: userAgent,
      referrer,
      ip_hash: ipHash,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Referral track error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
