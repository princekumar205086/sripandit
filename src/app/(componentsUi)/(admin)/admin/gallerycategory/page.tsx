"use client";

import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { FiSearch, FiEdit, FiTrash2 } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import Layout from "../../layout";
import CreateGalleryCategory from "./CreateGalleryCategory";

import Modal from "./Modal";

interface GalleryCategory {
  id: number;
  title: string;
  status: string;
}

const ManageGalleryCategories: React.FC = () => {
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] =
    useState<GalleryCategory | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  const API_ENDPOINT = "/api/gallerycategory";

  // Fetch categories from the server
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async (searchQuery: string = "") => {
    try {
      const response = await fetch(`${API_ENDPOINT}?search=${searchQuery}`);
      if (!response.ok) throw new Error("Failed to fetch categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to fetch categories");
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    fetchCategories(event.target.value);
  };

  const handleSelectCategory = (id: number) => {
    setSelectedCategoryIds((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id]
    );
  };

  const handleBulkDelete = async () => {
    if (selectedCategoryIds.length === 0) {
      toast.warning("Please select categories to delete");
      return;
    }

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selectedCategoryIds }),
      });

      if (!response.ok) throw new Error("Failed to delete categories");

      toast.success("Selected categories deleted successfully");
      setCategories((prev) =>
        prev.filter((category) => !selectedCategoryIds.includes(category.id))
      );
      setSelectedCategoryIds([]);
    } catch (error) {
      console.error("Error deleting categories:", error);
      toast.error("Failed to delete categories");
    }
  };

  const handleDeleteSingle = async (categoryId: number) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/${categoryId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to delete category");

      toast.success("Category deleted successfully");
      setCategories((prev) =>
        prev.filter((category) => category.id !== categoryId)
      );
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete category");
    }
  };

  return (
    <Layout>
      <ToastContainer />
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="bg-white p-4 rounded shadow mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Manage Gallery Categories</h1>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <IoMdAdd className="mr-2" /> Add Category
          </button>
        </div>

        <div className="relative mb-4">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search categories..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    onChange={() =>
                      setSelectedCategoryIds(
                        selectedCategoryIds.length === categories.length
                          ? []
                          : categories.map((category) => category.id)
                      )
                    }
                    checked={selectedCategoryIds.length === categories.length}
                  />
                </th>
                <th className="px-6 py-3">SN.</th>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={category.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedCategoryIds.includes(category.id)}
                      onChange={() => handleSelectCategory(category.id)}
                    />
                  </td>
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{category.title}</td>
                  <td className="px-6 py-4">{category.status}</td>
                  <td className="px-6 py-4 flex space-x-2">
                    <button
                      className="p-1 text-blue-600"
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsEditModalOpen(true);
                      }}
                    >
                      <FiEdit />
                    </button>
                    <button
                      className="p-1 text-red-600"
                      onClick={() => handleDeleteSingle(category.id)}
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4">
          <button
            onClick={handleBulkDelete}
            className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
          >
            Delete Selected Categories
          </button>
        </div>
      </div>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Gallery Category"
      >
        <CreateGalleryCategory
          onClose={() => setIsAddModalOpen(false)}
          onCategoryAdded={() => fetchCategories()}
        />
      </Modal>
    </Layout>
  );
};

export default ManageGalleryCategories;
