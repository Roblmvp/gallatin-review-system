"use client";

import { useEffect } from "react";

type Props = {
  referralCode: string;
  referrerName: string;
  salespersonName: string;
  salespersonPhone: string | null;
  salespersonEmail: string | null;
  salespersonTitle: string | null;
  salespersonSlug: string | null;
};

export default function ReferralPageClient({
  referralCode,
  referrerName,
  salespersonName,
  salespersonPhone,
  salespersonEmail,
  salespersonTitle,
  salespersonSlug,
}: Props) {
  useEffect(() => {
    fetch("/api/referral/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        referral_code: referralCode,
        event_type: "page_view",
      }),
    }).catch(() => {});
  }, [referralCode]);

  const handleContactClick = async (type: string) => {
    await fetch("/api/referral/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        referral_code: referralCode,
        event_type: "contact_click",
        contact_type: type,
      }),
    }).catch(() => {});
  };

  const firstName = salespersonName.split(" ")[0];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      {/* Hero Header */}
      <div style={{
        background: "linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%)",
        padding: "32px 20px 40px",
        textAlign: "center",
        position: "relative",
        borderBottom: "1px solid #e2e8f0"
      }}>
        {/* Logo Row */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 20, marginBottom: 24, position: "relative" }}>
          <img src="https://res.cloudinary.com/di5ujiwjp/image/upload/v1769868303/TAA062407W-GallatinLogos-Web-CDJR-2_yn1fwh.png" alt="Gallatin CDJR" style={{ height: 55, objectFit: "contain" }} />
          <div style={{ width: 1, height: 40, backgroundColor: "#cbd5e1" }} />
          <img src="https://res.cloudinary.com/di5ujiwjp/image/upload/v1769868289/WE_Auto_Badge_1_f5djzq.png" alt="WE Auto" style={{ height: 50, objectFit: "contain" }} />
        </div>

        {/* Welcome Text */}
        <h1 style={{
          color: "#0f172a",
          fontSize: 28,
          fontWeight: 700,
          margin: "0 0 8px 0",
          fontFamily: "system-ui, -apple-system, sans-serif",
          letterSpacing: "-0.5px"
        }}>
          You've Been Referred! 🎉
        </h1>
        <p style={{
          color: "#64748b",
          fontSize: 15,
          margin: 0
        }}>
          {referrerName} thinks you'll love working with us
        </p>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: 480, margin: "0 auto", padding: "0 16px 32px" }}>
        
        {/* Referral Card */}
        <div style={{
          backgroundColor: "#ffffff",
          borderRadius: 16,
          padding: 24,
          marginTop: 20,
          boxShadow: "0 4px 24px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",
          position: "relative",
          zIndex: 10
        }}>
          {/* Referral Badge */}
          <div style={{
            background: "linear-gradient(135deg, #059669 0%, #10b981 100%)",
            borderRadius: 12,
            padding: 16,
            marginBottom: 20,
            textAlign: "center",
            color: "#ffffff"
          }}>
            <div style={{ fontSize: 24, marginBottom: 4 }}>🤝</div>
            <p style={{ fontSize: 14, fontWeight: 600, margin: 0 }}>
              Personal Referral from {referrerName}
            </p>
          </div>

          {/* Salesperson Info */}
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <div style={{
              width: 72,
              height: 72,
              backgroundColor: "#dbeafe",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 12px",
              fontSize: 32
            }}>
              👤
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0f172a", margin: "0 0 4px 0" }}>
              {salespersonName}
            </h2>
            {salespersonTitle && (
              <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>
                {salespersonTitle} • Gallatin CDJR
              </p>
            )}
          </div>

          <p style={{ fontSize: 14, color: "#475569", textAlign: "center", lineHeight: 1.6, marginBottom: 20 }}>
            {referrerName} had an amazing experience and wanted to connect you with {firstName} personally. Reach out today!
          </p>

          {/* Contact Buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {salespersonPhone && (
              <a
                href={`tel:${salespersonPhone.replace(/[^0-9]/g, "")}`}
                onClick={() => handleContactClick("phone")}
                style={primaryButtonStyle}
              >
                <span style={{ fontSize: 18 }}>📞</span>
                Call {firstName}
              </a>
            )}

            {salespersonPhone && (
              <a
                href={`sms:${salespersonPhone.replace(/[^0-9]/g, "")}`}
                onClick={() => handleContactClick("text")}
                style={greenButtonStyle}
              >
                <span style={{ fontSize: 18 }}>💬</span>
                Text {firstName}
              </a>
            )}

            {salespersonEmail && (
              <a
                href={`mailto:${salespersonEmail}?subject=Referred by ${referrerName}`}
                onClick={() => handleContactClick("email")}
                style={secondaryButtonStyle}
              >
                <span style={iconBadgeStyle("#e0e7ff")}>✉️</span>
                <span style={{ flex: 1 }}>Email {firstName}</span>
                <span style={{ color: "#94a3b8", fontSize: 18 }}>→</span>
              </a>
            )}

            {salespersonSlug && (
              <a
                href={`/api/vcard/${salespersonSlug}`}
                onClick={() => handleContactClick("save_contact")}
                style={secondaryButtonStyle}
              >
                <span style={iconBadgeStyle("#dbeafe")}>📇</span>
                <span style={{ flex: 1 }}>Save {firstName}'s Contact</span>
                <span style={{ color: "#94a3b8", fontSize: 18 }}>↓</span>
              </a>
            )}
          </div>
        </div>

        {/* Special Offer Banner */}
        <div style={{
          marginTop: 20,
          background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
          borderRadius: 16,
          padding: 24,
          textAlign: "center",
          color: "#78350f",
          boxShadow: "0 4px 14px rgba(245, 158, 11, 0.3)"
        }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🎁</div>
          <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 6px 0" }}>
            Exclusive Referral Offer
          </h3>
          <p style={{ fontSize: 14, margin: 0, opacity: 0.9 }}>
            Mention this referral from {referrerName} for special savings on your purchase!
          </p>
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

        {/* Why Gallatin CDJR */}
        <div style={{ marginTop: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{ width: 32, height: 32, backgroundColor: "#dbeafe", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>✨</div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", margin: 0 }}>Why Gallatin CDJR?</h3>
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={featureRowStyle}>
              <span style={{ fontSize: 20 }}>🛡️</span>
              <span>Worry-Free Guarantee on every purchase</span>
            </div>
            <div style={featureRowStyle}>
              <span style={{ fontSize: 20 }}>💰</span>
              <span>Competitive pricing & financing options</span>
            </div>
            <div style={featureRowStyle}>
              <span style={{ fontSize: 20 }}>🤝</span>
              <span>No-pressure, personalized experience</span>
            </div>
            <div style={featureRowStyle}>
              <span style={{ fontSize: 20 }}>🔧</span>
              <span>Lifetime service support</span>
            </div>
          </div>
        </div>

        {/* Visit Us */}
        <div style={{ marginTop: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{ width: 32, height: 32, backgroundColor: "#fef3c7", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>📍</div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", margin: 0 }}>Visit Us</h3>
          </div>
          
          <a 
            href="https://www.google.com/maps/dir/?api=1&destination=1290+Nashville+Pike+Gallatin+TN+37066" 
            target="_blank"
            style={secondaryButtonStyle}
          >
            <span style={iconBadgeStyle("#dcfce7")}>🗺️</span>
            <span style={{ flex: 1 }}>Get Directions</span>
            <span style={{ color: "#94a3b8", fontSize: 18 }}>→</span>
          </a>
          
          <div style={{ marginTop: 12, padding: 16, backgroundColor: "#f8fafc", borderRadius: 12, fontSize: 13, color: "#64748b", lineHeight: 1.6 }}>
            <strong style={{ color: "#0f172a" }}>Gallatin CDJR</strong><br />
            1290 Nashville Pike, Gallatin, TN 37066<br />
            <span style={{ color: "#475569" }}>Sales:</span> Mon-Sat 9AM-8PM<br />
            <span style={{ color: "#475569" }}>Service:</span> Mon-Fri 7:30AM-6PM
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
            <img src="https://res.cloudinary.com/di5ujiwjp/image/upload/v1769868289/MSG-CDJR_cfgryx.png" alt="Worry Free Guarantee" style={{ height: 80, marginBottom: 8 }} />
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, margin: 0 }}>Your purchase is protected.</p>
          </div>
          
          <p style={{ fontSize: 12, color: "#94a3b8", margin: "0 0 4px 0" }}>
            Part of the <strong style={{ color: "#64748b" }}>WE Auto</strong> Family
          </p>
          <p style={{ fontSize: 11, color: "#94a3b8", margin: 0 }}>
            Referral Code: {referralCode}
          </p>
        </div>
      </div>
    </div>
  );
}

// Style helpers
const primaryButtonStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
  padding: "16px 24px",
  backgroundColor: "#dc2626",
  color: "#ffffff",
  border: "none",
  borderRadius: 12,
  fontSize: 16,
  fontWeight: 700,
  textDecoration: "none",
  boxShadow: "0 4px 14px rgba(220, 38, 38, 0.4)"
};

const greenButtonStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
  padding: "16px 24px",
  backgroundColor: "#16a34a",
  color: "#ffffff",
  border: "none",
  borderRadius: 12,
  fontSize: 16,
  fontWeight: 700,
  textDecoration: "none",
  boxShadow: "0 4px 14px rgba(22, 163, 74, 0.3)"
};

const secondaryButtonStyle: React.CSSProperties = {
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
  cursor: "pointer"
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

const featureRowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  padding: "12px 16px",
  backgroundColor: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: 10,
  fontSize: 14,
  color: "#334155"
};
