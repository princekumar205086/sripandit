// page.tsx
"use client";
import React, { useState, useEffect } from "react";
import { createPujaService, fetchCategories } from "./action";
import Section from "../../(home)/pujaservice/section";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Category {
  id: string;
  name: string;
}

const Page = () => {
  const [title, setTitle] = useState("");
  const [image, setImg] = useState<File | null>(null);
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const categories = await fetchCategories();
        setCategories(categories);
      } catch (error) {
        console.error(error);
      }
    };

    getCategories();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    try {
      const formData = new FormData();
      const data = JSON.stringify({ title, desc, category });
      formData.append("data", data);
      if (image) {
        formData.append("file", image);
      }
  
      const response = await createPujaService(formData);
      console.log(response);
      
      toast.success("Form submitted successfully!");

      setTitle("");
      setImg(null);
      setDesc("");
      setCategory("");
    } catch (error) {
      console.error(error);
      toast.error("Form submission failed!");
    }
  };

  return (
    <>
      <Section
        bgImageUrl="https://www.smartpuja.com/img/home/smartpuja-astrology.jpeg"
        title="Puja Services"
        description="See all the Puja services that we offer"
      />
      <div className="flex bg-purple-600">
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto p-4 shadow-md mt-6 rounded bg-white text-black"
        >
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
          <input
            type="file"
            onChange={(e) => e.target.files && setImg(e.target.files[0])}
            required
            className="w-full px-3 py-2 mt-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Description"
            required
            className="w-full px-3 py-2 mt-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full px-3 py-2 mt-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="w-full px-3 py-2 mt-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none"
          >
            Submit
          </button>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};

export default Page;
