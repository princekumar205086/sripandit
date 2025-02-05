"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";

interface CreateGalleryCategoryProps {
  onClose: () => void;
  onCategoryAdded?: () => void;
}

const CreateGalleryCategory: React.FC<CreateGalleryCategoryProps> = ({ onClose, onCategoryAdded }) => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const API_ENDPOINT = "/api/gallerycategory";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !status) {
      toast.warning("Please fill out all fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, status }),
      });

      if (!response.ok) throw new Error("Failed to create gallery category");

      toast.success("Gallery category added successfully!");
      setTitle("");
      setStatus("");
      onCategoryAdded && onCategoryAdded();
      onClose();
    } catch (error) {
      console.error("Error creating gallery category:", error);
      toast.error("Failed to add gallery category. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Category Title</label>
        <input
          type="text"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter category title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Status</label>
        <select
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="">Select status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="mt-6 flex justify-end space-x-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={`px-4 py-2 text-white rounded-lg ${loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
          disabled={loading}
        >
          {loading ? "Saving..." : "Add Category"}
        </button>
      </div>
    </form>
  );
};

export default CreateGalleryCategory;
