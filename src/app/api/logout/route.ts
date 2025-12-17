import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import connect from "../../../lib/mongodb";
import User from "../../../lib/models/User";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    // Clear refresh token from database
    if (refreshToken) {
      await connect();
      await User.findOneAndUpdate(
        { refreshToken },
        { $unset: { refreshToken: "" } }
      );
    }

    // Clear cookies
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");

    return NextResponse.json({ success: true, message: "Logged out" });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}