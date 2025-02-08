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
  const urlParams = new URLSearchParams(window.location.search);
  const userId = Number(urlParams?.get("userId"));
  const cartId = urlParams?.get("cartId");

  useEffect(() => {
    if (!userId || !cartId) return;

    const fetchDetails = async () => {
      try {
        const data = await fetchBookingDetails(userId, cartId);
        if (data) {
          setBookingDetails(data);
        }
      } catch (error) {
        console.error("Error fetching booking details:", error);
      }
    };

    fetchDetails();

    // Remove userId and cartId from the URL (without reloading the page)
    window.history.replaceState({}, document.title, window.location.pathname);

    // Remove the cart item from localStorage
    window.localStorage.removeItem("cart");
  }, [userId, cartId]);

  const handleDownloadReceipt = () => {
    const doc = new jsPDF();

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("OKPUJA Service Booking Invoice", 20, 20);

    // Booking Details Section
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(
      `Booking ID: OK${bookingDetails?.id}-${bookingDetails?.BookId}`,
      20,
      40
    );
    doc.text(
      `Transaction ID: ${bookingDetails?.payments[0]?.transactionId}`,
      20,
      50
    );
    doc.text(`Payment Status: ${bookingDetails?.payments[0]?.status}`, 20, 60);

    // Payment Information Section
    doc.setFont("helvetica", "bold");
    doc.text("Payment Information", 20, 75);
    doc.setFont("helvetica", "normal");
    doc.text(
      `Amount Paid: RS. ${(bookingDetails?.payments[0]?.amount / 100).toFixed(
        2
      )}`,
      20,
      85
    );
    doc.text(
      `Payment Method: ${bookingDetails?.payments[0]?.method} || NET BANKING`,
      20,
      95
    );
    doc.text(
      `Payment Date: ${new Date(
        bookingDetails?.payments[0]?.createdAt
      ).toLocaleString()}`,
      20,
      105
    );

    // Service Details Section
    doc.setFont("helvetica", "bold");
    doc.text("Service Details", 20, 120);
    doc.setFont("helvetica", "normal");
    doc.text(`Puja Name: ${bookingDetails?.cart?.pujaService?.title}`, 20, 130);
    doc.text(
      `Date & Time: ${new Date(
        bookingDetails?.cart?.selected_date
      ).toLocaleDateString()} | ${bookingDetails?.cart?.selected_time}`,
      20,
      140
    );
    doc.text(`Location: ${bookingDetails?.cart?.package?.location}`, 20, 150);
    doc.text(`Language: ${bookingDetails?.cart?.package?.language}`, 20, 160);
    doc.text("Package Details:", 20, 170);
    const html = bookingDetails?.cart?.package?.description;
    const div = document.createElement("div");
    div.innerHTML = html;
    doc.text(div.textContent || "", 20, 180);
    doc.text(`No. of Pandit: ${noOfPandits || "N/A"}`, 20, 190);
    doc.text(`Puja Duration: ${pujaDuration || "N/A"}`, 20, 200);

    // User Information Section
    doc.setFont("helvetica", "bold");
    doc.text("User Information", 110, 75);
    doc.setFont("helvetica", "normal");
    doc.text(`User Name: ${bookingDetails?.user?.username}`, 110, 85);
    doc.text(`Email: ${bookingDetails?.user?.email}`, 110, 95);
    doc.text(`Mobile: ${bookingDetails?.user?.contact}`, 110, 105);

    // Address Information Section
    doc.setFont("helvetica", "bold");
    doc.text("Address Information", 110, 120);
    doc.setFont("helvetica", "normal");
    doc.text(
      `Address: ${bookingDetails?.addresses?.addressline}, ${bookingDetails?.addresses?.city}, ${bookingDetails?.addresses?.state}, ${bookingDetails?.addresses?.country}, ${bookingDetails?.addresses?.postalCode}`,
      110,
      130
    );
    doc.text(
      `Landmark: ${bookingDetails?.addresses?.addressline2 || "N/A"}`,
      110,
      140
    ); // Handling undefined value

    // Footer Section
    doc.setFont("helvetica", "italic");
    doc.text("Thank you for choosing OKPUJA!", 20, 220);
    doc.text("For any inquiries, please contact our support team.", 20, 230);

    // Save the file
    doc.save("OKPUJA_Service_Booking_Invoice.pdf");
  };

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

  // switch case for noOfPandits and pujaDuration

  let noOfPandits: number;
  let pujaDuration: string;
  switch (bookingDetails?.cart?.package?.type) {
    case "Basic":
      noOfPandits = 1;
      pujaDuration = "1.5 hrs";
      break;
    case "Standard":
      noOfPandits = 2;
      pujaDuration = "2 hrs - 2.5 hrs";
      break;
    case "Premium":
      noOfPandits = 3 - 5;
      pujaDuration = "2.5 hrs - 3.5 hrs";
      break;
    default:
      noOfPandits = 1;
      pujaDuration = "1.5 hrs";
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100">
      <header className="bg-transparent shadow-md py-4 h-20"></header>
      <main className="container mx-auto px-4 py-8">
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
            Your booking ID is{" "}
            <span className="font-semibold text-orange-600">
              OK{bookingDetails?.id}-{bookingDetails?.BookId}
            </span>
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Transaction Details
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                label: "Booking ID",
                value: `OK${bookingDetails?.id}-${bookingDetails?.BookId}`,
              },
              {
                label: "Transaction ID",
                value: bookingDetails?.payments[0]?.transactionId,
              },
              {
                label: "Amount Paid",
                value: `₹ ${bookingDetails?.payments[0]?.amount / 100}`,
              },
              {
                label: "Payment Method",
                value: bookingDetails?.payments[0]?.method || "NET BANKING",
              },
              {
                label: "Payment Date",
                value: new Date(
                  bookingDetails?.payments[0]?.createdAt
                ).toLocaleString(),
              },
              {
                label: "Payment Status",
                value: bookingDetails?.payments[0]?.status,
              },
            ].map((item, index) => (
              <div key={index}>
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">{item.label}:</span>{" "}
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Booking Details
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                label: "Puja Name",
                value: bookingDetails?.cart?.pujaService?.title,
              },
              {
                label: "Date & Time",
                value: `${new Date(
                  bookingDetails?.cart?.selected_date
                ).toLocaleDateString()} | ${
                  bookingDetails?.cart?.selected_time
                }`,
              },
              {
                label: "Location",
                value: bookingDetails?.cart?.package?.location,
              },
              {
                label: "Language",
                value: bookingDetails?.cart?.package?.language,
              },
            ].map((item, index) => (
              <div key={index}>
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">{item.label}:</span>{" "}
                  {item.value}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <p className="text-gray-600 mb-2 font-semibold">Package Details</p>
            <p
              className="text-gray-800 mb-2"
              dangerouslySetInnerHTML={{
                __html: bookingDetails?.cart?.package?.description,
              }}
            ></p>
            <ul className="list-disc list-inside text-gray-600">
              <li>
                <span className="font-semibold">No. of Pandit:</span>{" "}
                {noOfPandits}
              </li>
              <li>
                <span className="font-semibold">Puja Duration:</span>{" "}
                {pujaDuration}
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Address Details
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { label: "UserName", value: bookingDetails?.user?.username },
              { label: "Mobile Number", value: bookingDetails?.user?.contact },
              { label: "Your Email", value: bookingDetails?.user?.email },
              {
                label: "Address",
                value: `${bookingDetails?.addresses?.addressline}, ${bookingDetails?.addresses?.city}, ${bookingDetails?.addresses?.state}, ${bookingDetails?.addresses?.country}`,
              },
              {
                label: "Landmark",
                value: bookingDetails?.addresses?.addressline2 || "N/A",
              },
              {
                label: "Pincode",
                value: bookingDetails?.addresses?.postalCode,
              },
            ].map((item, index) => (
              <div key={index}>
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">{item.label}:</span>{" "}
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-orange-50 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Next Steps
          </h2>
          <p className="text-gray-600">
            Our team will contact you shortly to confirm all details and provide
            additional instructions.
          </p>
        </div>

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
