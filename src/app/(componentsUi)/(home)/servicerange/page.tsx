"use client";
import React from "react";
import Image from "next/image";

const data = [
  {
    title: "Puja",
    image: "/image/puja.jpeg",
  },
  {
    title: "Astrology",
    image: "/image/astrology.jpeg",
  },
  {
    title: "E-Puja",
    image: "/image/E-puja.jpeg",
  },
  {
    title: "Other Services",
    image: "/image/otherservice.jpeg",
  },
];

export default function Servicerange() {
  return (
    <>
      <div className="m-0 p-3 bg-cream">
        <h2 className="text-center text-orange-500 text-3xl font-semibold mb-2">
          We provide a range of services
        </h2>
        <p className="text-center text-lg text-orange-600">
          Book online for a Sacred, Hassle-free Puja Ceremony
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.map((item, index) => (
          <div key={index} className="servicerange-card">
            <div className="relative h-64 w-full">
              <Image
                className="absolute w-full h-full object-cover"
                src={item.image}
                alt={item.title}
                width={100}
                height={100}
                quality={100}
              />
            </div>
            <div className="servicerange-card-body bg-cream">
              <h5 className="servicerange-card-title font-bold text-xl p-2 text-center text-orange-500">
                {item.title}
              </h5>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
