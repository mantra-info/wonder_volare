import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import connect from "../../../lib/mongodb";
import Otp from "../../../lib/models/Otp";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 });

    await connect();

    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // Save OTP in MongoDB
    await Otp.findOneAndUpdate(
      { email },
      { otp, expiresAt },
      { upsert: true, new: true }
    );

    // Send OTP via Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP for Login / Signup",
      text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
    });

    return NextResponse.json({ success: true, message: "OTP sent to your email" });
  } catch (error: any) {
    console.error("Send OTP Error:", error);
    return NextResponse.json({ success: false, message: "Failed to send OTP", error: error.message }, { status: 500 });
  }
}
