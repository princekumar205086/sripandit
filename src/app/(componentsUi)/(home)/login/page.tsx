"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLogin, FormState, Errors } from "./action";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const { handleSubmit } = useLogin();
  const router = useRouter();

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
          <form onSubmit={onSubmit}>
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
                disabled={loading}
                className={`w-full px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  loading ? "bg-gray-400" : "bg-orange-600 hover:bg-orange-700"
                }`}
              >
                {loading ? "Signing in..." : "Login"}
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