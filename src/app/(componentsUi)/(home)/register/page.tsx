"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function SignupForm() {
  const initialFormState = {
    username: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
  };
  const [formState, setFormState] = useState(initialFormState);

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {}, [errors]);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validateForm = () => {
    let valid = true;
    let errors = {
      username: "",
      email: "",
      contact: "",
      password: "",
      confirmPassword: "",
    };

    if (!formState.username || !/^[a-z0-9]{3,50}$/i.test(formState.username)) {
      valid = false;
      errors.username = "Username must be 3-50 characters and alphanumeric";
    }

    if (!formState.email || !/\S+@\S+\.\S+/.test(formState.email)) {
      valid = false;
      errors.email = "Valid email is required";
    }

    if (!formState.contact || !/^\d{10}$/.test(formState.contact)) {
      valid = false;
      errors.contact = "10 digit contact number is required";
    }

    if (
      !formState.password ||
      !/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(
        formState.password
      )
    ) {
      valid = false;
      errors.password =
        "Password must be at least 8 characters, start with a capital letter, contain alphanumeric and special characters";
    }

    if (formState.password !== formState.confirmPassword) {
      valid = false;
      errors.confirmPassword = "Passwords do not match";
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post("/api/signup", formState);
      if (response.data.success) {
        setFormState(initialFormState);
        toast.success("Signup successful! Verification email has been sent.");
      } else {
        toast.error("Signup failed.");
      }
    } catch (error: any) {
      toast.error("An error occurred." + error.message);
    }
  };
  
  const handleChange = (event: any) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-6 sm:py-12 relative mt-24">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("/image/astro.jpg")',
          filter: "blur(50px)",
        }}
      ></div>
      <div className="bg-white bg-opacity-70 rounded-lg shadow-lg overflow-hidden max-w-lg w-full relative z-10">
        <div className="px-8 py-10 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-purple-600">
            Create an account
          </h2>
          <p className="text-center text-md md:text-lg text-orange-400 mb-4 md:mb-6">
            Enter your information to create your account.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div>
                <label className="text-md md:text-lg font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formState.username}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                  placeholder="Username"
                  required
                />
                {errors.username && (
                  <p className="text-red-500 text-xs">{errors.username}</p>
                )}
              </div>
              <div>
                <label className="text-md md:text-lg font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                  placeholder="Email"
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="text-md md:text-lg font-medium text-gray-700">
                  Contact
                </label>
                <input
                  type="text"
                  name="contact"
                  value={formState.contact}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                  placeholder="Contact"
                  required
                />
                {errors.contact && (
                  <p className="text-red-500 text-xs">{errors.contact}</p>
                )}
              </div>
              <div>
                <label className="text-md md:text-lg font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formState.password}
                    onChange={handleChange}
                    className="mt-1 w-full px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                    placeholder="Password"
                    required
                  />
                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="absolute right-3 top-3 text-gray-600 hover:text-gray-800"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs">{errors.password}</p>
                )}
              </div>
              <div>
                <label className="text-md md:text-lg font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formState.confirmPassword}
                    onChange={handleChange}
                    className="mt-1 w-full px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                    placeholder="Confirm Password"
                    required
                  />
                  <button
                    type="button"
                    onClick={toggleShowConfirmPassword}
                    className="absolute right-3 top-3 text-gray-600 hover:text-gray-800"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-5 py-3 border border-transparent text-md font-medium rounded-lg text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign up
              </button>
            </div>
          </form>
          <div className="mt-6 text-center">
            <p className="text-md md:text-lg text-purple-600">
              Already registered?{" "}
              <Link href="/login" className="text-orange-500 hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
