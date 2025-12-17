"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

const BACKGROUND_IMAGES = [
  "https://images.unsplash.com/photo-1506459225024-1428097a7e18?q=80&w=2574&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1524235489813-9118c7325603?q=80&w=2670&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2670&auto=format&fit=crop",
];

export default function HeroSection() {
  const [bgIndex, setBgIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* --- Background Slider --- */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={bgIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <Image
              src={BACKGROUND_IMAGES[bgIndex]}
              alt="Sky Background"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
      </div>

      {/* --- Hero Content --- */}
      <div className="relative z-20 h-[calc(100vh-80px)] flex items-center px-6 md:px-12 max-w-7xl mx-auto">
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold leading-tight"
          >
            Experience the Sky <br /> Like Never Before
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-lg text-gray-300 max-w-md leading-relaxed"
          >
            Soar above mountains and sunlit horizons with our magical hot air
            balloon ride. Book your adventure today.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push("/booknow")}
            className="mt-10 group bg-white text-black rounded-full py-2 pl-6 pr-2 flex items-center shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {/* Text with subtle attention animation */}
            <motion.span
              animate={{ y: [0, -2, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.8,
                ease: "easeInOut",
              }}
              className="text-lg font-medium"
            >
              Book Your Ride Now
            </motion.span>

            {/* Arrow button animation */}
            <motion.div
              animate={{ x: [0, 6, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
              }}
              className="ml-4 bg-green-600 text-white h-10 w-10 flex items-center justify-center rounded-full group-hover:bg-green-700"
            >
              <ArrowUpRight size={20} />
            </motion.div>
          </motion.button>
        </div>
      </div>
    </>
  );
}
