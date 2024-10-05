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
  FaBell,
  FaPlus,
} from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";

export default function UserHome() {
  const isAuthenticated = useAuth();
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Track loading state for role fetching

  // Fetch the role from localStorage on the client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRole = localStorage.getItem("role");
      setRole(storedRole);
      setLoading(false); // Finished loading role
    }
  }, []);

  // Handle redirection based on authentication and role
  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push("/login"); // Redirect to login if not authenticated
      } else if (role !== "USER") {
        router.push("/login"); // Redirect to unauthorized page if role is not USER
      }
    }
  }, [isAuthenticated, role, loading, router]);

  const [user, setUser] = useState({
    name: "Rahul Sharma",
    upcomingBookings: [
      {
        id: 1,
        date: "2023-06-15",
        pandit: "Pandit Ramesh",
        status: "Confirmed",
      },
      { id: 2, date: "2023-07-01", pandit: "Pandit Suresh", status: "Pending" },
    ],
    pastBookings: [
      {
        id: 3,
        date: "2023-05-20",
        pandit: "Pandit Mahesh",
        status: "Completed",
      },
      {
        id: 4,
        date: "2023-04-10",
        pandit: "Pandit Dinesh",
        status: "Completed",
      },
    ],
  });

  const [notifications, setNotifications] = useState([
    { id: 1, message: "Special offer: 20% off on Ganesh Puja bookings!" },
    {
      id: 2,
      message: "Upcoming event: Navratri celebrations starting next week",
    },
  ]);

  // Show loading state while determining role or authentication
  if (loading) {
    return <div>Loading...</div>; // Replace with a better loading indicator if needed
  }

  if (!isAuthenticated) {
    return null; // Avoid rendering any content if not authenticated
  }

  return (
    <div>
      <Layout>
        <div className="bg-gradient-to-br from-orange-100 to-yellow-100 min-h-screen p-4">
          <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
            <header className="bg-orange-500 text-white p-6">
              <h1 className="text-3xl font-bold">Namaste, {user.name}!</h1>
              <p className="text-lg">Welcome to your Puja Booking Dashboard</p>
            </header>

            <main className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <section className="md:col-span-2 space-y-6">
                <div className="bg-orange-100 rounded-lg p-4 shadow">
                  <h2 className="text-2xl font-semibold mb-4">
                    Upcoming Bookings
                  </h2>
                  {user.upcomingBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="bg-white rounded-lg p-4 mb-4 shadow-md flex justify-between items-center"
                    >
                      <div>
                        <p className="font-semibold">{booking.date}</p>
                        <p>{booking.pandit}</p>
                        <span
                          className={`px-2 py-1 rounded-full text-sm ${
                            booking.status === "Confirmed"
                              ? "bg-green-200 text-green-800"
                              : "bg-yellow-200 text-yellow-800"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>
                      <div className="space-x-2">
                        <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                          Reschedule
                        </button>
                        <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition">
                          Cancel
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-orange-100 rounded-lg p-4 shadow">
                  <h2 className="text-2xl font-semibold mb-4">Past Bookings</h2>
                  {user.pastBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="bg-white rounded-lg p-4 mb-4 shadow-md"
                    >
                      <p className="font-semibold">{booking.date}</p>
                      <p>{booking.pandit}</p>
                      <span className="px-2 py-1 rounded-full text-sm bg-gray-200 text-gray-800">
                        {booking.status}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              <aside className="space-y-6">
                <div className="bg-orange-100 rounded-lg p-4 shadow">
                  <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
                  <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition flex items-center justify-center space-x-2">
                    <FaPlus />
                    <span>Book New Puja</span>
                  </button>
                  <div className="mt-4 space-y-2">
                    <a
                      href="#"
                      className="block p-2 bg-white rounded-lg hover:bg-orange-50 transition items-center space-x-2"
                    >
                      <FaUser className="text-orange-500" />
                      <span>Manage Profile</span>
                    </a>
                    <a
                      href="#"
                      className="block p-2 bg-white rounded-lg hover:bg-orange-50 transition items-center space-x-2"
                    >
                      <FaHistory className="text-orange-500" />
                      <span>Transaction History</span>
                    </a>
                    <a
                      href="#"
                      className="block p-2 bg-white rounded-lg hover:bg-orange-50 transition items-center space-x-2"
                    >
                      <FaHeadset className="text-orange-500" />
                      <span>Customer Support</span>
                    </a>
                  </div>
                </div>

                <div className="bg-orange-100 rounded-lg p-4 shadow">
                  <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="bg-white rounded-lg p-3 mb-2 shadow-sm flex items-start space-x-2"
                    >
                      <IoMdNotificationsOutline className="text-orange-500 text-xl flex-shrink-0 mt-1" />
                      <p>{notification.message}</p>
                    </div>
                  ))}
                </div>
              </aside>
            </main>

            <footer className="bg-orange-200 p-4 text-center text-orange-800">
              <p>© 2023 Puja Booking Services. All rights reserved.</p>
            </footer>
          </div>
        </div>
      </Layout>
    </div>
  );
}
