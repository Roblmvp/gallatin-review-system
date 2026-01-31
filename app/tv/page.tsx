// app/tv/page.tsx
// Live TV Display for Sales Floor - Salesperson Leaderboard

import { fetchSalespersonRankings, fetchDeliveryStats } from "@/lib/googleSheets";
import { Metadata } from "next";
import TVDisplayClient from "./TVDisplayClient";

export const metadata: Metadata = {
  title: "Sales Leaderboard | Gallatin CDJR",
  robots: { index: false, follow: false },
};

// Force dynamic rendering and no caching for live updates
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function TVPage() {
  const [salespersonRankings, deliveryStats] = await Promise.all([
    fetchSalespersonRankings(),
    fetchDeliveryStats(),
  ]);

  return (
    <TVDisplayClient 
      salespersonRankings={salespersonRankings} 
      deliveryStats={deliveryStats}
    />
  );
}
