"use client";

import { useState } from "react";

type SalespersonRanking = {
  salesperson: string;
  units_sold: number;
  total_activity: number;
  closing_pct: number;
  google_reviews: number;
  total_score: number;
  rank: number;
};

type ScoreboardRow = {
  slug: string;
  display_name: string;
  page_views: number;
  cta_clicks: number;
  contact_saves: number;
  referrals_shared: number;
};

type UserInfo = {
  name: string;
  email: string;
  slug: string;
};

type Props = {
  user: UserInfo;
  rankings: SalespersonRanking[];
  myScoreboard: ScoreboardRow | null;
  onLogout: () => void;
};

export default function SalesDashboardClient({ user, rankings, myScoreboard, onLogout }: Props) {
  const [activeTab, setActiveTab] = useState<"overview" | "leaderboard" | "reviews">("overview");

  const myRanking = rankings.find(
    r => r.salesperson.toLowerCase().includes(user.name.split(" ")[0].toLowerCase())
  );
  const sortedRankings = [...rankings].sort((a, b) => a.rank - b.rank);
  const leader = sortedRankings[0];

  const getPositionMessage = () => {
    if (!myRanking) return "Keep pushing!";
    if (myRanking.rank === 1) return "🏆 You're in the lead!";
    if (myRanking.rank <= 3) return "🔥 You're in the top 3!";
    if (myRanking.rank <= 5) return "💪 Almost there!";
    return "📈 Keep climbing!";
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0f172a", color: "#fff" }}>
      <div style={{ background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)", padding: "16px 20px", borderBottom: "1px solid #334155" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <img src="https://res.cloudinary.com/di5ujiwjp/image/upload/v1769874514/Gallatin_CDJR_App_Icon_xt3irp.png" alt="Gallatin CDJR" style={{ height: 45, borderRadius: 8 }} />
            <div>
              <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>Sales Dashboard</h1>
              <p style={{ fontSize: 13, color: "#94a3b8", margin: 0 }}>Welcome, {user.name}</p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <a href={"/review/" + user.slug} target="_blank" style={{ padding: "8px 16px", backgroundColor: "#334155", color: "#fff", borderRadius: 8, fontSize: 13, textDecoration: "none", fontWeight: 500 }}>📋 My Review Page</a>
            <button onClick={onLogout} style={{ padding: "8px 16px", backgroundColor: "#ef4444", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Logout</button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "24px 20px" }}>
        <div style={{ background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)", borderRadius: 16, padding: 24, marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 64, height: 64, backgroundColor: "rgba(255,255,255,0.2)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 700 }}>#{myRanking?.rank || "-"}</div>
            <div>
              <h2 style={{ margin: 0, fontSize: 24, fontWeight: 700 }}>{getPositionMessage()}</h2>
              <p style={{ margin: "4px 0 0", color: "rgba(255,255,255,0.8)", fontSize: 14 }}>{myRanking ? "Score: " + myRanking.total_score + " points" : "No ranking data yet"}</p>
            </div>
          </div>
          {leader && myRanking && myRanking.rank !== 1 && (
            <div style={{ textAlign: "right" }}>
              <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.7)" }}>Points to #1</p>
              <p style={{ margin: 0, fontSize: 24, fontWeight: 700 }}>{leader.total_score - myRanking.total_score}</p>
            </div>
          )}
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 24, backgroundColor: "#1e293b", padding: 6, borderRadius: 12 }}>
          <button onClick={() => setActiveTab("overview")} style={{ flex: 1, padding: "12px 20px", backgroundColor: activeTab === "overview" ? "#3b82f6" : "transparent", color: activeTab === "overview" ? "#fff" : "#94a3b8", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: "pointer" }}>📊 Overview</button>
          <button onClick={() => setActiveTab("leaderboard")} style={{ flex: 1, padding: "12px 20px", backgroundColor: activeTab === "leaderboard" ? "#3b82f6" : "transparent", color: activeTab === "leaderboard" ? "#fff" : "#94a3b8", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: "pointer" }}>🏆 Leaderboard</button>
          <button onClick={() => setActiveTab("reviews")} style={{ flex: 1, padding: "12px 20px", backgroundColor: activeTab === "reviews" ? "#3b82f6" : "transparent", color: activeTab === "reviews" ? "#fff" : "#94a3b8", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: "pointer" }}>⭐ My Reviews</button>
        </div>

        {activeTab === "overview" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 24 }}>
              <div style={{ backgroundColor: "#1e293b", borderRadius: 12, padding: 20 }}>
                <p style={{ margin: 0, fontSize: 12, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1 }}>Units Sold</p>
                <p style={{ margin: "8px 0 0", fontSize: 32, fontWeight: 700 }}>{myRanking?.units_sold || 0}</p>
              </div>
              <div style={{ backgroundColor: "#1e293b", borderRadius: 12, padding: 20 }}>
                <p style={{ margin: 0, fontSize: 12, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1 }}>Total Activity</p>
                <p style={{ margin: "8px 0 0", fontSize: 32, fontWeight: 700 }}>{myRanking?.total_activity || 0}</p>
              </div>
              <div style={{ backgroundColor: "#1e293b", borderRadius: 12, padding: 20 }}>
                <p style={{ margin: 0, fontSize: 12, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1 }}>Closing %</p>
                <p style={{ margin: "8px 0 0", fontSize: 32, fontWeight: 700 }}>{myRanking?.closing_pct || 0}%</p>
              </div>
              <div style={{ backgroundColor: "#1e293b", borderRadius: 12, padding: 20 }}>
                <p style={{ margin: 0, fontSize: 12, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1 }}>Google Reviews</p>
                <p style={{ margin: "8px 0 0", fontSize: 32, fontWeight: 700 }}>{myRanking?.google_reviews || 0}</p>
              </div>
            </div>

            <div style={{ backgroundColor: "#1e293b", borderRadius: 12, padding: 24 }}>
              <h3 style={{ margin: "0 0 16px", fontSize: 18, fontWeight: 600 }}>📋 Quick Actions</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
                <a href={"/review/" + user.slug} target="_blank" style={{ display: "flex", alignItems: "center", gap: 12, padding: 16, backgroundColor: "#334155", borderRadius: 10, textDecoration: "none", color: "#fff" }}>
                  <span style={{ fontSize: 24 }}>📱</span>
                  <div>
                    <p style={{ margin: 0, fontWeight: 600, fontSize: 14 }}>My Review Link</p>
                    <p style={{ margin: 0, fontSize: 12, color: "#94a3b8" }}>Share with customers</p>
                  </div>
                </a>
                <a href="https://www.google.com/search?q=gallatin+cdjr+reviews" target="_blank" style={{ display: "flex", alignItems: "center", gap: 12, padding: 16, backgroundColor: "#334155", borderRadius: 10, textDecoration: "none", color: "#fff" }}>
                  <span style={{ fontSize: 24 }}>⭐</span>
                  <div>
                    <p style={{ margin: 0, fontWeight: 600, fontSize: 14 }}>View Reviews</p>
                    <p style={{ margin: 0, fontSize: 12, color: "#94a3b8" }}>See Google reviews</p>
                  </div>
                </a>
              </div>
            </div>
          </>
        )}

        {activeTab === "leaderboard" && (
          <div style={{ backgroundColor: "#1e293b", borderRadius: 12, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#334155" }}>
                  <th style={{ textAlign: "left", padding: "14px 16px", fontSize: 12, fontWeight: 600, color: "#94a3b8", textTransform: "uppercase" }}>Rank</th>
                  <th style={{ textAlign: "left", padding: "14px 16px", fontSize: 12, fontWeight: 600, color: "#94a3b8", textTransform: "uppercase" }}>Name</th>
                  <th style={{ textAlign: "center", padding: "14px 16px", fontSize: 12, fontWeight: 600, color: "#94a3b8", textTransform: "uppercase" }}>Units</th>
                  <th style={{ textAlign: "center", padding: "14px 16px", fontSize: 12, fontWeight: 600, color: "#94a3b8", textTransform: "uppercase" }}>Activity</th>
                  <th style={{ textAlign: "center", padding: "14px 16px", fontSize: 12, fontWeight: 600, color: "#94a3b8", textTransform: "uppercase" }}>Close %</th>
                  <th style={{ textAlign: "center", padding: "14px 16px", fontSize: 12, fontWeight: 600, color: "#94a3b8", textTransform: "uppercase" }}>Reviews</th>
                  <th style={{ textAlign: "right", padding: "14px 16px", fontSize: 12, fontWeight: 600, color: "#94a3b8", textTransform: "uppercase" }}>Score</th>
                </tr>
              </thead>
              <tbody>
                {sortedRankings.map((r) => {
                  const isMe = r.salesperson.toLowerCase().includes(user.name.split(" ")[0].toLowerCase());
                  return (
                    <tr key={r.salesperson} style={{ borderBottom: "1px solid #334155", backgroundColor: isMe ? "rgba(59, 130, 246, 0.15)" : "transparent" }}>
                      <td style={{ padding: "14px 16px" }}>
                        <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: 8, backgroundColor: r.rank === 1 ? "#eab308" : r.rank === 2 ? "#94a3b8" : r.rank === 3 ? "#cd7f32" : "#334155", color: r.rank <= 3 ? "#000" : "#fff", fontWeight: 700, fontSize: 12 }}>{r.rank}</span>
                      </td>
                      <td style={{ padding: "14px 16px", fontWeight: isMe ? 700 : 500 }}>{r.salesperson} {isMe && <span style={{ color: "#3b82f6" }}>(You)</span>}</td>
                      <td style={{ padding: "14px 16px", textAlign: "center" }}>{r.units_sold}</td>
                      <td style={{ padding: "14px 16px", textAlign: "center" }}>{r.total_activity}</td>
                      <td style={{ padding: "14px 16px", textAlign: "center" }}>{r.closing_pct}%</td>
                      <td style={{ padding: "14px 16px", textAlign: "center" }}>{r.google_reviews}</td>
                      <td style={{ padding: "14px 16px", textAlign: "right", fontWeight: 700 }}>{r.total_score}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "reviews" && (
          <div style={{ backgroundColor: "#1e293b", borderRadius: 12, padding: 24 }}>
            <h3 style={{ margin: "0 0 20px", fontSize: 18, fontWeight: 600 }}>⭐ Your Review Page Stats</h3>
            {myScoreboard ? (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 16 }}>
                <div style={{ backgroundColor: "#334155", borderRadius: 10, padding: 16, textAlign: "center" }}>
                  <p style={{ margin: 0, fontSize: 28, fontWeight: 700 }}>{myScoreboard.page_views}</p>
                  <p style={{ margin: "4px 0 0", fontSize: 12, color: "#94a3b8" }}>Page Views</p>
                </div>
                <div style={{ backgroundColor: "#334155", borderRadius: 10, padding: 16, textAlign: "center" }}>
                  <p style={{ margin: 0, fontSize: 28, fontWeight: 700 }}>{myScoreboard.cta_clicks}</p>
                  <p style={{ margin: "4px 0 0", fontSize: 12, color: "#94a3b8" }}>Review Clicks</p>
                </div>
                <div style={{ backgroundColor: "#334155", borderRadius: 10, padding: 16, textAlign: "center" }}>
                  <p style={{ margin: 0, fontSize: 28, fontWeight: 700 }}>{myScoreboard.contact_saves}</p>
                  <p style={{ margin: "4px 0 0", fontSize: 12, color: "#94a3b8" }}>Contact Saves</p>
                </div>
                <div style={{ backgroundColor: "#334155", borderRadius: 10, padding: 16, textAlign: "center" }}>
                  <p style={{ margin: 0, fontSize: 28, fontWeight: 700 }}>{myScoreboard.referrals_shared}</p>
                  <p style={{ margin: "4px 0 0", fontSize: 12, color: "#94a3b8" }}>Referrals</p>
                </div>
              </div>
            ) : (
              <p style={{ color: "#94a3b8" }}>No review page stats available yet.</p>
            )}
            <div style={{ marginTop: 24, padding: 20, backgroundColor: "#334155", borderRadius: 10 }}>
              <h4 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600 }}>📱 Your Review Link</h4>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <input type="text" readOnly value={"https://gallatincdjr.reviews/review/" + user.slug} style={{ flex: 1, padding: "12px 16px", backgroundColor: "#1e293b", border: "1px solid #475569", borderRadius: 8, color: "#fff", fontSize: 14 }} />
                <button onClick={() => { navigator.clipboard.writeText("https://gallatincdjr.reviews/review/" + user.slug); }} style={{ padding: "12px 20px", backgroundColor: "#3b82f6", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>📋 Copy</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
