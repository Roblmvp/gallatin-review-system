// app/api/links/route.ts
// API endpoint for creating new review links (for CRM integration)

import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";
import { getBaseUrl } from "@/lib/getBaseUrl";

// Generate a short, URL-safe token
function generateToken(length = 8): string {
  const chars = "abcdefghjkmnpqrstuvwxyz23456789"; // no confusing chars
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      salesperson_slug,
      customer_first_name,
      deal_id,
      ro_number,
    } = body || {};

    // Validate required field
    if (!salesperson_slug) {
      return NextResponse.json(
        { ok: false, error: "salesperson_slug is required" },
        { status: 400 }
      );
    }

    // Look up salesperson
    const { data: salesperson, error: spError } = await supabaseServer
      .from("salespeople")
      .select("id, display_name")
      .eq("slug", salesperson_slug)
      .eq("is_active", true)
      .single();

    if (spError || !salesperson) {
      return NextResponse.json(
        { ok: false, error: `Salesperson "${salesperson_slug}" not found` },
        { status: 404 }
      );
    }

    // Generate unique token
    let token: string;
    let attempts = 0;
    const maxAttempts = 10;

    do {
      token = generateToken(8);
      const { data: existing } = await supabaseServer
        .from("review_links")
        .select("token")
        .eq("token", token)
        .single();

      if (!existing) break;
      attempts++;
    } while (attempts < maxAttempts);

    if (attempts >= maxAttempts) {
      return NextResponse.json(
        { ok: false, error: "Could not generate unique token" },
        { status: 500 }
      );
    }

    // Create the link
    const { data: link, error: insertError } = await supabaseServer
      .from("review_links")
      .insert({
        token,
        salesperson_id: salesperson.id,
        customer_first_name: customer_first_name || null,
        deal_id: deal_id || null,
        ro_number: ro_number || null,
      })
      .select()
      .single();

    if (insertError) {
      console.error("Insert error:", insertError);
      return NextResponse.json(
        { ok: false, error: "Failed to create link" },
        { status: 500 }
      );
    }

    const baseUrl = getBaseUrl();
    const fullUrl = `${baseUrl}/review/${token}`;

    return NextResponse.json({
      ok: true,
      data: {
        token,
        url: fullUrl,
        salesperson: {
          slug: salesperson_slug,
          name: salesperson.display_name,
        },
        customer_first_name: customer_first_name || null,
        deal_id: deal_id || null,
        ro_number: ro_number || null,
        created_at: link.created_at,
      },
    });
  } catch (err) {
    console.error("Links API error:", err);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
}

// GET - List recent links (useful for debugging/admin)
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const limit = parseInt(url.searchParams.get("limit") || "20", 10);
    const slug = url.searchParams.get("salesperson");

    let query = supabaseServer
      .from("review_links")
      .select(`
        token,
        customer_first_name,
        deal_id,
        ro_number,
        created_at,
        salesperson:salespeople(slug, display_name)
      `)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (slug) {
      const { data: sp } = await supabaseServer
        .from("salespeople")
        .select("id")
        .eq("slug", slug)
        .single();
      
      if (sp) {
        query = query.eq("salesperson_id", sp.id);
      }
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json(
        { ok: false, error: "Database error" },
        { status: 500 }
      );
    }

    const baseUrl = getBaseUrl();
    const links = data?.map((link) => ({
      ...link,
      url: `${baseUrl}/review/${link.token}`,
    }));

    return NextResponse.json({ ok: true, data: links });
  } catch (err) {
    console.error("Links GET error:", err);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
}
