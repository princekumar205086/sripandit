"sue client"
import React from "react";
import Image from "next/image";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
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
    "About Us",
    "Services",
    "Contact Us",
    "Terms of Service",
    "Privacy Policy",
    "FAQs",
    "Testimonials",
    "Blog",
    "Careers",
    "Gallery",
    "Events",
    "Book Now",
  ];

  return (
    <footer className="bg-blue-500 text-white py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
        {/* First Section */}
        <div className="card">
          <div className="text-center md:text-left w-full p-6">
            <div className="mb-8">
              <Image src="/image/logo.png" alt="Logo" width={200} height={180} />
              <p className="text-2xl text-white mt-2">
                SriPandit offers seamless and sacred Puja services, ensuring a
                blissful experience from booking to completion. Our platform boasts
                the best Pandits and Purohits, with options available in multiple
                languages for various types of Pujas. Enjoy hassle-free
                arrangements, including Puja materials. Book Now for a divine
                experience!
              </p>
            </div>
          </div>
        </div>

        {/* Second Section */}
        <div className="card">
          <div className="text-center md:text-left w-full p-6">
            <h3 className="text-3xl text-white font-bold mb-4">Hindu Puja</h3>
            <ul>
              {pujaList.map((puja, index) => (
                <li key={index}>
                  <Link href="#" className="hover:text-white-900 text-white text-2xl">
                    {puja}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Third Section */}
        <div className="card">
          <div className="text-center md:text-left w-full p-6">
            <h3 className="text-3xl font-bold text-white mb-4">Menu</h3>
            <ul>
              {menuList.map((menuItem, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-white-400 text-white text-2xl">
                    {menuItem}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Fourth Section */}
        <div className="card">
          <div className="text-center md:text-left w-full p-6">
            <h3 className="font-bold mb-4 text-white text-3xl">Contact Us</h3>
            <p className="text-2xl text-white mt-2">
              Address: 123 Main Street, City, State, ZIP Code <br />
              Phone: +1 (123) 456-7890 <br />
              Email: info@sripandit.com
            </p>
            <div className="flex items-center justify-center md:justify-start mt-4">
              <Link href="#" className="mr-4 text-4xl">
                <FaFacebook />
              </Link>
              <Link href="#" className="mr-4 text-4xl">
                <FaTwitter />
              </Link>
              <Link href="#" className="mr-4 text-4xl">
                <FaInstagram />
              </Link>
              <Link href="#" className="mr-4 text-4xl">
                <FaLinkedin />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Credit */}
      <div className="text-center mt-8">
        <p className="text-3xl font-bold">
          &copy; {new Date().getFullYear()} SriPandit. All Rights Reserved. |{" "}
          Powered by <Link href="https://wwww.webdigger.in">Webdigger.</Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
