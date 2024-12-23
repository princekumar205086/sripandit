"use client";

import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

// Define TypeScript interfaces for props
interface PujaDetails {
  title: string;
  description: string;
}

interface Review {
  id: number;
  user: string;
  comment: string;
}

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

interface TabSectionProps {
  pujaDetails: PujaDetails;
  reviews: Review[];
  faqs: FAQ[];
}

const TabSection: React.FC<TabSectionProps> = ({ pujaDetails, reviews, faqs }) => {
  const [selectedTab, setSelectedTab] = useState<"description" | "review" | "faq">(
    "description"
  );

  const tabs = ["Description", "Review", "FAQ"];

  return (
    <div className="mb-12">
      {/* Tabs */}
      <div className="flex space-x-4 text-lg mb-6">
        {tabs.map((tab) => (
          <div
            key={tab}
            className={`cursor-pointer p-2 font-bold ${
              selectedTab === tab.toLowerCase()
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setSelectedTab(tab.toLowerCase() as "description" | "review" | "faq")}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {selectedTab === "description" && (
          <div>
            <h3 className="text-2xl font-semibold mb-4">
              About {pujaDetails.title}
            </h3>
            <p className="text-gray-700">{pujaDetails.description}</p>
          </div>
        )}

        {selectedTab === "review" && (
          <div>
            <h3 className="text-2xl font-semibold mb-4">Customer Reviews</h3>
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-300 py-4">
                <div className="flex items-center">
                  <FaStar className="text-yellow-500" />
                  <span className="ml-2 text-gray-800 font-semibold">
                    {review.user}
                  </span>
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        )}

        {selectedTab === "faq" && (
          <div>
            <h3 className="text-2xl font-semibold mb-4">
              Frequently Asked Questions
            </h3>
            {faqs.map((faq) => (
              <div key={faq.id} className="mb-4">
                <h4 className="text-lg font-semibold">{faq.question}</h4>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TabSection;
