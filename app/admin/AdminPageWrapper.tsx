"use client";

import { useState } from "react";
import AdminLoginForm from "./AdminLoginForm";
import AdminDashboardClient from "./AdminDashboardClient";

type Props = {
  scoreboard: any[];
  referrals: any[];
  recentEvents: any[];
  totals: any;
  salespersonRankings: any[];
  trackingStats: any;
  isAuthenticated: boolean;
  userName?: string;
};

export default function AdminPageWrapper({
  scoreboard,
  referrals,
  recentEvents,
  totals,
  salespersonRankings,
  trackingStats,
  isAuthenticated: initialAuth,
  userName: initialUserName,
}: Props) {
  const [isAuthenticated, setIsAuthenticated] = useState(initialAuth);
  const [userName, setUserName] = useState(initialUserName || "");
  const [error, setError] = useState("");

  const handleLogin = async (email: string, password: string) => {
    setError("");
    
    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        setIsAuthenticated(true);
        setUserName(data.user?.name || "");
      } else {
        setError(data.error || "Invalid email or password");
      }
    } catch (err) {
      setError("Failed to connect. Please try again.");
    }
  };

  const handleForgotPassword = async (email: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "forgot_password", email }),
      });

      const data = await response.json();
      return { 
        success: data.success, 
        message: data.message || "If an account exists, a reset request has been sent." 
      };
    } catch (err) {
      return { 
        success: false, 
        message: "Failed to send reset request. Please try again." 
      };
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    setIsAuthenticated(false);
    setUserName("");
  };

  if (!isAuthenticated) {
    return (
      <AdminLoginForm 
        onLogin={handleLogin} 
        onForgotPassword={handleForgotPassword}
        error={error} 
      />
    );
  }

  return (
    <AdminDashboardClient
      scoreboard={scoreboard}
      referrals={referrals}
      recentEvents={recentEvents}
      totals={totals}
      salespersonRankings={salespersonRankings}
      trackingStats={trackingStats}
      onLogout={handleLogout}
      userName={userName}
    />
  );
}
