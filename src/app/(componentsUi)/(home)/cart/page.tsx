"use client";

import { useCart } from "@/app/context/CartContext";
import React from "react";
import Section from "../pujaservice/section";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [promoCode, setPromoCode] = React.useState("");
  const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
  const [discount, setDiscount] = React.useState(0);
  function applyPromoCode(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    event.preventDefault();
    // Example promo code logic
    if (promoCode === "DISCOUNT10") {
      const discountAmount = subtotal * 0.1; // 10% discount
      setDiscount(discountAmount);
    } else {
      alert("Invalid promo code");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Section
        bgImageUrl="/image/cart1.jpeg"
        title="Your Cart"
        description={
          cartItems.length === 0
            ? "Your cart is empty, add some package to continue."
            : "Checkout the package in your cart."
        }
      />
      {/* Main Content */}
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
            {/* Cart Items */}
            <div className="lg:col-span-2">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-md p-6 mb-4 flex items-center">
                <Image
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-md"
                  width={96}
                  height={96}
                />
                <div className="ml-6 flex-grow">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-lg font-semibold">{item.type}</p>
                  <p className="text-md">{item.location} | {item.language}</p>
                  <p className="text-md">{item.date} | {item.time}</p>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-xl font-bold">₹{item.price}</span>
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
              </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-md p-6 h-fit">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg border-t pt-4">
                  <span>Total</span>
                  <span>₹{subtotal - discount}</span>
                </div>

                <div className="mt-6">
                  <label
                    htmlFor="promo"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Promo Code
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      id="promo"
                      value={promoCode}
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
                </div>

                <div className="space-y-3 mt-6">
                  <button className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition-colors">
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
