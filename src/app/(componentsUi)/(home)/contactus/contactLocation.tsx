"use client";
import React, { useState } from "react";
import { FaMapMarkerAlt, FaSatellite, FaStreetView } from "react-icons/fa";

const LocationMap = () => {
  const [mapType, setMapType] = useState("roadmap");
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleMapLoad = () => {
    setIsLoaded(true);
  };

  const handleMapError = () => {
    setError("Failed to load the map. Please check your internet connection and try again.");
  };

  const toggleMapType = (type:any) => {
    setMapType(type);
  };

  return (
    <section className="max-w-full mx-auto p-6 bg-orange-500 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-cream flex items-center">
        <FaMapMarkerAlt className="mr-2 text-cream" />
        Location
      </h2>
      <div className="relative overflow-hidden rounded-lg">
        {!isLoaded && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <p className="text-red-500 text-center p-4">{error}</p>
          </div>
        )}
        <iframe
          title="Location Map"
          src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14369.238922855546!2d87.48947373349961!3d25.79335390729325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eff853106a9d3f%3A0xa869de0557562fd4!2sRambagh%2C%20Purnia%2C%20Bihar!5e0!3m2!1sen!2sin!4v1727535356695!5m2!1sen!2sin=${mapType}`}
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          onLoad={handleMapLoad}
          onError={handleMapError}
        ></iframe>
      </div>
      <div className="flex justify-center mt-4 space-x-4">
        <button
          onClick={() => toggleMapType("roadmap")}
          className={`flex items-center px-4 py-2 rounded-full ${mapType === "roadmap" ? "bg-cream text-orange-500" : "bg-gray-200 text-gray-700"} transition-colors duration-300`}
        >
          <FaMapMarkerAlt className="mr-2" /> Road Map
        </button>
        <button
          onClick={() => toggleMapType("satellite")}
          className={`flex items-center px-4 py-2 rounded-full ${mapType === "satellite" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"} transition-colors duration-300`}
        >
          <FaSatellite className="mr-2" /> Satellite
        </button>
        <button
          onClick={() => toggleMapType("streetview")}
          className={`flex items-center px-4 py-2 rounded-full ${mapType === "streetview" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"} transition-colors duration-300`}
        >
          <FaStreetView className="mr-2" /> Street View
        </button>
      </div>
    </section>
  );
};

export default LocationMap;
