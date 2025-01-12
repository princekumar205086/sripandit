"use client";
import React from "react";
import { FaCheckCircle, FaDownload, FaShare, FaPrint, FaPhoneAlt, FaEnvelope, FaQuestionCircle } from "react-icons/fa";

const BookingSuccess = () => {
  const bookingDetails = {
    pujaName: "Satyanarayan Puja",
    dateTime: "December 15, 2023 | 10:30 AM",
    location: "123 Temple Street, Mumbai, Maharashtra",
    language: "Sanskrit & Hindi",
    package: "Premium Package",
    features: ["Complete Puja Samagri", "2 Expert Priests", "Digital Recording", "Prasad Delivery"]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100">
      {/* Header */}
      <header className="bg-white shadow-md py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <img
            src="https://images.unsplash.com/photo-1598715685267-0f45366bd1a8"
            alt="OkPuja Logo"
            className="h-12 w-auto object-contain"
          />
          <button className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors">
            Home
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Success Message */}
        <div className="text-center mb-12">
          <FaCheckCircle className="text-green-600 text-6xl mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Puja Booking is Confirmed!</h1>
          <p className="text-gray-600 text-lg">
            Thank you for choosing our services. We're honored to serve you on this special occasion.
          </p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Booking Details</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-600 mb-2">Puja Name</p>
              <p className="font-semibold text-gray-800">{bookingDetails.pujaName}</p>
            </div>
            <div>
              <p className="text-gray-600 mb-2">Date & Time</p>
              <p className="font-semibold text-gray-800">{bookingDetails.dateTime}</p>
            </div>
            <div>
              <p className="text-gray-600 mb-2">Location</p>
              <p className="font-semibold text-gray-800">{bookingDetails.location}</p>
            </div>
            <div>
              <p className="text-gray-600 mb-2">Language</p>
              <p className="font-semibold text-gray-800">{bookingDetails.language}</p>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-gray-600 mb-2">Package Details</p>
            <p className="font-semibold text-gray-800 mb-2">{bookingDetails.package}</p>
            <ul className="list-disc list-inside text-gray-600">
              {bookingDetails.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-orange-50 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Next Steps</h2>
          <p className="text-gray-600">
            Our team will contact you shortly to confirm all details and provide additional instructions.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button className="flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors">
            <FaDownload /> Download Receipt
          </button>
          <button className="flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors">
            <FaShare /> Share Details
          </button>
          <button className="flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors">
            <FaPrint /> Print Confirmation
          </button>
        </div>

        {/* Contact Support */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Need Assistance?</h2>
          <div className="flex flex-wrap gap-6 justify-center">
            <div className="flex items-center gap-2">
              <FaPhoneAlt className="text-orange-600" />
              <span className="text-gray-600">+91-XXXXX-XXXXX</span>
            </div>
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-orange-600" />
              <span className="text-gray-600">support@okpuja.com</span>
            </div>
            <div className="flex items-center gap-2">
              <FaQuestionCircle className="text-orange-600" />
              <a href="#" className="text-orange-600 hover:underline">View FAQs</a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <p className="text-lg font-medium">Connecting Spiritual Services with Devotees</p>
          </div>
          <div className="flex justify-center gap-4">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a>
            <span className="text-gray-500">|</span>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BookingSuccess;