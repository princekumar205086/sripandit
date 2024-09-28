"use client"
import React, { useState, useEffect } from "react";
import { FaSearch, FaPrint, FaArrowUp } from "react-icons/fa";
import Section from "../pujaservice/section";

const privacyPolicy = () => {
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


  const privacyPolicyContent = [
    {
      id: 1,
      title: "Introduction",
      content:
        "At OKPUJA, we value your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains what information we collect, why we collect it, how we use it, and the measures we take to ensure it is handled safely and responsibly. By using our website and services, you agree to the collection and use of your data in accordance with this policy.",
    },
    {
      id: 2,
      title: "Information We Collect",
      content:
        "We collect two types of information: personal information and non-personal information.\n\n1. **Personal Information**: This includes data you provide when you register on our platform, book a service, or communicate with us. It may include your name, email address, phone number, billing address, and payment details.\n\n2. **Non-Personal Information**: We also collect information automatically through cookies and similar technologies. This includes details such as your IP address, browser type, operating system, device information, and browsing behavior on our site.",
    },
    {
      id: 3,
      title: "How We Use Your Information",
      content:
        "We use the information collected to provide and enhance our services in several ways:\n\n1. **Service Delivery**: Your personal information is essential for processing bookings, managing accounts, sending service confirmations, and communicating with you about your service requests.\n\n2. **Improving User Experience**: We use non-personal data to analyze trends, improve website functionality, and ensure an optimal user experience.\n\n3. **Marketing and Communication**: With your consent, we may use your contact details to inform you about special offers, new services, or updates. You can opt-out of receiving these communications at any time.",
    },
    {
      id: 4,
      title: "Data Sharing and Disclosure",
      content:
        "We treat your personal information with the utmost confidentiality and will not share, sell, or rent your data to third parties for their marketing purposes. However, we may share your information in the following instances:\n\n1. **Service Providers**: We may share data with trusted third parties who assist us in operating our platform and delivering services (e.g., payment processors, hosting services, or customer support). These parties are required to protect your information and only use it to fulfill their services to OKPUJA.\n\n2. **Legal Obligations**: We may disclose your information if required by law or if we believe such action is necessary to comply with legal processes or protect our rights and safety, or that of our users.",
    },
    {
      id: 5,
      title: "Data Security",
      content:
        "We implement a range of security measures to safeguard your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include secure servers, encryption of sensitive data (such as payment information), and regular security audits. However, no method of internet transmission or electronic storage is completely secure, and while we strive to protect your personal data, we cannot guarantee its absolute security.",
    },
    {
      id: 6,
      title: "Cookies and Tracking Technologies",
      content:
        "Our website uses cookies and similar tracking technologies to enhance your browsing experience. Cookies help us understand user behavior, personalize content, and analyze web traffic. You can modify your browser settings to reject cookies, but this may limit some functionalities of our site. We also use tracking technologies to collect aggregate data about site usage, such as popular pages and duration of visits, to continuously improve our services.",
    },
    {
      id: 7,
      title: "Your Rights",
      content:
        "You have rights concerning your personal information, including the right to access, correct, or delete your data. Additionally, you can withdraw consent for data processing where applicable or restrict certain uses of your data (such as opting out of marketing communications). To exercise any of these rights, please contact us at support@okpuja.com. We will respond to your request within a reasonable timeframe and in accordance with applicable laws.",
    },
    {
      id: 8,
      title: "Third-Party Links",
      content:
        "Our platform may contain links to third-party websites, which operate independently of our privacy practices. These websites are governed by their own privacy policies, and we are not responsible for how they handle your data. We encourage you to review the privacy policies of any third-party sites you visit before providing any personal information.",
    },
    {
      id: 9,
      title: "Children’s Privacy",
      content:
        "Our services are not intended for use by individuals under the age of 18. We do not knowingly collect or solicit personal information from children. If we become aware that we have collected personal data from a child without parental consent, we will take immediate steps to delete such information.",
    },
    {
      id: 10,
      title: "Changes to This Policy",
      content:
        "We may update this Privacy Policy from time to time to reflect changes in our practices or legal obligations. Any modifications will be posted on this page, and the 'Effective Date' will be updated accordingly. We encourage you to periodically review this page to stay informed about how we protect your data. Continued use of our services after any changes constitutes your acceptance of the revised policy.",
    },
    {
      id: 11,
      title: "Contact Us",
      content:
        "If you have any questions, concerns, or requests regarding this Privacy Policy or the way your personal data is handled, please contact us at support@okpuja.com. We are committed to resolving any issues promptly and efficiently.",
    },
  ];
  
  

  const filteredContent = privacyPolicyContent.filter((item) =>
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
        bgImageUrl="image/policy.jpeg"
        title="Privacy Policy"
        description="Welcome to OKPUJA. This Privacy Policy outlines how we collect, use, and protect your personal information when you use our services. By accessing our website, you agree to the terms of this policy."
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
          {privacyPolicyContent.map((item) => (
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
          <h2 className="text-2xl font-semibold mb-3">{`${item.id}. ${item.title}`}</h2>
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

export default privacyPolicy;