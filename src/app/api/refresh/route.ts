import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import connect from "../../../lib/mongodb";
import User from "../../../lib/models/User";
import { verifyToken, generateAccessToken } from "../../../lib/auth";

export async function POST() {
  try {
    await connect();
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json({ success: false, message: "No refresh token" }, { status: 401 });
    }

    const payload = verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET!);
    
    if (!payload) {
      return NextResponse.json({ success: false, message: "Invalid refresh token" }, { status: 401 });
    }

    const user = await User.findById(payload.userId);
    
    if (!user || user.refreshToken !== refreshToken) {
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
    }

    const newAccessToken = generateAccessToken(user._id.toString(),"user");
    const res = NextResponse.json({ success: true });
    
    const isProduction = process.env.NODE_ENV === "production";
    
    res.cookies.set("accessToken", newAccessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      maxAge: 60 * 15,
      path: "/",
    });

    return res;

  } catch (err: any) {
    console.error("Refresh API error:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
