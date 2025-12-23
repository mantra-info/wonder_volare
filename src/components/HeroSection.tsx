"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

export default function HeroSection() {
  const [bgIndex, setBgIndex] = useState(0);
  const router = useRouter();

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
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={`/Wonder_v_banner.mp4`} type="video/mp4" />
            </video>
          </motion.div>
        </AnimatePresence>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
      </div>

      {/* --- Hero Content --- */}
      <div className="relative z-20 h-[calc(90vh-100px)] md:h-[calc(100vh-80px) flex items-end md:items-center px-6 md:px-12 max-w-7xl mx-auto">
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl md:text-5xl md:text-6xl font-bold leading-tight"
          >
            The hills meet the <br />
            clouds, and you <br />
            meet wonder
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="hidden md:block mt-6 text-sm lg:text-lg text-white max-w-lg leading-relaxed"
          >
            Welcome to Wonder Volare, Munnar’s first-ever hot air balloon
            experience that lets you rise above the valleys, breathe in the
            mountain air, and see the world from a whole new view.
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
            className="mt-10 group bg-white text-black rounded-2xl py-2 pl-6 pr-2 flex items-center shadow-lg hover:shadow-xl transition-all duration-300"
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
