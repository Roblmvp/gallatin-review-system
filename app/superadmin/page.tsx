"use client";

import { useState, useEffect } from "react";

type AdminUser = {
  id: string;
  email: string;
  name: string;
  is_active: boolean;
  is_super_admin: boolean;
  created_at: string;
  updated_at: string;
  last_login: string | null;
  created_by: string | null;
};

type EditingUser = AdminUser & {
  newPassword?: string;
};

export default function SuperAdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState<EditingUser | null>(null);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });

  // Check auth status on load
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/superadmin/users");
      if (res.ok) {
        setIsAuthenticated(true);
        const data = await res.json();
        setUsers(data.users || []);
      }
    } catch {
      setIsAuthenticated(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/superadmin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "login", password }),
      });

      const data = await res.json();

      if (data.success) {
        setIsAuthenticated(true);
        fetchUsers();
      } else {
        setError(data.error || "Invalid password");
      }
    } catch {
      setError("Failed to connect");
    }

    setIsLoading(false);
  };

  const handleLogout = async () => {
    await fetch("/api/superadmin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "logout" }),
    });
    setIsAuthenticated(false);
    setPassword("");
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/superadmin/users");
      const data = await res.json();
      setUsers(data.users || []);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  const toggleUserStatus = async (user: AdminUser) => {
    try {
      const res = await fetch("/api/superadmin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: user.id, is_active: !user.is_active }),
      });

      if (res.ok) {
        fetchUsers();
      }
    } catch (err) {
      console.error("Failed to update user:", err);
    }
  };

  const createUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/superadmin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "create", ...newUser }),
      });

      const data = await res.json();

      if (data.success) {
        setShowCreateModal(false);
        setNewUser({ name: "", email: "", password: "" });
        fetchUsers();
      } else {
        setError(data.error || "Failed to create user");
      }
    } catch {
      setError("Failed to create user");
    }

    setIsLoading(false);
  };

  const updateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    setIsLoading(true);

    try {
      const res = await fetch("/api/superadmin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingUser.id,
          name: editingUser.name,
          password: editingUser.newPassword || undefined,
        }),
      });

      if (res.ok) {
        setShowEditModal(false);
        setEditingUser(null);
        fetchUsers();
      }
    } catch {
      setError("Failed to update user");
    }

    setIsLoading(false);
  };

  const deleteUser = async (user: AdminUser) => {
    if (!confirm(`Are you sure you want to delete ${user.name}?`)) return;

    try {
      const res = await fetch(`/api/superadmin/users?id=${user.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        fetchUsers();
      }
    } catch (err) {
      console.error("Failed to delete user:", err);
    }
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div style={styles.container}>
        <div style={styles.backgroundOverlay} />
        <div style={styles.loginCard}>
          <div style={styles.logoContainer}>
            <span style={{ fontSize: 48 }}>🔐</span>
          </div>
          <h1 style={styles.title}>Super Admin</h1>
          <p style={styles.subtitle}>Restricted Access Only</p>

          {error && (
            <div style={styles.errorContainer}>
              <span>⚠️ {error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Master Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter super admin password"
                style={styles.input}
                autoFocus
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !password}
              style={{
                ...styles.primaryButton,
                opacity: isLoading || !password ? 0.6 : 1,
              }}
            >
              {isLoading ? "Authenticating..." : "Access Control Panel"}
            </button>
          </form>

          <div style={styles.securityNote}>
            <span>🛡️ This area is monitored</span>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0f172a", color: "#fff" }}>
      {/* Header */}
      <div style={styles.header}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>🔐 Super Admin Control Panel</h1>
            <p style={{ fontSize: 14, color: "#94a3b8", margin: "4px 0 0 0" }}>Manage Admin User Access</p>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={() => setShowCreateModal(true)} style={styles.createButton}>
              ➕ Add User
            </button>
            <button onClick={handleLogout} style={styles.logoutButton}>
              🚪 Logout
            </button>
          </div>
        </div>
      </div>

      {/* User List */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: 24 }}>
        <div style={styles.statsRow}>
          <div style={styles.statCard}>
            <div style={{ fontSize: 32, fontWeight: 700 }}>{users.length}</div>
            <div style={{ fontSize: 14, color: "#94a3b8" }}>Total Users</div>
          </div>
          <div style={styles.statCard}>
            <div style={{ fontSize: 32, fontWeight: 700, color: "#22c55e" }}>
              {users.filter(u => u.is_active).length}
            </div>
            <div style={{ fontSize: 14, color: "#94a3b8" }}>Active</div>
          </div>
          <div style={styles.statCard}>
            <div style={{ fontSize: 32, fontWeight: 700, color: "#ef4444" }}>
              {users.filter(u => !u.is_active).length}
            </div>
            <div style={{ fontSize: 14, color: "#94a3b8" }}>Inactive</div>
          </div>
        </div>

        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr style={{ backgroundColor: "#334155" }}>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Role</th>
                <th style={styles.th}>Created</th>
                <th style={styles.th}>Last Login</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} style={{ borderBottom: "1px solid #334155" }}>
                  <td style={styles.td}>
                    <span style={{
                      display: "inline-block",
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      backgroundColor: user.is_active ? "#22c55e" : "#ef4444",
                    }} />
                  </td>
                  <td style={styles.td}>
                    <div style={{ fontWeight: 600 }}>{user.name}</div>
                  </td>
                  <td style={styles.td}>{user.email}</td>
                  <td style={styles.td}>
                    {user.is_super_admin ? (
                      <span style={styles.superBadge}>👑 Super Admin</span>
                    ) : (
                      <span style={styles.adminBadge}>Admin</span>
                    )}
                  </td>
                  <td style={styles.td}>
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>
                  <td style={styles.td}>
                    {user.last_login 
                      ? new Date(user.last_login).toLocaleDateString()
                      : <span style={{ color: "#64748b" }}>Never</span>
                    }
                  </td>
                  <td style={styles.td}>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button
                        onClick={() => toggleUserStatus(user)}
                        style={{
                          ...styles.actionButton,
                          backgroundColor: user.is_active ? "#ef444420" : "#22c55e20",
                          color: user.is_active ? "#ef4444" : "#22c55e",
                        }}
                        disabled={user.is_super_admin}
                      >
                        {user.is_active ? "Deactivate" : "Activate"}
                      </button>
                      <button
                        onClick={() => { setEditingUser({...user, newPassword: ""}); setShowEditModal(true); }}
                        style={{ ...styles.actionButton, backgroundColor: "#3b82f620", color: "#3b82f6" }}
                      >
                        Edit
                      </button>
                      {!user.is_super_admin && (
                        <button
                          onClick={() => deleteUser(user)}
                          style={{ ...styles.actionButton, backgroundColor: "#ef444420", color: "#ef4444" }}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create User Modal */}
      {showCreateModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2 style={{ margin: "0 0 24px 0", fontSize: 20 }}>➕ Create New Admin User</h2>
            <form onSubmit={createUser}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Full Name</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="John Smith"
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Email</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="john.s@gallatincdjr.com"
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Password</label>
                <input
                  type="text"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  placeholder="SecurePassword123!"
                  style={styles.input}
                  required
                />
              </div>
              <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
                <button type="button" onClick={() => setShowCreateModal(false)} style={styles.cancelButton}>
                  Cancel
                </button>
                <button type="submit" disabled={isLoading} style={styles.primaryButton}>
                  {isLoading ? "Creating..." : "Create User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && editingUser && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2 style={{ margin: "0 0 24px 0", fontSize: 20 }}>✏️ Edit User</h2>
            <form onSubmit={updateUser}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Full Name</label>
                <input
                  type="text"
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Email</label>
                <input
                  type="email"
                  value={editingUser.email}
                  style={{ ...styles.input, backgroundColor: "#1e293b", color: "#64748b" }}
                  disabled
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>New Password (leave blank to keep current)</label>
                <input
                  type="text"
                  value={editingUser.newPassword || ""}
                  onChange={(e) => setEditingUser({ ...editingUser, newPassword: e.target.value })}
                  placeholder="Enter new password"
                  style={styles.input}
                />
              </div>
              <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
                <button type="button" onClick={() => setShowEditModal(false)} style={styles.cancelButton}>
                  Cancel
                </button>
                <button type="submit" disabled={isLoading} style={styles.primaryButton}>
                  {isLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
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
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  backgroundOverlay: {
    position: "absolute",
    inset: 0,
    background: "radial-gradient(ellipse at top, rgba(139, 92, 246, 0.15) 0%, transparent 50%)",
    pointerEvents: "none",
  },
  loginCard: {
    position: "relative",
    backgroundColor: "rgba(15, 23, 42, 0.9)",
    backdropFilter: "blur(24px)",
    borderRadius: 24,
    padding: "48px 44px",
    width: "100%",
    maxWidth: 400,
    border: "1px solid rgba(139, 92, 246, 0.3)",
    boxShadow: "0 32px 64px rgba(0, 0, 0, 0.5)",
  },
  logoContainer: {
    textAlign: "center",
    marginBottom: 24,
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
    fontSize: 14,
    textAlign: "center",
    margin: "0 0 32px 0",
  },
  errorContainer: {
    padding: "12px 16px",
    backgroundColor: "rgba(239, 68, 68, 0.15)",
    border: "1px solid rgba(239, 68, 68, 0.3)",
    borderRadius: 8,
    marginBottom: 20,
    color: "#fca5a5",
    fontSize: 14,
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
    marginBottom: 16,
  },
  label: {
    color: "#e2e8f0",
    fontSize: 14,
    fontWeight: 600,
  },
  input: {
    width: "100%",
    padding: "14px 16px",
    fontSize: 16,
    backgroundColor: "rgba(30, 41, 59, 0.8)",
    border: "2px solid rgba(71, 85, 105, 0.5)",
    borderRadius: 10,
    color: "#fff",
    outline: "none",
    boxSizing: "border-box",
  },
  primaryButton: {
    flex: 1,
    padding: "14px 24px",
    fontSize: 15,
    fontWeight: 600,
    background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
  },
  cancelButton: {
    flex: 1,
    padding: "14px 24px",
    fontSize: 15,
    fontWeight: 600,
    backgroundColor: "#334155",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
  },
  securityNote: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 24,
    paddingTop: 20,
    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
    color: "#64748b",
    fontSize: 12,
  },
  header: {
    background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
    padding: "20px 24px",
    borderBottom: "1px solid #334155",
  },
  createButton: {
    padding: "10px 20px",
    backgroundColor: "#22c55e",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
  },
  logoutButton: {
    padding: "10px 20px",
    backgroundColor: "#334155",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
  },
  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 16,
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: "#1e293b",
    borderRadius: 12,
    padding: 20,
    textAlign: "center",
  },
  tableContainer: {
    backgroundColor: "#1e293b",
    borderRadius: 12,
    overflow: "hidden",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: 14,
  },
  th: {
    textAlign: "left",
    padding: "14px 16px",
    fontSize: 12,
    fontWeight: 600,
    color: "#94a3b8",
    textTransform: "uppercase",
  },
  td: {
    padding: "14px 16px",
    verticalAlign: "middle",
  },
  superBadge: {
    backgroundColor: "#eab30820",
    color: "#eab308",
    padding: "4px 10px",
    borderRadius: 6,
    fontSize: 12,
    fontWeight: 600,
  },
  adminBadge: {
    backgroundColor: "#3b82f620",
    color: "#3b82f6",
    padding: "4px 10px",
    borderRadius: 6,
    fontSize: 12,
    fontWeight: 600,
  },
  actionButton: {
    padding: "6px 12px",
    borderRadius: 6,
    border: "none",
    fontSize: 12,
    fontWeight: 600,
    cursor: "pointer",
  },
  modalOverlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#1e293b",
    borderRadius: 16,
    padding: 32,
    width: "100%",
    maxWidth: 450,
    border: "1px solid #334155",
  },
};
