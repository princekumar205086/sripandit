"use client";

import React from "react";

const QualifiedPandit = () => {
  return (
    <div
      className="relative bg-cover bg-center h-auto sm:h-128 md:h-160 lg:h-192 xl:h-224"
      style={{
        backgroundImage: "url(/image/astrologer.jpeg)",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60 filter blur-sm z-0" />
      <div className="relative h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 z-10">
        <h2 className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold mb-2 bg-black bg-opacity-60 p-2 rounded-md text-orange-500">
          Are you a qualified Pandit/Astrologer?
        </h2>
        <button className="bg-cream text-orange-500 hover:bg-red-600 hover:text-white font-bold py-1 sm:py-1.5 md:py-2 lg:py-2.5 xl:py-3 px-3 sm:px-4 md:px-5 lg:px-6 xl:px-7 rounded transition duration-300 ease-in-out m-2 transform hover:scale-105 text-sm sm:text-base">
          Send a request
        </button>
        <p className="p-2 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl bg-black bg-opacity-60 rounded-md mt-4 text-orange-500">
          North Indian Pandit in Bangalore, Pandit near me, Hindi Pandit in
          Bangalore, Purohit in Bangalore, Bihari Pandit in Bangalore, Best
          Pandit in Bangalore, Pandit for Puja in Mumbai, Pandit for Puja near
          me, Best Pandit in Mumbai, Marathi Pandit in Mumbai, North Indian
          Pandit in Mumbai, Pandit for Puja in Chennai, Best Pandit in Chennai,
          Tamil Iyer near me, North Indian Pandit in Chennai, Pandit for Puja in
          Hyderabad, Best Pandit in Hyderabad, Telugu Pujari in Hyderabad, Hindi
          Pandit in Hyderabad, Bihari Pandit in Hyderabad, North Indian Pandit
          in Hyderabad.
        </p>
      </div>
    </div>
  );
};

export default QualifiedPandit;
