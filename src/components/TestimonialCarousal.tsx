"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

// --- Types ---
type Testimonial = {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  avatar: string;
  title: string;
};

// --- Data ---
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "  Arun & Divya",
    location: "Kochi",
    rating: 4.8,
    title: "Peaceful, magical, and beautifully managed.",
    text: " I never imagined Munnar could look this stunning from above! The crew was calm, polite, and made us feel safe throughout.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Maria J",
    location: "Thrissur",
    rating: 5.0,
    title: "Such a serene experience.",
    text: " I was nervous at first, but the guide explained everything patiently. Once we lifted, all I could do was smile.",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
  },
  {
    id: 3,
    name: " Karthik P",
    location: "Chennai",
    rating: 4.9,
    title: "Worth every rupee!",
    text: " Clean, organised, and truly breathtaking. Watching the sunset from above the tea gardens was unforgettable.",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "  Sneha R.",
    location: "Bangalore",
    title: "So thoughtful and safe.",
    rating: 5.0,
    text: " Having a guide with us made all the difference. You can tell they love what they do.",
    avatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=150&auto=format&fit=crop",
  },
    {
    id: 5,
    name: " Nirmal",
    location: "Delhi",
    title: "Perfect end to our Munnar trip.",
    rating: 5.0,
    text: "Floating quietly while the sky turned orange felt like a dream.",
    avatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=150&auto=format&fit=crop",
  },
];

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive Check
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Configuration
  const itemsToShow = isMobile ? 1 : 4;
  const maxIndex = Math.max(0, testimonials.length - itemsToShow);

  const handleNext = () => {
    if (isMobile) {
      setCurrentIndex((prev) =>
        prev >= testimonials.length - 1 ? 0 : prev + 1
      );
    } else {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }
  };

  const handlePrev = () => {
    if (isMobile) {
      setCurrentIndex((prev) =>
        prev === 0 ? testimonials.length - 1 : prev - 1
      );
    } else {
      setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };

  // Calculate proper translation
  const translateX = isMobile
    ? -(currentIndex * 100)
    : -(currentIndex * (100 / testimonials.length));

  return (
    <section className="relative min-h-[400px] bg-[#055A3A] py-24 px-4 overflow-hidden font-sans">
      {/* --- Background PNG Image --- */}
      <div
        className="absolute inset-0 pointer-events-none z-0 "
        style={{
          backgroundImage: "url('/testimonialBackground.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* --- Header --- */}
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-5xl text-white font-medium mb-4">
            Hear From Our <br /> Happy Guests
          </h2>
          <div className="w-12 h-1 bg-white mx-auto rounded-full" />
        </div>

        {/* --- Carousel Wrapper --- */}
        <div className="flex items-center gap-4">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="hidden md:flex items-center justify-center w-12 h-12 rounded-2xl border border-white/20 text-white hover:bg-white/10 transition-colors z-20 shrink-0"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Slider Window */}
          <div className="overflow-hidden w-full">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(${translateX}%)`,
              }}
            >
              {testimonials.map((item) => (
                <div
                  key={item.id}
                  className="px-3 flex-shrink-0"
                  style={{
                    width: isMobile ? "100%" : `${100 / testimonials.length}%`,
                  }}
                >
                  {/* --- Card Content --- */}
                  <div className="bg-[#044d32]/40 backdrop-blur-md border border-white/20 rounded-3xl p-8 h-[320px] flex flex-col justify-between hover:border-white/40 transition-colors duration-300">
                    {/* Rating & Badge */}
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-1 bg-[#5FA052] text-white px-2 py-1 rounded-md text-sm font-bold shadow-sm">
                        <Star
                          size={14}
                          fill="currentColor"
                          className="text-yellow-300"
                        />
                        <span>{item.rating}</span>
                      </div>
                    </div>
                    <blockquote className="text-white/90 text-lg  leading-relaxed line-clamp-3 font-semibold">
                     “{item.title}”
                    </blockquote>
                    {/* Testimonial Text */}
                    <blockquote className="text-white/90  font-light leading-relaxed line-clamp-4 text-sm ">
                      {item.text}
                    </blockquote>

                    {/* Profile */}
                    <div className="flex items-center gap-4 mt-auto">
                      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20 shrink-0">
                        <img
                          src={item.avatar}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-base leading-tight">
                          {item.name}
                        </h4>
                        <span className="text-white/60 text-xs uppercase tracking-wide">
                          {item.location}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="hidden md:flex items-center justify-center w-12 h-12 rounded-2xl border border-white/20 text-white hover:bg-white/10 transition-colors z-20 shrink-0"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Mobile Indicators */}
        <div className="flex justify-center gap-2 mt-8 lg:hidden">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex ? "w-8 bg-white" : "w-2 bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
