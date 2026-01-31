"use client";

import { useEffect, useState } from "react";

type SalespersonRanking = {
  salesperson: string;
  units_sold: number;
  total_activity: number;
  closing_pct: number;
  google_reviews: number;
  total_score: number;
  rank: number;
};

type DeliveryStats = {
  todaysDeliveries: number;
  todaysDeals: Array<{
    customerName: string;
    salesperson: string;
    vehicle: string;
    newUsed: string;
  }>;
  mtdNewUnits: number;
  mtdUsedUnits: number;
  mtdTotalUnits: number;
  mtdTotalGross: string;
  newUnitObjective: number;
  usedUnitObjective: number;
  totalUnitObjective: number;
  grossObjective: string;
  newUnitPacing: number;
  usedUnitPacing: number;
  totalUnitPacing: number;
  mtdCalls: number;
  mtdEmails: number;
  mtdTexts: number;
  mtdVideos: number;
  mtdTotalActivity: number;
  mtdInternetLeads: number;
  mtdPhoneLeads: number;
  mtdWalkIns: number;
  mtdCampaign: number;
  mtdTotalLeads: number;
  daysWorked: number;
  totalWorkingDays: number;
};

type Props = {
  salespersonRankings: SalespersonRanking[];
  deliveryStats: DeliveryStats;
};

