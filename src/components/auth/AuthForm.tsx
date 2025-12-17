"use client";

import React, { useState } from "react";
import OtpInput from "@/components/ui/OtpInput";
import { useAuth } from "@/context/AuthContext";

interface AuthFormProps {
  onSuccess: () => void;
}

export default function AuthForm({ onSuccess }: AuthFormProps) {
  const [step, setStep] = useState<"EMAIL" | "OTP">("EMAIL");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      
      if (data.success) {
        setStep("OTP");
      } else {
        alert(data.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (otpCode: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otpCode }),
      });
      const data = await res.json();

      if (data.success) {
        setUser(data.user);
        onSuccess(); // Close modal
      } else {
        alert(data.message || "Invalid OTP");
      }
    } catch (error) {
      console.error(error);
      alert("Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {step === "EMAIL" ? (
        <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="name@example.com"
              className="w-full rounded-lg text-black border border-gray-300 px-4 py-3 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-black px-4 py-3 font-semibold text-white hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? "Sending..." : "Continue with Email"}
          </button>
        </form>
      ) : (
        <div className="text-center">
          <p className="text-gray-500 mb-4">
            Enter the 6-digit code sent to <br /> <span className="font-bold text-black">{email}</span>
          </p>
          
          <OtpInput length={6} onComplete={handleVerifyOtp} />

          {loading && <p className="text-sm text-gray-500 mt-2">Verifying...</p>}

          <button
            onClick={() => setStep("EMAIL")}
            className="mt-6 text-sm text-gray-500 hover:text-black underline"
          >
            Wrong email? Go back
          </button>
        </div>
      )}
    </div>
  );
}