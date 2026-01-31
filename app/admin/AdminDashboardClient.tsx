"use client";

import { useState } from "react";

type ScoreboardRow = {
  slug: string;
  display_name: string;
  title: string;
  email: string;
  review_link: string;
  page_views: number;
  cta_clicks: number;
  facebook_clicks: number;
  instagram_clicks: number;
  tiktok_clicks: number;
  contact_saves: number;
  service_clicks: number;
  referrals_shared: number;
  calendar_downloads: number;
};

type Referral = {
  id: string;
  referral_code: string;
  referrer_name: string;
  salesperson_slug: string;
  created_at: string;
};

type RecentEvent = {
  id: string;
  event_type: string;
  slug: string;
  created_at: string;
};

type Totals = {
  pageViews: number;
  ctaClicks: number;
  facebookClicks: number;
  instagramClicks: number;
  tiktokClicks: number;
  contactSaves: number;
  serviceClicks: number;
  referralsShared: number;
  calendarDownloads: number;
};

type SalespersonRanking = {
  salesperson: string;
  units_sold: number;
  total_activity: number;
  closing_pct: number;
  google_reviews: number;
  total_score: number;
  rank: number;
};

type TrackingStats = {
  todaysDeliveries: number;
  todaysDeals: Array<{
    customerName: string;
    salesperson: string;
    vehicle: string;
    newUsed: string;
  }>;
  daysWorked: number;
  totalWorkingDays: number;
  newUnitObjective: number;
  usedUnitObjective: number;
  totalUnitObjective: number;
  newGrossObjective: string;
  usedGrossObjective: string;
  totalGrossObjective: string;
  mtdNewUnits: number;
  mtdUsedUnits: number;
  mtdTotalUnits: number;
  mtdNewGross: string;
  mtdUsedGross: string;
  mtdTotalGross: string;
  newUnitPacing: number;
  usedUnitPacing: number;
  totalUnitPacing: number;
  newGrossPacing: string;
  usedGrossPacing: string;
  totalGrossPacing: string;
  dailyCalls: number;
  dailyEmails: number;
  dailyTexts: number;
  dailyVideos: number;
  dailyTotalActivity: number;
};

type Props = {
  scoreboard: ScoreboardRow[];
  referrals: Referral[];
  recentEvents: RecentEvent[];
  totals: Totals;
  salespersonRankings: SalespersonRanking[];
  trackingStats: TrackingStats;
  onLogout?: () => void;
  userName?: string;
};

