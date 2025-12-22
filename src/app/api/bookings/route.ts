// app/api/bookings/route.ts
import { NextRequest, NextResponse } from "next/server";
import connect from "../../../lib/mongodb";
import Ticket from "../../../lib/models/Ticket";
import { verify } from "jsonwebtoken";
import User from "@/lib/models/User";
import crypto from "crypto";

// Define all possible time slots for availability check
const ALL_TIME_SLOTS = [
  "06.00am - 07.00am",
  "07.30am - 08.30am",
  "09.00am - 10.00am",
  "10.30am - 11.30am",
  "05.00pm - 06.00pm",
];

// Helper function to generate unique ticket number
function generateTicketNumber(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 7);
  return `TKT-${timestamp}-${random}`.toUpperCase();
}

// Helper function to generate QR code data
function generateQRData(ticketData: any): string {
  return JSON.stringify({
    ticketNumber: ticketData.ticketNumber,
    email: ticketData.userEmail,
    plan: ticketData.planName,
    date: ticketData.date,
    time: ticketData.timeSlot,
    people: ticketData.numberOfPeople,
  });
}

export async function POST(req: NextRequest) {
  try {
    await connect();

    // Get user from token (Authentication logic for POST remains)
    const token = req.cookies.get("accessToken")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let userEmail: string;
    try {
      const decoded = verify(token, process.env.ACCESS_TOKEN_SECRET!) as {
        userId: string;
      };

      const user = await User.findById(decoded.userId);
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      userEmail = user.email;
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const body = await req.json();
    const {
      // Booking Details
      planId,
      planName,
      date,
      timeSlot,
      numberOfPeople,
      pricePerPerson,
      // Payment Details (New)
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = body;

    // Validate required fields
    if (
      !planId ||
      !date ||
      !timeSlot ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const bodyData = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(bodyData.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        { error: "Invalid Payment Signature" },
        { status: 400 }
      );
    }
    // Server-side check for availability before creating the ticket
    const targetDate = new Date(date);
    // Set time bounds for the query
    const startOfDay = new Date(targetDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(targetDate);
    endOfDay.setHours(23, 59, 59, 999);

    // Check if the slot is already booked for this date
    const existingBooking = await Ticket.findOne({
      date: { $gte: startOfDay, $lte: endOfDay },
      timeSlot: timeSlot,
      status: "confirmed",
    });

    if (existingBooking) {
      return NextResponse.json(
        { error: "The selected time slot is already booked." },
        { status: 409 } // 409 Conflict: Slot Unavailable
      );
    }

    // Generate ticket number and QR data
    const ticketNumber = generateTicketNumber();
    const totalPrice = pricePerPerson * numberOfPeople;

    const ticketData = {
      userEmail,
      planId,
      planName,
      date: new Date(date),
      timeSlot,
      numberOfPeople,
      pricePerPerson,
      totalPrice,
      ticketNumber,
      qrCode: "",
      status: "confirmed", // Set to confirmed now that payment is verified

      // Save Payment Info
      payment: {
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        amountPaid: totalPrice,
        status: "success",
      },
    };
    ticketData.qrCode = generateQRData(ticketData);

    // Save to database
    const ticket = await Ticket.create(ticketData);

    return NextResponse.json({
      success: true,
      ticket: {
        id: ticket._id,
        ticketNumber: ticket.ticketNumber,
        qrCode: ticket.qrCode,
        planName: ticket.planName,
        date: ticket.date,
        timeSlot: ticket.timeSlot,
        numberOfPeople: ticket.numberOfPeople,
        totalPrice: ticket.totalPrice,
      },
    });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}

// GET endpoint to fetch user's bookings OR availability
export async function GET(req: NextRequest) {
  try {
    await connect();

    const url = new URL(req.url);
    const dateQuery = url.searchParams.get("date"); // Check for date query parameter

    // --- Availability Check Logic (Checks for slots on a specific date) ---
    if (dateQuery) {
      const targetDate = new Date(dateQuery);

      // Validate date
      if (isNaN(targetDate.getTime())) {
        return NextResponse.json(
          { error: "Invalid date format" },
          { status: 400 }
        );
      }

      // Set time bounds for the query
      const startOfDay = new Date(targetDate);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(targetDate);
      endOfDay.setHours(23, 59, 59, 999);

      // 1. Find all booked slots for the selected date
      const bookedTickets = await Ticket.find({
        date: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
        status: { $nin: ["cancelled", "pending_payment"] }
      }).select("timeSlot");

      const bookedSlots = bookedTickets.map((ticket) => ticket.timeSlot);
      const uniqueBookedSlots = new Set(bookedSlots);

      // 2. Determine availability for all slots
      const availability = ALL_TIME_SLOTS.map((slot) => ({
        time: slot,
        status: uniqueBookedSlots.has(slot) ? "unavailable" : "available",
      }));

      return NextResponse.json({ slots: availability });
    }
    // ---------------------------------------------------

    // --- Existing Fetch User Bookings Logic ---
    const token = req.cookies.get("accessToken")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let userEmail: string;
    try {
      const decoded = verify(token, process.env.ACCESS_TOKEN_SECRET!) as {
        userId: string;
      };

      const user = await User.findById(decoded.userId);
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      userEmail = user.email;
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const tickets = await Ticket.find({ userEmail }).sort({ createdAt: -1 });

    return NextResponse.json({ tickets });
  } catch (error) {
    console.error("Fetch bookings or availability error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
