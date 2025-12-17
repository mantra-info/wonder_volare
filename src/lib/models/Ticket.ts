// models/Ticket.ts
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
  status: "confirmed" | "cancelled" | "completed";
  createdAt: Date;

  delivery: {
    email: {
      sent: boolean;
      sentAt?: Date;
      attempts: number;
    };
    whatsapp: {
      sent: boolean;
      sentAt?: Date;
      attempts: number;
    };
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
  qrCode: { type: String, required: true },
  ticketNumber: { type: String, required: true, unique: true },
  status: {
    type: String,
    enum: ["confirmed", "cancelled", "completed"],
    default: "confirmed",
  },
  createdAt: { type: Date, default: Date.now },

  // 🔑 DELIVERY TRACKING
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
  