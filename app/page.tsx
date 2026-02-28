"use client";

import Link from "next/link";

export default function FullCircleHome() {
  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0a0a0a; }
        .fc-btn {
          display: flex; align-items: center; gap: 16px;
          width: 100%; padding: 20px 24px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          text-decoration: none; color: #fff;
          transition: all 0.2s;
        }
        .fc-btn:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.15);
          transform: translateY(-2px);
        }
        .fc-icon {
          width: 48px; height: 48px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          font-size: 22px; flex-shrink: 0;
        }
        @media (max-width: 480px) {
          .fc-btn { padding: 16px 18px; }
          .fc-icon { width: 40px; height: 40px; font-size: 18px; }
        }
      `}</style>

      <div style={{ minHeight: "100vh", background: "linear-gradient(145deg, #0a0a0a 0%, #0f1a0f 50%, #0a0a0a 100%)", display: "flex", flexDirection: "column" }}>
        
        {/* Subtle glow */}
        <div style={{ position: "fixed", top: "-30%", right: "-15%", width: 600, height: 600, background: "radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

        {/* Header */}
        <header style={{ padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img src="https://res.cloudinary.com/di5ujiwjp/image/upload/v1769923923/vyaxis_logo_qsnlpa.jpg" alt="Vyaxis" style={{ width: 32, height: 32, borderRadius: 7, objectFit: "cover" }} />
            <span style={{ fontSize: 15, fontWeight: 600, color: "#fff" }}>Vyaxis</span>
            <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 14 }}>/</span>
            <span style={{ fontSize: 15, fontWeight: 600, color: "#10b981" }}>FullCircle</span>
          </div>
          <a href="https://app.vyaxis.com" style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", textDecoration: "none", padding: "8px 14px", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8 }}>
            ← Portal
          </a>
        </header>

        {/* Main Content */}
        <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
          <div style={{ width: "100%", maxWidth: 440, position: "relative" }}>
            
            {/* Logo & Title */}
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <div style={{ width: 72, height: 72, background: "linear-gradient(135deg, #059669, #10b981)", borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 32, boxShadow: "0 8px 32px rgba(16,185,129,0.3)" }}>
                ⭐
              </div>
              <h1 style={{ fontSize: 28, fontWeight: 700, color: "#fff", letterSpacing: "-0.5px", marginBottom: 8 }}>FullCircle</h1>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)" }}>Review & Referral System</p>
            </div>

            {/* Navigation Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              
              <Link href="/sales" className="fc-btn">
                <div className="fc-icon" style={{ background: "linear-gradient(135deg, #059669, #10b981)" }}>📊</div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 2 }}>Sales Dashboard</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>View your review links, clicks & scoreboard</div>
                </div>
                <div style={{ marginLeft: "auto", fontSize: 18, color: "rgba(255,255,255,0.2)" }}>→</div>
              </Link>

              <Link href="/admin" className="fc-btn">
                <div className="fc-icon" style={{ background: "linear-gradient(135deg, #7c3aed, #8b5cf6)" }}>⚙️</div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 2 }}>Admin Dashboard</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>Manage reps, view analytics & settings</div>
                </div>
                <div style={{ marginLeft: "auto", fontSize: 18, color: "rgba(255,255,255,0.2)" }}>→</div>
              </Link>

              <Link href="/superadmin" className="fc-btn">
                <div className="fc-icon" style={{ background: "linear-gradient(135deg, #dc2626, #ef4444)" }}>🛡️</div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 2 }}>Super Admin</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>System configuration & data management</div>
                </div>
                <div style={{ marginLeft: "auto", fontSize: 18, color: "rgba(255,255,255,0.2)" }}>→</div>
              </Link>

            </div>

            {/* Rooftop indicator */}
            <div style={{ textAlign: "center", marginTop: 32, padding: "12px 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981" }}></div>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>Gallatin CDJR</span>
              </div>
            </div>

          </div>
        </main>

        {/* Footer */}
        <footer style={{ padding: "16px 24px", textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.2)" }}>Vyaxis Enterprise · FullCircle v2.0</span>
        </footer>
      </div>
    </>
  );
}
