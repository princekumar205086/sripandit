"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from "@/app/helper/useAuth";
import Layout from '../../layout';
import { FiBell, FiSettings, FiSearch, FiUser, FiChevronDown, FiDownload, FiZap, FiRefreshCw } from "react-icons/fi";
import { AiOutlineUser, AiOutlineCalendar, AiOutlineDollar, AiOutlineMessage, AiOutlineStar } from "react-icons/ai";
import { BiBookOpen, BiTask, BiSpreadsheet } from "react-icons/bi";
import { MdOutlineNotificationsActive, MdOutlineWarning } from "react-icons/md";
import { Line, Pie, Bar } from "react-chartjs-2";
import { toast } from "react-hot-toast";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
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
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function AdminDashboard() {
  const isAuthenticated = useAuth();
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("week");
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRole = localStorage.getItem('role');
      setRole(storedRole);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push('/login');
      } else if (role !== 'ADMIN') {
        router.push('/login');
      }
    }
  }, [isAuthenticated, role, loading, router]);

  if (!isAuthenticated || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const handleQuickAction = (action: string) => {
    toast.success(`${action} action initiated`);
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    // Here you would fetch new data based on the filter
  };

  const handleDownloadReport = () => {
    toast.success("Generating report...");
    // Implementation for downloading report
  };

  const handleRefreshData = () => {
    toast.success("Refreshing dashboard data...");
    // Implementation for refreshing data
  };

  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Bookings",
        data: [12, 19, 3, 5, 2, 3],
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
      {
        label: "Consultations",
        data: [5, 15, 10, 12, 9, 17],
        borderColor: "rgba(153, 102, 255, 1)",
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

  const barChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Revenue ($)",
        data: [1200, 1900, 800, 1500, 2000, 2500, 1800],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const notifications = [
    { id: 1, message: "New booking from Lisa Smith", time: "10 mins ago", read: false },
    { id: 2, message: "Payment successful from client #4582", time: "30 mins ago", read: false },
    { id: 3, message: "System update scheduled for tonight", time: "2 hrs ago", read: true },
    { id: 4, message: "New customer registration", time: "5 hrs ago", read: true },
  ];

  return (
    <Layout>
      <div className="container bg-gradient-to-r from-blue-50 to-white min-h-screen p-4 md:p-6 lg:p-8">
        {/* Dashboard header with search and actions */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 gap-4">
          <div className="w-full lg:w-auto">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-gray-500">Welcome back, Administrator</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-3 w-full lg:w-auto">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
            
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-100 relative"
              >
                <FiBell size={18} />
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
                  2
                </span>
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-10 border border-gray-200">
                  <div className="p-3 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold">Notifications</h3>
                      <button className="text-xs text-blue-500 hover:text-blue-700">Mark all as read</button>
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div key={notif.id} className={`p-3 border-b border-gray-100 hover:bg-gray-50 ${!notif.read ? 'bg-blue-50' : ''}`}>
                        <div className="flex items-start">
                          <div className={`mt-1 mr-3 flex-shrink-0 ${!notif.read ? 'text-blue-500' : 'text-gray-400'}`}>
                            <MdOutlineNotificationsActive size={20} />
                          </div>
                          <div>
                            <p className="text-sm">{notif.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center border-t border-gray-200">
                    <button className="text-sm text-blue-500 hover:text-blue-700">View all notifications</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick action buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <button 
            onClick={() => handleQuickAction("Create Service")}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <BiSpreadsheet /> <span className="hidden md:inline">Create Service</span>
          </button>
          <button 
            onClick={() => handleQuickAction("Add User")}
            className="flex items-center justify-center gap-2 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
          >
            <FiUser /> <span className="hidden md:inline">Add User</span>
          </button>
          <button 
            onClick={handleDownloadReport}
            className="flex items-center justify-center gap-2 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
          >
            <FiDownload /> <span className="hidden md:inline">Download Report</span>
          </button>
          <button 
            onClick={handleRefreshData}
            className="flex items-center justify-center gap-2 bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors"
          >
            <FiRefreshCw /> <span className="hidden md:inline">Refresh Data</span>
          </button>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-md transform transition-all hover:scale-105 border-t-4 border-blue-500">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800">Total Visitors</h2>
              <div className="p-3 bg-blue-100 rounded-full">
                <AiOutlineUser className="text-xl md:text-2xl text-blue-500" />
              </div>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-blue-600">1,234</p>
            <div className="mt-2 flex items-center">
              <span className="text-green-600 text-sm">↑ 12.5%</span>
              <span className="text-xs text-gray-500 ml-2">vs last week</span>
            </div>
          </div>
          
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-md transform transition-all hover:scale-105 border-t-4 border-green-500">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800">Total Bookings</h2>
              <div className="p-3 bg-green-100 rounded-full">
                <AiOutlineCalendar className="text-xl md:text-2xl text-green-500" />
              </div>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-green-600">567</p>
            <div className="mt-2 flex items-center">
              <span className="text-green-600 text-sm">↑ 8.2%</span>
              <span className="text-xs text-gray-500 ml-2">vs last week</span>
            </div>
          </div>
          
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-md transform transition-all hover:scale-105 border-t-4 border-purple-500">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800">Total Users</h2>
              <div className="p-3 bg-purple-100 rounded-full">
                <BiBookOpen className="text-xl md:text-2xl text-purple-500" />
              </div>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-purple-600">890</p>
            <div className="mt-2 flex items-center">
              <span className="text-green-600 text-sm">↑ 5.7%</span>
              <span className="text-xs text-gray-500 ml-2">vs last week</span>
            </div>
          </div>
          
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-md transform transition-all hover:scale-105 border-t-4 border-yellow-500">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800">Total Revenue</h2>
              <div className="p-3 bg-yellow-100 rounded-full">
                <AiOutlineDollar className="text-xl md:text-2xl text-yellow-500" />
              </div>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-yellow-600">$12,345</p>
            <div className="mt-2 flex items-center">
              <span className="text-green-600 text-sm">↑ 15.3%</span>
              <span className="text-xs text-gray-500 ml-2">vs last week</span>
            </div>
          </div>
        </div>

        {/* Secondary stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pending Orders</p>
                <p className="text-xl font-semibold">23</p>
              </div>
              <div className="p-2 bg-orange-100 rounded-lg">
                <BiTask className="text-lg text-orange-500" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">New Messages</p>
                <p className="text-xl font-semibold">15</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <AiOutlineMessage className="text-lg text-blue-500" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Support Tickets</p>
                <p className="text-xl font-semibold">7</p>
              </div>
              <div className="p-2 bg-pink-100 rounded-lg">
                <FiZap className="text-lg text-pink-500" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Avg. Rating</p>
                <p className="text-xl font-semibold">4.8/5</p>
              </div>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AiOutlineStar className="text-lg text-yellow-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800">Booking Statistics</h2>
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleFilterChange('week')}
                  className={`px-3 py-1 text-sm rounded-md ${activeFilter === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}`}
                >
                  Week
                </button>
                <button 
                  onClick={() => handleFilterChange('month')}
                  className={`px-3 py-1 text-sm rounded-md ${activeFilter === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}`}
                >
                  Month
                </button>
                <button 
                  onClick={() => handleFilterChange('year')}
                  className={`px-3 py-1 text-sm rounded-md ${activeFilter === 'year' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}`}
                >
                  Year
                </button>
              </div>
            </div>
            <div className="h-64 md:h-72">
              <Line 
                data={lineChartData} 
                options={{ 
                  maintainAspectRatio: false,
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
                    }
                  }
                }} 
              />
            </div>
          </div>
          
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800">Service Breakdown</h2>
            </div>
            <div className="h-64 md:h-72 flex justify-center items-center">
              <div className="w-full max-w-xs">
                <Pie 
                  data={pieChartData} 
                  options={{ 
                    maintainAspectRatio: false,
                    responsive: true,
                  }} 
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-md">
            <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">Weekly Revenue</h2>
            <div className="h-64">
              <Bar 
                data={barChartData} 
                options={{ 
                  maintainAspectRatio: false,
                  responsive: true,
                }} 
              />
            </div>
          </div>
          
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-md">
            <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
            <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
              {[
                { type: "booking", user: "John Doe", service: "Puja Booking", time: "10 mins ago" },
                { type: "signup", user: "Jane Smith", time: "30 mins ago" },
                { type: "update", service: "Astrology Consultation", time: "1 hour ago" },
                { type: "alert", message: "New dispute raised", time: "2 hours ago" },
                { type: "booking", user: "Robert Johnson", service: "Festival Booking", time: "3 hours ago" },
                { type: "update", service: "Online Services", time: "5 hours ago" },
              ].map((activity, index) => (
                <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg transition-all hover:bg-gray-100">
                  <div className="mr-3">
                    {activity.type === "booking" && (
                      <div className="p-2 bg-green-100 rounded-full">
                        <AiOutlineCalendar className="text-green-500" />
                      </div>
                    )}
                    {activity.type === "signup" && (
                      <div className="p-2 bg-blue-100 rounded-full">
                        <FiUser className="text-blue-500" />
                      </div>
                    )}
                    {activity.type === "update" && (
                      <div className="p-2 bg-purple-100 rounded-full">
                        <FiSettings className="text-purple-500" />
                      </div>
                    )}
                    {activity.type === "alert" && (
                      <div className="p-2 bg-red-100 rounded-full">
                        <MdOutlineWarning className="text-red-500" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
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
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 text-center">
              <button className="text-blue-500 hover:text-blue-700 text-sm font-medium">
                View All Activity
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}