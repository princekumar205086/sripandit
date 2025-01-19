"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import CryptoJS from "crypto-js";
import Section from "../section";
import { fetchPujaServiceDetails } from "../action";
import "../pujaservice.css";
import cartAuth from "@/app/helper/cartAuth";
import { toast } from "react-toastify";
import { useCart } from "@/app/context/CartContext";

const SinglePujaService = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isUser = cartAuth(); // Check auth status once at the top of the component

  const encryptedId = searchParams.get("id");
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
  const [pujaDetails, setPujaDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [filteredPackages, setFilteredPackages] = useState<any[]>([]);

  const [availableLocations, setAvailableLocations] = useState<string[]>([]);
  const [availableLanguages, setAvailableLanguages] = useState<string[]>([]);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  // Fetch Puja Details
  useEffect(() => {
    const fetchData = async () => {
      if (!pujaId) return;
      try {
        setLoading(true);
        const data = await fetchPujaServiceDetails(Number(pujaId));
        setPujaDetails(data);

        const packages = data?.packages || [];
        const locations = Array.from(
          new Set<string>(packages.map((pkg: any) => pkg.location).filter(Boolean))
        );
        const languages = Array.from(
          new Set<string>(packages.map((pkg: any) => pkg.language).filter(Boolean))
        );

        setAvailableLocations(locations);
        setAvailableLanguages(languages);
      } catch (err: any) {
        setError(err.message || "Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pujaId]);

  // Update Filtered Packages and URL
  useEffect(() => {
    if (!selectedLocation || !selectedLanguage) {
      setFilteredPackages([]);
      return;
    }

    if (pujaDetails && selectedLocation && selectedLanguage) {
      const packages = pujaDetails.packages || [];
      const filtered = packages.filter(
        (pkg: any) =>
          pkg.location === selectedLocation && pkg.language === selectedLanguage
      );
      setFilteredPackages(filtered);
    }
    setSelectedPackage(null);
  }, [selectedLocation, selectedLanguage, pujaDetails]);

  const { addToCart } = useCart();

  const handlePackageSelection = (pkg: any) => {
    setSelectedPackage(pkg);
  };

  const handleAddToCart = () => {
    if (!selectedPackage) {
      toast.error("Please select a package to add to the cart.");
      return;
    }

    if (!selectedDate || !selectedTime) {
      toast.error("Please select a valid date and time for the puja.");
      return;
    }

    if (!isUser) {
      router.push("/login?redirect=" + encodeURIComponent(window.location.href));
      return;
    }

    const itemToAdd = {
      id: pujaId ? Number(pujaId) : 0,
      name: title || "Default Title",
      type: selectedPackage.type,
      image: img || "/default-image.jpg",
      package: selectedPackage.name,
      packageId: selectedPackage.id,
      location: selectedPackage.location,
      language: selectedPackage.language,
      price: selectedPackage.price,
      description: selectedPackage.description,
      date: selectedDate,
      time: selectedTime,
    };

    addToCart(itemToAdd);
    toast.success("Package added to cart successfully!");
  };

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }
  if (error) return <div>Error: {error}</div>;

  const { title, img, desc, category } = pujaDetails || {};

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100">
      <Section
        bgImageUrl="/image/singlepuja.jpeg"
        title={title || "Default Title"}
        description={`Experience divine blessings through our sacred ${title || "Default Title"}, performed with utmost devotion and authentic rituals`}
      />

      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="rounded-lg overflow-hidden shadow-xl">
            <img
              src={img || "/default-image.jpg"}
              alt={title || "Default Title"}
              className="w-full h-[400px] object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-orange-800 mb-4">
              {title || "Default Title"}
            </h2>
            <p className="text-xs">{category && category.name ? category.name : "Default Category"}</p>
            <p className="text-gray-700 mb-6" dangerouslySetInnerHTML={{ __html: desc || "Default Description" }}></p>
          </div>
        </div>

        {/* Dropdown Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Location Dropdown */}
          <div className="relative">
            <label className="block text-gray-700 mb-2 font-semibold">Select Location</label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full p-3 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              disabled={availableLocations.length === 0}
            >
              <option value="">Choose a location</option>
              {availableLocations.map((location) => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>

          {/* Language Dropdown */}
          <div className="relative">
            <label className="block text-gray-700 mb-2 font-semibold">Select Language</label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full p-3 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              disabled={availableLanguages.length === 0}
            >
              <option value="">Choose a language</option>
              {availableLanguages.map((language) => (
                <option key={language} value={language}>{language}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Package Options - Clickable Cards */}
        {filteredPackages.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {filteredPackages.map((pkg: any) => (
              <div
                key={pkg.id}
                className={`rounded-lg p-6 shadow-lg cursor-pointer transition-colors duration-300 ${selectedPackage?.id === pkg.id ? "bg-orange-200" : "bg-white"}`}
                onClick={() => handlePackageSelection(pkg)}
              >
                <label htmlFor={`pkg-${pkg.id}`} className="text-xl font-bold text-orange-800">{pkg.name}</label>
                <p className="text-orange-600 text-lg">₹{pkg.price}</p>
                <p className="text-orange-600 text-lg" dangerouslySetInnerHTML={{ __html: pkg.description }}></p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600">No packages available for the selected location and language.</div>
        )}

        {/* Date and Time Selection */}
        {selectedPackage && (
          <div className="mt-8">
            <label className="block mb-2">Select Puja Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]} // Ensure future dates
              className="w-full p-3"
            />

            <label className="block mt-4 mb-2">Select Puja Time</label>
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full p-3"
            />
          </div>
        )}

        {/* Add to Cart Button */}
        <div className="text-center">
          <button
            disabled={!selectedPackage || !selectedDate || !selectedTime}
            className={`px-8 py-4 rounded-lg text-xl font-bold transition-all duration-300 ${
              selectedPackage && selectedDate && selectedTime
                ? "bg-orange-600 text-white hover:bg-orange-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            onClick={handleAddToCart}
          >
            {isUser ? "Add to Cart" : "Login"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default SinglePujaService;
