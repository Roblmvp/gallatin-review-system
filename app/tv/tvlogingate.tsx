"use client";

import { useState, useEffect } from "react";

export default function TVLoginGate() {
  const [loginType, setLoginType] = useState<"admin" | "sales">("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const styleId = "tv-login-styles";
    if (!document.getElementById(styleId)) {
      const styleSheet = document.createElement("style");
      styleSheet.id = styleId;
      styleSheet.textContent = `
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .tv-input:focus {
          border-color: #22c55e !important;
          box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.2) !important;
        }
        .tv-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(34, 197, 94, 0.4);
        }
        .tv-tab:hover {
          background-color: rgba(255, 255, 255, 0.05);
        }
      `;
      document.head.appendChild(styleSheet);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const endpoint = loginType === "admin" ? "/api/admin/auth" : "/api/sales/auth";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        // Reload to show TV display
        window.location.reload();
      } else {
        setError(data.error || "Invalid email or password");
      }
    } catch {
      setError("Failed to connect. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.backgroundOverlay} />
      <div style={styles.glowOrb1} />
      <div style={styles.glowOrb2} />

      <div style={styles.loginCard}>
        <div style={styles.iconContainer}>
          <span style={{ fontSize: 56 }}>📺</span>
        </div>

        <h1 style={styles.title}>TV Display Access</h1>
        <p style={styles.subtitle}>Sign in to view the sales leaderboard</p>

        {/* Login Type Tabs */}
        <div style={styles.tabContainer}>
          <button
            onClick={() => { setLoginType("admin"); setError(""); }}
            style={{
              ...styles.tab,
              ...(loginType === "admin" ? styles.tabActive : {}),
            }}
            className="tv-tab"
          >
            🔐 Admin
          </button>
          <button
            onClick={() => { setLoginType("sales"); setError(""); }}
            style={{
              ...styles.tab,
              ...(loginType === "sales" ? styles.tabActive : {}),
            }}
            className="tv-tab"
          >
            👤 Salesperson
          </button>
        </div>

        {error && (
          <div style={styles.errorContainer}>
            <span>⚠️ {error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@gallatincdjr.com"
              style={styles.input}
              className="tv-input"
              autoFocus
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.inputWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                style={styles.input}
                className="tv-input"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
                tabIndex={-1}
              >
                {showPassword ? (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
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
            className="tv-btn"
          >
            {isLoading ? (
              <span style={styles.loadingSpinner}>
                <span style={styles.spinner} /> Signing in...
              </span>
            ) : (
              <>Access TV Display <span style={{ marginLeft: 8 }}>→</span></>
            )}
          </button>
        </form>

        <div style={styles.helpText}>
          <p>Use your {loginType === "admin" ? "admin" : "sales"} credentials to access the TV display.</p>
        </div>

        {/* Legal Disclosure */}
        <div style={styles.disclosure}>
          <p style={styles.disclosureText}>
            By signing in, you acknowledge that you are an authorized user and agree to comply with all company policies regarding the handling of confidential business information. Unauthorized access or disclosure of proprietary data is strictly prohibited and may result in disciplinary action and/or legal prosecution. All activity is monitored and logged.
          </p>
        </div>
      </div>

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
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  backgroundOverlay: {
    position: "absolute",
    inset: 0,
    background: "radial-gradient(ellipse at top, rgba(34, 197, 94, 0.1) 0%, transparent 50%)",
    pointerEvents: "none",
  },
  glowOrb1: {
    position: "absolute",
    top: "10%",
    left: "20%",
    width: 400,
    height: 400,
    background: "radial-gradient(circle, rgba(34, 197, 94, 0.12) 0%, transparent 70%)",
    borderRadius: "50%",
    filter: "blur(80px)",
    pointerEvents: "none",
    animation: "pulse 6s ease-in-out infinite",
  },
  glowOrb2: {
    position: "absolute",
    bottom: "10%",
    right: "15%",
    width: 350,
    height: 350,
    background: "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
    borderRadius: "50%",
    filter: "blur(60px)",
    pointerEvents: "none",
    animation: "pulse 8s ease-in-out infinite reverse",
  },
  loginCard: {
    position: "relative",
    backgroundColor: "rgba(15, 23, 42, 0.9)",
    backdropFilter: "blur(24px)",
    borderRadius: 24,
    padding: "48px 44px",
    width: "100%",
    maxWidth: 420,
    border: "1px solid rgba(34, 197, 94, 0.2)",
    boxShadow: "0 32px 64px rgba(0, 0, 0, 0.5)",
  },
  iconContainer: {
    textAlign: "center",
    marginBottom: 20,
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: 700,
    textAlign: "center",
    margin: "0 0 8px 0",
  },
  subtitle: {
    color: "#94a3b8",
    fontSize: 15,
    textAlign: "center",
    margin: "0 0 28px 0",
  },
  tabContainer: {
    display: "flex",
    gap: 8,
    marginBottom: 24,
    padding: 6,
    backgroundColor: "rgba(30, 41, 59, 0.5)",
    borderRadius: 12,
  },
  tab: {
    flex: 1,
    padding: "12px 16px",
    backgroundColor: "transparent",
    border: "none",
    borderRadius: 8,
    color: "#94a3b8",
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.2s",
  },
  tabActive: {
    backgroundColor: "rgba(34, 197, 94, 0.2)",
    color: "#22c55e",
  },
  errorContainer: {
    padding: "12px 16px",
    backgroundColor: "rgba(239, 68, 68, 0.15)",
    border: "1px solid rgba(239, 68, 68, 0.3)",
    borderRadius: 10,
    marginBottom: 20,
    color: "#fca5a5",
    fontSize: 14,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 18,
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  inputWrapper: {
    position: "relative",
  },
  label: {
    color: "#e2e8f0",
    fontSize: 14,
    fontWeight: 600,
  },
  input: {
    width: "100%",
    padding: "14px 16px",
    paddingRight: 48,
    fontSize: 16,
    backgroundColor: "rgba(30, 41, 59, 0.7)",
    border: "2px solid rgba(71, 85, 105, 0.4)",
    borderRadius: 10,
    color: "#fff",
    outline: "none",
    transition: "all 0.2s",
    boxSizing: "border-box",
  },
  eyeButton: {
    position: "absolute",
    right: 14,
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    color: "#64748b",
    cursor: "pointer",
    padding: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.6,
    transition: "opacity 0.2s",
  },
  primaryButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "16px 24px",
    fontSize: 16,
    fontWeight: 600,
    background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    transition: "all 0.25s ease",
    boxShadow: "0 4px 16px rgba(34, 197, 94, 0.3)",
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
  helpText: {
    textAlign: "center",
    marginTop: 20,
    color: "#64748b",
    fontSize: 13,
  },
  disclosure: {
    marginTop: 24,
    padding: "16px",
    backgroundColor: "rgba(30, 41, 59, 0.5)",
    borderRadius: 10,
    border: "1px solid rgba(71, 85, 105, 0.3)",
  },
  disclosureText: {
    margin: 0,
    fontSize: 11,
    lineHeight: 1.5,
    color: "#64748b",
    textAlign: "center",
  },
  footerText: {
    color: "#475569",
    fontSize: 13,
    marginTop: 32,
    textAlign: "center",
  },
};
