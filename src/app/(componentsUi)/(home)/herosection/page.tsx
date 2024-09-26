"use client";
import React, { useState, useEffect, useMemo } from "react";
import BookingModal from "../utils/BookingModal";

const locations = [
  "Select City",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Delhi",
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

const Hero: React.FC = () => {
  const [location, setLocation] = useState("Select City");
  const [pujaName, setPujaName] = useState("");
  const [typedText, setTypedText] = useState("");
  const [index, setIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [suggestedPujas, setSuggestedPujas] = useState<string[]>([]);
  const [selectedPuja, setSelectedPuja] = useState<string>("");

  const text = useMemo(() => ["Pandit.", "Astrologer."], []);

  const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLocation(event.target.value);
  };

  const handlePujaNameChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setPujaName(input);

    if (input.length >= 3) {
      try {
        const response = await fetch(`/api/advicepujaname/?pujaName=${input}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSuggestedPujas(data.map((item: any) => item.title));
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      setSuggestedPujas([]);
    }
  };

  const handleSuggestionClick = (puja: string) => {
    setPujaName(puja);
    setSelectedPuja(puja);
    setSuggestedPujas([]);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      const response = await fetch("/api/pujabookingservice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setSubmitting(false);
      handleModalClose();
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTypedText((prev) => prev + text[index][prev.length]);
      if (typedText === text[index]) {
        setIndex((prev) => (prev + 1) % text.length);
        setTypedText("");
      }
    }, 200);
    return () => clearTimeout(timeoutId);
  }, [typedText, index, text]);

  return (
    <section
      className="relative bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: `url('/image/kalash.jpg')` }}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-center h-full py-24">
          {/* Left half */}
          <div className="lg:w-2/3 flex flex-col justify-center items-center text-center text-white lg:text-left">
            <h2 className="text-xl lg:text-2xl font-semibold leading-tight mb-6 lg:mb-6">
              Optimal rituals encounter with certified and seasoned {typedText}
            </h2>
            <p className="text-sm lg:text-base mb-6 lg:mb-6">
            "Okpuja delivers a full suite of spiritual services tailored to meet your needs. Whether you're seeking traditional Puja ceremonies, powerful Homa rituals, or personalized Astrology consultations, our experienced professionals ensure a meaningful and enriching spiritual experience."
            </p>
            <button
              className="rounded-full bg-red-500 px-6 py-3 lg:px-6 lg:py-3 font-semibold text-white hover:bg-red-600 transition duration-300 ease-in-out"
              onClick={handleModalOpen}
            >
              Book Now
            </button>
          </div>
          {/* Right half (form card) */}
          <div className="lg:w-1/3 flex justify-center items-center mt-12 lg:mt-0">
            <div className="bg-cream p-6 lg:p-6 rounded-lg shadow-lg">
              <p className="text-base lg:text-lg text-orange-500 mb-6 lg:mb-6">
                Secure the services of top-notch priests for your Pujas or Homas with Okpuja{" "}
                <span className="font-bold text-red-500">{location}</span>
              </p>
              <div className="mb-6 lg:mb-6">
                <label
                  htmlFor="location"
                  className="block text-sm lg:text-base font-medium text-orange-500 mb-2"
                >
                  Select City
                </label>
                <select
                  id="location"
                  className="rounded-lg px-4 py-2 w-full text-sm lg:text-md text-orange-500 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
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
              <div className="mb-6 lg:mb-6">
                <label
                  htmlFor="pujaName"
                  className="block text-sm lg:text-md font-medium text-orange-500 mb-2"
                >
                  Enter a Puja or Homa name
                </label>
                <input
                  id="pujaName"
                  type="text"
                  className="rounded-lg px-4 py-2 w-full text-sm lg:text-md text-orange-500 bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Enter a Puja or Homa name"
                  value={pujaName}
                  onChange={handlePujaNameChange}
                />
                {suggestedPujas.length > 0 && (
                  <div className="mt-2">
                    <p className="text-red-600 text-xs">Suggestions:</p>
                    <ul className="divide-y divide-gray-200 rounded-lg bg-white shadow-lg text-orange-500">
                      {suggestedPujas.map((puja, index) => (
                        <li
                          key={index}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSuggestionClick(puja)}
                        >
                          {puja}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <button
                className="block w-full rounded-lg bg-red-500 px-6 py-3 lg:px-6 lg:py-3 font-semibold text-white text-sm lg:text-md hover:bg-red-600 transition duration-300 ease-in-out"
                onClick={handleModalOpen}
              >
                Book a Service
              </button>
            </div>
          </div>
        </div>
      </div>
      <BookingModal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        onSubmit={handleFormSubmit}
        initialLocation={location}
        initialPujaName={pujaName}
      />
    </section>
  );
};

export default Hero;
