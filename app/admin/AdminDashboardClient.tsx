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

type Props = {
  scoreboard: ScoreboardRow[];
  referrals: Referral[];
  recentEvents: RecentEvent[];
  totals: Totals;
};

export default function AdminDashboardClient({
  scoreboard,
  referrals,
  recentEvents,
  totals,
}: Props) {
  const [activeTab, setActiveTab] = useState<"scoreboard" | "referrals" | "activity">("scoreboard");

  const conversionRate = totals.pageViews > 0 
    ? ((totals.ctaClicks / totals.pageViews) * 100).toFixed(1) 
    : "0";

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
              <p style={{ fontSize: 14, color: "#94a3b8", margin: "4px 0 0 0" }}>Gallatin CDJR Review System</p>
            </div>
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
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 20px" }}>
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

        {/* Social Stats */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", 
          gap: 12, 
          marginBottom: 32 
        }}>
          <MiniStatCard label="Facebook" value={totals.facebookClicks} color="#1877F2" />
          <MiniStatCard label="Instagram" value={totals.instagramClicks} color="#E4405F" />
          <MiniStatCard label="TikTok" value={totals.tiktokClicks} color="#000000" />
          <MiniStatCard label="Calendar" value={totals.calendarDownloads} color="#059669" />
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          <TabButton active={activeTab === "scoreboard"} onClick={() => setActiveTab("scoreboard")}>
            🏆 Leaderboard
          </TabButton>
          <TabButton active={activeTab === "referrals"} onClick={() => setActiveTab("referrals")}>
            🎁 Referrals
          </TabButton>
          <TabButton active={activeTab === "activity"} onClick={() => setActiveTab("activity")}>
            📋 Recent Activity
          </TabButton>
        </div>

        {/* Tab Content */}
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

        {activeTab === "referrals" && (
          <div style={{ backgroundColor: "#1e293b", borderRadius: 12, overflow: "hidden" }}>
            {referrals.length === 0 ? (
              <div style={{ padding: 40, textAlign: "center", color: "#94a3b8" }}>
                No referrals yet. They'll appear here when customers share referral links!
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
                          <a 
                            href={`/refer/${ref.referral_code}`} 
                            target="_blank"
                            style={{ color: "#3b82f6", textDecoration: "none" }}
                          >
                            View →
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

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
                <a 
                  href={row.review_link} 
                  target="_blank"
                  style={{ color: "#3b82f6", textDecoration: "none", fontSize: 12 }}
                >
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

function MiniStatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div style={{
      backgroundColor: "#1e293b",
      borderRadius: 8,
      padding: 14,
      textAlign: "center"
    }}>
      <div style={{ 
        width: 10, 
        height: 10, 
        borderRadius: "50%", 
        backgroundColor: color, 
        margin: "0 auto 8px" 
      }} />
      <div style={{ fontSize: 20, fontWeight: 700 }}>{value}</div>
      <div style={{ fontSize: 11, color: "#94a3b8" }}>{label}</div>
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

// Helper Functions
function getEventIcon(type: string): string {
  const icons: Record<string, string> = {
    page_view: "👁️",
    cta_click: "⭐",
    facebook_click: "📘",
    instagram_click: "📸",
    tiktok_click: "🎵",
    save_contact: "📇",
    save_service_contact: "🔧",
    save_accessories_contact: "🎨",
    schedule_service_click: "📅",
    referral_share: "🎁",
    calendar_download: "📆",
  };
  return icons[type] || "📋";
}

function formatEventType(type: string): string {
  return type
    .replace(/_/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
}

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "Just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

// Styles
const thStyle: React.CSSProperties = {
  textAlign: "left",
  padding: "12px 16px",
  fontSize: 12,
  fontWeight: 600,
  color: "#94a3b8",
  textTransform: "uppercase",
  letterSpacing: "0.5px"
};

const tdStyle: React.CSSProperties = {
  padding: "12px 16px",
  verticalAlign: "middle"
};
