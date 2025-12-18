import React from "react";
import Link from "next/link";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy | Wonder Volare Munnar",
  description: "Privacy Policy for Wonder Volare Munnar.",
};

export default function PrivacyPage() {
  const currentDate = new Date().toLocaleDateString();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <div className="max-w-4xl mx-auto bg-white shadow-sm rounded-lg overflow-hidden">
        {/* Responsive Padding */}
        <div className="p-6 sm:p-10">
          <div className="border-b pb-6 mb-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Privacy Policy
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm">
              Last Updated: {currentDate}
            </p>
          </div>

          {/* Responsive Text Size */}
          <div className="space-y-8 text-gray-700 text-sm sm:text-base leading-relaxed">
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                1. Overview
              </h2>
              <p>
                At Wonder Volare Munnar, we value your privacy. This Privacy
                Policy outlines how we collect, use, and safeguard your personal
                information when you visit our website or stay at our property.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                2. Information We Collect
              </h2>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="bg-gray-50 p-4 rounded border border-gray-100">
                  <span className="block font-semibold text-gray-900 mb-1">
                    Personal Data
                  </span>
                  Name, email, phone number, and government ID details.
                </div>
                <div className="bg-gray-50 p-4 rounded border border-gray-100">
                  <span className="block font-semibold text-gray-900 mb-1">
                    Payment Data
                  </span>
                  Credit card details and billing address (processed securely).
                </div>
                <div className="bg-gray-50 p-4 rounded border border-gray-100">
                  <span className="block font-semibold text-gray-900 mb-1">
                    Preferences
                  </span>
                  Dietary requirements, special requests, and room preferences.
                </div>
                <div className="bg-gray-50 p-4 rounded border border-gray-100">
                  <span className="block font-semibold text-gray-900 mb-1">
                    Technical Data
                  </span>
                  IP address, cookies, and device information.
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                3. How We Use Your Information
              </h2>
              <ul className="list-disc pl-5 space-y-2 marker:text-gray-400">
                <li>To process and confirm your room reservations.</li>
                <li>To provide customer support and respond to inquiries.</li>
                <li>To send booking confirmations and updates.</li>
                <li>
                  To comply with legal obligations required by local
                  authorities.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                4. Data Protection & Cookies
              </h2>
              <p className="mb-3">
                We implement appropriate technical measures to protect your
                personal data.
              </p>
              <p>
                Our website uses cookies to enhance user experience. You can
                choose to disable cookies through your browser settings, though
                this may affect some website functionalities.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                5. Third-Party Links
              </h2>
              <p>
                Our website may contain links to external sites. We are not
                responsible for the privacy practices or content of these
                third-party websites.
              </p>
            </section>

            {/* Contact Box */}
            <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-6 mt-8">
              <h3 className="font-bold text-indigo-900 mb-2">
                Privacy Concerns?
              </h3>
              <p className="text-indigo-800 mb-4">
                If you wish to request the deletion of your data, please contact
                us at:
              </p>
              <div className="flex flex-col sm:flex-row sm:gap-6 text-indigo-700 font-medium">
                <a
                  href="mailto:wondervolare@gmail.com"
                  className="hover:underline mb-2 sm:mb-0"
                >
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
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  ></path>
                </svg>
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
