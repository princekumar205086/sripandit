"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { fetchAstrologyServiceDetails } from "./action";


interface AstrologyServiceDetails {
    id: number;
    service_title: string;
    service_image: File | null;
    service_type: string;
    service_price: number | string;
    service_desc: string;
    timestamp: string;
}

export default function ViewAstrology({ id }: { id: number }) {
  const [serviceDetails, setServiceDetails] =
    useState<AstrologyServiceDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      async function fetchData() {
        setLoading(true);
        try {
          const data = await fetchAstrologyServiceDetails(id);
          setServiceDetails(data || null);
        } finally {
          setLoading(false);
        }
      }
      fetchData();
    }, [id]);
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-bold text-orange-800">Loading...</div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-orange-50">
      {/* Header Section */}
      <div className="relative h-[400px] md:h-[500px]">
        {/* <Image
          src={serviceDetails?.service_image || "/astrology_image/default.png"}
          alt={serviceDetails?.service_title || "Astrology Service"}
          className="w-full h-full object-cover"
          layout="fill"
        /> */}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center">
            {serviceDetails?.service_title || "Puja Service"}
          </h1>
        </div>
      </div>

      {/* Category and Date Section */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap justify-between items-center bg-white p-4 rounded-lg shadow-md">
          <div className="text-lg text-gray-700">
            <span className="font-semibold">Date:</span>{" "}
            {serviceDetails?.timestamp || "N/A"}
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-orange-800 mb-6">
            About {serviceDetails?.service_title || "Puja Service"}
          </h2>
          <div className="prose max-w-none">
            <p className="text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: serviceDetails?.service_desc || "" }}>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
