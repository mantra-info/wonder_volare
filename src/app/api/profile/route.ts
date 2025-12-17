import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import connect from "../../../lib/mongodb";
import User from "../../../lib/models/User";
import { verifyToken } from "../../../lib/auth";

export async function GET() {
  try {
    await connect();
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const payload = verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET!);
    
    if (!payload) {
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
    }

    const user = await User.findById(payload.userId).select("-refreshToken");
    
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true, 
      user: { email: user.email, name: user.name } 
    });
    
  } catch (err: any) {
    console.error("Profile API error:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}