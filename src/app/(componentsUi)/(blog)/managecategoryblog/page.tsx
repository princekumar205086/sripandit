"use client";
import React, { useEffect, useState } from "react";
import Section from "../../(home)/pujaservice/section";

type Category = {
  id: number;
  category_name: string;
  category_slug: string;
  meta_title: string | null;
  meta_keyword: string | null;
  meta_description: string | null;
  publication_status: boolean;
};

export default function Page() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/blogcategory");
        if (!response.ok) {
          throw new Error("Failed to fetch categories.");
        }
        const data: Category[] = await response.json();
        setCategories(data);
        setFilteredCategories(data); // Initialize with all categories
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const deleteCategory = async (id: number) => {
    if (!confirm("Are you sure you want to delete this category?")) {
      return;
    }

    try {
      const response = await fetch(`/api/blogcategory/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete category.");
      }

      setCategories(categories.filter((category) => category.id !== id));
      setFilteredCategories(filteredCategories.filter((category) => category.id !== id)); // Update filtered list
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Handle search input change
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = categories.filter((category) =>
      category.category_name.toLowerCase().includes(query)
    );
    setFilteredCategories(filtered);
  };

  return (
    <>
      <Section
        bgImageUrl="/image/blg.jpeg"
        title="Okpuja Blog"
        description="Read our latest blog posts and stay updated with the latest trends. We cover a wide range of topics including astrology, puja services, and more."
      />
      <div className="container mx-auto p-6">
        <div className="bg-white p-6 rounded-lg border shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Category List</h2>

          {/* Search Input */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by Category Name"
              value={searchQuery}
              onChange={handleSearch}
              className="p-2 border border-gray-300 rounded-md w-full"
            />
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : filteredCategories.length === 0 ? (
            <p>No categories found.</p>
          ) : (
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Category Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Slug
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Meta Title
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Meta Keyword
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Meta Description
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Publication Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map((category) => (
                  <tr key={category.id} className="border-b">
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {category.category_name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {category.category_slug}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {category.meta_title || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {category.meta_keyword || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {category.meta_description || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {category.publication_status ? "Published" : "Unpublished"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <button className="text-blue-500 hover:text-blue-600 mr-2">
                        Edit
                      </button>
                      <button
                        onClick={() => deleteCategory(category.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
