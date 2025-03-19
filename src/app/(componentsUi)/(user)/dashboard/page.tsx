"use client";

import Layout from "../layout";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import useAuth from "@/app/helper/useAuth";
import {
  FaCalendarAlt,
  FaUser,
  FaHistory,
  FaHeadset,
  FaPlus,
  FaWallet,
  FaMapMarkerAlt,
  FaStar,
  FaGift,
  FaPrayingHands,
  FaRegClock,
  FaChevronRight,
  FaCog,
} from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import {
  MdFestival,
  MdOutlineLocationOn,
  MdSchedule,
  MdOutlineTrendingUp,
} from "react-icons/md";
import findUser from "@/app/helper/findUser";
import Loader from "@/app/utils/loader";
import Image from "next/image";
import Link from "next/link";

export default function UserHome() {
  const isAuthenticated = useAuth();
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [showAllNotifications, setShowAllNotifications] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRole = localStorage.getItem("role");
      setRole(storedRole);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push("/login");
      } else if (role !== "USER") {
        router.push("/login");
      }
    }
  }, [isAuthenticated, role, loading, router]);

  const { userName } = findUser();

  // Mock data for the dashboard
  const [upcomingBookings, setUpcomingBookings] = useState([
    {
      id: 1,
      name: "Ganesh Puja",
      date: "2025-04-15",
      time: "10:00 AM",
      pandit: "Pandit Ramesh Sharma",
      status: "confirmed",
      location: "Home",
      price: "₹2,100",
      image: "/image/ganesh.jpg",
    },
    {
      id: 2,
      name: "Griha Pravesh",
      date: "2025-04-30",
      time: "8:30 AM",
      pandit: "Pandit Suresh Joshi",
      status: "pending",
      location: "Apartment 4B, Sunrise Heights",
      price: "₹5,500",
      image: "/image/grihapravesh.jpg",
    },
    {
      id: 3,
      name: "Satyanarayan Puja",
      date: "2025-05-10",
      time: "6:00 PM",
      pandit: "Pandit Vikram Trivedi",
      status: "confirmed",
      location: "Home",
      price: "₹3,200",
      image: "/image/satyanarayan.jpg",
    },
  ]);

  const [pastBookings, setPastBookings] = useState([
    {
      id: 4,
      name: "Laxmi Puja",
      date: "2025-03-20",
      time: "7:00 PM",
      pandit: "Pandit Mahesh Acharya",
      status: "completed",
      location: "Home",
      price: "₹2,500",
      image: "/image/laxmi.jpg",
      rating: 5,
    },
    {
      id: 5,
      name: "Durga Puja",
      date: "2025-03-05",
      time: "4:30 PM",
      pandit: "Pandit Dinesh Kumar",
      status: "completed",
      location: "Community Center",
      price: "₹4,100",
      image: "/image/durga.jpg",
      rating: 4,
    },
  ]);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "Special offer: 20% off on Ganesh Puja bookings!",
      type: "offer",
      time: "2 hours ago",
      isNew: true,
    },
    {
      id: 2,
      message: "Your Laxmi Puja booking has been confirmed.",
      type: "booking",
      time: "Yesterday",
      isNew: true,
    },
    {
      id: 3,
      message: "Upcoming festival: Navratri celebrations starting next week",
      type: "info",
      time: "2 days ago",
      isNew: false,
    },
    {
      id: 4,
      message: "Pandit Ramesh has been assigned to your upcoming puja.",
      type: "booking",
      time: "3 days ago",
      isNew: false,
    },
    {
      id: 5,
      message: "Your feedback for the Durga Puja service was appreciated!",
      type: "feedback",
      time: "1 week ago",
      isNew: false,
    },
  ]);

  // Popular puja services widget
  const popularPujas = [
    {
      id: 1,
      name: "Satyanarayan Puja",
      price: "₹2,100",
      image: "/image/satyanarayan.jpg",
    },
    {
      id: 2,
      name: "Griha Pravesh",
      price: "₹5,500",
      image: "/image/grihapravesh.jpg",
    },
    { id: 3, name: "Ganesh Puja", price: "₹1,900", image: "/image/ganesh.jpg" },
  ];

  // Upcoming festivals widget
  const upcomingFestivals = [
    { name: "Ram Navami", date: "April 17, 2025", days: 7 },
    { name: "Akshaya Tritiya", date: "May 02, 2025", days: 22 },
    { name: "Buddha Purnima", date: "May 12, 2025", days: 32 },
  ];

  // User stats widget
  const userStats = {
    totalBookings: 7,
    completedPujas: 5,
    totalSpent: "₹17,400",
    savedThisYear: "₹2,200",
  };

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return null;
  }

  // Format date to readable format
  interface FormatDateOptions {
    weekday: "short";
    year: "numeric";
    month: "short";
    day: "numeric";
  }

  const formatDate = (dateStr: string): string => {
    const options: FormatDateOptions = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  const getStatusBadge = (
    status: "confirmed" | "pending" | "completed" | string
  ) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 border border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border border-yellow-200";
      case "completed":
        return "bg-blue-100 text-blue-800 border border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  const getNotificationIcon = (type: any) => {
    switch (type) {
      case "offer":
        return <FaGift className="text-purple-500" />;
      case "booking":
        return <FaCalendarAlt className="text-blue-500" />;
      case "info":
        return <MdFestival className="text-orange-500" />;
      case "feedback":
        return <FaStar className="text-yellow-500" />;
      default:
        return <IoMdNotificationsOutline className="text-gray-500" />;
    }
  };

  return (
    <Layout>
      <div className="bg-gradient-to-br from-orange-50 to-orange-100 min-h-screen py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Top Header Card */}
          <div className="bg-gradient-to-r from-orange-600 to-orange-500 rounded-xl shadow-lg mb-6 overflow-hidden">
            <div className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  Namaste, {userName || "Devotee"}!
                </h1>
                <p className="text-orange-100 mt-1">
                  May divine blessings be with you today
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => router.push("/pujaservice")}
                  className="flex items-center bg-white text-orange-600 px-4 py-2 rounded-lg hover:bg-orange-50 transition shadow-sm"
                >
                  <FaPlus className="mr-2" />
                  <span>Book New Puja</span>
                </button>

                <button
                  className="relative bg-orange-700 hover:bg-orange-800 text-white p-2 rounded-lg transition flex items-center"
                  onClick={() => setShowAllNotifications(!showAllNotifications)}
                >
                  <IoMdNotificationsOutline className="text-xl" />
                  {notifications.filter((n) => n.isNew).length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-xs text-white w-5 h-5 flex items-center justify-center rounded-full">
                      {notifications.filter((n) => n.isNew).length}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content - Left 2/3 */}
            <div className="lg:col-span-2 space-y-6">
              {/* Bookings Tabs Card */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="flex border-b">
                  <button
                    onClick={() => setActiveTab("upcoming")}
                    className={`flex-1 py-4 px-4 text-center font-medium ${
                      activeTab === "upcoming"
                        ? "text-orange-600 border-b-2 border-orange-500"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Upcoming Bookings
                  </button>
                  <button
                    onClick={() => setActiveTab("past")}
                    className={`flex-1 py-4 px-4 text-center font-medium ${
                      activeTab === "past"
                        ? "text-orange-600 border-b-2 border-orange-500"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Past Bookings
                  </button>
                </div>

                <div className="p-4">
                  {activeTab === "upcoming" ? (
                    <>
                      {upcomingBookings.length > 0 ? (
                        <div className="space-y-4">
                          {upcomingBookings.map((booking) => (
                            <div
                              key={booking.id}
                              className="flex flex-col sm:flex-row bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
                            >
                              <div className="relative w-full sm:w-32 h-32 sm:h-auto">
                                <Image
                                  src={
                                    booking.image || "/image/default-puja.jpg"
                                  }
                                  alt={booking.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>

                              <div className="flex-grow p-4">
                                <div className="flex flex-wrap justify-between items-start mb-2">
                                  <h3 className="text-lg font-semibold text-gray-800">
                                    {booking.name}
                                  </h3>
                                  <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                                      booking.status
                                    )}`}
                                  >
                                    {booking.status.charAt(0).toUpperCase() +
                                      booking.status.slice(1)}
                                  </span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm mb-3">
                                  <div className="flex items-center text-gray-600">
                                    <FaCalendarAlt className="mr-2 text-orange-500" />
                                    <span>
                                      {formatDate(booking.date)} •{" "}
                                      {booking.time}
                                    </span>
                                  </div>
                                  <div className="flex items-center text-gray-600">
                                    <FaUser className="mr-2 text-orange-500" />
                                    <span>{booking.pandit}</span>
                                  </div>
                                  <div className="flex items-center text-gray-600">
                                    <MdOutlineLocationOn className="mr-2 text-orange-500" />
                                    <span>{booking.location}</span>
                                  </div>
                                  <div className="flex items-center text-gray-600">
                                    <FaWallet className="mr-2 text-orange-500" />
                                    <span>{booking.price}</span>
                                  </div>
                                </div>

                                <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                                  <button className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-md hover:bg-orange-200 text-sm font-medium transition">
                                    View Details
                                  </button>
                                  <button className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 text-sm font-medium transition">
                                    Reschedule
                                  </button>
                                  <button className="px-3 py-1.5 bg-red-50 text-red-700 rounded-md hover:bg-red-100 text-sm font-medium transition">
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}

                          <Link
                            href="/bookings"
                            className="block text-center text-orange-600 hover:text-orange-700 font-medium mt-4"
                          >
                            View All Bookings
                          </Link>
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-orange-100 rounded-full">
                            <FaCalendarAlt className="text-orange-500 text-2xl" />
                          </div>
                          <h3 className="text-lg font-medium text-gray-800 mb-2">
                            No Upcoming Bookings
                          </h3>
                          <p className="text-gray-500 mb-6">
                            You don't have any upcoming pujas scheduled.
                          </p>
                          <button
                            onClick={() => router.push("/pujaservice")}
                            className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-lg transition"
                          >
                            Book Your First Puja
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {pastBookings.length > 0 ? (
                        <div className="space-y-4">
                          {pastBookings.map((booking) => (
                            <div
                              key={booking.id}
                              className="flex flex-col sm:flex-row bg-white border rounded-lg overflow-hidden shadow-sm"
                            >
                              <div className="relative w-full sm:w-32 h-32 sm:h-auto">
                                <Image
                                  src={
                                    booking.image || "/image/default-puja.jpg"
                                  }
                                  alt={booking.name}
                                  fill
                                  className="object-cover opacity-80"
                                />
                              </div>

                              <div className="flex-grow p-4">
                                <div className="flex flex-wrap justify-between items-start mb-2">
                                  <h3 className="text-lg font-semibold text-gray-800">
                                    {booking.name}
                                  </h3>
                                  <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                                      booking.status
                                    )}`}
                                  >
                                    {booking.status.charAt(0).toUpperCase() +
                                      booking.status.slice(1)}
                                  </span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm mb-3">
                                  <div className="flex items-center text-gray-600">
                                    <FaCalendarAlt className="mr-2 text-orange-500" />
                                    <span>
                                      {formatDate(booking.date)} •{" "}
                                      {booking.time}
                                    </span>
                                  </div>
                                  <div className="flex items-center text-gray-600">
                                    <FaUser className="mr-2 text-orange-500" />
                                    <span>{booking.pandit}</span>
                                  </div>
                                  <div className="flex items-center text-gray-600">
                                    <MdOutlineLocationOn className="mr-2 text-orange-500" />
                                    <span>{booking.location}</span>
                                  </div>
                                  <div className="flex items-center text-gray-600">
                                    <FaWallet className="mr-2 text-orange-500" />
                                    <span>{booking.price}</span>
                                  </div>
                                </div>

                                <div className="flex items-center justify-between mt-2">
                                  <div className="flex items-center">
                                    <span className="text-gray-600 mr-2">
                                      Rating:
                                    </span>
                                    <div className="flex items-center">
                                      {Array(5)
                                        .fill(0)
                                        .map((_, i) => (
                                          <FaStar
                                            key={i}
                                            className={
                                              i < (booking.rating || 0)
                                                ? "text-yellow-500"
                                                : "text-gray-300"
                                            }
                                          />
                                        ))}
                                    </div>
                                  </div>

                                  <button className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-md hover:bg-orange-200 text-sm font-medium transition">
                                    Book Again
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-orange-100 rounded-full">
                            <FaHistory className="text-orange-500 text-2xl" />
                          </div>
                          <h3 className="text-lg font-medium text-gray-800 mb-2">
                            No Past Bookings
                          </h3>
                          <p className="text-gray-500">
                            You haven't completed any puja services yet.
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* User Stats Card */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-5 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Your Statistics
                  </h2>
                </div>

                <div className="p-5">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-orange-50 rounded-lg p-4 text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-3">
                        <FaCalendarAlt className="text-orange-600 text-xl" />
                      </div>
                      <div className="text-2xl font-bold text-gray-800">
                        {userStats.totalBookings}
                      </div>
                      <div className="text-sm text-gray-600">
                        Total Bookings
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
                        <FaPrayingHands className="text-green-600 text-xl" />
                      </div>
                      <div className="text-2xl font-bold text-gray-800">
                        {userStats.completedPujas}
                      </div>
                      <div className="text-sm text-gray-600">
                        Completed Pujas
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                        <FaWallet className="text-blue-600 text-xl" />
                      </div>
                      <div className="text-2xl font-bold text-gray-800">
                        {userStats.totalSpent}
                      </div>
                      <div className="text-sm text-gray-600">Total Spent</div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4 text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-3">
                        <MdOutlineTrendingUp className="text-purple-600 text-xl" />
                      </div>
                      <div className="text-2xl font-bold text-gray-800">
                        {userStats.savedThisYear}
                      </div>
                      <div className="text-sm text-gray-600">
                        Savings This Year
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Popular Pujas Card */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-5 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Popular Puja Services
                  </h2>
                </div>

                <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {popularPujas.map((puja) => (
                    <div
                      key={puja.id}
                      className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer"
                      onClick={() => router.push(`/pujaservice/${puja.id}`)}
                    >
                      <div className="relative h-36">
                        <Image
                          src={puja.image}
                          alt={puja.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-gray-800">
                          {puja.name}
                        </h3>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-orange-600 font-semibold">
                            {puja.price}
                          </span>
                          <button className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded hover:bg-orange-200">
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar - 1/3 */}
            <div className="space-y-6">
              {/* Quick Actions Card */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-5 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Quick Actions
                  </h2>
                </div>
                <div className="p-2">
                  <Link
                    href="/pujaservice"
                    className="flex items-center p-3 rounded-lg hover:bg-orange-50 transition"
                  >
                    <div className="bg-orange-100 p-2.5 rounded-lg mr-3">
                      <FaPlus className="text-orange-600" />
                    </div>
                    <span className="font-medium text-gray-800">
                      Book New Puja
                    </span>
                    <FaChevronRight className="ml-auto text-gray-400" />
                  </Link>

                  <Link
                    href="/user/profile"
                    className="flex items-center p-3 rounded-lg hover:bg-orange-50 transition"
                  >
                    <div className="bg-blue-100 p-2.5 rounded-lg mr-3">
                      <FaUser className="text-blue-600" />
                    </div>
                    <span className="font-medium text-gray-800">
                      Manage Profile
                    </span>
                    <FaChevronRight className="ml-auto text-gray-400" />
                  </Link>

                  <Link
                    href="/user/transactions"
                    className="flex items-center p-3 rounded-lg hover:bg-orange-50 transition"
                  >
                    <div className="bg-green-100 p-2.5 rounded-lg mr-3">
                      <FaHistory className="text-green-600" />
                    </div>
                    <span className="font-medium text-gray-800">
                      Transaction History
                    </span>
                    <FaChevronRight className="ml-auto text-gray-400" />
                  </Link>

                  <Link
                    href="/user/address"
                    className="flex items-center p-3 rounded-lg hover:bg-orange-50 transition"
                  >
                    <div className="bg-purple-100 p-2.5 rounded-lg mr-3">
                      <FaMapMarkerAlt className="text-purple-600" />
                    </div>
                    <span className="font-medium text-gray-800">
                      Manage Addresses
                    </span>
                    <FaChevronRight className="ml-auto text-gray-400" />
                  </Link>

                  <Link
                    href="/user/settings"
                    className="flex items-center p-3 rounded-lg hover:bg-orange-50 transition"
                  >
                    <div className="bg-gray-100 p-2.5 rounded-lg mr-3">
                      <FaCog className="text-gray-600" />
                    </div>
                    <span className="font-medium text-gray-800">
                      Account Settings
                    </span>
                    <FaChevronRight className="ml-auto text-gray-400" />
                  </Link>

                  <Link
                    href="/contact"
                    className="flex items-center p-3 rounded-lg hover:bg-orange-50 transition"
                  >
                    <div className="bg-red-100 p-2.5 rounded-lg mr-3">
                      <FaHeadset className="text-red-600" />
                    </div>
                    <span className="font-medium text-gray-800">
                      Customer Support
                    </span>
                    <FaChevronRight className="ml-auto text-gray-400" />
                  </Link>
                </div>
              </div>

              {/* Notifications Card */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Notifications
                  </h2>
                  <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-1 rounded-full">
                    {notifications.filter((n) => n.isNew).length} new
                  </span>
                </div>

                <div className="divide-y divide-gray-100 max-h-[300px] overflow-y-auto">
                  {(showAllNotifications
                    ? notifications
                    : notifications.slice(0, 3)
                  ).map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 ${
                        notification.isNew ? "bg-orange-50" : "bg-white"
                      }`}
                    >
                      <div className="flex">
                        <div
                          className={`mt-1 mr-3 p-2 rounded-full ${
                            notification.type === "offer"
                              ? "bg-purple-100"
                              : notification.type === "booking"
                              ? "bg-blue-100"
                              : notification.type === "info"
                              ? "bg-orange-100"
                              : "bg-yellow-100"
                          }`}
                        >
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-800">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {notification.time}
                          </p>
                        </div>
                        {notification.isNew && (
                          <div className="h-2 w-2 bg-orange-500 rounded-full"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 text-center border-t border-gray-100">
                  <button
                    onClick={() =>
                      setShowAllNotifications(!showAllNotifications)
                    }
                    className="text-orange-600 hover:text-orange-800 font-medium text-sm"
                  >
                    {showAllNotifications
                      ? "Show Less"
                      : "View All Notifications"}
                  </button>
                </div>
              </div>

              {/* Upcoming Festivals Card */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-5 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Upcoming Festivals
                  </h2>
                </div>

                <div className="p-4">
                  {upcomingFestivals.map((festival) => (
                    <div
                      key={festival.name}
                      className="border-b border-gray-100 py-3"
                    >
                      <h3 className="text-lg font-semibold text-gray-800">
                        {festival.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {festival.date} ({festival.days} days to go)
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
