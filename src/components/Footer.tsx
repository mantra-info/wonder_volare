"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Twitter,
  MessageCircle, // Used as a proxy for WhatsApp
  Phone,
  Mail,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// --- Custom Balloon Logo SVG (Kept for the brand visual) ---
const WonderVolareLogo = () => (
  <div className="flex flex-col items-center justify-center ">
    <Image
      src="/logo.png"
      alt="Logo"
      width={200}
      height={150}
      className="h-auto w-[150px]"
    />
  </div>
);

const Footer = () => {
  return (
    <footer className="bg-[#055A3A] text-white pt-20 pb-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* --- Top Section: Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Column 1: Logo */}
          <div className="flex flex-col items-start">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <WonderVolareLogo />
            </motion.div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xl font-normal mb-6 text-white/90">
              Quick Links
            </h3>
            <ul className="space-y-4 text-white/80 font-light">
              {[
                "Home",
                "About Us",
                "Contact Us",
                "Privacy Policy",
                "Refund Policy",
                "Terms and Conditions",
              ].map((link) => {
                const slug = link.toLowerCase().replace(/\s+/g, "-");

                return (
                  <motion.li
                    key={link}
                    whileHover={{ x: 5, color: "#fff" }}
                    className="cursor-pointer transition-colors"
                  >
                    <Link href={`/${slug}`}>{link}</Link>
                  </motion.li>
                );
              })}
            </ul>
          </div>

          {/* Column 3: Address */}
          <div>
            <h3 className="text-xl font-normal mb-6 text-white/90">Address</h3>
            <div className="space-y-4 text-white/80 font-light leading-relaxed">
              <p>
                Wonder Volare
                <br />
                Munnar Hot Air Balloon
                <br />
                Kada Valayam, Itticity,
                <br />
                Anachal, Kerala 685565
              </p>

              <div className="pt-2 flex flex-col items-start gap-3">
                <a
                  href="tel:+919778781906"
                  className="flex items-center gap-2 border-b border-white hover:text-white hover:border-transparent transition-all"
                >
                  <Phone size={16} />
                  +91 97787 81906
                </a>
                <a
                  href="mailto:wondervolare@gmail.com"
                  className="flex items-center gap-2 border-b border-white hover:text-white hover:border-transparent transition-all"
                >
                  <Mail size={16} />
                  wondervolare@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Get In Touch (Socials) */}
          <div>
            <h3 className="text-xl font-normal mb-6 text-white/90">
              Get In Touch
            </h3>
            <div className="flex items-center gap-4">
              {[
                { icon: Facebook, href: "#", label: "Facebook" },
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: MessageCircle, href: "#", label: "WhatsApp" }, // Lucide doesn't have WhatsApp, using MessageCircle
                { icon: Twitter, href: "#", label: "X / Twitter" }, // Lucide doesn't have X, using Twitter
              ].map((Social, idx) => (
                <motion.a
                  key={idx}
                  href={Social.href}
                  aria-label={Social.label}
                  whileHover={{ y: -3, scale: 1.1 }}
                  className="bg-transparent text-white hover:text-green-200 transition-colors"
                >
                  <Social.icon size={28} strokeWidth={1.5} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* --- Divider --- */}
        <div className="w-full h-px bg-white/20 mb-8" />

        {/* --- Bottom Section: Copyright --- */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white/70 gap-4">
          <p>Copyright 2025@WonderVolare.All Rights Reserved</p>
          <p className="flex items-center gap-1">
            Designed&Developed by{" "}
            <span className="text-white/90 font-medium">Mantrainfotechs</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
