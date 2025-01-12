"use client";
import React, { useState } from "react";
import { FaExclamationCircle, FaShoppingCart, FaPhone, FaEnvelope } from "react-icons/fa";

const FailedBookingPage = () => {
  const [cartItems] = useState(3);

  const bookingDetails = {
    pujaName: "Ganesh Puja",
    dateTime: "2024-02-15 10:30 AM",
    language: "Sanskrit",
    location: "Home",
    failureReason: "Payment authorization failed"
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img
              src="https://images.unsplash.com/photo-1598714805247-5dd440d87124"
              alt="OkPuja Logo"
              className="h-10 w-10 object-contain"
            />
            <span className="text-2xl font-bold text-orange-600">OkPuja</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <button className="text-gray-600 hover:text-orange-600">Home</button>
            <button className="text-gray-600 hover:text-orange-600">Services</button>
            <button className="text-gray-600 hover:text-orange-600">Help</button>
            <div className="relative">
              <FaShoppingCart className="text-gray-600 text-2xl" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartItems}
              </span>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-12 px-4">
        {/* Error Message */}
        <div className="text-center mb-12">
          <FaExclamationCircle className="text-red-500 text-6xl mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Oops! Your Booking Could Not Be Completed
          </h1>
          <p className="text-gray-600 text-lg">
            We encountered an issue while processing your booking. Please try again or contact support for assistance.
          </p>
        </div>

        {/* Booking Details */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Puja Name</p>
              <p className="font-medium">{bookingDetails.pujaName}</p>
            </div>
            <div>
              <p className="text-gray-600">Date & Time</p>
              <p className="font-medium">{bookingDetails.dateTime}</p>
            </div>
            <div>
              <p className="text-gray-600">Language</p>
              <p className="font-medium">{bookingDetails.language}</p>
            </div>
            <div>
              <p className="text-gray-600">Location</p>
              <p className="font-medium">{bookingDetails.location}</p>
            </div>
          </div>

          {/* Failure Reason */}
          <div className="mt-6 p-4 bg-red-50 rounded-md">
            <p className="text-red-600 font-medium">
              Reason: {bookingDetails.failureReason}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
          <button className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors">
            Retry Payment
          </button>
          <button className="bg-white text-orange-600 border-2 border-orange-600 px-6 py-3 rounded-lg hover:bg-orange-50 transition-colors">
            Modify Booking
          </button>
          <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors">
            Contact Support
          </button>
        </div>

        {/* Support Section */}
        <div className="text-center bg-gray-50 p-6 rounded-lg">
          <p className="text-gray-700 mb-4">
            If the issue persists, please contact us:
          </p>
          <div className="flex justify-center gap-6">
            <div className="flex items-center">
              <FaPhone className="text-orange-600 mr-2" />
              <span>+91-XXXXX-XXXXX</span>
            </div>
            <div className="flex items-center">
              <FaEnvelope className="text-orange-600 mr-2" />
              <span>support@okpuja.com</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-4 mt-12">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-lg font-medium mb-6">
            Connecting Spiritual Services with Devotees
          </p>
          <div className="flex justify-center space-x-6">
            <button className="hover:text-orange-400">Privacy Policy</button>
            <button className="hover:text-orange-400">Terms of Service</button>
            <button className="hover:text-orange-400">About Us</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FailedBookingPage;