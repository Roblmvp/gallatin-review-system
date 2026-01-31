// app/api/track/route.ts
// API endpoint for logging page views and CTA clicks

import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { event_type, slug, salesperson_id, utm } = body || {};

    // Validate required fields
    if (!event_type || !slug) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate event type
    if (!["page_view", "cta_click"].includes(event_type)) {
      return NextResponse.json(
        { ok: false, error: "Invalid event type" },
        { status: 400 }
      );
    }

    // Extract headers for context
    const userAgent = req.headers.get("user-agent") || null;
    const referrer = req.headers.get("referer") || null;

    // Privacy-safe IP hash (optional)
    const forwardedFor = req.headers.get("x-forwarded-for");
    const ip = forwardedFor?.split(",")[0]?.trim() || null;
    const ipHash = ip ? Buffer.from(ip).toString("base64").slice(0, 16) : null;

    // Insert the event
    const { error } = await supabaseServer.from("review_events").insert({
      event_type,
      slug,
      salesperson_id: salesperson_id || null,
      user_agent: userAgent,
      referrer,
      ip_hash: ipHash,
      utm_source: utm?.source || null,
      utm_medium: utm?.medium || null,
      utm_campaign: utm?.campaign || null,
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { ok: false, error: "Database error" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Track API error:", err);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
}

// Optionally handle GET requests with a simple response
export async function GET() {
  return NextResponse.json({ status: "Track endpoint active" });
}
