"use client";

import { useState, useEffect } from "react";

type Props = {
  onLogin: (password: string) => void;
  onSMSLogin?: (phone: string) => void;
  error?: string;
};

export default function AdminLoginForm({ onLogin, onSMSLogin, error }: Props) {
  const [loginMethod, setLoginMethod] = useState<"password" | "sms">("password");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [smsSent, setSmsSent] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);

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
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .login-input:focus {
          border-color: #dc2626 !important;
          box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.2) !important;
        }
        .login-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(220, 38, 38, 0.5);
        }
        .login-tab:hover {
          background-color: rgba(255, 255, 255, 0.05);
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
    await onLogin(password);
    setIsLoading(false);
  };

  const handleSendSMS = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSmsSent(true);
    setIsLoading(false);
  };

  const handleVerifySMS = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (verificationCode.length === 6) {
      await onLogin(verificationCode);
    }
    setIsLoading(false);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setForgotSent(true);
    setIsLoading(false);
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
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
            onClick={() => { setShowForgotPassword(false); setForgotSent(false); }}
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
              width={280}
              height={80}
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
              <p style={styles.successText}>
                If an account exists for <strong>{forgotEmail}</strong>, you will receive an email with instructions shortly.
              </p>
              <button 
                onClick={() => { setShowForgotPassword(false); setForgotSent(false); }}
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
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="you@gallatincdjr.com"
                  style={styles.input}
                  className="login-input"
                  required
                />
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
            width={280}
            height={80}
            loading="eager"
          />
        </div>

        {/* Title */}
        <h1 style={styles.title}>Welcome Back</h1>
        <p style={styles.subtitle}>Sign in to access your admin dashboard</p>

        {/* Login Method Tabs */}
        <div style={styles.tabContainer}>
          <button
            onClick={() => { setLoginMethod("password"); setSmsSent(false); }}
            style={{
              ...styles.tab,
              ...(loginMethod === "password" ? styles.tabActive : {}),
            }}
            className="login-tab"
          >
            <span style={styles.tabIcon}>🔐</span>
            Password
          </button>
          <button
            onClick={() => setLoginMethod("sms")}
            style={{
              ...styles.tab,
              ...(loginMethod === "sms" ? styles.tabActive : {}),
            }}
            className="login-tab"
          >
            <span style={styles.tabIcon}>📱</span>
            SMS Code
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div style={styles.errorContainer}>
            <span style={styles.errorIcon}>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Password Login Form */}
        {loginMethod === "password" && (
          <form onSubmit={handlePasswordSubmit} style={styles.form}>
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
                  autoFocus
                />
                <span style={styles.inputIcon}>🔒</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !password}
              style={{
                ...styles.primaryButton,
                opacity: isLoading || !password ? 0.6 : 1,
                cursor: isLoading || !password ? "not-allowed" : "pointer",
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
              onClick={() => setShowForgotPassword(true)}
              style={styles.forgotPassword}
              className="forgot-link"
            >
              Forgot your password?
            </button>
          </form>
        )}

        {/* SMS Login Form - Enter Phone */}
        {loginMethod === "sms" && !smsSent && (
          <form onSubmit={handleSendSMS} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Phone Number</label>
              <div style={styles.inputWrapper}>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(formatPhone(e.target.value))}
                  placeholder="(615) 555-0123"
                  style={styles.input}
                  className="login-input"
                  maxLength={14}
                  autoFocus
                />
                <span style={styles.inputIcon}>📱</span>
              </div>
              <p style={styles.inputHint}>We will send a 6-digit verification code</p>
            </div>

            <button
              type="submit"
              disabled={isLoading || phone.length < 14}
              style={{
                ...styles.primaryButton,
                opacity: isLoading || phone.length < 14 ? 0.6 : 1,
                cursor: isLoading || phone.length < 14 ? "not-allowed" : "pointer",
              }}
              className="login-btn"
            >
              {isLoading ? (
                <span style={styles.loadingSpinner}>
                  <span style={styles.spinner} /> Sending code...
                </span>
              ) : (
                <>Send Verification Code <span style={{ marginLeft: 8 }}>📨</span></>
              )}
            </button>
          </form>
        )}

        {/* SMS Login Form - Enter Code */}
        {loginMethod === "sms" && smsSent && (
          <form onSubmit={handleVerifySMS} style={styles.form}>
            <div style={styles.smsConfirmation}>
              <div style={styles.smsIcon}>📬</div>
              <p style={styles.smsText}>
                Code sent to <strong>{phone}</strong>
              </p>
              <button 
                type="button" 
                onClick={() => setSmsSent(false)}
                style={styles.changeNumber}
              >
                Change number
              </button>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Verification Code</label>
              <div style={styles.codeInputContainer}>
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={verificationCode[index] || ""}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "");
                      const newCode = verificationCode.split("");
                      newCode[index] = val;
                      setVerificationCode(newCode.join("").slice(0, 6));
                      if (val && index < 5) {
                        const next = e.target.parentElement?.children[index + 1] as HTMLInputElement;
                        next?.focus();
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
                        const prev = (e.target as HTMLElement).parentElement?.children[index - 1] as HTMLInputElement;
                        prev?.focus();
                      }
                    }}
                    style={styles.codeInput}
                    className="login-input"
                    autoFocus={index === 0}
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || verificationCode.length < 6}
              style={{
                ...styles.primaryButton,
                opacity: isLoading || verificationCode.length < 6 ? 0.6 : 1,
                cursor: isLoading || verificationCode.length < 6 ? "not-allowed" : "pointer",
              }}
              className="login-btn"
            >
              {isLoading ? (
                <span style={styles.loadingSpinner}>
                  <span style={styles.spinner} /> Verifying...
                </span>
              ) : (
                <>Verify & Sign In <span style={{ marginLeft: 8 }}>✓</span></>
              )}
            </button>

            <button
              type="button"
              onClick={handleSendSMS}
              style={styles.resendCode}
              className="forgot-link"
              disabled={isLoading}
            >
              Didn't receive the code? <span style={{ color: "#dc2626", fontWeight: 600 }}>Resend</span>
            </button>
          </form>
        )}

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
    padding: "52px 44px",
    width: "100%",
    maxWidth: 440,
    border: "1px solid rgba(255, 255, 255, 0.08)",
    boxShadow: "0 32px 64px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.03) inset",
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
  },
  logoContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 36,
  },
  logo: {
    height: 80,
    width: "auto",
    maxWidth: 280,
    objectFit: "contain" as const,
    filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.3))",
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
    margin: "0 0 36px 0",
    fontWeight: 400,
  },
  tabContainer: {
    display: "flex",
    gap: 8,
    marginBottom: 28,
    padding: 6,
    backgroundColor: "rgba(30, 41, 59, 0.5)",
    borderRadius: 14,
    border: "1px solid rgba(255, 255, 255, 0.05)",
  },
  tab: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: "14px 18px",
    backgroundColor: "transparent",
    border: "none",
    borderRadius: 10,
    color: "#94a3b8",
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.2s",
  },
  tabActive: {
    backgroundColor: "rgba(220, 38, 38, 0.15)",
    color: "#fff",
    boxShadow: "0 2px 8px rgba(220, 38, 38, 0.2)",
  },
  tabIcon: {
    fontSize: 18,
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
    gap: 22,
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
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
  inputHint: {
    color: "#64748b",
    fontSize: 13,
    margin: 0,
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
  smsConfirmation: {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "rgba(34, 197, 94, 0.08)",
    border: "1px solid rgba(34, 197, 94, 0.2)",
    borderRadius: 14,
    marginBottom: 8,
  },
  smsIcon: {
    fontSize: 36,
    marginBottom: 10,
  },
  smsText: {
    color: "#a7f3d0",
    fontSize: 15,
    margin: "0 0 10px 0",
  },
  changeNumber: {
    background: "none",
    border: "none",
    color: "#64748b",
    fontSize: 13,
    cursor: "pointer",
    textDecoration: "underline",
    textUnderlineOffset: "3px",
  },
  codeInputContainer: {
    display: "flex",
    gap: 10,
    justifyContent: "center",
  },
  codeInput: {
    width: 52,
    height: 62,
    textAlign: "center",
    fontSize: 26,
    fontWeight: 700,
    backgroundColor: "rgba(30, 41, 59, 0.6)",
    border: "2px solid rgba(71, 85, 105, 0.4)",
    borderRadius: 12,
    color: "#fff",
    outline: "none",
    transition: "all 0.25s ease",
  },
  resendCode: {
    background: "none",
    border: "none",
    color: "#94a3b8",
    fontSize: 14,
    cursor: "pointer",
    padding: 10,
    textAlign: "center",
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
