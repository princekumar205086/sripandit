"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/app/helper/useAuth";
import Layout from "../../layout";
import { toast, ToastContainer } from "react-toastify";
import { IoMdAdd } from "react-icons/io";
import { FiEdit, FiEye, FiSearch, FiTrash2 } from "react-icons/fi";
import { BiCaretLeft } from "react-icons/bi";
import Modal from "./Modal";
import { getUserService } from "./action";
// import ViewUser from "./ViewUser";

interface Service {
    id:                 number;
    username:           string;
    email:              string;  
    contact:            string;
    password:           string
    date_of_reg:        string;
    account_status:     string;
}

export default function ManageUserService() {
  const isAuthenticated = useAuth();
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedServiceIds, setSelectedServiceIds] = useState<number[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [viewPujaId, setViewPujaId] = useState<string | null>(null);
  const [editPujaId, setEditPujaId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  // Initialize state on client-side only
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  // pujaservice state
  const [services, setServices] = useState<Service[]>([]);  
  const indexOfLastService = currentPage * rowsPerPage;
  const indexOfFirstService = indexOfLastService - rowsPerPage;
  const currentServices = services.slice(
    indexOfFirstService,
    indexOfLastService
  );

  // Fetch the role from localStorage when the component mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRole = localStorage.getItem("role");
      setRole(storedRole);
      setLoading(false); // Set loading to false once role is fetched
    }
  }, []);

  // Handle redirection based on authentication status and role
  useEffect(() => {
    if (!loading) {
      // Only proceed after role is loaded
      if (!isAuthenticated) {
        router.push("/login"); // Redirect to login if not authenticated
      } else if (role !== "ADMIN") {
        router.push("/login"); // Redirect to unauthorized page if role is not ADMIN
      }
    }
  }, [isAuthenticated, role, loading, router]);

  useEffect(() => {
  
      // calling service
      const fetchServices = async () => {
        const response = await getUserService();
        if (response) {
          setServices(response);
        }
      };
  
      fetchServices();
    }, []);

  // Show loading state while determining role or authentication
  if (!isAuthenticated || loading) {
    return <div>Loading...</div>; // Show a loading indicator while waiting
  }
  const handleAddUser = () => {
    setIsAddModalOpen(true);
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
  };
  
    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedFilter(e.target.value);
    };
    const handleEdit = (id: string) => {
      setEditPujaId(id);
      setIsEditModalOpen(true);
    };
  
    const handleView = (id: string) => {
      setViewPujaId(id);
      setIsViewModalOpen(true);
    };

    const handleDelete = () => {
      setServices(
        services.filter((service) => !selectedServiceIds.includes(service.id))
      );
      toast.success("Selected services deleted successfully");
      setSelectedServiceIds([]);
    };
  
    const handleSelectService = (id: number) => {
      setSelectedServiceIds((prevSelectedIds) =>
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
      if (currentPage < Math.ceil(services.length / rowsPerPage)) {
        setCurrentPage(currentPage + 1);
      }
    };
  
    const handlePrevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };

  return (
    <Layout>
     <div className="min-h-screen bg-gray-100 p-4 md:p-8">
        <ToastContainer />

        {/* Header Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
              Manage User Services
            </h1>
            <button
              onClick={handleAddUser}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <IoMdAdd className="mr-2" />
              Add User
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1 md:w-3/4">
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search User by name, category, or keyword"
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      onChange={() =>
                        setSelectedServiceIds(
                          selectedServiceIds.length === services.length
                            ? []
                            : services.map((service) => service.id)
                        )
                      }
                      checked={selectedServiceIds.length === services.length}
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    SN.
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Added date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Account Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentServices.map((user, index) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedServiceIds.includes(user.id)}
                        onChange={() => handleSelectService(user.id)}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.contact}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(user.date_of_reg).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.account_status}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleView(user.id.toString())}
                        className="p-1 text-green-600 hover:text-green-800"
                      >
                        <FiEye />
                      </button>
                      <button
                        onClick={() => handleEdit(user.id.toString())}
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

        {/* Table Footer */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handleDelete}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Delete Selected
          </button>
          <div className="flex items-center">
            <label htmlFor="" className="mr-2">
              Row per page
            </label>
            <select
              className="w-20 h-[42px] pl-3 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleRowsPerPageChange}
              value={rowsPerPage}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
            <div className="ml-5 flex">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 mr-2"
              >
                <BiCaretLeft />
              </button>
              <button
                onClick={handleNextPage}
                disabled={
                  currentPage === Math.ceil(services.length / rowsPerPage)
                }
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
              >
                <BiCaretLeft className="transform rotate-180" />
              </button>
            </div>
          </div>
        </div>
      </div>

       {/* Modals */}

      {/* <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Puja"
      >
        <EditPuja id={Number(editPujaId)} />
        <button
          onClick={() => setIsEditModalOpen(false)}
          className="text-red-600 hover:text-red-800"
        >
          Close
        </button>
      </Modal> */}

      {/* <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        service_title="View User"
      >
        {viewPujaId && <ViewUser id={Number(viewPujaId)} />}
        <button
          onClick={() => setIsViewModalOpen(false)}
          className="text-red-600 hover:text-red-800"
        >
          Close
        </button>
      </Modal> */}
    </Layout>
  );
}
