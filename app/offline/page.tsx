import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Offline | Gallatin CDJR",
};

export default function OfflinePage() {
  return (
    <div style={{ 
      minHeight: "100vh", 
      backgroundColor: "#0f172a", 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center", 
      padding: 20,
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      color: "#fff",
      textAlign: "center"
    }}>
      <div style={{
        backgroundColor: "#1e293b",
        borderRadius: 24,
        padding: "48px 40px",
        maxWidth: 400,
        width: "100%",
        border: "1px solid #334155"
      }}>
        <div style={{ fontSize: 64, marginBottom: 24 }}>📡</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: "0 0 12px 0" }}>
          You're Offline
        </h1>
        <p style={{ fontSize: 16, color: "#94a3b8", margin: "0 0 32px 0", lineHeight: 1.6 }}>
          It looks like you've lost your internet connection. Please check your connection and try again.
        </p>
        <button
          onClick={() => window.location.reload()}
          style={{
            width: "100%",
            padding: "16px 24px",
            fontSize: 16,
            fontWeight: 600,
            background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
            color: "#fff",
            border: "none",
            borderRadius: 12,
            cursor: "pointer"
          }}
        >
          Try Again
        </button>
      </div>
      <p style={{ marginTop: 32, fontSize: 13, color: "#64748b" }}>
        Gallatin CDJR • Part of the WE Auto Family
      </p>
    </div>
  );
}
