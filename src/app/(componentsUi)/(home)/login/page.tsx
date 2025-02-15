"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useLogin, FormState, Errors } from "./action";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import findUser from "@/app/helper/findUser";



export default function LoginForm() {
  // checking if user is already logged in if yes then redirect to dashboard according to role
  const router = useRouter();
  const { isRole } = findUser();
  if (isRole === "USER") {
    router.push("/dashboard");
  } else if (isRole === "ADMIN") {
    router.push("/admin/dashboard");
  }

  const { handleSubmit } = useLogin();

  const [formState, setFormState] = useState<FormState>({
    email: "",
    password: "",
    staySignedIn: false,
  });

  const [errors, setErrors] = useState<Errors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      await handleSubmit(formState, setErrors);
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = event.target;
    setFormState({
      ...formState,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-6 sm:py-5 relative mt-12 bg-gray-100">
      <div className="bg-white shadow-md rounded-lg overflow-hidden max-w-4xl w-full mx-4 sm:mx-0 grid grid-cols-1 sm:grid-cols-2 ">
        {/* Left Side - Image */}
        <div className="relative">
          <img
            src="https://img.freepik.com/free-photo/navratri-highly-detailed-candle-decoration_23-2151193693.jpg?ga=GA1.1.1275289697.1728223870&semt=ais_hybrid"
            alt="Login Illustration"
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-white">
            <h1 className="text-3xl font-bold text-white">Hello Again!</h1>
            <p className="mt-2 text-center md:font-bold text-white mb-7">
              To stay connected, login with your personal info
            </p>
            <Link
              href="/register"
              className="mt-4 px-6 py-2 border-white rounded-full bg-white  text-orange-600 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="bg-orange-100 bg-opacity-70 px-6 py-8 sm:px-8 sm:py-5">
          <h2 className="text-xl md:text-2xl font-bold text-center text-orange-500 mt-5">
            Login to your account
          </h2>
          <p className="text-center text-sm md:text-md text-gray-600 mb-4 md:mb-6">
            Enter your credentials to login.
          </p>
          <form onSubmit={onSubmit}>
            <div className="space-y-3">
              <div>
                <label className="text-sm md:text-md font-small text-orange-500">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 pb-1 border-b border-orange-600 text-gray-500 focus:outline-none focus:border-orange-500 bg-transparent"
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="text-sm md:text-md font-small text-orange-500">
                  Password:
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formState.password}
                    onChange={handleChange}
                    className="mt-1 w-full px-4 pb-1 border-b border-orange-600 text-gray-500 focus:outline-none focus:border-orange-500 bg-transparent"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 bottom-2 text-orange-600 hover:text-orange-700"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs">{errors.password}</p>
                )}
              </div>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-5 py-2 border border-transparent text-md font-medium rounded-lg text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Login
              </button>
            </div>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-blue-600">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-orange-500 hover:underline">
                Sign Up
              </Link>
            </p>
            <p className="text-sm text-blue-600 mb-5">
              <Link href="/forgot-password" className="text-orange-500 hover:underline">
                Forgot Password?
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>

  );
}