import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DrivePulse by Vyaxis | The Heartbeat of Your Dealership",
  description: "Track sales KPIs, engage customers after delivery, boost Google reviews, and turn every sale into a lasting relationship. The all-in-one dealership performance platform.",
};

export default function DemoPage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#ffffff", color: "#1e293b", fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      
      {/* Navigation */}
      <nav style={{ position: "sticky", top: 0, backgroundColor: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid #e2e8f0", zIndex: 100 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 40, height: 40, background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", letterSpacing: "-0.5px" }}>DrivePulse</div>
              <div style={{ fontSize: 10, color: "#64748b", letterSpacing: "0.5px" }}>by Vyaxis</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <a href="#features" style={{ fontSize: 14, fontWeight: 500, color: "#475569", textDecoration: "none" }}>Features</a>
            <a href="#how-it-works" style={{ fontSize: 14, fontWeight: 500, color: "#475569", textDecoration: "none" }}>How It Works</a>
            <a href="#testimonials" style={{ fontSize: 14, fontWeight: 500, color: "#475569", textDecoration: "none" }}>Testimonials</a>
            <a href="#contact" style={{ padding: "10px 20px", fontSize: 14, fontWeight: 600, background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)", color: "#fff", textDecoration: "none", borderRadius: 8 }}>Get Started →</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-50%", right: "-20%", width: 800, height: 800, background: "radial-gradient(circle, rgba(220, 38, 38, 0.08) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-30%", left: "-10%", width: 600, height: 600, background: "radial-gradient(circle, rgba(59, 130, 246, 0.06) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px 100px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-block", padding: "6px 14px", backgroundColor: "#fef2f2", border: "1px solid #fecaca", borderRadius: 100, fontSize: 13, fontWeight: 500, color: "#dc2626", marginBottom: 24 }}>
              ✨ The Complete Dealership Performance Platform
            </div>
            <h1 style={{ fontSize: 52, fontWeight: 800, lineHeight: 1.1, margin: "0 0 24px 0", letterSpacing: "-2px", color: "#0f172a" }}>
              Track. Engage.<br />Retain. Grow.
            </h1>
            <p style={{ fontSize: 18, color: "#64748b", lineHeight: 1.7, margin: "0 0 32px 0" }}>
              From sales KPIs to post-delivery engagement, DrivePulse gives your team the tools to close more deals and build lasting customer relationships.
            </p>
            <div style={{ display: "flex", gap: 16 }}>
              <a href="#contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", fontSize: 15, fontWeight: 600, background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)", color: "#fff", textDecoration: "none", borderRadius: 10, boxShadow: "0 4px 14px rgba(220, 38, 38, 0.3)" }}>
                Schedule a Demo
              </a>
              <a href="#features" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", fontSize: 15, fontWeight: 600, backgroundColor: "#f8fafc", border: "1px solid #e2e8f0", color: "#475569", textDecoration: "none", borderRadius: 10 }}>
                See Features
              </a>
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ backgroundColor: "#0f172a", borderRadius: 16, padding: 20, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}>
              <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
                <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#ef4444" }} />
                <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#eab308" }} />
                <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#22c55e" }} />
              </div>
              <div style={{ backgroundColor: "#1e293b", borderRadius: 12, padding: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>Sales Leaderboard</div>
                  <div style={{ fontSize: 12, color: "#64748b" }}>Live</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, backgroundColor: "rgba(234, 179, 8, 0.1)", padding: "12px 16px", borderRadius: 8, border: "1px solid rgba(234, 179, 8, 0.2)" }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: "#eab308", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#000" }}>1</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>Mike Thompson</div>
                      <div style={{ fontSize: 12, color: "#64748b" }}>18 units • $42k gross</div>
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: "#22c55e" }}>892</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, backgroundColor: "rgba(148, 163, 184, 0.1)", padding: "12px 16px", borderRadius: 8 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: "#94a3b8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#000" }}>2</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>Sarah Chen</div>
                      <div style={{ fontSize: 12, color: "#64748b" }}>15 units • $38k gross</div>
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>845</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, backgroundColor: "rgba(205, 127, 50, 0.1)", padding: "12px 16px", borderRadius: 8 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: "#cd7f32", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#000" }}>3</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>James Wilson</div>
                      <div style={{ fontSize: 12, color: "#64748b" }}>14 units • $35k gross</div>
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>798</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div style={{ backgroundColor: "#f8fafc", borderTop: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32, textAlign: "center" }}>
          <div>
            <div style={{ fontSize: 42, fontWeight: 800, color: "#dc2626" }}>+47%</div>
            <div style={{ fontSize: 14, color: "#64748b", marginTop: 4 }}>More Google Reviews</div>
          </div>
          <div>
            <div style={{ fontSize: 42, fontWeight: 800, color: "#2563eb" }}>+23%</div>
            <div style={{ fontSize: 14, color: "#64748b", marginTop: 4 }}>Service Retention</div>
          </div>
          <div>
            <div style={{ fontSize: 42, fontWeight: 800, color: "#16a34a" }}>2 min</div>
            <div style={{ fontSize: 14, color: "#64748b", marginTop: 4 }}>Setup Per Salesperson</div>
          </div>
          <div>
            <div style={{ fontSize: 42, fontWeight: 800, color: "#7c3aed" }}>$0</div>
            <div style={{ fontSize: 14, color: "#64748b", marginTop: 4 }}>Setup Fees</div>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <h2 style={{ fontSize: 36, fontWeight: 700, margin: "0 0 16px 0", letterSpacing: "-1px", color: "#0f172a" }}>Why Choose DrivePulse</h2>
          <p style={{ fontSize: 18, color: "#64748b", maxWidth: 600, margin: "0 auto" }}>Everything you need to track performance, engage customers, and grow your dealership.</p>
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
          <div style={{ textAlign: "center", padding: 32 }}>
            <div style={{ width: 64, height: 64, background: "linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20V10"/>
                <path d="M18 20V4"/>
                <path d="M6 20v-4"/>
              </svg>
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 600, margin: "0 0 12px 0", color: "#0f172a" }}>Real-Time KPI Tracking</h3>
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.6, margin: 0 }}>Units sold, gross profit, closing rate, and more. See exactly where your team stands at any moment.</p>
          </div>
          
          <div style={{ textAlign: "center", padding: 32 }}>
            <div style={{ width: 64, height: 64, background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 600, margin: "0 0 12px 0", color: "#0f172a" }}>Post-Delivery Engagement</h3>
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.6, margin: 0 }}>Keep customers connected with service reminders, social links, and one-tap contact saving.</p>
          </div>
          
          <div style={{ textAlign: "center", padding: 32 }}>
            <div style={{ width: 64, height: 64, background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 600, margin: "0 0 12px 0", color: "#0f172a" }}>Review Generation</h3>
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.6, margin: 0 }}>Personal review pages with QR codes make it effortless for happy customers to leave 5-star reviews.</p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" style={{ backgroundColor: "#0f172a", padding: "100px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <h2 style={{ fontSize: 36, fontWeight: 700, margin: "0 0 16px 0", letterSpacing: "-1px", color: "#fff" }}>Powerful Tools. At Your Fingertips.</h2>
            <p style={{ fontSize: 18, color: "#94a3b8", maxWidth: 600, margin: "0 auto" }}>Access a collection of tools designed to streamline operations and boost performance.</p>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            <div style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 28 }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>📊</div>
              <h3 style={{ fontSize: 17, fontWeight: 600, margin: "0 0 10px 0", color: "#fff" }}>Sales Leaderboard</h3>
              <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.6, margin: 0 }}>Real-time rankings by units, gross, activity, and reviews. Gamify your showroom.</p>
            </div>
            
            <div style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 28 }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>🏆</div>
              <h3 style={{ fontSize: 17, fontWeight: 600, margin: "0 0 10px 0", color: "#fff" }}>Salesperson of the Month</h3>
              <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.6, margin: 0 }}>Automated recognition based on customizable scoring metrics.</p>
            </div>
            
            <div style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 28 }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>🎯</div>
              <h3 style={{ fontSize: 17, fontWeight: 600, margin: "0 0 10px 0", color: "#fff" }}>Dealership Pacing</h3>
              <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.6, margin: 0 }}>Track progress vs. monthly goals with visual dashboards and alerts.</p>
            </div>
            
            <div style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 28 }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>📱</div>
              <h3 style={{ fontSize: 17, fontWeight: 600, margin: "0 0 10px 0", color: "#fff" }}>Digital Business Cards</h3>
              <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.6, margin: 0 }}>One-tap contact save with photo, phone, and service scheduling built in.</p>
            </div>
            
            <div style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 28 }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>📅</div>
              <h3 style={{ fontSize: 17, fontWeight: 600, margin: "0 0 10px 0", color: "#fff" }}>Service Reminders</h3>
              <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.6, margin: 0 }}>Customers save first service to calendar automatically. Never lose a service visit.</p>
            </div>
            
            <div style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 28 }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>🔗</div>
              <h3 style={{ fontSize: 17, fontWeight: 600, margin: "0 0 10px 0", color: "#fff" }}>Social Engagement</h3>
              <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.6, margin: 0 }}>Connect customers to your Facebook, Instagram, YouTube, and more.</p>
            </div>
            
            <div style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 28 }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>⭐</div>
              <h3 style={{ fontSize: 17, fontWeight: 600, margin: "0 0 10px 0", color: "#fff" }}>Review Pages</h3>
              <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.6, margin: 0 }}>Personal branded pages for each salesperson with direct Google review links.</p>
            </div>
            
            <div style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 28 }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>📺</div>
              <h3 style={{ fontSize: 17, fontWeight: 600, margin: "0 0 10px 0", color: "#fff" }}>Showroom TV Display</h3>
              <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.6, margin: 0 }}>Live leaderboard for your showroom. Motivate your team and impress customers.</p>
            </div>
            
            <div style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 28 }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>🎁</div>
              <h3 style={{ fontSize: 17, fontWeight: 600, margin: "0 0 10px 0", color: "#fff" }}>Referral Tracking</h3>
              <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.6, margin: 0 }}>Built-in referral program with unique links. Know who brings in new business.</p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div id="how-it-works" style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <h2 style={{ fontSize: 36, fontWeight: 700, margin: "0 0 16px 0", letterSpacing: "-1px", color: "#0f172a" }}>How It Works</h2>
          <p style={{ fontSize: 18, color: "#64748b", maxWidth: 500, margin: "0 auto" }}>Get up and running in less than a day</p>
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 40 }}>
          <div style={{ textAlign: "center", position: "relative" }}>
            <div style={{ width: 56, height: 56, background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 700, color: "#fff", margin: "0 auto 20px", boxShadow: "0 4px 14px rgba(220, 38, 38, 0.3)" }}>1</div>
            <h3 style={{ fontSize: 17, fontWeight: 600, margin: "0 0 8px 0", color: "#0f172a" }}>Quick Setup</h3>
            <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.6, margin: 0 }}>We create your dealership portal and add your team in under an hour.</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ width: 56, height: 56, background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 700, color: "#fff", margin: "0 auto 20px", boxShadow: "0 4px 14px rgba(37, 99, 235, 0.3)" }}>2</div>
            <h3 style={{ fontSize: 17, fontWeight: 600, margin: "0 0 8px 0", color: "#0f172a" }}>Print QR Codes</h3>
            <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.6, margin: 0 }}>Each salesperson gets a unique QR code to share at delivery.</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ width: 56, height: 56, background: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 700, color: "#fff", margin: "0 auto 20px", boxShadow: "0 4px 14px rgba(22, 163, 74, 0.3)" }}>3</div>
            <h3 style={{ fontSize: 17, fontWeight: 600, margin: "0 0 8px 0", color: "#0f172a" }}>Customers Engage</h3>
            <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.6, margin: 0 }}>Customers scan, save contacts, schedule service, and leave reviews.</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ width: 56, height: 56, background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 700, color: "#fff", margin: "0 auto 20px", boxShadow: "0 4px 14px rgba(124, 58, 237, 0.3)" }}>4</div>
            <h3 style={{ fontSize: 17, fontWeight: 600, margin: "0 0 8px 0", color: "#0f172a" }}>Track Everything</h3>
            <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.6, margin: 0 }}>Monitor KPIs, reviews, and engagement in your admin dashboard.</p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div id="testimonials" style={{ backgroundColor: "#f8fafc", padding: "100px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <h2 style={{ fontSize: 36, fontWeight: 700, margin: "0 0 16px 0", letterSpacing: "-1px", color: "#0f172a" }}>What Dealers Are Saying</h2>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 32 }}>
            <div style={{ backgroundColor: "#fff", borderRadius: 16, padding: 32, border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)" }}>
              <div style={{ fontSize: 24, color: "#dc2626", marginBottom: 16 }}>"</div>
              <p style={{ fontSize: 16, color: "#475569", lineHeight: 1.7, margin: "0 0 24px 0" }}>
                DrivePulse transformed how we track performance. Our team is more competitive than ever, and we've seen a 40% increase in Google reviews since implementing it. The service retention tools alone have paid for the platform ten times over.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, backgroundColor: "#dc2626", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 600, fontSize: 18 }}>JM</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a" }}>Jason Miller</div>
                  <div style={{ fontSize: 13, color: "#64748b" }}>General Manager, Premier Auto Group</div>
                </div>
              </div>
            </div>
            
            <div style={{ backgroundColor: "#fff", borderRadius: 16, padding: 32, border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)" }}>
              <div style={{ fontSize: 24, color: "#dc2626", marginBottom: 16 }}>"</div>
              <p style={{ fontSize: 16, color: "#475569", lineHeight: 1.7, margin: "0 0 24px 0" }}>
                The showroom TV leaderboard has been a game-changer for team morale. Salespeople actually ask to see their stats now. Setup was painless and the Vyaxis team has been incredibly responsive to our needs.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, backgroundColor: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 600, fontSize: 18 }}>SR</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a" }}>Sarah Rodriguez</div>
                  <div style={{ fontSize: 13, color: "#64748b" }}>Sales Director, City Motors</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "100px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <h2 style={{ fontSize: 36, fontWeight: 700, margin: "0 0 16px 0", letterSpacing: "-1px", color: "#0f172a" }}>Frequently Asked Questions</h2>
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ backgroundColor: "#f8fafc", borderRadius: 12, padding: 24, border: "1px solid #e2e8f0" }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 8px 0", color: "#0f172a" }}>How long does setup take?</h3>
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.6, margin: 0 }}>Most dealerships are fully operational within 1-2 hours. We handle all the setup for you including adding your salespeople and customizing your branding.</p>
          </div>
          
          <div style={{ backgroundColor: "#f8fafc", borderRadius: 12, padding: 24, border: "1px solid #e2e8f0" }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 8px 0", color: "#0f172a" }}>Can I integrate with my existing DMS?</h3>
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.6, margin: 0 }}>Yes! We can integrate with most major DMS platforms to automatically pull sales data. Contact us for specific integrations.</p>
          </div>
          
          <div style={{ backgroundColor: "#f8fafc", borderRadius: 12, padding: 24, border: "1px solid #e2e8f0" }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 8px 0", color: "#0f172a" }}>Is there a long-term contract?</h3>
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.6, margin: 0 }}>No long-term contracts required. We offer flexible month-to-month plans because we're confident you'll love the results.</p>
          </div>
          
          <div style={{ backgroundColor: "#f8fafc", borderRadius: 12, padding: 24, border: "1px solid #e2e8f0" }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 8px 0", color: "#0f172a" }}>What kind of support do you offer?</h3>
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.6, margin: 0 }}>We provide dedicated support via phone, email, and chat. Our team is made up of automotive industry veterans who understand dealership operations.</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div id="contact" style={{ backgroundColor: "#0f172a", padding: "80px 24px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: 36, fontWeight: 700, margin: "0 0 16px 0", letterSpacing: "-1px", color: "#fff" }}>Ready to Transform Your Dealership?</h2>
          <p style={{ fontSize: 18, color: "#94a3b8", marginBottom: 32 }}>See DrivePulse in action with a personalized demo for your team.</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="mailto:robert@vyaxis.com?subject=DrivePulse Demo Request" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "16px 32px", fontSize: 16, fontWeight: 600, background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)", color: "#fff", textDecoration: "none", borderRadius: 10, boxShadow: "0 4px 14px rgba(220, 38, 38, 0.4)" }}>
              📧 Schedule a Demo
            </a>
            <a href="tel:+16155551234" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "16px 32px", fontSize: 16, fontWeight: 600, backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", textDecoration: "none", borderRadius: 10 }}>
              📞 Call Us
            </a>
          </div>
          <p style={{ marginTop: 24, fontSize: 14, color: "#64748b" }}>No credit card required • Free setup • Cancel anytime</p>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ backgroundColor: "#0f172a", borderTop: "1px solid rgba(255,255,255,0.1)", padding: "40px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
              </svg>
            </div>
            <div style={{ fontSize: 14, color: "#64748b" }}>© 2026 Vyaxis Inc. All rights reserved.</div>
          </div>
          <div style={{ display: "flex", gap: 24 }}>
            <a href="#features" style={{ fontSize: 14, color: "#64748b", textDecoration: "none" }}>Features</a>
            <a href="#how-it-works" style={{ fontSize: 14, color: "#64748b", textDecoration: "none" }}>How It Works</a>
            <a href="#contact" style={{ fontSize: 14, color: "#64748b", textDecoration: "none" }}>Contact</a>
            <Link href="/review/robert" style={{ fontSize: 14, color: "#64748b", textDecoration: "none" }}>Live Demo</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
