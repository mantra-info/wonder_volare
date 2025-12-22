// app/api/webhooks/razorpay/route.ts
import  crypto  from "crypto";
import Ticket from "@/lib/models/Ticket";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("x-razorpay-signature");

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
    .update(body)
    .digest("hex");

  if (expectedSignature !== signature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const event = JSON.parse(body);

  if (event.event === "order.paid") {
    const orderId = event.payload.order.entity.id;
    const paymentId = event.payload.payment.entity.id;

    // Find the pending ticket and confirm it
    const ticket = await Ticket.findOne({ "payment.razorpayOrderId": orderId });
    if (ticket && ticket.status !== "confirmed") {
      ticket.status = "confirmed";
      ticket.payment.status = "success";
      ticket.payment.razorpayPaymentId = paymentId;
      // Update ticket number from PENDING to REAL
      ticket.ticketNumber = ticket.ticketNumber.replace("PEND-", "VAL-");
      await ticket.save();
      
      // Logic to send Email/WhatsApp here
    }
  }

  return NextResponse.json({ status: "ok" });
}