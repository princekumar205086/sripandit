"use client";
import React, { useState } from "react";
import { FaMapMarkerAlt, FaLanguage, FaCheckCircle } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import CryptoJS from "crypto-js";
import Section from "../pujaservice/section";
import { fetchPujaServiceDetails } from "../pujaservice/action";


const SinglePujaService = () => {
  const searchParams = useSearchParams();
  const encryptedId = searchParams.get("id");

  // Function to decrypt the service ID
  const decryptId = (encryptedId: string | null) => {
    if (encryptedId) {
      try {
        const bytes = CryptoJS.AES.decrypt(
          decodeURIComponent(encryptedId),
          "your-secret-key"
        );
        return bytes.toString(CryptoJS.enc.Utf8);
      } catch (error) {
        return null;
      }
    }
    return null;
  };
  const pujaId = decryptId(encryptedId);
  //console.log(pujaId);
  
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);

  const locations = ["Mumbai", "Delhi", "Bangalore", "Varanasi", "Pune"];
  const languages = ["Sanskrit", "Hindi", "English", "Tamil", "Telugu"];

  // Package data with location and language-specific prices
  type Package = {
    id: number;
    name: string;
    price: number;
    features: string[];
  };

  type PackageData = {
    [location: string]: {
      [language: string]: Package[];
    };
  };

  const packageData: PackageData = {
    Mumbai: {
      Sanskrit: [
        {
          id: 1,
          name: "Standard Package",
          price: 2999,
          features: [
            "1 Expert Pandit",
            "2 Hours Duration",
            "Basic Puja Samagri",
            "Prasad",
          ],
        },
        {
          id: 2,
          name: "Premium Package",
          price: 4999,
          features: [
            "2 Expert Pandits",
            "3 Hours Duration",
            "Premium Puja Samagri",
            "Special Prasad",
            "Certificate",
          ],
        },
      ],
      Hindi: [
        {
          id: 3,
          name: "Deluxe Package",
          price: 3999,
          features: [
            "2 Expert Pandits",
            "4 Hours Duration",
            "Deluxe Puja Samagri",
            "Special Prasad",
            "Certificate",
          ],
        },
      ],
    },
    Delhi: {
      English: [
        {
          id: 4,
          name: "Standard Package",
          price: 3499,
          features: [
            "1 Expert Pandit",
            "2 Hours Duration",
            "Basic Puja Samagri",
            "Prasad",
          ],
        },
      ],
    },
    // Add similar data for other locations and languages
  };

  const filteredPackages =
    selectedLocation && selectedLanguage
      ? packageData[selectedLocation]?.[selectedLanguage] || []
      : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100">
      {/* Header Section */}
      <Section
        bgImageUrl="/image/singlepuja.jpeg"
        title="Satyanarayan Puja"
        description="Experience divine blessings through our sacred Satyanarayan Puja, performed with utmost devotion and authentic rituals"
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="rounded-lg overflow-hidden shadow-xl">
            <img
              src="/image/astrology.jpeg"
              // image
              alt="Puja Setup"
              className="w-full h-[400px] object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-orange-800 mb-4">
              Satyanarayan Puja
              {/* title */}
            </h2>
            <p>category name</p>
            {/* category name */}
            <p className="text-gray-700 mb-6">
              Satyanarayan Puja is a sacred ritual dedicated to Lord Vishnu,
              bringing prosperity, success, and spiritual enlightenment. This
              divine ceremony is known for fulfilling wishes and bringing peace
              to households.
              {/* descrption */}
            </p>
          </div>
        </div>
        {/* informational section */}
        <div className="w-full grid grid-cols-1 gap-8 mb-12">
          <div className="flex flex-col justify-center shadow-lg p-6 bg-white rounded-lg">
            <h2 className="text-3xl font-bold text-orange-800 mb-4 text-center">
              Please select your location and language to view available
              packages.
            </h2>
            <p className="text-gray-700 mb-6 text-center">
              To view the available packages for Satyanarayan Puja, kindly
              choose your preferred location and language. Select the package
              that best meets your requirements and add it to your cart to book
              the puja. Prices may vary based on location and language.
            </p>
          </div>
        </div>

        {/* Dropdown Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="relative">
            <label className="block text-gray-700 mb-2 font-semibold">
              <FaMapMarkerAlt className="inline mr-2" /> Select Location
            </label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full p-3 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">Choose a location</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <label className="block text-gray-700 mb-2 font-semibold">
              <FaLanguage className="inline mr-2" /> Select Language
            </label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full p-3 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">Choose a language</option>
              {languages.map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Package Options */}
        {filteredPackages.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {filteredPackages.map((pkg) => (
              <div
                key={pkg.id}
                className={`rounded-lg p-6 shadow-lg transition-transform duration-300 hover:scale-105 ${
                  selectedPackage === pkg.id
                    ? "bg-orange-100 border-2 border-orange-500"
                    : "bg-white"
                }`}
              >
                <div className="flex items-center mb-4">
                  <input
                    type="radio"
                    name="package"
                    checked={selectedPackage === pkg.id}
                    onChange={() => setSelectedPackage(pkg.id)}
                    className="w-4 h-4 text-orange-600"
                  />
                  <h3 className="text-xl font-bold text-orange-800 ml-2">
                    {pkg.name}
                  </h3>
                </div>
                <div className="mb-4">
                  <p className="text-3xl font-bold text-orange-600">
                    ₹{pkg.price}
                  </p>
                </div>
                <ul className="space-y-2">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <FaCheckCircle className="text-orange-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600">
            <p>
              No packages available for the selected location and language.
              Please try different options.
            </p>
          </div>
        )}

        {/* Footer Section */}
        <div className="text-center">
          <button
            disabled={!selectedPackage}
            className={`px-8 py-4 rounded-lg text-xl font-bold transition-all duration-300 ${
              selectedPackage
                ? "bg-orange-600 text-white hover:bg-orange-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Add to Cart
          </button>
        </div>
      </main>
    </div>
  );
};

export default SinglePujaService;