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
import Layout from "../layout";
import { fetchProfile } from "./action";
import findUser from "@/app/helper/findUser";

interface PersonalInformation {
  firstname: string;
  lastname: string;
  dob: string;
  profile_pic: string | null;
}

interface User {
  id: number;
  email: string;
  username: string;
  contact: string;
  date_of_reg: string;
  account_status: string;
  personalInformation: PersonalInformation;
}

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("details");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Fetching userId
  const { userId } = findUser();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        if (!userId) {
          console.log("No userId found");
          return;
        }
        const profileData = await fetchProfile(userId);
        setUser(profileData);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, [userId]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Changes saved successfully!");
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Password changed successfully!");
  };

  const handlePreferencesChange = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Preferences updated successfully!");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/api/upload", true);

      xhr.upload.onprogress = (progressEvent) => {
        if (progressEvent.lengthComputable) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          setUser({
            ...user!,
            personalInformation: {
              ...user!.personalInformation,
              profile_pic: data.fileUrl,
            },
          });
          setIsModalOpen(false);
          setUploadProgress(0);
          alert("Image uploaded successfully!");
        } else {
          console.error("Upload failed");
          alert("Failed to upload image");
        }
      };

      xhr.onerror = () => {
        console.error("Error uploading file");
        alert("Failed to upload image");
      };

      xhr.send(formData);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload image");
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!user) {
    return <div className="text-center py-8">Failed to load profile</div>;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 p-4 relative">
              <div className="relative w-full h-64">
                <img
                  src={
                    user.personalInformation.profile_pic ||
                    "https://via.placeholder.com/200"
                  }
                  alt={`${user.personalInformation.firstname} ${user.personalInformation.lastname}`}
                  className="rounded-lg object-cover w-full h-full"
                />
              </div>
              <button
                className="absolute bottom-6 left-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 ease-in-out flex items-center"
                onClick={() => setIsModalOpen(true)}
              >
                <FaEdit className="mr-2" /> Edit Image
              </button>
            </div>
            <div className="md:w-2/3 p-4">
              <h2 className="text-3xl font-bold mb-2">
                {user.personalInformation.firstname}{" "}
                {user.personalInformation.lastname}
              </h2>
              <p className="text-xl text-gray-600 mb-4">@{user.username}</p>
              <div className="flex items-center mb-2">
                <FaEnvelope className="text-gray-500 mr-2" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center">
                <FaPhone className="text-gray-500 mr-2" />
                <span>{user.contact}</span>
              </div>
            </div>
          </div>

          {/* Modal for Image Upload */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg w-96">
                <h2 className="text-xl font-bold mb-4">
                  Upload Profile Picture
                </h2>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="mb-4"
                />
                {selectedFile && (
                  <div className="mb-4">
                    <p>Selected File: {selectedFile.name}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-500 h-2.5 rounded-full"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                    <p>{uploadProgress}%</p>
                  </div>
                )}
                <div className="flex justify-end">
                  <button
                    className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={handleUpload}
                  >
                    Upload
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Rest of the code remains unchanged */}
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
                  <h3 className="text-2xl font-semibold mb-4">Your Details</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-bold mb-2">
                        First Name
                      </label>
                      <p className="text-gray-600">
                        {user.personalInformation.firstname}
                      </p>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-bold mb-2">
                        Last Name
                      </label>
                      <p className="text-gray-600">
                        {user.personalInformation.lastname}
                      </p>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-bold mb-2">
                        Username
                      </label>
                      <p className="text-gray-600">@{user.username}</p>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-bold mb-2">
                        Date of Birth
                      </label>
                      <p className="text-gray-600">
                        {new Date(
                          user.personalInformation.dob
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-bold mb-2">
                        Registration Date
                      </label>
                      <p className="text-gray-600">
                        {new Date(user.date_of_reg).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-bold mb-2">
                        Account Status
                      </label>
                      <p className="text-gray-600">{user.account_status}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "edit" && (
                <form onSubmit={handleSave}>
                  <h3 className="text-2xl font-semibold mb-4">Edit Details</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-bold mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={user.personalInformation.firstname}
                        onChange={(e) =>
                          setUser({
                            ...user,
                            personalInformation: {
                              ...user.personalInformation,
                              firstname: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-bold mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={user.personalInformation.lastname}
                        onChange={(e) =>
                          setUser({
                            ...user,
                            personalInformation: {
                              ...user.personalInformation,
                              lastname: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-bold mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={user.email}
                        onChange={(e) =>
                          setUser({ ...user, email: e.target.value })
                        }
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-bold mb-2">
                        Contact
                      </label>
                      <input
                        type="tel"
                        value={user.contact}
                        onChange={(e) =>
                          setUser({ ...user, contact: e.target.value })
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
                      <label className="block text-gray-700 font-bold mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-bold mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-bold mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
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
                            className="form-checkbox h-5 w-5 text-blue-500"
                          />
                          <span className="ml-2 text-gray-700">
                            Receive email notifications
                          </span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-blue-500"
                          />
                          <span className="ml-2 text-gray-700">
                            Receive SMS notifications
                          </span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-bold mb-2">
                        Language
                      </label>
                      <select className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
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
    </Layout>
  );
};

export default ProfilePage;
