"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { IoMdAdd } from "react-icons/io";

interface CreateGalleryProps {
  onClose: () => void;
}

const CreateGallery: React.FC<CreateGalleryProps> = ({ onClose }) => {
  const [image, setImage] = useState<File | null>(null);
  const [galleryCategoryId, setGalleryCategoryId] = useState<string>("");
  const [popularity, setPopularity] = useState<string>("0");
  const [status, setStatus] = useState<string>("active");
  const [loading, setLoading] = useState<boolean>(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image || !galleryCategoryId) {
      toast.warning("Please fill out all fields.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("image", image);
    formData.append("galleryCategoryId", galleryCategoryId);
    formData.append("popularity", popularity);
    formData.append("status", status);

    try {
      const response = await fetch("/api/gallery", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        // Reset the form and notify the parent component
        setImage(null);
        setGalleryCategoryId("");
        setPopularity("0");
        setStatus("active");
        onClose();  // Close the modal upon success
      } else {
        toast.error(data.error || "Failed to create gallery");
      }
    } catch (error) {
      toast.error("An error occurred while creating the gallery");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg w-full mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Gallery Category</label>
            <input
              type="text"
              value={galleryCategoryId}
              onChange={(e) => setGalleryCategoryId(e.target.value)}
              placeholder="Enter category ID"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Popularity</label>
            <input
              type="number"
              value={popularity}
              onChange={(e) => setPopularity(e.target.value)}
              min="0"
              max="5"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Image</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className={`px-4 py-2 text-white rounded-lg ${loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
              disabled={loading}
            >
              {loading ? "Uploading..." : "Add Gallery"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGallery;
