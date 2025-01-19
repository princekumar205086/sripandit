"use client";

import { useCart } from "@/app/context/CartContext";
import React from "react";
import { FiShoppingCart, FiX } from "react-icons/fi";
import Section from "../pujaservice/section";
import Image from "next/image";

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
  

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
                <div
                  key={item.id}
                  className="bg-white p-4 shadow rounded-lg mb-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p>
                        {item.package} Package | {item.location} |{" "}
                        {item.language}
                      </p>
                      <p className="text-orange-600 font-bold">₹{item.price}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FiX size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1 bg-white p-6 shadow rounded-lg">
              <h2 className="text-xl font-semibold">Order Summary</h2>
              <p className="mt-4">Subtotal: ₹{subtotal}</p>
              <button
                onClick={clearCart}
                className="mt-6 w-full bg-red-500 text-white py-2 rounded-lg"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CartPage;
