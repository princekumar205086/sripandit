"use client";
import React, { useEffect, useState } from "react";
import { getAstrologyService } from "./action";
import Section from "../../(home)/pujaservice/section";
import Image from "next/image";

interface AstrologyService {
  id: number;
  service_title: string;
  service_image: string;
}

export default function Astrology() {
  const [services, setServices] = useState<AstrologyService[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getAstrologyService();
        setServices(data);
        console.log("Astrology services", data);
        
      } catch (error) {
        console.error("Failed to fetch astrology services", error);
      }
    };

    fetchServices();
  }, []);

  return (
    <>
      <Section
        bgImageUrl="https://www.smartpuja.com/img/home/smartpuja-astrology.jpeg"
        title="Astrology Services"
        description="Explore the range of astrology services we provide."
      />
      <div className="flex flex-row justify-center items-center m-0 p-2 bg-purple-700">
        <div className="text-center">
          <h2 className="text-5xl text-white font-extrabold">
            Please select your preferred astrology service
          </h2>
          <p className="text-2xl text-gray-100 mt-4">
            Make an appointment with our Astrologers.
          </p>
        </div>
      </div>
      <div className="flex flex-row justify-center items-center m-0 p-2">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, index) => (
            <div
              key={service.id} // Using service ID as a key for better performance and uniqueness
              className="bg-white rounded-lg shadow-lg overflow-hidden w-full"
            >
              <Image
                src={service.service_image}
                alt={service.service_title}
                layout="responsive"
                width={400}
                height={400}
                objectFit="cover"
              />
              <div className="p-4">
                <h3 className="text-2xl font-bold text-center">{service.service_title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}