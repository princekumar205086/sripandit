"use client";
import React, { useState, useEffect } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Quill styles
import { addPujaService, getPujaCategory } from "./action";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import CSS for Toastify

// Dynamically import ReactQuill to avoid server-side issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const PujaForm: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  interface PujaFormData {
    title: string;
    category: string;
    description: string;
    image: File | null; // Allow null for image
    languages: string[];
    packages: {
      location: string;
      language: string;
      type: string;
      price: number; // Changed to number
      description: string;
    }[];
  }

  interface Category {
    id: string;
    name: string;
  }

  const [formData, setFormData] = useState<PujaFormData>({
    title: "",
    category: "",
    description: "",
    image: null,
    languages: [],
    packages: [],
  });

  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>(
    {}
  );
  const [categories, setCategories] = useState<Category[]>([]);

  const languages = [
    "Hindi",
    "English",
    "Bengali",
    "Tamil",
    "Kannada",
    "Marathi",
    "Kumauni",
    "Marwadi",
  ];

  const packageTypes = ["Basic", "Standard", "Premium"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await getPujaCategory();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    validateField(name, value);
  };

  const handleLanguageChange = (lang: string) => {
    const updatedLanguages = formData.languages.includes(lang)
      ? formData.languages.filter((l) => l !== lang) // Remove language if already included
      : [...formData.languages, lang]; // Add language if not included

    setFormData({ ...formData, languages: updatedLanguages });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData({ ...formData, image: file });
  };

  const handleAddPackage = () => {
    setFormData({
      ...formData,
      packages: [
        ...formData.packages,
        { location: "", language: "", type: "", price: 0, description: "" },
      ],
    });
  };

  const handlePackageChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updatedPackages = formData.packages.map((pkg, i) =>
      i === index ? { ...pkg, [field]: value } : pkg
    );
    setFormData({ ...formData, packages: updatedPackages });
    validatePackage(index, field, value);
  };

  const handleRemovePackage = (index: number) => {
    const updatedPackages = formData.packages.filter((_, i) => i !== index);
    setFormData({ ...formData, packages: updatedPackages });
  };

  const validateField = (name: string, value: string) => {
    let newErrors = { ...errors };
    if (name === "title" && !value.trim()) {
      newErrors.title = "Puja Title is required";
    } else {
      delete newErrors.title;
    }
    setErrors(newErrors);
  };

  const validatePackage = (
    index: number,
    field: string,
    value: string | number
  ) => {
    let newErrors = { ...errors };
    if (field === "price" && (isNaN(Number(value)) || Number(value) <= 0)) {
      newErrors[`package_${index}_price`] = "Price must be a positive number";
    } else {
      delete newErrors[`package_${index}_price`];
    }
    setErrors(newErrors);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Ensure formData.image is a File before submission
    const dataToSubmit = {
      ...formData,
      image: formData.image, // This will be null or a File
    };

    // Validate all fields before submission
    let valid = true;
    if (!dataToSubmit.title.trim()) {
      setErrors((prev) => ({ ...prev, title: "Puja Title is required" }));
      valid = false;
    }

    dataToSubmit.packages.forEach((pkg, index) => {
      if (isNaN(pkg.price) || pkg.price <= 0) {
        setErrors((prev) => ({
          ...prev,
          [`package_${index}_price`]: "Price must be a positive number",
        }));
        valid = false;
      }
    });

    if (!valid) return;

    try {
      const response = await addPujaService(dataToSubmit);
      toast.success("Puja service added successfully!"); // Success toast
      console.log("Form submitted:", response);
      // Reset form after successful submission
      setFormData({
        title: "",
        category: "",
        description: "",
        image: null,
        languages: [],
        packages: [],
      });
    } catch (error) {
      toast.error("Error adding puja service. Please try again."); // Error toast
      console.error("Error adding puja service:", error);
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <>
      <ToastContainer /> {/* Include ToastContainer in your component */}
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
          Add New Puja
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Puja Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
              {errors.title && (
                <p id="titleError" className="mt-1 text-sm text-red-600">
                  {errors.title}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Puja Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <ReactQuill
              theme="snow"
              value={formData.description}
              onChange={(value) =>
                setFormData({ ...formData, description: value })
              }
              className="mt-1 border-2 border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Puja Image
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-1 block w-full text-gray-900 border-2 border-gray-300 rounded-md"
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700">Languages</h3>
            <div className="grid grid-cols-2 gap-4 mt-2">
              {languages.map((lang) => (
                <div key={lang} className="flex items-center">
                  <input
                    type="checkbox"
                    id={lang}
                    checked={formData.languages.includes(lang)}
                    onChange={() => handleLanguageChange(lang)}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <label
                    htmlFor={lang}
                    className="ml-2 block text-sm text-gray-700"
                  >
                    {lang}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700">Packages</h3>
            {formData.packages.map((pkg, index) => (
              <div key={index} className="border p-4 rounded-lg mt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor={`location_${index}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Location
                    </label>
                    <input
                      type="text"
                      id={`location_${index}`}
                      value={pkg.location}
                      onChange={(e) =>
                        handlePackageChange(index, "location", e.target.value)
                      }
                      className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor={`language_${index}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Package Language
                    </label>
                    <select
                      id={`language_${index}`}
                      value={pkg.language}
                      onChange={(e) =>
                        handlePackageChange(index, "language", e.target.value)
                      }
                      className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      required
                    >
                      <option value="">Select a language</option>
                      {languages.map((lang) => (
                        <option key={lang} value={lang}>
                          {lang}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor={`type_${index}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Package Type
                    </label>
                    <select
                      id={`type_${index}`}
                      value={pkg.type}
                      onChange={(e) =>
                        handlePackageChange(index, "type", e.target.value)
                      }
                      className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      required
                    >
                      <option value="">Select a package type</option>
                      {packageTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor={`price_${index}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Price
                    </label>
                    <input
                      type="number"
                      id={`price_${index}`}
                      value={pkg.price}
                      onChange={(e) =>
                        handlePackageChange(
                          index,
                          "price",
                          Number(e.target.value)
                        )
                      }
                      className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      required
                    />
                    {errors[`package_${index}_price`] && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors[`package_${index}_price`]}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <label
                    htmlFor={`package_description_${index}`}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Package Description
                  </label>
                  <ReactQuill
                    theme="snow"
                    value={pkg.description}
                    onChange={(value) =>
                      handlePackageChange(index, "description", value)
                    }
                    className="mt-1 border-2 border-gray-300 rounded-md"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => handleRemovePackage(index)}
                  className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <FaTrash className="mr-2" />
                  Remove Package
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddPackage}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mt-4"
            >
              <FaPlus className="mr-2" />
              Add Package
            </button>
          </div>

          <button
            type="submit"
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default PujaForm;
