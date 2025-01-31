"use client";

import React, { useState, useEffect } from "react";
import { FiSearch, FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../../layout";
import Modal from "./Modal";
import CreateRefundPolicy from "./CreateRefundPolicy";
import EditRefundPolicy from "./EditRefundPolicy";

interface RefundPolicy {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

const RefundPolicy: React.FC = () => {
  const [policies, setPolicies] = useState<RefundPolicy[]>([]);
  const [selectedPolicyIds, setSelectedPolicyIds] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [selectedPolicy, setSelectedPolicy] = useState<RefundPolicy | null>(
    null
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  const API_ENDPOINT = "/api/refundpolicy";

  // Fetch refund policies
  const fetchPolicies = async (searchQuery: string = "") => {
    try {
      const response = await fetch(`${API_ENDPOINT}?search=${searchQuery}`);
      if (!response.ok) throw new Error("Failed to fetch policies");
      const data = await response.json();
      setPolicies(data);
    } catch (error) {
      console.error("Error fetching policies:", error);
      toast.error("Failed to fetch refund policies");
    }
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  // Handle search
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchTerm(query);
    fetchPolicies(query);
  };

  // Handle select/deselect policy
  const handleSelectPolicy = (id: number) => {
    setSelectedPolicyIds((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id]
    );
  };

  // Bulk delete selected policies
  const handleBulkDelete = async () => {
    if (selectedPolicyIds.length === 0) {
      toast.warning("Please select policies to delete");
      return;
    }

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selectedPolicyIds }),
      });

      if (!response.ok) throw new Error("Failed to delete policies");

      toast.success("Selected policies deleted successfully");
      setPolicies((prev) =>
        prev.filter((policy) => !selectedPolicyIds.includes(policy.id))
      );
      setSelectedPolicyIds([]);
    } catch (error) {
      console.error("Error deleting policies:", error);
      toast.error("Failed to delete policies");
    }
  };

  // Delete single policy
  const handleDeleteSingle = async (id: number) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete policy");

      toast.success("Policy deleted successfully");
      setPolicies((prev) => prev.filter((policy) => policy.id !== id));
    } catch (error) {
      console.error("Error deleting policy:", error);
      toast.error("Failed to delete policy");
    }
  };

  return (
    <Layout>
      <ToastContainer />
      <div className="min-h-screen bg-gray-100 p-6">
        {/* Header Section */}
        <div className="bg-white p-4 rounded shadow mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Manage Refund Policies</h1>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <IoMdAdd className="mr-2" />
              Add Refund Policy
            </button>
          </div>
          <div className="relative mt-4">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search policies..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        {/* Policies Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    onChange={() =>
                      setSelectedPolicyIds(
                        selectedPolicyIds.length === policies.length
                          ? []
                          : policies.map((policy) => policy.id)
                      )
                    }
                    checked={selectedPolicyIds.length === policies.length}
                  />
                </th>
                <th className="px-6 py-3">SN.</th>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Content</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {policies.map((policy, index) => (
                <tr key={policy.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedPolicyIds.includes(policy.id)}
                      onChange={() => handleSelectPolicy(policy.id)}
                    />
                  </td>
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{policy.title}</td>
                  <td className="px-6 py-4">{policy.content}</td>
                  <td className="px-6 py-4 flex space-x-2">
                    <button
                      className="p-1 text-green-600"
                      onClick={() => setSelectedPolicy(policy)}
                    >
                      <FiEye />
                    </button>
                    <button
                      className="p-1 text-blue-600"
                      onClick={() => {
                        setSelectedPolicy(policy);
                        setIsEditModalOpen(true);
                      }}
                    >
                      <FiEdit />
                    </button>
                    <button
                      className="p-1 text-red-600"
                      onClick={() => handleDeleteSingle(policy.id)}
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

      {/* Add Policy Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Refund Policy"
      >
        <CreateRefundPolicy onClose={() => setIsAddModalOpen(false)} />
      </Modal>
      {/* Inside the Edit Policy Modal */}
      {selectedPolicy && isEditModalOpen && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title={`Edit ${selectedPolicy.title}`}
        >
          <EditRefundPolicy
            policy={selectedPolicy}
            onClose={() => setIsEditModalOpen(false)}
            onUpdate={(updatedPolicy) => {
              setPolicies((prev) =>
                prev.map((policy) =>
                  policy.id === updatedPolicy.id ? updatedPolicy : policy
                )
              );
            }}
          />
        </Modal>
      )}
    </Layout>
  );
};

export default RefundPolicy;
