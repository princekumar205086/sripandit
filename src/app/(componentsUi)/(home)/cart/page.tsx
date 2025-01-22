"use client";

import { useCart } from "@/app/context/CartContext";
import React from "react";
import Section from "../pujaservice/section";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import { insertCart } from "./action";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const[promoCodeId, setPromoCodeId] = React.useState<number | null>(null);
  const [promoCode, setPromoCode] = React.useState("");
  const [appliedPromoCode, setAppliedPromoCode] = React.useState<string | null>(
    null
  );
  const [discountPercentage, setDiscountPercentage] = React.useState(0);
  const [promoError, setPromoError] = React.useState("");
  const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
  const discountAmount = (subtotal * discountPercentage) / 100;

  const applyPromoCode = async () => {
    try {
      const response = await axios.post("/api/checkpromo", {
        code: promoCode,
        action: "apply",
      });

      if (response.data && response.data.discount) {
        setAppliedPromoCode(promoCode); // Save the applied promo code
        setDiscountPercentage(response.data.discount); // Save discount percentage
        setPromoCodeId(response.data.id); // Save promo code id
        setPromoError(""); // Clear any previous errors
      } else {
        setPromoError("Failed to apply promo code"); // Handle unexpected responses
      }
    } catch (error: any) {
      // Check for specific error messages from the API
      if (error.response && error.response.data && error.response.data.error) {
        const apiError = error.response.data.error;

        if (apiError === "Promo code is expired") {
          setPromoError("The promo code you entered has expired.");
        } else if (apiError === "Promo code does not exist") {
          setPromoError("The promo code you entered is invalid.");
        } else {
          setPromoError(apiError); // Generic API error message
        }
      } else {
        setPromoError("An unexpected error occurred. Please try again.");
      }
      console.error("Error applying promo code:", error);
    }
  };

  const removePromoCode = async () => {
    try {
      const response = await axios.post("/api/checkpromo", {
        code: appliedPromoCode,
        action: "remove",
      });

      // Check if the response indicates successful removal
      if (response.data && response.data.discount === 0) {
        setAppliedPromoCode(null); // Clear the applied promo code
        setDiscountPercentage(0); // Reset discount percentage
        setPromoError(""); // Clear any error messages
      } else {
        setPromoError("Failed to remove promo code"); // Handle unexpected responses
      }
    } catch (error) {
      setPromoError("Error removing promo code"); // Handle API errors
      console.error(error);
    }
  };

  const handleCartData = () => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken: any = jwtDecode(token);
      const userId = decodedToken.userId;

      cartItems.forEach((item) => {
        insertCart({
          userId,
          pujaServiceId: item.id,
          packageId: item.packageId,
          selected_date: item.date,
          selected_time: item.time,
          promoCodeId: promoCodeId ?? 0,
        })
          .then(() => {
            window.location.href = "/checkout";
          })
          .catch((error) => {
            console.error("Error inserting cart data", error);
          });
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Section
        bgImageUrl="/image/cart1.jpeg"
        title="Your Cart"
        description={
          cartItems.length === 0
            ? "Your cart is empty, add some package to continue."
            : "Checkout the package in your cart."
        }
      />
      <main className="max-w-7xl mx-auto px-4 py-8">
        {cartItems.length === 0 ? (
          <Image
            src="/image/empty.jpeg"
            width={300}
            height={300}
            alt="Empty Cart"
            className="w-full h-auto sm:w-3/4 sm:h-auto md:w-1/2 md:h-auto"
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-md p-6 mb-4 flex items-center"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-md"
                    width={96}
                    height={96}
                  />
                  <div className="ml-6 flex-grow">
                    <h3 className="text-lg font-semibold text-black text-left">
                      {item.name} | {item.type}
                    </h3>
                    <p className="text-md">
                      {item.location} | {item.language}
                    </p>
                    <p className="text-md">
                      {item.date} | {item.time}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">
                        Pandit(S): 1 | Duration: 2hrs
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 flex items-center"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <FaTrash className="mr-2" />
                        Remove
                      </button>
                    </div>
                  </div>
                  <h2 className="relative text-xl font-bold -top-10 right-20">
                    ₹{item.price}
                  </h2>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 h-fit">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>₹{subtotal}</span>
                </div>
                {discountPercentage > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>
                      Discount (
                      {appliedPromoCode ? `${discountPercentage}%` : ""}):
                    </span>
                    <span>-₹{discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg border-t pt-4">
                  <span>Total:</span>
                  <span>₹{(subtotal - discountAmount).toFixed(2)}</span>
                </div>
                <div className="mt-6">
                  <label
                    htmlFor="promo"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Apply Coupon
                  </label>
                  {!appliedPromoCode ? (
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        id="promo"
                        value={promoCode.toUpperCase()}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="flex-1 border rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter code"
                      />
                      <button
                        onClick={applyPromoCode}
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center">
                      <span className="text-green-600">{appliedPromoCode}</span>
                      <button
                        onClick={removePromoCode}
                        className="text-red-500 hover:text-red-700 flex items-center"
                      >
                        <FaTrash className="mr-2" />
                        Remove
                      </button>
                    </div>
                  )}
                  {promoError && (
                    <p className="text-red-500 mt-2">{promoError}</p>
                  )}
                </div>
                <div className="space-y-3 mt-6">
                  <button
                    className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition-colors"
                    onClick={handleCartData}
                  >
                    Proceed to Checkout
                  </button>
                  <button
                    onClick={clearCart}
                    className="mt-6 w-full bg-red-500 text-white py-2 rounded-lg"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CartPage;
