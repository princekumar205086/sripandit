"use client";

import React from "react";
// import Image from "next/image";
import "./qualified.css";

const QualifiedPandit = () => {
  return (
    <div
      className="relative bg-cover bg-center p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 h-auto sm:h-128 md:h-160 lg:h-192 xl:h-224"
      style={{ backgroundImage: "url(/image/astrologer.jpeg)", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
    >
      <div className="relative h-full flex flex-col justify-center items-center text-center text-white px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 bg-opacity-50 bg-black p-2">
          Are you a qualified Pandit/Astrologer?
        </h2>
        <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 sm:py-4 md:py-5 lg:py-6 xl:py-7 px-5 sm:px-6 md:px-7 lg:px-8 xl:px-9 rounded-lg transition duration-300 ease-in-out m-4 transform hover:scale-105">
          Send a request
        </button>
        <p className=" p-2 text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl bg-opacity-50 bg-black">
          North Indian Pandit in Bangalore, Pandit near me, Hindi Pandit in
          Bangalore, Purohit in Bangalore, Bihari Pandit in Bangalore, Best
          Pandit in Bangalore, Pandit for Puja in Mumbai, Pandit for Puja near
          me, Best Pandit in Mumbai, Marathi Pandit in Mumbai, North Indian
          Pandit in Mumbai, Pandit for Puja in Chennai, Best Pandit in Chennai,
          Tamil Iyer near me, North Indian Pandit in Chennai, Pandit for Puja in
          Hyderabad, Best Pandit in Hyderabad, Telugu Pujari in Hyderabad, Hindi
          Pandit in Hyderabad, Bihari Pandit in Hyderabad, North Indian Pandit
          in Hyderabad
        </p>
      </div>
    </div>
  );
};

export default QualifiedPandit;
