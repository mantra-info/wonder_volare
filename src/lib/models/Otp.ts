import mongoose, { Schema, model, models } from "mongoose";

interface IOtp {
  email: string;
  otp: number;
  expiresAt: Date;
}

const otpSchema = new Schema<IOtp>({
  email: { type: String, required: true, unique: true },
  otp: { type: Number, required: true },
  expiresAt: { type: Date, required: true },
});

// Use existing model if already compiled (prevents recompilation in dev)
const Otp = models.Otp || model<IOtp>("Otp", otpSchema);
export default Otp;
