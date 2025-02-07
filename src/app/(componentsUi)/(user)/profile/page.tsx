"use client";
import React, { useEffect, useState } from "react";
import {
  FaEdit,
  FaEnvelope,
  FaPhone,
  FaUser,
  FaLock,
  FaBell,
  FaGlobe,
} from "react-icons/fa";
import Image from 'next/image'
import Layout from "../layout";

interface User {
  name: string;
  title: string;
  email: string;
  phone: string;
  address: string;
  image: string;
}

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("details");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser({
      name: "John Doe",
      title: "Software Developer",
      email: "johndoe@example.com",
      phone: "+1 (123) 456-7890",
      address: "123 Main St, Anytown, USA",
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80",
    });
  }, []);

  if (!user) {
    return null; // Or a loader component
  }

  const handleTabChange = (tab: any) => {
    setActiveTab(tab);
  };

  const handleSave = (e: any) => {
    e.preventDefault();
    // Handle save logic here
    alert("Changes saved successfully!");
  };

  const handlePasswordChange = (e: any) => {
    e.preventDefault();
    // Handle password change logic here
    alert("Password changed successfully!");
  };

  const handlePreferencesChange = (e: any) => {
    e.preventDefault();
    // Handle preferences change logic here
    alert("Preferences updated successfully!");
  };

  return (
    <Layout>
      <div className="">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3 p-4 relative">
                <Image
                  src={user.image || "https://via.placeholder.com/200"}
                  alt={user.name}
                  className="w-full h-auto rounded-lg"
                  layout="fill"
                />
                <button className="absolute bottom-6 left-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 ease-in-out flex items-center">
                  <FaEdit className="mr-2" /> Edit Image
                </button>
              </div>
              <div className="md:w-2/3 p-4">
                <h2 className="text-3xl font-bold mb-2">{user.name}</h2>
                <p className="text-xl text-gray-600 mb-4">{user.title}</p>
                <div className="flex items-center mb-2">
                  <FaEnvelope className="text-gray-500 mr-2" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center">
                  <FaPhone className="text-gray-500 mr-2" />
                  <span>{user.phone}</span>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200">
              <nav className="flex">
                <button
                  className={`flex-1 py-4 px-6 text-center ${
                    activeTab === "details"
                      ? "bg-blue-500 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => handleTabChange("details")}
                >
                  Your Details
                </button>
                <button
                  className={`flex-1 py-4 px-6 text-center ${
                    activeTab === "edit"
                      ? "bg-blue-500 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => handleTabChange("edit")}
                >
                  Edit Details
                </button>
                <button
                  className={`flex-1 py-4 px-6 text-center ${
                    activeTab === "password"
                      ? "bg-blue-500 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => handleTabChange("password")}
                >
                  Change Password
                </button>
                <button
                  className={`flex-1 py-4 px-6 text-center ${
                    activeTab === "preferences"
                      ? "bg-blue-500 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => handleTabChange("preferences")}
                >
                  Preferences
                </button>
              </nav>

              <div className="p-6">
                {activeTab === "details" && (
                  <div>
                    <h3 className="text-2xl font-semibold mb-4">
                      Your Details
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 font-bold mb-2">
                          Name
                        </label>
                        <p className="text-gray-600">{user.name}</p>
                      </div>
                      <div>
                        <label className="block text-gray-700 font-bold mb-2">
                          Email
                        </label>
                        <p className="text-gray-600">{user.email}</p>
                      </div>
                      <div>
                        <label className="block text-gray-700 font-bold mb-2">
                          Phone
                        </label>
                        <p className="text-gray-600">{user.phone}</p>
                      </div>
                      <div>
                        <label className="block text-gray-700 font-bold mb-2">
                          Address
                        </label>
                        <p className="text-gray-600">{user.address}</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "edit" && (
                  <form onSubmit={handleSave}>
                    <h3 className="text-2xl font-semibold mb-4">
                      Edit Details
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-gray-700 font-bold mb-2"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={user.name}
                          onChange={(e) =>
                            setUser({ ...user, name: e.target.value })
                          }
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-gray-700 font-bold mb-2"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={user.email}
                          onChange={(e) =>
                            setUser({ ...user, email: e.target.value })
                          }
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-gray-700 font-bold mb-2"
                        >
                          Phone
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={user.phone}
                          onChange={(e) =>
                            setUser({ ...user, phone: e.target.value })
                          }
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="address"
                          className="block text-gray-700 font-bold mb-2"
                        >
                          Address
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={user.address}
                          onChange={(e) =>
                            setUser({ ...user, address: e.target.value })
                          }
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out flex items-center justify-center w-full md:w-auto"
                    >
                      <FaUser className="mr-2" /> Save Changes
                    </button>
                  </form>
                )}

                {activeTab === "password" && (
                  <form onSubmit={handlePasswordChange}>
                    <h3 className="text-2xl font-semibold mb-4">
                      Change Password
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="currentPassword"
                          className="block text-gray-700 font-bold mb-2"
                        >
                          Current Password
                        </label>
                        <input
                          type="password"
                          id="currentPassword"
                          name="currentPassword"
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="newPassword"
                          className="block text-gray-700 font-bold mb-2"
                        >
                          New Password
                        </label>
                        <input
                          type="password"
                          id="newPassword"
                          name="newPassword"
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="confirmPassword"
                          className="block text-gray-700 font-bold mb-2"
                        >
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out flex items-center justify-center w-full md:w-auto"
                    >
                      <FaLock className="mr-2" /> Change Password
                    </button>
                  </form>
                )}

                {activeTab === "preferences" && (
                  <form onSubmit={handlePreferencesChange}>
                    <h3 className="text-2xl font-semibold mb-4">Preferences</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-700 font-bold mb-2">
                          Notification Preferences
                        </label>
                        <div className="space-y-2">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              name="emailNotifications"
                              className="form-checkbox h-5 w-5 text-blue-500"
                            />
                            <span className="ml-2 text-gray-700">
                              Receive email notifications
                            </span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              name="smsNotifications"
                              className="form-checkbox h-5 w-5 text-blue-500"
                            />
                            <span className="ml-2 text-gray-700">
                              Receive SMS notifications
                            </span>
                          </label>
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="language"
                          className="block text-gray-700 font-bold mb-2"
                        >
                          Language
                        </label>
                        <select
                          id="language"
                          name="language"
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="en">English</option>
                          <option value="es">Español</option>
                          <option value="fr">Français</option>
                          <option value="de">Deutsch</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-700 font-bold mb-2">
                          Theme
                        </label>
                        <div className="space-x-4">
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name="theme"
                              value="light"
                              className="form-radio h-5 w-5 text-blue-500"
                            />
                            <span className="ml-2 text-gray-700">Light</span>
                          </label>
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name="theme"
                              value="dark"
                              className="form-radio h-5 w-5 text-blue-500"
                            />
                            <span className="ml-2 text-gray-700">Dark</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out flex items-center justify-center w-full md:w-auto"
                    >
                      <FaGlobe className="mr-2" /> Save Preferences
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
