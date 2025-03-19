"use client";

import React, { useState } from "react";
import Layout from "../layout";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaTelegram,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaUserAlt,
  FaPaperPlane,
} from "react-icons/fa";
import Image from "next/image";

export default function Contact() {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(
    null
  );
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!formData.subject) errors.subject = "Please select a subject";
    if (!formData.message.trim()) errors.message = "Message is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Reset form on success
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setSubmitStatus("success");
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="bg-gradient-to-b from-orange-50 to-orange-100 min-h-screen">
        {/* Hero section */}
        <div className="relative bg-orange-600 text-white py-16 md:py-24">
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="/image/contact-bg.jpg"
              alt="Contact background"
              fill
              className="object-cover opacity-20"
              priority
            />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Get in Touch
              </h1>
              <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                We're here to assist you with any questions about our puja
                services, bookings, or spiritual guidance.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href="tel:+919876543210"
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm px-6 py-3 rounded-full flex items-center text-white transition duration-300"
                >
                  <FaPhone className="mr-2" />
                  <span>Call Us</span>
                </a>
                <a
                  href="mailto:support@okpuja.com"
                  className="bg-white text-orange-600 hover:bg-orange-50 px-6 py-3 rounded-full flex items-center transition duration-300"
                >
                  <FaEnvelope className="mr-2" />
                  <span>Email Us</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Contact Information
                </h2>

                <div className="space-y-6">
                  <div className="flex">
                    <div className="bg-orange-100 p-3 rounded-full mr-4">
                      <FaPhone className="text-orange-600 text-lg" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-700">Phone</h3>
                      <p className="text-gray-600 mt-1">+91 98765 43210</p>
                      <p className="text-gray-500 text-sm mt-1">
                        Mon-Sat, 9:00 AM - 6:00 PM
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="bg-orange-100 p-3 rounded-full mr-4">
                      <FaEnvelope className="text-orange-600 text-lg" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-700">Email</h3>
                      <p className="text-gray-600 mt-1">support@okpuja.com</p>
                      <p className="text-gray-500 text-sm mt-1">
                        We'll respond within 24 hours
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="bg-orange-100 p-3 rounded-full mr-4">
                      <FaMapMarkerAlt className="text-orange-600 text-lg" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-700">
                        Office Address
                      </h3>
                      <p className="text-gray-600 mt-1">
                        123 Spiritual Lane, Divinity Complex
                        <br />
                        Bangalore, Karnataka 560001
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <h3 className="font-medium text-gray-700 mb-4">
                    Connect With Us
                  </h3>
                  <div className="flex space-x-4">
                    <a
                      href="#"
                      className="bg-gray-100 hover:bg-orange-100 p-2.5 rounded-full text-gray-600 hover:text-orange-600 transition-colors"
                      aria-label="Facebook"
                    >
                      <FaFacebook />
                    </a>
                    <a
                      href="#"
                      className="bg-gray-100 hover:bg-orange-100 p-2.5 rounded-full text-gray-600 hover:text-orange-600 transition-colors"
                      aria-label="Instagram"
                    >
                      <FaInstagram />
                    </a>
                    <a
                      href="#"
                      className="bg-gray-100 hover:bg-orange-100 p-2.5 rounded-full text-gray-600 hover:text-orange-600 transition-colors"
                      aria-label="Twitter"
                    >
                      <FaTwitter />
                    </a>
                    <a
                      href="#"
                      className="bg-gray-100 hover:bg-orange-100 p-2.5 rounded-full text-gray-600 hover:text-orange-600 transition-colors"
                      aria-label="LinkedIn"
                    >
                      <FaLinkedin />
                    </a>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <h3 className="font-medium text-gray-700 mb-4">
                    Chat With Us
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="https://wa.me/919876543210"
                      className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      <FaWhatsapp className="mr-2" /> WhatsApp
                    </a>
                    <a
                      href="https://t.me/okpuja"
                      className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      <FaTelegram className="mr-2" /> Telegram
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Send Us a Message
                </h2>

                {/* Success message */}
                {submitStatus === "success" && (
                  <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 text-green-700">
                    <div className="flex">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="font-medium">
                        Thank you for your message!
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-green-600">
                      We have received your inquiry and will get back to you
                      shortly.
                    </p>
                  </div>
                )}

                {/* Error message */}
                {submitStatus === "error" && (
                  <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                    <div className="flex">
                      <svg
                        className="h-5 w-5 text-red-500 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="font-medium">
                        Oops! Something went wrong.
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-red-600">
                      There was an error sending your message. Please try again
                      or contact us directly.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name field */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaUserAlt className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`block w-full pl-10 pr-3 py-2.5 border ${
                          formErrors.name ? "border-red-300" : "border-gray-300"
                        } rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500`}
                        placeholder="Your full name"
                      />
                    </div>
                    {formErrors.name && (
                      <p className="mt-1 text-sm text-red-600">
                        {formErrors.name}
                      </p>
                    )}
                  </div>

                  {/* Email field */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaEnvelope className="text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`block w-full pl-10 pr-3 py-2.5 border ${
                          formErrors.email
                            ? "border-red-300"
                            : "border-gray-300"
                        } rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500`}
                        placeholder="Your email address"
                      />
                    </div>
                    {formErrors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {formErrors.email}
                      </p>
                    )}
                  </div>

                  {/* Subject field */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`block w-full px-3 py-2.5 border ${
                        formErrors.subject
                          ? "border-red-300"
                          : "border-gray-300"
                      } rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500`}
                    >
                      <option value="">Select a topic</option>
                      <option value="booking">Booking Inquiry</option>
                      <option value="service">Service Information</option>
                      <option value="technical">Technical Support</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                    {formErrors.subject && (
                      <p className="mt-1 text-sm text-red-600">
                        {formErrors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message field */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className={`block w-full px-3 py-2.5 border ${
                        formErrors.message
                          ? "border-red-300"
                          : "border-gray-300"
                      } rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500`}
                      placeholder="How can we help you?"
                    ></textarea>
                    {formErrors.message && (
                      <p className="mt-1 text-sm text-red-600">
                        {formErrors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit button */}
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:bg-orange-300 disabled:cursor-not-allowed flex items-center"
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin h-5 w-5 mr-3 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <FaPaperPlane className="mr-2" />
                          Send Message
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 mt-2">
                Find quick answers to common questions about our services
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="divide-y divide-gray-200">
                  {[
                    {
                      q: "How soon can I book a puja?",
                      a: "Most pujas can be booked with at least 24 hours notice. For special ceremonies or specific dates, we recommend booking at least a week in advance.",
                    },
                    {
                      q: "Do you provide pandits for on-site pujas?",
                      a: "Yes, we can arrange for experienced pandits to conduct pujas at your home or preferred location. Additional travel charges may apply based on distance.",
                    },
                    {
                      q: "What payment methods do you accept?",
                      a: "We accept all major credit/debit cards, UPI payments, net banking, and digital wallets for your convenience.",
                    },
                    {
                      q: "Can I reschedule my booked puja?",
                      a: "Yes, pujas can be rescheduled up to 48 hours before the scheduled time without any additional charges.",
                    },
                    {
                      q: "Do you conduct online pujas?",
                      a: "Yes, we offer online pujas where you can participate virtually through video conferencing.",
                    },
                  ].map((faq, index) => (
                    <div key={index} className="p-6">
                      <h3 className="text-lg font-medium text-gray-800 mb-2">
                        {faq.q}
                      </h3>
                      <p className="text-gray-600">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
