"use client";
import React from "react";
import { MapPin, Phone, Mail, Navigation } from "lucide-react";
import Header from "@/components/Layout/Header"; // Assuming you have this
import Footer from "@/components/Footer"; // Assuming you have this
import BookRideButton from "@/components/Booking/BookRidButton";
import PageBreadcrumb from "@/components/BreadCrumb";

const ContactPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Breadcrumb Strip */}
      <PageBreadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
      />

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* LEFT COLUMN: Text & Contact Info */}
          <div className="flex-1 space-y-12">
            {/* Hero Text */}
            <div className="space-y-6">
              <h1 className="text-2xl md:text-5xl lg:text-6xl font-medium text-[#055A3A] leading-[1.15]">
                Ready to rise <br />
                above the <br />
                ordinary?
              </h1>
              <p className="text-gray-600 max-w-md leading-relaxed">
                Whether you're planning a memorable adventure, celebrating a
                special day, or just curious about the experience —
              </p>
              <p className="text-[#4caf50] font-medium">
                we're here to help you take flight.
              </p>
            </div>
          </div>
          <div>
            {/* Contact Details List */}
            <div className="space-y-10">
              {/* Address */}
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-[#055A3A] flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-[#055A3A] text-2xl font-medium mb-2">
                    Address
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Wonder Volare <br />
                    Munnar Hot Air Balloon <br />
                    Kada Valayam, Itticity, <br />
                    Anachal, Kerala 685565
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-[#055A3A] flex items-center justify-center flex-shrink-0">
                  <Phone className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-[#055A3A] text-2xl font-medium mb-2">
                    Phone Number
                  </h3>
                  <p className="text-gray-700">+91 97787 81906</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-[#055A3A] flex items-center justify-center flex-shrink-0">
                  <Navigation
                    className="text-white"
                    size={24}
                    fill="currentColor"
                  />
                </div>
                <div>
                  <h3 className="text-[#055A3A] text-2xl font-medium mb-2">
                    Email Address
                  </h3>
                  <p className="text-gray-700">wondervolare@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* VERTICAL DIVIDER (Visible only on Large Screens) */}
          <div className="hidden lg:block w-[1px] bg-gray-200 self-stretch mx-4"></div>

          {/* RIGHT COLUMN: Map & Action */}
          <div className="flex-1 flex flex-col">
            <div className="mb-6">
              <h2 className="text-2xl text-gray-800 font-medium mb-2">
                Where to find us?
              </h2>
              <p className="text-orange-400 text-sm font-medium">
                *Click on the balloon to enroute
              </p>
            </div>

            {/* Map Container */}
            <div className="relative w-full h-[500px] bg-[#F3F0E0] rounded-lg overflow-hidden border border-amber-100 shadow-inner group">
              {/* This image tag is a placeholder. Replace src with your actual map image */}
              <img
                src="/api/placeholder/600/800"
                alt="Munnar Map Location"
                className="w-full h-full object-cover opacity-80 mix-blend-multiply"
              />

              {/* Simulated Map Elements (if you don't have the image yet) */}
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] opacity-30"></div>

              {/* Balloon Pin */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer hover:-translate-y-2 transition-transform duration-300">
                <div className="bg-white px-3 py-1 rounded-full shadow-md text-xs font-bold mb-2 border border-gray-200">
                  We are here
                </div>
                <div className="text-4xl filter drop-shadow-lg">🎈</div>
                <div className="w-2 h-10 bg-black/20 blur-sm rounded-full mt-2 transform scale-x-50"></div>
              </div>

              {/* THE FLOATING BUTTON (Placed inside map container) */}
              <div className="fixed bottom-8 right-8 z-50 animate-bounce-slow">
                <BookRideButton mode="inline" />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
