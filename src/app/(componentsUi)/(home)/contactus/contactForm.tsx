"use client";
import React, { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaCommentAlt } from "react-icons/fa";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [emailSuggestions, setEmailSuggestions] = useState<string[]>([]);
  const [isEmailValid, setIsEmailValid] = useState(true);

  const commonDomains = [
    "gmail.com",
    "yahoo.com",
    "outlook.com",
    "hotmail.com",
  ];

  useEffect(() => {
    if (email.includes("@")) {
      const [, domain] = email.split("@");
      if (domain) {
        const suggestions = commonDomains.filter((d) =>
          d.startsWith(domain.toLowerCase())
        );
        setEmailSuggestions(suggestions);
      } else {
        setEmailSuggestions(commonDomains);
      }
    } else {
      setEmailSuggestions([]);
    }
  }, [email]);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
    setIsEmailValid(validateEmail(e.target.value));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (isEmailValid) {
      console.log("Form submitted", { name, email, message });
      // Add your form submission logic here
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <div className="w-full md:w-1/2 p-12 bg-white shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <FaUser className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 transition-colors"
              required
              aria-label="Your Name"
            />
          </div>
          <div className="relative">
            <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Your Email"
              className={`w-full pl-10 pr-3 py-2 rounded-lg border-2 ${
                isEmailValid ? "border-gray-200" : "border-red-500"
              } outline-none focus:border-indigo-500 transition-colors`}
              required
              aria-label="Your Email"
              list="email-suggestions"
            />
            {!isEmailValid && (
              <p className="text-red-500 text-sm mt-1">
                Please enter a valid email address
              </p>
            )}
            {emailSuggestions.length > 0 && (
              <datalist id="email-suggestions">
                {emailSuggestions.map((domain) => (
                  <option
                    key={domain}
                    value={`${email.split("@")[0]}@${domain}`}
                  />
                ))}
              </datalist>
            )}
          </div>
          <div className="relative">
            <FaCommentAlt className="absolute top-3 left-3 text-gray-400" />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your Message"
              className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 transition-colors"
              rows={4}
              required
              aria-label="Your Message"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Send Message
          </button>
        </form>
      </div>
      <div className="w-full md:w-1/2 bg-indigo-100 flex items-center justify-center p-8">
        <div className="relative w-full h-full overflow-hidden rounded-lg shadow-xl transform transition-all duration-300 hover:scale-105">
          <img
            src="/image/contform.jpeg"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 opacity-75 transition-opacity duration-300 hover:opacity-20"></div>
          <div className="absolute inset-0 flex items-center justify-center bg-transparent opacity-90">
            <h3 className="text-4xl font-bold text-white text-center">
              We're here to help!
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
