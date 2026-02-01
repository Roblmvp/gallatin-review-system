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
            <a href="#salesperson-app" style={{ fontSize: 14, fontWeight: 500, color: "#475569", textDecoration: "none" }}>Sales App</a>
            <a href="#how-it-works" style={{ fontSize: 14, fontWeight: 500, color: "#475569", textDecoration: "none" }}>How It Works</a>
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
              From sales KPIs to AI-powered assistance, DrivePulse gives your team the tools to close more deals, retain more customers, and build lasting relationships.
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
            <div style={{ fontSize: 42, fontWeight: 800, color: "#2563eb" }}>+31%</div>
            <div style={{ fontSize: 14, color: "#64748b", marginTop: 4 }}>Service Retention</div>
          </div>
          <div>
            <div style={{ fontSize: 42, fontWeight: 800, color: "#16a34a" }}>+18%</div>
            <div style={{ fontSize: 14, color: "#64748b", marginTop: 4 }}>Repeat Customers</div>
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

      {/* Salesperson App Section - NEW */}
      <div id="salesperson-app" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", padding: "100px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
            <div>
              <div style={{ display: "inline-block", padding: "6px 14px", backgroundColor: "rgba(59, 130, 246, 0.2)", border: "1px solid rgba(59, 130, 246, 0.3)", borderRadius: 100, fontSize: 13, fontWeight: 500, color: "#60a5fa", marginBottom: 24 }}>
                📱 Salesperson Mobile App
              </div>
              <h2 style={{ fontSize: 40, fontWeight: 700, margin: "0 0 20px 0", letterSpacing: "-1px", color: "#fff" }}>
                Your Team's Secret Weapon
              </h2>
              <p style={{ fontSize: 18, color: "#94a3b8", lineHeight: 1.7, margin: "0 0 32px 0" }}>
                Every salesperson gets their own mobile app with real-time KPIs, AI-powered assistance, training modules, and customer engagement tools - all in their pocket.
              </p>
              
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                  <div style={{ width: 48, height: 48, background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>📊</div>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 600, color: "#fff", marginBottom: 4 }}>Live KPI Dashboard</div>
                    <div style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.5 }}>Real-time access to units sold, gross, closing rate, rankings, and dealership pacing vs. goals.</div>
                  </div>
                </div>
                
                <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                  <div style={{ width: 48, height: 48, background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>🤖</div>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 600, color: "#fff", marginBottom: 4 }}>AI Sales Assistant</div>
                    <div style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.5 }}>GPT-powered chat for instant product knowledge, objection handling, and competitive comparisons.</div>
                  </div>
                </div>
                
                <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                  <div style={{ width: 48, height: 48, background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>🎓</div>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 600, color: "#fff", marginBottom: 4 }}>Training Modules</div>
                    <div style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.5 }}>On-demand video training, quizzes, and certifications. Track completion and skill development.</div>
                  </div>
                </div>
                
                <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                  <div style={{ width: 48, height: 48, background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>💬</div>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 600, color: "#fff", marginBottom: 4 }}>One-Tap Review Requests</div>
                    <div style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.5 }}>Send personalized review links via text or email directly from the app after every delivery.</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ position: "relative" }}>
                {/* Phone Frame */}
                <div style={{ width: 280, height: 580, backgroundColor: "#000", borderRadius: 40, padding: 12, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.1)" }}>
                  <div style={{ width: "100%", height: "100%", backgroundColor: "#0f172a", borderRadius: 32, overflow: "hidden" }}>
                    {/* Phone Screen Content */}
                    <div style={{ padding: 20 }}>
                      {/* Status Bar */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>9:41</div>
                        <div style={{ display: "flex", gap: 4 }}>
                          <div style={{ fontSize: 12, color: "#fff" }}>📶</div>
                          <div style={{ fontSize: 12, color: "#fff" }}>🔋</div>
                        </div>
                      </div>
                      
                      {/* App Header */}
                      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                        <div style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: "#dc2626", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                          </svg>
                        </div>
                        <div>
                          <div style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>Good morning, Mike!</div>
                          <div style={{ fontSize: 12, color: "#64748b" }}>You're #1 this month 🏆</div>
                        </div>
                      </div>
                      
                      {/* Quick Stats */}
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
                        <div style={{ backgroundColor: "#1e293b", borderRadius: 12, padding: 14 }}>
                          <div style={{ fontSize: 11, color: "#64748b", marginBottom: 4 }}>Units MTD</div>
                          <div style={{ fontSize: 24, fontWeight: 700, color: "#22c55e" }}>18</div>
                        </div>
                        <div style={{ backgroundColor: "#1e293b", borderRadius: 12, padding: 14 }}>
                          <div style={{ fontSize: 11, color: "#64748b", marginBottom: 4 }}>Gross MTD</div>
                          <div style={{ fontSize: 24, fontWeight: 700, color: "#3b82f6" }}>$42k</div>
                        </div>
                      </div>
                      
                      {/* AI Assistant Preview */}
                      <div style={{ backgroundColor: "#1e293b", borderRadius: 12, padding: 14, marginBottom: 20 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                          <div style={{ fontSize: 16 }}>🤖</div>
                          <div style={{ fontSize: 12, fontWeight: 600, color: "#8b5cf6" }}>AI Assistant</div>
                        </div>
                        <div style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.5 }}>Ask me anything about inventory, pricing, or competitor comparisons...</div>
                      </div>
                      
                      {/* Quick Actions */}
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                        <div style={{ backgroundColor: "#dc2626", borderRadius: 10, padding: 12, textAlign: "center" }}>
                          <div style={{ fontSize: 18, marginBottom: 4 }}>⭐</div>
                          <div style={{ fontSize: 10, color: "#fff", fontWeight: 500 }}>Send Review</div>
                        </div>
                        <div style={{ backgroundColor: "#2563eb", borderRadius: 10, padding: 12, textAlign: "center" }}>
                          <div style={{ fontSize: 18, marginBottom: 4 }}>📊</div>
                          <div style={{ fontSize: 10, color: "#fff", fontWeight: 500 }}>My Stats</div>
                        </div>
                        <div style={{ backgroundColor: "#7c3aed", borderRadius: 10, padding: 12, textAlign: "center" }}>
                          <div style={{ fontSize: 18, marginBottom: 4 }}>🎓</div>
                          <div style={{ fontSize: 10, color: "#fff", fontWeight: 500 }}>Training</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Badge */}
                <div style={{ position: "absolute", top: -10, right: -10, backgroundColor: "#22c55e", color: "#fff", padding: "6px 12px", borderRadius: 100, fontSize: 12, fontWeight: 600, boxShadow: "0 4px 12px rgba(34, 197, 94, 0.4)" }}>
                  iOS & Android
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Retention & Retargeting Section - NEW */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{ display: "inline-block", padding: "6px 14px", backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 100, fontSize: 13, fontWeight: 500, color: "#16a34a", marginBottom: 16 }}>
            🎯 Customer Retention Engine
          </div>
          <h2 style={{ fontSize: 36, fontWeight: 700, margin: "0 0 16px 0", letterSpacing: "-1px", color: "#0f172a" }}>Turn One Sale Into a Lifetime Customer</h2>
          <p style={{ fontSize: 18, color: "#64748b", maxWidth: 600, margin: "0 auto" }}>Automated retention tools and pixel retargeting keep your dealership top-of-mind for service and future sales.</p>
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 32 }}>
          <div style={{ backgroundColor: "#f8fafc", borderRadius: 20, padding: 40, border: "1px solid #e2e8f0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
              <div style={{ width: 56, height: 56, background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>🎯</div>
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 600, margin: 0, color: "#0f172a" }}>Pixel Retargeting</h3>
                <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>Facebook, Instagram & Google</p>
              </div>
            </div>
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.7, marginBottom: 20 }}>
              Every customer who scans their review page is automatically added to your retargeting audiences. Show them service specials, trade-in offers, and new inventory.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <span style={{ padding: "6px 12px", backgroundColor: "#dbeafe", color: "#2563eb", borderRadius: 6, fontSize: 12, fontWeight: 500 }}>Meta Pixel</span>
              <span style={{ padding: "6px 12px", backgroundColor: "#dcfce7", color: "#16a34a", borderRadius: 6, fontSize: 12, fontWeight: 500 }}>Google Ads</span>
              <span style={{ padding: "6px 12px", backgroundColor: "#fef3c7", color: "#d97706", borderRadius: 6, fontSize: 12, fontWeight: 500 }}>Custom Audiences</span>
            </div>
          </div>
          
          <div style={{ backgroundColor: "#f8fafc", borderRadius: 20, padding: 40, border: "1px solid #e2e8f0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
              <div style={{ width: 56, height: 56, background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>🔄</div>
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 600, margin: 0, color: "#0f172a" }}>Automated Retention</h3>
                <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>Service & Sales Follow-up</p>
              </div>
            </div>
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.7, marginBottom: 20 }}>
              Trigger automated campaigns based on purchase date, service intervals, and lease maturity. Keep customers engaged without lifting a finger.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <span style={{ padding: "6px 12px", backgroundColor: "#f3e8ff", color: "#7c3aed", borderRadius: 6, fontSize: 12, fontWeight: 500 }}>Service Reminders</span>
              <span style={{ padding: "6px 12px", backgroundColor: "#fce7f3", color: "#db2777", borderRadius: 6, fontSize: 12, fontWeight: 500 }}>Lease Maturity</span>
              <span style={{ padding: "6px 12px", backgroundColor: "#e0e7ff", color: "#4f46e5", borderRadius: 6, fontSize: 12, fontWeight: 500 }}>Trade-In Offers</span>
            </div>
          </div>
        </div>
        
        {/* Retention Flow Visual */}
        <div style={{ marginTop: 48, backgroundColor: "#0f172a", borderRadius: 20, padding: 40 }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h3 style={{ fontSize: 20, fontWeight: 600, color: "#fff", margin: 0 }}>The Customer Journey Never Ends</h3>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative" }}>
            {/* Connection Line */}
            <div style={{ position: "absolute", top: "50%", left: "10%", right: "10%", height: 2, background: "linear-gradient(90deg, #dc2626, #f59e0b, #22c55e, #3b82f6, #8b5cf6)", opacity: 0.5 }} />
            
            <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
              <div style={{ width: 64, height: 64, backgroundColor: "#dc2626", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, margin: "0 auto 12px" }}>🚗</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>Sale</div>
              <div style={{ fontSize: 11, color: "#64748b" }}>Day 0</div>
            </div>
            
            <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
              <div style={{ width: 64, height: 64, backgroundColor: "#f59e0b", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, margin: "0 auto 12px" }}>⭐</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>Review</div>
              <div style={{ fontSize: 11, color: "#64748b" }}>Day 1-3</div>
            </div>
            
            <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
              <div style={{ width: 64, height: 64, backgroundColor: "#22c55e", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, margin: "0 auto 12px" }}>🔧</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>First Service</div>
              <div style={{ fontSize: 11, color: "#64748b" }}>90 Days</div>
            </div>
            
            <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
              <div style={{ width: 64, height: 64, backgroundColor: "#3b82f6", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, margin: "0 auto 12px" }}>🎯</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>Retargeting</div>
              <div style={{ fontSize: 11, color: "#64748b" }}>Ongoing</div>
            </div>
            
            <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
              <div style={{ width: 64, height: 64, backgroundColor: "#8b5cf6", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, margin: "0 auto 12px" }}>🔄</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>Next Sale</div>
              <div style={{ fontSize: 11, color: "#64748b" }}>2-4 Years</div>
            </div>
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
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
            <div style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 24 }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>📊</div>
              <h3 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 8px 0", color: "#fff" }}>Sales Leaderboard</h3>
              <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.5, margin: 0 }}>Real-time rankings by units, gross, and activity.</p>
            </div>
            
            <div style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 24 }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>🏆</div>
              <h3 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 8px 0", color: "#fff" }}>Salesperson of Month</h3>
              <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.5, margin: 0 }}>Automated recognition and awards.</p>
            </div>
            
            <div style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 24 }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>🎯</div>
              <h3 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 8px 0", color: "#fff" }}>Dealership Pacing</h3>
              <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.5, margin: 0 }}>Track progress vs. monthly goals.</p>
            </div>
            
            <div style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 24 }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>🤖</div>
              <h3 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 8px 0", color: "#fff" }}>AI Sales Assistant</h3>
              <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.5, margin: 0 }}>GPT-powered product knowledge.</p>
            </div>
            
            <div style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 24 }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>📱</div>
              <h3 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 8px 0", color: "#fff" }}>Digital Business Cards</h3>
              <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.5, margin: 0 }}>One-tap contact save for customers.</p>
            </div>
            
            <div style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 24 }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>📅</div>
              <h3 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 8px 0", color: "#fff" }}>Service Reminders</h3>
              <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.5, margin: 0 }}>Auto calendar saves for first service.</p>
            </div>
            
            <div style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 24 }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>🎓</div>
              <h3 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 8px 0", color: "#fff" }}>Training Modules</h3>
              <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.5, margin: 0 }}>On-demand video training & quizzes.</p>
            </div>
            
            <div style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 24 }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>🎯</div>
              <h3 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 8px 0", color: "#fff" }}>Pixel Retargeting</h3>
              <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.5, margin: 0 }}>Auto-build retargeting audiences.</p>
            </div>
            
            <div style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 24 }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>⭐</div>
              <h3 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 8px 0", color: "#fff" }}>Review Pages</h3>
              <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.5, margin: 0 }}>Personal branded review links.</p>
            </div>
            
            <div style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 24 }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>📺</div>
              <h3 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 8px 0", color: "#fff" }}>Showroom TV</h3>
              <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.5, margin: 0 }}>Live leaderboard for your showroom.</p>
            </div>
            
            <div style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 24 }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>🔗</div>
              <h3 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 8px 0", color: "#fff" }}>Social Engagement</h3>
              <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.5, margin: 0 }}>Connect all your social channels.</p>
            </div>
            
            <div style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 24 }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>🎁</div>
              <h3 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 8px 0", color: "#fff" }}>Referral Tracking</h3>
              <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.5, margin: 0 }}>Track who brings in new business.</p>
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
            <h3 style={{ fontSize: 17, fontWeight: 600, margin: "0 0 8px 0", color: "#0f172a" }}>Install App</h3>
            <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.6, margin: 0 }}>Salespeople download the app and access their personalized dashboard.</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ width: 56, height: 56, background: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 700, color: "#fff", margin: "0 auto 20px", boxShadow: "0 4px 14px rgba(22, 163, 74, 0.3)" }}>3</div>
            <h3 style={{ fontSize: 17, fontWeight: 600, margin: "0 0 8px 0", color: "#0f172a" }}>Engage Customers</h3>
            <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.6, margin: 0 }}>Send review requests and let retention automation do the rest.</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ width: 56, height: 56, background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 700, color: "#fff", margin: "0 auto 20px", boxShadow: "0 4px 14px rgba(124, 58, 237, 0.3)" }}>4</div>
            <h3 style={{ fontSize: 17, fontWeight: 600, margin: "0 0 8px 0", color: "#0f172a" }}>Track & Grow</h3>
            <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.6, margin: 0 }}>Monitor KPIs, retarget customers, and watch your business grow.</p>
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
                The AI assistant has been incredible for our newer salespeople. They can get instant answers about features, pricing, and how we stack up against competitors. It's like having a sales trainer available 24/7.
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
                The pixel retargeting changed everything. We're now showing service specials to customers who bought from us years ago. Our service retention is up 31% and we've seen a huge bump in repeat buyers.
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
            <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 8px 0", color: "#0f172a" }}>How does the AI Sales Assistant work?</h3>
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.6, margin: 0 }}>Our AI is trained on your inventory, pricing, manufacturer specs, and competitive data. Salespeople can ask natural questions and get instant, accurate answers right on the lot.</p>
          </div>
          
          <div style={{ backgroundColor: "#f8fafc", borderRadius: 12, padding: 24, border: "1px solid #e2e8f0" }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 8px 0", color: "#0f172a" }}>How does pixel retargeting work?</h3>
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.6, margin: 0 }}>When customers visit their review page, we automatically add them to your Meta and Google retargeting audiences. You can then show them service specials, trade-in offers, and new inventory ads.</p>
          </div>
          
          <div style={{ backgroundColor: "#f8fafc", borderRadius: 12, padding: 24, border: "1px solid #e2e8f0" }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 8px 0", color: "#0f172a" }}>Can I integrate with my existing DMS?</h3>
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.6, margin: 0 }}>Yes! We integrate with most major DMS platforms including CDK, Reynolds, Dealertrack, and more to automatically pull sales data and customer information.</p>
          </div>
          
          <div style={{ backgroundColor: "#f8fafc", borderRadius: 12, padding: 24, border: "1px solid #e2e8f0" }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 8px 0", color: "#0f172a" }}>Is the salesperson app available on both iOS and Android?</h3>
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.6, margin: 0 }}>Yes, the DrivePulse app is available on both the Apple App Store and Google Play Store. It's also available as a progressive web app that works on any device.</p>
          </div>
          
          <div style={{ backgroundColor: "#f8fafc", borderRadius: 12, padding: 24, border: "1px solid #e2e8f0" }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 8px 0", color: "#0f172a" }}>Is there a long-term contract?</h3>
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.6, margin: 0 }}>No long-term contracts required. We offer flexible month-to-month plans because we're confident you'll love the results.</p>
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
            <a href="#salesperson-app" style={{ fontSize: 14, color: "#64748b", textDecoration: "none" }}>Sales App</a>
            <a href="#contact" style={{ fontSize: 14, color: "#64748b", textDecoration: "none" }}>Contact</a>
            <Link href="/review/robert" style={{ fontSize: 14, color: "#64748b", textDecoration: "none" }}>Live Demo</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