export default function AdminDashboardClient({
  scoreboard,
  referrals,
  recentEvents,
  totals,
  salespersonRankings,
  trackingStats,
  onLogout,
  userName,
}: Props) {
  const [activeTab, setActiveTab] = useState<"mtd" | "sotm" | "scoreboard" | "referrals" | "activity">("mtd");

  const conversionRate = totals.pageViews > 0 
    ? ((totals.ctaClicks / totals.pageViews) * 100).toFixed(1) 
    : "0";

  // Get the leader from rankings
  const leader = salespersonRankings.length > 0 
    ? salespersonRankings.sort((a, b) => a.rank - b.rank)[0] 
    : null;

  // Calculate progress percentages
  const newProgress = trackingStats.newUnitObjective > 0 
    ? Math.round((trackingStats.mtdNewUnits / trackingStats.newUnitObjective) * 100) : 0;
  const usedProgress = trackingStats.usedUnitObjective > 0 
    ? Math.round((trackingStats.mtdUsedUnits / trackingStats.usedUnitObjective) * 100) : 0;
  const totalProgress = trackingStats.totalUnitObjective > 0 
    ? Math.round((trackingStats.mtdTotalUnits / trackingStats.totalUnitObjective) * 100) : 0;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0f172a", color: "#fff" }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
        padding: "24px 20px",
        borderBottom: "1px solid #334155"
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>📊 Admin Dashboard</h1>
              <p style={{ fontSize: 14, color: "#94a3b8", margin: "4px 0 0 0" }}>
                {userName ? `Welcome, ${userName}` : "Gallatin CDJR Review System"}
              </p>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <a 
                href="/tv"
                target="_blank"
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#8b5cf6",
                  color: "#fff",
                  borderRadius: 8,
                  textDecoration: "none",
                  fontSize: 14,
                  fontWeight: 600
                }}
              >
                📺 TV Display
              </a>
              <a 
                href="https://docs.google.com/spreadsheets/d/1rqIYaIWK-rqxCwULE4IPibrLAcn8p9hRX_abJn8lR84/edit"
                target="_blank"
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#22c55e",
                  color: "#fff",
                  borderRadius: 8,
                  textDecoration: "none",
                  fontSize: 14,
                  fontWeight: 600
                }}
              >
                📝 Edit Rankings
              </a>
              <a 
                href="/review/robert" 
                target="_blank"
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#dc2626",
                  color: "#fff",
                  borderRadius: 8,
                  textDecoration: "none",
                  fontSize: 14,
                  fontWeight: 600
                }}
              >
                View Live Page →
              </a>
              {onLogout && (
                <button
                  onClick={onLogout}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#334155",
                    color: "#fff",
                    borderRadius: 8,
                    border: "none",
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer"
                  }}
                >
                  🚪 Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 20px" }}>
        
        {/* Current Leader Banner */}
        {leader && (
          <div style={{
            background: "linear-gradient(135deg, #eab308 0%, #f59e0b 100%)",
            borderRadius: 16,
            padding: 24,
            marginBottom: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ fontSize: 48 }}>🏆</div>
              <div>
                <p style={{ fontSize: 14, color: "#78350f", margin: 0, fontWeight: 600 }}>CURRENT LEADER - SALESPERSON OF THE MONTH</p>
                <h2 style={{ fontSize: 28, fontWeight: 800, color: "#78350f", margin: "4px 0 0 0" }}>{leader.salesperson}</h2>
              </div>
            </div>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 24, fontWeight: 700, color: "#78350f" }}>{leader.units_sold}</div>
                <div style={{ fontSize: 11, color: "#92400e" }}>Units</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 24, fontWeight: 700, color: "#78350f" }}>{leader.google_reviews}</div>
                <div style={{ fontSize: 11, color: "#92400e" }}>Reviews</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 24, fontWeight: 700, color: "#78350f" }}>{(leader.closing_pct * 100).toFixed(1)}%</div>
                <div style={{ fontSize: 11, color: "#92400e" }}>Close Rate</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 24, fontWeight: 700, color: "#78350f" }}>{leader.total_score}</div>
                <div style={{ fontSize: 11, color: "#92400e" }}>Score</div>
              </div>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", 
          gap: 16, 
          marginBottom: 32 
        }}>
          <StatCard label="Page Views" value={totals.pageViews} icon="👁️" color="#3b82f6" />
          <StatCard label="Review Clicks" value={totals.ctaClicks} icon="⭐" color="#eab308" />
          <StatCard label="Conversion" value={`${conversionRate}%`} icon="📈" color="#22c55e" />
          <StatCard label="Contact Saves" value={totals.contactSaves} icon="📇" color="#8b5cf6" />
          <StatCard label="Service Clicks" value={totals.serviceClicks} icon="🔧" color="#f97316" />
          <StatCard label="Referrals" value={totals.referralsShared} icon="🎁" color="#ec4899" />
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
          <TabButton active={activeTab === "mtd"} onClick={() => setActiveTab("mtd")}>
            📈 MTD Tracking
          </TabButton>
          <TabButton active={activeTab === "sotm"} onClick={() => setActiveTab("sotm")}>
            🏆 Salesperson of the Month
          </TabButton>
          <TabButton active={activeTab === "scoreboard"} onClick={() => setActiveTab("scoreboard")}>
            📊 Review Leaderboard
          </TabButton>
          <TabButton active={activeTab === "referrals"} onClick={() => setActiveTab("referrals")}>
            🎁 Referrals
          </TabButton>
          <TabButton active={activeTab === "activity"} onClick={() => setActiveTab("activity")}>
            📋 Recent Activity
          </TabButton>
        </div>

        {/* MTD Tracking Tab */}
        {activeTab === "mtd" && (
          <div>
            {/* Day Progress */}
            <div style={{ 
              backgroundColor: "#1e293b", 
              borderRadius: 12, 
              padding: 20, 
              marginBottom: 20,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <div>
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>📅 Month Progress</h3>
                <p style={{ margin: "4px 0 0", color: "#94a3b8", fontSize: 14 }}>
                  Day {trackingStats.daysWorked} of {trackingStats.totalWorkingDays} working days
                </p>
              </div>
              <div style={{ 
                fontSize: 32, 
                fontWeight: 800, 
                color: "#3b82f6" 
              }}>
                {trackingStats.totalWorkingDays > 0 
                  ? Math.round((trackingStats.daysWorked / trackingStats.totalWorkingDays) * 100) 
                  : 0}% Complete
              </div>
            </div>

            {/* Volume Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20, marginBottom: 20 }}>
              
              {/* New Cars */}
              <div style={{ backgroundColor: "#1e293b", borderRadius: 12, padding: 20, border: "2px solid #3b82f6" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#3b82f6" }}>🚗 New Cars</h3>
                  <span style={{ 
                    backgroundColor: newProgress >= 100 ? "#22c55e" : newProgress >= 70 ? "#eab308" : "#dc2626",
                    padding: "4px 12px",
                    borderRadius: 20,
                    fontSize: 14,
                    fontWeight: 700
                  }}>
                    {newProgress}%
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 12 }}>
                  <span style={{ fontSize: 48, fontWeight: 900, color: "#3b82f6" }}>{trackingStats.mtdNewUnits}</span>
                  <span style={{ fontSize: 20, color: "#64748b" }}>/ {trackingStats.newUnitObjective}</span>
                </div>
                <ProgressBar progress={newProgress} color="#3b82f6" />
                <div style={{ marginTop: 12, fontSize: 13, color: "#94a3b8" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span>Pacing: {trackingStats.newUnitPacing} units</span>
                    <span>Need: {Math.max(0, trackingStats.newUnitObjective - trackingStats.mtdNewUnits)} more</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 8, borderTop: "1px solid #334155" }}>
                    <span>Gross MTD: <span style={{ color: "#22c55e" }}>{trackingStats.mtdNewGross}</span></span>
                    <span>Obj: {trackingStats.newGrossObjective}</span>
                  </div>
                </div>
              </div>

              {/* Used Cars */}
              <div style={{ backgroundColor: "#1e293b", borderRadius: 12, padding: 20, border: "2px solid #f59e0b" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#f59e0b" }}>🚙 Used Cars</h3>
                  <span style={{ 
                    backgroundColor: usedProgress >= 100 ? "#22c55e" : usedProgress >= 70 ? "#eab308" : "#dc2626",
                    padding: "4px 12px",
                    borderRadius: 20,
                    fontSize: 14,
                    fontWeight: 700
                  }}>
                    {usedProgress}%
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 12 }}>
                  <span style={{ fontSize: 48, fontWeight: 900, color: "#f59e0b" }}>{trackingStats.mtdUsedUnits}</span>
                  <span style={{ fontSize: 20, color: "#64748b" }}>/ {trackingStats.usedUnitObjective}</span>
                </div>
                <ProgressBar progress={usedProgress} color="#f59e0b" />
                <div style={{ marginTop: 12, fontSize: 13, color: "#94a3b8" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span>Pacing: {trackingStats.usedUnitPacing} units</span>
                    <span>Need: {Math.max(0, trackingStats.usedUnitObjective - trackingStats.mtdUsedUnits)} more</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 8, borderTop: "1px solid #334155" }}>
                    <span>Gross MTD: <span style={{ color: "#22c55e" }}>{trackingStats.mtdUsedGross}</span></span>
                    <span>Obj: {trackingStats.usedGrossObjective}</span>
                  </div>
                </div>
              </div>

              {/* Total Units */}
              <div style={{ backgroundColor: "#1e293b", borderRadius: 12, padding: 20, border: "2px solid #22c55e" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#22c55e" }}>📊 Total Units</h3>
                  <span style={{ 
                    backgroundColor: totalProgress >= 100 ? "#22c55e" : totalProgress >= 70 ? "#eab308" : "#dc2626",
                    padding: "4px 12px",
                    borderRadius: 20,
                    fontSize: 14,
                    fontWeight: 700
                  }}>
                    {totalProgress}%
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 12 }}>
                  <span style={{ fontSize: 48, fontWeight: 900, color: "#22c55e" }}>{trackingStats.mtdTotalUnits}</span>
                  <span style={{ fontSize: 20, color: "#64748b" }}>/ {trackingStats.totalUnitObjective}</span>
                </div>
                <ProgressBar progress={totalProgress} color="#22c55e" />
                <div style={{ marginTop: 12, fontSize: 13, color: "#94a3b8" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span>Pacing: {trackingStats.totalUnitPacing} units</span>
                    <span>Need: {Math.max(0, trackingStats.totalUnitObjective - trackingStats.mtdTotalUnits)} more</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 8, borderTop: "1px solid #334155" }}>
                    <span>Gross MTD: <span style={{ color: "#22c55e", fontWeight: 700 }}>{trackingStats.mtdTotalGross}</span></span>
                    <span>Obj: {trackingStats.totalGrossObjective}</span>
                  </div>
                </div>
              </div>

              {/* Daily Activity */}
              <div style={{ backgroundColor: "#1e293b", borderRadius: 12, padding: 20, border: "2px solid #8b5cf6" }}>
                <h3 style={{ margin: "0 0 16px", fontSize: 18, fontWeight: 700, color: "#8b5cf6" }}>📞 Daily Activity Average</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <ActivityStat label="Calls" value={trackingStats.dailyCalls} icon="📞" />
                  <ActivityStat label="Emails" value={trackingStats.dailyEmails} icon="✉️" />
                  <ActivityStat label="Texts" value={trackingStats.dailyTexts} icon="💬" />
                  <ActivityStat label="Videos" value={trackingStats.dailyVideos} icon="🎥" />
                </div>
                <div style={{ 
                  marginTop: 16, 
                  paddingTop: 16, 
                  borderTop: "1px solid #334155",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <span style={{ fontSize: 14, color: "#94a3b8" }}>Total Activity/Day</span>
                  <span style={{ fontSize: 28, fontWeight: 800, color: "#8b5cf6" }}>
                    {trackingStats.dailyTotalActivity.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Today's Deliveries */}
            <div style={{ backgroundColor: "#1e293b", borderRadius: 12, padding: 20 }}>
              <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700, color: "#94a3b8" }}>🚗 Today's Deliveries</h3>
              <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                <div style={{ fontSize: 64, fontWeight: 900, color: trackingStats.todaysDeliveries > 0 ? "#22c55e" : "#64748b" }}>
                  {trackingStats.todaysDeliveries}
                </div>
                {trackingStats.todaysDeals.length > 0 ? (
                  <div style={{ flex: 1 }}>
                    {trackingStats.todaysDeals.map((deal, idx) => (
                      <div key={idx} style={{
                        padding: "8px 12px",
                        backgroundColor: "#334155",
                        borderRadius: 8,
                        marginBottom: 8,
                        fontSize: 13
                      }}>
                        <span style={{ fontWeight: 600, color: "#fff" }}>{deal.vehicle}</span>
                        <span style={{ color: "#94a3b8" }}> • {deal.salesperson.split(" / ")[0]} • {deal.newUsed}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: "#64748b", fontSize: 14 }}>No deliveries today yet</p>
                )}
              </div>
            </div>

            <div style={{ marginTop: 16, padding: 12, backgroundColor: "#334155", borderRadius: 8, fontSize: 12, color: "#94a3b8", textAlign: "center" }}>
              💡 Data syncs from TRACKING SHEET every minute. <a href="https://docs.google.com/spreadsheets/d/18MsFJckUAR1549ArywXz5tAn7M1q87jb8dzqVQhUWPQ/edit" target="_blank" style={{ color: "#3b82f6" }}>Open Deal Log →</a>
            </div>
          </div>
        )}

        {/* SOTM Tab */}
        {activeTab === "sotm" && (
          <div style={{ backgroundColor: "#1e293b", borderRadius: 12, overflow: "hidden" }}>
            {salespersonRankings.length === 0 ? (
              <div style={{ padding: 40, textAlign: "center", color: "#94a3b8" }}>
                <p>No data found. Make sure your Google Sheet has data in the "Current" tab.</p>
              </div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                  <thead>
                    <tr style={{ backgroundColor: "#334155" }}>
                      <th style={thStyle}>Rank</th>
                      <th style={thStyle}>Salesperson</th>
                      <th style={thStyle}>Units Sold</th>
                      <th style={thStyle}>Activity</th>
                      <th style={thStyle}>Close %</th>
                      <th style={thStyle}>Google Reviews</th>
                      <th style={thStyle}>Total Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salespersonRankings
                      .sort((a, b) => a.rank - b.rank)
                      .map((row, index) => (
                        <tr 
                          key={row.salesperson} 
                          style={{ 
                            borderBottom: "1px solid #334155",
                            backgroundColor: index === 0 ? "rgba(234, 179, 8, 0.1)" : "transparent"
                          }}
                        >
                          <td style={tdStyle}>
                            <span style={{
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: 32,
                              height: 32,
                              borderRadius: "50%",
                              backgroundColor: index === 0 ? "#eab308" : index === 1 ? "#94a3b8" : index === 2 ? "#b45309" : "#334155",
                              color: index < 3 ? "#000" : "#fff",
                              fontWeight: 700,
                              fontSize: 14
                            }}>
                              {row.rank}
                            </span>
                          </td>
                          <td style={tdStyle}>
                            <div style={{ fontWeight: 600, fontSize: 15 }}>
                              {index === 0 && "👑 "}{row.salesperson}
                            </div>
                          </td>
                          <td style={tdStyle}>
                            <span style={{ 
                              backgroundColor: "#3b82f620",
                              color: "#60a5fa",
                              padding: "4px 10px",
                              borderRadius: 6,
                              fontWeight: 600
                            }}>
                              {row.units_sold}
                            </span>
                          </td>
                          <td style={tdStyle}>{row.total_activity.toLocaleString()}</td>
                          <td style={tdStyle}>
                            <span style={{
                              color: row.closing_pct >= 0.2 ? "#22c55e" : row.closing_pct >= 0.1 ? "#eab308" : "#ef4444"
                            }}>
                              {(row.closing_pct * 100).toFixed(1)}%
                            </span>
                          </td>
                          <td style={tdStyle}>
                            <span style={{ 
                              backgroundColor: row.google_reviews >= 5 ? "#22c55e20" : "transparent",
                              color: row.google_reviews >= 5 ? "#22c55e" : "#fff",
                              padding: "4px 10px",
                              borderRadius: 6,
                              fontWeight: 600
                            }}>
                              ⭐ {row.google_reviews}
                            </span>
                          </td>
                          <td style={tdStyle}>
                            <span style={{
                              backgroundColor: index === 0 ? "#eab30830" : "#33415530",
                              color: index === 0 ? "#eab308" : "#fff",
                              padding: "6px 12px",
                              borderRadius: 8,
                              fontWeight: 700,
                              fontSize: 15
                            }}>
                              {row.total_score}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Review Scoreboard Tab */}
        {activeTab === "scoreboard" && (
          <div style={{ backgroundColor: "#1e293b", borderRadius: 12, overflow: "hidden" }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                <thead>
                  <tr style={{ backgroundColor: "#334155" }}>
                    <th style={thStyle}>Rank</th>
                    <th style={thStyle}>Salesperson</th>
                    <th style={thStyle}>Views</th>
                    <th style={thStyle}>Reviews</th>
                    <th style={thStyle}>Rate</th>
                    <th style={thStyle}>Contacts</th>
                    <th style={thStyle}>Social</th>
                    <th style={thStyle}>Referrals</th>
                  </tr>
                </thead>
                <tbody>
                  {scoreboard
                    .sort((a, b) => b.cta_clicks - a.cta_clicks)
                    .map((row, index) => (
                      <tr key={row.slug} style={{ borderBottom: "1px solid #334155" }}>
                        <td style={tdStyle}>
                          {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : index + 1}
                        </td>
                        <td style={tdStyle}>
                          <div>
                            <div style={{ fontWeight: 600 }}>{row.display_name}</div>
                            <div style={{ fontSize: 12, color: "#94a3b8" }}>{row.title}</div>
                          </div>
                        </td>
                        <td style={tdStyle}>{row.page_views}</td>
                        <td style={tdStyle}>
                          <span style={{ 
                            backgroundColor: row.cta_clicks > 0 ? "#22c55e20" : "transparent",
                            color: row.cta_clicks > 0 ? "#22c55e" : "#94a3b8",
                            padding: "4px 8px",
                            borderRadius: 6,
                            fontWeight: 600
                          }}>
                            {row.cta_clicks}
                          </span>
                        </td>
                        <td style={tdStyle}>
                          {row.page_views > 0 
                            ? `${((row.cta_clicks / row.page_views) * 100).toFixed(0)}%` 
                            : "-"}
                        </td>
                        <td style={tdStyle}>{row.contact_saves}</td>
                        <td style={tdStyle}>
                          <div style={{ display: "flex", gap: 4 }}>
                            <span title="Facebook">{row.facebook_clicks > 0 ? `📘${row.facebook_clicks}` : ""}</span>
                            <span title="Instagram">{row.instagram_clicks > 0 ? `📸${row.instagram_clicks}` : ""}</span>
                            <span title="TikTok">{row.tiktok_clicks > 0 ? `🎵${row.tiktok_clicks}` : ""}</span>
                            {row.facebook_clicks + row.instagram_clicks + row.tiktok_clicks === 0 && "-"}
                          </div>
                        </td>
                        <td style={tdStyle}>{row.referrals_shared || "-"}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Referrals Tab */}
        {activeTab === "referrals" && (
          <div style={{ backgroundColor: "#1e293b", borderRadius: 12, overflow: "hidden" }}>
            {referrals.length === 0 ? (
              <div style={{ padding: 40, textAlign: "center", color: "#94a3b8" }}>
                No referrals yet.
              </div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                  <thead>
                    <tr style={{ backgroundColor: "#334155" }}>
                      <th style={thStyle}>Code</th>
                      <th style={thStyle}>Referrer</th>
                      <th style={thStyle}>Salesperson</th>
                      <th style={thStyle}>Created</th>
                      <th style={thStyle}>Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {referrals.map((ref) => (
                      <tr key={ref.id} style={{ borderBottom: "1px solid #334155" }}>
                        <td style={tdStyle}>
                          <code style={{ backgroundColor: "#334155", padding: "4px 8px", borderRadius: 4, fontSize: 12 }}>
                            {ref.referral_code}
                          </code>
                        </td>
                        <td style={tdStyle}>{ref.referrer_name || "Anonymous"}</td>
                        <td style={tdStyle}>{ref.salesperson_slug}</td>
                        <td style={tdStyle}>{new Date(ref.created_at).toLocaleDateString()}</td>
                        <td style={tdStyle}>
                          <a href={`/refer/${ref.referral_code}`} target="_blank" style={{ color: "#3b82f6" }}>View →</a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === "activity" && (
          <div style={{ backgroundColor: "#1e293b", borderRadius: 12, padding: 20 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {recentEvents.slice(0, 50).map((event) => (
                <div 
                  key={event.id} 
                  style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: 12,
                    padding: "10px 14px",
                    backgroundColor: "#334155",
                    borderRadius: 8,
                    fontSize: 13
                  }}
                >
                  <span style={{ fontSize: 18 }}>{getEventIcon(event.event_type)}</span>
                  <span style={{ flex: 1 }}>
                    <strong>{event.slug}</strong> — {formatEventType(event.event_type)}
                  </span>
                  <span style={{ color: "#94a3b8", fontSize: 12 }}>
                    {formatTimeAgo(event.created_at)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Links */}
        <div style={{ marginTop: 32, padding: 20, backgroundColor: "#1e293b", borderRadius: 12 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>🔗 Salesperson Links</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 8 }}>
            {scoreboard.map((row) => (
              <div 
                key={row.slug}
                style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "space-between",
                  padding: "10px 14px",
                  backgroundColor: "#334155",
                  borderRadius: 8,
                  fontSize: 13
                }}
              >
                <span>{row.display_name}</span>
                <a href={row.review_link} target="_blank" style={{ color: "#3b82f6", textDecoration: "none", fontSize: 12 }}>
                  {row.review_link.replace("https://", "")}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function StatCard({ label, value, icon, color }: { label: string; value: number | string; icon: string; color: string }) {
  return (
    <div style={{
      backgroundColor: "#1e293b",
      borderRadius: 12,
      padding: 20,
      borderLeft: `4px solid ${color}`
    }}>
      <div style={{ fontSize: 28, marginBottom: 4 }}>{icon}</div>
      <div style={{ fontSize: 28, fontWeight: 700 }}>{value}</div>
      <div style={{ fontSize: 13, color: "#94a3b8" }}>{label}</div>
    </div>
  );
}

function TabButton({ children, active, onClick }: { children: React.ReactNode; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 20px",
        backgroundColor: active ? "#3b82f6" : "#334155",
        color: "#fff",
        border: "none",
        borderRadius: 8,
        cursor: "pointer",
        fontSize: 14,
        fontWeight: 500
      }}
    >
      {children}
    </button>
  );
}

function ProgressBar({ progress, color }: { progress: number; color: string }) {
  return (
    <div style={{ backgroundColor: "#334155", borderRadius: 8, height: 12, overflow: "hidden" }}>
      <div style={{
        width: `${Math.min(progress, 100)}%`,
        height: "100%",
        backgroundColor: color,
        borderRadius: 8
      }} />
    </div>
  );
}

function ActivityStat({ label, value, icon }: { label: string; value: number; icon: string }) {
  return (
    <div style={{
      backgroundColor: "#334155",
      borderRadius: 8,
      padding: 12,
      display: "flex",
      alignItems: "center",
      gap: 10
    }}>
      <span style={{ fontSize: 20 }}>{icon}</span>
      <div>
        <div style={{ fontSize: 18, fontWeight: 700 }}>{value.toLocaleString()}</div>
        <div style={{ fontSize: 11, color: "#94a3b8" }}>{label}</div>
      </div>
    </div>
  );
}

function getEventIcon(type: string): string {
  const icons: Record<string, string> = {
    page_view: "👁️", cta_click: "⭐", facebook_click: "📘", instagram_click: "📸",
    tiktok_click: "🎵", save_contact: "📇", save_service_contact: "🔧",
    save_accessories_contact: "🎨", schedule_service_click: "📅",
    referral_share: "🎁", calendar_download: "📆",
  };
  return icons[type] || "📋";
}

function formatEventType(type: string): string {
  return type.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}

function formatTimeAgo(dateString: string): string {
  const seconds = Math.floor((new Date().getTime() - new Date(dateString).getTime()) / 1000);
  if (seconds < 60) return "Just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

const thStyle: React.CSSProperties = {
  textAlign: "left", padding: "12px 16px", fontSize: 12, fontWeight: 600,
  color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px"
};

const tdStyle: React.CSSProperties = { padding: "12px 16px", verticalAlign: "middle" };
