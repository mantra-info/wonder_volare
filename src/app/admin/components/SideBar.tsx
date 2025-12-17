// components/Sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Users,
  Ticket,
  ChevronLeft,
  ChevronRight,
  X,
  LogOut,
  Settings,
  Shield
} from 'lucide-react';
import { useState, useEffect } from 'react';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: Home },
  { href: '/admin/tickets', label: 'Tickets', icon: Ticket },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

const sidebarVariants = {
  expanded: { width: 280, transition: { duration: 0.3, ease: 'easeInOut' } },
  collapsed: { width: 80, transition: { duration: 0.3, ease: 'easeInOut' } },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

interface SidebarProps {
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

export function Sidebar({ isMobileOpen, onMobileClose }: SidebarProps) {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getLinkClasses = (href: string) => {
    const isActive = pathname === href || pathname.startsWith(href + '/');

    return `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative
            ${isActive
        ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-200'
        : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
      }`;
  };

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

  const SidebarContent = () => (
    <div className="h-full flex flex-col p-4">
      {/* Logo Section */}
      <div className="mb-8">
        <motion.div
          className="flex items-center gap-3 px-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <AnimatePresence mode="wait">
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <h1 className="text-xl font-bold text-white whitespace-nowrap">Admin Panel</h1>
                <p className="text-xs text-gray-400 whitespace-nowrap">Management Console</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="space-y-2 flex-grow">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

          return (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                href={item.href}
                className={getLinkClasses(item.href)}
                onClick={onMobileClose}
              >
                <Icon size={20} className="flex-shrink-0" />
                <AnimatePresence mode="wait">
                  {isExpanded && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      className="whitespace-nowrap font-medium"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute right-0 w-1 h-full bg-white rounded-l-full"
                  />
                )}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Footer Section */}
      <div className="mt-auto space-y-2 pt-4 border-t border-gray-700">
        <motion.button
          onClick={handleLogout}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-3 w-full px-4 py-3 text-gray-300 hover:bg-red-600/20 hover:text-red-400 rounded-xl transition-all duration-200"
        >
          <LogOut size={20} className="flex-shrink-0" />
          <AnimatePresence mode="wait">
            {isExpanded && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="whitespace-nowrap font-medium"
              >
                Sign Out
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        <AnimatePresence mode="wait">
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="px-2 py-3 bg-gray-700/50 rounded-xl"
            >
              <p className="text-xs text-gray-400 mb-1">Logged in as:</p>
              <p className="text-sm text-white font-medium truncate">SuperAdmin</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );

  if (!isMounted) return null;

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={isExpanded ? 'expanded' : 'collapsed'}
        variants={sidebarVariants}
        className="hidden lg:flex h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex-shrink-0 relative"
      >
        {/* Desktop Toggle Button */}
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-6 -right-3 z-10 p-2 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg hover:shadow-xl transition-shadow"
          aria-label={isExpanded ? 'Collapse Sidebar' : 'Expand Sidebar'}
        >
          {isExpanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </motion.button>

        <SidebarContent />
      </motion.aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={overlayVariants}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={onMobileClose}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-72 bg-gradient-to-b from-gray-900 to-gray-800 text-white z-50 lg:hidden shadow-2xl"
            >
              {/* Mobile Close Button */}
              <motion.button
                onClick={onMobileClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-700 text-gray-300 hover:bg-red-600 hover:text-white transition-colors"
                aria-label="Close Sidebar"
              >
                <X size={20} />
              </motion.button>

              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}