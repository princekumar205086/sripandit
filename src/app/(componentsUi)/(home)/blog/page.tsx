"use client";
import React, { useEffect, useState } from "react";
import Section from "../pujaservice/section";
import Image from "next/image";
import Link from "next/link";
import { FaClock, FaUser, FaEye, FaComments } from "react-icons/fa";
import { TiArrowRight } from "react-icons/ti";
import { fetchblogdata, fetchCategories } from "./action";
import { useRouter } from "next/navigation";

interface BlogPost {
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
    event.preventDefault();  // Prevent default link behavior (scroll to top)
    setSelectedCategory(categorySlug);
  };

  return (
    <>
      <Section
        bgImageUrl="image/blg.jpeg"
        title="Okpuja Blog"
        description="Read our latest blog posts and stay updated with the latest trends. We cover a wide range of topics including astrology, puja services, and more."
      />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-gray-600 text-center">
        </div>

        {error && (
          <div className="text-center text-red-500 py-8">
            <p>{error}</p>
          </div>
        )}

        <div className="flex justify-between mb-6">
          {/* Category Filter as Left Side */}
          <div className="flex space-x-4 flex-wrap">
            <Link
              href="/blog"
              className={`px-4 py-2 border rounded-md text-sm font-medium ${selectedCategory === "" ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-700"}`}
              onClick={(e) => handleCategoryClick("", e)} 
            >
              All Categories
            </Link>

            {categories.map((category, index) => (
              <Link
                key={index}
                href={`/blog?category=${category.category_slug}`}
                className={`px-4 py-2 border rounded-md text-sm font-medium ${selectedCategory === category.category_slug ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-700"}`}
                onClick={(e) => handleCategoryClick(category.category_slug, e)} // Prevent scroll to top
              >
                {category.category_name}
              </Link>
            ))}
          </div>

          {/* Search Bar as Right Side */}
          <div className="w-1/3">
            <input
              type="text"
              placeholder="Search blog posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        {filteredPosts.length === 0 && !error ? (
          <div className="text-center text-gray-500 py-8">
            <p>No blog posts available at the moment. Please check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPosts.map((post: BlogPost, index: number) => (
              <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="relative">
                  <Link href={`/blog/${post.post_slug}`}>
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
                    <Link href={`/blog/${post.post_slug}`} className="text-orange-500 hover:underline">
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
                  <Link href={`/blog/${post.post_slug}`} className="text-orange-500 hover:underline text-sm">
                    Read more <TiArrowRight />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
