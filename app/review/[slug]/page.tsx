// app/review/[slug]/page.tsx
// Salesperson-based review landing page with OG previews and tracking

import { supabaseServer } from "@/lib/supabase";
import { getBaseUrl } from "@/lib/getBaseUrl";
import { Metadata } from "next";
import ReviewPageClient from "./ReviewPageClient";

type Props = {
  params: { slug: string };
  searchParams?: Record<string, string>;
};

// Fetch the salesperson by slug
async function getSalesperson(slug: string) {
  const { data } = await supabaseServer
    .from("salespeople")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  return data;
}

// Generate OG metadata for rich link previews
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const baseUrl = getBaseUrl();
  const sp = await getSalesperson(params.slug);

  const title = sp
    ? `Share Your ${sp.display_name} Experience | Gallatin CDJR`
    : `Share Your Gallatin CDJR Experience`;

  const description = sp
    ? `Tap to leave a quick Google review for ${sp.display_name} at Gallatin CDJR.`
    : `Tap to leave a quick Google review for Gallatin CDJR.`;

  // OG image - use env variable or default
  const ogImage = process.env.NEXT_PUBLIC_OG_IMAGE_URL || `${baseUrl}/og-default.jpg`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${baseUrl}/review/${params.slug}`,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      type: "website",
      siteName: "Gallatin CDJR",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function ReviewPage({ params, searchParams }: Props) {
  const sp = await getSalesperson(params.slug);

  // Extract UTM params for tracking
  const utm = {
    source: searchParams?.utm_source || "",
    medium: searchParams?.utm_medium || "",
    campaign: searchParams?.utm_campaign || "",
  };

  // Fallback values for invalid slugs
  const displayName = sp?.display_name || "our team";
  const phone = sp?.phone || null;
  const salespersonId = sp?.id || null;

  const googleReviewUrl = process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL!;

  return (
    <ReviewPageClient
      slug={params.slug}
      displayName={displayName}
      phone={phone}
      salespersonId={salespersonId}
      googleReviewUrl={googleReviewUrl}
      utm={utm}
    />
  );
}
