import React, { useState } from "react";
import {
  FaShoppingCart,
  FaBell,
  FaHome,
  FaUser,
  FaQuestionCircle,
  FaFilter,
  FaSort,
  FaStar,
} from "react-icons/fa";
import { GiIndianPalace } from "react-icons/gi";

const BookingPage = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [filterType, setFilterType] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

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
    },
  ];

  const BookingCard = ({ booking, isUpcoming }: any) => {
    const handleContactProvider = () => {
      alert("Opening chat with provider...");
    };

    const handleModifyBooking = () => {
      alert("Modify booking...");
    };

    const handleCancelBooking = () => {
      if (window.confirm("Are you sure you want to cancel this booking?")) {
        alert("Booking cancelled");
      }
    };

    const handleAddReview = () => {
      alert("Add review...");
    };

    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-4 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            {booking.type === "puja" ? (
              <GiIndianPalace className="text-orange-500 text-2xl mr-2" />
            ) : (
              <FaStar className="text-purple-500 text-2xl mr-2" />
            )}
            <div>
              <h3 className="text-lg font-semibold">{booking.name}</h3>
              <p className="text-gray-600">
                {booking.type.charAt(0).toUpperCase() + booking.type.slice(1)}
              </p>
            </div>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              booking.status === "upcoming"
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-gray-600">Date & Time:</p>
            <p className="font-medium">
              {booking.date} at {booking.time}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Location:</p>
            <p className="font-medium">{booking.location}</p>
          </div>
          <div>
            <p className="text-gray-600">Language:</p>
            <p className="font-medium">{booking.language}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {isUpcoming ? (
            <>
              <button
                onClick={handleModifyBooking}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Modify Booking
              </button>
              <button
                onClick={handleCancelBooking}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Cancel Booking
              </button>
              <button
                onClick={handleContactProvider}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Contact Provider
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleAddReview}
                className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
              >
                Add Review
              </button>
              <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                View Details
              </button>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <img
                src="https://images.unsplash.com/photo-1609102026453-383736e4e131"
                alt="Logo"
                className="h-10 w-10 rounded"
              />
              <nav className="hidden md:flex space-x-6">
                <a
                  href="#"
                  className="flex items-center text-gray-700 hover:text-orange-500"
                >
                  <FaHome className="mr-2" /> Home
                </a>
                <a
                  href="#"
                  className="flex items-center text-gray-700 hover:text-orange-500"
                >
                  <FaUser className="mr-2" /> My Account
                </a>
                <a
                  href="#"
                  className="flex items-center text-gray-700 hover:text-orange-500"
                >
                  <FaQuestionCircle className="mr-2" /> Help
                </a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-700 hover:text-orange-500">
                <FaShoppingCart className="text-xl" />
              </button>
              <button className="text-gray-700 hover:text-orange-500">
                <FaBell className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex mb-6 border-b">
          <button
            className={`px-6 py-3 ${
              activeTab === "upcoming"
                ? "border-b-2 border-orange-500 text-orange-500"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("upcoming")}
          >
            Upcoming Bookings
          </button>
          <button
            className={`px-6 py-3 ${
              activeTab === "past"
                ? "border-b-2 border-orange-500 text-orange-500"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("past")}
          >
            Past Bookings
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center">
            <FaFilter className="mr-2 text-gray-600" />
            <select
              className="border rounded-md px-3 py-2"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Services</option>
              <option value="puja">Puja Only</option>
              <option value="astrology">Astrology Only</option>
            </select>
          </div>
          <div className="flex items-center">
            <FaSort className="mr-2 text-gray-600" />
            <select
              className="border rounded-md px-3 py-2"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name">Service Name</option>
            </select>
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {activeTab === "upcoming" ? (
            dummyUpcomingBookings.length > 0 ? (
              dummyUpcomingBookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  isUpcoming={true}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">
                  No upcoming bookings found. Book your next Puja or Astrology
                  session now!
                </p>
                <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600">
                  Book Now
                </button>
              </div>
            )
          ) : (
            dummyPastBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                isUpcoming={false}
              />
            ))
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-orange-400">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400">
                    Help
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Customer Support</h4>
              <p className="mb-2">Need assistance with your booking?</p>
              <p className="text-orange-400">1-800-SPIRITUAL</p>
              <p className="text-orange-400">support@spiritual.com</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Business Hours</h4>
              <p>Monday - Sunday</p>
              <p>9:00 AM - 9:00 PM</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BookingPage;
