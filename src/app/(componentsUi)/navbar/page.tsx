"use client";
import React, { useState, useEffect, useRef } from "react";
import "./navbar.css";
import Image from "next/image";
import { FaWhatsappSquare, FaPhoneSquare, FaUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";

const menuList = [
  { name: "Puja Services", link: "/pujaservice" },
  { name: "Product", link: "/product" },
  { name: "Astrology", link: "/astrology" },
  { name: "Events", link: "/events" },
  { name: "Blog", link: "/blog" },
  { name: "Contatct us", link: "/contactus" },
];

const Navbar = () => {
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call the function initially to set the correct state

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        headerRef.current.classList.toggle("scrolled", window.scrollY > 50);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeMobileMenu = () => setShowMediaIcons(false);

  return (
    <>
      <nav
        ref={headerRef}
        className={`main-nav fixed top-0 w-full bg-transparent border-b border-white ${
          isMobile ? "mobile" : ""
        }`}
      >
        <Link href="/" className="logo bg-transparent" onClick={closeMobileMenu}>
          <Image src="/image/logo6.png" alt="logo" width={200} height={180} />
        </Link>

        <div
          className={
            showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
          }
        >
          <ul>
            {menuList.map((item, index) => (
              <li key={index}>
                <Link href={item.link} onClick={closeMobileMenu}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="social-media">
          <ul className="social-media-desktop">
            <li>
              <Link href="https://wa.me/919471661636" target="_blank">
                <FaWhatsappSquare className="facebook" />
              </Link>
            </li>
            <li>
              <Link href="tel:+919471661636" target="_blank">
                <FaPhoneSquare className="instagram" />
              </Link>
            </li>
            <li>
              <Link href="/register">
                <FaUserCircle className="youtube" />
              </Link>
            </li>
          </ul>

          <div className="hamburger-menu mx-24">
            <button onClick={() => setShowMediaIcons(!showMediaIcons)}>
              <GiHamburgerMenu />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
