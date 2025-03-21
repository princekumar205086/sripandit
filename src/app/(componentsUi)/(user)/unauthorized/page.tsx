import React from "react";
import Link from "next/link";

export default function page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-red-600 h-2 w-full"></div>
        <div className="p-6 sm:p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m0 0v2m0-2h2m-2 0H10m5-6a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800">
            Access Denied
          </h1>
          <p className="mt-3 text-center text-gray-600 text-sm sm:text-base">
            You don't have permission to access this page. Please contact an
            administrator if you believe this is an error.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/"
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white text-sm sm:text-base font-medium rounded-md transition-colors duration-300 text-center"
            >
              Return to Home
            </Link>
            <Link
              href="/contact"
              className="px-6 py-2 border border-gray-300 hover:border-gray-400 text-gray-700 text-sm sm:text-base font-medium rounded-md transition-colors duration-300 text-center"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
