"use client";
import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

// --- Animation Variants ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const imageVariant = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

// --- Placeholder Data ---
const galleryImages = [
  {
    id: 1,
    src: "https://t4.ftcdn.net/jpg/15/22/50/31/360_F_1522503117_LjGrWhyZnVb20lzUZfs9MfKyj1d0TdNR.jpg",
    alt: "Colorful balloon in blue sky",
  },
  {
    id: 2,
    src: "https://cdn.prod.website-files.com/64c82edd724cd267a8038611/65cc1ea2fd2eec76f0211034_Untitled%20design.jpg",
    alt: "Balloon over misty jungle",
  },
  {
    id: 3,
    src: "https://media.tacdn.com/media/attractions-splice-spp-674x446/11/8f/19/48.jpg",
    alt: "Balloon at sunset over hills",
  },
  {
    id: 4,
    src: "https://media.tacdn.com/media/attractions-splice-spp-674x446/11/8f/19/48.jpg",
    alt: "Scenic mountain layers",
  },
  {
    id: 5,
    src: "https://media.tacdn.com/media/attractions-splice-spp-674x446/11/8f/19/48.jpg",
    alt: "Orange balloon in clear sky",
  },
  {
    id: 6,
    src: "https://cdn.prod.website-files.com/64c82edd724cd267a8038611/65cc1ea2fd2eec76f0211034_Untitled%20design.jpg",
    alt: "Looking up into a balloon basket",
  },
];

const MomentsGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <section className="relative py-20 px-6 bg-gradient-to-br from-sky-50 via-white to-orange-50 overflow-hidden">
      {/* --- Header Section --- */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        className="max-w-7xl mx-auto text-center mb-16"
      >
        <motion.h2
          variants={fadeInUp}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
        >
          Moments from the Sky
        </motion.h2>

        {/* Decorative Divider */}
        <motion.div variants={fadeInUp} className="flex justify-center mb-6">
          <div className="w-20 h-1 bg-gradient-to-r from-black/60 via-black/20 rounded-full" />
        </motion.div>

        <motion.p
          variants={fadeInUp}
          className="text-lg text-gray-600 max-w-2xl mx-auto"
        >
          Explore real snapshots from our rides - colorful balloons, sunrise
          skies, happy customers, and breathtaking landscapes.
        </motion.p>
      </motion.div>

      {/* --- Desktop Grid (hidden on mobile) --- */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        className="hidden md:grid max-w-7xl mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
      >
        {galleryImages.map((image) => (
          <motion.div
            key={image.id}
            variants={imageVariant}
            whileHover={{ scale: 1.05 }}
            className="relative group overflow-hidden rounded-2xl shadow-lg cursor-pointer aspect-[4/3]"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        ))}
      </motion.div>

      {/* --- Mobile Carousel (visible only on mobile) --- */}
      <div className="md:hidden max-w-md mx-auto mb-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="relative"
        >
          {/* Carousel Container */}
          <div className="relative overflow-hidden rounded-2xl shadow-xl aspect-[4/3]">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full"
            >
              <img
                src={galleryImages[currentIndex].src}
                alt={galleryImages[currentIndex].alt}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? "w-8 h-2 bg-green-500"
                    : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>

          {/* Image Counter */}
          <div className="text-center mt-4 text-gray-600 font-medium">
            {currentIndex + 1} / {galleryImages.length}
          </div>
        </motion.div>
      </div>

      {/* --- Button --- */}
         <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <button className="inline-flex items-center gap-2 bg-[#3DA578] hover:bg-[#2e8560] text-white px-8 py-4 rounded-2xl font-medium transition-colors duration-300 shadow-lg shadow-green-900/10">
            Open Gallery
            <ArrowUpRight size={18} />
          </button>
        </motion.div>
    </section>
  );
};

export default MomentsGallery;