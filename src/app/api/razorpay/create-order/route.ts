import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { verify } from "jsonwebtoken";
import Ticket from "@/lib/models/Ticket";
import connect from "@/lib/mongodb"; // Ensure this is imported
import User from "@/lib/models/User";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!, // Use server-side key
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

const SERVER_PLANS: Record<number, { name: string; price: number }> = {
  1: { name: "Classic Sunrise Ride", price: 1500 },
  2: { name: "Premium Couple Ride", price: 3999 },
};

export async function POST(req: NextRequest) {
  try {
    await connect();

    // 1. Secure Authentication
    const token = req.cookies.get("accessToken")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    let userEmail: string;
    try {
      const decoded = verify(token, process.env.ACCESS_TOKEN_SECRET!) as { userId: string };
      const user = await User.findById(decoded.userId);
      if (!user) throw new Error();
      userEmail = user.email; // Use email from DB, not from request body
    } catch {
      return NextResponse.json({ error: "Invalid Session" }, { status: 401 });
    }

    const { planId, guests, date, timeSlot } = await req.json();

    // 2. Validate Plan
    const plan = SERVER_PLANS[planId];
    if (!plan) return NextResponse.json({ error: "Invalid Plan" }, { status: 400 });

    // 3. Check for Locking (User-Aware Lock)
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    
    // We search for a block: 
    // Either a confirmed ticket OR a pending ticket from someone ELSE within the last 10 mins
    const blockReason = await Ticket.findOne({
      date: new Date(date),
      timeSlot: timeSlot,
      $or: [
        { status: "confirmed" },
        {
          status: "pending_payment",
          lockedAt: { $gte: tenMinutesAgo },
          userEmail: { $ne: userEmail }, // Allow the same user to retry
        },
      ],
    });

    if (blockReason) {
      return NextResponse.json(
        { error: "This slot is currently being booked by someone else." },
        { status: 409 }
      );
    }

    const totalAmount = plan.price * guests;

    // 4. Create Razorpay Order
    const order = await razorpay.orders.create({
      amount: totalAmount * 100,
      currency: "INR",
      receipt: "rcpt_" + Date.now().toString(36),
    });

    // 5. Atomic UPSERT (One operation to rule them all)
    // This finds an existing pending ticket for THIS user/date/slot and updates it,
    // OR creates a new one if it doesn't exist.
    await Ticket.findOneAndUpdate(
      {
        userEmail,
        date: new Date(date),
        timeSlot,
        status: "pending_payment", // Only update if it's still pending
      },
      {
        planId,
        planName: plan.name,
        numberOfPeople: guests,
        pricePerPerson: plan.price,
        totalPrice: totalAmount,
        ticketNumber: `TKT-PEND-${Date.now()}`,
        lockedAt: new Date(), // Set/Refresh the lock timer
        payment: {
          razorpayOrderId: order.id,
          amountPaid: totalAmount,
          status: "pending",
        },
      },
      { upsert: true, new: true }
    );

    // REMOVED: Ticket.create(...) <- This was causing your duplicates

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      pricePerPerson: plan.price,
    });
  } catch (error) {
    console.error("Razorpay Order Error:", error);
    return NextResponse.json({ error: "Could not initiate payment" }, { status: 500 });
  }
}