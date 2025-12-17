import { NextResponse } from "next/server";
import connect from "@/lib/mongodb";
import User from "@/lib/models/User";

export async function GET() {
  try {
    await connect();

    const users = await User.find({ role: "user" })
      .select("_id email role status createdAt")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error("Fetch users error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
