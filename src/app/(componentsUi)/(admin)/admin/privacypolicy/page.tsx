"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/app/helper/useAuth";
import Layout from "../../layout";
import { FiSearch, FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "./Modal"; 
import ViewPrivacyPolicy from "./ViewPrivacyPolicy"; // View Privacy Policy
import CreatePrivacyPolicy from "./Createprivacypolicy";



interface PrivacyPolicy {
  id: number;
  title: string;
  content: string;
  date_of_create: string;
}

export default function PrivacyPolicyManagement() {
  const isAuthenticated = useAuth();
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [policies, setPolicies] = useState<PrivacyPolicy[]>([]);
  const [selectedPolicyIds, setSelectedPolicyIds] = useState<number[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);
  const [viewPolicyId, setViewPolicyId] = useState<number | null>(null);
  const [editPolicyId, setEditPolicyId] = useState<number | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const indexOfLastPolicy = currentPage * rowsPerPage;
  const indexOfFirstPolicy = indexOfLastPolicy - rowsPerPage;
  const currentPolicies = policies.slice(indexOfFirstPolicy, indexOfLastPolicy);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRole = localStorage.getItem("role");
      setRole(storedRole);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push("/login");
      } else if (role !== "ADMIN") {
        router.push("/login");
      }
    }
  }, [isAuthenticated, role, loading, router]);

  // Fetch policies from the API
  const fetchPolicies = async (searchQuery: string = "") => {
    const response = await fetch(`/api/privacypolicy?search=${searchQuery}`);
    const data: PrivacyPolicy[] = await response.json();
    setPolicies(data);
  };

  useEffect(() => {
    fetchPolicies(searchTerm); // Fetch policies on initial load or when searchTerm changes
  }, [searchTerm]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleAddPolicy = () => {
    setIsAddModalOpen(true);
  };

  const handleEdit = (id: number) => {
    setEditPolicyId(id);
    setIsEditModalOpen(true);
  };

  const handleView = (id: number) => {
    setViewPolicyId(id);
    setIsViewModalOpen(true);
  };

  // Delete policies via API
  const handleDelete = async () => {
    if (selectedPolicyIds.length > 0) {
      try {
        const response = await fetch("/api/privacypolicy/${id}", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ids: selectedPolicyIds }),
        });
        if (response.ok) {
          toast.success("Selected policies deleted successfully");
          setPolicies(policies.filter((policy) => !selectedPolicyIds.includes(policy.id)));
          setSelectedPolicyIds([]);
        } else {
          toast.error("Failed to delete policies");
        }
      } catch (error) {
        toast.error("An error occurred while deleting policies");
      }
    } else {
      toast.warning("Please select policies to delete");
    }
  };

  const handleSelectPolicy = (id: number) => {
    setSelectedPolicyIds((prevSelectedIds) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((selectedId) => selectedId !== id)
        : [...prevSelectedIds, id]
    );
  };

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(policies.length / rowsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) return null;

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 p-4 md:p-8">
        <ToastContainer />
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
              Manage Privacy Policies
            </h1>
            <button
              onClick={handleAddPolicy}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <IoMdAdd className="mr-2" />
              Add Privacy Policy
            </button>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search policies by title or keyword"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
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
                  <th className="px-6 py-3 text-left">SN.</th>
                  <th className="px-6 py-3 text-left">Title</th>
                  <th className="px-6 py-3 text-left">Content</th>
                  <th className="px-10 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentPolicies.map((policy, index) => (
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
                    <td className="px-6 py-4 " dangerouslySetInnerHTML={{ __html: policy.content }}></td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleView(policy.id)}
                        className="p-1 text-green-600 hover:text-green-800"
                      >
                        <FiEye />
                      </button>
                      <button
                        onClick={() => handleEdit(policy.id)}
                        className="p-1 text-blue-600 hover:text-blue-800"
                      >
                        <FiEdit />
                      </button>
                      <button
                        onClick={() => handleDelete()}
                        className="p-1 text-red-600 hover:text-red-800"
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Delete Selected
          </button>
          <div className="flex items-center">
            <select
              className="mr-4"
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
            <button onClick={handlePrevPage}>Previous</button>
            <button onClick={handleNextPage}>Next</button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Privacy Policy"
      >
        <CreatePrivacyPolicy onClose={() => setIsAddModalOpen(false)} />
      </Modal>
    </Layout>
  );
}
