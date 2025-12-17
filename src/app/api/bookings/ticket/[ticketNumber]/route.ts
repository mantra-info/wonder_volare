import { NextRequest, NextResponse } from "next/server";
import connect from "../../../../../lib/mongodb";
import Ticket from "../../../../../lib/models/Ticket";
import User from "@/lib/models/User";
import { verify } from "jsonwebtoken";

export async function GET(
  req: NextRequest,
  props: { params: Promise<{ ticketNumber: string }> }
) {
  try {
    await connect();

    const token = req.cookies.get("accessToken")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify access token
    const decoded = verify(token, process.env.ACCESS_TOKEN_SECRET!) as {
      userId: string;
    };

    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

   const params = await props.params;
  
  // 2. Now you can use ticketNumber
  const { ticketNumber } = params;


    // Find ticket using ticketNumber
    const ticket = await Ticket.findOne({ ticketNumber });

    if (!ticket) {
      return NextResponse.json(
        { error: "Ticket not found" },
        { status: 404 }
      );
    }

    // Ensure ticket belongs to the logged-in user
    if (ticket.userEmail !== user.email) {
      return NextResponse.json(
        { error: "Access denied" },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      ticket,
    });
  } catch (error) {
    console.error("Fetch ticket error:", error);
    return NextResponse.json(
      { error: "Failed to fetch ticket" },
      { status: 500 }
    );
  }
}
