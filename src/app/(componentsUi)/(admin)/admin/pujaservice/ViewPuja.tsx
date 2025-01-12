"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import {
  FaPhone,
  FaMapMarkerAlt,
  FaLanguage,
  FaClock,
  FaUsers,
  FaList,
} from "react-icons/fa";
import { fetchPujaServiceDetails } from "./action";

interface Category {
  id: number;
  name: string;
}

interface PackageDetails {
  id: number;
  location: string;
  language: string;
  type: string;
  price: number;
  description: string;
  pujaServiceId: number;
}

interface PujaServiceDetails {
  id: number;
  title: string;
  img: string;
  desc: string;
  categoryId: number;
  date_of_create: string;
  category: Category | null;
  packages: PackageDetails[];
}

export default function ViewPuja({ id }: { id: number }) {
  const [packages, setPackages] = useState<PackageDetails[]>([]);
  const [serviceDetails, setServiceDetails] =
    useState<PujaServiceDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const data = await fetchPujaServiceDetails(id);
        console.log('Fetched data:', data);  // Check the response data
        const transformedPackages = (data?.packages || []).map((pkg: PackageDetails) => ({
          id: pkg.id,
          location: pkg.location,
          language: pkg.language,
          type: pkg.type,
          price: pkg.price,
          description: pkg.description,
          pujaServiceId: pkg.pujaServiceId,
        }));
        setPackages(transformedPackages);
        setServiceDetails(data || null);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);
  

  const getPanditsAndDuration = (type: string) => {
    switch (type) {
      case "basic":
        return { pandits: "1", duration: "1hr" };
      case "standard":
        return { pandits: "2", duration: "2.5hr" };
      case "premium":
        return { pandits: "5+", duration: "5+ hr" };
      default:
        return { pandits: "N/A", duration: "N/A" };
    }
  };
  
  const { pandits, duration } = packages.map((pkg) => getPanditsAndDuration(pkg.type))[0] || { pandits: "N/A", duration: "N/A" };
 


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
        <Image
          src={serviceDetails?.img || "/image/default.png"}
          alt={serviceDetails?.title || "Puja Service"}
          className="w-full h-full object-cover"
          layout="fill"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center">
            {serviceDetails?.title || "Puja Service"}
          </h1>
        </div>
      </div>

      {/* Category and Date Section */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap justify-between items-center bg-white p-4 rounded-lg shadow-md">
          <div className="text-lg text-gray-700">
            <span className="font-semibold">Category:</span>{" "}
            {serviceDetails?.category?.name || "N/A"}
          </div>
          <div className="text-lg text-gray-700">
            <span className="font-semibold">Date:</span>{" "}
            {serviceDetails?.date_of_create || "N/A"}
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-orange-800 mb-6">
            About {serviceDetails?.title || "Puja Service"}
          </h2>
          <div className="prose max-w-none">
            <p className="text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: serviceDetails?.desc || "" }}>
            </p>
          </div>
        </div>
      </div>

      {/* Packages Section */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center text-orange-800 mb-8">
          Our Packages
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => ( 
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              <div
                className={`p-6 ${
                  pkg.type === "Premium" ? "bg-orange-100" : "bg-white"
                }`}
              >
                <h3 className="text-2xl font-bold text-orange-800 mb-4">
                  {pkg.type}
                </h3>
                <div className="flex items-center mb-4">
                  <FaMapMarkerAlt className="text-orange-600 mr-2" />
                  <span>{pkg.location}</span>
                  <FaLanguage className="text-orange-600 ml-4 mr-2" />
                  <span>{pkg.language}</span>
                </div>
                <div className="text-3xl font-bold text-orange-800 mb-4">
                  ₹{pkg.price}
                </div>
                <div className="mb-4">
                  <FaClock className="inline-block text-orange-600 mr-2" />
                  <span dangerouslySetInnerHTML={{__html: pkg.description || ""}}></span>
                </div>
                <div className="flex flex-col space-y-2">
                  {/* <button className="border-2 border-orange-600 text-orange-600 py-2 px-4 rounded-lg hover:bg-orange-50 transition-colors duration-300">
                    View Details
                  </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
