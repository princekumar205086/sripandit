// create nextjs component
"use client";
import Image from "next/image";
import Link from "next/link";
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
    description: "All details are shared on email, sms and Whatsapp.",
    imagesrc: "/image/get update.jpeg",
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
              Immerse yourself in the serenity of sacred puja services
              effortlessly. Our dedicated team of qualified pandits and purohits
              ensures seamless rituals tailored to your specific requirements.
              With just a few clicks, you can book your puja online and have the
              puja samagri delivered right to your doorstep, making the entire
              process convenient and stress-free. Trust in our verified pandits
              who are committed to upholding the authenticity and sanctity of
              every ritual. Whether it's a traditional ceremony or a special
              occasion, we guarantee a truly memorable experience. Our experts
              bring years of experience and dedication, ensuring that each puja
              is conducted with utmost sincerity and reverence. Experience the
              peace of mind that comes with knowing your spiritual needs are
              handled by professionals who prioritize your satisfaction. Embrace
              the beauty of divine rituals and celebrate your faith with
              confidence, knowing that our team is dedicated to providing you
              with a seamless puja experience that exceeds expectations every
              time.
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
              <img
                src={item.imagesrc}
                alt={item.title}
                className="w-full mb-4"
                width={100}
                height={80}
              />
              <h2 className="text-2xl font-semibold text-black mb-2">
                {item.title}
              </h2>
              <p className="text-center">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default HowItWorks;
