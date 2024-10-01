"use client";
import Section from "../pujaservice/section";
import React, { useState, useEffect, ChangeEvent } from "react";
import { FaSearch, FaSort, FaExpand, FaTimes, FaHeart } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

type GalleryItem = {
  id: number;
  title: string;
  image: string;
  category: string;
  date: string;
  popularity: number;
};

const categories = [
  "Durga Puja",
  "Saraswati Puja",
  "Kali Puja",
  "Ganesh Chaturthi",
  "Lakshmi Puja",
] as const;

const galleryItems: GalleryItem[] = [
  {
    id: 13,
    title: "Godh Bharai / Seemantham Puja",
    image: "/uploads/godh bharai.jpeg",
    category: "Lakshmi Puja",
    popularity: 1,
    date: "2024-09-14",
  },
  {
    id: 14,
    title: "Maha Ganapati Homa",
    image: "/uploads/Maha ganpati.jpg",
    category: "Ganesh Chaturthi",
    popularity: 1,
    date: "2024-08-20",
  },
  {
    id: 9,
    title: "Mundan Puja or Chola Sanskar",
    image: "/uploads/Mundan Puja.png",
    category: "Kali Puja",
    popularity: 1,
    date: "2024-07-15",
  },
  {
    id: 11,
    title: "Engagement Puja",
    image: "/uploads/ring exchange.jpeg",
    category: "Durga Puja",
    popularity: 1,
    date: "2024-09-05",
  },
  {
    id: 12,
    title: "Marriage Anniversary Puja",
    image: "/uploads/marriage puja.jpeg",
    category: "Saraswati Puja",
    popularity: 1,
    date: "2024-08-10",
  },
  {
    id: 15,
    title: "Satyanarayan Puja",
    image: "/uploads/satya narayan puja.jpeg",
    category: "Lakshmi Puja",
    popularity: 1,
    date: "2024-07-25",
  },
  {
    id: 16,
    title: "Griha Pravesh Puja",
    image: "/uploads/Griha Pravesh puja.jpeg",
    category: "Lakshmi Puja",
    popularity: 1,
    date: "2024-09-18",
  },
  {
    id: 17,
    title: "Ayushya Homa / Havan",
    image: "/uploads/aayush homa.jpeg",
    category: "Saraswati Puja",
    popularity: 1,
    date: "2024-07-30",
  },
  {
    id: 10,
    title: "Vehicle Puja / Car Puja",
    image: "/uploads/car vehicle puja.jpeg",
    category: "Ganesh Chaturthi",
    popularity: 1,
    date: "2024-08-12",
  },
  {
    id: 18,
    title: "Navagraha Puja And Homa",
    image: "/uploads/navgraha puja.jpeg",
    category: "Durga Puja",
    popularity: 1,
    date: "2024-09-01",
  },
  {
    id: 19,
    title: "Shuddhi Puja And Havan",
    image: "/uploads/suddhi puja.jpeg",
    category: "Durga Puja",
    popularity: 1,
    date: "2024-08-25",
  },
  {
    id: 20,
    title: "Maha Mrityunjaya Homa/ Havan",
    image: "/uploads/maha mritunjay.jpeg",
    category: "Kali Puja",
    popularity: 1,
    date: "2024-07-05",
  },
];

