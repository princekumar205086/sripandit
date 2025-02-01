"use client";
import React from "react";
import {
  FaTimesCircle,
  FaPhoneAlt,
  FaEnvelope,
  FaQuestionCircle,
} from "react-icons/fa";

const BookingFailed = () => {
  const bookingDetails = {
    pujaName: "Satyanarayan Puja",
    dateTime: "December 15, 2023 | 10:30 AM",
    location: "123 Temple Street, Mumbai, Maharashtra",
    language: "Sanskrit & Hindi",
    package: "Premium Package",
    features: [
      "Complete Puja Samagri",
      "2 Expert Priests",
      "Digital Recording",
      "Prasad Delivery",
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-red-100">
      {/* Header */}
      <header className="bg-transparent shadow-md py-4 h-20"></header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Failure Message */}
        <div className="text-center mb-12">
          <FaTimesCircle className="text-red-600 text-6xl mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Your Puja Booking Failed!
          </h1>
          <p className="text-gray-600 text-lg">
            We apologize for the inconvenience. Please try again or contact our support team.
          </p>
          <p className="text-gray-600 text-lg mt-2">
            {" "}
            Your booking ID is{" "}
            <span className="font-semibold text-red-600">OK...........</span>
          </p>
        </div>

        {/* Booking Details Card */}
        {/* <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Booking Details
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-600 mb-2">Puja Name</p>
              <p className="font-semibold text-gray-800">
                {bookingDetails.pujaName}
              </p>
            </div>
            <div>
              <p className="text-gray-600 mb-2">Date & Time</p>
              <p className="font-semibold text-gray-800">
                {bookingDetails.dateTime}
              </p>
            </div>
            <div>
              <p className="text-gray-600 mb-2">Location</p>
              <p className="font-semibold text-gray-800">
                {bookingDetails.location}
              </p>
            </div>
            <div>
              <p className="text-gray-600 mb-2">Language</p>
              <p className="font-semibold text-gray-800">
                {bookingDetails.language}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-gray-600 mb-2">Package Details</p>
            <p className="font-semibold text-gray-800 mb-2">
              {bookingDetails.package}
            </p>
            <ul className="list-disc list-inside text-gray-600">
              {bookingDetails.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </div> */}

        {/* Contact Support */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Need Assistance?
          </h2>
          <div className="flex flex-wrap gap-6 justify-center">
            <div className="flex items-center gap-2">
              <FaPhoneAlt className="text-red-600" />
              <span className="text-gray-600">+91-XXXXX-XXXXX</span>
            </div>
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-red-600" />
              <span className="text-gray-600">support@okpuja.com</span>
            </div>
            <div className="flex items-center gap-2">
              <FaQuestionCircle className="text-red-600" />
              <a href="#" className="text-red-600 hover:underline">
                View FAQs
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookingFailed;