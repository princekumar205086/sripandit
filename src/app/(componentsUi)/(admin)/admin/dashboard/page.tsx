"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from "@/app/helper/useAuth";
import Layout from '../../layout';
import { FiBell, FiSettings, FiSearch, FiUser, FiChevronDown } from "react-icons/fi";
import { AiOutlineUser, AiOutlineCalendar, AiOutlineDollar } from "react-icons/ai";
import { BiBookOpen } from "react-icons/bi";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function AdminDashboard() {
  const isAuthenticated = useAuth();
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Loading state for role fetching
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch the role from localStorage when the component mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRole = localStorage.getItem('role');
      setRole(storedRole);
      setLoading(false); // Set loading to false once role is fetched
    }
  }, []);

  // Handle redirection based on authentication status and role
  useEffect(() => {
    if (!loading) { // Only proceed after role is loaded
      if (!isAuthenticated) {
        router.push('/login'); // Redirect to login if not authenticated
      } else if (role !== 'ADMIN') {
        router.push('/unauthorized'); // Redirect to unauthorized page if role is not ADMIN
      }
    }
  }, [isAuthenticated, role, loading, router]);

  // Show loading state while determining role or authentication
  if (!isAuthenticated || loading) {
    return <div>Loading...</div>; // Show a loading indicator while waiting
  }

  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Bookings",
        data: [12, 19, 3, 5, 2, 3],
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  };

  const pieChartData = {
    labels: ["Puja", "Astrology", "Other Services"],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Layout>
      <div className="container bg-gradient-to-r from-blue-50 to-white min-h-screen p-8">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <img src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NjM2MDR8MHwxfHNlYXJjaHwxfHxsb3R1cyUyMGxvZ298ZW58MHx8fHwxNjkwMzk5MzA1fDA&ixlib=rb-4.0.3&q=80&w=50" alt="Logo" className="w-10 h-10 mr-4" />
            <h1 className="text-2xl font-bold text-blue-800">Spiritual Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <FiBell className="text-2xl text-gray-600 cursor-pointer" />
            <FiSettings className="text-2xl text-gray-600 cursor-pointer" />
            <div className="flex items-center cursor-pointer">
              <FiUser className="text-2xl text-gray-600 mr-2" />
              <FiChevronDown className="text-gray-600" />
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Total Visitors</h2>
              <AiOutlineUser className="text-3xl text-blue-500" />
            </div>
            <p className="text-3xl font-bold text-blue-600">1,234</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Total Bookings</h2>
              <AiOutlineCalendar className="text-3xl text-green-500" />
            </div>
            <p className="text-3xl font-bold text-green-600">567</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Total Users</h2>
              <BiBookOpen className="text-3xl text-purple-500" />
            </div>
            <p className="text-3xl font-bold text-purple-600">890</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Total Revenue</h2>
              <AiOutlineDollar className="text-3xl text-yellow-500" />
            </div>
            <p className="text-3xl font-bold text-yellow-600">$12,345</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Booking Statistics</h2>
            <Line data={lineChartData} />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Service Breakdown</h2>
            <Pie data={pieChartData} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <div className="space-y-4 max-h-60 overflow-y-auto">
            {[
              { type: "booking", user: "John Doe", service: "Puja Booking" },
              { type: "signup", user: "Jane Smith" },
              { type: "update", service: "Astrology Consultation" },
              { type: "alert", message: "New dispute raised" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center p-3 bg-gray-50 rounded">
                {activity.type === "booking" && (
                  <p>
                    <span className="font-semibold">{activity.user}</span> made a new {activity.service}
                  </p>
                )}
                {activity.type === "signup" && (
                  <p>
                    <span className="font-semibold">{activity.user}</span> signed up
                  </p>
                )}
                {activity.type === "update" && (
                  <p>
                    <span className="font-semibold">{activity.service}</span> was updated
                  </p>
                )}
                {activity.type === "alert" && (
                  <p className="text-red-500 font-semibold">{activity.message}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <footer className="text-center text-gray-500 text-sm">
          <p>© 2023 Spiritual Dashboard. All rights reserved.</p>
          <div className="mt-2">
            <a href="#" className="text-blue-500 hover:underline mx-2">Support</a>
            <a href="#" className="text-blue-500 hover:underline mx-2">FAQs</a>
            <a href="#" className="text-blue-500 hover:underline mx-2">Terms of Service</a>
            <a href="#" className="text-blue-500 hover:underline mx-2">Privacy Policy</a>
          </div>
        </footer>
      </div>
    </Layout>
  );
}