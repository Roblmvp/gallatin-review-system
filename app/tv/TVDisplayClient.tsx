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
  mtdNew: number;
  mtdUsed: number;
  mtdTotal: number;
  totalGrossMTD: string;
  todaysDeals: Array<{
    customerName: string;
    salesperson: string;
    vehicle: string;
    newUsed: string;
  }>;
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
    }, 5 * 60 * 1000); // 5 minutes
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

  // Calculate team totals
  const teamTotals = salespersonRankings.reduce(
    (acc, sp) => ({
      units: acc.units + sp.units_sold,
      reviews: acc.reviews + sp.google_reviews,
      activity: acc.activity + sp.total_activity,
    }),
    { units: 0, reviews: 0, activity: 0 }
  );

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
        padding: "20px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <img 
            src="https://res.cloudinary.com/di5ujiwjp/image/upload/v1769874514/Gallatin_CDJR_App_Icon_xt3irp.png" 
            alt="Gallatin CDJR" 
            style={{ height: 60, borderRadius: 8 }}
          />
          <div>
            <h1 style={{ fontSize: 32, fontWeight: 800, margin: 0, letterSpacing: "-1px" }}>
              SALESPERSON OF THE MONTH
            </h1>
            <p style={{ fontSize: 16, margin: 0, opacity: 0.9 }}>{getMonthName()} Rankings</p>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 42, fontWeight: 700, fontFamily: "monospace" }}>
            {formatTime(currentTime)}
          </div>
          <div style={{ fontSize: 14, opacity: 0.8 }}>{formatDate(currentTime)}</div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: "flex", padding: 24, gap: 24 }}>
        {/* Leaderboard - Left Side */}
        <div style={{ flex: 2, display: "flex", flexDirection: "column" }}>
          {/* Leader Spotlight */}
          {leader && (
            <div style={{
              background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)",
              borderRadius: 20,
              padding: 28,
              marginBottom: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <div style={{ 
                  fontSize: 72, 
                  lineHeight: 1,
                  filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))"
                }}>👑</div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "#78350f", margin: 0, textTransform: "uppercase", letterSpacing: "2px" }}>
                    CURRENT LEADER
                  </p>
                  <h2 style={{ fontSize: 48, fontWeight: 900, color: "#78350f", margin: "4px 0 0 0", letterSpacing: "-1px" }}>
                    {leader.salesperson}
                  </h2>
                </div>
              </div>
              <div style={{ display: "flex", gap: 32 }}>
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
            borderRadius: 16,
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
                      borderBottom: "1px solid #222",
                      transition: "all 0.3s ease"
                    }}
                  >
                    <td style={{ ...tdStyleTV, textAlign: "center" }}>
                      <RankBadge rank={row.rank} />
                    </td>
                    <td style={{ ...tdStyleTV, textAlign: "left" }}>
                      <span style={{ 
                        fontSize: 22, 
                        fontWeight: index === 0 ? 800 : 600,
                        color: index === 0 ? "#fbbf24" : "#fff"
                      }}>
                        {row.salesperson}
                      </span>
                    </td>
                    <td style={tdStyleTV}>
                      <span style={{
                        backgroundColor: "#3b82f6",
                        padding: "6px 14px",
                        borderRadius: 8,
                        fontWeight: 700,
                        fontSize: 18
                      }}>
                        {row.units_sold}
                      </span>
                    </td>
                    <td style={tdStyleTV}>
                      <span style={{ fontSize: 18, color: "#94a3b8" }}>
                        {row.total_activity.toLocaleString()}
                      </span>
                    </td>
                    <td style={tdStyleTV}>
                      <span style={{
                        fontSize: 18,
                        fontWeight: 600,
                        color: row.closing_pct >= 0.2 ? "#22c55e" : row.closing_pct >= 0.1 ? "#eab308" : "#ef4444"
                      }}>
                        {(row.closing_pct * 100).toFixed(1)}%
                      </span>
                    </td>
                    <td style={tdStyleTV}>
                      <span style={{ fontSize: 18 }}>
                        ⭐ {row.google_reviews}
                      </span>
                    </td>
                    <td style={tdStyleTV}>
                      <span style={{
                        backgroundColor: index === 0 ? "#fbbf24" : "#333",
                        color: index === 0 ? "#78350f" : "#fff",
                        padding: "8px 16px",
                        borderRadius: 10,
                        fontWeight: 800,
                        fontSize: 20
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

        {/* Right Sidebar - Team Stats & Info */}
        <div style={{ width: 320, display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Team Totals */}
          <div style={{
            backgroundColor: "#111",
            borderRadius: 16,
            padding: 24,
            border: "1px solid #222"
          }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "#64748b", margin: "0 0 16px 0", textTransform: "uppercase", letterSpacing: "1px" }}>
              📊 Team Totals MTD
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <TeamStatRow label="Total Units" value={teamTotals.units} color="#3b82f6" />
              <TeamStatRow label="Google Reviews" value={teamTotals.reviews} color="#eab308" icon="⭐" />
              <TeamStatRow label="Total Activity" value={teamTotals.activity.toLocaleString()} color="#22c55e" />
            </div>
          </div>

          {/* Days Remaining */}
          <div style={{
            backgroundColor: "#111",
            borderRadius: 16,
            padding: 24,
            border: "1px solid #222",
            textAlign: "center"
          }}>
            <div style={{ fontSize: 14, color: "#64748b", marginBottom: 8, textTransform: "uppercase", letterSpacing: "1px" }}>
              Days Left in Month
            </div>
            <div style={{ 
              fontSize: 64, 
              fontWeight: 900, 
              color: "#dc2626",
              lineHeight: 1
            }}>
              {getDaysRemaining()}
            </div>
            <div style={{ fontSize: 14, color: "#64748b", marginTop: 8 }}>
              🔥 Make them count!
            </div>
          </div>

          {/* Today's Deliveries */}
          <div style={{
            backgroundColor: "#111",
            borderRadius: 16,
            padding: 24,
            border: "1px solid #222"
          }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "#64748b", margin: "0 0 16px 0", textTransform: "uppercase", letterSpacing: "1px" }}>
              🚗 Today's Deliveries
            </h3>
            <div style={{ 
              fontSize: 64, 
              fontWeight: 900, 
              color: deliveryStats.todaysDeliveries > 0 ? "#22c55e" : "#64748b",
              textAlign: "center",
              marginBottom: 8
            }}>
              {deliveryStats.todaysDeliveries}
            </div>
            {deliveryStats.todaysDeals.length > 0 && (
              <div style={{ marginTop: 12, maxHeight: 150, overflowY: "auto" }}>
                {deliveryStats.todaysDeals.slice(0, 5).map((deal, idx) => (
                  <div key={idx} style={{
                    fontSize: 11,
                    color: "#94a3b8",
                    padding: "6px 0",
                    borderTop: idx > 0 ? "1px solid #222" : "none"
                  }}>
                    <div style={{ fontWeight: 600, color: "#fff" }}>{deal.vehicle}</div>
                    <div>{deal.salesperson.split(" / ")[0]}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* MTD Stats */}
          <div style={{
            backgroundColor: "#111",
            borderRadius: 16,
            padding: 24,
            border: "1px solid #222"
          }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "#64748b", margin: "0 0 16px 0", textTransform: "uppercase", letterSpacing: "1px" }}>
              📈 MTD Performance
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 12px", backgroundColor: "#1a1a1a", borderRadius: 8 }}>
                <span style={{ color: "#94a3b8" }}>New</span>
                <span style={{ color: "#3b82f6", fontWeight: 700 }}>{deliveryStats.mtdNew}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 12px", backgroundColor: "#1a1a1a", borderRadius: 8 }}>
                <span style={{ color: "#94a3b8" }}>Used</span>
                <span style={{ color: "#f59e0b", fontWeight: 700 }}>{deliveryStats.mtdUsed}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 12px", backgroundColor: "#22c55e20", borderRadius: 8, borderLeft: "3px solid #22c55e" }}>
                <span style={{ color: "#22c55e", fontWeight: 600 }}>Total</span>
                <span style={{ color: "#22c55e", fontWeight: 800, fontSize: 18 }}>{deliveryStats.mtdTotal}</span>
              </div>
            </div>
          </div>

          {/* Motivational Quote */}
          <div style={{
            backgroundColor: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
            background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
            borderRadius: 16,
            padding: 24,
            border: "1px solid #334155",
            flex: 1
          }}>
            <p style={{ 
              fontSize: 18, 
              fontStyle: "italic", 
              color: "#94a3b8", 
              margin: 0,
              lineHeight: 1.6
            }}>
              "Success is not final, failure is not fatal: it is the courage to continue that counts."
            </p>
            <p style={{ fontSize: 14, color: "#64748b", marginTop: 12 }}>
              — Winston Churchill
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        backgroundColor: "#111",
        padding: "12px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderTop: "1px solid #222"
      }}>
        <div style={{ fontSize: 12, color: "#64748b" }}>
          Auto-refreshes every 5 minutes • Last update: {lastRefresh.toLocaleTimeString()}
        </div>
        <div style={{ fontSize: 12, color: "#64748b" }}>
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
      width: 44,
      height: 44,
      borderRadius: "50%",
      backgroundColor: style.bg,
      color: style.color,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 800,
      fontSize: style.icon ? 24 : 18
    }}>
      {style.icon || rank}
    </div>
  );
}

