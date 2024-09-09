"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useCallback } from "react";
import { FaSearch } from "react-icons/fa";
import { getPujaCategory, getPujaService } from "./action";
import Section from "./section";
import slugify from "slugify";
import CryptoJS from "crypto-js";

const PujaServices = () => {
  // Inside your component
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

  // Fetching puja services
  const fetchServices = async () => {
    const response = await getPujaService();
    console.log(response);

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
      setServices(data);
      setFilteredServices(data); // Initialize filtered services
    } else {
      console.error("No data received from getPujaService");
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Fetching puja categories
  const fetchCategories = async () => {
    const response = await getPujaCategory();
    console.log(response);

    if (response && response.length > 0) {
      const data = response.map((category: Category) => ({
        id: category.id,
        name: category.name,
      }));
      setCategories(data);
    } else {
      console.error("No data received from getPujaCategory");
    }
  };

  useEffect(() => {
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
        (service: Service) => service.category.id.toString() === selectedCategory
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
      <div key={index} className="lg:w-1/4 md:w-1/2 w-full px-4 mb-4">
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
            />
            <div className="px-6 py-4">
              <div className="font-bold text-2xl mb-2 text-center">
                {service.title}
              </div>
              <p className="text-gray-700 text-lg text-center">
                {service.category.name}
              </p>
            </div>
          </div>
        </Link>
      </div>
    ));
  };

  return (
    <>
      <Section
        bgImageUrl="image/pujaservice.jpeg"
        title="Puja Services"
        description="See all the Puja services that we offer"
      />
      <section className="mt-0 bg-gray-200 border-0">
        <div className="container mx-auto p-4">
          <div className="flex flex-wrap -mx-4 mb-4">
            <div className="md:w-3/4 w-full px-4">
              <div className="relative">
                <input
                  type="text"
                  name="s"
                  placeholder="Search by Puja name or Havan.."
                  className="w-full px-3 py-4 pr-10 border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xl"
                  id="on-page-search"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <div className="absolute right-5 top-1/2 transform -translate-y-1/2 mr-3">
                  <FaSearch className="text-gray-600 font-bold" />
                </div>
              </div>
            </div>
            <div className="md:w-1/4 w-full px-4">
              <select
                name="category"
                id="category"
                className="w-full px-3 text-xl py-4 border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleCategoryChange}
                value={selectedCategory}
              >
                <option value="null">All Categories</option>
                {categories.map((category, index) => (
                  <option key={index} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-wrap -mx-4">{renderServices()}</div>
        </div>
      </section>
    </>
  );
};

export default PujaServices;