export default function Gallery() {
  const [items, setItems] = useState(galleryItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortCriteria, setSortCriteria] = useState("date");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    filterAndSortItems();
  }, [searchQuery, selectedCategory, sortCriteria]);

  const filterAndSortItems = () => {
    let filteredItems = galleryItems.filter((item) => {
      const matchesSearch = item.category
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    filteredItems.sort((a, b) => {
      if (sortCriteria === "date") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortCriteria === "popularity") {
        return b.popularity - a.popularity;
      }
      return 0;
    });

    setItems(filteredItems);
    setCurrentSlide(0);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSortChange = (criteria: any) => {
    setSortCriteria(criteria);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const increasePopularity = (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, popularity: item.popularity + 1 } : item
      )
    );
  };

  return (
    <>
      <Section
        bgImageUrl="image/gallery.jpeg"
        title="Check out our gallery"
        description="We have a collection of images from our past events and ceremonies. Check out our gallery to see the beautiful moments we have captured."
      />
      <div className="container-fluid mx-auto px-4 w-full py-8 bg-redOrange">
        <h1 className="text-4xl font-bold text-center text-cream mb-8">Puja Gallery</h1>

        {/* Search, Filter, and Sort Section */}
        <div className="mb-6 flex flex-wrap items-center justify-between text-cream">
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Search puja ceremonies"
                className="w-full px-4 py-2 border text-orange-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                value={searchQuery}
                onChange={handleSearch}
                aria-label="Search puja ceremonies"
              />
              <FaSearch className="absolute right-3 top-3 text-orange-500" />
            </div>
          </div>

          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <select
              className="w-full px-4 py-2 border text-orange-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              aria-label="Filter by category"
            >
              <option value="All">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full md:w-1/3">
            <div className="flex items-center justify-end">
              <span className="mr-2">Sort by:</span>
              <button
                className={`px-4 py-2 rounded-lg mr-2 ${
                  sortCriteria === "date"
                    ? "bg-cream text-orange-500"
                    : "bg-cream text-orange-500"
                }`}
                onClick={() => handleSortChange("date")}
                aria-label="Sort by date"
              >
                Date
              </button>
              <button
                className={`px-4 py-2 rounded-lg ${
                  sortCriteria === "popularity"
                    ? "bg-cream text-orange-500"
                    : "bg-cream text-orange-500"
                }`}
                onClick={() => handleSortChange("popularity")}
                aria-label="Sort by popularity"
              >
                Popularity
              </button>
            </div>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="text-center text-cream mt-8">
            <p>
              No results found. Please try a different search query or category.
            </p>
          </div>
        ) : (
          <div
            className={`relative ${
              isFullScreen ? "fixed inset-0 z-50 bg-black" : ""
            }`}
          >
            <AnimatePresence>
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-96 md:h-[32rem] relative overflow-hidden rounded-lg shadow-lg"
              >
                <img
                  src={items[currentSlide].image}
                  alt={items[currentSlide].category}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                  <h2 className="text-xl font-semibold">
                    {items[currentSlide].category}
                  </h2>
                  <p>Date: {items[currentSlide].date}</p>

                  {/* Heart Button with Popularity Counter */}
                  <button
                    className="absolute top-2 right-2 bg-white text-black p-2 rounded-full shadow-lg flex items-center"
                    onClick={() => increasePopularity(items[currentSlide].id)}
                    aria-label="Increase popularity"
                  >
                    <FaHeart className="text-red-500 mr-1" />
                    <span>{items[currentSlide].popularity}</span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            <button
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full shadow-lg"
              onClick={handlePrevSlide}
              aria-label="Previous image"
            >
              &#10094;
            </button>
            <button
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full shadow-lg"
              onClick={handleNextSlide}
              aria-label="Next image"
            >
              &#10095;
            </button>

            <button
              className="absolute top-4 right-4 bg-white bg-opacity-50 p-2 rounded-full shadow-lg"
              onClick={toggleFullScreen}
              aria-label="Toggle fullscreen"
            >
              {isFullScreen ? <FaTimes /> : <FaExpand />}
            </button>
          </div>
        )}

        {/* Gallery Grid */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="relative cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.category}
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
                <h3 className="text-lg font-semibold">{item.category}</h3>
                <p>Date: {item.date}</p>
                <div className="flex items-center">
                  <FaHeart className="text-red-500 mr-1" />
                  <span>{item.popularity}</span>
                </div>
              </div>

              {/* Heart Button on top-right */}
              <button
                className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-lg flex items-center"
                onClick={() => increasePopularity(item.id)}
                aria-label="Increase popularity"
              >
                <FaHeart className="text-red-500 mr-1" />
                <span>{item.popularity}</span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
