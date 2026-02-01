import Link from "next/link";

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0f172a", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 20, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", color: "#fff", textAlign: "center" }}>
      <img src="https://res.cloudinary.com/di5ujiwjp/image/upload/v1769874514/Gallatin_CDJR_App_Icon_xt3irp.png" alt="Gallatin CDJR" style={{ height: 100, borderRadius: 16, marginBottom: 32 }} />
      <h1 style={{ fontSize: 32, fontWeight: 700, margin: "0 0 12px 0" }}>Gallatin CDJR</h1>
      <p style={{ fontSize: 16, color: "#94a3b8", margin: "0 0 40px 0" }}>Review & Performance System</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%", maxWidth: 300 }}>
        <Link href="/sales" style={{ display: "block", padding: "16px 24px", fontSize: 16, fontWeight: 600, background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)", color: "#fff", borderRadius: 12, textDecoration: "none", textAlign: "center" }}>Sales Dashboard</Link>
        <Link href="/admin" style={{ display: "block", padding: "16px 24px", fontSize: 16, fontWeight: 600, background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)", color: "#fff", borderRadius: 12, textDecoration: "none", textAlign: "center" }}>Admin Dashboard</Link>
      </div>
      <p style={{ marginTop: 48, fontSize: 13, color: "#64748b" }}>Part of the WE Auto Family</p>
    </div>
  );
}
