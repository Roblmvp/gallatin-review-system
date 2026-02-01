import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseServer } from "@/lib/supabase";

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

// GET - Fetch activity logs
export async function GET() {
  const isSuperAdmin = await verifySuperAdmin();
  
  if (!isSuperAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { data: logs, error } = await supabaseServer
      .from("activity_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) throw error;

    return NextResponse.json({ logs: logs || [] });
  } catch (error) {
    console.error("Error fetching activity logs:", error);
    return NextResponse.json({ logs: [] });
  }
}

// POST - Create activity log
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { user_type, user_email, user_name, action, details } = body;

    const { error } = await supabaseServer
      .from("activity_logs")
      .insert({
        user_type,
        user_email,
        user_name,
        action,
        details,
      });

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error creating activity log:", error);
    return NextResponse.json({ success: false });
  }
}
