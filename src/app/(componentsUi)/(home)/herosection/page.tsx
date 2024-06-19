// code for hero section
"use client";
import React, { useState, useEffect, useMemo } from "react";

const Hero = () => {
  const [location, setLocation] = useState("Select City");
  const [pujaName, setPujaName] = useState("");
  const [typedText, setTypedText] = useState("");
  const [index, setIndex] = useState(0);
  const text = useMemo(() => ['Pandit.', 'Astrologer'], []);


  const handleLocationChange = (event: any) => {
    setLocation(event.target.value);
  };

  const handlePujaNameChange = (event: any) => {
    setPujaName(event.target.value);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTypedText(prev => prev + text[index][prev.length]);
      if (typedText === text[index]) {
        setIndex(prev => (prev + 1) % text.length);
        setTypedText("");
      }
    }, 200);
    return () => clearTimeout(timeoutId);
  }, [typedText, index, text]);

  // Location data for all states
  const locations = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  return (
    <section
      className="relative bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: `url('/image/kalash.jpg')` }}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-center h-full py-24">
          {/* Left half */}
          <div className="lg:w-2/3 flex flex-col justify-center items-center text-center text-white lg:text-left">
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-6 lg:mb-8">
            Optimal ritual encounter with certified and seasoned {typedText}
            </h2>
            <p className="text-xl lg:text-2xl mb-6 lg:mb-8">
              SmartPuja offers comprehensive solutions for your spiritual needs,
              including Puja, Homa, and Astrology services.
            </p>
            <button className="rounded-full bg-red-500 px-8 py-4 font-semibold text-white text-lg lg:text-xl hover:bg-red-600 transition duration-300 ease-in-out">
              Book Now
            </button>
          </div>
          {/* Right half (form card) */}
          <div className="lg:w-1/3 flex justify-center items-center mt-12 lg:mt-20">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <p className="text-2xl lg:text-3xl text-black mb-6 lg:mb-8">
                Secure the services of top-notch priests for your Pujas or Homas
                with SmartPuja{" "}
                <span className="font-bold text-red-500">{location}</span>
              </p>
              <div className="mb-6 lg:mb-8">
                <label
                  htmlFor="location"
                  className="block text-xl lg:text-2xl font-medium text-black mb-2"
                >
                  Select City
                </label>
                <select
                  id="location"
                  className="rounded-lg px-4 py-3 w-full text-xl lg:text-2xl text-gray-800 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={location}
                  onChange={handleLocationChange}
                >
                  {locations.map((state, index) => (
                    <option key={index} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-6 lg:mb-8">
                <label
                  htmlFor="pujaName"
                  className="block text-xl lg:text-2xl font-medium text-black mb-2"
                >
                  Enter a Puja or Homa name
                </label>
                <input
                  id="pujaName"
                  type="text"
                  className="rounded-lg px-4 py-3 w-full text-xl lg:text-2xl text-gray-800 bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Enter a Puja or Homa name"
                  value={pujaName}
                  onChange={handlePujaNameChange}
                />
              </div>
              <button className="block w-full rounded-lg bg-red-500 px-8 py-4 font-semibold text-white text-xl lg:text-2xl hover:bg-red-600 transition duration-300 ease-in-out">
                Book a Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
