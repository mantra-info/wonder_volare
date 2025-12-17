// app/admin/layout.tsx
'use client';

import { useState } from 'react';
import { Sidebar } from '../components/SideBar';
import { Header } from '../components/Header';


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 overflow-hidden">
      
      {/* Sidebar - Responsive */}
      <Sidebar 
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={closeMobileSidebar}
      />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        
        {/* Header - Responsive */}
        <Header onMobileMenuToggle={toggleMobileSidebar} />

        {/* Page Content - Responsive with proper scrolling */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="container mx-auto px-4 py-6 md:px-6 md:py-8 max-w-7xl">
            {children}
          </div>
        </main>
        
      </div>
    </div>
  );
}