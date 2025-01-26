"use client";

import React, { useState, useEffect, use } from "react";
import { RiSecurePaymentFill } from "react-icons/ri";
import {
  MdLocationOn,
  MdLanguage,
  MdAccessTime,
  MdOutlineCalendarToday,
} from "react-icons/md";
import Image from "next/image";
import Section from "../../pujaservice/section";
import Addresses from "@/app/(componentsUi)/(user)/address/Address";
import { useParams } from "next/navigation";
import { fetchCheckoutDetails } from "../action";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const CheckoutPage = () => {
  const { cartId } = useParams();
  // userId
  const token = localStorage.getItem("token");
  let userId: string | null = null;
  if (token) {
    const decodedToken: any = jwtDecode(token);
    userId = decodedToken.userId;
  }
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
  }

  interface CheckoutDetails {
    pujaService: PujaService;
    package: Package;
    promoCode: PromoCode;
    selected_date: string;
    selected_time: string;
  }

  const [details, setDetails] = useState<CheckoutDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [addresId, setAddressId] = useState<number | null>(null);
  useEffect(() => {
    if (!cartId || typeof cartId !== "string") {
      console.error("Invalid cartId:", cartId);
      return;
    }

    fetchCheckoutDetails(cartId)
      .then((data) => {
        setDetails(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [cartId]);

  if (!details) {
    return <div>Loading...</div>;
  }
  const amount =
    (details.package?.price ?? 0) -
    ((details.package?.price ?? 0) * (details.promoCode?.discount ?? 0)) / 100;
  //payment handling
  const handlePayment = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/onlinepayment", {
        amount: amount,
        transactionId: `TRANS_${Date.now()}`,
        userId: userId,
        cartId: cartId,
      });

      const { paymentUrl } = response.data;
      if (paymentUrl) {
        window.location.href = paymentUrl;
      } else {
        alert("Failed to initiate payment");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("An error occurred while initiating payment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDefaultAddressChange = (addressId: number) => {
    console.log("Selected default address ID:", addressId);
    setAddressId(addressId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Section
        bgImageUrl="/image/cart1.jpeg"
        title="Checkout"
        description="Review your booking details and proceed to payment"
      />
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Summary */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">Booking Summary</h2>
              <div className="space-y-4">
                <div
                  key="static-id"
                  className="bg-white rounded-lg p-6 mb-4 flex items-center"
                >
                  <Image
                    src={details.pujaService?.img || "/image/griha.png"}
                    alt={details.pujaService?.title}
                    className="w-24 h-24 object-cover rounded-md"
                    width={96}
                    height={96}
                  />
                  <div className="ml-6 flex-grow">
                    <h3 className="text-lg font-semibold text-black text-left">
                      {details.pujaService?.title}
                    </h3>
                    <p className="text-md">
                      Package Type: {details.package?.type}
                    </p>
                    <p className="text-md">Price: ₹ {details.package?.price}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">
                        Pandit(S): 1 | Duration: 2hrs
                      </span>
                    </div>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <h4 className="font-medium">Package Details:</h4>
                  <p
                    className="text-gray-600"
                    dangerouslySetInnerHTML={{
                      __html: details.package?.description,
                    }}
                  ></p>
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
                      <h3 className="font-medium">
                        Location:{" "}
                        <span className="text-gray-600 font-semibold">
                          {details.package?.location}
                        </span>
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Language */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MdLanguage className="text-2xl text-orange-500" />
                    <div>
                      <h3 className="font-medium">
                        Language:{" "}
                        <span className="text-gray-600 font-semibold">
                          {details.package?.language}
                        </span>
                      </h3>
                    </div>
                  </div>
                </div>
                {/* Date */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MdOutlineCalendarToday className="text-2xl text-orange-500" />
                    <div>
                      <h3 className="font-medium">
                        Date:{" "}
                        <span className="text-gray-600 font-semibold">
                          {new Date(
                            details?.selected_date
                          ).toLocaleDateString()}
                        </span>
                      </h3>
                    </div>
                  </div>
                </div>
                {/* Time */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MdAccessTime className="text-2xl text-orange-500" />
                    <div>
                      <h3 className="font-medium">
                        Time:{" "}
                        <span className="text-gray-600 font-semibold">
                          {details?.selected_time}
                        </span>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Address Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <Addresses onSelectDefaultAddress={handleDefaultAddressChange} />
            </div>
          </div>
          {/* Payment Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">Payment Details</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Price</span>
                  <span>₹{details.package?.price}</span>
                </div>
                <div className="flex justify-between">
                  {details.promoCode ? (
                    <>
                      <span>Promo Code Discount</span>
                      <span>
                        -{" "}
                        {((details.package?.price ?? 0) *
                          (details.promoCode?.discount ?? 0)) /
                          100}
                      </span>
                    </>
                  ) : (
                    <span></span>
                  )}
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>
                      ₹
                      {(details.package?.price ?? 0) -
                        ((details.package?.price ?? 0) *
                          (details.promoCode?.discount ?? 0)) /
                          100}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-medium">Payment</h3>
                  <div className="space-y-2">
                    {/* <div className="space-y-2">
                      <label className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="payment"
                          value="phonepe"
                          checked={selectedPayment === "phonepe"}
                          onChange={(e) => setSelectedPayment(e.target.value)}
                          className="text-orange-500 focus:ring-orange-500"
                        />
                        <span>PhonePe</span>
                        <Image
                          src="/image/phonepe-logo.png" // Add a PhonePe logo to your public folder
                          alt="PhonePe"
                          width={24}
                          height={24}
                        />
                      </label>
                    </div> */}

                    {/* payment powered by phonepe */}
                    <h3 className="font-medium">Payment powered by:</h3>
                    <Image
                      src="/image/phonepe-logo.png"
                      alt="PhonePe"
                      width={100}
                      height={100}
                    />
                    <p className="text-gray-600">
                      Pay securely using Phonepe with okpuja
                    </p>
                  </div>
                </div>

                <button
                  className="w-full bg-orange-500 text-white py-3 rounded-md hover:bg-orange-600 transition-colors"
                  onClick={handlePayment}
                >
                  {isLoading ? "Processing..." : "Pay ₹" + amount + " Now"}
                </button>
              </div>
            </div>

            {/* Support Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Need Help?</h2>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <a href="#" className="hover:text-orange-500">
                    Cancellation Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500">
                    Puja Instructions
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500">
                    FAQs
                  </a>
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
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CheckoutPage;
