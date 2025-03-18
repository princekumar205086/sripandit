"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import CryptoJS from "crypto-js";
import Section from "../section";
import { fetchPujaServiceDetails } from "../action";
import "../pujaservice.css";
import cartAuth from "@/app/helper/cartAuth";
import { toast } from "react-hot-toast";
import { useCart } from "@/app/context/CartContext";
import moment from "moment-timezone";
import Image from "next/image";

const SinglePujaService = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isUser = cartAuth();

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
  const [errorMessage, setErrorMessage] = useState("");

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
          new Set<string>(
            packages.map((pkg: any) => pkg.location).filter(Boolean)
          )
        );
        const languages = Array.from(
          new Set<string>(
            packages.map((pkg: any) => pkg.language).filter(Boolean)
          )
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
    // Set timezone to Indian Standard Time (IST)
    moment.tz.setDefault("Asia/Kolkata");
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
      router.push(
        "/login?redirect=" + encodeURIComponent(window.location.href)
      );
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

  // Date and Time Validation Logic
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    const currentDate = moment().tz("Asia/Kolkata").format("YYYY-MM-DD");
    if (date < currentDate) {
      setErrorMessage("Date cannot be in the past.");
    } else {
      setErrorMessage("");
      setSelectedDate(date);
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = e.target.value;
    const currentDate = moment().tz("Asia/Kolkata").format("YYYY-MM-DD");
    const currentTime = moment().tz("Asia/Kolkata").format("HH:mm");

    // If the selected date is today, validate the time against the current time
    if (selectedDate === currentDate && time < currentTime) {
      setErrorMessage("Time cannot be in the past.");
    } else {
      setErrorMessage("");
      setSelectedTime(time);
    }
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
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100 overflow-hidden">
      <Section
        bgImageUrl="/image/singlepuja.jpeg"
        title={title || "Default Title"}
        description={`Experience divine blessings through our sacred ${
          title || "Default Title"
        }, performed with utmost devotion and authentic rituals`}
      />

      {/* Professional caring message */}
      <div className="bg-orange-100 text-orange-800 py-4 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="flex items-center">
            <svg
              className="h-6 w-6 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              ></path>
            </svg>
            <p className="text-sm sm:text-base">
              Our experienced pandits perform each ritual with utmost care and
              devotion according to authentic Vedic traditions. Your spiritual
              well-being is our highest priority.
            </p>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 sm:px-6 py-8 max-w-full">
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-8 lg:mb-12">
          <div className="rounded-lg overflow-hidden shadow-xl">
            <div className="relative w-full h-[250px] sm:h-[350px] md:h-[400px]">
              {img ? (
                <img
                  src={img}
                  alt={title || "Default Title"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <p className="text-gray-500">Image not available</p>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col justify-center p-2 sm:p-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-orange-800 mb-2 sm:mb-4">
              {title || "Default Title"}
            </h2>
            <div className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full mb-4">
              {category && category.name ? category.name : "Traditional Puja"}
            </div>
            <div
              className="text-gray-700 mb-6 prose prose-sm sm:prose max-w-none"
              dangerouslySetInnerHTML={{
                __html: desc || "Default Description",
              }}
            ></div>
          </div>
        </div>

        {/* Booking Details Section */}
        <div className="bg-white rounded-lg shadow-md p-5 sm:p-8 mb-8">
          <h3 className="text-xl sm:text-2xl font-semibold text-orange-800 mb-6 pb-2 border-b border-orange-200">
            Booking Details
          </h3>

          {/* Dropdown Section */}
          <div className="grid md:grid-cols-2 gap-4 sm:gap-8 mb-8">
            {/* Location Dropdown */}
            <div className="relative">
              <label className="block text-gray-700 mb-2 font-semibold">
                Select Location
              </label>
              <div className="relative">
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full p-3 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none"
                  disabled={availableLocations.length === 0}
                >
                  <option value="">Choose a location</option>
                  {availableLocations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              {availableLocations.length === 0 && (
                <p className="text-xs text-orange-600 mt-1">
                  No locations available
                </p>
              )}
            </div>

            {/* Language Dropdown */}
            <div className="relative">
              <label className="block text-gray-700 mb-2 font-semibold">
                Select Language
              </label>
              <div className="relative">
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full p-3 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none"
                  disabled={availableLanguages.length === 0}
                >
                  <option value="">Choose a language</option>
                  {availableLanguages.map((language) => (
                    <option key={language} value={language}>
                      {language}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              {availableLanguages.length === 0 && (
                <p className="text-xs text-orange-600 mt-1">
                  No languages available
                </p>
              )}
            </div>
          </div>

          {/* Package Options */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold mb-4">Select Package</h4>
            {filteredPackages.length > 0 ? (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {filteredPackages.map((pkg: any) => (
                  <div
                    key={pkg.id}
                    className={`rounded-lg p-4 sm:p-6 shadow-md cursor-pointer transition-all duration-300 ${
                      selectedPackage?.id === pkg.id
                        ? "bg-orange-200 border-2 border-orange-500"
                        : "bg-white hover:bg-orange-50 border border-gray-200"
                    }`}
                    onClick={() => handlePackageSelection(pkg)}
                  >
                    <div className="flex items-start">
                      <div
                        className={`mr-3 mt-1 ${
                          selectedPackage?.id === pkg.id
                            ? "visible"
                            : "invisible"
                        }`}
                      >
                        <svg
                          className="w-5 h-5 text-orange-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <label className="text-lg font-bold text-orange-800 block mb-1">
                          {pkg.name}
                        </label>
                        <div className="font-semibold text-orange-600 mb-2">
                          ₹{pkg.price}
                        </div>
                        <div
                          className="text-sm text-gray-600"
                          dangerouslySetInnerHTML={{ __html: pkg.description }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-orange-50 rounded-lg border border-orange-200">
                <svg
                  className="mx-auto h-12 w-12 text-orange-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <p className="mt-2 text-gray-600">
                  Please select a location and language first.
                </p>
              </div>
            )}
          </div>

          {/* Date and Time Selection */}
          {selectedPackage && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-4">Schedule Your Puja</h4>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="w-full sm:w-1/2">
                  <label className="block text-gray-700 mb-2 font-medium">
                    Select Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={handleDateChange}
                      min={moment().tz("Asia/Kolkata").format("YYYY-MM-DD")}
                      className="w-full p-3 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="w-full sm:w-1/2">
                  <label className="block text-gray-700 mb-2 font-medium">
                    Select Time
                  </label>
                  <div className="relative">
                    <input
                      type="time"
                      value={selectedTime}
                      onChange={handleTimeChange}
                      className="w-full p-3 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="mt-3 p-3 bg-red-50 border-l-4 border-red-500 text-red-700">
                  <div className="flex">
                    <svg
                      className="h-5 w-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p>{errorMessage}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Add to Cart Button */}
          <div className="mt-8 text-center sm:text-left">
            <button
              disabled={!selectedPackage || !selectedDate || !selectedTime}
              className={`w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-lg sm:text-xl font-bold transition-all duration-300 ${
                selectedPackage && selectedDate && selectedTime
                  ? "bg-orange-600 text-white hover:bg-orange-700 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              onClick={handleAddToCart}
            >
              {isUser ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                  Add to Cart
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Login to Continue
                </div>
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SinglePujaService;
