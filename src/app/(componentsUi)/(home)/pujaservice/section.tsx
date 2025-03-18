"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion"; // Add framer-motion for animations

interface SectionProps {
  bgImageUrl: string;
  title: string;
  description: string;
}

export default function Section({
  bgImageUrl,
  title,
  description,
}: SectionProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [hrWidth, setHrWidth] = useState("80%");

  useEffect(() => {
    if (titleRef.current) {
      const titleWidth = titleRef.current.offsetWidth;
      setHrWidth(`${titleWidth * 0.8}px`);
    }

    // Update HR width on window resize for better responsiveness
    const handleResize = () => {
      if (titleRef.current) {
        const titleWidth = titleRef.current.offsetWidth;
        setHrWidth(`${titleWidth * 0.8}px`);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [title]);

  // Ensure bgImageUrl starts with a leading slash if it's a relative path
  const formattedBgImageUrl = bgImageUrl.startsWith("/")
    ? bgImageUrl
    : `/${bgImageUrl}`;

  return (
    <section className="relative h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] flex justify-center items-center overflow-hidden">
      {/* Background image with parallax effect */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={formattedBgImageUrl}
          alt={title}
          fill
          className="z-0 object-cover transition-transform duration-300 scale-105"
          priority
          sizes="100vw"
          quality={90}
        />
        {/* Enhanced gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80 z-10" />
      </div>

      {/* Content container */}
      <div className="container mx-auto relative z-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center items-center text-center max-w-5xl mx-auto"
        >
          {/* Decorative element */}
          <div className="hidden sm:block w-16 h-1 bg-gradient-to-r from-orange-400 via-red-500 to-orange-400 mb-6 rounded-full"></div>

          {/* Title with refined typography */}
          <h2
            ref={titleRef}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3 leading-tight"
          >
            <span className="bg-gradient-to-r from-orange-400 via-red-500 to-orange-400 bg-clip-text text-transparent">
              {title}
            </span>
          </h2>

          {/* Custom divider */}
          <hr
            className="my-3 sm:my-4 mx-auto"
            style={{
              width: hrWidth,
              borderTop: "2px solid",
              borderImage:
                "linear-gradient(to right, #ff4500, #ff8c00, #ffd700, #ff4500) 1",
            }}
          />

          {/* Description with improved typography */}
          <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-4xl mt-2 sm:mt-3 px-4 sm:px-8 font-light leading-relaxed">
            {description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
