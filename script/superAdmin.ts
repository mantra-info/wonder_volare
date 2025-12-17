import dotenv from "dotenv";
import * as path from "path";
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });
import mongoose from "mongoose";
import * as bcrypt from "bcrypt";
import User from "../src/lib/models/User";
async function createAdmin() {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      console.error("MONGODB_URI is not defined in .env");
      process.exit(1);
    }
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");

    const email = "nasvank7@gmail.com";
    const password = "StrongPassword123"; // choose a strong password
    const role = "superadmin"; // or "admin"

    // Check if already exists
    const existing = await User.findOne({ email });
    if (existing) {
      console.log("Admin already exists!");
      process.exit(0);
    }

    // Hash password
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const admin = await User.create({
      email,
      password: password,
      role,
      createdAt: new Date(),
    });

    console.log("Admin created:", admin.email);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

createAdmin();
