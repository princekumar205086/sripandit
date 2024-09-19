"sue client"
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
    <footer className="py-12" style={{backgroundColor:"#F8EFBA"}}>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
        {/* First Section */}
        <div className="card">
          <div className="text-center md:text-left w-full p-6">
            <div className="mb-8">
              <Image src="/image/okpuja logo social.png" alt="Logo" width={150} height={150} />
              <p className="text-2xl text-orange-500 mt-2">
              Okpuja offers seamless and sacred Puja services, ensuring a
                blissful experience from booking to completion. Our platform boasts
                the best Pandits and Purohits, with options available in multiple
                languages for various types of Pujas.
              </p>
            </div>
          </div>
        </div>

        {/* Second Section */}
        <div className="card">
          <div className="text-center md:text-left w-full p-6">
            <h3 className="text-3xl text-orange-500 font-bold mb-4">Hindu Puja</h3>
            <ul>
              {pujaList.map((puja, index) => (
                <li key={index}>
                  <Link href="#" className="hover:text-orange-600 text-orange-500 text-2xl">
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
            <h3 className="text-3xl font-bold text-orange-500 mb-4">Menu</h3>
            <ul>
              {menuList.map((menuItem, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-orange-600 text-orange-500 text-2xl">
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
            <h3 className="font-bold mb-4 text-orange-500 text-3xl">Contact Us</h3>
            <p className="text-2xl text-orange-500 mt-2">
              Address: Ram Ratan Ji Nagar Rambagh, Purnia, Bihar, 854301 <br />
              Phone: 9471661636 <br />
              Email: namaste@okpuja.com
            </p>
            <div className="flex items-center justify-center md:justify-start mt-4">
              <Link href="https://www.facebook.com/profile.php?id=61564270386024" className="mr-4 text-4xl text-orange-500">
                <FaFacebook />
              </Link>
              <Link href="https://wa.me/919471661636" className="mr-4 text-4xl text-orange-500">
                <FaWhatsapp />
              </Link>
              <Link href="#" className="mr-4 text-4xl text-orange-500">
                <FaInstagram />
              </Link>
              <Link href="#" className="mr-4 text-4xl text-orange-500">
                <FaLinkedin />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Credit */}
      <div className="text-center mt-8">
        <p className="text-3xl font-bold text-orange-500">
          &copy; {new Date().getFullYear()} Okpuja. All Rights Reserved. |{" "}
          Powered by <Link href="https://wwww.webdigger.in"><u><strong>Webdigger</strong></u></Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
