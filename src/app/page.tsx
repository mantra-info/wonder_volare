import React from "react";
import type { Metadata } from "next"; 
import OurStory from "@/components/OurStory";
import WhyChooseUs from "@/components/FeaturesHighlight";
import MomentsGallery from "@/components/MomentsGallery";
import TestimonialCarousel from "@/components/TestimonialCarousal";
import InsightsSection from "@/components/Insights";
import Footer from "@/components/Footer";
import Navbar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";

// SEO METADATA
export const metadata: Metadata = {
  title: "Sky Adventures | Hot Air Balloon Rides",
  description: "Experience the sky like never before. Book your hot air balloon adventure today and soar above mountains and sunlit horizons.",
  openGraph: {
    title: "Sky Adventures",
    description: "Soar above mountains and sunlit horizons.",
    images: ["https://images.unsplash.com/photo-1506459225024-1428097a7e18"],
  },
};

export default function HomePage() {
  return (
    <main>
      <div className="relative h-screen w-full overflow-hidden bg-black text-white">
        
        {/* Navbar handles Auth and Mobile Menu (Client Logic) */}
        <Navbar />

        {/* Hero Section handles Background Slider and Animations (Client Logic) */}
        <HeroSection />

      </div>

      {/* The rest of the page */}
      <OurStory />
      <WhyChooseUs />
      <MomentsGallery />
      <TestimonialCarousel />
      <InsightsSection />
      <Footer />
    </main>
  );
}