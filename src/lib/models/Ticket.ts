import mongoose, { Schema, model, models } from "mongoose";

interface ITicket {
  userEmail: string;
  planId: number;
  planName: string;
  date: Date;
  timeSlot: string;
  numberOfPeople: number;
  pricePerPerson: number;
  totalPrice: number;
  qrCode: string;
  ticketNumber: string;
  status: "confirmed" | "cancelled" | "completed" | "pending_payment"; // Added pending
  createdAt: Date;

  // 💳 PAYMENT DETAILS (New Fields)
  payment: {
    razorpayOrderId: string;
    razorpayPaymentId?: string;
    razorpaySignature?: string;
    amountPaid: number;
    status: "success" | "failed" | "pending";
  };
  lockedAt: Date;
  delivery: {
    email: { sent: boolean; sentAt?: Date; attempts: number };
    whatsapp: { sent: boolean; sentAt?: Date; attempts: number };
  };
}

const ticketSchema = new Schema<ITicket>({
  userEmail: { type: String, required: true },
  planId: { type: Number, required: true },
  planName: { type: String, required: true },
  date: { type: Date, required: true },
  timeSlot: { type: String, required: true },
  numberOfPeople: { type: Number, required: true },
  pricePerPerson: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  qrCode: { type: String }, // Made optional initially
  ticketNumber: { type: String, required: true, unique: true },
  status: {
    type: String,
    enum: ["confirmed", "cancelled", "completed", "pending_payment"],
    default: "pending_payment",
  },
  createdAt: { type: Date, default: Date.now },

  // 💳 PAYMENT SCHEMA
  payment: {
    razorpayOrderId: { type: String, required: true },
    razorpayPaymentId: { type: String },
    razorpaySignature: { type: String },
    amountPaid: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["success", "failed", "pending"],
      default: "pending",
    },
  },
  lockedAt: { type: Date, default: Date.now },
  delivery: {
    email: {
      sent: { type: Boolean, default: false },
      sentAt: Date,
      attempts: { type: Number, default: 0 },
    },
    whatsapp: {
      sent: { type: Boolean, default: false },
      sentAt: Date,
      attempts: { type: Number, default: 0 },
    },
  },
});

const Ticket = models.Ticket || model<ITicket>("Ticket", ticketSchema);
export default Ticket;
