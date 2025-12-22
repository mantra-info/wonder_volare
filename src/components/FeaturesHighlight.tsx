import React from "react";
import { Eye, Armchair } from "lucide-react";

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

const RupeeIcon = ({ size = 48, strokeWidth = 1.5 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 3h12" />
    <path d="M6 8h12" />
    <path d="m6 13 8.5 8" />
    <path d="M6 13h3" />
    <path d="M9 13c6.667 0 6.667-10 0-10" />
  </svg>
);

const features = [
  {
    id: 1,
    title: "A View Beyond Imagination",
    description:
      "Float above Munnar's green carpet of tea gardens, breathe in the cool mountain air, and watch the sun dip behind the hills. This is how you truly meet Munnar.",
    icon: "Eye",
  },
  {
    id: 2,
    title: "Guided with Care",
    icon: "Guide",
    description:
      "A trained Wonder Volare pilot accompanies every flight, handling every detail while you simply enjoy the view. Safety, comfort, and joy always side by side.",
  },
  {
    id: 3,
    title: "Comfort from Ground to Sky",
    icon: "Armchair",
    description:
      "Clean restrooms, resting areas, and a warm crew ready to assist seniors, families, and first-timers because care matters as much as adventure.",
  },
  {
    id: 4,
    title: "An Experience Within Reach",
    icon: "Rupee",
    description:
      "For just ₹1500 per person, you don't just buy a ride, you collect a story, a feeling, and a memory that stays long after you've landed.",
  },
];

const WhyChooseUs = () => {
  const renderIcon = (iconName:string) => {
    const iconProps = { size: 48, strokeWidth: 1.5 };
    
    switch(iconName) {
      case "Eye":
        return <Eye {...iconProps} />;
      case "Guide":
        return <GuideIcon {...iconProps} />;
      case "Armchair":
        return <Armchair {...iconProps} />;
      case "Rupee":
        return <RupeeIcon {...iconProps} />;
      default:
        return null;
    }
  };

  return (
    <section className="bg-[#055A3A] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 lg:mb-16">
          <h2 className="text-4xl md:text-5xl text-white font-normal mb-6">
            Why Choose Us?
          </h2>
          <div className="w-16 h-1 bg-white mx-auto rounded-full" />
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="group relative flex flex-col p-6 border border-white/30 rounded-3xl transition-all duration-300 hover:scale-105 hover:bg-white/5 hover:border-white/40"
            >
              {/* Icon Container - Fixed Height */}
              <div className="mb-3 lg:mb-6 text-white/70 h-12 flex items-start">
                {renderIcon(feature.icon)}
              </div>

              {/* Title - Fixed Height */}
              <h4 className="text-xl text-white font-normal leading-tight mb-3 lg:h-14 flex items-start">
                {feature.title}
              </h4>

              {/* Divider */}
              <div className="border-t border-white/30 w-full mb-4" />

              {/* Description */}
              <p className="text-white/80 text-sm leading-relaxed font-light">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;