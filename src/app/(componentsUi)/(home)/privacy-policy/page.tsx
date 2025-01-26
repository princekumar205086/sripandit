"use client"
import React, { useState, useEffect } from "react";
import { FaSearch, FaPrint, FaArrowUp } from "react-icons/fa";
import Section from "../pujaservice/section";

interface TermContent {
  id: number;
  title: string;
  content: string;
}

const privacyPolicy = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [privacyPolicyContent, setPrivacyPolicyContent] = useState<any[]>([]); // Data from API
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.pageYOffset > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  useEffect(() => {
    const fetchPrivacyPolicy = async () => {
      try {
        const response = await fetch("/api/privacypolicy");
        const data = await response.json();
        setPrivacyPolicyContent(data);
      } catch (err:any) {
        setError("Failed to load privacy policy data");
      } finally {
        setLoading(false);
      }
    };

    fetchPrivacyPolicy();
  }, []);

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
          <h2 className="text-2xl text-orange-700 font-semibold mb-3 text-center">{`${item.id}. ${item.title}`}</h2>
          <p className="text-orange-600"
          dangerouslySetInnerHTML={{ __html: item.content }}
          />
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