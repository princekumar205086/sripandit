"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/app/helper/useAuth";
import Layout from "../../layout";
import { FiSearch, FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "./Modal";
import PujaForm from "./InsertPuja";
import { BiCaretLeft } from "react-icons/bi";
// service call
import { getPujaService, getPujaCategory } from "./action";
import ViewPuja from "./ViewPuja";
import EditPuja from "./EditPuja";

// TypeScript interfaces for data
interface Service {
  id: number;
  title: string;
  img: string;
  desc: string;
  categoryId: number;
  date_of_create: string;
  category: {
    id: number;
    name: string;
  };
  packages: any[];
}

interface Category {
  id: number;
  name: string;
}

// const dummyData: Service[] = [
//   {
//     id: 1,
//     title: "Ganesh Puja",
//     image: "https://images.unsplash.com/photo-1582126892906-5ba111b3c9dd",
//     category: "Vedic",
//     price: 2500,
//     location: "Mumbai, Delhi",
//     languages: ["Hindi", "English"],
//     status: "Active",
//   },
//   {
//     id: 2,
//     title: "Vastu Consultation",
//     image: "https://images.unsplash.com/photo-1600430038161-1a42d8c109ee",
//     category: "Astrology",
//     price: 3500,
//     location: "Online",
//     languages: ["English", "Tamil"],
//     status: "Inactive",
//   },

//   // More services
// ];

export default function ManagePujaService() {
  const isAuthenticated = useAuth();
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Initialize state on client-side only
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  // pujaservice state
  const [services, setServices] = useState<Service[]>([]);
  // category state
  const [selectedPujaTitle, setSelectedPujaTitle] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedServiceIds, setSelectedServiceIds] = useState<number[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [viewPujaId, setViewPujaId] = useState<string | null>(null);
  const [editPujaId, setEditPujaId] = useState<string | null>(null);

  // Pagination logic
  const indexOfLastService = currentPage * rowsPerPage;
  const indexOfFirstService = indexOfLastService - rowsPerPage;
  const currentServices = services.slice(
    indexOfFirstService,
    indexOfLastService
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRole = localStorage.getItem("role");
      setRole(storedRole);
      setLoading(false); // Set loading to false once role is fetched
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

  // calling category
  useEffect(() => {
    // calling category
    const fetchCategories = async () => {
      const response = await getPujaCategory();
      if (response) {
        setCategories(response);
      }
    };

    fetchCategories();

    // calling service
    const fetchServices = async () => {
      const response = await getPujaService();
      if (response) {
        setServices(response);
      }
    };

    fetchServices();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(e.target.value);
  };

  const handleAddPuja = () => {
    setIsAddModalOpen(true);
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

  if (loading) return null; // Avoid rendering before loading is complete

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 p-4 md:p-8">
        <ToastContainer />

        {/* Header Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
              Manage Puja Services
            </h1>
            <button
              onClick={handleAddPuja}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <IoMdAdd className="mr-2" />
              Add Puja
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1 md:w-3/4">
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search pujas by name, category, or keyword"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleSearch}
              />
            </div>
            <div className="relative md:w-1/4">
              <select
                className="w-full h-[42px] pl-3 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleFilterChange}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
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
                    Puja Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Added date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentServices.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedServiceIds.includes(item.id)}
                        onChange={() => handleSelectService(item.id)}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.category.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(item.date_of_create).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleView(item.id.toString())}
                        className="p-1 text-green-600 hover:text-green-800"
                      >
                        <FiEye />
                      </button>
                      <button
                        onClick={() => handleEdit(item.id.toString())}
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
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Puja"
      >
        <PujaForm />
        <button
          onClick={() => setIsAddModalOpen(false)}
          className="text-red-600 hover:text-red-800"
        >
          Close
        </button>
      </Modal>

      <Modal
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
      </Modal>

      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="View Puja"
      >
        {viewPujaId && <ViewPuja id={Number(viewPujaId)} />}
        <button
          onClick={() => setIsViewModalOpen(false)}
          className="text-red-600 hover:text-red-800"
        >
          Close
        </button>
      </Modal>
    </Layout>
  );
}
