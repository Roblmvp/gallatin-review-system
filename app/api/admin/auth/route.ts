import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseServer } from "@/lib/supabase";
import { verifyPassword, isHashedPassword, hashPassword } from "@/lib/password";

// Email to receive password reset requests
const ADMIN_NOTIFICATION_EMAIL = "robertlisowski57@gmail.com";

async function sendPasswordResetEmail(userEmail: string, userName: string) {
  const resendApiKey = process.env.RESEND_API_KEY;
  
  if (!resendApiKey) {
    console.error("RESEND_API_KEY not configured");
    return false;
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Gallatin CDJR Admin <admin@gallatincdjr.reviews>",
        to: [ADMIN_NOTIFICATION_EMAIL],
        subject: `🔐 Password Reset Request - ${userName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">🔐 Password Reset Request</h1>
            </div>
            
            <div style="background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px;">
              <p style="font-size: 16px; color: #334155; margin-bottom: 20px;">
                A password reset has been requested for the following admin account:
              </p>
              
              <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
                <p style="margin: 0 0 10px 0;"><strong>Name:</strong> ${userName}</p>
                <p style="margin: 0 0 10px 0;"><strong>Email:</strong> ${userEmail}</p>
                <p style="margin: 0;"><strong>Time:</strong> ${new Date().toLocaleString("en-US", { timeZone: "America/Chicago" })} CT</p>
              </div>
              
              <p style="font-size: 14px; color: #64748b; margin-bottom: 20px;">
                To reset this user's password, go to the Super Admin panel at:<br>
                <a href="https://gallatincdjr.reviews/superadmin" style="color: #dc2626;">https://gallatincdjr.reviews/superadmin</a>
              </p>
              
              <div style="background: #fef3c7; padding: 15px; border-radius: 8px; border: 1px solid #f59e0b;">
                <p style="margin: 0; font-size: 14px; color: #92400e;">
                  ⚠️ If you did not expect this request, someone may be trying to access the admin panel.
                </p>
              </div>
            </div>
            
            <p style="text-align: center; font-size: 12px; color: #94a3b8; margin-top: 20px;">
              Gallatin CDJR Admin Dashboard • Part of the WE Auto Family
            </p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Resend API error:", errorData);
      return false;
    }

    console.log(`Password reset email sent for: ${userEmail}`);
    return true;
  } catch (error) {
    console.error("Failed to send email:", error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, email, password } = body;

    const normalizedEmail = email?.toLowerCase().trim();

    // Handle password reset request
    if (action === "forgot_password") {
      // Look up user in database
      const { data: user } = await supabaseServer
        .from("admin_users")
        .select("name, email, is_active")
        .eq("email", normalizedEmail)
        .single();

      if (user && user.is_active) {
        // Send email notification
        await sendPasswordResetEmail(normalizedEmail, user.name);
      }

      // Always return success to prevent email enumeration
      return NextResponse.json({
        success: true,
        message: `If an account exists for ${email}, a password reset request has been sent to the administrator.`,
      });
    }

    // Handle login - look up user in database
    const { data: user, error } = await supabaseServer
      .from("admin_users")
      .select("id, email, name, password, is_active")
      .eq("email", normalizedEmail)
      .single();

    if (error || !user) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Check if user is active
    if (!user.is_active) {
      return NextResponse.json(
        { success: false, error: "Your account has been deactivated. Please contact an administrator." },
        { status: 401 }
      );
    }

    // Check password - support both hashed and legacy plain text passwords
    let passwordValid = false;
    
    if (isHashedPassword(user.password)) {
      // New hashed password - verify with bcrypt
      passwordValid = await verifyPassword(password, user.password);
    } else {
      // Legacy plain text password - check directly
      passwordValid = user.password === password;
      
      // If valid, migrate to hashed password
      if (passwordValid) {
        const hashedPassword = await hashPassword(password);
        await supabaseServer
          .from("admin_users")
          .update({ password: hashedPassword })
          .eq("id", user.id);
        console.log(`Migrated password to hash for admin: ${normalizedEmail}`);
      }
    }

    if (!passwordValid) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Update last login
    await supabaseServer
      .from("admin_users")
      .update({ last_login: new Date().toISOString() })
      .eq("id", user.id);

    // Create session token
    const sessionData = {
      email: normalizedEmail,
      name: user.name,
      timestamp: Date.now(),
    };
    const sessionToken = Buffer.from(JSON.stringify(sessionData)).toString("base64");

    // Set cookie
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
