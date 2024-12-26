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
        router.push('/login'); // Redirect to unauthorized page if role is not ADMIN
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
      </div>
    </Layout>
  );
}