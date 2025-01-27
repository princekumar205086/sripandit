"use client";
import React from "react";
import {
  FaCheckCircle,
  FaDownload,
  FaShare,
  FaPrint,
  FaPhoneAlt,
  FaEnvelope,
  FaQuestionCircle,
} from "react-icons/fa";

const BookingSuccess = () => {
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
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100">
      {/* Header */}
      <header className="bg-transparent shadow-md py-4 h-20"></header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Success Message */}
        <div className="text-center mb-12">
          <FaCheckCircle className="text-green-600 text-6xl mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Your Puja Booking is Confirmed!
          </h1>
          <p className="text-gray-600 text-lg">
            Thank you for choosing our services. We're honored to serve you on
            this special occasion.
          </p>
          <p className="text-gray-600 text-lg mt-2">
            {" "}
            Your booking ID is{" "}
            <span className="font-semibold text-orange-600">PUJA123456</span>
          </p>
        </div>
        {/* Transaction deatil card  */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Transaction Details
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-600 mb-2">
                Booking ID: {""} <span>PUJA123456</span>
              </p>
            </div>
            <div>
              <p className="text-gray-600 mb-2">
                Transaction ID: {""} <span>PUJA123456</span>
              </p>
            </div>
            <div>
              <p className="text-gray-600 mb-2">
                Amount Paid: {""} <span>₹ 5,999</span>
              </p>
            </div>
            <div>
              <p className="text-gray-600 mb-2">
                Payment Method: {""} <span>PhonePe</span>
              </p>
            </div>
            <div>
              <p className="text-gray-600 mb-2">
                Payment Date: {""} <span>December 15, 2023 | 12:00 AM</span>
              </p>
            </div>
            <div>
              <p className="text-gray-600 mb-2">
                Payment Status: {""} <span>Success</span>
              </p>
            </div>
          </div>
        </div>

        {/* Booking Details Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
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
        </div>

        {/* Address Detail */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Address Details
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-600 mb-2">Full Name</p>
              <p className="font-semibold text-gray-800">John Doe</p>
            </div>
            <div>
              <p className="text-gray-600 mb-2">Mobile Number</p>
              <p className="font-semibold text-gray-800">+91-9876543210</p>
            </div>
            <div>
              <p className="text-gray-600 mb-2">Address</p>
              <p className="font-semibold text-gray-800">
                123 Temple Street, Mumbai, Maharashtra
              </p>
            </div>
            <div>
              <p className="text-gray-600 mb-2">Pincode</p>
              <p className="font-semibold text-gray-800">400001</p>
            </div>
          </div>
          <div className="mt-6">
            <p className="text-gray-600 mb-2">Landmark</p>
            <p className="font-semibold text-gray-800">Near Temple Road</p>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-orange-50 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Next Steps
          </h2>
          <p className="text-gray-600">
            Our team will contact you shortly to confirm all details and provide
            additional instructions.
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
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Need Assistance?
          </h2>
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
              <a href="#" className="text-orange-600 hover:underline">
                View FAQs
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookingSuccess;
