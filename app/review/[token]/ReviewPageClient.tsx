"use client";

// app/review/[token]/ReviewPageClient.tsx
// Client component for tracking and interactivity

import { useEffect } from "react";

type Props = {
  token: string;
  displayName: string;
  customerName: string | null;
  phone: string | null;
  salespersonId: string | null;
  googleReviewUrl: string;
  utm: {
    source: string;
    medium: string;
    campaign: string;
  };
};

export default function ReviewPageClient({
  token,
  displayName,
  customerName,
  phone,
  salespersonId,
  googleReviewUrl,
  utm,
}: Props) {
  // Track page view on mount
  useEffect(() => {
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_type: "page_view",
        token,
        salesperson_id: salespersonId,
        utm,
      }),
    }).catch(() => {}); // fire and forget
  }, [token, salespersonId, utm]);

  // Handle CTA click with tracking
  const handleCtaClick = async () => {
    await fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_type: "cta_click",
        token,
        salesperson_id: salespersonId,
        utm,
      }),
    }).catch(() => {});

    // Navigate to Google Review
    window.location.href = googleReviewUrl;
  };

  // Personalized greeting
  const greeting = customerName
    ? `Thanks for choosing us, ${customerName}!`
    : "Thank you for choosing Gallatin CDJR";

  return (
    <main
      style={{
        maxWidth: 520,
        margin: "0 auto",
        padding: "24px 20px",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        minHeight: "100vh",
        backgroundColor: "#ffffff",
      }}
    >
      {/* Logo / Header */}
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "#D10000",
            letterSpacing: "0.5px",
            textTransform: "uppercase",
          }}
        >
          Gallatin CDJR
        </div>
      </div>

      {/* Main Heading */}
      <h1
        style={{
          fontSize: 26,
          lineHeight: 1.2,
          marginBottom: 12,
          fontWeight: 700,
          color: "#111",
        }}
      >
        {greeting}
      </h1>

      {/* Subheading */}
      <p
        style={{
          fontSize: 16,
          lineHeight: 1.5,
          marginBottom: 24,
          color: "#444",
        }}
      >
        If <strong>{displayName}</strong> helped you today, we'd really
        appreciate a quick Google review. It only takes 30 seconds!
      </p>

      {/* Primary CTA Button */}
      <button
        onClick={handleCtaClick}
        style={{
          display: "block",
          width: "100%",
          textAlign: "center",
          padding: "16px 20px",
          borderRadius: 12,
          border: "none",
          fontWeight: 700,
          fontSize: 16,
          background: "#D10000",
          color: "white",
          marginBottom: 20,
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(209, 0, 0, 0.3)",
          transition: "transform 0.1s, box-shadow 0.1s",
        }}
        onMouseDown={(e) => {
          (e.target as HTMLButtonElement).style.transform = "scale(0.98)";
        }}
        onMouseUp={(e) => {
          (e.target as HTMLButtonElement).style.transform = "scale(1)";
        }}
      >
        ⭐ Leave a 5-Star Google Review
      </button>

      {/* Review Starters Box */}
      <div
        style={{
          background: "#f8f9fa",
          padding: "16px 18px",
          borderRadius: 12,
          marginBottom: 20,
        }}
      >
        <p
          style={{
            margin: "0 0 12px 0",
            fontWeight: 700,
            fontSize: 14,
            color: "#333",
          }}
        >
          Quick review starters (copy & paste):
        </p>
        <ul
          style={{
            margin: 0,
            paddingLeft: 20,
            fontSize: 14,
            lineHeight: 1.6,
            color: "#555",
          }}
        >
          <li style={{ marginBottom: 8 }}>
            "Smooth, professional experience from start to finish."
          </li>
          <li style={{ marginBottom: 8 }}>
            "{displayName} was helpful, honest, and easy to work with."
          </li>
          <li>
            "Great communication and a stress-free purchase."
          </li>
        </ul>
      </div>

      {/* Secondary CTA - Call/Text */}
      {phone && (
        <a
          href={`tel:${phone.replace(/[^0-9]/g, "")}`}
          style={{
            display: "block",
            textAlign: "center",
            padding: "14px 16px",
            borderRadius: 12,
            textDecoration: "none",
            fontWeight: 600,
            fontSize: 15,
            border: "1px solid #ddd",
            color: "#333",
            background: "#fff",
            marginBottom: 20,
          }}
        >
          📞 Need anything? Call/Text {displayName}
        </a>
      )}

      {/* Trust Footer */}
      <div
        style={{
          textAlign: "center",
          paddingTop: 20,
          borderTop: "1px solid #eee",
          marginTop: 10,
        }}
      >
        <p
          style={{
            fontSize: 12,
            color: "#888",
            margin: 0,
          }}
        >
          Part of the WE Auto Family • Worry Free Promise
        </p>
      </div>
    </main>
  );
}
