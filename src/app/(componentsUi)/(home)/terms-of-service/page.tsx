"use client"
import React, { useState, useEffect } from "react";
import { FaSearch, FaPrint, FaArrowUp } from "react-icons/fa";
import Section from "../pujaservice/section";

const TermsOfService = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.pageYOffset > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  interface TermContent {
    id: number;
    title: string;
    content: string;
  }


  const termsContent = [
    {
      id: 1,
      title: "Introduction",
      content:
        "Welcome to OKPUJA. By using our website and services, you agree to be bound by the following terms and conditions. These Terms govern your use of our online platform for booking puja services and astrology consultations.",
    },
    {
      id: 2,
      title: "Eligibility",
      content:
        "You must be at least 18 years old to use our services. By accessing the website, you confirm that you meet this age requirement and are fully capable of entering into binding agreements.",
    },
    {
      id: 3,
      title: "Services Offered",
      content:
        "OKPUJA offers users the ability to book various puja services, astrology consultations, and spiritual guidance sessions. All services are provided by experienced practitioners. We facilitate these services but do not perform them ourselves. The actual services will be carried out by qualified Pandits, astrologers, or spiritual experts.",
    },
    {
      id: 4,
      title: "Booking Process",
      content:
        "When booking a service through our platform: You are responsible for providing accurate and up-to-date information. Upon confirmation, you will receive an email or message with details of your scheduled service. OKPUJA reserves the right to cancel or reschedule any bookings with prior notice in case of unforeseen circumstances.",
    },
    {
      id: 5,
      title: "Payment and Fees",
      content:
        "Payment for services is required in full at the time of booking. Fees for each service are clearly displayed on the website, and once a booking is confirmed, the fee is non-refundable except under exceptional circumstances. OKPUJA accepts major payment methods, including credit/debit cards and online payment gateways. All payments are processed securely.",
    },
    {
      id: 6,
      title: "Cancellation and Refund Policy",
      content:
        "If you wish to cancel a booking, you must do so at least 48 hours before the scheduled time to be eligible for a refund. No refunds will be issued for cancellations made within 48 hours of the scheduled service. In the event that the service provider cancels, you will be entitled to a full refund or the option to reschedule.",
    },
    {
      id: 7,
      title: "User Conduct",
      content:
        "You agree to use our platform responsibly and not engage in any misrepresentation of personal or booking details, posting of harmful content, attempts to disrupt website functionality, or harassment of service providers.",
    },
    {
      id: 8,
      title: "Disclaimer of Warranties",
      content:
        "OKPUJA provides access to spiritual and religious services but makes no guarantees regarding the effectiveness of the rituals or consultations. Results may vary based on personal faith and beliefs. All services are provided as-is, without warranties of any kind.",
    },
    {
      id: 9,
      title: "Limitation of Liability",
      content:
        "Under no circumstances will OKPUJA be liable for any direct, indirect, incidental, or consequential damages arising out of the use or inability to use the services. This includes any loss of data, profit, or personal injury resulting from engaging with the services on our platform.",
    },
    {
      id: 10,
      title: "Privacy Policy",
      content:
        "Your personal information is protected in accordance with our Privacy Policy. By using our services, you consent to the collection and use of your data as outlined in that policy.",
    },
    {
      id: 11,
      title: "Modifications to the Terms",
      content:
        "OKPUJA reserves the right to modify or update these Terms at any time. Any changes will be effective immediately upon posting on our website. Continued use of the platform constitutes acceptance of any revised Terms.",
    },
    {
      id: 12,
      title: "Governing Law",
      content:
        "These Terms are governed by and construed in accordance with the laws of [Your Country], and any disputes shall be subject to the exclusive jurisdiction of the courts in [Your City].",
    },
    {
      id: 13,
      title: "Contact Us",
      content:
        "If you have any questions about these Terms, please contact us at support@okpuja.com.",
    },
  ];
  

  const filteredContent = termsContent.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePrint = () => {
    window.print();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id: number) => {
    const element = document.getElementById(`section-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
    <Section
        bgImageUrl="image/term.jpeg"
        title="Terms of Service"
        description="Welcome to OKPUJA by Suraj Kumar Jha. These terms and conditions outline the rules and regulations for the use of our Website. By accessing this website we assume you accept these terms and conditions."
      />
      <div className="max-w-full mx-auto p-4 bg-redOrange shadow-lg rounded-lg text-orangeRed">
      <div className="mb-6 flex items-center">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search terms..."
            className="w-full p-2 border rounded-lg pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-3 text-orange-500" />
        </div>
        <button
          onClick={handlePrint}
          className="ml-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
          aria-label="Print Terms of Service"
        >
          <FaPrint />
        </button>
      </div>

      <nav className="mb-6">
        <ul className="flex flex-wrap justify-center gap-2">
          {termsContent.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToSection(item.id)}
                className="px-3 py-1 bg-cream rounded-full text-sm hover:bg-gray-300 transition duration-300"
              >
                {item.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {filteredContent.map((item) => (
        <section
          key={item.id}
          id={`section-${item.id}`}
          className="mb-8 p-4 bg-cream rounded-lg shadow-sm"
        >
          <h2 className="text-2xl font-semibold mb-3 text-orange-700 text-center">{`${item.id}. ${item.title}`}</h2>
          <p className="text-orange-600">{item.content}</p>
        </section>
      ))}

      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300"
          aria-label="Back to top"
        >
          <FaArrowUp />
        </button>
      )}
    </div>
    </>
  );
};

export default TermsOfService;