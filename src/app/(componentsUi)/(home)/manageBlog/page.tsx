"use client";
import React, { useEffect, useState } from "react";
import Section from "../../(home)/pujaservice/section";
import { fetchblogdata, updateBlogPost, deleteBlogPost } from "../blog/action"; // Assuming updateBlogPost and deleteBlogPost functions
import { Status } from "@prisma/client";

interface BlogPost {
  id: number;
  post_title: string;
  post_slug: string;
  post_description: string;
  featured_image: string;
  publication_status: Status;
  user_id: number;
  category_id: number;
  youtube_url: string;
  is_featured: boolean;
  meta_title: string;
  meta_description: string;
  view_count: number;
  meta_keyword: string;
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 4;

  useEffect(() => {
    const getBlogData = async () => {
      try {
        const blogPosts = await fetchblogdata();
        setPosts(blogPosts);
        setFilteredPosts(blogPosts);
      } catch (error) {
        setError("Failed to load blog posts");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getBlogData();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      const filtered = posts.filter((post) =>
        post.post_title.toLowerCase().includes(lowercasedSearchTerm) ||
        post.post_description.toLowerCase().includes(lowercasedSearchTerm)
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  }, [searchTerm, posts]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deleteBlogPost(id);
        setPosts(posts.filter((post) => post.id !== id));
        setFilteredPosts(filteredPosts.filter((post) => post.id !== id));
      } catch (error) {
        setError("Failed to delete blog post");
        console.error(error);
      }
    }
  };

  const handleUpdate = async (updatedPost: BlogPost) => {
    try {
      const updated = await updateBlogPost(updatedPost);
      setPosts(posts.map((post) => (post.id === updatedPost.id ? updatedPost : post)));
      setFilteredPosts(filteredPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post)));
      setEditingPost(null);
    } catch (error) {
      setError("Failed to update blog post");
      console.error("Error updating blog post:", error);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="spinner-border text-blue-500" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>;
  }

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <>
      <Section
        bgImageUrl="/image/blg.jpeg"
        title="Okpuja Blog"
        description="Read our latest blog posts and stay updated with the latest trends."
      />
      <div className="container mx-auto py-4">
        <div className="bg-white p-6 rounded-lg border shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Blog Posts</h2>

          {/* Search Input */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by title or description"
              value={searchTerm}
              onChange={handleSearchChange}
              className="p-2 lg:text-md border border-gray-300 rounded-md w-full"
            />
          </div>

          {/* Responsive Design: Use Cards for Blog Posts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentPosts.map((post) => (
              <div key={post.id} className="bg-white p-4 rounded-lg shadow-md">
                <img
                  src={post.featured_image || "/image/default.jpg"}
                  alt={post.post_title}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold">{post.post_title}</h3>
                <p className="text-sm text-gray-700">{post.post_description}</p>
                <div className="mt-4">
                  <button
                    className="text-blue-500 hover:text-blue-600 mr-2 text-sm"
                    onClick={() => handleEdit(post)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:text-red-600 text-sm"
                    onClick={() => handleDelete(post.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls (Mobile-Optimized) */}
          <div className="flex justify-center mt-6">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 mx-1 border border-gray-300 rounded text-sm"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 mx-1 border border-gray-300 rounded text-sm ${
                  currentPage === index + 1 ? "bg-blue-500 text-white" : ""
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 mx-1 border border-gray-300 rounded text-sm"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Edit Post Modal */}
      {editingPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Edit Blog Post</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={editingPost.post_title}
                onChange={(e) => setEditingPost({ ...editingPost, post_title: e.target.value })}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Image</label>
              <input
                type="text"
                value={editingPost.featured_image}
                onChange={(e) => setEditingPost({ ...editingPost, featured_image: e.target.value })}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={editingPost.post_description}
                onChange={(e) =>
                  setEditingPost({ ...editingPost, post_description: e.target.value })
                }
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => setEditingPost(null)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => handleUpdate(editingPost)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogPostPage;
