"use client";

import React, { useEffect, useState } from "react";
import Modal from "./Modal";

interface TermsOfService {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

const ViewTermsOfService = () => {
  const [terms, setTerms] = useState<TermsOfService[]>([]); // List of terms
  const [selectedTerm, setSelectedTerm] = useState<TermsOfService | null>(null); // Selected term for the modal
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch Terms of Service data
    const fetchTermsOfService = async () => {
      try {
        const response = await fetch("/api/termofservice"); // Adjust API endpoint if necessary
        if (!response.ok) {
          throw new Error("Failed to fetch Terms of Service");
        }

        const data = await response.json();
        setTerms(data); // Set fetched terms in state
      } catch (error: any) {
        setError(error.message); // Set error state
      } finally {
        setLoading(false); // Loading complete
      }
    };

    fetchTermsOfService();
  }, []);

  const openModal = (term: TermsOfService) => setSelectedTerm(term); // Open modal with selected term
  const closeModal = () => setSelectedTerm(null); // Close modal

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (terms.length === 0) {
    return <div>No Terms of Service available</div>;
  }

  return (
    <div className="terms-of-service-container">
      <h1 className="text-2xl font-bold mb-4">Terms of Service</h1>
      <ul className="space-y-2">
        {terms.map((term) => (
          <li
            key={term.id}
            className="flex justify-between items-center bg-gray-100 p-4 rounded-lg"
          >
            <span>{term.title}</span>
            <button
              onClick={() => openModal(term)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              View
            </button>
          </li>
        ))}
      </ul>

      {/* Modal for Viewing Selected Term */}
      {selectedTerm && (
        <Modal
          isOpen={!!selectedTerm} // Modal is open if a term is selected
          onClose={closeModal}
          title={`View ${selectedTerm.title}`}
        >
          <div>
            <div
              className="prose"
              dangerouslySetInnerHTML={{ __html: selectedTerm.content }}
            />
            <p className="text-sm text-gray-500 mt-4">
              <strong>Created at:</strong>{" "}
              {new Date(selectedTerm.createdAt).toLocaleDateString()}
            </p>

            <button
              onClick={closeModal}
              className="text-red-600 hover:text-red-800 mt-4"
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ViewTermsOfService;
