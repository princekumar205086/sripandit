"use client";
import React from "react";
import Image from "next/image";

const data=[
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
    }
]

export default function Servicerange() {
  return (
    <>
      <div className="m-0 p-3 bg-orange-500">
        <h2 className="text-center text-white text-4xl mb-2">We provide a range of services</h2>
        <h6 className="text-center text-xl text-white">
          Book online for a Sacred, Hassle-free Puja Ceremony
        </h6>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {
        data.map((item, index) => (
            <div key={index} className="servicerange-card">
              <div className="relative h-64 w-full">
                <Image
                  className="absolute w-full h-full"
                  src={item.image}
                  alt={item.title}
                  width={100}
                  height={100}
                />
              </div>
              <div className="servicerange-card-body bg-orange-700">
                <h5 className="servicerange-card-title font-bold text-2xl p-2 text-center text-white">
                  {item.title}
                </h5>
              </div>
            </div>
          ))
      }
      </div>
    </>
  );
}