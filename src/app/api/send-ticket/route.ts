import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import connectDB from "@/lib/mongodb";
import Ticket from "@/lib/models/Ticket";

export async function POST(req: Request) {
  let bookingId: string | null = null;

  try {
    // 1️⃣ Connect DB
    await connectDB();

    // 2️⃣ Read form data
    const formData = await req.formData();
    const file = formData.get("file") as Blob | null;
    const email = formData.get("email") as string | null;
    bookingId = formData.get("bookingId") as string | null;

    if (!file || !email || !bookingId) {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      );
    }

    // 3️⃣ Find ticket
    const ticket = await Ticket.findOne({ ticketNumber: bookingId });

    if (!ticket) {
      return NextResponse.json(
        { error: "Ticket not found" },
        { status: 404 }
      );
    }

    // 4️⃣ Ensure delivery object exists (VERY IMPORTANT)
    if (!ticket.delivery) {
      ticket.delivery = {
        email: { sent: false, attempts: 0 },
        whatsapp: { sent: false, attempts: 0 },
      };
      await ticket.save();
    }

    // 5️⃣ Idempotency check (SAFE)
    if (ticket.delivery?.email?.sent === true) {
      return NextResponse.json({
        success: true,
        message: "Ticket already sent",
      });
    }

    // 6️⃣ Convert PDF Blob → Buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // 7️⃣ Send Email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: '"Booking Team" <noreply@yourdomain.com>',
      to: email,
      subject: `Your Booking Ticket #${bookingId}`,
      text: "Thank you for your booking. Please find your ticket attached.",
      attachments: [
        {
          filename: `ticket-${bookingId}.pdf`,
          content: buffer,
        },
      ],
    });

    // 8️⃣ Update delivery status AFTER success
    await Ticket.updateOne(
      { ticketNumber: bookingId },
      {
        $set: {
          "delivery.email.sent": true,
          "delivery.email.sentAt": new Date(),
        },
        $inc: {
          "delivery.email.attempts": 1,
        },
      }
    );

    return NextResponse.json({
      success: true,
      message: "Ticket sent successfully",
    });
  } catch (error) {
    console.error("Send Ticket Error:", error);

    // 9️⃣ Increment attempts on failure
    if (bookingId) {
      await Ticket.updateOne(
        { ticketNumber: bookingId },
        {
          $inc: {
            "delivery.email.attempts": 1,
          },
        }
      );
    }

    return NextResponse.json(
      { error: "Failed to send ticket" },
      { status: 500 }
    );
  }
}
