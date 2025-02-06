"use client";
import Section from "../pujaservice/section";
import React, { useState, useEffect, ChangeEvent } from "react";
import { FaSearch, FaHeart } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

interface GalleryItem {
  id: number;
  title: string;
  image: string;
  category: string;
  date: string;
  popularity: number;
}

interface gallerycategory {
  id: number;
  name: string;
}

export default function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [categories, setCategories] = useState<gallerycategory[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortCriteria, setSortCriteria] = useState("date");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    fetch("/api/gallery")
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error("Error fetching gallery data:", error));
      

    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const cachedCategories = sessionStorage.getItem("galleryCategories");
    if (cachedCategories) {
      setCategories(JSON.parse(cachedCategories));
    } else {
      try {
        const response = await fetch("api/gallerycategory");
        const data = await response.json();
        sessionStorage.setItem("galleryCategories", JSON.stringify(data));
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
  };

  useEffect(() => {
    filterAndSortItems();
  }, [searchQuery, selectedCategory, sortCriteria]);

  const filterAndSortItems = () => {
    let filteredItems = items.filter((item) => {
      const matchesSearch = item.title
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
    console.log("items")
    setCurrentSlide(0);
  };

  return (
    <>
      <Section
        bgImageUrl="image/gallery.jpeg"
        title="Check out our gallery"
        description="We have a collection of images from our past events and ceremonies."
      />
      <div className="container-fluid mx-auto px-4 w-full py-8 bg-redOrange">
        <h1 className="text-4xl font-bold text-center text-cream mb-8">
          Puja Gallery
        </h1>

        <div className="mb-6 flex gap-5 items-center justify-between text-cream">
          <div className="relative w-full">
            <div className="absolute right-5 top-1/2 transform -translate-y-1/2 mr-3">
              <FaSearch className="text-orange-600 font-bold" />
            </div>

            <input
              type="text"
              placeholder="Search puja ceremonies"
              className="w-full px-4 py-2 border text-orange-500 rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <select
            className="w-full px-4 py-2 border text-orange-500 rounded-lg"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            {Array.isArray(categories) &&
              categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="relative border-2 border-orange-500 rounded-lg overflow-hidden shadow-lg"
            >
              {/* Like Button on Top-Right */}
              <div className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md flex items-center">
                <FaHeart className="text-red-500" />
                <span className="text-black ml-1">{item.popularity}</span>
              </div>

              {/* Image Section */}
              <img
                src={item.image}
                alt={item.category}
                className="w-full h-64 object-cover"
              />

              {/* Overlay Information */}
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-3">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm">Date:{item.date}</p>

                {/* Bottom Heart Icon */}
                <div className="flex items-center mt-1">
                  <FaHeart className="text-red-500 mr-1" />
                  <span>{item.popularity}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
