"use client";
import React, { useState } from "react";
import { FaStar, FaShare } from "react-icons/fa";
import { MdLocationOn, MdLanguage } from "react-icons/md";

interface Package {
  type: string;
  price: number;
  description: string;
  locations: string[];
  languages: string[];
}

interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
}

interface Faq {
  id: number;
  question: string;
  answer: string;
}

const PujaServicePage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>("description");
  const [selectedLocation, setSelectedLocation] = useState<string>("Select Location");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("Select Language");
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      user: "Rahul S.",
      rating: 5,
      comment: "Excellent service! The puja was conducted beautifully.",
    },
    {
      id: 2,
      user: "Priya M.",
      rating: 4,
      comment: "Great experience overall. Pandit ji was very knowledgeable.",
    },
    {
      id: 3,
      user: "Amit K.",
      rating: 5,
      comment: "Highly recommended. Will definitely use this service again.",
    },
  ]);
  const [faqs, setFaqs] = useState<Faq[]>([
    {
      id: 1,
      question: "What items do I need to arrange for the puja?",
      answer: "All necessary items are included in the package. You don't need to arrange anything separately.",
    },
    {
      id: 2,
      question: "How long does the puja ceremony last?",
      answer: "The duration varies based on the package, but it typically lasts between 1 to 3 hours.",
    },
    {
      id: 3,
      question: "Can I customize the puja according to my preferences?",
      answer: "Yes, we offer customization options. Please contact our support team for specific requirements.",
    },
  ]);

  const pujaDetails = {
    title: "Ganesh Puja",
    image: "https://images.unsplash.com/photo-1635016288720-c52507b9a717?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Ganesh Puja is a Hindu festival celebrating the birth of Lord Ganesha, the elephant-headed deity of wisdom and prosperity.",
    category: "Hindu Rituals",
  };

  const packages: Package[] = [
    {
      type: "Basic",
      price: 999,
      description: "Essential puja items and simple ceremony",
      locations: ["Mumbai", "Delhi"],
      languages: ["Hindi", "English"],
    },
    {
      type: "Standard",
      price: 1999,
      description: "Complete puja items, ceremony, and prasad",
      locations: ["Mumbai", "Delhi", "Bangalore"],
      languages: ["Hindi", "English", "Marathi"],
    },
    {
      type: "Premium",
      price: 3999,
      description: "Luxurious puja items, elaborate ceremony, prasad, and personalized consultation",
      locations: ["Mumbai", "Delhi", "Bangalore", "Kolkata"],
      languages: ["Hindi", "English", "Marathi", "Bengali"],
    },
  ];

  const filteredPackages = packages.filter(
    (pkg) =>
      (pkg.locations.includes(selectedLocation) && selectedLocation !== "Select Location") &&
      (pkg.languages.includes(selectedLanguage) && selectedLanguage !== "Select Language")
  );

  const handlePackageSelection = (pkg: Package) => {
    setSelectedPackage(pkg);
  };

  const handleAddReview = (newReview: Review) => {
    setReviews((prev) => [...prev, newReview]);
  };

  const handleAddFaq = (newFaq: Faq) => {
    setFaqs((prev) => [...prev, newFaq]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <img
            src={pujaDetails.image}
            alt={pujaDetails.title}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-4">{pujaDetails.title}</h1>
          <p className="text-gray-600 mb-4">{pujaDetails.description}</p>
          <p className="text-sm text-gray-500 mb-6">Category: {pujaDetails.category}</p>
          <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded-full hover:bg-gray-300 transition duration-300">
            <FaShare className="inline mr-2" /> Share
          </button>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Select Your Package</h2>
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="relative">
            <select
              value={selectedLocation}
              onChange={(e) => {
                setSelectedLocation(e.target.value);
                setSelectedPackage(null); // Reset selected package on location change
              }}
              className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm leading-5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Select Location">Select Location</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Kolkata">Kolkata</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <MdLocationOn className="h-5 w-5" />
            </div>
          </div>
          <div className="relative">
            <select
              value={selectedLanguage}
              onChange={(e) => {
                setSelectedLanguage(e.target.value);
                setSelectedPackage(null); // Reset selected package on language change
              }}
              className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm leading-5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Select Language">Select Language</option>
              <option value="Hindi">Hindi</option>
              <option value="English">English</option>
              <option value="Marathi">Marathi</option>
              <option value="Bengali">Bengali</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <MdLanguage className="h-5 w-5" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredPackages.map((pkg, index) => (
            <div
              key={index}
              className="border rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300"
            >
              <h3 className="text-xl font-semibold mb-2">{pkg.type} Package</h3>
              <p className="text-2xl font-bold mb-4">₹{pkg.price}</p>
              <p className="text-gray-600 mb-4">{pkg.description}</p>
              <label className="flex items-center mb-4">
                <input
                  type="radio"
                  name="package"
                  className="mr-2"
                  onChange={() => handlePackageSelection(pkg)}
                />
                Select this package
              </label>
            </div>
          ))}
        </div>
        {selectedPackage && (
          <div className="mt-6">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300">
              Book Now
            </button>
          </div>
        )}
      </div>

      <div className="mb-12">
        <div className="flex border-b mb-6">
          <button
            className={`py-2 px-4 font-medium ${selectedTab === "description" ? "border-b-2 border-blue-600" : ""}`}
            onClick={() => setSelectedTab("description")}
          >
            Description
          </button>
          <button
            className={`py-2 px-4 font-medium ${selectedTab === "reviews" ? "border-b-2 border-blue-600" : ""}`}
            onClick={() => setSelectedTab("reviews")}
          >
            Reviews
          </button>
          <button
            className={`py-2 px-4 font-medium ${selectedTab === "faq" ? "border-b-2 border-blue-600" : ""}`}
            onClick={() => setSelectedTab("faq")}
          >
            FAQ
          </button>
        </div>
        {selectedTab === "description" && (
          <div className="text-gray-700">
            <p>{pujaDetails.description}</p>
          </div>
        )}
        {selectedTab === "reviews" && (
          <div>
            {reviews.map((review) => (
              <div key={review.id} className="border-b py-4">
                <h4 className="font-semibold">{review.user}</h4>
                <p className="text-sm text-gray-500 mb-1">
                  <FaStar className="inline text-yellow-500" /> {review.rating} Stars
                </p>
                <p>{review.comment}</p>
              </div>
            ))}
            <div className="mt-4">
              <h5 className="font-semibold">Add a Review</h5>
              {/* Add review form can be implemented here */}
            </div>
          </div>
        )}
        {selectedTab === "faq" && (
          <div>
            {faqs.map((faq) => (
              <div key={faq.id} className="border-b py-4">
                <h4 className="font-semibold">{faq.question}</h4>
                <p>{faq.answer}</p>
              </div>
            ))}
            <div className="mt-4">
              <h5 className="font-semibold">Add a FAQ</h5>
              {/* Add FAQ form can be implemented here */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PujaServicePage;
