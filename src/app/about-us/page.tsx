import React from "react";
import Image from "next/image";
import {
  ArrowRight,
  Clock,
  IndianRupee,
  Hourglass,
  ShieldCheck,
  Armchair,
  Coffee,
} from "lucide-react";
import Header from "@/components/Layout/Header";
import BookRideButton from "@/components/Booking/BookRidButton";
import Footer from "@/components/Footer";
import PageBreadcrumb from "@/components/BreadCrumb";

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Breadcrumb Strip */}
    <PageBreadcrumb
        items={[{ label: "Home", href: "/" }, { label: "About Us" }]}
      />
      <div className="max-w-7xl mx-auto px-4 py-8 md:px-8 font-sans text-slate-800 bg-white">
        {/* --- Hero Image Section --- */}
        <div className="relative w-full h-[250px] md:h-[400px] mb-8">
          {/* Replace the src with your actual balloon image asset */}
          <Image
            src="https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?q=80&w=2070&auto=format&fit=crop"
            alt="Hot air balloon over mountains"
            fill
            className="object-cover rounded-[2rem] shadow-sm"
            priority
          />
        </div>

        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <h1 className="text-3xl md:text-4xl font-medium text-emerald-700 tracking-tight">
            The Wonder Volare Experience
          </h1>

           <div className="absolute bottom-10 right-6">
                <BookRideButton mode="inline" />
              </div>
        </div>

        {/* --- Content Body --- */}
        <div className="space-y-6 text-sm md:text-base leading-relaxed text-slate-700 max-w-4xl">
          <p>
            Evenings in Munnar turn magical between 4:00 AM and 7:00 PM, and
            that’s when Wonder Volare takes you on a flight above the hills.
          </p>
          <p>
            For about 5–10 peaceful minutes, you’ll rise gently into the sky in
            our tethered hot air balloon, watching the sun melt into the mist.
          </p>
          <p>
            Each ride is carefully operated with one balloon at a time, ensuring
            every guest gets a personal and relaxed experience. A trained Wonder
            Volare guide will accompany you throughout from take-off to landing,
            making sure you feel safe, steady, and completely at ease.
          </p>
          <p>
            At the site, you’ll find restrooms, a comfortable waiting area, and
            a friendly crew ready to assist.
          </p>
          <p>
            All this joy, at just ₹1500 per person, is a small price for a
            memory that stays forever.
          </p>
        </div>

        {/* --- Quote --- */}
        <div className="mt-8 mb-10">
          <p className="text-emerald-500 text-lg md:text-xl font-medium">
            “Your comfort, safety, and smile, that’s what keeps us floating.”
          </p>
        </div>

        {/* --- Divider --- */}
        <div className="h-px w-full bg-slate-200 mb-8"></div>

        {/* --- Plan Your Visit Section --- */}
        <div>
          <h2 className="text-2xl font-medium text-slate-800 mb-6">
            Plan Your Visit
          </h2>

          <div className="flex flex-wrap gap-4">
            <FeatureBadge icon={<Clock size={18} />} text="4.00am - 7.00pm" />
            <FeatureBadge
              icon={<IndianRupee size={18} />}
              text="1500/- per person"
            />
            <FeatureBadge
              icon={<Hourglass size={18} />}
              text="5-10 minutes ride"
            />
            <FeatureBadge icon={<ShieldCheck size={18} />} text="Rest Rooms" />
            <FeatureBadge icon={<Armchair size={18} />} text="Waiting Area" />
            <FeatureBadge icon={<Coffee size={18} />} text="Refreshments" />
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

// Reusable Badge Component
const FeatureBadge = ({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) => {
  return (
    <div className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-sky-100 bg-sky-50 text-slate-700 text-sm md:text-base min-w-[180px]">
      <span className="text-slate-500">{icon}</span>
      <span className="font-medium">{text}</span>
    </div>
  );
};

export default AboutUs;
