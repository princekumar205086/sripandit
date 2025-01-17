"use client";
import React, { useState } from "react";
import { FiShoppingCart, FiChevronLeft, FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartPage: React.FC = () => {
  interface CartItem {
    id: number;
    name: string;
    image: string;
    package: string;
    location: string;
    language: string;
    price: number;
  }

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleAddToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        toast.error("Item is already in the cart.");
        return prevItems;
      }
      toast.success("Item added to cart successfully.");
      return [...prevItems, item];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((cartItem) => cartItem.id !== id));
    toast.info("Item removed from cart.");
  };

  const subtotal = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <button className="text-gray-600 hover:text-orange-600 mr-4">
              <FiChevronLeft size={24} />
            </button>
            <img
              src="https://images.unsplash.com/photo-1600012886774-1a39cda7f3c4"
              alt="Logo"
              className="h-8 w-auto"
            />
          </div>
          <div className="relative">
            <FiShoppingCart size={24} className="text-orange-600" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {cartItems.length}
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center text-gray-600">Your cart is empty.</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-md p-6 mb-4">
                  <div className="flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="ml-6 flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {item.package} Package | {item.location} | {item.language}
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-lg font-semibold text-gray-900">
                          ₹{item.price}
                        </span>
                        <button
                          onClick={() => handleRemoveFromCart(item.id)}
                          className="ml-4 text-red-500 hover:text-red-700"
                        >
                          <FiX size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">₹{subtotal}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <button className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors">
                    Proceed to Checkout
                  </button>
                  <button className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors">
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Related Services */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[ 
              {
                id: 3,
                name: "Satyanarayan Puja",
                image: "https://images.unsplash.com/photo-1634473115412-8fa5b647ef59",
                price: 2100,
                package: "Basic",
                location: "Mumbai",
                language: "Hindi",
              },
              {
                id: 4,
                name: "Laxmi Puja",
                image: "https://images.unsplash.com/photo-1614851099175-e5b30eb6f696",
                price: 3500,
                package: "Standard",
                location: "Delhi",
                language: "English",
              },
            ].map((service) => (
              <div key={service.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                  <p className="text-gray-600 mt-1">₹{service.price}</p>
                  <button
                    className="mt-4 w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition-colors"
                    onClick={() => handleAddToCart(service)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center space-x-8">
            <a href="#" className="hover:text-orange-400">Terms & Conditions</a>
            <a href="#" className="hover:text-orange-400">Privacy Policy</a>
            <a href="#" className="hover:text-orange-400">Customer Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CartPage;
