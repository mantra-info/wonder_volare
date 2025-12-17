// app/api/auth/admin/logout/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import connect from "@/lib/mongodb";
import User from "@/lib/models/User";
import jwt from "jsonwebtoken";

export async function POST() {
  try {
    await connect();
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("adminRefreshToken")?.value;

    // Clear refresh token from database if it exists
    if (refreshToken) {
      try {
        const decoded = jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET!
        ) as { userId: string };

        if (decoded.userId) {
          await User.findByIdAndUpdate(decoded.userId, {
            $unset: { adminRefreshToken: "" },
          });
        }
      } catch (e) {
        // Token invalid, continue with logout anyway
        console.log("Token verification failed during logout:", e);
      }
    }

    const res = NextResponse.json({ success: true, message: "Logged out successfully" });

    const isProduction = process.env.NODE_ENV === "production";

    // Clear both cookies
    res.cookies.set("adminAccessToken", "", {
      httpOnly: true,
      secure: isProduction,
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    });

    res.cookies.set("adminRefreshToken", "", {
      httpOnly: true,
      secure: isProduction,
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    });

    return res;
  } catch (err: any) {
    console.error("Admin logout error:", err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}