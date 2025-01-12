"use client"

import React, { useState } from "react";
import { FaShoppingCart, FaArrowLeft, FaCreditCard, FaPhoneAlt, FaEnvelope, FaLock } from "react-icons/fa";
import { RiSecurePaymentFill } from "react-icons/ri";
import { MdEdit, MdLocationOn, MdLanguage, MdAccessTime } from "react-icons/md";

const CheckoutPage = () => {
  const [selectedPayment, setSelectedPayment] = useState("credit");
  const [isEditMode, setIsEditMode] = useState({
    location: false,
    language: false,
    time: false,
  });

  const bookingDetails = {
    title: "Ganesh Puja Service",
    description: "Traditional Ganesh Puja performed by experienced priests",
    package: "Premium Package",
    duration: "2 hours",
    offerings: "Complete Puja Samagri included",
    price: 2999,
    tax: 299,
    total: 3298,
    location: "123 Temple Street, Mumbai",
    language: "Sanskrit & Hindi",
    time: "Sunday, 10:00 AM IST"
  };

  const handleEdit = (field: keyof typeof isEditMode) => {
    setIsEditMode((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-800">
              <FaArrowLeft className="text-xl" />
            </button>
            <img
              src="https://images.unsplash.com/photo-1598714805247-06f7fb0ae483"
              alt="Puja Service Logo"
              className="h-10 w-auto object-contain"
            />
          </div>
          <div className="relative">
            <FaShoppingCart className="text-2xl text-gray-600" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">1</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Summary */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">Booking Summary</h2>
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-gray-800">{bookingDetails.title}</h3>
                <p className="text-gray-600">{bookingDetails.description}</p>
                <div className="border-t pt-4">
                  <h4 className="font-medium">Package Details:</h4>
                  <ul className="mt-2 space-y-2 text-gray-600">
                    <li>Type: {bookingDetails.package}</li>
                    <li>Duration: {bookingDetails.duration}</li>
                    <li>Offerings: {bookingDetails.offerings}</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Selected Details */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">Selected Details</h2>
              <div className="space-y-4">
                {/* Location */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MdLocationOn className="text-2xl text-orange-500" />
                    <div>
                      <h3 className="font-medium">Location</h3>
                      {isEditMode.location ? (
                        <input
                          type="text"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                          defaultValue={bookingDetails.location}
                        />
                      ) : (
                        <p className="text-gray-600">{bookingDetails.location}</p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleEdit("location")}
                    className="text-orange-500 hover:text-orange-600"
                  >
                    <MdEdit className="text-xl" />
                  </button>
                </div>

                {/* Language */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MdLanguage className="text-2xl text-orange-500" />
                    <div>
                      <h3 className="font-medium">Language</h3>
                      {isEditMode.language ? (
                        <input
                          type="text"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                          defaultValue={bookingDetails.language}
                        />
                      ) : (
                        <p className="text-gray-600">{bookingDetails.language}</p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleEdit("language")}
                    className="text-orange-500 hover:text-orange-600"
                  >
                    <MdEdit className="text-xl" />
                  </button>
                </div>

                {/* Time */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MdAccessTime className="text-2xl text-orange-500" />
                    <div>
                      <h3 className="font-medium">Time</h3>
                      {isEditMode.time ? (
                        <input
                          type="text"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                          defaultValue={bookingDetails.time}
                        />
                      ) : (
                        <p className="text-gray-600">{bookingDetails.time}</p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleEdit("time")}
                    className="text-orange-500 hover:text-orange-600"
                  >
                    <MdEdit className="text-xl" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">Payment Details</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Price</span>
                  <span>₹{bookingDetails.price}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>₹{bookingDetails.tax}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>₹{bookingDetails.total}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-medium">Payment Method</h3>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="payment"
                        value="credit"
                        checked={selectedPayment === "credit"}
                        onChange={(e) => setSelectedPayment(e.target.value)}
                        className="text-orange-500 focus:ring-orange-500"
                      />
                      <span>Credit/Debit Card</span>
                      <FaCreditCard className="text-gray-500" />
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="payment"
                        value="upi"
                        checked={selectedPayment === "upi"}
                        onChange={(e) => setSelectedPayment(e.target.value)}
                        className="text-orange-500 focus:ring-orange-500"
                      />
                      <span>UPI</span>
                    </label>
                  </div>
                </div>

                <button className="w-full bg-orange-500 text-white py-3 rounded-md hover:bg-orange-600 transition-colors">
                  Proceed to Pay
                </button>
              </div>
            </div>

            {/* Support Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Need Help?</h2>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <a href="#" className="hover:text-orange-500">Cancellation Policy</a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500">Puja Instructions</a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500">FAQs</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-8">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <RiSecurePaymentFill className="text-2xl text-green-500" />
              <span className="text-gray-600">Secure Payment</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="flex items-center space-x-2">
                <FaPhoneAlt className="text-gray-500" />
                <span>+91 1234567890</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaEnvelope className="text-gray-500" />
                <span>support@pujaservice.com</span>
              </div>
            </div>
            <div className="flex justify-center md:justify-end space-x-4">
              <a href="#" className="text-gray-600 hover:text-orange-500">Privacy Policy</a>
              <a href="#" className="text-gray-600 hover:text-orange-500">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CheckoutPage;