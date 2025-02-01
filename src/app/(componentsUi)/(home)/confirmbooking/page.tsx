"use client";
import React, { useState, useEffect } from "react";
import {
  FaCheckCircle,
  FaDownload,
  FaShare,
  FaPrint,
  FaPhoneAlt,
  FaEnvelope,
  FaQuestionCircle,
} from "react-icons/fa";
import { fetchBookingDetails } from "./action";
import { jsPDF } from "jspdf";

const BookingSuccess = () => {
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  // getting user id and cart id from the url
  const urlParams = new URLSearchParams(window.location.search);
  const userId = Number(urlParams?.get("userId"));
  const cartId = urlParams?.get("cartId");

  // fetch booking details
  useEffect(() => {
    if (!userId || !cartId) {
      return;
    }
    const fetchDetails = async () => {
      const data = await fetchBookingDetails(userId, cartId);
      setBookingDetails(data);
    };
    fetchDetails();
  }, []);

  // Function to handle Download Receipt (PDF)
  const handleDownloadReceipt = () => {
    const doc = new jsPDF();

    doc.setFont("helvetica", "normal");
    doc.text("Puja Booking Receipt", 20, 20);

    // Add booking details to the PDF
    doc.text(
      `Booking ID: OK${bookingDetails?.id}-${bookingDetails?.BookId}`,
      20,
      30
    );
    doc.text(
      `Transaction ID: ${bookingDetails?.payments[0]?.transactionId}`,
      20,
      40
    );
    doc.text(
      `Amount Paid: ₹${bookingDetails?.payments[0]?.amount / 100}`,
      20,
      50
    );
    doc.text(`Payment Method: ${bookingDetails?.payments[0]?.method}`, 20, 60);
    doc.text(
      `Payment Date: ${new Date(
        bookingDetails?.payments[0]?.createdAt
      ).toLocaleString()}`,
      20,
      70
    );
    doc.text(`Payment Status: ${bookingDetails?.payments[0]?.status}`, 20, 80);

    doc.text(`Puja Name: ${bookingDetails?.cart?.pujaService?.title}`, 20, 90);
    doc.text(
      `Date & Time: ${new Date(
        bookingDetails?.cart?.selected_date
      ).toLocaleDateString()} | ${bookingDetails?.cart?.selected_time}`,
      20,
      100
    );
    doc.text(`Location: ${bookingDetails?.cart?.package?.location}`, 20, 110);
    doc.text(`Language: ${bookingDetails?.cart?.package?.language}`, 20, 120);

    doc.text("Package Details:", 20, 130);
    doc.text(`- ${bookingDetails?.cart?.package?.description}`, 20, 140);
    doc.text("- 1 Pandit", 20, 150);

    doc.text(`User Name: ${bookingDetails?.user?.username}`, 20, 160);
    doc.text(`Email: ${bookingDetails?.user?.email}`, 20, 170);
    doc.text(`Mobile: ${bookingDetails?.user?.contact}`, 20, 180);

    doc.text(
      `Address: ${bookingDetails?.addresses?.addressline}, ${bookingDetails?.addresses?.city}, ${bookingDetails?.addresses?.state}, ${bookingDetails?.addresses?.country}, ${bookingDetails?.addresses?.postalCode}`,
      20,
      190
    );
    doc.text(`Landmark: ${bookingDetails?.addresses?.landmark}`, 20, 200);

    // Save the PDF
    doc.save("receipt.pdf");
  };

  // Function to handle Share Details
  const handleShareDetails = () => {
    const shareData = {
      title: "Puja Booking Details",
      text: `Puja Booking ID: OK${bookingDetails?.id}-${
        bookingDetails?.BookId
      }\nTransaction ID: ${
        bookingDetails?.payments[0]?.transactionId
      }\nAmount Paid: ₹${
        bookingDetails?.payments[0]?.amount / 100
      }\nPayment Status: ${bookingDetails?.payments[0]?.status}`,
      url: window.location.href,
    };

    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => console.log("Successfully shared"))
        .catch((error) => console.log("Error sharing", error));
    } else {
      alert("Sharing is not supported in your browser");
    }
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
            Your booking ID is {""}
            <span className="font-semibold text-orange-600">
              OK{bookingDetails?.id}-{bookingDetails?.BookId}
            </span>
          </p>
        </div>
        {/* Transaction Detail Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Transaction Details
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-600 mb-2">
                Booking ID: <span>{bookingDetails?.id}</span>
              </p>
            </div>
            <div>
              <p className="text-gray-600 mb-2">
                Transaction ID:{" "}
                <span>{bookingDetails?.payments[0]?.transactionId}</span>
              </p>
            </div>
            <div>
              <p className="text-gray-600 mb-2">
                Amount Paid:{" "}
                <span>₹ {bookingDetails?.payments[0]?.amount / 100}</span>
              </p>
            </div>
            <div>
              <p className="text-gray-600 mb-2">
                Payment Method:{" "}
                <span>{bookingDetails?.payments[0]?.method}</span>
              </p>
            </div>
            <div>
              <p className="text-gray-600 mb-2">
                Payment Date:{" "}
                <span>
                  {new Date(
                    bookingDetails?.payments[0]?.createdAt
                  ).toLocaleString()}
                </span>
              </p>
            </div>
            <div>
              <p className="text-gray-600 mb-2">
                Payment Status:{" "}
                <span>{bookingDetails?.payments[0]?.status}</span>
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
                {bookingDetails?.cart?.pujaService?.title}
              </p>
            </div>
            <div>
              <p className="text-gray-600 mb-2">Date & Time</p>
              <p className="font-semibold text-gray-800">
                {new Date(
                  bookingDetails?.cart?.selected_date
                ).toLocaleDateString()}{" "}
                | {bookingDetails?.cart?.selected_time}
              </p>
            </div>
            <div>
              <p className="text-gray-600 mb-2">Location</p>
              <p className="font-semibold text-gray-800">
                {bookingDetails?.cart?.package?.location}
              </p>
            </div>
            <div>
              <p className="text-gray-600 mb-2">Language</p>
              <p className="font-semibold text-gray-800">
                {bookingDetails?.cart?.package?.language}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-gray-600 mb-2">Package Details</p>
            <p
              className="font-semibold text-gray-800 mb-2"
              dangerouslySetInnerHTML={{
                __html: bookingDetails?.cart?.package?.description,
              }}
            ></p>
            <ul className="list-disc list-inside text-gray-600">
              <li>1 Pandit</li>
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
              <p className="text-gray-600 mb-2">UserName</p>
              <p className="font-semibold text-gray-800">
                {bookingDetails?.user?.username}
              </p>
            </div>
            <div>
              <p className="text-gray-600 mb-2">Mobile Number</p>
              <p className="font-semibold text-gray-800">
                {bookingDetails?.user?.contact}
              </p>
            </div>
            <div>
              <p className="text-gray-600 mb-2">Your Email</p>
              <p className="font-semibold text-gray-800">
                {bookingDetails?.user?.email}
              </p>
            </div>

            <div>
              <p className="text-gray-600 mb-2">Address</p>
              <p className="font-semibold text-gray-800">
                {bookingDetails?.addresses?.addressline},{" "}
                {bookingDetails?.addresses?.addressline2},{" "}
                {bookingDetails?.addresses?.city},{" "}
                {bookingDetails?.addresses?.state},{" "}
                {bookingDetails?.addresses?.country}
              </p>
            </div>
            <div>
              <p className="text-gray-600 mb-2">Pincode</p>
              <p className="font-semibold text-gray-800">
                {bookingDetails?.addresses?.postalCode}
              </p>
            </div>
          </div>
          <div className="mt-6">
            <p className="text-gray-600 mb-2">Landmark</p>
            <p className="font-semibold text-gray-800">
              {bookingDetails?.addresses?.landmark}
            </p>
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
          <button
            className="flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
            onClick={handleDownloadReceipt}
          >
            <FaDownload /> Download Receipt
          </button>
          <button
            className="flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
            onClick={handleShareDetails}
          >
            <FaShare /> Share Details
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
