"use client";

import React, { useState, useEffect } from "react";
import { getAstrologyService } from "./action";
import Section from "../pujaservice/section";
import Image from "next/image";
import styles from "./Astrology.module.css";
import CryptoJS from "crypto-js";
import Link from "next/link";
import slugify from "slugify";

interface AstrologyService {
  id: number;
  service_title: string;
  service_image: string;
}

const Astrology = () => {
  const [services, setServices] = useState<AstrologyService[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetching astrology services with caching
  const fetchServices = async () => {
    const cachedServices = sessionStorage.getItem("astrologyServices");
    if (cachedServices) {
      setServices(JSON.parse(cachedServices));
      setLoading(false);
    } else {
      try {
        const data = await getAstrologyService();
        if (data && data.length > 0) {
          sessionStorage.setItem("astrologyServices", JSON.stringify(data));
          setServices(data);
        } else {
          console.error("No data received from getAstrologyService");
        }
      } catch (error) {
        console.error("Failed to fetch astrology services", error);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const encryptId = (id: number) => {
    return CryptoJS.AES.encrypt(id.toString(), "your-secret-key").toString();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Section
        bgImageUrl="/image/astrology.png"
        title="Astrology Services"
        description="Explore the range of astrology services we provide."
      />
      <div className="flex flex-col justify-center items-center m-0 p-6 bg-purple-700">
        <h2 className="text-2xl md:text-3xl text-white font-extrabold text-center mb-4">
          Please select your preferred astrology service
        </h2>
        <p className="text-lg md:text-xl text-gray-100">
          Make an appointment with our Astrologers.
        </p>
      </div>
      <div className="flex flex-row justify-center items-center m-0 p-4">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Link
              href={`/astrology/${slugify(service.service_title)}?id=${encodeURIComponent(encryptId(service.id))}`}
              key={service.id}
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full relative group">
                <Image
                  src={service.service_image}
                  alt={service.service_title}
                  layout="responsive"
                  width={400}
                  height={400}
                  objectFit="cover"
                  className={`${styles.imageHover}`}
                  loading="lazy"
                />
                <div className={`${styles.titleOverlay} absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100`}>
                  <h3 className="text-lg md:text-2xl font-bold text-white text-center">
                    {service.service_title}
                  </h3>
                </div>
                <div className="p-4">
                  <h3 className="text-lg md:text-xl font-bold text-center">
                    {service.service_title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Astrology;
