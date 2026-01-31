"use client";

import { useState, useEffect } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showIOSPrompt, setShowIOSPrompt] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
      return;
    }

    // Check if dismissed recently
    const dismissed = localStorage.getItem("pwa-prompt-dismissed");
    if (dismissed) {
      const dismissedTime = parseInt(dismissed);
      const daysSinceDismissed = (Date.now() - dismissedTime) / (1000 * 60 * 60 * 24);
      if (daysSinceDismissed < 7) return; // Don't show for 7 days after dismissal
    }

    // Detect iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isInStandaloneMode = window.matchMedia("(display-mode: standalone)").matches;

    if (isIOS && !isInStandaloneMode) {
      // Delay showing iOS prompt
      setTimeout(() => setShowIOSPrompt(true), 3000);
      setShowPrompt(true);
      return;
    }

    // Android/Desktop - listen for beforeinstallprompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setTimeout(() => setShowPrompt(true), 3000);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
      setShowPrompt(false);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem("pwa-prompt-dismissed", Date.now().toString());
    setShowPrompt(false);
    setShowIOSPrompt(false);
  };

  if (isInstalled || !showPrompt) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
        color: "white",
        padding: "16px 20px",
        zIndex: 9999,
        boxShadow: "0 -4px 20px rgba(0,0,0,0.3)",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <div
          style={{
            width: 50,
            height: 50,
            borderRadius: 12,
            background: "#D10000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            fontSize: 24,
          }}
        >
          🚗
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontWeight: 700, fontSize: 16, margin: "0 0 4px 0" }}>
            Install Gallatin CDJR App
          </p>
          <p style={{ fontSize: 13, margin: 0, color: "#ccc", lineHeight: 1.4 }}>
            Add to your home screen for quick access to service scheduling, your contacts, and exclusive offers!
          </p>
        </div>
        <button
          onClick={handleDismiss}
          style={{
            background: "transparent",
            border: "none",
            color: "#888",
            fontSize: 20,
            cursor: "pointer",
            padding: 4,
          }}
        >
          ✕
        </button>
      </div>

      {showIOSPrompt ? (
        // iOS Instructions
        <div
          style={{
            marginTop: 16,
            background: "rgba(255,255,255,0.1)",
            borderRadius: 12,
            padding: 14,
          }}
        >
          <p style={{ fontSize: 14, margin: "0 0 10px 0", fontWeight: 600 }}>
            To install on iPhone/iPad:
          </p>
          <ol
            style={{
              margin: 0,
              paddingLeft: 20,
              fontSize: 13,
              lineHeight: 1.6,
              color: "#ddd",
            }}
          >
            <li>
              Tap the <strong>Share</strong> button{" "}
              <span style={{ fontSize: 16 }}>⬆️</span> at the bottom of Safari
            </li>
            <li>
              Scroll down and tap <strong>"Add to Home Screen"</strong>
            </li>
            <li>
              Tap <strong>"Add"</strong> in the top right
            </li>
          </ol>
        </div>
      ) : (
        // Android/Desktop Install Button
        <button
          onClick={handleInstallClick}
          style={{
            width: "100%",
            marginTop: 12,
            padding: "14px 20px",
            borderRadius: 12,
            border: "none",
            background: "#D10000",
            color: "white",
            fontWeight: 700,
            fontSize: 15,
            cursor: "pointer",
          }}
        >
          Install App
        </button>
      )}
    </div>
  );
}
