import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseServer } from "@/lib/supabase";
import { hashPassword, verifyPassword, isHashedPassword } from "@/lib/password";

// Super admin password - set this in environment variables
const SUPER_ADMIN_PASSWORD = process.env.SUPER_ADMIN_PASSWORD || "SuperAdmin2026!";

// Verify super admin session
async function verifySuperAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get("super_admin_session");
  
  if (!session?.value) return false;
  
  try {
    const sessionData = JSON.parse(Buffer.from(session.value, "base64").toString());
    // Check if session is less than 24 hours old
    if (Date.now() - sessionData.timestamp > 24 * 60 * 60 * 1000) {
      return false;
    }
    return sessionData.isSuperAdmin === true;
  } catch {
    return false;
  }
}

// GET - List all admin users
export async function GET(request: NextRequest) {
  const isSuperAdmin = await verifySuperAdmin();
  
  if (!isSuperAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { data: users, error } = await supabaseServer
      .from("admin_users")
      .select("id, email, name, is_active, is_super_admin, created_at, updated_at, last_login, created_by")
      .order("created_at", { ascending: true });

    if (error) throw error;

    return NextResponse.json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

// POST - Create new user or login
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, email, password, name } = body;

    // Super admin login
    if (action === "login") {
      if (password === SUPER_ADMIN_PASSWORD) {
        const sessionData = {
          isSuperAdmin: true,
          timestamp: Date.now(),
        };
        const sessionToken = Buffer.from(JSON.stringify(sessionData)).toString("base64");

        const cookieStore = await cookies();
        cookieStore.set("super_admin_session", sessionToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 60 * 24, // 24 hours
          path: "/",
        });

        return NextResponse.json({ success: true });
      } else {
        return NextResponse.json({ error: "Invalid password" }, { status: 401 });
      }
    }

    // All other actions require super admin authentication
    const isSuperAdmin = await verifySuperAdmin();
    if (!isSuperAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Create new user with HASHED password
    if (action === "create") {
      if (!email || !name || !password) {
        return NextResponse.json({ error: "Email, name, and password are required" }, { status: 400 });
      }

      // Hash the password before storing
      const hashedPassword = await hashPassword(password);

      const { data, error } = await supabaseServer
        .from("admin_users")
        .insert({
          email: email.toLowerCase().trim(),
          name,
          password: hashedPassword,
          is_active: true,
          is_super_admin: false,
          created_by: "Super Admin",
        })
        .select()
        .single();

      if (error) {
        if (error.code === "23505") {
          return NextResponse.json({ error: "User with this email already exists" }, { status: 400 });
        }
        throw error;
      }

      return NextResponse.json({ success: true, user: data });
    }

    // Logout
    if (action === "logout") {
      const cookieStore = await cookies();
      cookieStore.delete("super_admin_session");
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// PATCH - Update user (activate/deactivate, change password, etc.)
export async function PATCH(request: NextRequest) {
  const isSuperAdmin = await verifySuperAdmin();
  
  if (!isSuperAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, is_active, password, name } = body;

    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const updates: Record<string, any> = {};
    if (typeof is_active === "boolean") updates.is_active = is_active;
    if (name) updates.name = name;
    
    // Hash password if provided
    if (password) {
      updates.password = await hashPassword(password);
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "No updates provided" }, { status: 400 });
    }

    const { data, error } = await supabaseServer
      .from("admin_users")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, user: data });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}

// DELETE - Delete user
export async function DELETE(request: NextRequest) {
  const isSuperAdmin = await verifySuperAdmin();
  
  if (!isSuperAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // Prevent deleting super admin
    const { data: user } = await supabaseServer
      .from("admin_users")
      .select("is_super_admin")
      .eq("id", id)
      .single();

    if (user?.is_super_admin) {
      return NextResponse.json({ error: "Cannot delete super admin" }, { status: 400 });
    }

    const { error } = await supabaseServer
      .from("admin_users")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
