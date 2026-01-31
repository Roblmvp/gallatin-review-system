"use client";

import { useState, useEffect } from "react";

type Props = {
  onLogin: (email: string, password: string) => void;
  onForgotPassword: (email: string) => Promise<{ success: boolean; message: string }>;
  error?: string;
};

export default function AdminLoginForm({ onLogin, onForgotPassword, error }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);
  const [forgotMessage, setForgotMessage] = useState("");

  // Add keyframes on mount
  useEffect(() => {
    const styleId = "admin-login-styles";
    if (!document.getElementById(styleId)) {
      const styleSheet = document.createElement("style");
      styleSheet.id = styleId;
      styleSheet.textContent = `
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .login-input:focus {
          border-color: #dc2626 !important;
          box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.2) !important;
        }
        .login-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(220, 38, 38, 0.5);
        }
        .forgot-link:hover {
          color: #dc2626;
        }
      `;
      document.head.appendChild(styleSheet);
    }
  }, []);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await onLogin(email, password);
    setIsLoading(false);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await onForgotPassword(forgotEmail);
    setForgotMessage(result.message);
    setForgotSent(true);
    setIsLoading(false);
  };

  // Forgot Password Screen
  if (showForgotPassword) {
    return (
      <div style={styles.container}>
        <div style={styles.backgroundOverlay} />
        <div style={styles.glowOrb1} />
        <div style={styles.glowOrb2} />
        
        <div style={styles.loginCard}>
          <button 
            onClick={() => { setShowForgotPassword(false); setForgotSent(false); setForgotMessage(""); }}
            style={styles.backButton}
          >
            ← Back to login
          </button>

          <div style={styles.logoContainer}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="https://res.cloudinary.com/di5ujiwjp/image/upload/v1769890652/ADMIN_DASHBOARD_LOGO_y5febx.png" 
              alt="Gallatin CDJR Admin" 
              style={styles.logo}
              loading="eager"
            />
          </div>

          <h1 style={styles.title}>Reset Password</h1>
          <p style={styles.subtitle}>
            {forgotSent 
              ? "Check your email for reset instructions"
              : "Enter your email to receive a password reset link"
            }
          </p>

          {forgotSent ? (
            <div style={styles.successMessage}>
              <div style={styles.successIcon}>✓</div>
              <p style={styles.successText}>{forgotMessage}</p>
              <button 
                onClick={() => { setShowForgotPassword(false); setForgotSent(false); setForgotMessage(""); }}
                style={styles.primaryButton}
                className="login-btn"
              >
                Return to Login
              </button>
            </div>
          ) : (
            <form onSubmit={handleForgotPassword} style={styles.form}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Email Address</label>
                <div style={styles.inputWrapper}>
                  <input
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="you@gallatincdjr.com"
                    style={styles.input}
                    className="login-input"
                    required
                  />
                  <span style={styles.inputIcon}>✉️</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || !forgotEmail}
                style={{
                  ...styles.primaryButton,
                  opacity: isLoading || !forgotEmail ? 0.6 : 1,
                  cursor: isLoading || !forgotEmail ? "not-allowed" : "pointer",
                }}
                className="login-btn"
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          )}
        </div>

        <p style={styles.footerText}>© 2026 Gallatin CDJR • Part of the WE Auto Family</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Background Effects */}
      <div style={styles.backgroundOverlay} />
      <div style={styles.glowOrb1} />
      <div style={styles.glowOrb2} />
      <div style={styles.gridPattern} />

      {/* Login Card */}
      <div style={styles.loginCard}>
        {/* Logo */}
        <div style={styles.logoContainer}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="https://res.cloudinary.com/di5ujiwjp/image/upload/v1769890652/ADMIN_DASHBOARD_LOGO_y5febx.png" 
            alt="Gallatin CDJR Admin" 
            style={styles.logo}
            loading="eager"
          />
        </div>

        {/* Title */}
        <h1 style={styles.title}>Welcome Back</h1>
        <p style={styles.subtitle}>Sign in to access your admin dashboard</p>

        {/* Error Message */}
        {error && (
          <div style={styles.errorContainer}>
            <span style={styles.errorIcon}>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handlePasswordSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <div style={styles.inputWrapper}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@gallatincdjr.com"
                style={styles.input}
                className="login-input"
                autoFocus
                autoComplete="email"
              />
              <span style={styles.inputIcon}>✉️</span>
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.inputWrapper}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                style={styles.input}
                className="login-input"
                autoComplete="current-password"
              />
              <span style={styles.inputIcon}>🔒</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !email || !password}
            style={{
              ...styles.primaryButton,
              opacity: isLoading || !email || !password ? 0.6 : 1,
              cursor: isLoading || !email || !password ? "not-allowed" : "pointer",
            }}
            className="login-btn"
          >
            {isLoading ? (
              <span style={styles.loadingSpinner}>
                <span style={styles.spinner} /> Signing in...
              </span>
            ) : (
              <>Sign In <span style={{ marginLeft: 8 }}>→</span></>
            )}
          </button>

          <button
            type="button"
            onClick={() => { setShowForgotPassword(true); setForgotEmail(email); }}
            style={styles.forgotPassword}
            className="forgot-link"
          >
            Forgot your password?
          </button>
        </form>

        {/* Security Note */}
        <div style={styles.securityNote}>
          <span style={styles.securityIcon}>🔒</span>
          <span>Secured with 256-bit encryption</span>
        </div>
      </div>

      {/* Footer */}
      <p style={styles.footerText}>© 2026 Gallatin CDJR • Part of the WE Auto Family</p>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#0a0a0f",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    position: "relative",
    overflow: "hidden",
    fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  backgroundOverlay: {
    position: "absolute",
    inset: 0,
    background: "radial-gradient(ellipse at top, rgba(220, 38, 38, 0.12) 0%, transparent 50%), radial-gradient(ellipse at bottom right, rgba(30, 41, 59, 0.5) 0%, transparent 50%)",
    pointerEvents: "none",
  },
  glowOrb1: {
    position: "absolute",
    top: "5%",
    left: "15%",
    width: 500,
    height: 500,
    background: "radial-gradient(circle, rgba(220, 38, 38, 0.15) 0%, transparent 70%)",
    borderRadius: "50%",
    filter: "blur(80px)",
    pointerEvents: "none",
    animation: "pulse 8s ease-in-out infinite",
  },
  glowOrb2: {
    position: "absolute",
    bottom: "5%",
    right: "10%",
    width: 400,
    height: 400,
    background: "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
    borderRadius: "50%",
    filter: "blur(60px)",
    pointerEvents: "none",
    animation: "pulse 10s ease-in-out infinite reverse",
  },
  gridPattern: {
    position: "absolute",
    inset: 0,
    backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)`,
    backgroundSize: "60px 60px",
    pointerEvents: "none",
  },
  loginCard: {
    position: "relative",
    backgroundColor: "rgba(15, 23, 42, 0.85)",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    borderRadius: 28,
    padding: "0 44px 52px 44px",
    width: "100%",
    maxWidth: 440,
    border: "1px solid rgba(255, 255, 255, 0.08)",
    boxShadow: "0 32px 64px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.03) inset",
    overflow: "hidden",
  },
  backButton: {
    position: "absolute",
    top: 24,
    left: 24,
    background: "none",
    border: "none",
    color: "#94a3b8",
    fontSize: 14,
    cursor: "pointer",
    padding: "8px 12px",
    borderRadius: 8,
    transition: "all 0.2s",
    zIndex: 10,
  },
  logoContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 32,
    marginLeft: -44,
    marginRight: -44,
    marginTop: 0,
  },
  logo: {
    width: "100%",
    height: "auto",
    objectFit: "cover" as const,
    display: "block",
  },
  title: {
    color: "#ffffff",
    fontSize: 32,
    fontWeight: 700,
    textAlign: "center",
    margin: "0 0 10px 0",
    letterSpacing: "-0.8px",
  },
  subtitle: {
    color: "#94a3b8",
    fontSize: 16,
    textAlign: "center",
    margin: "0 0 32px 0",
    fontWeight: 400,
  },
  errorContainer: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "14px 18px",
    backgroundColor: "rgba(220, 38, 38, 0.12)",
    border: "1px solid rgba(220, 38, 38, 0.25)",
    borderRadius: 12,
    marginBottom: 24,
    color: "#fca5a5",
    fontSize: 14,
  },
  errorIcon: {
    fontSize: 18,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  label: {
    color: "#e2e8f0",
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: "0.2px",
  },
  inputWrapper: {
    position: "relative",
  },
  input: {
    width: "100%",
    padding: "16px 18px",
    paddingRight: 48,
    fontSize: 16,
    backgroundColor: "rgba(30, 41, 59, 0.6)",
    border: "2px solid rgba(71, 85, 105, 0.4)",
    borderRadius: 12,
    color: "#fff",
    outline: "none",
    transition: "all 0.25s ease",
    boxSizing: "border-box",
  },
  inputIcon: {
    position: "absolute",
    right: 16,
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: 20,
    opacity: 0.4,
  },
  primaryButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "18px 28px",
    fontSize: 16,
    fontWeight: 600,
    background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
    color: "#fff",
    border: "none",
    borderRadius: 12,
    cursor: "pointer",
    transition: "all 0.25s ease",
    boxShadow: "0 4px 16px rgba(220, 38, 38, 0.35)",
    letterSpacing: "0.3px",
    marginTop: 8,
  },
  loadingSpinner: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  spinner: {
    display: "inline-block",
    width: 20,
    height: 20,
    border: "2px solid rgba(255,255,255,0.25)",
    borderTopColor: "#fff",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  forgotPassword: {
    background: "none",
    border: "none",
    color: "#94a3b8",
    fontSize: 14,
    cursor: "pointer",
    padding: 10,
    textAlign: "center",
    transition: "color 0.2s",
  },
  securityNote: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 28,
    paddingTop: 24,
    borderTop: "1px solid rgba(255, 255, 255, 0.08)",
    color: "#64748b",
    fontSize: 13,
  },
  securityIcon: {
    fontSize: 15,
  },
  footerText: {
    position: "relative",
    color: "#475569",
    fontSize: 13,
    marginTop: 36,
    textAlign: "center",
  },
  successMessage: {
    textAlign: "center",
    padding: 28,
  },
  successIcon: {
    width: 72,
    height: 72,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(34, 197, 94, 0.15)",
    color: "#22c55e",
    fontSize: 36,
    borderRadius: "50%",
    margin: "0 auto 24px",
    fontWeight: 700,
  },
  successText: {
    color: "#94a3b8",
    fontSize: 15,
    lineHeight: 1.7,
    marginBottom: 28,
  },
};
