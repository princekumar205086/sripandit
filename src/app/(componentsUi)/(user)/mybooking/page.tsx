"use client";
import React, { useState, useEffect } from "react";
import {
  FaShoppingCart,
  FaBell,
  FaFilter,
  FaSort,
  FaStar,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaLanguage,
  FaHistory,
  FaClock,
  FaPen,
  FaComments,
  FaTimes,
  FaEye,
} from "react-icons/fa";
import { GiIndianPalace } from "react-icons/gi";
import Link from "next/link";
import Layout from "../layout";
import useAuthentication from "@/app/helper/authenticationHelper";

interface BookingType {
  id: number;
  type: string;
  name: string;
  date: string;
  time: string;
  location: string;
  language: string;
  status: string;
  provider: string;
}

interface BookingCardProps {
  booking: BookingType;
  isUpcoming: boolean;
}

const BookingPage = () => {
  // check if the user is logged in and has the role of USER
  useAuthentication({ allowedRoles: ["USER"], redirectTo: "/login" });
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [filterType, setFilterType] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<{
    upcoming: BookingType[];
    past: BookingType[];
  }>({
    upcoming: [],
    past: [],
  });

  // Simulate fetching data when component mounts
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // In a real app, we would fetch data from API
        // For now, use setTimeout to simulate API delay
        setTimeout(() => {
          setBookings({
            upcoming: dummyUpcomingBookings,
            past: dummyPastBookings,
          });
          setLoading(false);
        }, 800); // Simulate network delay
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Filter bookings based on selected type
  const filteredBookings = (type: keyof typeof bookings) => {
    const bookingsToFilter = bookings[type] || [];

    if (filterType === "all") return bookingsToFilter;

    return bookingsToFilter.filter((booking) => booking.type === filterType);
  };

  // Sort bookings based on selected order
  const sortedBookings = (type: keyof typeof bookings) => {
    const bookingsToSort = [...filteredBookings(type)];

    switch (sortOrder) {
      case "newest":
        return bookingsToSort.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      case "oldest":
        return bookingsToSort.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
      case "name":
        return bookingsToSort.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return bookingsToSort;
    }
  };

  const dummyUpcomingBookings = [
    {
      id: 1,
      type: "puja",
      name: "Ganesh Puja",
      date: "2024-02-15",
      time: "10:00 AM",
      location: "At Home",
      language: "Sanskrit",
      status: "upcoming",
      provider: "Pandit Sharma",
    },
    {
      id: 2,
      type: "astrology",
      name: "Birth Chart Reading",
      date: "2024-02-18",
      time: "2:30 PM",
      location: "Online",
      language: "English",
      status: "upcoming",
      provider: "Acharya Gupta",
    },
  ];

  const dummyPastBookings = [
    {
      id: 3,
      type: "puja",
      name: "Lakshmi Puja",
      date: "2024-01-15",
      time: "11:00 AM",
      location: "Temple",
      language: "Hindi",
      status: "completed",
      provider: "Pandit Mishra",
    },
    {
      id: 4,
      type: "astrology",
      name: "Career Consultation",
      date: "2024-01-10",
      time: "4:00 PM",
      location: "Online",
      language: "English",
      status: "completed",
      provider: "Jyotish Verma",
    },
  ];

  // Separate BookingCard component without the Layout wrapper
  const BookingCard: React.FC<BookingCardProps> = ({ booking, isUpcoming }) => {
    const formattedDate = new Date(booking.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    const handleContactProvider = () => {
      alert(`Opening chat with ${booking.provider}...`);
    };

    const handleModifyBooking = () => {
      alert(`Modifying booking for ${booking.name}...`);
    };

    const handleCancelBooking = () => {
      if (
        window.confirm(
          `Are you sure you want to cancel your ${booking.name} booking?`
        )
      ) {
        alert("Booking cancelled successfully");
      }
    };

    const handleAddReview = () => {
      alert(`Adding review for ${booking.name}...`);
    };

    return (
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-4 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
          <div className="flex items-center mb-2 sm:mb-0">
            <div
              className={`p-2 rounded-full mr-3 ${
                booking.type === "puja" ? "bg-orange-100" : "bg-purple-100"
              }`}
            >
              {booking.type === "puja" ? (
                <GiIndianPalace
                  className={`text-orange-500 text-xl md:text-2xl`}
                />
              ) : (
                <FaStar className={`text-purple-500 text-xl md:text-2xl`} />
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold">{booking.name}</h3>
              <p className="text-gray-600 text-sm">
                {booking.type.charAt(0).toUpperCase() + booking.type.slice(1)}{" "}
                with {booking.provider}
              </p>
            </div>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs md:text-sm font-medium mt-2 sm:mt-0 ${
              booking.status === "upcoming"
                ? "bg-green-100 text-green-800"
                : booking.status === "completed"
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          <div className="flex items-start">
            <FaCalendarAlt className="text-gray-500 mt-1 mr-2" />
            <div>
              <p className="text-xs text-gray-500">Date & Time</p>
              <p className="font-medium text-sm">
                {formattedDate}{" "}
                <span className="text-gray-700">at {booking.time}</span>
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <FaMapMarkerAlt className="text-gray-500 mt-1 mr-2" />
            <div>
              <p className="text-xs text-gray-500">Location</p>
              <p className="font-medium text-sm">{booking.location}</p>
            </div>
          </div>
          <div className="flex items-start">
            <FaLanguage className="text-gray-500 mt-1 mr-2" />
            <div>
              <p className="text-xs text-gray-500">Language</p>
              <p className="font-medium text-sm">{booking.language}</p>
            </div>
          </div>
        </div>

        {/* Responsive button handling */}
        <div className="flex flex-wrap gap-2">
          {isUpcoming ? (
            <>
              {/* Mobile view - Show fewer buttons with dropdown */}
              <div className="flex w-full sm:hidden">
                <button
                  onClick={handleModifyBooking}
                  className="flex-1 bg-blue-500 text-white px-2 py-2 rounded-l hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition flex items-center justify-center text-sm"
                >
                  <FaPen className="mr-1" /> Modify
                </button>
                <button
                  onClick={handleCancelBooking}
                  className="flex-1 bg-red-500 text-white px-2 py-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition flex items-center justify-center text-sm"
                >
                  <FaTimes className="mr-1" /> Cancel
                </button>
                <button
                  onClick={handleContactProvider}
                  className="flex-1 bg-green-500 text-white px-2 py-2 rounded-r hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 transition flex items-center justify-center text-sm"
                >
                  <FaComments className="mr-1" /> Contact
                </button>
              </div>

              {/* Desktop view */}
              <div className="hidden sm:flex flex-wrap gap-2">
                <button
                  onClick={handleModifyBooking}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition flex items-center"
                >
                  <FaPen className="mr-2" /> Modify Booking
                </button>
                <button
                  onClick={handleCancelBooking}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition flex items-center"
                >
                  <FaTimes className="mr-2" /> Cancel Booking
                </button>
                <button
                  onClick={handleContactProvider}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 transition flex items-center"
                >
                  <FaComments className="mr-2" /> Contact Provider
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Mobile view for past bookings */}
              <div className="flex w-full sm:hidden">
                <button
                  onClick={handleAddReview}
                  className="flex-1 bg-purple-500 text-white px-4 py-2 rounded-l hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-300 transition flex items-center justify-center text-sm"
                >
                  <FaStar className="mr-1" /> Review
                </button>
                <button className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-r hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 transition flex items-center justify-center text-sm">
                  <FaEye className="mr-1" /> Details
                </button>
              </div>

              {/* Desktop view for past bookings */}
              <div className="hidden sm:flex gap-2">
                <button
                  onClick={handleAddReview}
                  className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-300 transition flex items-center"
                >
                  <FaStar className="mr-2" /> Add Review
                </button>
                <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 transition flex items-center">
                  <FaEye className="mr-2" /> View Details
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  // Loading state component with Layout at the page level
  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50">
          <main className="container mx-auto px-4 py-8">
            <div className="flex justify-between mb-6">
              <h1 className="text-2xl md:text-3xl font-bold">My Bookings</h1>
            </div>
            <div className="flex mb-6 border-b animate-pulse">
              <div className="h-12 w-32 bg-gray-200 rounded mr-4"></div>
              <div className="h-12 w-32 bg-gray-200 rounded"></div>
            </div>
            <div className="flex flex-wrap gap-4 mb-6 animate-pulse">
              <div className="h-10 w-36 bg-gray-200 rounded"></div>
              <div className="h-10 w-36 bg-gray-200 rounded"></div>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg shadow p-4 md:p-6 mb-4 animate-pulse"
                >
                  <div className="flex justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-12 rounded-full bg-gray-200"></div>
                      <div className="space-y-2">
                        <div className="h-4 w-36 bg-gray-200 rounded"></div>
                        <div className="h-3 w-24 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                    <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="h-16 bg-gray-100 rounded"></div>
                    <div className="h-16 bg-gray-100 rounded"></div>
                    <div className="h-16 bg-gray-100 rounded"></div>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-10 w-32 bg-gray-200 rounded"></div>
                    <div className="h-10 w-32 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Main Content */}
        <main className="container mx-auto px-4 py-6 md:py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
            <h1 className="text-2xl md:text-3xl font-bold">My Bookings</h1>
            <Link
              href="/services"
              className="bg-orange-500 text-white px-3 py-2 rounded-lg hover:bg-orange-600 transition text-sm md:text-base flex items-center w-full sm:w-auto justify-center"
            >
              <FaShoppingCart className="mr-2" /> Book New Service
            </Link>
          </div>

          {/* Tabs */}
          <div className="flex mb-6 border-b overflow-x-auto scrollbar-hide">
            <button
              className={`px-4 md:px-6 py-3 text-sm md:text-base whitespace-nowrap flex items-center ${
                activeTab === "upcoming"
                  ? "border-b-2 border-orange-500 text-orange-500 font-medium"
                  : "text-gray-600 hover:text-gray-800"
              }`}
              onClick={() => setActiveTab("upcoming")}
            >
              <FaClock className="mr-2" /> Upcoming Bookings
            </button>
            <button
              className={`px-4 md:px-6 py-3 text-sm md:text-base whitespace-nowrap flex items-center ${
                activeTab === "past"
                  ? "border-b-2 border-orange-500 text-orange-500 font-medium"
                  : "text-gray-600 hover:text-gray-800"
              }`}
              onClick={() => setActiveTab("past")}
            >
              <FaHistory className="mr-2" /> Past Bookings
            </button>
          </div>

          {/* Filters - Responsive layout */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-6">
            <div className="flex items-center bg-white rounded-lg border border-gray-200 shadow-sm px-2 w-full sm:w-auto">
              <FaFilter className="text-gray-500 mr-2" />
              <select
                className="py-2 px-1 text-sm md:text-base bg-transparent focus:outline-none w-full"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All Services</option>
                <option value="puja">Puja Only</option>
                <option value="astrology">Astrology Only</option>
              </select>
            </div>
            <div className="flex items-center bg-white rounded-lg border border-gray-200 shadow-sm px-2 w-full sm:w-auto">
              <FaSort className="text-gray-500 mr-2" />
              <select
                className="py-2 px-1 text-sm md:text-base bg-transparent focus:outline-none w-full"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name">Service Name</option>
              </select>
            </div>
          </div>

          {/* Results Summary */}
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              {activeTab === "upcoming" ? "Showing " : "Displaying "}
              <span className="font-semibold">
                {sortedBookings(activeTab).length}
              </span>
              {activeTab === "upcoming" ? " upcoming" : " completed"}
              {filterType !== "all" ? ` ${filterType}` : ""} bookings
            </p>
          </div>

          {/* Bookings List */}
          <div className="space-y-4">
            {activeTab === "upcoming" ? (
              sortedBookings("upcoming").length > 0 ? (
                sortedBookings("upcoming").map((booking) => (
                  <BookingCard
                    key={booking.id}
                    booking={booking}
                    isUpcoming={true}
                  />
                ))
              ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow-md border border-gray-200">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-orange-100 rounded-full">
                      <FaBell className="text-orange-500 text-3xl" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    No Upcoming Bookings
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    You don't have any upcoming bookings. Book your next Puja or
                    Astrology session to get started!
                  </p>
                  <Link
                    href="/services"
                    className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition inline-flex items-center"
                  >
                    <FaShoppingCart className="mr-2" /> Book Now
                  </Link>
                </div>
              )
            ) : sortedBookings("past").length > 0 ? (
              sortedBookings("past").map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  isUpcoming={false}
                />
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-md border border-gray-200">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-gray-100 rounded-full">
                    <FaHistory className="text-gray-500 text-3xl" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">No Past Bookings</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  You don't have any past bookings yet. Book a service to get
                  started.
                </p>
                <Link
                  href="/services"
                  className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition inline-flex items-center"
                >
                  <FaShoppingCart className="mr-2" /> Book Now
                </Link>
              </div>
            )}
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default BookingPage;