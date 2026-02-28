"use client";

import Link from "next/link";

export default function FullCircleLandingPage() {
  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }

        .nav-container {
          max-width: 1200px; margin: 0 auto;
          padding: 16px 24px;
          display: flex; justify-content: space-between; align-items: center;
        }
        .nav-link {
          font-size: 14px; font-weight: 500; color: #475569;
          text-decoration: none; transition: color 0.2s;
        }
        .nav-link:hover { color: #0f172a; }

        .hero-title {
          font-size: 64px; font-weight: 800;
          line-height: 1.05; letter-spacing: -2.5px; color: #fff;
        }
        .feature-card {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px; padding: 28px;
          transition: background 0.2s, transform 0.2s;
        }
        .feature-card:hover {
          background: rgba(255,255,255,0.1);
          transform: translateY(-3px);
        }
        .section-title {
          font-size: 40px; font-weight: 800;
          letter-spacing: -1.5px; color: #0f172a;
        }
        .step-num {
          width: 48px; height: 48px; border-radius: 50%;
          background: linear-gradient(135deg, #059669, #10b981);
          color: #fff; font-size: 20px; font-weight: 800;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .stat-box {
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 16px; padding: 28px 24px; text-align: center;
        }

        @media (max-width: 768px) {
          .hero-title { font-size: 40px; }
          .section-title { font-size: 30px; }
          .features-grid { grid-template-columns: 1fr !important; }
          .steps-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .hero-title { font-size: 32px; }
          .stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, backgroundColor: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid #e2e8f0", zIndex: 100 }}>
        <div className="nav-container">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Link href="https://vyaxis.com">
              <img src="https://res.cloudinary.com/di5ujiwjp/image/upload/v1769923923/vyaxis_logo_qsnlpa.jpg" alt="Vyaxis" style={{ width: 40, height: 40, borderRadius: 9, objectFit: "cover" }} />
            </Link>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Link href="https://vyaxis.com" style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", textDecoration: "none" }}>Vyaxis</Link>
              <span style={{ color: "#cbd5e1", fontSize: 16 }}>/</span>
              <span style={{ fontSize: 16, fontWeight: 600, color: "#059669" }}>FullCircle</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            <Link href="https://vyaxis.com/drivepulse" className="nav-link">DrivePulse</Link>
            <Link href="https://vyaxis.com/servicebridge" className="nav-link">ServiceBridge</Link>
            <Link href="https://vyaxis.com/flooriq" className="nav-link">FloorIQ</Link>
            <a href="mailto:hello@vyaxis.com?subject=FullCircle Demo" style={{ padding: "10px 20px", fontSize: 14, fontWeight: 600, background: "linear-gradient(135deg, #059669, #10b981)", color: "#fff", textDecoration: "none", borderRadius: 8 }}>
              Get a Demo →
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <div style={{ background: "linear-gradient(135deg, #022c22 0%, #064e3b 50%, #022c22 100%)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-20%", right: "-10%", width: 700, height: 700, background: "radial-gradient(circle, rgba(16,185,129,0.3) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-20%", left: "-10%", width: 500, height: 500, background: "radial-gradient(circle, rgba(5,150,105,0.2) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "100px 24px 120px", position: "relative" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 100, padding: "6px 16px", marginBottom: 32 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#6ee7b7", display: "inline-block" }}></span>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6ee7b7" }}>Review System · Live at Gallatin CDJR</span>
          </div>

          <h1 className="hero-title" style={{ marginBottom: 28, maxWidth: 800 }}>
            Turn Every Sale Into<br />a Five-Star{" "}
            <span style={{ background: "linear-gradient(90deg, #6ee7b7, #a7f3d0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Review</span>
          </h1>

          <p style={{ fontSize: 20, color: "rgba(255,255,255,0.7)", lineHeight: 1.7, maxWidth: 620, marginBottom: 48 }}>
            FullCircle gives every salesperson a personalized review link they text to customers after a deal. Track clicks, measure reviews, and build a 5-star reputation — automatically.
          </p>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <a href="mailto:hello@vyaxis.com?subject=FullCircle Demo Request" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "18px 36px", fontSize: 16, fontWeight: 700, background: "linear-gradient(135deg, #059669, #10b981)", color: "#fff", textDecoration: "none", borderRadius: 10, boxShadow: "0 8px 24px rgba(5,150,105,0.4)" }}>
              📧 Book a Demo
            </a>
            <Link href="/sales" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "18px 36px", fontSize: 16, fontWeight: 600, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", textDecoration: "none", borderRadius: 10 }}>
              See Sales Dashboard →
            </Link>
          </div>
        </div>

        {/* Stats Bar */}
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 80px" }}>
          <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {[
              { num: "200+", label: "Reviews Tracked" },
              { num: "17", label: "Salespeople Active" },
              { num: "4.8★", label: "Avg Google Rating" },
              { num: "<60s", label: "Link Send Time" },
            ].map((s, i) => (
              <div key={i} className="stat-box">
                <div style={{ fontSize: 32, fontWeight: 800, color: "#6ee7b7" }}>{s.num}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div style={{ backgroundColor: "#f8fafc", padding: "100px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#059669", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 12 }}>Features</div>
            <h2 className="section-title">Everything You Need to Build<br />a 5-Star Reputation</h2>
          </div>

          <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {[
              { icon: "🔗", title: "Personalized Review Links", desc: "Each salesperson gets their own branded link. Text it to the customer right from the desk — no app download needed." },
              { icon: "📊", title: "Real-Time Scoreboard", desc: "Live leaderboard shows who's sending links, who's getting clicks, and who's generating the most reviews." },
              { icon: "📱", title: "iMessage Rich Previews", desc: "Links show a beautiful card preview in iMessage and Android Messages — branded with your dealership, not a generic URL." },
              { icon: "🔔", title: "Click & Review Tracking", desc: "Know the moment a customer opens their link and when they leave a Google review. Full attribution, zero guesswork." },
              { icon: "🤝", title: "Referral System Built In", desc: "Customers can refer friends through the same link. Track referral sources and reward your best advocates." },
              { icon: "📈", title: "Manager Dashboard", desc: "Daily, weekly, and monthly metrics at a glance. See which reps are crushing it and who needs a nudge." },
            ].map((f, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16, padding: 28, transition: "transform 0.2s, box-shadow 0.2s" }} onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.08)"; }} onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ fontSize: 32, marginBottom: 16 }}>{f.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div style={{ backgroundColor: "#fff", padding: "100px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#059669", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 12 }}>How It Works</div>
            <h2 className="section-title">Four Steps to More Reviews</h2>
          </div>

          <div className="steps-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 32 }}>
            {[
              { num: "1", title: "Rep Closes a Deal", desc: "After the handshake, the rep opens FullCircle and taps their name. Their personalized link is ready to send." },
              { num: "2", title: "Customer Gets a Text", desc: "The customer receives a beautifully branded link via text. It shows their name and a friendly message asking for a review." },
              { num: "3", title: "One Tap to Google Reviews", desc: "The customer taps the link, sees a clean landing page with the dealership branding, and is guided directly to Google Reviews." },
              { num: "4", title: "Manager Tracks Everything", desc: "Every link sent, every click, every review — tracked on the scoreboard. Managers see real-time performance by rep, by day, by week." },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
                <div className="step-num">{s.num}</div>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", marginBottom: 6 }}>{s.title}</h3>
                  <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.7 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: "linear-gradient(135deg, #022c22 0%, #064e3b 50%, #022c22 100%)", padding: "100px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <h2 style={{ fontSize: 40, fontWeight: 800, color: "#fff", letterSpacing: "-1.5px", marginBottom: 20 }}>
            Your Reputation Is<br />Your Revenue
          </h2>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: 40 }}>
            Schedule a demo to see how FullCircle turns every sale into a five-star review.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="mailto:hello@vyaxis.com?subject=FullCircle Demo Request" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "18px 40px", fontSize: 16, fontWeight: 700, background: "linear-gradient(135deg, #059669, #10b981)", color: "#fff", textDecoration: "none", borderRadius: 10, boxShadow: "0 8px 24px rgba(5,150,105,0.5)" }}>
              📧 Book a Demo
            </a>
            <Link href="/sales" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "18px 36px", fontSize: 16, fontWeight: 600, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", textDecoration: "none", borderRadius: 10 }}>
              See It Live →
            </Link>
          </div>
          <p style={{ marginTop: 24, fontSize: 13, color: "rgba(255,255,255,0.4)" }}>No credit card required • Free setup • Works with any DMS</p>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ backgroundColor: "#0f172a", borderTop: "1px solid rgba(255,255,255,0.08)", padding: "36px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <img src="https://res.cloudinary.com/di5ujiwjp/image/upload/v1769923923/vyaxis_logo_qsnlpa.jpg" alt="Vyaxis" style={{ width: 32, height: 32, borderRadius: 7, objectFit: "cover" }} />
            <span style={{ fontSize: 13, color: "#64748b" }}>© 2026 Vyaxis Inc. All rights reserved.</span>
          </div>
          <div style={{ display: "flex", gap: 24 }}>
            <Link href="https://vyaxis.com" style={{ fontSize: 13, color: "#64748b", textDecoration: "none" }}>Home</Link>
            <Link href="https://vyaxis.com/drivepulse" style={{ fontSize: 13, color: "#64748b", textDecoration: "none" }}>DrivePulse</Link>
            <Link href="https://vyaxis.com/servicebridge" style={{ fontSize: 13, color: "#64748b", textDecoration: "none" }}>ServiceBridge</Link>
            <a href="mailto:hello@vyaxis.com" style={{ fontSize: 13, color: "#64748b", textDecoration: "none" }}>Contact</a>
          </div>
        </div>
      </footer>
    </>
  );
}
