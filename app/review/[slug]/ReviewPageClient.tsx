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

  const buttonStyle = (bg: string, color: string = "white") => ({
    display: "block",
    width: "100%",
    textAlign: "center" as const,
    padding: "14px 20px",
    borderRadius: 12,
    border: "none",
    fontWeight: 600,
    fontSize: 15,
    background: bg,
    color,
    marginBottom: 10,
    cursor: "pointer",
    textDecoration: "none",
  });

  const secondaryButtonStyle = {
    ...buttonStyle("#fff", "#333"),
    border: "1px solid #ddd",
  };

  return (
    <main style={{ maxWidth: 520, margin: "0 auto", padding: "20px", fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', minHeight: "100vh", background: "linear-gradient(180deg, #fff 0%, #f8f9fa 100%)" }}>
      
      {/* Header Logos */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 16, marginBottom: 20, flexWrap: "wrap" }}>
        <img src="/gallatin-cdjr-logo.png" alt="Gallatin CDJR" style={{ height: 40, objectFit: "contain" }} />
        <img src="/we-auto-logo.png" alt="WE Auto" style={{ height: 36, objectFit: "contain" }} />
      </div>

      {/* Thank You Section */}
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#111", marginBottom: 8 }}>
          Thank You for Choosing Us!
        </h1>
        <p style={{ fontSize: 15, color: "#555", lineHeight: 1.5 }}>
          If <strong>{displayName}</strong> helped you today, we'd love a quick Google review!
        </p>
      </div>

      {/* Primary CTA - Google Review */}
      <button onClick={handleReviewClick} style={{ ...buttonStyle("#D10000"), fontSize: 16, padding: "16px 20px", boxShadow: "0 4px 12px rgba(209,0,0,0.3)" }}>
        ⭐ Leave a 5-Star Google Review
      </button>

      {/* Review Starters */}
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 16, marginBottom: 20 }}>
        <p style={{ fontWeight: 600, fontSize: 14, color: "#333", marginBottom: 10 }}>Quick review starters:</p>
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: "#555", lineHeight: 1.7 }}>
          <li>"Smooth, professional experience from start to finish."</li>
          <li>"{displayName} was helpful, honest, and easy to work with."</li>
          <li>"Great communication and stress-free purchase."</li>
        </ul>
      </div>

      {/* Worry Free Guarantee Banner */}
      <div style={{ marginBottom: 20, textAlign: "center" }}>
        <img src="https://res.cloudinary.com/di5ujiwjp/image/upload/v1769644367/Worry_Free_Guarantee_Banner_Graphic_Logo_nw2hmr.png" alt="Worry Free Guarantee" style={{ maxWidth: "100%", borderRadius: 8 }} />
      </div>

      {/* Section: Stay Connected */}
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: "#111", marginBottom: 12, borderBottom: "2px solid #D10000", paddingBottom: 6, display: "inline-block" }}>📱 Stay Connected</h2>
        
        {phone && (
          <a href={`tel:${phone.replace(/[^0-9]/g, "")}`} style={secondaryButtonStyle}>
            📞 Call/Text {displayName}
          </a>
        )}
        
        <a href={`/api/vcard/${slug}`} onClick={() => handleContactSave("contact")} style={secondaryButtonStyle}>
          📇 Save {displayName}'s Contact
        </a>
        
        <a href="/api/vcard/accessories" onClick={() => handleContactSave("accessories")} style={secondaryButtonStyle}>
          🎨 Save Accessories Contact (Wesley)
        </a>
        
        <a href="/api/vcard/service" onClick={() => handleContactSave("service")} style={secondaryButtonStyle}>
          🔧 Save Service Department Contact
        </a>
      </div>

      {/* Section: Service Your Vehicle */}
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: "#111", marginBottom: 12, borderBottom: "2px solid #D10000", paddingBottom: 6, display: "inline-block" }}>🚗 Service Your Vehicle</h2>
        
        <a href="https://www.gallatincdjr.com/service/schedule/" target="_blank" onClick={() => trackEvent("schedule_service_click")} style={buttonStyle("#1e40af")}>
          🔧 Schedule Your 1st Service
        </a>
        
        <button onClick={() => setShowCalendarOptions(!showCalendarOptions)} style={secondaryButtonStyle}>
          📅 Add Service Reminders to Calendar
        </button>
        
        {showCalendarOptions && (
          <div style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 8, padding: 12, marginTop: -5, marginBottom: 10 }}>
            <button onClick={() => handleCalendarDownload("ics")} style={{ ...secondaryButtonStyle, marginBottom: 8 }}>
              🍎 Apple Calendar / Outlook
            </button>
            <button onClick={() => handleCalendarDownload("google")} style={{ ...secondaryButtonStyle, marginBottom: 0 }}>
              📆 Google Calendar
            </button>
          </div>
        )}
      </div>

      {/* Section: Refer a Friend */}
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: "#111", marginBottom: 12, borderBottom: "2px solid #D10000", paddingBottom: 6, display: "inline-block" }}>🎁 Refer a Friend</h2>
        
        <button onClick={() => setShowReferralModal(true)} style={buttonStyle("#22c55e")}>
          💰 Refer a Friend & Earn Rewards
        </button>
      </div>

      {/* Section: Follow Us */}
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: "#111", marginBottom: 12, borderBottom: "2px solid #D10000", paddingBottom: 6, display: "inline-block" }}>📸 Follow Us</h2>
        
        <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
          <button onClick={() => handleSocialClick("facebook", "https://facebook.com/gallatincdjr")} style={{ width: 56, height: 56, borderRadius: 12, backgroundColor: "#1877F2", color: "white", border: "none", fontSize: 22, cursor: "pointer", fontWeight: 700 }}>f</button>
          <button onClick={() => handleSocialClick("instagram", "https://instagram.com/gallatincdjr")} style={{ width: 56, height: 56, borderRadius: 12, background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)", color: "white", border: "none", fontSize: 22, cursor: "pointer" }}>📷</button>
          <button onClick={() => handleSocialClick("tiktok", "https://tiktok.com/@gallatin.cdjr")} style={{ width: 56, height: 56, borderRadius: 12, backgroundColor: "#000", color: "white", border: "none", fontSize: 22, cursor: "pointer" }}>♪</button>
        </div>
        <p style={{ textAlign: "center", fontSize: 12, color: "#888", marginTop: 8 }}>Share your new ride with #GallatinCDJR</p>
      </div>

      {/* Section: Resources */}
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: "#111", marginBottom: 12, borderBottom: "2px solid #D10000", paddingBottom: 6, display: "inline-block" }}>📋 Helpful Resources</h2>
        
        <a href="https://www.gallatincdjr.com/value-your-trade/" target="_blank" style={secondaryButtonStyle}>
          🔄 Check Your Trade-In Value
        </a>
        <a href="https://www.mopar.com/en-us/my-vehicle.html" target="_blank" style={secondaryButtonStyle}>
          📖 Owner Resources & Manuals
        </a>
        <a href="https://www.gallatincdjr.com/parts-accessories/" target="_blank" style={secondaryButtonStyle}>
          🛒 Shop Accessories
        </a>
      </div>

      {/* Footer Logos */}
      <div style={{ textAlign: "center", paddingTop: 20, borderTop: "1px solid #e5e7eb" }}>
        <img src="/worry-free-logo.png" alt="Worry Free Guarantee" style={{ height: 80, marginBottom: 12 }} />
        <p style={{ fontSize: 11, color: "#888" }}>Part of the WE Auto Family</p>
        <p style={{ fontSize: 11, color: "#888", marginTop: 4 }}>1550 Nashville Pike, Gallatin, TN 37066</p>
      </div>

      {/* Referral Modal */}
      {showReferralModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 20 }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: 24, maxWidth: 400, width: "100%" }}>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🎁 Refer a Friend</h3>
            
            {!referralLink ? (
              <>
                <p style={{ fontSize: 14, color: "#555", marginBottom: 16 }}>
                  Share {displayName}'s contact with friends and family. When they buy, you both win!
                </p>
                <input
                  type="text"
                  placeholder="Your name (optional)"
                  value={referrerName}
                  onChange={(e) => setReferrerName(e.target.value)}
                  style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #ddd", marginBottom: 12, fontSize: 15 }}
                />
                <button onClick={handleCreateReferral} style={{ ...buttonStyle("#22c55e"), marginBottom: 8 }}>
                  Generate My Referral Link
                </button>
              </>
            ) : (
              <>
                <p style={{ fontSize: 14, color: "#555", marginBottom: 12 }}>Your personal referral link:</p>
                <div style={{ background: "#f3f4f6", padding: 12, borderRadius: 8, marginBottom: 12, wordBreak: "break-all", fontSize: 13 }}>
                  {referralLink}
                </div>
                <button onClick={handleShareReferral} style={{ ...buttonStyle("#22c55e"), marginBottom: 8 }}>
                  📤 Share Link
                </button>
                <button onClick={handleCopyReferral} style={{ ...buttonStyle("#1e40af"), marginBottom: 8 }}>
                  {copied ? "✓ Copied!" : "📋 Copy Link"}
                </button>
              </>
            )}
            
            <button onClick={() => { setShowReferralModal(false); setReferralLink(""); }} style={{ ...secondaryButtonStyle, marginBottom: 0 }}>
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
