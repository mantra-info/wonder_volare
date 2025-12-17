"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Signpost, // Closest proxy to the hiking guide icon
  Sunrise,
  ShieldCheck,
  Camera,
} from "lucide-react";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const GuideIcon = ({ size = 43, strokeWidth = 1.5 }) => (
  <svg
    width="43"
    height="46"
    viewBox="0 0 43 46"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.9375 8.5C14.7688 8.5 13.7682 8.08385 12.9359 7.25156C12.1036 6.41927 11.6875 5.41875 11.6875 4.25C11.6875 3.08125 12.1036 2.08073 12.9359 1.24844C13.7682 0.416146 14.7688 0 15.9375 0C17.1063 0 18.1068 0.416146 18.9391 1.24844C19.7714 2.08073 20.1875 3.08125 20.1875 4.25C20.1875 5.41875 19.7714 6.41927 18.9391 7.25156C18.1068 8.08385 17.1063 8.5 15.9375 8.5ZM2.125 45.6875L7.96875 15.725L4.25 17.3188V24.4375H0V14.45L11.1562 9.88125C12.1125 9.49167 13.0865 9.4474 14.0781 9.74844C15.0698 10.0495 15.8313 10.6604 16.3625 11.5813L18.3813 14.9813C19.3375 16.5396 20.6214 17.7969 22.2328 18.7531C23.8443 19.7094 25.6417 20.1875 27.625 20.1875V24.4375C25.2875 24.4375 23.1182 23.9417 21.1172 22.95C19.1161 21.9583 17.425 20.6125 16.0438 18.9125L14.7688 25.2875L19.125 29.6437V45.6875H14.875V32.9375L10.3062 28.6875L6.5875 45.6875H2.125ZM31.3438 45.6875V15.9375H23.375V1.0625H42.5V15.9375H34.5312V45.6875H31.3438ZM34.0531 13.7594L39.3125 8.5L34.0531 3.24062L31.7687 5.525L33.15 6.90625H26.5625V10.0938H33.15L31.7687 11.475L34.0531 13.7594Z"
      fill="#6CB698"
    />
  </svg>
);

