"use client";
import CryptoJS from "crypto-js";
import React, { useEffect, useState } from "react";
import Section from "../pujaservice/section";
import Image from "next/image";
import Link from "next/link";
import { FaClock, FaUser, FaEye, FaComments } from "react-icons/fa";
import { TiArrowRight } from "react-icons/ti";
import { fetchblogdata, fetchCategories } from "./action";
import slugify from "slugify";

interface BlogPost {
  id: number;
  post_slug: string;
  post_title: string;
  featured_image: string;
  createdAt: string;
  user: { name: string };
  view_count: number;
  blogComments: Array<any>;
  post_description: string;
  categories: { category_slug: string; category_name: string }[];
}

interface BlogCategory {
  id: number;
  category_name: string;
  category_slug: string;
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 9;

  const encryptId = (id: number) => {
    const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY || "default-secret-key";
    return encodeURIComponent(CryptoJS.AES.encrypt(id.toString(), secretKey).toString());
  };

  useEffect(() => {
    const getBlogData = async () => {
      try {
        const blogPosts = await fetchblogdata();
        setPosts(blogPosts);
        setFilteredPosts(blogPosts); // Initialize filteredPosts with all posts
      } catch (error) {
        setError("Failed to load blog posts");
        console.error(error);
      }
    };

    const getCategoriesData = async () => {
      try {
        const categoryData = await fetchCategories();
        setCategories(categoryData.slice(0, 5)); // Limit to 5 categories
      } catch (error) {
        setError("Failed to load categories");
        console.error(error);
      }
    };

    getBlogData();
    getCategoriesData();
  }, []);

  useEffect(() => {
    let filtered = posts;

    // Apply search filter
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(
        (post) =>
          post.post_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.post_description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory !== "") {
      filtered = filtered.filter((post) =>
        post.categories?.some((category) => category.category_slug === selectedCategory)
      );
    }

    setFilteredPosts(filtered);
  }, [searchQuery, selectedCategory, posts]);

  const handleCategoryClick = (categorySlug: string, event: React.MouseEvent) => {
    event.preventDefault(); // Prevent default link behavior (scroll to top)
    setSelectedCategory(categorySlug);
  };

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Section
        bgImageUrl="image/blg.jpeg"
        title="Okpuja Blog"
        description="Read our latest blog posts and stay updated with the latest trends. We cover a wide range of topics including astrology, puja services, and more."
      />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-gray-600 text-center"></div>

        {error && (
          <div className="text-center text-red-500 py-8">
            <p>{error}</p>
          </div>
        )}

        {/* Responsive Flex Layout for Search and Categories */}
        <div className="flex flex-wrap justify-between items-center mb-6 space-y-4 sm:space-y-0">
          {/* Search Bar (Left Side) */}
          <div className="w-full sm:w-1/2 lg:w-1/3">
            <input
              type="text"
              placeholder="Search blog posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Category Filter (Right Side, Dropdown on Mobile) */}
          <div className="w-full sm:w-1/2 lg:w-1/3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.category_slug}>
                  {category.category_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Display Blog Posts */}
        {currentPosts.length === 0 && !error ? (
          <div className="text-center text-gray-500 py-8">
            <p>No blog posts available at the moment. Please check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentPosts.map((post: BlogPost, index: number) => (
              <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="relative">
                  <Link href={`/blog/${slugify(post.post_title)}?id=${encodeURIComponent(
                              encryptId(post.id)
                            )}`}>
                    <Image
                      className="w-full h-56 object-cover"
                      src={post.featured_image}
                      alt={`Post Title ${index + 1}`}
                      width={500}
                      height={400}
                    />
                  </Link>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-3 text-orange-500">
                    <Link href={`/blog/${encryptId(post.id)}`} className="text-orange-500 hover:underline">
                      {post.post_title}
                    </Link>
                  </h2>
                  <ul className="flex items-center text-sm text-gray-500 space-x-4 mb-5">
                    <li>
                      <FaClock /> {new Date(post.createdAt).toLocaleDateString()}
                    </li>
                    <li>
                      <FaUser /> {post.user?.name || "Unknown Author"}
                    </li>
                  </ul>
                  <ul className="flex items-center text-sm text-gray-500 space-x-4 mb-5">
                    <li>
                      <FaEye /> {post.view_count || 0}
                    </li>
                    <li>
                      <FaComments /> {post.blogComments?.length || 0}
                    </li>
                  </ul>
                  <p className="text-sm text-gray-700 mb-5">{post.post_description}</p>
                  <Link href={`/blog/${encryptId(post.id)}`} className="text-orange-500 hover:underline text-sm">
                    Read more <TiArrowRight />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <nav className="inline-flex rounded-md shadow">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 border border-gray-300 ${
                    currentPage === index + 1 ? "bg-orange-500 text-white" : "bg-white text-gray-700"
                  } hover:bg-gray-50`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
              >
                Next
              </button>
            </nav>
          </div>
        )}
      </div>
    </>
  );
}