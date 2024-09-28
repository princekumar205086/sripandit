"use client";
import React from "react";
import Image from "next/image";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  // Sample data for Puja list
  const pujaList = [
    "Ganesh Puja",
    "Navratri Puja",
    "Diwali Puja",
    "Durga Puja",
    "Saraswati Puja",
    "Shiva Puja",
    "Krishna Janmashtami Puja",
    "Holi Puja",
    "Lakshmi Puja",
    "Satyanarayan Puja",
    "Ram Navami Puja",
    "Hanuman Jayanti Puja",
  ];

  // Sample data for Menu list
  const menuList = [
    { name: "About Us", link: "/about" },
    { name: "Puja Services", link: "/pujaservice" },
    { name: "Astrology Services", link: "/astrology" },
    { name: "Contact Us", link: "/contactus" },
    { name: "Terms of Service", link: "/terms-of-tervice" },
    { name: "Privacy Policy", link: "/privacy-policy" },
    { name: "Blog", link: "/blog" },
    { name: "Careers", link: "/careers" },
    { name: "Gallery", link: "/gallery" },
  ];

  return (
    <footer className="bg-[#F8EFBA]">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 p-2">
        {/* First Section */}
        <div className="p-6 shadow-lg">
          <div className="mb-8 text-center md:text-left">
            <Image src="/image/okpuja logo social.png" alt="Logo" width={150} height={150} />
            <p className="text-sm sm:text-base md:text-lg text-orange-500 mt-2">
              Okpuja offers seamless and sacred Puja services, ensuring a blissful experience from booking to completion. Our platform boasts the best Pandits and Purohits, with options available in multiple languages for various types of Pujas.
            </p>
          </div>
        </div>

        {/* Second Section */}
        <div className="p-6 shadow-lg">
          <h3 className="text-lg md:text-xl font-bold text-orange-500 mb-4">Hindu Puja</h3>
          <ul>
            {pujaList.map((puja, index) => (
              <li key={index}>
                <Link href="#" className="hover:text-orange-600 text-orange-500 text-base md:text-lg">
                  {puja}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Third Section */}
        <div className="p-6 shadow-lg">
          <h3 className="text-lg md:text-xl font-bold text-orange-500 mb-4">Menu</h3>
          <ul>
            {menuList.map((menuItem, index) => (
              <li key={index}>
                <Link href={menuItem.link} className="hover:text-orange-600 text-orange-500 text-base md:text-lg">
                  {menuItem.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Fourth Section */}
        <div className="p-6 shadow-lg">
          <h3 className="text-lg md:text-xl font-bold text-orange-500 mb-4">Contact Us</h3>
          <p className="text-base md:text-lg text-orange-500">
            Address: Ram Ratan Ji Nagar Rambagh, Purnia, Bihar, 854301 <br />
            Phone: 9471661636 <br />
            Email: <Link href="mailto:namaste@okpuja.com" className="text-orange-600 hover:underline">namaste@okpuja.com</Link>
          </p>
          <div className="flex items-center justify-center md:justify-start mt-4">
            <Link href="https://www.facebook.com/profile.php?id=61564270386024" className="mr-4 text-3xl text-orange-500 hover:text-orange-600">
              <FaFacebook />
            </Link>
            <Link href="https://wa.me/919471661636" className="mr-4 text-3xl text-orange-500 hover:text-orange-600">
              <FaWhatsapp />
            </Link>
            <Link href="https://www.instagram.com/invites/contact/?i=1j2rqp3o76eq5&utm_content=v2q78s6" className="mr-4 text-3xl text-orange-500 hover:text-orange-600">
              <FaInstagram />
            </Link>
            <Link href="#" className="mr-4 text-3xl text-orange-500 hover:text-orange-600">
              <FaLinkedin />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Credit */}
      <div className="text-center bg-redOrange sticky-bottom">
        <p className="text-lg md:text-xl font-bold text-cream">
          &copy; {new Date().getFullYear()} Okpuja. All Rights Reserved. |{" "}
          Powered by <Link href="https://www.webdigger.in"><u><strong>Webdigger</strong></u></Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
