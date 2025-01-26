"use client"
import React, { useState, useEffect } from "react";
import { FaSearch, FaPrint, FaArrowUp } from "react-icons/fa";
import Section from "../pujaservice/section";

interface TermContent {
  id: number;
  title: string;
  content: string;
}

const TermsOfService = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [termsContent, setTermsContent] = useState<TermContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.pageYOffset > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  
  useEffect(() => {
    // Fetch terms data from API
    const fetchData = async () => {
      try {
        const response = await fetch("/api/termofservice"); // Replace with your API endpoint
        if (!response.ok) throw new Error("Failed to fetch terms.");
        const data = await response.json();
        setTermsContent(data);
      } catch (err: any) {
        setError(err.message);
      } finally {

        setLoading(false);
      }
    };

    fetchData();
  }, []);
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
          <p 
           className="text-orange-600"
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

export default TermsOfService;