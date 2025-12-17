// models/AdminOtp.ts
import mongoose, { Schema, model, models } from "mongoose";

interface IAdminOtp {
  userId: mongoose.Types.ObjectId;
  otp: number;
  expiresAt: Date;
  createdAt: Date;
}

const adminOtpSchema = new Schema<IAdminOtp>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  otp: { type: Number, required: true },
  expiresAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

const AdminOtp = models.AdminOtp || model<IAdminOtp>("AdminOtp", adminOtpSchema);
export default AdminOtp;
