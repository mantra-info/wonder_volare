import React from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Layout/Header";

export const metadata = {
  title: "Cancellation & Refund Policy | Wonder Volare Munnar",
  description:
    "Cancellation and Refund Policy for bookings at Wonder Volare Munnar.",
};

export default function RefundPolicyPage() {
  const currentDate = new Date().toLocaleDateString();

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />
      <div className="max-w-4xl mx-auto bg-white shadow-sm rounded-lg overflow-hidden">
        {/* Responsive Padding */}
        <div className="p-6 sm:p-10">
          {/* Header */}
          <div className="border-b pb-6 mb-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Cancellation & Refund Policy
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm">
              Last Updated: {currentDate}
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8 text-gray-700 text-sm sm:text-base leading-relaxed">
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                1. General Policy
              </h2>
              <p>
                At Wonder Volare Munnar, we understand that travel plans can
                change. We aim to be as flexible as possible while maintaining a
                fair policy for all guests. All cancellation requests must be
                sent to us in writing via email.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                2. Cancellation Charges
              </h2>
              <div className="overflow-hidden border border-gray-200 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                      >
                        Time of Cancellation
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                      >
                        Refund Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">
                        7 days or more before check-in
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-green-600 font-semibold">
                        100% Refund
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">
                        3 to 6 days before check-in
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-orange-600 font-semibold">
                        50% Refund
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">
                        Less than 48 hours / No Show
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-red-600 font-semibold">
                        No Refund
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs sm:text-sm text-gray-500 italic">
                *Note: Peak season bookings (Dec 20 - Jan 5) may be
                non-refundable. Please check your specific booking voucher.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                3. Refund Process
              </h2>
              <ul className="list-disc pl-5 space-y-2 marker:text-gray-400">
                <li>
                  Refunds will be processed within{" "}
                  <strong>7-10 working days</strong> from the date of
                  cancellation confirmation.
                </li>
                <li>
                  The amount will be credited back to the{" "}
                  <strong>original method of payment</strong> (Credit Card,
                  Debit Card, or Bank Transfer).
                </li>
                <li>
                  We are not responsible for any delays caused by the bank’s
                  processing times.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                4. Modifications
              </h2>
              <p>
                Date changes are subject to availability and current room rates.
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-2 marker:text-gray-400">
                <li>
                  <strong>Free Modifications:</strong> Allowed up to 7 days
                  before arrival.
                </li>
                <li>
                  <strong>Late Modifications:</strong> Requests made within 7
                  days of arrival may be treated as a cancellation and
                  re-booking, subject to applicable charges.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                5. Early Departure
              </h2>
              <p>
                In case of early departure or shortening of stay after check-in,
                the full amount for the originally booked stay will be charged.
                No refunds will be issued for unused nights.
              </p>
            </section>

            {/* Contact Box */}
            <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-6 mt-8">
              <h3 className="font-bold text-indigo-900 mb-2">
                Request a Cancellation
              </h3>
              <p className="text-indigo-800 mb-4">
                To cancel or modify your booking, please email us with your
                Booking ID.
              </p>
              <div className="flex flex-col sm:flex-row sm:gap-6 text-indigo-700 font-medium">
                <a
                  href="mailto:reservations@wondervolare.com"
                  className="hover:underline mb-2 sm:mb-0"
                >
                  reservations@wondervolare.com
                </a>
                <a href="tel:+910000000000" className="hover:underline">
                  +91 000 000 0000
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
      <Footer />
    </div>
  );
}
