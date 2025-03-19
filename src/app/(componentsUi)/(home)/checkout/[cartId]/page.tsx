"use client";

import React, { useState, useEffect } from "react";
import {
  MdLocationOn,
  MdLanguage,
  MdAccessTime,
  MdOutlineCalendarToday,
  MdInfo,
  MdCheckCircle,
  MdSupportAgent,
} from "react-icons/md";
import { RiSecurePaymentFill } from "react-icons/ri";
import { FaSpinner, FaChild } from "react-icons/fa";
import Image from "next/image";
import Section from "../../pujaservice/section";
// Make sure this component exists and is exported correctly
import Addresses from "@/app/(componentsUi)/(user)/address/Address";
import { useParams } from "next/navigation";
import { fetchCheckoutDetails, fetchBookingId } from "../action";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

// Add this to make the global window type include your custom function
declare global {
  interface Window {
    checkAndSelectSingleAddress?: (addressList: any[]) => void;
  }
}

const CheckoutPage: React.FC = () => {
  const { cartId: rawCartId } = useParams() as { cartId?: string | string[] };
  const cartId = Array.isArray(rawCartId) ? rawCartId[0] : rawCartId || "";

  interface PujaService {
    img: string;
    title: string;
  }

  interface Package {
    type: string;
    price: number;
    description: string;
    location: string;
    language: string;
  }

  interface PromoCode {
    discount: number;
    code?: string;
  }

  interface CheckoutDetails {
    id: number;
    pujaService: PujaService;
    package: Package;
    promoCode: PromoCode;
    selected_date: string;
    selected_time: string;
  }

  const [details, setDetails] = useState<CheckoutDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [addressId, setAddressId] = useState<number>(0);
  const [userId, setUserId] = useState<number>(0);
  const [userEmail, setUserEmail] = useState<string>("");
  const [addresses, setAddresses] = useState<any[]>([]);

  // Get user info from token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        setUserId(decodedToken.userId);
        setUserEmail(decodedToken.email);
      } catch (error) {
        console.error("Failed to decode token:", error);
        toast.error("Authentication error. Please log in again.");
      }
    } else {
      // Redirect to login if no token
      window.location.href = "/login";
    }
  }, []);

  // Fetch checkout details
  useEffect(() => {
    if (!cartId) {
      console.error("Invalid cartId:", cartId);
      toast.error("Invalid booking reference");
      return;
    }

    setPageLoading(true);
    fetchCheckoutDetails(cartId)
      .then((data) => {
        setDetails(data);
        setPageLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching checkout details:", error);
        toast.error("Failed to load booking details");
        setPageLoading(false);
      });
  }, [cartId]);

  // Auto-select address when there's only one
  useEffect(() => {
    const checkAndSelectSingleAddress = (addressList: any[]) => {
      setAddresses(addressList);
      if (addressList.length === 1) {
        setAddressId(addressList[0].id);
      }
    };

    if (typeof window !== "undefined") {
      window.checkAndSelectSingleAddress = checkAndSelectSingleAddress;
    }

    return () => {
      if (typeof window !== "undefined" && window.checkAndSelectSingleAddress) {
        delete window.checkAndSelectSingleAddress;
      }
    };
  }, []);

  // Loading state
  if (pageLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <FaSpinner className="animate-spin text-orange-500 text-4xl mb-4" />
        <h2 className="text-xl font-medium text-gray-700">
          Loading your booking details...
        </h2>
      </div>
    );
  }

  if (!details) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
        <MdInfo className="text-5xl text-orange-500 mb-4" />
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Booking Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          We couldn't find the booking details you're looking for.
        </p>
        <button
          onClick={() => (window.location.href = "/dashboard")}
          className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition-colors"
        >
          Go to Dashboard
        </button>
      </div>
    );
  }

  // Calculate final amount with discount applied
  const amount =
    details.package.price -
    (details.package.price * (details.promoCode?.discount || 0)) / 100;

  const handlePayment = async () => {
    if (!amount || !userId || !details.id || !addressId) {
      toast.error("Please select a delivery address to continue");
      return;
    }

    setIsLoading(true);
    try {
      // Generate transaction ID
      const transactionId = `PU${Math.floor(Math.random() * 1e6)
        .toString()
        .padStart(6, "0")}${Date.now()}`;

      // Send payment request
      const response = await axios.post("/api/onlinepayment", {
        amount,
        transactionId,
        userId,
        userEmail,
        bookId: cartId,
        checkoutId: details.id,
        addressId,
        date: details.selected_date,
        time: details.selected_time,
      });

      const { paymentUrl } = response.data;

      if (paymentUrl) {
        // Show loading toast
        toast.loading("Redirecting to payment gateway...");
        setTimeout(() => {
          window.location.href = paymentUrl;
        }, 1000);
      } else {
        toast.error("Failed to initiate payment");
      }
    } catch (error: any) {
      console.error("Payment error:", error);
      if (error.response) {
        toast.error(
          error.response.data?.message || "Payment initiation failed"
        );
      } else if (error.request) {
        toast.error(
          "No response from server. Please check your internet connection"
        );
      } else {
        toast.error("An error occurred. Please try again");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDefaultAddressChange = (
    addressId: number,
    addressesList: any[] = []
  ) => {
    setAddressId(addressId);
    if (addressesList.length > 0) {
      setAddresses(addressesList);
    }
  };

  // Format date properly
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Section
        bgImageUrl="/image/cart1.jpeg"
        title="Complete Your Booking"
        description="Review details and make payment to confirm your puja service"
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 md:py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Booking Summary */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 md:p-6"
            >
              <h2 className="text-xl md:text-2xl font-semibold mb-5 text-gray-800 flex items-center">
                <MdCheckCircle className="mr-2 text-green-500" />
                Booking Summary
              </h2>

              <div className="space-y-6">
                {/* Puja Service Card */}
                <div className="bg-gray-50 rounded-lg p-4 md:p-6 flex flex-col sm:flex-row items-start sm:items-center">
                  <div className="relative w-full sm:w-24 h-24 mb-4 sm:mb-0 overflow-hidden rounded-md">
                    <Image
                      src={details.pujaService?.img || "/image/griha.png"}
                      alt={details.pujaService?.title || "Puja Service"}
                      className="object-cover"
                      fill
                      sizes="(max-width: 640px) 100vw, 96px"
                    />
                  </div>

                  <div className="sm:ml-6 flex-grow">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                      {details.pujaService?.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {details.package?.type} Package
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-gray-700">
                      <span className="inline-flex items-center bg-orange-100 text-orange-800 px-2.5 py-0.5 rounded-full text-xs font-medium">
                        Pandit(s): 1
                      </span>
                      <span className="inline-flex items-center bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full text-xs font-medium">
                        Duration: 2hrs
                      </span>
                      <span className="inline-flex items-center bg-green-100 text-green-800 px-2.5 py-0.5 rounded-full text-xs font-medium">
                        ₹{details.package?.price}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Package Details */}
                <div className="border-t border-gray-100 pt-5">
                  <h4 className="font-medium text-gray-900 mb-3">
                    Package Details:
                  </h4>
                  <div
                    className="text-gray-600 text-sm md:text-base prose max-w-none"
                    dangerouslySetInnerHTML={{
                      __html:
                        details.package?.description || "No details available",
                    }}
                  ></div>
                </div>
              </div>
            </motion.div>

            {/* Selected Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 md:p-6"
            >
              <h2 className="text-xl md:text-2xl font-semibold mb-5 text-gray-800">
                Booking Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Location */}
                <div className="flex items-start space-x-3">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <MdLocationOn className="text-xl text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-500 font-medium">
                      Location
                    </h3>
                    <p className="font-medium text-gray-800">
                      {details.package?.location || "Not specified"}
                    </p>
                  </div>
                </div>

                {/* Language */}
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <MdLanguage className="text-xl text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-500 font-medium">
                      Language
                    </h3>
                    <p className="font-medium text-gray-800">
                      {details.package?.language || "Not specified"}
                    </p>
                  </div>
                </div>

                {/* Date */}
                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <MdOutlineCalendarToday className="text-xl text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-500 font-medium">Date</h3>
                    <p className="font-medium text-gray-800">
                      {formatDate(details?.selected_date)}
                    </p>
                  </div>
                </div>

                {/* Time */}
                <div className="flex items-start space-x-3">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <MdAccessTime className="text-xl text-purple-500" />
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-500 font-medium">Time</h3>
                    <p className="font-medium text-gray-800">
                      {details?.selected_time || "Not specified"}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Address Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 md:p-6"
            >
              {/* Make sure Addresses component is properly imported */}
              <Addresses
                onSelectDefaultAddress={handleDefaultAddressChange}
                autoSelectSingle={true}
              />
            </motion.div>
          </div>

          {/* Payment Section */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 md:p-6 sticky top-4"
            >
              <h2 className="text-xl font-semibold mb-5 text-gray-800 flex items-center">
                <RiSecurePaymentFill className="mr-2 text-green-500" />
                Payment Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between text-gray-700">
                  <span>Package Price</span>
                  <span>₹{details.package?.price?.toLocaleString() || 0}</span>
                </div>

                {details.promoCode?.discount ? (
                  <div className="flex justify-between text-green-600">
                    <span className="flex items-center">
                      <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2 py-0.5 rounded">
                        {details.promoCode?.code || "PROMO"}
                      </span>
                      Discount ({details.promoCode?.discount}%)
                    </span>
                    <span>
                      -₹
                      {(
                        ((details.package?.price || 0) *
                          (details.promoCode?.discount || 0)) /
                        100
                      ).toLocaleString()}
                    </span>
                  </div>
                ) : null}

                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between font-semibold text-gray-900 text-lg">
                    <span>Total Amount</span>
                    <span>₹{amount.toLocaleString()}</span>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="mt-6 pt-5 border-t border-gray-200">
                  <h3 className="font-medium text-gray-800 mb-3">
                    Payment Method
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 flex items-center justify-center">
                    <Image
                      src="/image/phonepe.svg"
                      alt="PhonePe"
                      width={120}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                  <div className="flex items-center mt-3 text-sm text-gray-600">
                    <FaChild className="mr-2 text-green-500" />
                    <p>Secure payment processing</p>
                  </div>
                </div>

                {/* Pay Now Button */}
                <button
                  className={`w-full mt-4 py-3.5 px-4 rounded-lg flex items-center justify-center font-medium text-white transition-all duration-200
                    ${
                      addressId
                        ? "bg-orange-500 hover:bg-orange-600"
                        : "bg-gray-400 cursor-not-allowed"
                    }
                    ${isLoading ? "opacity-70 pointer-events-none" : ""}`}
                  onClick={handlePayment}
                  disabled={!addressId || isLoading}
                >
                  {isLoading ? (
                    <>
                      <FaSpinner className="animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>Pay ₹{amount.toLocaleString()}</>
                  )}
                </button>

                {!addressId && (
                  <p className="text-red-500 text-xs text-center mt-2">
                    Please select a delivery address to continue
                  </p>
                )}
              </div>
            </motion.div>

            {/* Support Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 md:p-6"
            >
              <h2 className="text-lg font-semibold mb-3 text-gray-800 flex items-center">
                <MdSupportAgent className="mr-2 text-orange-500" />
                Need Help?
              </h2>
              <div className="space-y-2">
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                >
                  <span className="bg-blue-100 rounded-full p-1 mr-2">
                    <svg
                      className="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </span>
                  Cancellation Policy
                </a>
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                >
                  <span className="bg-blue-100 rounded-full p-1 mr-2">
                    <svg
                      className="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </span>
                  Puja Instructions
                </a>
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                >
                  <span className="bg-blue-100 rounded-full p-1 mr-2">
                    <svg
                      className="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </span>
                  FAQs
                </a>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  For any assistance, contact our support team at{" "}
                  <a
                    href="mailto:support@okpuja.in"
                    className="text-orange-600 font-medium"
                  >
                    support@okpuja.in
                  </a>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-8 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <RiSecurePaymentFill className="text-2xl text-green-500 mr-2" />
                <span className="text-gray-700 font-medium">
                  Secure Payment
                </span>
              </div>
              <span className="hidden md:inline text-gray-300">|</span>
              <div className="flex items-center">
                <MdCheckCircle className="text-2xl text-green-500 mr-2" />
                <span className="text-gray-700 font-medium">
                  Verified Pandits
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} OKPUJA. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CheckoutPage;
