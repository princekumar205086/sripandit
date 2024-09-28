"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { getPujaService, getPujaCategory } from "./action";
import Section from "./section";
import slugify from "slugify";
import CryptoJS from "crypto-js";

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

  // Fetching puja services with caching
  const fetchServices = async () => {
    const cachedServices = sessionStorage.getItem("pujaServices");
    if (cachedServices) {
      setServices(JSON.parse(cachedServices));
      setFilteredServices(JSON.parse(cachedServices));
      setLoading(false);
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
      setLoading(false);
    }
  };

  // Fetching puja categories with caching
  const fetchCategories = async () => {
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
  };

  useEffect(() => {
    fetchServices();
    fetchCategories();
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

    setFilteredServices(filtered);
  }, [searchValue, selectedCategory, services]);

  useEffect(() => {
    searchServices();
  }, [searchValue, selectedCategory, searchServices]);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  const renderServices = () => {
    return filteredServices.map((service, index) => (
      <div key={index} className="lg:w-1/4 md:w-1/2 w-full p-2 shadow-lg">
        <Link
          href={`/pujaservice/${slugify(service.title)}?id=${encodeURIComponent(
            encryptId(service.id)
          )}`}
          className="w-full"
        >
          <div className="rounded overflow-hidden shadow-lg">
            <Image
              alt={service.img}
              src={service.img || "/uploads/car vehicle puja.jpeg"}
              className="w-full"
              width="400"
              height="450"
              loading="lazy"
            />
            <div className="px-6 py-4 bg-cream">
              <div className="font-bold text-sm mb-2 text-center text-orangeRed"> {/* Reduced text size */}
                {service.title}
              </div>
              <p className="text-orange-500 text-xs text-center"> {/* Reduced text size */}
                {service.category.name}
              </p>
            </div>
          </div>
        </Link>
      </div>
    ));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Section
        bgImageUrl="image/pujaservice.jpeg"
        title="Puja Services"
        description="See all the Puja services that we offer"
      />
      <section className="mt-0 bg-redOrange border-0">
        <div className="container mx-auto p-4">
          <div className="flex flex-wrap -mx-4 mb-4">
            <div className="md:w-3/4 w-full px-4">
              <div className="relative">
                <input
                  type="text"
                  name="s"
                  placeholder="Search by Puja name or Havan."
                  className="w-full px-3 py-4 pr-10 border rounded text-orange-500 leading-tight focus:outline-none focus:shadow-outline text-md"
                  id="on-page-search"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <div className="absolute right-5 top-1/2 transform -translate-y-1/2 mr-3">
                  <FaSearch className="text-orange-600 font-bold" />
                </div>
              </div>
            </div>
            <div className="md:w-1/4 w-full px-4">
              <select
                name="category"
                id="category"
                className="w-full px-3 text-md py-4 border rounded text-orange-500 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleCategoryChange}
                value={selectedCategory}
              >
                <option value="">All Categories</option>
                {categories.map((category, index) => (
                  <option key={index} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-wrap mx-4">{renderServices()}</div>
        </div>
      </section>
    </>
  );
};

export default PujaServices;
