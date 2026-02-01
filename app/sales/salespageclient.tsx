"use client";

import { useState } from "react";
import SalesLoginForm from "./SalesLoginForm";
import SalesDashboardClient from "./SalesDashboardClient";

type SalespersonRanking = {
  salesperson: string;
  units_sold: number;
  total_activity: number;
  closing_pct: number;
  google_reviews: number;
  total_score: number;
  rank: number;
};

type ScoreboardRow = {
  slug: string;
  display_name: string;
  page_views: number;
  cta_clicks: number;
  contact_saves: number;
  referrals_shared: number;
};

type UserInfo = {
  name: string;
  email: string;
  slug: string;
};

type Props = {
  isAuthenticated: boolean;
  user?: UserInfo;
  rankings: SalespersonRanking[];
  myScoreboard: ScoreboardRow | null;
};

export default function SalesPageClient({ 
  isAuthenticated: initialAuth, 
  user: initialUser,
  rankings,
  myScoreboard: initialScoreboard
}: Props) {
  const [isAuthenticated, setIsAuthenticated] = useState(initialAuth);
  const [user, setUser] = useState<UserInfo | undefined>(initialUser);
  const [error, setError] = useState("");

  const handleLogin = async (email: string, password: string) => {
    setError("");
    
    try {
      const response = await fetch("/api/sales/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        setIsAuthenticated(true);
        setUser(data.user);
        window.location.reload();
      } else {
        setError(data.error || "Invalid email or password");
      }
    } catch (err) {
      setError("Failed to connect. Please try again.");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/sales/auth", { method: "DELETE" });
    setIsAuthenticated(false);
    setUser(undefined);
  };

  if (!isAuthenticated || !user) {
    return <SalesLoginForm onLogin={handleLogin} error={error} />;
  }

  return (
    <SalesDashboardClient
      user={user}
      rankings={rankings}
      myScoreboard={initialScoreboard}
      onLogout={handleLogout}
    />
  );
}
