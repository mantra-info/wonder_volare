import { NextResponse } from "next/server";
import * as bcrypt from "bcryptjs";
import User from "@/lib/models/User";
import AdminOtp from "@/lib/models/AdminOtp";
import nodemailer from "nodemailer";
import connect from "@/lib/mongodb"; // ✅ Add this import

export async function POST(req: Request) {
  try {
    await connect(); // ✅ Add this line
    
    const { email, password } = await req.json();

    const user = await User.findOne({
      email,
      role: { $in: ["admin", "superadmin"] },
    });
    
    if (!user) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    const match = await bcrypt.compare(password, user.password!);
    if (!match) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // Upsert OTP
    await AdminOtp.findOneAndUpdate(
      { userId: user._id },
      { otp, expiresAt, createdAt: new Date() },
      { upsert: true }
    );

    // Send OTP via email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    await transporter.sendMail({
      from: `"Admin Auth" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Admin OTP",
      text: `Your OTP is ${otp}. It expires in 5 minutes.`,
    });

    return NextResponse.json({ success: true, message: "OTP sent to email" });
  } catch (err: any) {
    console.error("Admin login error:", err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}