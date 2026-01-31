"use client";

import { useEffect, useState } from "react";

type Props = {
  slug: string;
  displayName: string;
  phone: string | null;
  email: string | null;
  salespersonId: string | null;
  googleReviewUrl: string;
  utm: { source: string; medium: string; campaign: string };
};

export default function ReviewPageClient({
  slug,
  displayName,
  phone,
  email,
  salespersonId,
  googleReviewUrl,
  utm,
}: Props) {
  const [showReferralModal, setShowReferralModal] = useState(false);
  const [referralLink, setReferralLink] = useState("");
  const [referrerName, setReferrerName] = useState("");
  const [showCalendarOptions, setShowCalendarOptions] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    trackEvent("page_view");
  }, []);

  const trackEvent = async (eventType: string) => {
    await fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event_type: eventType, slug, salesperson_id: salespersonId, utm }),
    }).catch(() => {});
  };

  const handleReviewClick = async () => {
    await trackEvent("cta_click");
    window.location.href = googleReviewUrl;
  };

  const handleSocialClick = async (platform: string, url: string) => {
    await trackEvent(`${platform}_click`);
    window.open(url, "_blank");
  };

  const handleContactSave = async (type: string) => {
    await trackEvent(`save_${type}_contact`);
  };

  const handleCalendarDownload = async (format: string) => {
    await trackEvent("calendar_download");
    if (format === "google") {
      window.open("/api/calendar/service-reminder?format=google", "_blank");
    } else {
      window.location.href = "/api/calendar/service-reminder";
    }
    setShowCalendarOptions(false);
  };

  const handleCreateReferral = async () => {
    const res = await fetch("/api/referral/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, referrer_name: referrerName }),
    });
    const data = await res.json();
    if (data.ok) {
      setReferralLink(data.data.referral_url);
      await trackEvent("referral_share");
    }
  };

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareReferral = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "Check out Gallatin CDJR",
        text: `I had a great experience with ${displayName} at Gallatin CDJR! Check them out:`,
        url: referralLink,
      });
    } else {
      handleCopyReferral();
    }
  };

  const firstName = displayName.split(" ")[0];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      {/* Hero Header */}
      <div style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
        padding: "32px 20px 40px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Subtle pattern overlay */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.03) 0%, transparent 50%)",
          pointerEvents: "none"
        }} />
        
        {/* Logo Row */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 24, marginBottom: 24, position: "relative" }}>
          <img src="/gallatin-cdjr-logo.png" alt="Gallatin CDJR" style={{ height: 50, objectFit: "contain" }} />
          <div style={{ width: 1, height: 40, backgroundColor: "rgba(255,255,255,0.2)" }} />
          <img src="/we-auto-logo.png" alt="WE Auto" style={{ height: 44, objectFit: "contain" }} />
        </div>

        {/* Welcome Text */}
        <h1 style={{
          color: "#ffffff",
          fontSize: 28,
          fontWeight: 700,
          margin: "0 0 8px 0",
          fontFamily: "system-ui, -apple-system, sans-serif",
          letterSpacing: "-0.5px",
          position: "relative"
        }}>
          Welcome to the Family! 🎉
        </h1>
        <p style={{
          color: "rgba(255,255,255,0.7)",
          fontSize: 15,
          margin: 0,
          position: "relative"
        }}>
          Thank you for choosing Gallatin CDJR
        </p>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: 480, margin: "0 auto", padding: "0 16px 32px" }}>
        
        {/* Review Card - Floating */}
        <div style={{
          backgroundColor: "#ffffff",
          borderRadius: 16,
          padding: 24,
          marginTop: -24,
          boxShadow: "0 4px 24px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",
          position: "relative",
          zIndex: 10
        }}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <div style={{
              width: 56,
              height: 56,
              backgroundColor: "#fef3c7",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 12px",
              fontSize: 28
            }}>
              ⭐
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 6px 0" }}>
              How was your experience?
            </h2>
            <p style={{ fontSize: 14, color: "#64748b", margin: 0, lineHeight: 1.5 }}>
              If <strong style={{ color: "#0f172a" }}>{displayName}</strong> made your day, a quick review means the world to us!
            </p>
          </div>

          <button
            onClick={handleReviewClick}
            style={{
              width: "100%",
              padding: "16px 24px",
              backgroundColor: "#dc2626",
              color: "#ffffff",
              border: "none",
              borderRadius: 12,
              fontSize: 16,
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              boxShadow: "0 4px 14px rgba(220, 38, 38, 0.4)",
              transition: "transform 0.2s, box-shadow 0.2s"
            }}
          >
            <span style={{ fontSize: 18 }}>⭐</span>
            Leave a 5-Star Review
          </button>

          {/* Quick Starters */}
          <div style={{ marginTop: 16, padding: 16, backgroundColor: "#f8fafc", borderRadius: 10 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#64748b", margin: "0 0 8px 0", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Copy & Paste Starters
            </p>
            <div style={{ fontSize: 13, color: "#475569", lineHeight: 1.7 }}>
              <p style={{ margin: "0 0 6px 0" }}>• "Smooth, professional experience!"</p>
              <p style={{ margin: "0 0 6px 0" }}>• "{firstName} was amazing to work with."</p>
              <p style={{ margin: 0 }}>• "Highly recommend Gallatin CDJR!"</p>
            </div>
          </div>
        </div>

        {/* Worry Free Banner */}
        <div style={{
          marginTop: 20,
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)"
        }}>
          <img 
            src="https://res.cloudinary.com/di5ujiwjp/image/upload/v1769644367/Worry_Free_Guarantee_Banner_Graphic_Logo_nw2hmr.png" 
            alt="Worry Free Guarantee" 
            style={{ width: "100%", display: "block" }} 
          />
        </div>

        {/* Your Contacts Section */}
        <div style={{ marginTop: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{ width: 32, height: 32, backgroundColor: "#dbeafe", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>📱</div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", margin: 0 }}>Your Contacts</h3>
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {phone && (
              <a href={`tel:${phone.replace(/[^0-9]/g, "")}`} style={cardButtonStyle}>
                <span style={iconBadgeStyle("#dcfce7")}>📞</span>
                <span style={{ flex: 1 }}>Call or Text {firstName}</span>
                <span style={{ color: "#94a3b8", fontSize: 18 }}>→</span>
              </a>
            )}
            
            <a href={`/api/vcard/${slug}`} onClick={() => handleContactSave("contact")} style={cardButtonStyle}>
              <span style={iconBadgeStyle("#e0e7ff")}>👤</span>
              <span style={{ flex: 1 }}>Save {firstName}'s Contact</span>
              <span style={{ color: "#94a3b8", fontSize: 18 }}>↓</span>
            </a>
            
            <a href="/api/vcard/accessories" onClick={() => handleContactSave("accessories")} style={cardButtonStyle}>
              <span style={iconBadgeStyle("#fce7f3")}>🎨</span>
              <span style={{ flex: 1 }}>Save Accessories (Wesley)</span>
              <span style={{ color: "#94a3b8", fontSize: 18 }}>↓</span>
            </a>
            
            <a href="/api/vcard/service" onClick={() => handleContactSave("service")} style={cardButtonStyle}>
              <span style={iconBadgeStyle("#ffedd5")}>🔧</span>
              <span style={{ flex: 1 }}>Save Service Department</span>
              <span style={{ color: "#94a3b8", fontSize: 18 }}>↓</span>
            </a>
          </div>
        </div>

        {/* Service Section */}
        <div style={{ marginTop: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{ width: 32, height: 32, backgroundColor: "#fef3c7", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🚗</div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", margin: 0 }}>Keep Your Vehicle Happy</h3>
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <a href="https://www.gallatincdjr.com/scheduleservice" target="_blank" onClick={() => trackEvent("schedule_service_click")} style={{...cardButtonStyle, backgroundColor: "#1e40af", color: "#fff", border: "none"}}>
              <span style={iconBadgeStyle("#ffffff")}>📅</span>
              <span style={{ flex: 1, fontWeight: 600 }}>Schedule Your First Service</span>
              <span style={{ fontSize: 18 }}>→</span>
            </a>
            
            <button onClick={() => setShowCalendarOptions(!showCalendarOptions)} style={cardButtonStyle as React.CSSProperties}>
              <span style={iconBadgeStyle("#dbeafe")}>🔔</span>
              <span style={{ flex: 1, textAlign: "left" }}>Add Service Reminders</span>
              <span style={{ color: "#94a3b8", fontSize: 14 }}>{showCalendarOptions ? "▲" : "▼"}</span>
            </button>
            
            {showCalendarOptions && (
              <div style={{ backgroundColor: "#f1f5f9", borderRadius: 10, padding: 12, display: "flex", flexDirection: "column", gap: 8 }}>
                <button onClick={() => handleCalendarDownload("ics")} style={miniButtonStyle}>
                  🍎 Apple Calendar / Outlook
                </button>
                <button onClick={() => handleCalendarDownload("google")} style={miniButtonStyle}>
                  📆 Google Calendar
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Referral Section */}
        <div style={{ marginTop: 28 }}>
          <div style={{
            background: "linear-gradient(135deg, #059669 0%, #10b981 100%)",
            borderRadius: 16,
            padding: 24,
            textAlign: "center",
            color: "#ffffff"
          }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>🎁</div>
            <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 6px 0" }}>Share the Love</h3>
            <p style={{ fontSize: 14, opacity: 0.9, margin: "0 0 16px 0" }}>
              Refer friends & family — everyone wins!
            </p>
            <button
              onClick={() => setShowReferralModal(true)}
              style={{
                backgroundColor: "#ffffff",
                color: "#059669",
                border: "none",
                borderRadius: 10,
                padding: "12px 24px",
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
                width: "100%"
              }}
            >
              Get Your Referral Link
            </button>
          </div>
        </div>

        {/* Social Section */}
        <div style={{ marginTop: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{ width: 32, height: 32, backgroundColor: "#fae8ff", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>📸</div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", margin: 0 }}>Follow the Journey</h3>
          </div>
          
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => handleSocialClick("facebook", "https://facebook.com/gallatincdjr")} style={socialButtonStyle("#1877F2")}>
              <span style={{ fontSize: 22, fontWeight: 700 }}>f</span>
            </button>
            <button onClick={() => handleSocialClick("instagram", "https://instagram.com/gallatincdjr")} style={{...socialButtonStyle(""), background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)"}}>
              <span style={{ fontSize: 20 }}>📷</span>
            </button>
            <button onClick={() => handleSocialClick("tiktok", "https://tiktok.com/@gallatin.cdjr")} style={socialButtonStyle("#000000")}>
              <span style={{ fontSize: 20 }}>♪</span>
            </button>
          </div>
          <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 10, textAlign: "center" }}>
            Share your new ride! 📸 <span style={{ color: "#64748b" }}>#GallatinCDJR</span>
          </p>
        </div>

        {/* Resources Section */}
        <div style={{ marginTop: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{ width: 32, height: 32, backgroundColor: "#e0e7ff", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>📋</div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", margin: 0 }}>Helpful Resources</h3>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <a href="https://www.gallatincdjr.com/value-your-trade/" target="_blank" style={resourceCardStyle}>
              <span style={{ fontSize: 20, marginBottom: 4 }}>🔄</span>
              <span style={{ fontSize: 12, fontWeight: 600 }}>Trade-In Value</span>
            </a>
            <a href="https://www.mopar.com/en-us/my-vehicle.html" target="_blank" style={resourceCardStyle}>
              <span style={{ fontSize: 20, marginBottom: 4 }}>📖</span>
              <span style={{ fontSize: 12, fontWeight: 600 }}>Owner Resources</span>
            </a>
            <a href="https://www.gallatincdjr.com/parts-accessories/" target="_blank" style={resourceCardStyle}>
              <span style={{ fontSize: 20, marginBottom: 4 }}>🛒</span>
              <span style={{ fontSize: 12, fontWeight: 600 }}>Shop Parts</span>
            </a>
            <a href="https://www.gallatincdjr.com/new-inventory/" target="_blank" style={resourceCardStyle}>
              <span style={{ fontSize: 20, marginBottom: 4 }}>🚘</span>
              <span style={{ fontSize: 12, fontWeight: 600 }}>New Inventory</span>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: 32, textAlign: "center" }}>
          <div style={{
            background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
            borderRadius: 16,
            padding: 20,
            marginBottom: 16
          }}>
            <img src="/worry-free-logo.png" alt="Worry Free Guarantee" style={{ height: 70, marginBottom: 8 }} />
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, margin: 0 }}>Your purchase is protected.</p>
          </div>
          
          <p style={{ fontSize: 12, color: "#94a3b8", margin: "0 0 4px 0" }}>
            Part of the <strong style={{ color: "#64748b" }}>WE Auto</strong> Family
          </p>
          <p style={{ fontSize: 11, color: "#94a3b8", margin: 0 }}>
            1290 Nashville Pike, Gallatin, TN 37066
          </p>
          <p style={{ fontSize: 11, color: "#cbd5e1", marginTop: 8 }}>
            Sales: Mon-Sat 9AM-8PM • Service: Mon-Fri 7:30AM-6PM
          </p>
        </div>
      </div>

      {/* Referral Modal */}
      {showReferralModal && (
        <div style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: 20,
          backdropFilter: "blur(4px)"
        }}>
          <div style={{
            backgroundColor: "#ffffff",
            borderRadius: 20,
            padding: 28,
            maxWidth: 380,
            width: "100%",
            boxShadow: "0 25px 50px rgba(0,0,0,0.25)"
          }}>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ fontSize: 40, marginBottom: 8 }}>🎁</div>
              <h3 style={{ fontSize: 22, fontWeight: 700, color: "#0f172a", margin: "0 0 4px 0" }}>
                Refer a Friend
              </h3>
              <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>
                Share {firstName}'s info with someone special
              </p>
            </div>
            
            {!referralLink ? (
              <>
                <input
                  type="text"
                  placeholder="Your name (optional)"
                  value={referrerName}
                  onChange={(e) => setReferrerName(e.target.value)}
                  style={{
                    width: "100%",
                    padding: 14,
                    borderRadius: 10,
                    border: "2px solid #e2e8f0",
                    marginBottom: 12,
                    fontSize: 15,
                    outline: "none",
                    boxSizing: "border-box"
                  }}
                />
                <button
                  onClick={handleCreateReferral}
                  style={{
                    width: "100%",
                    padding: 14,
                    backgroundColor: "#059669",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: 10,
                    fontSize: 15,
                    fontWeight: 700,
                    cursor: "pointer"
                  }}
                >
                  Generate My Link
                </button>
              </>
            ) : (
              <>
                <div style={{
                  backgroundColor: "#f1f5f9",
                  padding: 14,
                  borderRadius: 10,
                  marginBottom: 12,
                  wordBreak: "break-all",
                  fontSize: 13,
                  color: "#475569",
                  fontFamily: "monospace"
                }}>
                  {referralLink}
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={handleShareReferral}
                    style={{
                      flex: 1,
                      padding: 14,
                      backgroundColor: "#059669",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: 10,
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: "pointer"
                    }}
                  >
                    📤 Share
                  </button>
                  <button
                    onClick={handleCopyReferral}
                    style={{
                      flex: 1,
                      padding: 14,
                      backgroundColor: "#1e40af",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: 10,
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: "pointer"
                    }}
                  >
                    {copied ? "✓ Copied!" : "📋 Copy"}
                  </button>
                </div>
              </>
            )}
            
            <button
              onClick={() => { setShowReferralModal(false); setReferralLink(""); }}
              style={{
                width: "100%",
                marginTop: 12,
                padding: 12,
                backgroundColor: "transparent",
                color: "#64748b",
                border: "1px solid #e2e8f0",
                borderRadius: 10,
                fontSize: 14,
                cursor: "pointer"
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Style helpers
const cardButtonStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  padding: "14px 16px",
  backgroundColor: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: 12,
  fontSize: 14,
  fontWeight: 500,
  color: "#1e293b",
  textDecoration: "none",
  cursor: "pointer",
  transition: "all 0.2s",
  width: "100%",
  boxSizing: "border-box"
};

const iconBadgeStyle = (bg: string): React.CSSProperties => ({
  width: 36,
  height: 36,
  backgroundColor: bg,
  borderRadius: 10,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 16,
  flexShrink: 0
});

const miniButtonStyle: React.CSSProperties = {
  padding: "12px 16px",
  backgroundColor: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: 8,
  fontSize: 14,
  cursor: "pointer",
  textAlign: "left" as const
};

const socialButtonStyle = (bg: string): React.CSSProperties => ({
  flex: 1,
  height: 52,
  backgroundColor: bg,
  border: "none",
  borderRadius: 12,
  color: "#ffffff",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
});

const resourceCardStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: 16,
  backgroundColor: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: 12,
  textDecoration: "none",
  color: "#1e293b",
  transition: "all 0.2s"
};
