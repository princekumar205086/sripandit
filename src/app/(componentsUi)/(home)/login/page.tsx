"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useLogin, FormState, Errors } from "./action";


export default function LoginForm() {
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
    <div className="min-h-screen flex items-center justify-center py-6 sm:py-12 relative mt-12">
      <div
        className="absolute inset-0 bg-cover bg-center bg-opacity-40"
        style={{
          backgroundImage: 'url("/image/astro.jpg")',
          filter: "blur(50px)",
        }}
      ></div>
      <div className="bg-cream bg-opacity-70 rounded-lg shadow-sm overflow-hidden max-w-md w-full relative z-10 mx-4 sm:mx-0">
        <div className="px-6 py-8 sm:px-8 sm:py-10 md:p-12">
          <h2 className="text-xl md:text-2xl font-bold text-center text-orange-500">
            Login to your account
          </h2>
          <p className="text-center text-sm md:text-md text-orange-400 mb-4 md:mb-6">
            Enter your credentials to login.
          </p>
          <form onSubmit={onSubmit}>
            <div className="space-y-5">
              <div>
                <label className="text-sm md:text-md font-small text-orange-500">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-3 border rounded-lg text-orange-500 focus:outline-none focus:border-orange-500"
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="text-sm md:text-md font-small text-orange-500">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formState.password}
                    onChange={handleChange}
                    className="mt-1 w-full px-4 py-3 border rounded-lg text-orange-500 focus:outline-none focus:border-orange-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 bottom-3 text-orange-600 hover:text-orange-700"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
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
                <label className="text-sm md:text-md font-small text-orange-500">
                  Stay Signed In
                </label>
              </div>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                disabled={loading}
                className={`w-full px-5 py-3 border border-transparent text-md font-medium rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  loading ? "bg-gray-400" : "bg-orange-600 hover:bg-orange-700"
                }`}
              >
                {loading ? "Signing in..." : "Login"}
              </button>
            </div>
          </form>
          <div className="mt-6 text-center">
            <p className="text-md md:text-lg text-purple-600">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-orange-500 hover:underline">
                Sign Up
              </Link>
            </p>
            <p className="text-md md:text-lg text-purple-600">
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