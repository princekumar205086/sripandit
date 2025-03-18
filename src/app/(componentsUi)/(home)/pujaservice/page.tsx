"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaSearch, FaFilter, FaChevronUp, FaSort } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { getPujaService, getPujaCategory } from "./action";
import Section from "./section";
import slugify from "slugify";
import CryptoJS from "crypto-js";
import "./pujaservice.css";

const PujaServices = () => {
  interface Service {
    id: number;
    title: string;
    img: string;
    category: {
      id: number;
      name: string;
    };
  }

  interface Category {
    id: number;
    name: string;
  }

  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [sortOption, setSortOption] = useState("default");
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [visibleItems, setVisibleItems] = useState(12);

  const filterRef = useRef<HTMLDivElement>(null);

  // Fetching puja services with caching
  const fetchServices = async () => {
    try {
      setLoading(true);
      const cachedServices = sessionStorage.getItem("pujaServices");
      if (cachedServices) {
        const parsedServices = JSON.parse(cachedServices);
        setServices(parsedServices);
        setFilteredServices(parsedServices);
      } else {
        const response = await getPujaService();
        if (response && response.length > 0) {
          const data = response.map((service: Service) => ({
            id: service.id,
            title: service.title,
            img: service.img,
            category: {
              id: service.category.id,
              name: service.category.name,
            },
          }));
          sessionStorage.setItem("pujaServices", JSON.stringify(data));
          setServices(data);
          setFilteredServices(data);
        } else {
          console.error("No data received from getPujaService");
        }
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetching puja categories with caching
  const fetchCategories = async () => {
    try {
      const cachedCategories = sessionStorage.getItem("pujaCategories");
      if (cachedCategories) {
        setCategories(JSON.parse(cachedCategories));
      } else {
        const response = await getPujaCategory();
        if (response && response.length > 0) {
          const data = response.map((category: Category) => ({
            id: category.id,
            name: category.name,
          }));
          sessionStorage.setItem("pujaCategories", JSON.stringify(data));
          setCategories(data);
        } else {
          console.error("No data received from getPujaCategory");
        }
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchServices();
    fetchCategories();
  }, []);

  // Close filters when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setShowFilters(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const encryptId = (id: number) => {
    return CryptoJS.AES.encrypt(id.toString(), "your-secret-key").toString();
  };

  const searchServices = useCallback(() => {
    let filtered = services;

    if (searchValue !== "") {
      filtered = filtered.filter(
        (service: Service) =>
          service.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          service.category.name
            .toLowerCase()
            .includes(searchValue.toLowerCase())
      );
    }

    if (selectedCategory !== "") {
      filtered = filtered.filter(
        (service: Service) =>
          service.category.id.toString() === selectedCategory
      );
    }

    // Apply sorting
    switch (sortOption) {
      case "name-asc":
        filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "name-desc":
        filtered = [...filtered].sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "category":
        filtered = [...filtered].sort((a, b) =>
          a.category.name.localeCompare(b.category.name)
        );
        break;
      default:
        // Keep default order
        break;
    }

    setFilteredServices(filtered);
  }, [searchValue, selectedCategory, services, sortOption]);

  useEffect(() => {
    searchServices();
  }, [searchValue, selectedCategory, sortOption, searchServices]);

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value);
  };

  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === "grid" ? "list" : "grid"));
  };

  const loadMore = () => {
    setVisibleItems((prev) => prev + 8);
  };

  const renderServices = () => {
    if (filteredServices.length === 0) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full py-10 text-center"
        >
          <div className="bg-white/80 rounded-xl p-8 shadow-md max-w-md mx-auto">
            <Image
              src="/image/not-found.svg"
              alt="No results found"
              width={150}
              height={150}
              className="mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No Puja Services Found
            </h3>
            <p className="text-gray-600 mb-4">
              We couldn't find any puja services matching your search criteria.
              Please try different keywords or browse all categories.
            </p>
            <button
              onClick={() => {
                setSearchValue("");
                setSelectedCategory("");
                setSortOption("default");
              }}
              className="bg-redOrange text-white px-5 py-2 rounded-lg hover:bg-redOrange/90 transition-colors duration-300"
            >
              Clear Filters
            </button>
          </div>
        </motion.div>
      );
    }

    const visibleServices = filteredServices.slice(0, visibleItems);

    if (viewMode === "grid") {
      return (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {visibleServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.05,
                ease: "easeOut",
              }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 bg-white"
            >
              <Link
                href={`/pujaservice/${slugify(
                  service.title
                )}?id=${encodeURIComponent(encryptId(service.id))}`}
                className="block h-full"
              >
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <Image
                    alt={service.title}
                    src={service.img || "/uploads/default-puja.jpeg"}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-300 hover:scale-105"
                    quality={80}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <span className="inline-block px-2 py-1 bg-redOrange/90 text-white text-xs rounded-full">
                      {service.category.name}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-sm sm:text-base text-gray-800 mb-1 line-clamp-2 h-10">
                    {service.title}
                  </h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-redOrange font-medium">
                      View Details
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-redOrange"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      );
    } else {
      // List view
      return (
        <div className="space-y-3 sm:space-y-4">
          {visibleServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.05,
                ease: "easeOut",
              }}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Link
                href={`/pujaservice/${slugify(
                  service.title
                )}?id=${encodeURIComponent(encryptId(service.id))}`}
                className="flex flex-col sm:flex-row"
              >
                <div className="relative h-48 sm:h-auto sm:w-48 md:w-64">
                  <Image
                    alt={service.title}
                    src={service.img || "/uploads/default-puja.jpeg"}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover"
                    quality={80}
                  />
                </div>
                <div className="p-4 sm:p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <span className="inline-block px-2 py-1 bg-redOrange/10 text-redOrange text-xs rounded-full mb-2">
                      {service.category.name}
                    </span>
                    <h3 className="font-semibold text-base sm:text-lg text-gray-800 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm hidden sm:block">
                      Click to view details about this sacred puja ceremony and
                      book expert pandits to perform it.
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-sm text-redOrange font-medium">
                      View Details
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-redOrange"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px] bg-cream/50">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-t-redOrange border-r-redOrange/30 border-b-redOrange/10 border-l-redOrange/60 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center text-redOrange">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Section
        bgImageUrl="image/pujaservice.jpeg"
        title="Puja Services"
        description="See all the Puja services that we offer"
      />
      <section className="bg-cream pt-6 pb-10 sm:pt-8 sm:pb-12">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Mobile Filters Toggle */}
          <div className="lg:hidden mb-4 flex justify-between items-center">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm text-gray-700 border border-gray-200"
            >
              <FaFilter className="text-redOrange" />
              <span>Filters & Search</span>
            </button>
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleViewMode}
                className={`p-2 rounded-md ${
                  viewMode === "grid"
                    ? "bg-redOrange/10 text-redOrange"
                    : "bg-gray-100 text-gray-600"
                }`}
                aria-label="Toggle view mode"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={toggleViewMode}
                className={`p-2 rounded-md ${
                  viewMode === "list"
                    ? "bg-redOrange/10 text-redOrange"
                    : "bg-gray-100 text-gray-600"
                }`}
                aria-label="Toggle view mode to list"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile filters panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                ref={filterRef}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden mb-5 bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-gray-800">
                      Filters & Search
                    </h3>
                    <button onClick={() => setShowFilters(false)}>
                      <FaChevronUp className="text-gray-500" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="mobile-search"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Search
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="mobile-search"
                          placeholder="Search by Puja name..."
                          className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-redOrange/50 focus:border-redOrange outline-none"
                          value={searchValue}
                          onChange={(e) => setSearchValue(e.target.value)}
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <FaSearch className="text-gray-400" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="mobile-category"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Category
                      </label>
                      <select
                        id="mobile-category"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-redOrange/50 focus:border-redOrange outline-none"
                        onChange={handleCategoryChange}
                        value={selectedCategory}
                      >
                        <option value="">All Categories</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="mobile-sort"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Sort By
                      </label>
                      <select
                        id="mobile-sort"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-redOrange/50 focus:border-redOrange outline-none"
                        onChange={handleSortChange}
                        value={sortOption}
                      >
                        <option value="default">Default</option>
                        <option value="name-asc">Name (A to Z)</option>
                        <option value="name-desc">Name (Z to A)</option>
                        <option value="category">By Category</option>
                      </select>
                    </div>
                    <button
                      onClick={() => {
                        setSearchValue("");
                        setSelectedCategory("");
                        setSortOption("default");
                      }}
                      className="w-full px-4 py-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors text-sm"
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-col lg:flex-row lg:space-x-6">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block w-64 shrink-0">
              <div className="bg-white rounded-xl shadow-sm p-5 sticky top-20">
                <h3 className="font-semibold text-lg mb-4 text-gray-800 border-b pb-2">
                  Filter Options
                </h3>

                <div className="space-y-5">
                  {/* Search */}
                  <div>
                    <label
                      htmlFor="desktop-search"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Search Pujas
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="desktop-search"
                        placeholder="Search by name..."
                        className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-redOrange/50 focus:border-redOrange outline-none"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <FaSearch className="text-gray-400" />
                      </div>
                    </div>
                  </div>

                  {/* Category Filter */}
                  <div>
                    <label
                      htmlFor="desktop-category"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Filter by Category
                    </label>
                    <select
                      id="desktop-category"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-redOrange/50 focus:border-redOrange outline-none"
                      onChange={handleCategoryChange}
                      value={selectedCategory}
                    >
                      <option value="">All Categories</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Sort Options */}
                  <div>
                    <label
                      htmlFor="desktop-sort"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Sort By
                    </label>
                    <div className="relative">
                      <select
                        id="desktop-sort"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-redOrange/50 focus:border-redOrange outline-none appearance-none"
                        onChange={handleSortChange}
                        value={sortOption}
                      >
                        <option value="default">Default</option>
                        <option value="name-asc">Name (A to Z)</option>
                        <option value="name-desc">Name (Z to A)</option>
                        <option value="category">By Category</option>
                      </select>
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <FaSort className="text-gray-400" />
                      </div>
                    </div>
                  </div>

                  {/* View Options */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      View Mode
                    </label>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setViewMode("grid")}
                        className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center ${
                          viewMode === "grid"
                            ? "bg-redOrange text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        } transition-colors`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                        Grid
                      </button>
                      <button
                        onClick={() => setViewMode("list")}
                        className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center ${
                          viewMode === "list"
                            ? "bg-redOrange text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        } transition-colors`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        List
                      </button>
                    </div>
                  </div>

                  {/* Clear Filters */}
                  <button
                    onClick={() => {
                      setSearchValue("");
                      setSelectedCategory("");
                      setSortOption("default");
                    }}
                    className="w-full px-4 py-2 border border-redOrange text-redOrange rounded-lg hover:bg-redOrange/5 transition-colors text-sm font-medium"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1">
              {/* Results Summary */}
              <div className="bg-white rounded-lg shadow-sm p-4 mb-5">
                <div className="flex flex-wrap items-center justify-between">
                  <div className="mb-2 sm:mb-0">
                    <p className="text-gray-700">
                      Showing{" "}
                      <span className="font-semibold">
                        {filteredServices.length}
                      </span>{" "}
                      Puja Services
                      {selectedCategory && (
                        <>
                          {" "}
                          in{" "}
                          <span className="italic">
                            {categories.find(
                              (c) => c.id.toString() === selectedCategory
                            )?.name || "Selected Category"}
                          </span>
                        </>
                      )}
                      {searchValue && (
                        <>
                          {" "}
                          matching{" "}
                          <span className="font-semibold">"{searchValue}"</span>
                        </>
                      )}
                    </p>
                  </div>
                  <div className="hidden lg:block">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-600">View:</span>
                      <button
                        onClick={() => setViewMode("grid")}
                        className={`p-1.5 rounded ${
                          viewMode === "grid"
                            ? "bg-redOrange/10 text-redOrange"
                            : "text-gray-500 hover:bg-gray-100"
                        }`}
                        aria-label="Grid view"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setViewMode("list")}
                        className={`p-1.5 rounded ${
                          viewMode === "list"
                            ? "bg-redOrange/10 text-redOrange"
                            : "text-gray-500 hover:bg-gray-100"
                        }`}
                        aria-label="List view"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Services */}

              {renderServices()}

              {/* Load More Button */}
              {visibleItems < filteredServices.length && (
                <div className="text-center mt-8">
                  <button
                    onClick={loadMore}
                    className="bg-redOrange text-white px-6 py-3 rounded-lg shadow-lg hover:bg-redOrange/90 transition-all duration-300"
                  >
                    Load More
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PujaServices;
