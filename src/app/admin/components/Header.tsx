// components/Header.tsx
'use client';

import { Bell, Search, User, Menu, X, LogOut, Settings as SettingsIcon, UserCircle } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  onMobileMenuToggle: () => void;
}

export function Header({ onMobileMenuToggle }: HeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState(3); // Example unread count
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/admin/logout', {
        method: 'POST',
        credentials: 'include',
      });
      window.location.href = '/admin/login';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 md:h-20 bg-white/80 backdrop-blur-xl shadow-lg border-b border-gray-200 px-4 md:px-6">
      
      {/* Left Section: Mobile Menu + Search */}
      <div className="flex items-center gap-3 flex-1">
        {/* Mobile Menu Button */}
        <motion.button
          onClick={onMobileMenuToggle}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="lg:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
          aria-label="Toggle Menu"
        >
          <Menu size={24} />
        </motion.button>

        {/* Desktop Search Bar */}
        <div className="hidden md:block flex-1 max-w-xl">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tickets, users, or settings..."
              className="w-full pl-11 pr-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all bg-gray-50"
            />
            <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            {searchQuery && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </motion.button>
            )}
          </div>
        </div>

        {/* Mobile Search Button */}
        <motion.button
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="md:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
          aria-label="Search"
        >
          <Search size={22} />
        </motion.button>
      </div>

      {/* Right Section: Notifications + User Menu */}
      <div className="flex items-center gap-2 md:gap-4">
        
        {/* Notifications Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-2 md:p-2.5 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
          aria-label="Notifications"
        >
          <Bell size={22} />
          {notifications > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-1 right-1 h-5 w-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold"
            >
              {notifications}
            </motion.span>
          )}
        </motion.button>

        {/* User Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <motion.button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 md:gap-3 p-2 md:px-3 md:py-2 rounded-xl hover:bg-gray-100 transition-all"
          >
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center text-white shadow-lg">
              <User size={20} />
            </div>
            <div className="hidden md:block text-left">
              <p className="font-semibold text-gray-800 text-sm">Admin User</p>
              <p className="text-xs text-gray-500">Super Admin</p>
            </div>
          </motion.button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden z-50"
              >
                {/* User Info */}
                <div className="px-4 py-3 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-100">
                  <p className="font-semibold text-gray-800">Admin User</p>
                  <p className="text-sm text-gray-600">admin@example.com</p>
                </div>

                {/* Menu Items */}
                <div className="py-2">
                  <motion.button
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-all"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      // Navigate to profile
                    }}
                  >
                    <UserCircle size={18} className="text-gray-500" />
                    <span className="font-medium">Profile</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-all"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      // Navigate to settings
                    }}
                  >
                    <SettingsIcon size={18} className="text-gray-500" />
                    <span className="font-medium">Settings</span>
                  </motion.button>
                </div>

                {/* Logout */}
                <div className="border-t border-gray-100">
                  <motion.button
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-red-600 hover:bg-red-50 transition-all"
                    onClick={handleLogout}
                  >
                    <LogOut size={18} />
                    <span className="font-semibold">Sign Out</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 p-4 md:hidden shadow-lg"
          >
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                autoFocus
                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all"
              />
              <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}