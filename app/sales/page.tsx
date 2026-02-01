import { cookies } from "next/headers";
import { Metadata } from "next";
import { supabaseServer } from "@/lib/supabase";
import { fetchSalespersonRankings } from "@/lib/googleSheets";
import SalesPageClient from "./SalesPageClient";

export const metadata: Metadata = {
  title: "Sales Dashboard | Gallatin CDJR",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get("sales_session");
  
  if (session?.value) {
    try {
      const sessionData = JSON.parse(Buffer.from(session.value, "base64").toString());
      
      if (Date.now() - sessionData.timestamp > 24 * 60 * 60 * 1000) {
        return { authenticated: false };
      }
      
      return { 
        authenticated: true, 
        user: {
          name: sessionData.name,
          email: sessionData.email,
          slug: sessionData.slug,
        }
      };
    } catch {
      return { authenticated: false };
    }
  }
  return { authenticated: false };
}

async function getMyScoreboard(slug: string) {
  const { data } = await supabaseServer
    .from("review_scoreboard")
    .select("slug, display_name, page_views, cta_clicks, contact_saves, referrals_shared")
    .eq("slug", slug)
    .single();
  
  return data;
}

export default async function SalesPage() {
  const authResult = await checkAuth();
  
  const rankings = await fetchSalespersonRankings();
  
  let myScoreboard = null;
  if (authResult.authenticated && authResult.user?.slug) {
    myScoreboard = await getMyScoreboard(authResult.user.slug);
  }

  return (
    <SalesPageClient
      isAuthenticated={authResult.authenticated}
      user={authResult.user}
      rankings={rankings}
      myScoreboard={myScoreboard}
    />
  );
}
