"use client";
import React, { useState, useEffect } from "react";
import Section from "../pujaservice/section";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaClock,
  FaUser,
  FaEye,
  FaComments,
  FaThumbsUp,
  FaSearch,
  FaTags,
  FaCalendarAlt,
  FaBookmark,
  FaShare,
  FaArrowUp,
  FaFilter,
} from "react-icons/fa";
import { TiArrowRight } from "react-icons/ti";

export default function Blog() {
  // Define postData before using it in any function
  const postData = [
    {
      image: "/image/satnarayan.png",
      title: "Satyanarayan Pooja Guide 2025",
      date: "01 January 2025",
      author: "Saurav",
      views: 125,
      comments: 8,
      description:
        "Satyanarayan Puja is performed to appease Lord Vishnu or Narayana, the preserver of this whole creation.",
      category: "Rituals",
    },
    {
      image: "/image/ganpati.png",
      title: "Ganesh Chaturthi Puja Guide 2025",
      date: "10 February 2025",
      author: "Amit",
      views: 150,
      comments: 12,
      description:
        "Celebrate Ganesh Chaturthi with the most auspicious rituals and blessings from Lord Ganesha.",
      category: "Festivals",
    },
    {
      image: "/image/shivratri.png",
      title: "Laxmi Puja for Prosperity 2025",
      date: "15 March 2025",
      author: "Priya",
      views: 200,
      comments: 25,
      description:
        "Perform Laxmi Puja for wealth and prosperity during the festival of Diwali.",
      category: "Prosperity",
    },
    {
      image: "/image/hawan.jpeg",
      title: "Kumari Puja Rituals and Significance",
      date: "25 April 2025",
      author: "Rajesh",
      views: 95,
      comments: 5,
      description:
        "Kumari Puja is a special ritual dedicated to the worship of young girls in Nepal and India.",
      category: "Culture",
    },
    {
      image: "/image/select puja.jpeg",
      title: "Maha Shivaratri Puja Rituals",
      date: "01 March 2025",
      author: "Anita",
      views: 300,
      comments: 45,
      description:
        "Maha Shivaratri is one of the most significant Hindu festivals dedicated to Lord Shiva.",
      category: "Festivals",
    },
    {
      image: "/image/book pandit jee.jpeg",
      title: "Complete Guide to Puja Services",
      date: "01 April 2025",
      author: "Vikram",
      views: 180,
      comments: 10,
      description:
        "Learn everything about different types of puja services available for every occasion.",
      category: "Guides",
    },
  ];

  const popularPosts = [
    {
      image: "/image/ganpati.png",
      title: "Popular Ganesh Chaturthi Guide",
      date: "15 Feb 2025",
    },
    {
      image: "/image/shivratri.png",
      title: "Top Maha Shivaratri Rituals",
      date: "03 Mar 2025",
    },
    {
      image: "/image/select puja.jpeg",
      title: "Best Laxmi Puja Services",
      date: "22 Jan 2025",
    },
  ];

  const categories = [
    "Festivals",
    "Rituals",
    "Guides",
    "Prosperity",
    "Culture",
    "Astrology",
  ];

  // State management for blog functionality
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [savedPosts, setSavedPosts] = useState<number[]>([]);
  const [emailSubscription, setEmailSubscription] = useState("");
  const [subscriptionStatus, setSubscriptionStatus] = useState<
    null | "success" | "error"
  >(null);

  // Handle scroll to top functionality
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle post saving (mimics functionality without actual storage)
  const toggleSavePost = (index: number) => {
    if (savedPosts.includes(index)) {
      setSavedPosts(savedPosts.filter((id) => id !== index));
    } else {
      setSavedPosts([...savedPosts, index]);
    }
  };

  // Filter posts based on search and category - Now postData is defined before this function
  const filterPosts = () => {
    let filtered = [...postData]; // This is now valid

    if (searchQuery) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }

    return filtered;
  };

  // Calculate filtered posts
  const filteredPosts = filterPosts();
  const postsPerPage = 4;
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailSubscription || !emailSubscription.includes("@")) {
      setSubscriptionStatus("error");
      return;
    }

    // Simulate API call
    setSubscriptionStatus(null); // Loading state
    setTimeout(() => {
      setSubscriptionStatus("success");
      setEmailSubscription("");
    }, 1000);
  };

  // Safe share function that checks for navigator compatibility
  const sharePost = () => {
    try {
      if (navigator.share) {
        navigator.share({
          title: "Check out this article from Okpuja",
          text: "I found this interesting article on Okpuja blog",
          url: window.location.href,
        });
      } else {
        navigator.clipboard.writeText(window.location.href);
        // You could add a toast/notification here
      }
    } catch (error) {
      console.error("Error sharing:", error);
      // Fallback
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <>
      <Section
        bgImageUrl="/image/blg.jpeg"
        title="Okpuja Blog"
        description="Read our latest blog posts and stay updated with the latest trends. We cover a wide range of topics including astrology, puja services, and more."
      />

      <div className="bg-gradient-to-b from-cream/70 to-white py-10 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Advanced search and filter bar */}
          <div className="mb-8 bg-white rounded-xl shadow-md p-4 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                />
                <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <select
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent appearance-none"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("");
                    setCurrentPage(1); // Reset to first page when clearing filters
                  }}
                  className="px-4 py-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                  title="Clear filters"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Advanced filters - toggleable on mobile */}
            <div className="mt-4 md:hidden">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center justify-center w-full py-2 text-gray-600 hover:text-orange-500 transition-colors"
              >
                <FaFilter className="mr-2" />
                {isFilterOpen ? "Hide Filters" : "Show Advanced Filters"}
              </button>

              <AnimatePresence>
                {isFilterOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden mt-2"
                  >
                    <div className="pt-3 border-t border-gray-100">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-1 block">
                            Date Range
                          </label>
                          <select className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm">
                            <option>Last 30 days</option>
                            <option>Last 3 months</option>
                            <option>Last year</option>
                            <option>All time</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-1 block">
                            Sort By
                          </label>
                          <select className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm">
                            <option>Newest first</option>
                            <option>Oldest first</option>
                            <option>Most popular</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <main className="lg:w-2/3">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                    Latest Articles
                  </h2>
                  <div className="w-20 h-1 bg-orange-500 rounded-full mb-2"></div>
                  {filteredPosts.length > 0 ? (
                    <p className="text-sm text-gray-500">
                      Showing {currentPosts.length} of {filteredPosts.length}{" "}
                      article
                      {filteredPosts.length !== 1 ? "s" : ""}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-500">
                      No articles found matching your criteria
                    </p>
                  )}
                </div>

                {/* Desktop filter options */}
                <div className="hidden md:flex items-center gap-3">
                  <span className="text-sm text-gray-500">Sort by:</span>
                  <select className="px-2 py-1 rounded border border-gray-200 text-sm">
                    <option>Newest</option>
                    <option>Oldest</option>
                    <option>Popular</option>
                  </select>
                </div>
              </div>

              {filteredPosts.length > 0 ? (
                <motion.div
                  key={`${searchQuery}-${selectedCategory}-${currentPage}`}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8"
                >
                  {currentPosts.map((post, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
                    >
                      <div className="relative">
                        <Link href="#" className="block">
                          <div className="relative aspect-[16/9] overflow-hidden">
                            <Image
                              className="object-cover transition-transform duration-500 hover:scale-105"
                              src={post.image}
                              alt={post.title}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                          </div>
                          <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg">
                            {post.category}
                          </div>
                        </Link>
                        {/* Save post button */}
                        <button
                          onClick={() => toggleSavePost(index)}
                          className="absolute top-2 left-2 bg-white/90 p-2 rounded-full shadow-md hover:bg-white transition-colors"
                          aria-label={
                            savedPosts.includes(index)
                              ? "Unsave post"
                              : "Save post"
                          }
                        >
                          <FaBookmark
                            className={`text-sm ${
                              savedPosts.includes(index)
                                ? "text-orange-500"
                                : "text-gray-400"
                            }`}
                          />
                        </button>
                      </div>

                      <div className="p-5 sm:p-6 flex-grow flex flex-col">
                        <h2 className="text-xl font-bold mb-3 line-clamp-2 hover:text-orange-500 transition-colors">
                          <Link href="#">{post.title}</Link>
                        </h2>

                        <div className="flex flex-wrap text-xs text-gray-500 mb-4 gap-x-4 gap-y-2">
                          <div className="flex items-center">
                            <FaClock className="mr-1.5" /> {post.date}
                          </div>
                          <div className="flex items-center">
                            <FaUser className="mr-1.5" /> {post.author}
                          </div>
                          <div className="flex items-center">
                            <FaEye className="mr-1.5" /> {post.views}
                          </div>
                          <div className="flex items-center">
                            <FaComments className="mr-1.5" /> {post.comments}
                          </div>
                        </div>

                        <p className="text-gray-700 text-sm mb-4 line-clamp-3 flex-grow">
                          {post.description}
                        </p>

                        <div className="flex justify-between items-center mt-2">
                          <Link
                            href="#"
                            className="inline-flex items-center text-orange-500 font-medium hover:text-orange-600 transition-colors text-sm"
                          >
                            Read more <TiArrowRight className="ml-1" />
                          </Link>

                          {/* Share button */}
                          <button
                            onClick={sharePost}
                            className="p-1.5 rounded-full text-gray-400 hover:text-orange-500 hover:bg-orange-50 transition-colors"
                            title="Share this article"
                          >
                            <FaShare className="text-sm" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="bg-white shadow-md rounded-xl p-8 text-center">
                  <div className="flex justify-center mb-4">
                    <FaSearch className="text-4xl text-gray-300" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-700 mb-2">
                    No results found
                  </h3>
                  <p className="text-gray-500 mb-6">
                    We couldn't find any articles matching your search criteria.
                    Try different keywords or browse all articles.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("");
                      setCurrentPage(1);
                    }}
                    className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    View all articles
                  </button>
                </div>
              )}

              {/* Enhanced Pagination */}
              {filteredPosts.length > postsPerPage && (
                <div className="mt-10">
                  <div className="flex flex-col sm:flex-row items-center justify-between">
                    <p className="text-sm text-gray-500 mb-4 sm:mb-0">
                      Page {currentPage} of {totalPages}
                    </p>
                    <nav className="inline-flex rounded-lg shadow-md">
                      <button
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                        className={`px-4 py-2 border border-gray-200 rounded-l-lg transition-colors ${
                          currentPage === 1
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-white text-orange-500 hover:bg-orange-500 hover:text-white"
                        }`}
                      >
                        Previous
                      </button>

                      {/* Pagination numbers */}
                      <div className="hidden sm:flex">
                        {[...Array(totalPages)].map((_, i) => (
                          <button
                            key={i + 1}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-4 py-2 border-t border-b border-gray-200 ${
                              currentPage === i + 1
                                ? "bg-orange-500 border-orange-500 text-white font-medium"
                                : "bg-white text-orange-500 hover:bg-orange-50"
                            }`}
                          >
                            {i + 1}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages)
                          )
                        }
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 border border-gray-200 rounded-r-lg transition-colors ${
                          currentPage === totalPages
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-white text-orange-500 hover:bg-orange-500 hover:text-white"
                        }`}
                      >
                        Next
                      </button>
                    </nav>
                  </div>
                </div>
              )}
            </main>

            {/* Enhanced Sidebar */}
            <aside className="lg:w-1/3">
              {/* Featured Post */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
                <div className="relative h-48">
                  <Image
                    src="/image/satnarayan.png"
                    alt="Featured Post"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20"></div>
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded inline-block mb-2">
                      Featured
                    </span>
                    <h3 className="text-white text-xl font-bold mb-2">
                      Ultimate Guide to Vedic Rituals
                    </h3>
                    <div className="flex items-center text-white/80 text-xs">
                      <FaCalendarAlt className="mr-1.5" /> 05 May 2025
                    </div>
                  </div>
                </div>
              </div>

              {/* Popular Posts */}
              <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                  <FaThumbsUp className="mr-2 text-orange-500" /> Most Popular
                  Posts
                </h4>

                <div className="space-y-5">
                  {popularPosts.map((post, index) => (
                    <div key={index} className="flex items-center gap-4 group">
                      <span className="text-xl font-bold text-gray-300 group-hover:text-orange-500 transition-colors">
                        {index + 1}
                      </span>
                      <div className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="80px"
                        />
                      </div>
                      <div className="flex-grow">
                        <h5 className="font-medium text-sm sm:text-base line-clamp-2 group-hover:text-orange-500 transition-colors">
                          <Link href="#">{post.title}</Link>
                        </h5>
                        <p className="text-xs text-gray-500 mt-1 flex items-center">
                          <FaClock className="mr-1.5" /> {post.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                  <FaTags className="mr-2 text-orange-500" /> Categories
                </h4>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      setSelectedCategory("");
                      setCurrentPage(1);
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === ""
                        ? "bg-orange-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-orange-500 hover:text-white"
                    }`}
                  >
                    All
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setCurrentPage(1);
                      }}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedCategory === category
                          ? "bg-orange-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-orange-500 hover:text-white"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Enhanced Newsletter Subscription */}
              <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-md p-6 mb-8">
                <h4 className="text-xl font-bold text-white mb-4">
                  Subscribe to our Newsletter
                </h4>
                <p className="text-white/80 mb-6">
                  Get the latest articles and updates delivered straight to your
                  inbox.
                </p>
                <form onSubmit={handleSubscribe} className="flex items-center">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={emailSubscription}
                    onChange={(e) => setEmailSubscription(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-white text-orange-500 rounded-lg ml-2 hover:bg-orange-500 hover:text-white transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
                {subscriptionStatus === "success" && (
                  <p className="text-white mt-2">Thank you for subscribing!</p>
                )}
                {subscriptionStatus === "error" && (
                  <p className="text-white mt-2">
                    Please enter a valid email address.
                  </p>
                )}
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 bg-orange-500 text-white p-3 rounded-full shadow-lg hover:bg-orange-600 transition-colors z-50"
          title="Scroll to top"
        >
          <FaArrowUp />
        </button>
      )}
    </>
  );
}
