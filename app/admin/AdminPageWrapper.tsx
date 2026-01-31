"use client";

import { useState, useEffect } from "react";
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
};

export default function AdminPageWrapper({
  scoreboard,
  referrals,
  recentEvents,
  totals,
  salespersonRankings,
  trackingStats,
  isAuthenticated: initialAuth,
}: Props) {
  const [isAuthenticated, setIsAuthenticated] = useState(initialAuth);
  const [error, setError] = useState("");

  const handleLogin = async (password: string) => {
    setError("");
    
    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success) {
        setIsAuthenticated(true);
      } else {
        setError(data.error || "Invalid password");
      }
    } catch (err) {
      setError("Failed to connect. Please try again.");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <AdminLoginForm onLogin={handleLogin} error={error} />;
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
    />
  );
}
