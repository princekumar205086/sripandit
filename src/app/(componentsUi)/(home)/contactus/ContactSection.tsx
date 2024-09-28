"use client"
import React from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

const ContactSection = () => {
  const contactInfo = [
    {
      title: "Visit Us",
      icon: <FaMapMarkerAlt className="text-4xl text-orange-500" />,
      content: "Ram Ratan Ji Nagar Rambagh, Purnia, Bihar, 854301"
    },
    {
      title: "Call Us",
      icon: <FaPhone className="text-4xl text-orange-500" />,
      content: "+91 9471661636"
    },
    {
      title: "Reach Us",
      icon: <FaEnvelope className="text-4xl text-orange-500" />,
      content: (
        <>
          <p>namaste@okpuja.com</p>
          <p>www.okpuja.com</p>
        </>
      )
    }
  ];

  return (
    <section className="bg-orange-600 py-8" aria-label="Contact Information">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="bg-cream p-8 rounded-lg shadow-md transition-transform duration-300 hover:scale-105 focus-within:ring-2 focus-within:ring-blue-500"
              tabIndex={0}
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4" aria-hidden="true">
                  {info.icon}
                </div>
                <h2 className="text-xl text-orange-500 font-bold mb-2" id={`contact-${index}`}>
                  {info.title}
                </h2>
                <div
                  className="text-gray-600"
                  aria-labelledby={`contact-${index}`}
                >
                  {info.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;