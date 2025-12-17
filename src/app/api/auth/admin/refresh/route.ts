// app/api/auth/admin/refresh/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import connect from "@/lib/mongodb";
import User from "@/lib/models/User";
import { verifyToken, generateAccessToken } from "@/lib/auth";

export async function POST() {
  try {
    await connect();
    const cookieStore = await cookies();
    const adminRefreshToken = cookieStore.get("adminRefreshToken")?.value;

    if (!adminRefreshToken) {
      return NextResponse.json(
        { success: false, message: "No refresh token" },
        { status: 401 }
      );
    }

    // Verify the refresh token
    const payload = verifyToken(
      adminRefreshToken,
      process.env.REFRESH_TOKEN_SECRET!
    );

    if (!payload) {
      return NextResponse.json(
        { success: false, message: "Invalid refresh token" },
        { status: 401 }
      );
    }

    // Find the admin user
    const user = await User.findOne({
      _id: payload.userId,
      role: { $in: ["admin", "superadmin"] },
    });

    if (!user || user.adminRefreshToken !== adminRefreshToken) {
      return NextResponse.json(
        { success: false, message: "Invalid token or not an admin" },
        { status: 401 }
      );
    }

    // Generate new access token
    const newAccessToken = generateAccessToken(user._id.toString(), user.role);

    const res = NextResponse.json({ success: true });
    const isProduction = process.env.NODE_ENV === "production";

    // Set the new access token
    res.cookies.set("adminAccessToken", newAccessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "strict",
      maxAge: 60 * 15, // 15 minutes
      path: "/",
    });

    return res;
  } catch (err: any) {
    console.error("Admin refresh API error:", err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}