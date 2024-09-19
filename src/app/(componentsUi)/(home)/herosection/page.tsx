// Hero.tsx
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

  const handleLocationChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setLocation(event.target.value);
  };

  const handlePujaNameChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = event.target.value;
    setPujaName(input);
    // Fetch suggestions when input length is at least 3 characters
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
    setSuggestedPujas([]); // Clear suggestions after selection
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
      // Handle success (e.g., show a success message, close the modal, etc.)
    } catch (error) {
      console.error("Error:", error);
      // Handle error (e.g., show an error message)
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
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-6 lg:mb-8">
              Optimal ritual encounter with certified and seasoned {typedText}
            </h2>
            <p className="text-xl lg:text-2xl mb-6 lg:mb-8">
              Okpuja offers comprehensive solutions for your spiritual needs,
              including Puja, Homa, and Astrology services.
            </p>
            <button
              className="rounded-full bg-red-500 px-8 py-4 font-semibold text-white text-lg lg:text-xl hover:bg-red-600 transition duration-300 ease-in-out"
              onClick={handleModalOpen}
            >
              Book Now
            </button>
          </div>
          {/* Right half (form card) */}
          <div className="lg:w-1/3 flex justify-center items-center mt-12 lg:mt-20">
            <div className="bg-cream p-8 rounded-lg shadow-lg">
              <p className="text-2xl lg:text-3xl text-orange-500 mb-6 lg:mb-8">
                Secure the services of top-notch priests for your Pujas or Homas
                with Okpuja{" "}
                <span className="font-bold text-red-500">{location}</span>
              </p>
              <div className="mb-6 lg:mb-8">
                <label
                  htmlFor="location"
                  className="block text-xl lg:text-2xl font-medium text-orange-500 mb-2"
                >
                  Select City
                </label>
                <select
                  id="location"
                  className="rounded-lg px-4 py-3 w-full text-xl lg:text-2xl text-orange-500 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
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
                  className="block text-xl lg:text-2xl font-medium text-orange-500 mb-2"
                >
                  Enter a Puja or Homa name
                </label>
                <input
                  id="pujaName"
                  type="text"
                  className="rounded-lg px-4 py-3 w-full text-xl lg:text-2xl text-orange-500 bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Enter a Puja or Homa name"
                  value={pujaName}
                  onChange={handlePujaNameChange}
                />
                {/* Display suggestions */}
                {suggestedPujas.length > 0 && (
                  <div className="mt-2">
                    <p className="text-gray-600 text-sm">Suggestions:</p>
                    <ul className="divide-y divide-gray-200 rounded-lg bg-white shadow-lg">
                      {suggestedPujas.map((puja, index) => (
                        <li
                          key={index}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSuggestionClick(puja)} // Handle click on suggestion
                        >
                          {puja}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <button
                className="block w-full rounded-lg bg-red-500 px-8 py-4 font-semibold text-white text-xl lg:text-2xl hover:bg-red-600 transition duration-300 ease-in-out"
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
        initialLocation={location} // Use the state variable for location
        initialPujaName={pujaName} // Already using the state variable for pujaName
      />
    </section>
  );
};

export default Hero;
