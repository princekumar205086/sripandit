"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Layout from "../../layout";
import { FiSearch, FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "./Modal";
import EditTermsOfService from "./EditTermsOfService";
import ViewTermsOfService from "./ViewTermsOfService";

interface TermsOfService {
  id: number;
  title: string;
  content: string;
  date_of_create: string;
}

const CreateTermsOfService = dynamic(() => import("./CreateTermsOfService"));

export default function TermsOfService() {
  const router = useRouter();
  const [terms, setTerms] = useState<TermsOfService[]>([]);
  const [selectedTermIds, setSelectedTermIds] = useState<number[]>([]);
  const [filteredTerms, setFilteredTerms] = useState<TermsOfService[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [selectedTerm, setSelectedTerm] = useState<TermsOfService | null>(null); // For viewing the selected term
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false); // Modal for editing term

  const API_ENDPOINT = "/api/termofservice";

  const fetchTerms = async (searchQuery: string = "") => {
    try {
      const response = await fetch(`${API_ENDPOINT}?search=${searchQuery}`);
      if (!response.ok) throw new Error("Failed to fetch terms");
      const data = await response.json();
      setTerms(data);
      setFilteredTerms(data); // Initially set filtered terms to all fetched terms
    } catch (error) {
      console.error("Error fetching terms:", error);
      toast.error("Failed to fetch terms of service");
    }
  };

  useEffect(() => {
    fetchTerms(); // Initial fetch
  }, []);

  // Handle search input changes
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase(); // Get the query in lowercase
    setSearchTerm(query); // Update the search term state
    fetchTerms(query); // Fetch terms based on the search query
  };

  const handleSelectTerm = (id: number) => {
    setSelectedTermIds((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  const handleBulkDelete = async () => {
    if (selectedTermIds.length === 0) {
      toast.warning("Please select terms to delete");
      return;
    }

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selectedTermIds }),
      });

      if (!response.ok) throw new Error("Failed to delete terms");

      toast.success("Selected terms deleted successfully");
      setTerms((prev) =>
        prev.filter((term) => !selectedTermIds.includes(term.id))
      );
      setSelectedTermIds([]);
    } catch (error) {
      console.error("Error deleting terms:", error);
      toast.error("Failed to delete terms");
    }
  };

  const handleDeleteSingle = async (id: number) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete term");

      toast.success("Term deleted successfully");
      setTerms((prev) => prev.filter((term) => term.id !== id));
    } catch (error) {
      console.error("Error deleting term:", error);
      toast.error("Failed to delete term");
    }
  };

  // Handle View Term
  const handleViewTerm = (term: TermsOfService) => {
    setSelectedTerm(term);
  };

  // Open Edit Modal and set selected term
  const handleEditTerm = (term: TermsOfService) => {
    setSelectedTerm(term);
    setIsEditModalOpen(true); // Open edit modal
  };

  // Handle Edit Form Submit
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTerm) return;

    try {
      const updatedTerm = await fetch(`${API_ENDPOINT}/${selectedTerm.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: selectedTerm.title,
          content: selectedTerm.content,
        }),
      });

      if (!updatedTerm.ok) throw new Error("Failed to update term");

      toast.success("Term updated successfully");
      fetchTerms(); // Refetch terms
      setIsEditModalOpen(false); // Close the modal
    } catch (error) {
      toast.error("Failed to update term");
      console.error("Error updating term:", error);
    }
  };

  return (
    <Layout>
      <ToastContainer />
      <div className="min-h-screen bg-gray-100 p-6">
        {/* Header Section */}
        <div className="bg-white p-4 rounded shadow mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Manage Terms of Service</h1>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <IoMdAdd className="mr-2" />
              Add Privacy Policy
            </button>
          </div>
          <div className="relative mt-4">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search terms..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={handleSearch} // Use handleSearch function
            />
          </div>
        </div>

        {/* Terms Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input
                    type="checkbox"
                    onChange={() =>
                      setSelectedTermIds(
                        selectedTermIds.length === terms.length
                          ? [] // Deselect all if all are selected
                          : terms.map((term) => term.id) // Select all if not all are selected
                      )
                    }
                    checked={selectedTermIds.length === terms.length} // Check if all terms are selected
                  />
                </th>

                <th className="px-6 py-3">SN.</th>

                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Content</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTerms.map((term, index) => (
                <tr key={term.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedTermIds.includes(term.id)}
                      onChange={() => handleSelectTerm(term.id)} // Use handleSelectTerm to manage selected terms
                    />
                  </td>
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{term.title}</td>
                  <td
                    className="px-6 py-4"
                    dangerouslySetInnerHTML={{ __html: term.content }}
                  ></td>
                  <td className="px-6 py-4 flex space-x-2">
                    <button
                      className="p-1 text-green-600"
                      onClick={() => handleViewTerm(term)}
                    >
                      <FiEye />
                    </button>
                    <button
                      className="p-1 text-blue-600"
                      onClick={() => handleEditTerm(term)}
                    >
                      <FiEdit />
                    </button>
                    <button
                      className="p-1 text-red-600"
                      onClick={() => handleDeleteSingle(term.id)}
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end mt-4">
          <button
            onClick={handleBulkDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Delete Selected
          </button>
        </div>
      </div>

      {/* Add Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Privacy Policy"
      >
        <CreateTermsOfService onClose={() => setIsAddModalOpen(false)} />
      </Modal>
      
      {/* Edit Term Modal */}
      {selectedTerm && isEditModalOpen && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title={`Edit ${selectedTerm.title}`}
        >
          {/* Pass the selectedTerm data to EditTerm as props */}
          <EditTermsOfService
            term={selectedTerm}
            onClose={() => setIsEditModalOpen(false)}
          />

          {/* Close button to close the modal */}
          <button
            onClick={() => setIsEditModalOpen(false)}
            className="text-red-600 hover:text-red-800 mt-4"
          >
            Close
          </button>
        </Modal>
      )}
    </Layout>
  );
}
