"use client";
import Image from "next/image";
import React from "react";

const data = [
  {
    title: "Select a Puja",
    description: "Select a Puja along with the package of your choice.",
    imagesrc: "/image/select puja.jpeg",
  },
  {
    title: "Book a Pandit",
    description: "Select your language preference for Pandit Ji.",
    imagesrc: "/image/book pandit jee.jpeg",
  },
  {
    title: "Get your confirmation",
    description: "Book with advance payment and get a confirmed booking.",
    imagesrc: "/image/get confirmed.jpeg",
  },
  {
    title: "Get frequent updates",
    description: "All details are shared on email, SMS, and WhatsApp.",
    imagesrc: "/image/get update.jpeg",
  },
];

const HowItWorks = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row items-stretch justify-center bg-redOrange">
        <div className="md:w-1/2 flex items-center justify-center text-center p-4">
          <div className="bg-cream flex flex-col justify-center shadow-md p-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-orange-600">
              How okpuja works
            </h2>
            <p className="text-orange-500 text-lg md:text-xl mt-3">
              Immerse yourself in the serenity of sacred puja services effortlessly. Our dedicated team of qualified pandits and purohits ensures seamless rituals tailored to your specific requirements. With just a few clicks, you can book your puja online and have the puja samagri delivered right to your doorstep, making the entire process convenient and stress-free.
            </p>
            <div className="flex justify-center mt-4">
              <button className="bg-redOrange hover:bg-orange-700 hover:text-white text-white md:text-base text-xl font-bold py-2 px-4 rounded outline-none">
                Book Now
              </button>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 flex items-center justify-center">
          <div className="shadow-md rounded-lg overflow-hidden">
            <Image
              src="/image/hawan.jpg"
              alt="howitworks"
              className="object-cover w-full h-full"
              width={400}
              height={400}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center bg-cream py-6">
        {data.map((item, index) => (
          <div key={index} className="w-full sm:w-1/2 lg:w-1/4 p-4">
            <div className="flex flex-col items-center justify-center border bg-redOrange shadow-md border-gray-300 rounded-lg p-4">
              <Image
                src={item.imagesrc}
                alt={item.title}
                className="w-full mb-4"
                width={100}
                height={80}
                quality={100}
              />
              <h2 className="text-xl font-semibold text-cream mb-2">
                {item.title}
              </h2>
              <p className="text-center text-cream text-base">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default HowItWorks;
