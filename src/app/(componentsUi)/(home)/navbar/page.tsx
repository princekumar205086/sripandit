"use client";
import React, { useState, useEffect } from "react";
import {
  FaWhatsappSquare,
  FaUserCircle,
  FaCartPlus,
  FaSignOutAlt,
} from "react-icons/fa";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/app/context/CartContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const { cartItems } = useCart();
  //const [cartCount, setCartCount] = useState(1); // Simulating the cart count
  const cartCount = cartItems.length;
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Successfully logged out");
    setToken(null);
    router.push("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuData = [
    { name: "Home", link: "/" },
    { name: "All pujas", link: "/pujaservice" },
    { name: "Astrology", link: "/astrology" },
    { name: "Blog", link: "/blog" },
    { name: "Contact", link: "/contactus" },
    { name: token ? "Dashboard" : "SignUp/SignIn", link: token ? "/dashboard" : "/register" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-cream h-16" : "bg-trans h-20"
        }`}
      >
        <div className="container mx-auto px-4 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo Section */}
            <div className="w-3/12 md:w-2/12 flex items-center h-full">
              <Link href="/">
                <div className="relative logo-wrapper h-full flex items-center">
                  <Image
                    alt="logo"
                    src="/image/okpuja logo.png"
                    width={220}
                    height={120}
                    className="logo-image"
                  />
                </div>
              </Link>
            </div>

            {/* Unified Menu Links (Desktop) */}
            <div className="hidden md:flex flex-1 justify-center space-x-3 text-md font-bold items-center h-full w-full">
              {menuData.map((item, index) => (
                <Link key={index} href={item.link}>
                  <span className="text-orangeRed hover:text-orange-400 cursor-pointer relative group">
                    {item.name}
                    <span className="block h-1 bg-orange-400 w-0 transition-all duration-300 group-hover:w-full absolute bottom-0 left-0" />
                  </span>
                </Link>
              ))}
            </div>

            {/* Social Media Icons */}
            <div className="hidden md:flex w-3/12 md:w-2/12 justify-end space-x-4 items-center">
              <Link href="#">
                <FaWhatsappSquare className="text-green-500 text-2xl lg:text-3xl cursor-pointer hover:text-green-600 transition-transform duration-300 transform hover:scale-110" />
              </Link>
              <Link href="/cart" className="relative">
                <FaCartPlus className="text-blue-800 text-2xl lg:text-3xl cursor-pointer hover:text-blue-600 transition-transform duration-300 transform hover:scale-110" />
                {/* Cart Count Badge */}
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              {token ? (
                <button onClick={handleLogout}>
                  <FaSignOutAlt className="text-purple-500 text-2xl lg:text-3xl cursor-pointer hover:text-purple-600 transition-transform duration-300 transform hover:scale-110" />
                </button>
              ) : (
                <Link href="/login">
                  <FaUserCircle className="text-purple-500 text-2xl lg:text-3xl cursor-pointer hover:text-purple-600 transition-transform duration-300 transform hover:scale-110" />
                </Link>
              )}
            </div>

            {/* Menu Button for Mobile */}
            <div className="md:hidden flex items-center h-full">
              <button
                onClick={toggleMenu}
                className="text-orangeRed focus:outline-none transition-transform duration-300 transform hover:scale-110"
              >
                {isMenuOpen ? (
                  <RiCloseLine className="h-6 w-6" />
                ) : (
                  <RiMenu3Line className="h-6 w-6" />
                )}
              </button>
              {/* Mobile Cart Icon */}
              <Link href="/cart" className="relative ml-4">
                <FaCartPlus className="text-orange-800 text-3xl cursor-pointer hover:text-orange-600 transition-transform duration-300 transform hover:scale-110" />
                {/* Cart Count Badge for Mobile */}
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu Sliding from Left */}
        <div
          className={`md:hidden fixed left-0 w-64 h-full transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } ${isScrolled ? "bg-cream text-orangeRed" : "bg-trans"}`}
        >
          <div className="p-6 space-y-4">
            {menuData.map((item, index) => (
              <Link key={index} href={item.link}>
                <span className="block text-orangeRed cursor-pointer hover:text-orange-400 relative group">
                  {item.name}
                  <span className="block h-1 bg-orange-400 w-0 transition-all duration-300 group-hover:w-full absolute bottom-0 left-0" />
                </span>
              </Link>
            ))}
            {/* adding the logout button only when the user is logged in */}
            {token && (
              <>
              <hr className="border-orange-600 border-dotted" />
              <button onClick={handleLogout}>
                <span className="block text-orangeRed cursor-pointer hover:text-orange-400 relative group">
                  Logout
                  <span className="block h-1 bg-orange-400 w-0 transition-all duration-300 group-hover:w-full absolute bottom-0 left-0" />
                </span>
              </button>
              </>
            )}
          </div>
        </div>
      </nav>
      <hr className="border-b border-x-white" />

      {/* Logo Resizing for Mobile */}
      <style jsx>{`
        @media (max-width: 640px) {
          .logo-wrapper {
            width: 150px;
            height: 60px;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
