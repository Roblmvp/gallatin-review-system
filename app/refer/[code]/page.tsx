// app/refer/[code]/page.tsx
// Referral landing page - when friend clicks the referral link

import { supabaseServer } from "@/lib/supabase";
import { getBaseUrl } from "@/lib/getBaseUrl";
import { Metadata } from "next";
import ReferralPageClient from "./ReferralPageClient";

type Props = {
  params: { code: string };
};

async function getReferral(code: string) {
  const { data } = await supabaseServer
    .from("referrals")
    .select(`
      *,
      salesperson:salespeople(*)
    `)
    .eq("referral_code", code)
    .eq("is_active", true)
    .single();

  return data;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const baseUrl = getBaseUrl();
  const referral = await getReferral(params.code);
  const sp = referral?.salesperson;
  const referrerName = referral?.referrer_name || "Your friend";

  const title = sp
    ? `${referrerName} Recommends ${sp.display_name} | Gallatin CDJR`
    : `You've Been Referred to Gallatin CDJR`;

  const description = sp
    ? `${referrerName} had a great experience with ${sp.display_name} at Gallatin CDJR and thought you should check them out!`
    : `You've been referred to Gallatin CDJR by a friend!`;

  const ogImage = process.env.NEXT_PUBLIC_OG_IMAGE_URL || `${baseUrl}/og-default.jpg`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${baseUrl}/refer/${params.code}`,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      type: "website",
      siteName: "Gallatin CDJR",
    },
  };
}

export default async function ReferralPage({ params }: Props) {
  const referral = await getReferral(params.code);
  const sp = referral?.salesperson;

  const referrerName = referral?.referrer_name || "Your friend";
  const salespersonName = sp?.display_name || "our team";
  const salespersonPhone = sp?.phone || null;
  const salespersonEmail = sp?.email || null;
  const salespersonTitle = sp?.title || null;
  const salespersonSlug = sp?.slug || null;

  return (
    <ReferralPageClient
      referralCode={params.code}
      referrerName={referrerName}
      salespersonName={salespersonName}
      salespersonPhone={salespersonPhone}
      salespersonEmail={salespersonEmail}
      salespersonTitle={salespersonTitle}
      salespersonSlug={salespersonSlug}
    />
  );
}