export default function TVDisplayClient({ salespersonRankings, deliveryStats }: Props) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [lastRefresh, setLastRefresh] = useState(new Date());

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-refresh page every 5 minutes
  useEffect(() => {
    const refreshTimer = setInterval(() => {
      window.location.reload();
    }, 5 * 60 * 1000);
    return () => clearInterval(refreshTimer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const getMonthName = () => {
    return currentTime.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  // Sort rankings by rank
  const sortedRankings = [...salespersonRankings].sort((a, b) => a.rank - b.rank);
  const leader = sortedRankings[0];

  // Calculate progress percentages
  const unitProgress = deliveryStats.totalUnitObjective > 0 
    ? Math.round((deliveryStats.mtdTotalUnits / deliveryStats.totalUnitObjective) * 100) 
    : 0;

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#0a0a0a",
      color: "#ffffff",
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column"
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(90deg, #dc2626 0%, #b91c1c 50%, #dc2626 100%)",
        padding: "16px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <img 
            src="https://res.cloudinary.com/di5ujiwjp/image/upload/v1769874514/Gallatin_CDJR_App_Icon_xt3irp.png" 
            alt="Gallatin CDJR" 
            style={{ height: 50, borderRadius: 8 }}
          />
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 800, margin: 0, letterSpacing: "-1px" }}>
              SALESPERSON OF THE MONTH
            </h1>
            <p style={{ fontSize: 14, margin: 0, opacity: 0.9 }}>{getMonthName()} Rankings</p>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 36, fontWeight: 700, fontFamily: "monospace" }}>
            {formatTime(currentTime)}
          </div>
          <div style={{ fontSize: 12, opacity: 0.8 }}>{formatDate(currentTime)}</div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: "flex", padding: 16, gap: 16 }}>
        {/* Leaderboard - Left Side */}
        <div style={{ flex: 2, display: "flex", flexDirection: "column" }}>
          {/* Leader Spotlight */}
          {leader && (
            <div style={{
              background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)",
              borderRadius: 16,
              padding: 20,
              marginBottom: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ fontSize: 56, lineHeight: 1 }}>👑</div>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 700, color: "#78350f", margin: 0, textTransform: "uppercase", letterSpacing: "2px" }}>
                    CURRENT LEADER
                  </p>
                  <h2 style={{ fontSize: 36, fontWeight: 900, color: "#78350f", margin: "4px 0 0 0" }}>
                    {leader.salesperson}
                  </h2>
                </div>
              </div>
              <div style={{ display: "flex", gap: 24 }}>
                <StatBox label="UNITS" value={leader.units_sold} />
                <StatBox label="REVIEWS" value={leader.google_reviews} icon="⭐" />
                <StatBox label="CLOSE %" value={`${(leader.closing_pct * 100).toFixed(0)}%`} />
                <StatBox label="SCORE" value={leader.total_score} highlight />
              </div>
            </div>
          )}

          {/* Rankings Table */}
          <div style={{
            flex: 1,
            backgroundColor: "#111111",
            borderRadius: 12,
            overflow: "hidden",
            border: "1px solid #222"
          }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#1a1a1a" }}>
                  <th style={thStyleTV}>RANK</th>
                  <th style={{ ...thStyleTV, textAlign: "left" }}>SALESPERSON</th>
                  <th style={thStyleTV}>UNITS</th>
                  <th style={thStyleTV}>ACTIVITY</th>
                  <th style={thStyleTV}>CLOSE %</th>
                  <th style={thStyleTV}>REVIEWS</th>
                  <th style={thStyleTV}>SCORE</th>
                </tr>
              </thead>
              <tbody>
                {sortedRankings.map((row, index) => (
                  <tr 
                    key={row.salesperson}
                    style={{
                      backgroundColor: index === 0 ? "rgba(251, 191, 36, 0.1)" : index % 2 === 0 ? "#0f0f0f" : "#141414",
                      borderBottom: "1px solid #222"
                    }}
                  >
                    <td style={{ ...tdStyleTV, textAlign: "center" }}>
                      <RankBadge rank={row.rank} />
                    </td>
                    <td style={{ ...tdStyleTV, textAlign: "left" }}>
                      <span style={{ 
                        fontSize: 18, 
                        fontWeight: index === 0 ? 800 : 600,
                        color: index === 0 ? "#fbbf24" : "#fff"
                      }}>
                        {row.salesperson}
                      </span>
                    </td>
                    <td style={tdStyleTV}>
                      <span style={{
                        backgroundColor: "#3b82f6",
                        padding: "4px 10px",
                        borderRadius: 6,
                        fontWeight: 700,
                        fontSize: 16
                      }}>
                        {row.units_sold}
                      </span>
                    </td>
                    <td style={tdStyleTV}>
                      <span style={{ fontSize: 15, color: "#94a3b8" }}>
                        {row.total_activity.toLocaleString()}
                      </span>
                    </td>
                    <td style={tdStyleTV}>
                      <span style={{
                        fontSize: 15,
                        fontWeight: 600,
                        color: row.closing_pct >= 0.2 ? "#22c55e" : row.closing_pct >= 0.1 ? "#eab308" : "#ef4444"
                      }}>
                        {(row.closing_pct * 100).toFixed(1)}%
                      </span>
                    </td>
                    <td style={tdStyleTV}>
                      <span style={{ fontSize: 15 }}>⭐ {row.google_reviews}</span>
                    </td>
                    <td style={tdStyleTV}>
                      <span style={{
                        backgroundColor: index === 0 ? "#fbbf24" : "#333",
                        color: index === 0 ? "#78350f" : "#fff",
                        padding: "6px 12px",
                        borderRadius: 8,
                        fontWeight: 800,
                        fontSize: 16
                      }}>
                        {row.total_score}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Sidebar */}
        <div style={{ width: 340, display: "flex", flexDirection: "column", gap: 12 }}>
          
          {/* Unit Objective Progress */}
          <div style={{
            backgroundColor: "#111",
            borderRadius: 12,
            padding: 16,
            border: "1px solid #222"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <h3 style={{ fontSize: 12, fontWeight: 700, color: "#64748b", margin: 0, textTransform: "uppercase" }}>
                🎯 Unit Objective
              </h3>
              <span style={{ fontSize: 11, color: "#64748b" }}>
                Day {deliveryStats.daysWorked}/{deliveryStats.totalWorkingDays}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 42, fontWeight: 900, color: unitProgress >= 100 ? "#22c55e" : "#fff" }}>
                {deliveryStats.mtdTotalUnits}
              </span>
              <span style={{ fontSize: 20, color: "#64748b" }}>/ {deliveryStats.totalUnitObjective}</span>
            </div>
            <div style={{ backgroundColor: "#333", borderRadius: 8, height: 12, overflow: "hidden" }}>
              <div style={{
                width: `${Math.min(unitProgress, 100)}%`,
                height: "100%",
                backgroundColor: unitProgress >= 100 ? "#22c55e" : unitProgress >= 70 ? "#eab308" : "#dc2626",
                borderRadius: 8,
                transition: "width 0.5s ease"
              }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 12 }}>
              <span style={{ color: "#3b82f6" }}>New: {deliveryStats.mtdNewUnits}/{deliveryStats.newUnitObjective}</span>
              <span style={{ color: "#f59e0b" }}>Used: {deliveryStats.mtdUsedUnits}/{deliveryStats.usedUnitObjective}</span>
            </div>
          </div>

          {/* Gross & Pacing */}
          <div style={{
            backgroundColor: "#111",
            borderRadius: 12,
            padding: 16,
            border: "1px solid #222"
          }}>
            <h3 style={{ fontSize: 12, fontWeight: 700, color: "#64748b", margin: "0 0 12px 0", textTransform: "uppercase" }}>
              💰 Gross MTD
            </h3>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#22c55e", marginBottom: 8 }}>
              {deliveryStats.mtdTotalGross}
            </div>
            <div style={{ fontSize: 12, color: "#64748b" }}>
              Objective: {deliveryStats.grossObjective}
            </div>
          </div>

          {/* Today's Deliveries */}
          <div style={{
            backgroundColor: "#111",
            borderRadius: 12,
            padding: 16,
            border: "1px solid #222"
          }}>
            <h3 style={{ fontSize: 12, fontWeight: 700, color: "#64748b", margin: "0 0 8px 0", textTransform: "uppercase" }}>
              🚗 Today's Deliveries
            </h3>
            <div style={{ 
              fontSize: 48, 
              fontWeight: 900, 
              color: deliveryStats.todaysDeliveries > 0 ? "#22c55e" : "#64748b",
              textAlign: "center"
            }}>
              {deliveryStats.todaysDeliveries}
            </div>
            {deliveryStats.todaysDeals.length > 0 && (
              <div style={{ marginTop: 8, maxHeight: 80, overflowY: "auto" }}>
                {deliveryStats.todaysDeals.slice(0, 3).map((deal, idx) => (
                  <div key={idx} style={{
                    fontSize: 10,
                    color: "#94a3b8",
                    padding: "4px 0",
                    borderTop: idx > 0 ? "1px solid #222" : "none"
                  }}>
                    <span style={{ color: "#fff" }}>{deal.vehicle}</span>
                    <span style={{ color: "#64748b" }}> • {deal.salesperson.split(" / ")[0]}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Activity Tracking */}
          <div style={{
            backgroundColor: "#111",
            borderRadius: 12,
            padding: 16,
            border: "1px solid #222"
          }}>
            <h3 style={{ fontSize: 12, fontWeight: 700, color: "#64748b", margin: "0 0 12px 0", textTransform: "uppercase" }}>
              📞 MTD Activity
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <MiniStat label="Calls" value={deliveryStats.mtdCalls.toLocaleString()} />
              <MiniStat label="Emails" value={deliveryStats.mtdEmails.toLocaleString()} />
              <MiniStat label="Texts" value={deliveryStats.mtdTexts.toLocaleString()} />
              <MiniStat label="Videos" value={deliveryStats.mtdVideos.toLocaleString()} />
            </div>
            <div style={{ 
              marginTop: 8, 
              paddingTop: 8, 
              borderTop: "1px solid #222", 
              display: "flex", 
              justifyContent: "space-between",
              fontSize: 14
            }}>
              <span style={{ color: "#64748b" }}>Total</span>
              <span style={{ fontWeight: 700, color: "#22c55e" }}>{deliveryStats.mtdTotalActivity.toLocaleString()}</span>
            </div>
          </div>

          {/* Lead Tracking */}
          <div style={{
            backgroundColor: "#111",
            borderRadius: 12,
            padding: 16,
            border: "1px solid #222"
          }}>
            <h3 style={{ fontSize: 12, fontWeight: 700, color: "#64748b", margin: "0 0 12px 0", textTransform: "uppercase" }}>
              🎯 MTD Leads
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <MiniStat label="Internet" value={deliveryStats.mtdInternetLeads.toString()} />
              <MiniStat label="Phone" value={deliveryStats.mtdPhoneLeads.toString()} />
              <MiniStat label="Walk-Ins" value={deliveryStats.mtdWalkIns.toString()} />
              <MiniStat label="Campaign" value={deliveryStats.mtdCampaign.toString()} />
            </div>
            <div style={{ 
              marginTop: 8, 
              paddingTop: 8, 
              borderTop: "1px solid #222", 
              display: "flex", 
              justifyContent: "space-between",
              fontSize: 14
            }}>
              <span style={{ color: "#64748b" }}>Total</span>
              <span style={{ fontWeight: 700, color: "#3b82f6" }}>{deliveryStats.mtdTotalLeads.toLocaleString()}</span>
            </div>
          </div>

          {/* Days Left */}
          <div style={{
            backgroundColor: "#dc262620",
            borderRadius: 12,
            padding: 12,
            border: "1px solid #dc2626",
            textAlign: "center"
          }}>
            <span style={{ fontSize: 12, color: "#dc2626" }}>🔥 </span>
            <span style={{ fontSize: 24, fontWeight: 900, color: "#dc2626" }}>{getDaysRemaining()}</span>
            <span style={{ fontSize: 12, color: "#dc2626" }}> days left</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        backgroundColor: "#111",
        padding: "8px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderTop: "1px solid #222"
      }}>
        <div style={{ fontSize: 11, color: "#64748b" }}>
          Auto-refreshes every 5 minutes • Last update: {lastRefresh.toLocaleTimeString()}
        </div>
        <div style={{ fontSize: 11, color: "#64748b" }}>
          Gallatin CDJR • Part of the WE Auto Family
        </div>
      </div>
    </div>
  );
}

// Helper Components
function RankBadge({ rank }: { rank: number }) {
  const getBadgeStyle = () => {
    if (rank === 1) return { bg: "#fbbf24", color: "#78350f", icon: "🥇" };
    if (rank === 2) return { bg: "#94a3b8", color: "#1e293b", icon: "🥈" };
    if (rank === 3) return { bg: "#cd7f32", color: "#1e293b", icon: "🥉" };
    return { bg: "#333", color: "#fff", icon: null };
  };
  
  const style = getBadgeStyle();
  
  return (
    <div style={{
      width: 36,
      height: 36,
      borderRadius: "50%",
      backgroundColor: style.bg,
      color: style.color,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 800,
      fontSize: style.icon ? 20 : 14
    }}>
      {style.icon || rank}
    </div>
  );
}

function StatBox({ label, value, icon, highlight }: { label: string; value: string | number; icon?: string; highlight?: boolean }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 28, fontWeight: 900, color: "#78350f", lineHeight: 1 }}>
        {icon && <span style={{ marginRight: 4 }}>{icon}</span>}
        {value}
      </div>
      <div style={{ fontSize: 10, color: "#92400e", marginTop: 4, fontWeight: 600, textTransform: "uppercase" }}>
        {label}
      </div>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div style={{
      backgroundColor: "#1a1a1a",
      borderRadius: 6,
      padding: "8px 10px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <span style={{ fontSize: 11, color: "#64748b" }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{value}</span>
    </div>
  );
}

function getDaysRemaining(): number {
  const now = new Date();
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return lastDay.getDate() - now.getDate();
}

// Styles
const thStyleTV: React.CSSProperties = {
  padding: "12px 16px",
  fontSize: 11,
  fontWeight: 700,
  color: "#64748b",
  textTransform: "uppercase",
  letterSpacing: "1px",
  textAlign: "center"
};

const tdStyleTV: React.CSSProperties = {
  padding: "10px 16px",
  textAlign: "center",
  verticalAlign: "middle"
};
