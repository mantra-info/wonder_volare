import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { verify } from "jsonwebtoken";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

// 🔒 SECURITY: Define plans here so users can't manipulate prices from frontend
const SERVER_PLANS: Record<number, number> = {
  1: 1, // Classic Sunrise Ride
  2: 2, // Premium Couple Ride
};

export async function POST(req: NextRequest) {
  try {
    // Optional: Verify user is logged in before allowing payment init
    const token = req.cookies.get("accessToken")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { planId, guests } = await req.json();

    const pricePerPerson = SERVER_PLANS[planId];
    if (!pricePerPerson) {
      return NextResponse.json({ error: "Invalid Plan ID" }, { status: 400 });
    }

    const totalAmount = pricePerPerson * guests;

    // Create Razorpay Order
    const options = {
      amount: totalAmount * 100, // Amount in paise
      currency: "INR",
      receipt: "rcpt_" + Date.now().toString(36),
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      pricePerPerson: pricePerPerson // Send back confirmed price
    });

  } catch (error) {
    console.error("Razorpay Order Error:", error);
    return NextResponse.json({ error: "Could not initiate payment" }, { status: 500 });
  }
}