"use client";

import React, { useState, useEffect } from "react";
import { getAstrologyService } from "./action";
import Section from "../pujaservice/section";
import Image from "next/image";
import CryptoJS from "crypto-js";
import Link from "next/link";
import slugify from "slugify";
import { motion } from "framer-motion";

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
    return (
      <div className="min-h-screen flex justify-center items-center bg-cream">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-t-4 border-b-4 border-redOrange rounded-full animate-spin"></div>
          <p className="mt-4 text-lg text-gray-700">Loading services...</p>
        </div>
      </div>
    );
  }

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <>
      <Section
        bgImageUrl="/image/astrology.jpeg"
        title="Astrology Services"
        description="Explore the ancient science of astrology with our expert astrologers who can guide you through life's journey with cosmic insights."
      />

      <div className="bg-cream py-8 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-8"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-gray-800 font-bold mb-4">
              <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                Expert Astrology Services
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-red-500 mx-auto my-4 rounded-full"></div>
            <p className="text-base sm:text-lg text-gray-700 mb-4">
              Select from our range of specialized astrology services tailored
              to your needs
            </p>
            <p className="text-sm sm:text-base text-gray-600">
              Our experienced astrologers provide accurate readings and
              personalized guidance
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.2 },
                }}
              >
                <Link
                  href={`/astrology/${slugify(
                    service.service_title
                  )}?id=${encodeURIComponent(encryptId(service.id))}`}
                  className="block h-full"
                >
                  <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                    <div className="relative pt-[75%] overflow-hidden">
                      <Image
                        src={service.service_image}
                        alt={service.service_title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover transition-transform duration-700 hover:scale-110"
                        priority={index < 4}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="p-4 w-full">
                          <p className="text-white text-sm font-medium">
                            View Details
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 flex-grow flex flex-col justify-between bg-gradient-to-br from-orange-50 to-white">
                      <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2">
                        {service.service_title}
                      </h3>
                      <div className="mt-auto pt-3 flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          Professional Service
                        </span>
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-600">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 12h14m-7-7v14" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-12 text-center"
          >
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white text-base font-medium rounded-lg shadow-lg hover:shadow-orange-500/30 transition-all duration-300"
            >
              Schedule a Consultation
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Astrology;
