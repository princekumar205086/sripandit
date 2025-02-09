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
  createdAt: string;
  popularity: number;
}

interface GalleryCategory {
  id: number;
  name: string;
}

export default function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<GalleryItem[]>([]);
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortCriteria, setSortCriteria] = useState("createdAt");

  useEffect(() => {
    fetch("/api/gallery")
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        setFilteredItems(data);
      })
      .catch((error) => console.error("Error fetching gallery data:", error));

    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/gallerycategory");
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        sessionStorage.setItem("galleryCategories", JSON.stringify(data));
        setCategories(data);
      } else {
        console.error("No categories found or incorrect format:", data);
      }
    } catch (error) {
      console.error("Error fetching categories, clearing cache:", error);
      sessionStorage.removeItem("galleryCategories");
    }
  };

  useEffect(() => {
    setFilteredItems(filterAndSortItems());
  }, [searchQuery, selectedCategory, sortCriteria, items]);

  const filterAndSortItems = () => {
    let filteredItems = items.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    filteredItems.sort((a, b) => {
      if (sortCriteria === "createdAt") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (sortCriteria === "popularity") {
        return b.popularity - a.popularity;
      }
      return 0;
    });

    return filteredItems;
  };

  return (
    <>
      <Section
        bgImageUrl="image/gallery.jpeg"
        title="Check out our gallery"
        description="We have a collection of images from our past events and ceremonies."
      />
      <div className="container-fluid mx-auto px-4 w-full py-8 bg-redOrange">
        <h1 className="text-4xl font-bold text-center text-cream mb-8">Puja Gallery</h1>

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
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <div key={item.id} className="relative border-2 border-orange-500 rounded-lg overflow-hidden shadow-lg">
              <div className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md flex items-center">
                <FaHeart className="text-red-500" />
                <span className="text-black ml-1">{item.popularity}</span>
              </div>
              <img src={item.image} alt={item.category} className="w-full h-64 object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-3">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm">Date: {new Date(item.createdAt).toLocaleDateString()}</p>
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
