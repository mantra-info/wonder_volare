"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  },
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
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5 }
  },
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
  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* --- Header Section --- */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl text-black font-semibold mb-4">
            Moments from <br className="hidden md:block" /> the Sky
          </h2>
          
          {/* Decorative Divider */}
          <div className="w-10 h-0.5 bg-gray-800 mx-auto my-6" />

          <p className="max-w-2xl mx-auto text-gray-500 text-sm md:text-base leading-relaxed">
            Explore real snapshots from our rides - colorful balloons, sunrise skies, 
            happy customers, and breathtaking landscapes.
          </p>
        </motion.div>

        {/* --- Image Grid --- */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {galleryImages.map((image) => (
            <motion.div
              key={image.id}
              variants={imageVariant}
              whileHover={{ scale: 1.02 }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm group cursor-pointer"
            >
              {/* Image with Next.js optimization */}
              {/* Note: If not using Next.js Image, swap <Image /> for <img /> */}
              <img
                src={image.src}
                alt={image.alt}
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Optional Overlay on Hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </motion.div>
          ))}
        </motion.div>

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

      </div>
    </section>
  );
};

export default MomentsGallery;