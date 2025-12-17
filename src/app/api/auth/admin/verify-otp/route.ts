// app/api/auth/admin/verify-otp/route.ts (WITH DEBUG)
import { NextResponse } from "next/server";
import AdminOtp from "@/lib/models/AdminOtp";
import User from "@/lib/models/User";
import jwt from "jsonwebtoken";
import connect from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    await connect();
    const { email, otp } = await req.json();

    console.log("🔍 Verifying OTP for:", email);

    // Find admin or superadmin user
    const user = await User.findOne({
      email,
      role: { $in: ["admin", "superadmin"] },
    });

    if (!user) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    const adminOtp = await AdminOtp.findOne({ userId: user._id });
    if (!adminOtp) {
      return NextResponse.json({ error: "OTP not found" }, { status: 404 });
    }

    // Expiry check
    if (adminOtp.expiresAt < new Date()) {
      await AdminOtp.deleteOne({ userId: user._id });
      return NextResponse.json({ error: "OTP expired" }, { status: 400 });
    }

    // Verify OTP
    if (Number(adminOtp.otp) !== Number(otp)) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    // Cleanup OTP
    await AdminOtp.deleteOne({ userId: user._id });

    console.log("✅ OTP verified, generating tokens...");

    // Generate both tokens
    const accessToken = jwt.sign(
      { userId: user._id.toString(), role: user.role },
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { userId: user._id.toString() },
      process.env.REFRESH_TOKEN_SECRET!,
      { expiresIn: "7d" }
    );

    console.log("🔑 Tokens generated");
    console.log("Access Token (first 20 chars):", accessToken.substring(0, 20));
    console.log("Refresh Token (first 20 chars):", refreshToken.substring(0, 20));

    // Store refresh token in database
    user.adminRefreshToken = refreshToken;
    await user.save();

    console.log("💾 Refresh token saved to database");

    const res = NextResponse.json({
      success: true,
      role: user.role,
    });

    const isProduction = process.env.NODE_ENV === "production";

    console.log("🍪 Setting cookies...");
    console.log("Environment:", isProduction ? "production" : "development");

    // Set cookies with explicit settings
    res.cookies.set("adminAccessToken", accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "strict",
      maxAge: 60 * 15, // 15 minutes
      path: "/",
    });

    res.cookies.set("adminRefreshToken", refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    console.log("✅ Cookies set successfully");

    return res;
  } catch (err: any) {
    console.error("❌ Verify OTP error:", err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}