function StatBox({ label, value, icon, highlight }: { label: string; value: string | number; icon?: string; highlight?: boolean }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ 
        fontSize: 36, 
        fontWeight: 900, 
        color: "#78350f",
        lineHeight: 1
      }}>
        {icon && <span style={{ marginRight: 4 }}>{icon}</span>}
        {value}
      </div>
      <div style={{ 
        fontSize: 11, 
        color: "#92400e", 
        marginTop: 4,
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "1px"
      }}>
        {label}
      </div>
    </div>
  );
}

function TeamStatRow({ label, value, color, icon }: { label: string; value: string | number; color: string; icon?: string }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "12px 16px",
      backgroundColor: "#1a1a1a",
      borderRadius: 10,
      borderLeft: `4px solid ${color}`
    }}>
      <span style={{ color: "#94a3b8", fontSize: 14 }}>{label}</span>
      <span style={{ color: "#fff", fontSize: 20, fontWeight: 700 }}>
        {icon && <span style={{ marginRight: 4 }}>{icon}</span>}
        {value}
      </span>
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
  padding: "16px 20px",
  fontSize: 12,
  fontWeight: 700,
  color: "#64748b",
  textTransform: "uppercase",
  letterSpacing: "1px",
  textAlign: "center"
};

const tdStyleTV: React.CSSProperties = {
  padding: "16px 20px",
  textAlign: "center",
  verticalAlign: "middle"
};