const SunsetIcon = ({ size = 43, strokeWidth = 1.5 }) => {
  return (
    <svg
      width="43"
      height="39"
      viewBox="0 0 43 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.125 4.25V0H8.5V4.25H2.125ZM8.76562 15.5656L5.7375 12.5906L10.2531 8.075L13.2812 11.05L8.76562 15.5656ZM21.25 10.625C18.3104 10.625 15.8047 9.58906 13.7328 7.51719C11.6609 5.44531 10.625 2.93958 10.625 0H14.875C14.875 1.77083 15.4948 3.27604 16.7344 4.51562C17.974 5.75521 19.4792 6.375 21.25 6.375C23.0208 6.375 24.526 5.75521 25.7656 4.51562C27.0052 3.27604 27.625 1.77083 27.625 0H31.875C31.875 2.93958 30.8391 5.44531 28.7672 7.51719C26.6953 9.58906 24.1896 10.625 21.25 10.625ZM19.125 19.125V12.75H23.375V19.125H19.125ZM33.7344 15.5656L29.2719 11.05L32.2469 8.075L36.7625 12.5375L33.7344 15.5656ZM34 4.25V0H40.375V4.25H34ZM0 38.25V34C1.34583 34 2.34635 33.6458 3.00156 32.9375C3.65677 32.2292 5.02917 31.875 7.11875 31.875C9.20833 31.875 10.5807 32.2292 11.2359 32.9375C11.8911 33.6458 12.8563 34 14.1313 34C15.4771 34 16.4776 33.6458 17.1328 32.9375C17.788 32.2292 19.1604 31.875 21.25 31.875C23.2687 31.875 24.6411 32.2292 25.3672 32.9375C26.0932 33.6458 27.0938 34 28.3688 34C29.7146 34 30.6974 33.6458 31.3172 32.9375C31.937 32.2292 33.2917 31.875 35.3812 31.875C37.4708 31.875 38.8432 32.2292 39.4984 32.9375C40.1536 33.6458 41.1542 34 42.5 34V38.25C40.4813 38.25 39.1089 37.8958 38.3828 37.1875C37.6568 36.4792 36.6562 36.125 35.3812 36.125C34.1062 36.125 33.1411 36.4792 32.4859 37.1875C31.8307 37.8958 30.4583 38.25 28.3688 38.25C26.35 38.25 24.9776 37.8958 24.2516 37.1875C23.5255 36.4792 22.525 36.125 21.25 36.125C19.9042 36.125 18.9036 36.4792 18.2484 37.1875C17.5932 37.8958 16.2208 38.25 14.1313 38.25C12.0417 38.25 10.687 37.8958 10.0672 37.1875C9.4474 36.4792 8.46458 36.125 7.11875 36.125C5.77292 36.125 4.7724 36.4792 4.11719 37.1875C3.46198 37.8958 2.08958 38.25 0 38.25ZM0 29.75V25.5C1.34583 25.5 2.34635 25.1458 3.00156 24.4375C3.65677 23.7292 5.02917 23.375 7.11875 23.375C9.1375 23.375 10.4922 23.7292 11.1828 24.4375C11.8734 25.1458 12.8563 25.5 14.1313 25.5C15.4771 25.5 16.4776 25.1458 17.1328 24.4375C17.788 23.7292 19.1604 23.375 21.25 23.375C23.2687 23.375 24.6323 23.7292 25.3406 24.4375C26.049 25.1458 27.0229 25.5 28.2625 25.5C29.6083 25.5 30.6089 25.1458 31.2641 24.4375C31.9193 23.7292 33.2917 23.375 35.3812 23.375C37.4 23.375 38.7724 23.7292 39.4984 24.4375C40.2245 25.1458 41.225 25.5 42.5 25.5V29.75C40.4104 29.75 39.0203 29.3958 38.3297 28.6875C37.6391 27.9792 36.6562 27.625 35.3812 27.625C34.1062 27.625 33.1411 27.9792 32.4859 28.6875C31.8307 29.3958 30.4583 29.75 28.3688 29.75C26.35 29.75 24.9776 29.3958 24.2516 28.6875C23.5255 27.9792 22.525 27.625 21.25 27.625C19.9042 27.625 18.9214 27.9792 18.3016 28.6875C17.6818 29.3958 16.3271 29.75 14.2375 29.75C12.1479 29.75 10.7578 29.3958 10.0672 28.6875C9.37656 27.9792 8.39375 27.625 7.11875 27.625C5.84375 27.625 4.84323 27.9792 4.11719 28.6875C3.39115 29.3958 2.01875 29.75 0 29.75Z"
        fill="#97CBB6"
      />
    </svg>
  );
};

const features = [
  {
    id: 1,
    title: "Professional Certified Guides",
    icon: GuideIcon,
  },
  {
    id: 2,
    title: "Sunrise & Sunset Views",
    icon: SunsetIcon,
  },
  {
    id: 3,
    title: "Safety First",
    icon: ShieldCheck,
  },
  {
    id: 4,
    title: "Free Photography",
    icon: Camera,
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-[#055A3A] py-20 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl text-white font-medium mb-4">
            Why Choose Us?
          </h2>
          {/* The decorative underline */}
          <div className="w-12 h-1 bg-white mx-auto rounded-full" />
        </motion.div>

        {/* Grid Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              className="group relative flex flex-col items-center justify-center p-8 border border-white/20 rounded-3xl h-64 text-center transition-colors duration-300 hover:bg-white/5"
            >
              {/* Icon Container */}
              <div className="mb-6 text-[#A5D1BC] group-hover:text-white transition-colors duration-300">
                <feature.icon size={43} strokeWidth={1.5} />
              </div>

              {/* Text */}
              <h3 className="text-xl text-white font-normal leading-tight">
                {feature.title.split(" ").map((word, i, arr) => (
                  <React.Fragment key={i}>
                    {word}
                    {/* Add line break logic similar to image for specific titles */}
                    {arr.length > 2 && i === 0 ? <br /> : " "}
                  </React.Fragment>
                ))}
              </h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
