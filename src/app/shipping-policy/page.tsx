import React from 'react';
import Link from 'next/link';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Shipping Policy | Wonder Volare Munnar',
  description: 'Read the shipping policy.',
};

export default function TermsPage() {
  const currentDate = new Date().toLocaleDateString();

  return (
    // Outer container: minimal padding on mobile (px-4), more on larger screens
       <div className="min-h-screen flex flex-col bg-white">
      <Header/>
      {/* Content Card: Max width prevents it from getting too wide on desktop */}
      <div className="max-w-4xl mx-auto bg-white shadow-sm rounded-lg overflow-hidden">
        
        {/* Inner Padding: p-6 for mobile, p-10 for desktop */}
        <div className="p-6 sm:p-10">
          
          {/* Header Section */}
          <div className="border-b pb-6 mb-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
             Shipping Policy
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm">
              Last Updated: {currentDate}
            </p>
          </div>

          {/* Main Content: text-sm on mobile for density, text-base on desktop for readability */}
          <div className="space-y-8 text-gray-700 text-sm sm:text-base leading-relaxed">
            
            <section>
           
              <p>
Wonder Volare Munnar does not ship any physical products.

All services offered on this website are experience-based bookings,
specifically hot air balloon rides. No physical goods are delivered.

Booking confirmations and tickets are sent digitally via email or WhatsApp.              </p>
            </section>

       

            {/* Contact Box */}
            <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-6 mt-8">
              <h3 className="font-bold text-indigo-900 mb-2">Have Questions?</h3>
              <p className="text-indigo-800 mb-4">Contact our front desk for clarifications.</p>
              <div className="flex flex-col sm:flex-row sm:gap-6 text-indigo-700 font-medium">
                <a href="mailto:wondervolare@gmail.com" className="hover:underline mb-2 sm:mb-0">
                 wondervolare@gmail.com
                </a>
                <a href="tel: +919778781906" className="hover:underline">
            +91 97787 81906
                </a>
              </div>
            </div>

            <div className="pt-4">
              <Link 
                href="/" 
                className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-semibold transition-colors duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}