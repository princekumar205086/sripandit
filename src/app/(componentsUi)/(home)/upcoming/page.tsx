"use client";
import React from 'react';

const UpcomingEvents = () => {
  return (
    <div
      className="relative bg-center bg-cover h-64 sm:h-96 md:h-128 lg:h-160 xl:h-192"
      style={{ backgroundImage: `url(/image/india.webp)` }}
      aria-label="Upcoming Events and Festivals Background"
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative h-full flex flex-col justify-center items-center text-center text-white px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 tracking-tight leading-tight">
          Upcoming Events and Festivals
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-relaxed">
          Famous events and festivals you must experience
        </p>
      </div>
    </div>
  );
};

export default UpcomingEvents;
