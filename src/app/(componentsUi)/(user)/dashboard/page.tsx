"use client";

import Layout from "../layout";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
  FaSearch,
  FaExternalLinkAlt,
  FaShoppingCart,
  FaChevronUp,
  FaChevronDown,
  FaBolt,
  FaEye,
  FaTimes,
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
import useAuthentication from "@/app/helper/authenticationHelper";
export default function UserHome() {
  const router = useRouter();
  // check if user is authenticated
  useAuthentication({ allowedRoles: ["USER"], redirectTo: "/login" });
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [showAllNotifications, setShowAllNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotificationsPanel, setShowNotificationsPanel] = useState(false);

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

  // Custom shimmer loading effect components
  const ShimmerBox = ({ className = "" }) => (
    <div className={`animate-pulse bg-gray-200 rounded-lg ${className}`}></div>
  );

  // If the page is still loading data
  if (pageLoading) {
    return (
      <Layout>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 min-h-screen py-6 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            {/* Shimmer for top header card */}
            <div className="bg-white bg-opacity-60 rounded-xl shadow-lg mb-6 p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                <div className="mb-4 md:mb-0 w-3/4">
                  <ShimmerBox className="h-8 w-64 mb-2" />
                  <ShimmerBox className="h-4 w-48" />
                </div>
                <div className="flex flex-wrap gap-3">
                  <ShimmerBox className="h-10 w-36" />
                  <ShimmerBox className="h-10 w-10 rounded-full" />
                </div>
              </div>
            </div>

            {/* Shimmer for main content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left 2/3 */}
              <div className="lg:col-span-2 space-y-6">
                {/* Bookings shimmer */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="flex border-b p-4">
                    <ShimmerBox className="h-6 w-32 mr-4" />
                    <ShimmerBox className="h-6 w-32" />
                  </div>
                  <div className="p-6">
                    {[1, 2].map((i) => (
                      <div key={i} className="mb-4 flex flex-col sm:flex-row">
                        <ShimmerBox className="w-full sm:w-32 h-32 mb-4 sm:mb-0 sm:mr-4" />
                        <div className="flex-1">
                          <div className="flex justify-between mb-2">
                            <ShimmerBox className="h-6 w-40" />
                            <ShimmerBox className="h-6 w-20 rounded-full" />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                            <ShimmerBox className="h-4 w-full" />
                            <ShimmerBox className="h-4 w-full" />
                            <ShimmerBox className="h-4 w-full" />
                            <ShimmerBox className="h-4 w-full" />
                          </div>
                          <div className="flex gap-2 mt-4">
                            <ShimmerBox className="h-8 w-24" />
                            <ShimmerBox className="h-8 w-24" />
                            <ShimmerBox className="h-8 w-24" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats shimmer */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="p-5 border-b">
                    <ShimmerBox className="h-6 w-36" />
                  </div>
                  <div className="p-5">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="p-4 text-center">
                          <ShimmerBox className="h-12 w-12 mx-auto mb-3 rounded-full" />
                          <ShimmerBox className="h-6 w-16 mx-auto mb-2" />
                          <ShimmerBox className="h-4 w-24 mx-auto" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Popular pujas shimmer */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="p-5 border-b">
                    <ShimmerBox className="h-6 w-48" />
                  </div>
                  <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="border rounded-lg overflow-hidden"
                      >
                        <ShimmerBox className="h-36 w-full" />
                        <div className="p-4">
                          <ShimmerBox className="h-5 w-32 mb-2" />
                          <div className="flex justify-between mt-2">
                            <ShimmerBox className="h-4 w-16" />
                            <ShimmerBox className="h-6 w-20" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right sidebar - 1/3 */}
              <div className="space-y-6">
                {/* Quick actions shimmer */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="p-5 border-b">
                    <ShimmerBox className="h-6 w-32" />
                  </div>
                  <div className="p-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="p-3 flex items-center">
                        <ShimmerBox className="h-10 w-10 mr-3 rounded-lg" />
                        <ShimmerBox className="h-5 w-32 flex-1" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notifications shimmer */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="p-5 border-b flex items-center justify-between">
                    <ShimmerBox className="h-6 w-36" />
                    <ShimmerBox className="h-6 w-12 rounded-full" />
                  </div>
                  <div className="divide-y divide-gray-100">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="p-4 flex">
                        <ShimmerBox className="h-10 w-10 mr-3 rounded-full" />
                        <div className="flex-1">
                          <ShimmerBox className="h-4 w-full mb-2" />
                          <ShimmerBox className="h-3 w-20" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 text-center border-t">
                    <ShimmerBox className="h-5 w-32 mx-auto" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Notifications panel for mobile view */}
      {showNotificationsPanel && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-end transition-all duration-300 ease-in-out">
          <div className="w-full max-w-xs md:max-w-md bg-white h-full overflow-y-auto animate-slide-in-right">
            <div className="p-4 border-b flex items-center justify-between sticky top-0 bg-white shadow-sm z-10">
              <h2 className="text-lg font-semibold text-gray-800">
                Notifications
              </h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowNotificationsPanel(false)}
                aria-label="Close notifications"
              >
                <FaTimes />
              </button>
            </div>

            <div className="divide-y divide-gray-100">
              {notifications.map((notification) => (
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
                      <p className="text-gray-800">{notification.message}</p>
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

            <div className="p-4 sticky bottom-0 border-t bg-white">
              <button
                className="w-full bg-orange-500 text-white py-2 rounded-lg font-medium hover:bg-orange-600 transition"
                onClick={() => setShowNotificationsPanel(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-gradient-to-br from-orange-50 to-orange-100 min-h-screen py-4 px-3 sm:py-6 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Top Header Card - Responsive */}
          <div className="bg-gradient-to-r from-orange-600 to-orange-500 rounded-xl shadow-lg mb-6 overflow-hidden">
            <div className="p-4 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  Namaste, {userName || "Devotee"}!
                </h1>
                <p className="text-orange-100 mt-1">
                  May divine blessings be with you today
                </p>
              </div>

              <div className="flex flex-wrap gap-3 w-full md:w-auto">
                <button
                  onClick={() => router.push("/pujaservice")}
                  className="flex-1 md:flex-none flex items-center justify-center bg-white text-orange-600 px-4 py-2 rounded-lg hover:bg-orange-50 transition shadow-sm"
                >
                  <FaPlus className="mr-2 hidden sm:inline" />
                  <span>Book New Puja</span>
                </button>

                <button
                  className="relative bg-orange-700 hover:bg-orange-800 text-white p-2 rounded-lg transition flex items-center justify-center"
                  onClick={() => setShowNotificationsPanel(true)}
                  aria-label="Show notifications"
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

            {/* Search bar - Mobile first design */}
            <div className="bg-orange-700 py-3 px-4 hidden sm:block">
              <div className="relative max-w-md mx-auto">
                <input
                  type="text"
                  placeholder="Search for pujas, services..."
                  className="w-full bg-white bg-opacity-90 py-2 pl-10 pr-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500" />
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Main Content - Left 2/3 */}
            <div className="lg:col-span-2 space-y-4 md:space-y-6">
              {/* Bookings Tabs Card - Responsive */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="flex border-b overflow-x-auto scrollbar-hide">
                  <button
                    onClick={() => setActiveTab("upcoming")}
                    className={`flex-1 py-3 md:py-4 px-2 md:px-4 text-center font-medium whitespace-nowrap ${
                      activeTab === "upcoming"
                        ? "text-orange-600 border-b-2 border-orange-500"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <FaRegClock className="inline-block mr-1 md:mr-2 mb-0.5" />
                    Upcoming Bookings
                  </button>
                  <button
                    onClick={() => setActiveTab("past")}
                    className={`flex-1 py-3 md:py-4 px-2 md:px-4 text-center font-medium whitespace-nowrap ${
                      activeTab === "past"
                        ? "text-orange-600 border-b-2 border-orange-500"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <FaHistory className="inline-block mr-1 md:mr-2 mb-0.5" />
                    Past Bookings
                  </button>
                </div>

                <div className="p-3 md:p-4">
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
                                <div className="absolute inset-0 bg-black bg-opacity-10"></div>
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
                                    <FaCalendarAlt className="mr-2 text-orange-500 flex-shrink-0" />
                                    <span className="truncate">
                                      {formatDate(booking.date)} •{" "}
                                      {booking.time}
                                    </span>
                                  </div>
                                  <div className="flex items-center text-gray-600">
                                    <FaUser className="mr-2 text-orange-500 flex-shrink-0" />
                                    <span className="truncate">
                                      {booking.pandit}
                                    </span>
                                  </div>
                                  <div className="flex items-center text-gray-600">
                                    <MdOutlineLocationOn className="mr-2 text-orange-500 flex-shrink-0" />
                                    <span className="truncate">
                                      {booking.location}
                                    </span>
                                  </div>
                                  <div className="flex items-center text-gray-600">
                                    <FaWallet className="mr-2 text-orange-500 flex-shrink-0" />
                                    <span className="truncate">
                                      {booking.price}
                                    </span>
                                  </div>
                                </div>

                                {/* Responsive buttons */}
                                <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                                  <button className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-md hover:bg-orange-200 text-sm font-medium transition flex items-center">
                                    <FaEye className="mr-1.5" /> View Details
                                  </button>
                                  <button className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 text-sm font-medium transition flex items-center">
                                    <MdSchedule className="mr-1.5" /> Reschedule
                                  </button>
                                  <button className="px-3 py-1.5 bg-red-50 text-red-700 rounded-md hover:bg-red-100 text-sm font-medium transition flex items-center">
                                    <FaTimes className="mr-1.5" /> Cancel
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}

                          <Link
                            href="/mybooking"
                            className="flex items-center justify-center text-orange-600 hover:text-orange-700 font-medium mt-4 py-2 hover:bg-orange-50 rounded-lg transition"
                          >
                            View All Bookings{" "}
                            <FaChevronRight className="ml-1 text-sm" />
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
                          <p className="text-gray-500 mb-6 max-w-md mx-auto">
                            You don't have any upcoming pujas scheduled.
                          </p>
                          <button
                            onClick={() => router.push("/pujaservice")}
                            className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-lg transition flex items-center mx-auto"
                          >
                            <FaPlus className="mr-2" /> Book Your First Puja
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
                                <div className="absolute inset-0 bg-black bg-opacity-10"></div>
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
                                    <FaCalendarAlt className="mr-2 text-orange-500 flex-shrink-0" />
                                    <span>
                                      {formatDate(booking.date)} •{" "}
                                      {booking.time}
                                    </span>
                                  </div>
                                  <div className="flex items-center text-gray-600">
                                    <FaUser className="mr-2 text-orange-500 flex-shrink-0" />
                                    <span className="truncate">
                                      {booking.pandit}
                                    </span>
                                  </div>
                                  <div className="flex items-center text-gray-600">
                                    <MdOutlineLocationOn className="mr-2 text-orange-500 flex-shrink-0" />
                                    <span className="truncate">
                                      {booking.location}
                                    </span>
                                  </div>
                                  <div className="flex items-center text-gray-600">
                                    <FaWallet className="mr-2 text-orange-500 flex-shrink-0" />
                                    <span>{booking.price}</span>
                                  </div>
                                </div>

                                <div className="flex items-center justify-between flex-wrap gap-y-3">
                                  <div className="flex items-center">
                                    <span className="text-gray-600 mr-2 text-sm">
                                      Rating:
                                    </span>
                                    <div className="flex items-center">
                                      {Array(5)
                                        .fill(0)
                                        .map((_, i) => (
                                          <FaStar
                                            key={i}
                                            className={`${
                                              i < (booking.rating || 0)
                                                ? "text-yellow-500"
                                                : "text-gray-300"
                                            } text-sm sm:text-base`}
                                          />
                                        ))}
                                    </div>
                                  </div>

                                  <div className="flex gap-2 ml-auto">
                                    <button className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-md hover:bg-orange-200 text-sm font-medium transition flex items-center">
                                      <FaShoppingCart className="mr-1.5" /> Book
                                      Again
                                    </button>
                                    <button className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm font-medium transition flex items-center">
                                      <FaEye className="mr-1.5" /> Details
                                    </button>
                                  </div>
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
                          <p className="text-gray-500 max-w-md mx-auto">
                            You haven't completed any puja services yet.
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* User Stats Card - Responsive */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-4 md:p-5 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                    <MdOutlineTrendingUp className="mr-2 text-orange-500" />
                    Your Statistics
                  </h2>
                </div>

                <div className="p-3 md:p-5">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
                    <div className="bg-orange-50 rounded-lg p-3 md:p-4 text-center">
                      <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-orange-100 rounded-full mb-2 md:mb-3">
                        <FaCalendarAlt className="text-orange-600 text-lg md:text-xl" />
                      </div>
                      <div className="text-xl md:text-2xl font-bold text-gray-800">
                        {userStats.totalBookings}
                      </div>
                      <div className="text-xs md:text-sm text-gray-600">
                        Total Bookings
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-3 md:p-4 text-center">
                      <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-full mb-2 md:mb-3">
                        <FaPrayingHands className="text-green-600 text-lg md:text-xl" />
                      </div>
                      <div className="text-xl md:text-2xl font-bold text-gray-800">
                        {userStats.completedPujas}
                      </div>
                      <div className="text-xs md:text-sm text-gray-600">
                        Completed Pujas
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-3 md:p-4 text-center">
                      <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-full mb-2 md:mb-3">
                        <FaWallet className="text-blue-600 text-lg md:text-xl" />
                      </div>
                      <div className="text-xl md:text-2xl font-bold text-gray-800">
                        {userStats.totalSpent}
                      </div>
                      <div className="text-xs md:text-sm text-gray-600">
                        Total Spent
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-3 md:p-4 text-center">
                      <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-full mb-2 md:mb-3">
                        <MdOutlineTrendingUp className="text-purple-600 text-lg md:text-xl" />
                      </div>
                      <div className="text-xl md:text-2xl font-bold text-gray-800">
                        {userStats.savedThisYear}
                      </div>
                      <div className="text-xs md:text-sm text-gray-600">
                        Savings This Year
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Popular Pujas Card - Responsive */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-4 md:p-5 border-b border-gray-100 flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                    <FaStar className="mr-2 text-orange-500" />
                    Popular Puja Services
                  </h2>

                  <Link
                    href="/services"
                    className="text-sm text-orange-600 hover:text-orange-700 font-medium flex items-center"
                  >
                    View All <FaChevronRight className="ml-1 text-xs" />
                  </Link>
                </div>

                <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-4 overflow-x-auto">
                  {popularPujas.map((puja) => (
                    <div
                      key={puja.id}
                      className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer flex-shrink-0"
                      onClick={() => router.push(`/pujaservice/${puja.id}`)}
                    >
                      <div className="relative h-36">
                        <Image
                          src={puja.image}
                          alt={puja.name}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-gray-800">
                          {puja.name}
                        </h3>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-orange-600 font-semibold">
                            {puja.price}
                          </span>
                          <button className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded hover:bg-orange-200 transition flex items-center">
                            <FaPlus className="mr-1" /> Book
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar - 1/3 */}
            <div className="space-y-4 md:space-y-6">
              {/* Quick Actions Card - Responsive */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-4 md:p-5 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                    <FaBolt className="mr-2 text-orange-500" />
                    Quick Actions
                  </h2>
                </div>
                <div className="p-2 grid grid-cols-2 sm:grid-cols-1 gap-1">
                  <Link
                    href="/pujaservice"
                    className="flex items-center p-3 rounded-lg hover:bg-orange-50 transition"
                  >
                    <div className="bg-orange-100 p-2.5 rounded-lg mr-3">
                      <FaPlus className="text-orange-600" />
                    </div>
                    <span className="font-medium text-gray-800 text-sm md:text-base">
                      Book New Puja
                    </span>
                    <FaChevronRight className="ml-auto text-gray-400 text-xs" />
                  </Link>

                  <Link
                    href="/profile"
                    className="flex items-center p-3 rounded-lg hover:bg-orange-50 transition"
                  >
                    <div className="bg-blue-100 p-2.5 rounded-lg mr-3">
                      <FaUser className="text-blue-600" />
                    </div>
                    <span className="font-medium text-gray-800 text-sm md:text-base">
                      Manage Profile
                    </span>
                    <FaChevronRight className="ml-auto text-gray-400 text-xs" />
                  </Link>

                  <Link
                    href="/transactions"
                    className="flex items-center p-3 rounded-lg hover:bg-orange-50 transition"
                  >
                    <div className="bg-green-100 p-2.5 rounded-lg mr-3">
                      <FaHistory className="text-green-600" />
                    </div>
                    <span className="font-medium text-gray-800 text-sm md:text-base">
                      Transaction History
                    </span>
                    <FaChevronRight className="ml-auto text-gray-400 text-xs" />
                  </Link>

                  <Link
                    href="/address"
                    className="flex items-center p-3 rounded-lg hover:bg-orange-50 transition"
                  >
                    <div className="bg-purple-100 p-2.5 rounded-lg mr-3">
                      <FaMapMarkerAlt className="text-purple-600" />
                    </div>
                    <span className="font-medium text-gray-800 text-sm md:text-base">
                      Manage Addresses
                    </span>
                    <FaChevronRight className="ml-auto text-gray-400 text-xs" />
                  </Link>

                  <Link
                    href="/settings"
                    className="flex items-center p-3 rounded-lg hover:bg-orange-50 transition"
                  >
                    <div className="bg-gray-100 p-2.5 rounded-lg mr-3">
                      <FaCog className="text-gray-600" />
                    </div>
                    <span className="font-medium text-gray-800 text-sm md:text-base">
                      Account Settings
                    </span>
                    <FaChevronRight className="ml-auto text-gray-400 text-xs" />
                  </Link>

                  <Link
                    href="/contact"
                    className="flex items-center p-3 rounded-lg hover:bg-orange-50 transition"
                  >
                    <div className="bg-red-100 p-2.5 rounded-lg mr-3">
                      <FaHeadset className="text-red-600" />
                    </div>
                    <span className="font-medium text-gray-800 text-sm md:text-base">
                      Customer Support
                    </span>
                    <FaChevronRight className="ml-auto text-gray-400 text-xs" />
                  </Link>
                </div>
              </div>

              {/* Notifications Card - Responsive and only visible on desktop/tablet */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden hidden sm:block">
                <div className="p-4 md:p-5 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                    <IoMdNotificationsOutline className="mr-2 text-orange-500" />
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
                    className="text-orange-600 hover:text-orange-800 font-medium text-sm flex items-center justify-center mx-auto"
                  >
                    {showAllNotifications ? (
                      <>
                        Show Less <FaChevronUp className="ml-1" />
                      </>
                    ) : (
                      <>
                        View All Notifications{" "}
                        <FaChevronDown className="ml-1" />
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Upcoming Festivals Card - Responsive */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-4 md:p-5 border-b border-gray-100 flex items-center">
                  <MdFestival className="mr-2 text-orange-500 text-xl" />
                  <h2 className="text-lg font-semibold text-gray-800">
                    Upcoming Festivals
                  </h2>
                </div>

                <div className="p-4">
                  {upcomingFestivals.map((festival, index) => (
                    <div
                      key={festival.name}
                      className={`py-3 ${
                        index !== upcomingFestivals.length - 1
                          ? "border-b border-gray-100"
                          : ""
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {festival.name}
                        </h3>
                        <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                          {festival.days} days
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1 flex items-center">
                        <FaCalendarAlt className="mr-1.5 text-orange-500" />
                        {festival.date}
                      </p>
                    </div>
                  ))}
                  <div className="mt-3 text-center">
                    <Link
                      href="/festivals"
                      className="text-orange-600 hover:text-orange-700 font-medium text-sm flex items-center justify-center"
                    >
                      View All Festivals{" "}
                      <FaExternalLinkAlt className="ml-1.5 text-xs" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
