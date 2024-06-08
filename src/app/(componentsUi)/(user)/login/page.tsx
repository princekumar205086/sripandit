"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

interface FormState {
  email: string;
  password: string;
  staySignedIn: boolean;
}

interface Errors {
  email?: string;
  password?: string;
}

export default function LoginForm() {
  const router = useRouter();
  const [formState, setFormState] = useState<FormState>({
    email: "",
    password: "",
    staySignedIn: false,
  });

  const [errors, setErrors] = useState<Errors>({});
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    // Basic form validation
    if (!formState.email || !formState.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post("/api/login", formState);

      // Handle response here. For example, you might store the returned token in local storage
      localStorage.setItem("token", response.data.token);
      toast.success("Logged in successfully");
      router.push("/dashboard"); // Redirect to dashboard
    } catch (error: any) {
      // Handle error here. For example, you might set the error state
      setErrors(error.response.data);
      toast.error("Login failed");
    }
  };

  const handleChange = (event: any) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setFormState({
      ...formState,
      [event.target.name]: value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-6 sm:py-12 relative mt-16">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("/image/astro.jpg")',
          filter: "blur(15px)",
        }}
      ></div>
      <div className="bg-white bg-opacity-60 rounded-lg shadow-lg overflow-hidden max-w-lg w-full relative z-10">
        <div className="px-6 py-8 md:p-10">
          <h2 className="text-4xl font-bold text-center text-purple-600">
            Login to your account
          </h2>
          <p className="text-center text-lg text-orange-400 mb-4 md:mb-8">
            Enter your credentials to login.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="text-lg font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                  placeholder="Email"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email}</p>
                )}
              </div>
              <div className="relative">
                <label className="text-lg font-medium text-gray-700">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formState.password}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                  placeholder="Password"
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-5 pr-3 flex items-center cursor-pointer"
                  style={{
                    top: "calc(50% + 1rem)",
                    transform: "translateY(-50%)",
                  }}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs">{errors.password}</p>
                )}
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="staySignedIn"
                  checked={formState.staySignedIn}
                  onChange={handleChange}
                  className="mt-1 mr-2"
                />
                <label className="text-lg font-medium text-gray-700">
                  Stay Signed In
                </label>
              </div>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Login
              </button>
            </div>
          </form>
          <div className="mt-6 text-center">
            <p className="text-xl text-purple-600">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-orange-500 hover:underline"
              >
                Sign Up
              </Link>
            </p>
            <p className="text-xl text-purple-600">
              <Link
                href="/forgot-password"
                className="text-orange-500 hover:underline"
              >
                Forgot Password?
              </Link>
            </p>
            <button className="w-full px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-4">
              Login with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
