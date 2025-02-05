"use client";
import React, { useState } from "react";
import Section from "../../(home)/pujaservice/section";

export default function Page() {
  const [formData, setFormData] = useState({
    user_id: 10,
    category_name: "",
    meta_title: "",
    meta_keyword: "",
    meta_description: "",
    publication_status: "TRUE",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.category_name || !formData.user_id) {
      alert("Category Name and User ID are required.");
      return;
    }
    try {
      const response = await fetch("/api/blogcategory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        alert("Category saved successfully!");
        setFormData({
          user_id: 10,
          category_name: "",
          meta_title: "",
          meta_keyword: "",
          meta_description: "",
          publication_status: "TRUE",
        });
      } else {
        alert(`Failed to save category: ${result.error}`);
      }
    } catch (error) {
      console.error("Error saving category:", error);
      alert("An error occurred while saving the category.");
    }
  };

  return (
    <>
      <Section
        bgImageUrl="/image/blg.jpeg"
        title="Okpuja Blog"
        description="Read our latest blog posts and stay updated with the latest trends. We cover a wide range of topics including astrology, puja services, and more."
      />
      <div className="p-5 border rounded-lg shadow-md mt-10 max-w-lg mx-auto bg-white mb-4">
        <h2 className="text-2xl font-bold text-center mb-5">Category Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="category_name" className="block text-sm font-medium text-gray-700">
              Category Name
            </label>
            <input
              type="text"
              id="category_name"
              name="category_name"
              value={formData.category_name}
              onChange={handleChange}
              placeholder="Enter Category Name"
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="meta_title" className="block text-sm font-medium text-gray-700">
              Meta Title
            </label>
            <input
              type="text"
              id="meta_title"
              name="meta_title"
              value={formData.meta_title}
              onChange={handleChange}
              placeholder="Enter Meta Title"
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="meta_keyword" className="block text-sm font-medium text-gray-700">
              Meta Keywords
            </label>
            <input
              type="text"
              id="meta_keyword"
              name="meta_keyword"
              value={formData.meta_keyword}
              onChange={handleChange}
              placeholder="Enter Meta Keywords"
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="meta_description" className="block text-sm font-medium text-gray-700">
              Meta Description
            </label>
            <textarea
              id="meta_description"
              name="meta_description"
              value={formData.meta_description}
              onChange={handleChange}
              placeholder="Enter Meta Description"
              rows={4}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="publication_status" className="block text-sm font-medium text-gray-700">
              Publication Status
            </label>
            <select
              id="publication_status"
              name="publication_status"
              value={formData.publication_status}
              onChange={handleChange}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
            >
              <option value="TRUE">Published</option>
              <option value="FALSE">Unpublished</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-orange-500 text-white p-3 w-full rounded-lg hover:bg-orange-600"
          >
            Save Category
          </button>
        </form>
      </div>
    </>
  );
}
