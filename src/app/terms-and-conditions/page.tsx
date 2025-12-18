import React from 'react';
import Link from 'next/link';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Terms & Conditions | Wonder Volare Munnar',
  description: 'Read the Terms and Conditions for your stay at Wonder Volare Munnar.',
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
              Terms and Conditions
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm">
              Last Updated: {currentDate}
            </p>
          </div>

          {/* Main Content: text-sm on mobile for density, text-base on desktop for readability */}
          <div className="space-y-8 text-gray-700 text-sm sm:text-base leading-relaxed">
            
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                1. Introduction
              </h2>
              <p>
                Welcome to Wonder Volare Munnar. These Terms and Conditions govern your booking and stay at our property. By making a reservation, you agree to abide by these terms. Please read them carefully before confirming your booking.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                2. Booking and Reservations
              </h2>
              <ul className="list-disc pl-5 space-y-2 marker:text-gray-400">
                <li>Valid government-issued photo identification (Aadhaar, Passport, Voter ID, or Driving License) is mandatory for all guests over the age of 18 upon check-in. PAN cards are <strong>not</strong> accepted.</li>
                <li>The primary guest must be at least 18 years of age to check into the hotel.</li>
                <li>Full payment or a deposit as per the selected rate plan is required to confirm a reservation.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                3. Check-In and Check-Out
              </h2>
              <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
                <p className="font-medium text-gray-900">Check-in: 02:00 PM</p>
                <p className="font-medium text-gray-900">Check-out: 11:00 AM</p>
              </div>
              <p className="mt-3">
                Early check-in and late check-out are subject to availability and may incur additional charges. Failure to check out by the stipulated time may result in an additional half-day or full-day charge.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                4. Cancellation and Refund Policy
              </h2>
              <p>
                Cancellation policies vary depending on the rate plan selected during booking. Generally:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-2 marker:text-gray-400">
                <li><span className="font-semibold">7 days prior:</span> Full refund.</li>
                <li><span className="font-semibold">3-7 days prior:</span> 50% refund.</li>
                <li><span className="font-semibold">Within 48 hours / No-Show:</span> No refund (100% charge).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                5. Guest Responsibilities
              </h2>
              <ul className="list-disc pl-5 space-y-2 marker:text-gray-400">
                <li>Guests are responsible for any damage caused to the hotel property. Charges will be applied to the guest's account.</li>
                <li>Smoking is strictly prohibited in non-smoking rooms.</li>
                <li>Illegal activities are strictly prohibited.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                6. Governing Law
              </h2>
              <p>
                These terms constitute a contract governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Munnar/Kerala.
              </p>
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