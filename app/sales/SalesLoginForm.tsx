"use client";

import { useState, useEffect } from "react";

type Props = {
  onLogin: (email: string, password: string) => void;
  error?: string;
};

export default function SalesLoginForm({ onLogin, error }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [resetMessage, setResetMessage] = useState("");

  useEffect(() => {
    const styleId = "sales-login-styles";
    if (!document.getElementById(styleId)) {
      const styleSheet = document.createElement("style");
      styleSheet.id = styleId;
      styleSheet.textContent = "@keyframes pulse { 0%, 100% { opacity: 0.5; transform: scale(1); } 50% { opacity: 0.8; transform: scale(1.1); } } @keyframes spin { to { transform: rotate(360deg); } } .sales-input:focus { border-color: #3b82f6 !important; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2) !important; } .sales-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(59, 130, 246, 0.5); }";
      document.head.appendChild(styleSheet);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await onLogin(email, password);
    setIsLoading(false);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const res = await fetch("/api/sales/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "forgot_password", email: resetEmail }),
      });
      
      const data = await res.json();
      setResetMessage(data.message || "If an account exists, a reset request has been sent to your manager.");
      setResetSent(true);
    } catch {
      setResetMessage("Failed to send reset request. Please try again.");
      setResetSent(true);
    }
    
    setIsLoading(false);
  };

  if (showForgotPassword) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#0a0a0f", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 20, position: "relative", overflow: "hidden", fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at top, rgba(59, 130, 246, 0.12) 0%, transparent 50%), radial-gradient(ellipse at bottom right, rgba(30, 41, 59, 0.5) 0%, transparent 50%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "5%", left: "15%", width: 500, height: 500, background: "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none", animation: "pulse 8s ease-in-out infinite" }} />
        <div style={{ position: "absolute", bottom: "5%", right: "10%", width: 400, height: 400, background: "radial-gradient(circle, rgba(34, 197, 94, 0.1) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(60px)", pointerEvents: "none", animation: "pulse 10s ease-in-out infinite reverse" }} />
        
        <div style={{ position: "relative", backgroundColor: "rgba(15, 23, 42, 0.85)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", borderRadius: 28, padding: "48px 44px", width: "100%", maxWidth: 440, border: "1px solid rgba(255, 255, 255, 0.08)", boxShadow: "0 32px 64px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.03) inset", overflow: "hidden" }}>
          <button onClick={() => { setShowForgotPassword(false); setResetSent(false); setResetMessage(""); }} style={{ position: "absolute", top: 24, left: 24, background: "none", border: "none", color: "#94a3b8", fontSize: 14, cursor: "pointer", padding: "8px 12px", borderRadius: 8, zIndex: 10 }}>← Back to login</button>

          <div style={{ display: "flex", justifyContent: "center", marginBottom: 32, marginTop: 24 }}>
            <img src="https://res.cloudinary.com/di5ujiwjp/image/upload/v1769896426/Sales_Dashboard_Graphic_gd4e8h.png" alt="Gallatin CDJR Sales Dashboard" style={{ width: "100%", height: "auto", objectFit: "cover", display: "block" }} loading="eager" />
          </div>

          <h1 style={{ color: "#ffffff", fontSize: 32, fontWeight: 700, textAlign: "center", margin: "0 0 10px 0", letterSpacing: "-0.8px" }}>Reset Password</h1>
          <p style={{ color: "#94a3b8", fontSize: 16, textAlign: "center", margin: "0 0 32px 0", fontWeight: 400 }}>{resetSent ? "Request submitted" : "Enter your email to request a password reset"}</p>

          {resetSent ? (
            <div style={{ textAlign: "center", padding: 28 }}>
              <div style={{ width: 72, height: 72, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(34, 197, 94, 0.15)", color: "#22c55e", fontSize: 36, borderRadius: "50%", margin: "0 auto 24px", fontWeight: 700 }}>✓</div>
              <p style={{ color: "#94a3b8", fontSize: 15, lineHeight: 1.7, marginBottom: 28 }}>{resetMessage}</p>
              <button onClick={() => { setShowForgotPassword(false); setResetSent(false); setResetMessage(""); }} style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", padding: "18px 28px", fontSize: 16, fontWeight: 600, background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)", color: "#fff", border: "none", borderRadius: 12, cursor: "pointer", boxShadow: "0 4px 16px rgba(59, 130, 246, 0.35)", letterSpacing: "0.3px" }}>Return to Login</button>
            </div>
          ) : (
            <form onSubmit={handleForgotPassword} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ color: "#e2e8f0", fontSize: 14, fontWeight: 600, letterSpacing: "0.2px" }}>Email Address</label>
                <div style={{ position: "relative" }}>
                  <input type="email" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} placeholder="you@gallatincdjr.com" style={{ width: "100%", padding: "16px 18px", paddingRight: 48, fontSize: 16, backgroundColor: "rgba(30, 41, 59, 0.6)", border: "2px solid rgba(71, 85, 105, 0.4)", borderRadius: 12, color: "#fff", outline: "none", transition: "all 0.25s ease", boxSizing: "border-box" }} className="sales-input" required />
                  <span style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", fontSize: 20, opacity: 0.4 }}>✉️</span>
                </div>
              </div>
              <button type="submit" disabled={isLoading || !resetEmail} style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "18px 28px", fontSize: 16, fontWeight: 600, background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)", color: "#fff", border: "none", borderRadius: 12, cursor: isLoading || !resetEmail ? "not-allowed" : "pointer", opacity: isLoading || !resetEmail ? 0.6 : 1, boxShadow: "0 4px 16px rgba(59, 130, 246, 0.35)", letterSpacing: "0.3px", marginTop: 8 }}>{isLoading ? "Sending..." : "Request Password Reset"}</button>
            </form>
          )}
        </div>
        <p style={{ position: "relative", color: "#475569", fontSize: 13, marginTop: 36, textAlign: "center" }}>© 2026 Gallatin CDJR • Part of the WE Auto Family</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0a0a0f", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 20, position: "relative", overflow: "hidden", fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at top, rgba(59, 130, 246, 0.12) 0%, transparent 50%), radial-gradient(ellipse at bottom right, rgba(30, 41, 59, 0.5) 0%, transparent 50%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "5%", left: "15%", width: 500, height: 500, background: "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none", animation: "pulse 8s ease-in-out infinite" }} />
      <div style={{ position: "absolute", bottom: "5%", right: "10%", width: 400, height: 400, background: "radial-gradient(circle, rgba(34, 197, 94, 0.1) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(60px)", pointerEvents: "none", animation: "pulse 10s ease-in-out infinite reverse" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />

      <div style={{ position: "relative", backgroundColor: "rgba(15, 23, 42, 0.85)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", borderRadius: 28, padding: "0 44px 48px 44px", width: "100%", maxWidth: 440, border: "1px solid rgba(255, 255, 255, 0.08)", boxShadow: "0 32px 64px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.03) inset", overflow: "hidden" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 32, marginLeft: -44, marginRight: -44, marginTop: 0 }}>
          <img src="https://res.cloudinary.com/di5ujiwjp/image/upload/v1769896426/Sales_Dashboard_Graphic_gd4e8h.png" alt="Gallatin CDJR Sales Dashboard" style={{ width: "100%", height: "auto", objectFit: "cover", display: "block" }} loading="eager" />
        </div>

        <h1 style={{ color: "#ffffff", fontSize: 32, fontWeight: 700, textAlign: "center", margin: "0 0 10px 0", letterSpacing: "-0.8px" }}>Sales Portal</h1>
        <p style={{ color: "#94a3b8", fontSize: 16, textAlign: "center", margin: "0 0 32px 0", fontWeight: 400 }}>Sign in to view your performance dashboard</p>

        {error && (
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", backgroundColor: "rgba(220, 38, 38, 0.12)", border: "1px solid rgba(220, 38, 38, 0.25)", borderRadius: 12, marginBottom: 24, color: "#fca5a5", fontSize: 14 }}>
            <span style={{ fontSize: 18 }}>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <label style={{ color: "#e2e8f0", fontSize: 14, fontWeight: 600, letterSpacing: "0.2px" }}>Email</label>
            <div style={{ position: "relative" }}>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@gallatincdjr.com" style={{ width: "100%", padding: "16px 18px", paddingRight: 48, fontSize: 16, backgroundColor: "rgba(30, 41, 59, 0.6)", border: "2px solid rgba(71, 85, 105, 0.4)", borderRadius: 12, color: "#fff", outline: "none", transition: "all 0.25s ease", boxSizing: "border-box" }} className="sales-input" autoFocus autoComplete="email" />
              <span style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", fontSize: 20, opacity: 0.4 }}>✉️</span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <label style={{ color: "#e2e8f0", fontSize: 14, fontWeight: 600, letterSpacing: "0.2px" }}>Password</label>
            <div style={{ position: "relative" }}>
              <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" style={{ width: "100%", padding: "16px 18px", paddingRight: 48, fontSize: 16, backgroundColor: "rgba(30, 41, 59, 0.6)", border: "2px solid rgba(71, 85, 105, 0.4)", borderRadius: 12, color: "#fff", outline: "none", transition: "all 0.25s ease", boxSizing: "border-box" }} className="sales-input" autoComplete="current-password" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#64748b", cursor: "pointer", padding: 4, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.6, transition: "opacity 0.2s" }} tabIndex={-1}>
                {showPassword ? (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                ) : (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                )}
              </button>
            </div>
          </div>

          <button type="submit" disabled={isLoading || !email || !password} style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "18px 28px", fontSize: 16, fontWeight: 600, background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)", color: "#fff", border: "none", borderRadius: 12, cursor: isLoading || !email || !password ? "not-allowed" : "pointer", opacity: isLoading || !email || !password ? 0.6 : 1, transition: "all 0.25s ease", boxShadow: "0 4px 16px rgba(59, 130, 246, 0.35)", letterSpacing: "0.3px", marginTop: 8 }} className="sales-btn">
            {isLoading ? (
              <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ display: "inline-block", width: 20, height: 20, border: "2px solid rgba(255,255,255,0.25)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} /> Signing in...
              </span>
            ) : (
              <>Sign In <span style={{ marginLeft: 8 }}>→</span></>
            )}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: 20, color: "#64748b", fontSize: 13 }}>
          <p>Need help logging in? Contact your manager.</p>
          <button type="button" onClick={() => { setShowForgotPassword(true); setResetEmail(email); }} style={{ background: "none", border: "none", color: "#3b82f6", fontSize: 14, cursor: "pointer", padding: "8px 0", marginTop: 8, textDecoration: "underline" }}>Forgot your password?</button>
        </div>

        <div style={{ marginTop: 24, padding: 16, backgroundColor: "rgba(30, 41, 59, 0.5)", borderRadius: 10, border: "1px solid rgba(71, 85, 105, 0.3)" }}>
          <p style={{ margin: 0, fontSize: 11, lineHeight: 1.5, color: "#64748b", textAlign: "center" }}>By signing in, you acknowledge that you are an authorized user and agree to comply with all company policies regarding the handling of confidential business information. Unauthorized access or disclosure of proprietary data, including but not limited to sales figures, customer information, and performance metrics, is strictly prohibited and may result in disciplinary action and/or legal prosecution. All activity is monitored and logged.</p>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 20, paddingTop: 20, borderTop: "1px solid rgba(255, 255, 255, 0.08)", color: "#64748b", fontSize: 13 }}>
          <span style={{ fontSize: 15 }}>🔒</span>
          <span>Secured with 256-bit encryption</span>
        </div>
      </div>

      <p style={{ position: "relative", color: "#475569", fontSize: 13, marginTop: 36, textAlign: "center" }}>© 2026 Gallatin CDJR • Part of the WE Auto Family</p>
    </div>
  );
}
