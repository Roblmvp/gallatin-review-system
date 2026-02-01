import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dealership Review System | Drive More 5-Star Reviews",
  description: "Turn every customer into a 5-star review. The all-in-one platform for automotive dealerships to collect reviews, track sales performance, and boost retention.",
};

export default function DemoPage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0a0a0f", color: "#fff", fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      
      {/* Hero Section */}
      <div style={{ position: "relative", overflow: "hidden", padding: "0 24px" }}>
        {/* Background Effects */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "100%", background: "radial-gradient(ellipse at top center, rgba(220, 38, 38, 0.15) 0%, transparent 50%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "20%", left: "10%", width: 600, height: 600, background: "radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "40%", right: "5%", width: 500, height: 500, background: "radial-gradient(circle, rgba(220, 38, 38, 0.08) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none" }} />
        
        {/* Navigation */}
        <nav style={{ position: "relative", maxWidth: 1200, margin: "0 auto", padding: "24px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 48, height: 48, background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 700 }}>V</div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.5px" }}>Vyaxis</div>
              <div style={{ fontSize: 11, color: "#64748b", textTransform: "uppercase", letterSpacing: "1px" }}>Review Platform</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <a href="#features" style={{ padding: "10px 20px", fontSize: 14, fontWeight: 500, color: "#94a3b8", textDecoration: "none", borderRadius: 8 }}>Features</a>
            <a href="#contact" style={{ padding: "10px 24px", fontSize: 14, fontWeight: 600, background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)", color: "#fff", textDecoration: "none", borderRadius: 8, boxShadow: "0 4px 12px rgba(220, 38, 38, 0.3)" }}>Get a Demo</a>
          </div>
        </nav>

        {/* Hero Content */}
        <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto", padding: "80px 0 100px", textAlign: "center" }}>
          <div style={{ display: "inline-block", padding: "8px 16px", backgroundColor: "rgba(220, 38, 38, 0.1)", border: "1px solid rgba(220, 38, 38, 0.2)", borderRadius: 100, fontSize: 13, fontWeight: 500, color: "#f87171", marginBottom: 24 }}>
            ⭐ Built by Dealers, for Dealers
          </div>
          <h1 style={{ fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 800, lineHeight: 1.1, margin: "0 0 24px 0", letterSpacing: "-2px", background: "linear-gradient(135deg, #ffffff 0%, #94a3b8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Turn Every Customer Into<br />a 5-Star Review
          </h1>
          <p style={{ fontSize: "clamp(16px, 2vw, 20px)", color: "#94a3b8", maxWidth: 600, margin: "0 auto 40px", lineHeight: 1.6 }}>
            The all-in-one platform that helps your sales team collect more Google reviews, track performance, and build lasting customer relationships.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "16px 32px", fontSize: 16, fontWeight: 600, background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)", color: "#fff", textDecoration: "none", borderRadius: 12, boxShadow: "0 8px 24px rgba(220, 38, 38, 0.4)" }}>
              Schedule a Demo <span style={{ fontSize: 20 }}>→</span>
            </a>
            <Link href="/review/robert" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "16px 32px", fontSize: 16, fontWeight: 600, backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", textDecoration: "none", borderRadius: 12 }}>
              See Live Example
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div style={{ backgroundColor: "rgba(15, 23, 42, 0.5)", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 32, textAlign: "center" }}>
          <div>
            <div style={{ fontSize: 48, fontWeight: 800, background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>+40%</div>
            <div style={{ fontSize: 14, color: "#64748b", marginTop: 4 }}>More Google Reviews</div>
          </div>
          <div>
            <div style={{ fontSize: 48, fontWeight: 800, background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>2 min</div>
            <div style={{ fontSize: 14, color: "#64748b", marginTop: 4 }}>Setup Per Salesperson</div>
          </div>
          <div>
            <div style={{ fontSize: 48, fontWeight: 800, background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>4.8★</div>
            <div style={{ fontSize: 14, color: "#64748b", marginTop: 4 }}>Average Rating Boost</div>
          </div>
          <div>
            <div style={{ fontSize: 48, fontWeight: 800, background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>$0</div>
            <div style={{ fontSize: 14, color: "#64748b", marginTop: 4 }}>Setup Fees</div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, margin: "0 0 16px 0", letterSpacing: "-1px" }}>Everything Your Dealership Needs</h2>
          <p style={{ fontSize: 18, color: "#64748b", maxWidth: 500, margin: "0 auto" }}>Powerful tools designed specifically for automotive sales teams</p>
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {/* Feature 1 */}
          <div style={{ backgroundColor: "rgba(30, 41, 59, 0.5)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 20, padding: 32 }}>
            <div style={{ width: 56, height: 56, background: "linear-gradient(135deg, rgba(220, 38, 38, 0.2) 0%, rgba(220, 38, 38, 0.05) 100%)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 20 }}>⭐</div>
            <h3 style={{ fontSize: 20, fontWeight: 600, margin: "0 0 12px 0" }}>Personal Review Pages</h3>
            <p style={{ fontSize: 15, color: "#94a3b8", lineHeight: 1.6, margin: 0 }}>Each salesperson gets their own branded review page with QR code. Customers scan, tap, and leave a 5-star review in seconds.</p>
          </div>
          
          {/* Feature 2 */}
          <div style={{ backgroundColor: "rgba(30, 41, 59, 0.5)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 20, padding: 32 }}>
            <div style={{ width: 56, height: 56, background: "linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0.05) 100%)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 20 }}>📊</div>
            <h3 style={{ fontSize: 20, fontWeight: 600, margin: "0 0 12px 0" }}>Sales Leaderboard</h3>
            <p style={{ fontSize: 15, color: "#94a3b8", lineHeight: 1.6, margin: 0 }}>Real-time rankings based on units sold, activity, closing rate, and reviews. Gamify performance and drive friendly competition.</p>
          </div>
          
          {/* Feature 3 */}
          <div style={{ backgroundColor: "rgba(30, 41, 59, 0.5)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 20, padding: 32 }}>
            <div style={{ width: 56, height: 56, background: "linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(34, 197, 94, 0.05) 100%)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 20 }}>📱</div>
            <h3 style={{ fontSize: 20, fontWeight: 600, margin: "0 0 12px 0" }}>Digital Business Cards</h3>
            <p style={{ fontSize: 15, color: "#94a3b8", lineHeight: 1.6, margin: 0 }}>One-tap contact saving with photo, phone, email, and service scheduling. Customers never lose your salesperson's info again.</p>
          </div>
          
          {/* Feature 4 */}
          <div style={{ backgroundColor: "rgba(30, 41, 59, 0.5)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 20, padding: 32 }}>
            <div style={{ width: 56, height: 56, background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(139, 92, 246, 0.05) 100%)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 20 }}>📺</div>
            <h3 style={{ fontSize: 20, fontWeight: 600, margin: "0 0 12px 0" }}>Showroom TV Display</h3>
            <p style={{ fontSize: 15, color: "#94a3b8", lineHeight: 1.6, margin: 0 }}>Live leaderboard for your showroom TV. Motivate your team and show customers you have a winning sales culture.</p>
          </div>
          
          {/* Feature 5 */}
          <div style={{ backgroundColor: "rgba(30, 41, 59, 0.5)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 20, padding: 32 }}>
            <div style={{ width: 56, height: 56, background: "linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(245, 158, 11, 0.05) 100%)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 20 }}>🎁</div>
            <h3 style={{ fontSize: 20, fontWeight: 600, margin: "0 0 12px 0" }}>Referral Program</h3>
            <p style={{ fontSize: 15, color: "#94a3b8", lineHeight: 1.6, margin: 0 }}>Built-in referral tracking lets happy customers share unique links. Track who's bringing in new business.</p>
          </div>
          
          {/* Feature 6 */}
          <div style={{ backgroundColor: "rgba(30, 41, 59, 0.5)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 20, padding: 32 }}>
            <div style={{ width: 56, height: 56, background: "linear-gradient(135deg, rgba(236, 72, 153, 0.2) 0%, rgba(236, 72, 153, 0.05) 100%)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 20 }}>🔐</div>
            <h3 style={{ fontSize: 20, fontWeight: 600, margin: "0 0 12px 0" }}>Secure Admin Portal</h3>
            <p style={{ fontSize: 15, color: "#94a3b8", lineHeight: 1.6, margin: 0 }}>Full control over users, permissions, and activity logs. Enterprise-grade security with role-based access.</p>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div style={{ backgroundColor: "rgba(15, 23, 42, 0.3)", padding: "100px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, margin: "0 0 16px 0", letterSpacing: "-1px" }}>How It Works</h2>
            <p style={{ fontSize: 18, color: "#64748b", maxWidth: 500, margin: "0 auto" }}>Get up and running in less than a day</p>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 32 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ width: 64, height: 64, background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 700, margin: "0 auto 20px" }}>1</div>
              <h3 style={{ fontSize: 18, fontWeight: 600, margin: "0 0 8px 0" }}>We Set You Up</h3>
              <p style={{ fontSize: 15, color: "#94a3b8", lineHeight: 1.6, margin: 0 }}>We create your dealership portal and add all your salespeople in under an hour.</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ width: 64, height: 64, background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 700, margin: "0 auto 20px" }}>2</div>
              <h3 style={{ fontSize: 18, fontWeight: 600, margin: "0 0 8px 0" }}>Print QR Codes</h3>
              <p style={{ fontSize: 15, color: "#94a3b8", lineHeight: 1.6, margin: 0 }}>Each salesperson gets a unique QR code to share with customers at delivery.</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ width: 64, height: 64, background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 700, margin: "0 auto 20px" }}>3</div>
              <h3 style={{ fontSize: 18, fontWeight: 600, margin: "0 0 8px 0" }}>Watch Reviews Grow</h3>
              <p style={{ fontSize: 15, color: "#94a3b8", lineHeight: 1.6, margin: 0 }}>Customers scan, tap, and leave 5-star reviews. Track everything in real-time.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div id="contact" style={{ backgroundColor: "rgba(220, 38, 38, 0.05)", borderTop: "1px solid rgba(220, 38, 38, 0.1)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700, margin: "0 0 16px 0", letterSpacing: "-0.5px" }}>Ready to Drive More Reviews?</h2>
          <p style={{ fontSize: 18, color: "#94a3b8", marginBottom: 32 }}>See how it works with a personalized demo for your dealership.</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="mailto:robert@vyaxis.com?subject=Demo Request" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "16px 32px", fontSize: 16, fontWeight: 600, background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)", color: "#fff", textDecoration: "none", borderRadius: 12, boxShadow: "0 8px 24px rgba(220, 38, 38, 0.4)" }}>
              📧 Request a Demo
            </a>
            <a href="tel:+16155551234" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "16px 32px", fontSize: 16, fontWeight: 600, backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", textDecoration: "none", borderRadius: 12 }}>
              📞 Call Us
            </a>
          </div>
          <p style={{ marginTop: 24, fontSize: 14, color: "#64748b" }}>No credit card required • Free setup • Cancel anytime</p>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "40px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700 }}>V</div>
            <div style={{ fontSize: 14, color: "#64748b" }}>© 2026 Vyaxis • Built for Automotive Dealers</div>
          </div>
          <div style={{ display: "flex", gap: 24 }}>
            <a href="#features" style={{ fontSize: 14, color: "#64748b", textDecoration: "none" }}>Features</a>
            <a href="#contact" style={{ fontSize: 14, color: "#64748b", textDecoration: "none" }}>Contact</a>
            <Link href="/review/robert" style={{ fontSize: 14, color: "#64748b", textDecoration: "none" }}>Live Demo</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
