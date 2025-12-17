// lib/models/User.ts
import mongoose, { Schema, model, models, Document } from "mongoose";
import * as bcrypt from "bcrypt";

interface IUser {
  email: string;
  role: "user" | "admin" | "superadmin";
  password?: string;
  refreshToken?: string; // For regular user sessions
  adminRefreshToken?: string; // For admin sessions (NEW)
  status: "active" | "disabled";
  createdAt: Date;
}

type IUserDocument = IUser & Document;

const userSchema = new Schema<IUserDocument>({
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ["user", "admin", "superadmin"], default: "user" },
  password: { type: String },
  refreshToken: { type: String, default: null },
  adminRefreshToken: { type: String, default: null }, // NEW: Separate token for admin sessions
  status: { type: String, enum: ["active", "disabled"], default: "active" },
  createdAt: { type: Date, default: Date.now },
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  if (this.password) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

const User = models.User || model<IUserDocument>("User", userSchema);
export default User;