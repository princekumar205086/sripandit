"use client";
import React from "react";
import Image from "next/image";
import "./servicecard.css";

export default function ServiceCard() {
  return (
    <section className="relative bg-light-500 py-12 bg-orange-600">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center text-center">
          {[
            {
              image: "/image/havan kund.jpeg",
              number: "40000+",
              text: "Pujas and homas performed",
            },
            {
              image: "/image/pandits.jpeg",
              number: "1200+",
              text: "Pandits and Purohits",
            },
            {
              image: "/image/deep.jpeg",
              number: "400+",
              text: "Total unique services",
            }
          ].map((item, index) => (
            <div key={index} className="service-card w-full md:w-1/3 px-4 mb-8 md:mb-0">
              <div className="h-full p-4 bg-white rounded-lg shadow flex flex-col justify-center items-center">
                <Image
                  alt="image"
                  src={item.image}
                  className="mx-auto mb-4"
                  width="120"
                  height="100"
                />
                <p className="service-card-number text-6xl font-bold mb-2 text-purple-700">{item.number}</p>
                <p className="service-card-text text-purple-600 text-3xl">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}