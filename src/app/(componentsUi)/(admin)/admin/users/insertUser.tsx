"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { toast, ToastContainer } from "react-toastify";
import { addUserService } from "./action";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const UserFormData = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Define form data structure to match the User model fields
  const initialFormData = {
    id: 0,
    username: "",
    email: "",
    contact: "",
    password: "",
    date_of_reg: "", 
    account_status: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>(
    {}
  );

  // Validation function
  const validateField = (name: string, value: string) => {
    const newErrors = { ...errors };

    if (name === "username" && !value.trim()) {
      newErrors.username = "Username is required";
    } else {
      delete newErrors.username;
    }

    if (name === "email" && (!value.trim() || !/\S+@\S+\.\S+/.test(value))) {
      newErrors.email = "A valid email is required";
    } else {
      delete newErrors.email;
    }

    if (name === "contact" && !/^\d{10}$/.test(value)) {
      newErrors.contact = "Contact must be a valid 10-digit number";
    } else {
      delete newErrors.contact;
    }

    setErrors(newErrors);
  };

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    validateField(name, value);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let valid = true;

    // Final validation
    if (!formData.username.trim()) {
      setErrors((prev) => ({ ...prev, username: "Username is required" }));
      valid = false;
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      setErrors((prev) => ({ ...prev, email: "A valid email is required" }));
      valid = false;
    }
    if (!/^\d{10}$/.test(formData.contact)) {
      setErrors((prev) => ({ ...prev, contact: "Contact must be a valid 10-digit number" }));
      valid = false;
    }

    if (!valid) return;

    try {
      const response = await addUserService(formData); // Pass formData directly
      toast.success("User added successfully!");
      console.log("Form submitted:", response);

      // Reset form after successful submission
      setFormData(initialFormData);
    } catch (error) {
      toast.error("Error adding user. Please try again.");
      console.error("Error adding user:", error);
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <>
      <ToastContainer />
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
          Add New User
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
              {errors.username && (
                <p id="usernameError" className="mt-1 text-sm text-red-600">
                  {errors.username}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
              {errors.email && (
                <p id="emailError" className="mt-1 text-sm text-red-600">
                  {errors.email}
                </p>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
              Contact
            </label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
            {errors.contact && (
              <p id="contactError" className="mt-1 text-sm text-red-600">
                {errors.contact}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="account_status" className="block text-sm font-medium text-gray-700">
              Account Status
            </label>
            <select
              id="account_status"
              name="account_status"
              value={formData.account_status}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            >
              <option value="">Select Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
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

export default UserFormData;
