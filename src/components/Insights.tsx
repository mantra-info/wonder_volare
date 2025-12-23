"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants:Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// --- Data ---
const blogs = [
  {
    id: 1,
    date: "04 Dec, 2025",
    title: "The Magic of Morning Flights",
    image: "https://media.tacdn.com/media/attractions-splice-spp-674x446/11/8f/19/48.jpg",
  },
  {
    id: 2,
    date: "04 Dec, 2025",
    title: "Safety First: Our Protocols",
    image: "https://media.tacdn.com/media/attractions-splice-spp-674x446/11/8f/19/48.jpg",
  },
  {
    id: 3,
    date: "04 Dec, 2025",
    title: "Best Season to Visit Kerala",
    image: "https://media.tacdn.com/media/attractions-splice-spp-674x446/11/8f/19/48.jpg",
  },
  {
    id: 4,
    date: "04 Dec, 2025",
    title: "A Guide for First-Timers",
    image: "https://media.tacdn.com/media/attractions-splice-spp-674x446/11/8f/19/48.jpg",
  },
];

const InsightsSection = () => {
  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Header --- */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-5xl text-gray-900 font-medium mb-4">
            Insights
          </h2>
          {/* Decorative underline */}
          <div className="w-10 h-1 bg-gray-800 mx-auto rounded-full" />
        </motion.div>

        {/* --- Grid --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {blogs.map((blog) => (
            <motion.div
              key={blog.id}
              variants={itemVariants}
              className="flex flex-col group"
            >
              {/* Image Container */}
              <div className="overflow-hidden rounded-2xl aspect-square mb-5">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col items-start flex-grow">
                <span className="text-xs text-gray-400 font-medium mb-2 tracking-wide">
                  {blog.date}
                </span>
                
                <h3 className="text-lg lg:text-xl text-gray-900 font-medium mb-6 line-clamp-2">
                  {blog.title}
                </h3>

                {/* Button */}
                <button className="mt-auto inline-flex items-center gap-2 bg-[#3DA578] hover:bg-[#2e8560] text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5">
                  Read More
                  <ArrowUpRight size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default InsightsSection;