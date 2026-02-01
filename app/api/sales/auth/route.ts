import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseServer } from "@/lib/supabase";
import { verifyPassword, isHashedPassword, hashPassword } from "@/lib/password";
import { checkRateLimit } from "@/lib/ratelimit";

const ADMIN_NOTIFICATION_EMAIL = "robertlisowski57@gmail.com";

async function sendPasswordResetEmail(userEmail: string, userName: string) {
  const resendApiKey = process.env.RESEND_API_KEY;
  
  if (!resendApiKey) {
    console.error("RESEND_API_KEY not configured");
    return false;
  }

  try {
    const timestamp = new Date().toLocaleString("en-US", { timeZone: "America/Chicago" });
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + resendApiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Gallatin CDJR Admin <admin@gallatincdjr.reviews>",
        to: [ADMIN_NOTIFICATION_EMAIL],
        subject: "🔐 Salesperson Password Reset Request - " + userName,
        html: "<div style=\"font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;\"><div style=\"background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;\"><h1 style=\"color: white; margin: 0; font-size: 24px;\">🔐 Salesperson Password Reset</h1></div><div style=\"background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px;\"><p style=\"font-size: 16px; color: #334155; margin-bottom: 20px;\">A salesperson has requested a password reset:</p><div style=\"background: white; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 20px;\"><p style=\"margin: 0 0 10px 0;\"><strong>Name:</strong> " + userName + "</p><p style=\"margin: 0 0 10px 0;\"><strong>Email:</strong> " + userEmail + "</p><p style=\"margin: 0;\"><strong>Time:</strong> " + timestamp + " CT</p></div><p style=\"font-size: 14px; color: #64748b; margin-bottom: 20px;\">To reset this user's password, go to the Super Admin panel at:<br><a href=\"https://gallatincdjr.reviews/superadmin\" style=\"color: #3b82f6;\">https://gallatincdjr.reviews/superadmin</a></p></div><p style=\"text-align: center; font-size: 12px; color: #94a3b8; margin-top: 20px;\">Gallatin CDJR Sales Dashboard • Part of the WE Auto Family</p></div>",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Resend API error:", errorData);
      return false;
    }

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

    // Handle forgot password with stricter rate limiting
    if (action === "forgot_password") {
      const rateLimitResult = await checkRateLimit(request, "passwordReset");
      if (!rateLimitResult.success) {
        return rateLimitResult.response;
      }

      const { data: user } = await supabaseServer
        .from("salesperson_users")
        .select("name, email, is_active")
        .eq("email", normalizedEmail)
        .single();

      if (user && user.is_active) {
        await sendPasswordResetEmail(normalizedEmail, user.name);
      }

      return NextResponse.json({
        success: true,
        message: "If an account exists, your manager has been notified of your password reset request.",
      });
    }

    // Handle logout - no rate limiting needed
    if (action === "logout") {
      const cookieStore = await cookies();
      cookieStore.delete("sales_session");
      return NextResponse.json({ success: true });
    }

    // Rate limit login attempts
    const rateLimitResult = await checkRateLimit(request, "auth");
    if (!rateLimitResult.success) {
      return rateLimitResult.response;
    }

    // Handle login
    const { data: user, error } = await supabaseServer
      .from("salesperson_users")
      .select("id, email, name, password, slug, is_active")
      .eq("email", normalizedEmail)
      .single();

    if (error || !user) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password" },
        { status: 401 }
      );
    }

    if (!user.is_active) {
      return NextResponse.json(
        { success: false, error: "Your account has been deactivated. Please contact a manager." },
        { status: 401 }
      );
    }

    let passwordValid = false;
    
    if (isHashedPassword(user.password)) {
      passwordValid = await verifyPassword(password, user.password);
    } else {
      passwordValid = user.password === password;
      
      if (passwordValid) {
        const hashedPassword = await hashPassword(password);
        await supabaseServer
          .from("salesperson_users")
          .update({ password: hashedPassword })
          .eq("id", user.id);
        console.log("Migrated password to hash for salesperson: " + normalizedEmail);
      }
    }

    if (!passwordValid) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password" },
        { status: 401 }
      );
    }

    await supabaseServer
      .from("salesperson_users")
      .update({ last_login: new Date().toISOString() })
      .eq("id", user.id);

    const sessionData = {
      id: user.id,
      email: normalizedEmail,
      name: user.name,
      slug: user.slug,
      timestamp: Date.now(),
    };
    const sessionToken = Buffer.from(JSON.stringify(sessionData)).toString("base64");

    const cookieStore = await cookies();
    cookieStore.set("sales_session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return NextResponse.json({ 
      success: true,
      user: {
        name: user.name,
        email: normalizedEmail,
        slug: user.slug,
      }
    });
  } catch (error) {
    console.error("Sales auth error:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("sales_session");
    
    if (session?.value) {
      const sessionData = JSON.parse(Buffer.from(session.value, "base64").toString());
      
      if (Date.now() - sessionData.timestamp > 24 * 60 * 60 * 1000) {
        return NextResponse.json({ authenticated: false });
      }
      
      return NextResponse.json({
        authenticated: true,
        user: {
          name: sessionData.name,
          email: sessionData.email,
          slug: sessionData.slug,
        }
      });
    }
    
    return NextResponse.json({ authenticated: false });
  } catch {
    return NextResponse.json({ authenticated: false });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("sales_session");
  return NextResponse.json({ success: true });
}
