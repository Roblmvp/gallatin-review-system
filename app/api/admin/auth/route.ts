import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// Set your admin password here or use environment variable
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "GallatinCDJR2026!";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (password === ADMIN_PASSWORD) {
      // Create a simple session token
      const sessionToken = Buffer.from(`admin:${Date.now()}`).toString("base64");
      
      // Set cookie that expires in 24 hours
      const cookieStore = await cookies();
      cookieStore.set("admin_session", sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 24 hours
        path: "/",
      });

      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { success: false, error: "Invalid password" },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  // Logout - clear the session cookie
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  return NextResponse.json({ success: true });
}
