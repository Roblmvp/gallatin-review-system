// app/api/referral/create/route.ts
// Create a shareable referral link

import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";

function generateReferralCode(length = 8): string {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { slug, referrer_name, referrer_phone, referrer_email } = body;

    if (!slug) {
      return NextResponse.json(
        { error: "Salesperson slug is required" },
        { status: 400 }
      );
    }

    // Get salesperson
    const { data: sp, error: spError } = await supabaseServer
      .from("salespeople")
      .select("id, display_name")
      .eq("slug", slug)
      .eq("is_active", true)
      .single();

    if (spError || !sp) {
      return NextResponse.json(
        { error: "Salesperson not found" },
        { status: 404 }
      );
    }

    // Generate unique referral code
    let referralCode: string;
    let attempts = 0;

    do {
      referralCode = generateReferralCode();
      const { data: existing } = await supabaseServer
        .from("referrals")
        .select("referral_code")
        .eq("referral_code", referralCode)
        .single();

      if (!existing) break;
      attempts++;
    } while (attempts < 10);

    if (attempts >= 10) {
      return NextResponse.json(
        { error: "Could not generate unique code" },
        { status: 500 }
      );
    }

    // Create referral record
    const { data: referral, error: insertError } = await supabaseServer
      .from("referrals")
      .insert({
        referral_code: referralCode,
        referrer_name: referrer_name || null,
        referrer_phone: referrer_phone || null,
        referrer_email: referrer_email || null,
        salesperson_id: sp.id,
        salesperson_slug: slug,
      })
      .select()
      .single();

    if (insertError) {
      console.error("Referral insert error:", insertError);
      return NextResponse.json(
        { error: "Failed to create referral" },
        { status: 500 }
      );
    }

    const referralUrl = `https://gallatincdjr.reviews/refer/${referralCode}`;

    return NextResponse.json({
      ok: true,
      data: {
        referral_code: referralCode,
        referral_url: referralUrl,
        salesperson: sp.display_name,
        share_text: `I had a great experience with ${sp.display_name} at Gallatin CDJR! Check them out: ${referralUrl}`,
      },
    });
  } catch (err) {
    console.error("Referral API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
