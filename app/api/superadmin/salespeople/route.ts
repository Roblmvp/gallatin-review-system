import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseServer } from "@/lib/supabase";
import { hashPassword } from "@/lib/password";

// Verify super admin session
async function verifySuperAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get("super_admin_session");
  
  if (!session?.value) return false;
  
  try {
    const sessionData = JSON.parse(Buffer.from(session.value, "base64").toString());
    if (Date.now() - sessionData.timestamp > 24 * 60 * 60 * 1000) {
      return false;
    }
    return sessionData.isSuperAdmin === true;
  } catch {
    return false;
  }
}

// GET - List all salesperson users
export async function GET() {
  const isSuperAdmin = await verifySuperAdmin();
  
  if (!isSuperAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { data: users, error } = await supabaseServer
      .from("salesperson_users")
      .select("id, email, name, title, phone, slug, is_active, created_at, updated_at, last_login")
      .order("name", { ascending: true });

    if (error) throw error;

    return NextResponse.json({ users });
  } catch (error) {
    console.error("Error fetching salesperson users:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

// POST - Create new salesperson
export async function POST(request: NextRequest) {
  const isSuperAdmin = await verifySuperAdmin();
  
  if (!isSuperAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, email, password, slug, title, phone } = body;

    if (!email || !name || !password || !slug) {
      return NextResponse.json({ error: "Name, email, password, and slug are required" }, { status: 400 });
    }

    // Hash the password before storing
    const hashedPassword = await hashPassword(password);

    const { data, error } = await supabaseServer
      .from("salesperson_users")
      .insert({
        email: email.toLowerCase().trim(),
        name,
        password: hashedPassword,
        slug: slug.toLowerCase().trim(),
        title: title || "Product Specialist",
        phone: phone || null,
        is_active: true,
      })
      .select()
      .single();

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json({ error: "User with this email or slug already exists" }, { status: 400 });
      }
      throw error;
    }

    return NextResponse.json({ success: true, user: data });
  } catch (error) {
    console.error("Error creating salesperson:", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}

// PATCH - Update salesperson
export async function PATCH(request: NextRequest) {
  const isSuperAdmin = await verifySuperAdmin();
  
  if (!isSuperAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, is_active, password, name, slug, title, phone } = body;

    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const updates: Record<string, any> = {};
    if (typeof is_active === "boolean") updates.is_active = is_active;
    if (name) updates.name = name;
    if (slug) updates.slug = slug.toLowerCase().trim();
    if (title) updates.title = title;
    if (typeof phone === "string") updates.phone = phone || null;
    
    // Hash password if provided
    if (password) {
      updates.password = await hashPassword(password);
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "No updates provided" }, { status: 400 });
    }

    const { data, error } = await supabaseServer
      .from("salesperson_users")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, user: data });
  } catch (error) {
    console.error("Error updating salesperson:", error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}

// DELETE - Delete salesperson
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

    const { error } = await supabaseServer
      .from("salesperson_users")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting salesperson:", error);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
