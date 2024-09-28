"use client";
import React, { useState, useEffect } from "react";
import { FaWhatsappSquare, FaPhoneSquare, FaUserCircle } from "react-icons/fa";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import Link from "next/link";
import Image from "next/image";

const menuData = [
  { name: "Home", link: "/" },
  { name: "Puja Service", link: "/pujaservice" },
  { name: "Astrology", link: "/astrology" },
  { name: "Blog", link: "/blog" },
  { name: "Contact", link: "/contactus" },
  { name: "SignUp/SignIn", link: "/register" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
            <div className="flex items-center justify-center w-3/12 md:w-2/12">
              <Link href="/">
                <Image
                  alt="logo"
                  src="/image/okpuja logo.png"
                  height={80} // Set a reasonable height for mobile
                  width={160} // Set a reasonable width for mobile
                  className="h-auto w-full md:max-h-16 md:max-w-[150px] object-contain" // Maintain aspect ratio
                />
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
              <FaWhatsappSquare className="text-green-500 text-2xl lg:text-3xl cursor-pointer hover:text-green-600 transition-transform duration-300 transform hover:scale-110" />
              <FaPhoneSquare className="text-purple-500 text-2xl lg:text-3xl cursor-pointer hover:text-purple-600 transition-transform duration-300 transform hover:scale-110" />
              <FaUserCircle className="text-blue-800 text-2xl lg:text-3xl cursor-pointer hover:text-blue-600 transition-transform duration-300 transform hover:scale-110" />
            </div>

            {/* Menu Button for Mobile */}
            <div className="md:hidden flex items-center">
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
          </div>
        </div>
      </nav>
      <hr className="border-b border-x-white" />
    </>
  );
};

export default Navbar;
