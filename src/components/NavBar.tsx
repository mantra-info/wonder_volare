"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Modal from "@/components/ui/Modal";
import AuthForm from "@/components/auth/AuthForm";
import MobileMenu from "@/components/ui/MobileMenu";

const NAV_LINKS = [
  { name: "Home", href: "/", active: true },
  { name: "About", href: "/about-us" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact Us", href: "contact-us" },
];

export default function Navbar() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, setUser } = useAuth();

  const handleLogout = async () => {
    await fetch("/api/logout", { credentials: "include" });
    setUser(null);
  };

  return (
    <>
      <div className="relative z-20 w-full border-b border-white/50">
        <nav className="mx-auto max-w-7xl flex justify-between items-center px-6 py-4">
          <Link href="/">
             <Image src="/logo.png" width={140} height={120} alt="Logo" className="w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-md hover:text-white transition-colors ${
                  link.active ? "text-white font-medium border-b-2 border-white" : "text-gray-300"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {user ? (
              <div className="flex items-center gap-4 pl-4 border-l border-white/20">
                <span className="text-white text-sm">
                  Hello, {user.name?.split(" ")[0] || "User"}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-5 py-2 text-sm font-medium bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full hover:bg-red-500 hover:border-red-500 transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="px-6 py-2 text-sm font-medium bg-white text-black rounded-full hover:bg-gray-100 transition-all"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <button
            className="md:hidden p-2 text-white bg-white/10 backdrop-blur-md rounded-full"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </nav>
      </div>

      {/* Logic Components */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        links={NAV_LINKS}
        user={user}
        onLoginClick={() => setIsAuthOpen(true)}
        onLogoutClick={handleLogout}
      />

      <Modal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} title="Welcome Back">
        <AuthForm onSuccess={() => setIsAuthOpen(false)} />
      </Modal>
    </>
  );
}