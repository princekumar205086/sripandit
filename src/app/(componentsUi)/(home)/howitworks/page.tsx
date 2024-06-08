// create nextjs component
"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const data = [
  {
    title: "Select a Puja",
    description: "Select a Puja along with the package of your choice.",
    imagesrc: "/image/shree.svg",
  },
  {
    title: "Book a Pandit",
    description: "Select your language preference for Pandit Ji.",
    imagesrc: "/image/pandit.svg",
  },
  {
    title: "Get your confirmation",
    description: "Book with advance payment and get a confirmed booking.",
    imagesrc: "/image/confirm.svg",
  },
  {
    title: "Get frequent updates",
    description: "All details are shared on email, sms and Whatsapp.",
    imagesrc: "/image/bell.svg",
  },
];

const HowItWorks = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row items-stretch justify-center bg-purple-600">
        <div className="md:w-1/2 flex items-center justify-center text-center p-4">
          <div className="bg-white flex flex-col justify-center shadow-md p-8 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-orange-600">
              How Sripandit works
            </h2>
            <p className="text-gray-600 text-lg md:text-2xl mt-3">
              Experience Sacred Puja Services with Ease. Our Qualified Pandits
              and Purohits Ensure Hassle-Free Rituals. Book Online and Receive
              Puja Samagri at Your Doorstep. Trust in Verified Pandits for Truly
              Seamless Puja Experiences.
            </p>
            <div className="flex justify-center mt-4">
              <button className="bg-purple-500 hover:bg-purple-700 text-white text-sm md:text-base font-bold py-2 px-4 rounded outline-none">
                Book Now
              </button>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 flex items-center justify-center">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <Image
              src="/image/hawan.jpg"
              alt="howitworks"
              className="object-cover w-full h-full"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center bg-purple-600">
        {data.map((item, index) => (
          <div key={index} className="w-full sm:w-1/2 lg:w-1/4 p-4">
            <div className="flex flex-col items-center justify-center border bg-white shadow-md border-gray-300 rounded-lg p-4">
              <Image
                src={item.imagesrc}
                alt={item.title}
                className="w-1/2 mb-4"
                width={100}
                height={100}
              />
              <h2 className="text-2xl font-semibold text-black mb-2">{item.title}</h2>
              <p className="text-center">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default HowItWorks;
