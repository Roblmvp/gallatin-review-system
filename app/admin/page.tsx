// app/admin/page.tsx
// Admin dashboard for viewing scoreboard stats

import { supabaseServer } from "@/lib/supabase";
import { fetchSalespersonRankings, fetchDeliveryStats } from "@/lib/googleSheets";
import { cookies } from "next/headers";
import { Metadata } from "next";
import AdminPageWrapper from "./AdminPageWrapper";

export const metadata: Metadata = {
  title: "Admin Dashboard | Gallatin CDJR",
  robots: { index: false, follow: false },
};

// Force dynamic rendering to get fresh data
export const dynamic = "force-dynamic";
export const revalidate = 0;

async function checkAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  return !!session?.value;
}

async function getScoreboardData() {
  const { data: scoreboard } = await supabaseServer
    .from("review_scoreboard")
    .select("*");

  return scoreboard || [];
}

async function getReferralData() {
  const { data: referrals } = await supabaseServer
    .from("referrals")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);

  return referrals || [];
}

async function getRecentEvents() {
  const { data: events } = await supabaseServer
    .from("review_events")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  return events || [];
}

export default async function AdminPage() {
  const isAuthenticated = await checkAuth();

  const [scoreboard, referrals, recentEvents, salespersonRankings, trackingStats] = await Promise.all([
    getScoreboardData(),
    getReferralData(),
    getRecentEvents(),
    fetchSalespersonRankings(),
    fetchDeliveryStats(),
  ]);

  // Calculate totals
  const totals = scoreboard.reduce(
    (acc, row) => ({
      pageViews: acc.pageViews + (row.page_views || 0),
      ctaClicks: acc.ctaClicks + (row.cta_clicks || 0),
      facebookClicks: acc.facebookClicks + (row.facebook_clicks || 0),
      instagramClicks: acc.instagramClicks + (row.instagram_clicks || 0),
      tiktokClicks: acc.tiktokClicks + (row.tiktok_clicks || 0),
      contactSaves: acc.contactSaves + (row.contact_saves || 0),
      serviceClicks: acc.serviceClicks + (row.service_clicks || 0),
      referralsShared: acc.referralsShared + (row.referrals_shared || 0),
      calendarDownloads: acc.calendarDownloads + (row.calendar_downloads || 0),
    }),
    {
      pageViews: 0,
      ctaClicks: 0,
      facebookClicks: 0,
      instagramClicks: 0,
      tiktokClicks: 0,
      contactSaves: 0,
      serviceClicks: 0,
      referralsShared: 0,
      calendarDownloads: 0,
    }
  );

  return (
    <AdminPageWrapper
      scoreboard={scoreboard}
      referrals={referrals}
      recentEvents={recentEvents}
      totals={totals}
      salespersonRankings={salespersonRankings}
      trackingStats={trackingStats}
      isAuthenticated={isAuthenticated}
    />
  );
}
