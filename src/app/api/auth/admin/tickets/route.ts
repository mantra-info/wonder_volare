import { NextResponse } from "next/server";
import connect from "@/lib/mongodb";
import Ticket from "@/lib/models/Ticket";


export async function GET() {
  try {
    await connect();

    const tickets = await Ticket.find({})
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      { success: true, data: tickets },
      { status: 200 }
    );
  } catch (error) {
    console.error("Admin tickets fetch error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch tickets" },
      { status: 500 }
    );
  }
}
