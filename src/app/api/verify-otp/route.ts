import { NextResponse } from "next/server";
import connect from "../../../lib/mongodb";
import Otp from "../../../lib/models/Otp";
import User from "../../../lib/models/User";
import { generateAccessToken, generateRefreshToken } from "../../../lib/auth";

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();
    if (!email || !otp)
      return NextResponse.json({ success: false, message: "Missing fields" }, { status: 400 });

    await connect();

    const record = await Otp.findOne({ email });
    if (!record) return NextResponse.json({ success: false, message: "OTP not found" }, { status: 400 });

    if (new Date() > record.expiresAt) {
      await Otp.deleteOne({ email });
      return NextResponse.json({ success: false, message: "OTP expired" }, { status: 400 });
    }

    if (record.otp !== Number(otp)) {
      return NextResponse.json({ success: false, message: "Invalid OTP" }, { status: 400 });
    }

    await Otp.deleteOne({ email });

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email });
    }

    const accessToken = generateAccessToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

    user.refreshToken = refreshToken;
    await user.save();

    const res = NextResponse.json({
      success: true,
      user: { email: user.email, name: user.name },
      message: "Login Successful",
    });

    // Fixed cookie settings
    const isProduction = process.env.NODE_ENV === "production";

    res.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: isProduction, // Only use secure in production
      sameSite: "lax", // Important for cross-page persistence
      maxAge: 60 * 15, // 15 minutes
      path: "/",
    });

    res.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return res;

  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}