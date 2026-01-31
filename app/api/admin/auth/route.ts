import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// Admin users database
// In production, this should be stored in a database with hashed passwords
const ADMIN_USERS: Record<string, { name: string; password: string }> = {
  "rob.l@gallatincdjr.com": {
    name: "Robert Lisowski",
    password: "Robandmeg2018!",
  },
  "dominick.f@gallatincdjr.com": {
    name: "Dominick Ferrara",
    password: "GallatinCDJR2026!",
  },
  "joe.s@gallatincdjr.com": {
    name: "Joseph Smith",
    password: "GallatinCDJR2026!",
  },
  "trey.a@gallatincdjr.com": {
    name: "Trey Adcox",
    password: "GallatinCDJR2026!",
  },
};

// Email to receive password reset requests
const ADMIN_EMAIL = "rob.l@gallatincdjr.com";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, email, password } = body;

    // Handle password reset request
    if (action === "forgot_password") {
      const normalizedEmail = email?.toLowerCase().trim();
      const user = ADMIN_USERS[normalizedEmail];

      if (user) {
        // In production, you would send an actual email here
        // For now, we'll use a webhook or email service
        
        // Try to send email notification via a simple fetch to an email service
        // You can integrate with SendGrid, Resend, or any email API
        try {
          // Example: Send to a webhook or email service
          // This is a placeholder - integrate with your preferred email service
          console.log(`Password reset requested for: ${normalizedEmail}`);
          console.log(`User: ${user.name}`);
          console.log(`Send notification to: ${ADMIN_EMAIL}`);
          
          // You could integrate with services like:
          // - Resend (resend.com)
          // - SendGrid
          // - AWS SES
          // - Or a simple webhook to Zapier/Make
        } catch (emailError) {
          console.error("Failed to send email notification:", emailError);
        }
      }

      // Always return success to prevent email enumeration
      return NextResponse.json({
        success: true,
        message: `If an account exists for ${email}, a password reset request has been sent to the administrator.`,
      });
    }

    // Handle login
    const normalizedEmail = email?.toLowerCase().trim();
    const user = ADMIN_USERS[normalizedEmail];

    if (user && user.password === password) {
      // Create a session token with user info
      const sessionData = {
        email: normalizedEmail,
        name: user.name,
        timestamp: Date.now(),
      };
      const sessionToken = Buffer.from(JSON.stringify(sessionData)).toString("base64");

      // Set cookie that expires in 24 hours
      const cookieStore = await cookies();
      cookieStore.set("admin_session", sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 24 hours
        path: "/",
      });

      return NextResponse.json({ 
        success: true,
        user: {
          name: user.name,
          email: normalizedEmail,
        }
      });
    } else {
      return NextResponse.json(
        { success: false, error: "Invalid email or password" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Auth error:", error);
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

export async function GET() {
  // Check if user is logged in and return user info
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");
    
    if (session?.value) {
      const sessionData = JSON.parse(Buffer.from(session.value, "base64").toString());
      return NextResponse.json({
        authenticated: true,
        user: {
          name: sessionData.name,
          email: sessionData.email,
        }
      });
    }
    
    return NextResponse.json({ authenticated: false });
  } catch {
    return NextResponse.json({ authenticated: false });
  }
}
