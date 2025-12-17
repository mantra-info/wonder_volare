import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link"; // Assuming Next.js, use <a> if standard React

interface BookRideButtonProps {
  label?: string;
  href?: string;
  mode?: "floating" | "inline";
  className?: string;
}

const BookRideButton: React.FC<BookRideButtonProps> = ({
  label = "Book Your Ride Now!",
  href = "/booking",
  mode = "floating",
  className = "",
}) => {
  // Base styles for the button
  const baseStyles =
    "group flex items-center gap-3 bg-[#1e9e6e] text-white font-medium pl-6 pr-2 py-2 rounded-full shadow-xl transition-all duration-300 hover:bg-[#168a5d] hover:shadow-2xl hover:scale-105";

  // Position styles based on mode
  const positionStyles =
    mode === "floating"
      ? "fixed bottom-8 right-8 z-50 animate-in fade-in slide-in-from-bottom-4"
      : "relative";

  return (
    <Link href={href} className={`${baseStyles} ${positionStyles} ${className}`}>
      <span className="text-lg tracking-wide">{label}</span>
      <div className="bg-white text-[#1e9e6e] rounded-full p-2 transition-transform duration-300 group-hover:rotate-45">
        <ArrowRight size={20} strokeWidth={2.5} />
      </div>
    </Link>
  );
};

export default BookRideButton;