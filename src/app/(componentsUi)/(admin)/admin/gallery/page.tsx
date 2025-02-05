"use client";

import React, { useState, useEffect } from "react";
import { FiSearch, FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../../layout";
import Modal from "./Modal";
import CreateGallery from "./CreateGallery";
import EditGallery from "./EditGallery";

interface Gallery {
  id: number;
  image: string;
  galleryCategoryId: number;
  popularity: number;
  status: string;
}

const GalleryManagement: React.FC = () => {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [selectedGalleryIds, setSelectedGalleryIds] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [selectedGallery, setSelectedGallery] = useState<Gallery | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);

  const API_ENDPOINT = "/api/gallery"; // Replace with your actual API endpoint

  // Fetch galleries
  const fetchGalleries = async (searchQuery: string = "") => {
    try {
      const response = await fetch(`${API_ENDPOINT}?search=${searchQuery}`);
      if (!response.ok) throw new Error("Failed to fetch galleries");
      const data = await response.json();
      setGalleries(data);
    } catch (error) {
      console.error("Error fetching galleries:", error);
      toast.error("Failed to fetch galleries");
    }
  };

  useEffect(() => {
    fetchGalleries();
  }, []);

  // Handle search
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchTerm(query);
    fetchGalleries(query);
  };

  // Handle select/deselect gallery
  const handleSelectGallery = (id: number) => {
    setSelectedGalleryIds((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id]
    );
  };

  // Bulk delete selected galleries
  const handleBulkDelete = async () => {
    if (selectedGalleryIds.length === 0) {
      toast.warning("Please select galleries to delete");
      return;
    }

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selectedGalleryIds }),
      });

      if (!response.ok) throw new Error("Failed to delete galleries");

      toast.success("Selected galleries deleted successfully");
      setGalleries((prev) =>
        prev.filter((gallery) => !selectedGalleryIds.includes(gallery.id))
      );
      setSelectedGalleryIds([]);
    } catch (error) {
      console.error("Error deleting galleries:", error);
      toast.error("Failed to delete galleries");
    }
  };

  // Delete single gallery
  const handleDeleteSingle = async (id: number) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete gallery");

      toast.success("Gallery deleted successfully");
      setGalleries((prev) => prev.filter((gallery) => gallery.id !== id));
    } catch (error) {
      console.error("Error deleting gallery:", error);
      toast.error("Failed to delete gallery");
    }
  };

  return (
    <Layout>
      <ToastContainer />
      <div className="min-h-screen bg-gray-100 p-6">
        {/* Header Section */}
        <div className="bg-white p-4 rounded shadow mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Manage Gallery</h1>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <IoMdAdd className="mr-2" />
              Add Gallery
            </button>
          </div>
          <div className="relative mt-4">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search galleries..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        {/* Gallery Listings Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    onChange={() =>
                      setSelectedGalleryIds(
                        selectedGalleryIds.length === galleries.length
                          ? []
                          : galleries.map((gallery) => gallery.id)
                      )
                    }
                    checked={selectedGalleryIds.length === galleries.length}
                  />
                </th>
                <th className="px-6 py-3">SN.</th>
                <th className="px-6 py-3">Image</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Popularity</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {galleries.map((gallery, index) => (
                <tr key={gallery.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedGalleryIds.includes(gallery.id)}
                      onChange={() => handleSelectGallery(gallery.id)}
                    />
                  </td>
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">
                    <img
                      src={gallery.image}
                      alt="Gallery Thumbnail"
                      className="w-20 h-20 object-cover rounded"
                    />
                  </td>
                  <td className="px-6 py-4">{gallery.galleryCategoryId}</td>
                  <td className="px-6 py-4">{gallery.popularity}</td>
                  <td className="px-6 py-4">{gallery.status}</td>
                  <td className="px-6 py-4 flex space-x-2">
                    <button
                      className="p-1 text-green-600"
                      onClick={() => {
                        setSelectedGallery(gallery);
                        setIsViewModalOpen(true);
                      }}
                    >
                      <FiEye />
                    </button>
                    <button
                      className="p-1 text-blue-600"
                      onClick={() => {
                        setSelectedGallery(gallery);
                        setIsEditModalOpen(true);
                      }}
                    >
                      <FiEdit />
                    </button>
                    <button
                      className="p-1 text-red-600"
                      onClick={() => handleDeleteSingle(gallery.id)}
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

      {/* Add Gallery Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Gallery"
      >
        <CreateGallery onClose={() => setIsAddModalOpen(false)} />
      </Modal>

      {selectedGallery && isEditModalOpen && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title={`Edit ${selectedGallery.id}`}
        >
          <EditGallery
            gallery={selectedGallery}
            onClose={() => setIsEditModalOpen(false)}
            onUpdate={(updatedGallery) => {
              setGalleries((prev) =>
                prev.map((gallery) =>
                  gallery.id === updatedGallery.id ? updatedGallery : gallery
                )
              );
            }}
          />
        </Modal>
      )}
    </Layout>
  );
};

export default GalleryManagement;
