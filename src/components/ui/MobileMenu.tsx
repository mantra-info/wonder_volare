"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { name: string; href: string; active?: boolean }[];
  user: any; // Replace with your actual User type
  onLoginClick: () => void;
  onLogoutClick: () => void;
}

export default function MobileMenu({
  isOpen,
  onClose,
  links,
  user,
  onLoginClick,
  onLogoutClick,
}: MobileMenuProps) {
  // Animation variants for the container
  const menuVariants = {
    closed: {
      opacity: 0,
      scale: 0,
      borderBottomLeftRadius: "100%",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    open: {
      opacity: 1,
      scale: 1,
      borderBottomLeftRadius: "0%",
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  // Animation for individual links (staggered)
  const linkVariants = {
    closed: { x: 50, opacity: 0 },
    open: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: { delay: i * 0.1 + 0.2, duration: 0.4 },
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop (Optional: clicks outside to close) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          />

          {/* Glazing Modal Content */}
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            style={{ transformOrigin: "top right" }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[350px] z-50 bg-black/60 backdrop-blur-2xl border-l border-white/10 shadow-2xl p-6 md:hidden flex flex-col"
          >
            {/* Header: Logo & Close Button */}
            <div className="flex justify-between items-center mb-10">
              <div className="relative w-28 h-10 opacity-80">
                 {/* Ensure you have a white version of logo or use filter */}
                 <Image src="/logo.png" alt="Logo" fill className="object-contain" />
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-6">
              {links.map((link, i) => (
                <motion.div
                  key={link.name}
                  custom={i}
                  variants={linkVariants}
                  initial="closed"
                  animate="open"
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className={`text-3xl font-light tracking-wide hover:text-green-400 transition-colors flex items-center justify-between group ${
                      link.active ? "text-white font-normal" : "text-gray-400"
                    }`}
                  >
                    {link.name}
                    <ArrowUpRight 
                      className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-green-500" 
                      size={24} 
                    />
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Auth Section */}
            <motion.div
              variants={linkVariants}
              custom={links.length}
              initial="closed"
              animate="open"
              className="mt-auto pt-8 border-t border-white/10"
            >
              {user ? (
                <div className="space-y-4">
                  <p className="text-gray-300 text-sm">
                    Logged in as <span className="text-white font-semibold">{user.name || user.email}</span>
                  </p>
                  <button
                    onClick={() => {
                      onLogoutClick();
                      onClose();
                    }}
                    className="w-full py-3 bg-red-500/20 border border-red-500/50 text-red-200 rounded-xl hover:bg-red-500 hover:text-white transition-all font-medium"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    onLoginClick();
                    onClose();
                  }}
                  className="w-full py-3 bg-white text-black rounded-xl hover:bg-gray-200 transition-all font-bold text-lg"
                >
                  Login / Signup
                </button>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}