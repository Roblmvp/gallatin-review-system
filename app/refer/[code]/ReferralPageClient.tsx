"use client";

// app/refer/[code]/ReferralPageClient.tsx
// Client component for referral landing page

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
  // Track page view on mount
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

  return (
    <main style={{ maxWidth: 520, margin: "0 auto", padding: "24px 20px", fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', minHeight: "100vh", backgroundColor: "#ffffff" }}>
      
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <img 
          src="https://res.cloudinary.com/di5ujiwjp/image/upload/v1769644367/Worry_Free_Guarantee_Banner_Graphic_Logo_nw2hmr.png"
          alt="Worry Free Guarantee"
          style={{ maxWidth: 200, marginBottom: 16 }}
        />
      </div>

      {/* Referral Message */}
      <div style={{ background: "#f0f9f0", border: "2px solid #22c55e", borderRadius: 12, padding: 20, marginBottom: 24, textAlign: "center" }}>
        <p style={{ fontSize: 18, fontWeight: 600, color: "#166534", margin: 0 }}>
          🎉 You've Been Referred!
        </p>
        <p style={{ fontSize: 14, color: "#166534", margin: "8px 0 0 0" }}>
          {referrerName} recommends {salespersonName}
        </p>
      </div>

      {/* Main Content */}
      <h1 style={{ fontSize: 24, lineHeight: 1.2, marginBottom: 12, fontWeight: 700, color: "#111", textAlign: "center" }}>
        Meet {salespersonName}
      </h1>

      {salespersonTitle && (
        <p style={{ textAlign: "center", color: "#666", marginBottom: 20 }}>
          {salespersonTitle} at Gallatin CDJR
        </p>
      )}

      <p style={{ fontSize: 16, lineHeight: 1.6, marginBottom: 24, color: "#444", textAlign: "center" }}>
        {referrerName} had a great experience and thought you'd appreciate the same personal service. Reach out to {salespersonName} directly!
      </p>

      {/* Contact Buttons */}
      {salespersonPhone && (
        <a
          href={`tel:${salespersonPhone.replace(/[^0-9]/g, "")}`}
          onClick={() => handleContactClick("phone")}
          style={{ display: "block", width: "100%", textAlign: "center", padding: "16px 20px", borderRadius: 12, border: "none", fontWeight: 700, fontSize: 16, background: "#D10000", color: "white", marginBottom: 12, textDecoration: "none", boxShadow: "0 2px 8px rgba(209, 0, 0, 0.3)" }}
        >
          📞 Call {salespersonName}
        </a>
      )}

      {salespersonPhone && (
        <a
          href={`sms:${salespersonPhone.replace(/[^0-9]/g, "")}`}
          onClick={() => handleContactClick("text")}
          style={{ display: "block", width: "100%", textAlign: "center", padding: "16px 20px", borderRadius: 12, fontWeight: 700, fontSize: 16, background: "#22c55e", color: "white", marginBottom: 12, textDecoration: "none" }}
        >
          💬 Text {salespersonName}
        </a>
      )}

      {salespersonEmail && (
        <a
          href={`mailto:${salespersonEmail}?subject=Referred by ${referrerName}`}
          onClick={() => handleContactClick("email")}
          style={{ display: "block", width: "100%", textAlign: "center", padding: "14px 20px", borderRadius: 12, fontWeight: 600, fontSize: 15, border: "1px solid #ddd", color: "#333", background: "#fff", marginBottom: 12, textDecoration: "none" }}
        >
          ✉️ Email {salespersonName}
        </a>
      )}

      {salespersonSlug && (
        <a
          href={`/api/vcard/${salespersonSlug}`}
          onClick={() => handleContactClick("save_contact")}
          style={{ display: "block", width: "100%", textAlign: "center", padding: "14px 20px", borderRadius: 12, fontWeight: 600, fontSize: 15, border: "1px solid #ddd", color: "#333", background: "#fff", marginBottom: 24, textDecoration: "none" }}
        >
          📇 Save Contact to Phone
        </a>
      )}

      {/* Special Offer */}
      <div style={{ background: "#fef3c7", border: "2px solid #f59e0b", borderRadius: 12, padding: 20, marginBottom: 24, textAlign: "center" }}>
        <p style={{ fontSize: 16, fontWeight: 700, color: "#92400e", margin: 0 }}>
          🎁 Referral Special
        </p>
        <p style={{ fontSize: 14, color: "#92400e", margin: "8px 0 0 0" }}>
          Mention this referral for exclusive savings!
        </p>
      </div>

      {/* Trust Footer */}
      <div style={{ textAlign: "center", paddingTop: 20, borderTop: "1px solid #eee" }}>
        <p style={{ fontSize: 12, color: "#888", margin: 0 }}>
          Gallatin CDJR • Part of the WE Auto Family
        </p>
        <p style={{ fontSize: 12, color: "#888", margin: "4px 0 0 0" }}>
          1550 Nashville Pike, Gallatin, TN 37066
        </p>
      </div>
    </main>
  );
}
