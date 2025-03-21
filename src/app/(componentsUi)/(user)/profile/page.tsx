"use client";
import React, { useEffect, useState } from "react";
import {
  FaEdit,
  FaEnvelope,
  FaPhone,
  FaUser,
  FaLock,
  FaSave,
  FaUserCircle,
  FaTimes,
  FaCamera,
} from "react-icons/fa";
import Layout from "../layout";
import { fetchProfile } from "./action";
import findUser from "@/app/helper/findUser";
import useAuthentication from "@/app/helper/authenticationHelper";

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
  // check if user is authenticated or not
  useAuthentication({ allowedRoles: ["USER"], redirectTo: "/login" });
  const [activeTab, setActiveTab] = useState("details");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Fetching userId
  const { userId } = findUser();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        if (!userId) {
          console.log("Waiting for userId to be available");
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

    if (userId) {
      loadProfile();
    }
  }, [userId]);

  // Create preview when file is selected
  useEffect(() => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreviewUrl(null);
    }
  }, [selectedFile]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementation would involve actual API call
    const saveButton = e.currentTarget as HTMLButtonElement;
    const originalText = saveButton.innerHTML;

    saveButton.disabled = true;
    saveButton.innerHTML =
      '<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Saving...';

    setTimeout(() => {
      saveButton.disabled = false;
      saveButton.innerHTML = originalText;
      alert("Changes saved successfully!");
    }, 1000);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementation would involve actual API call
    const saveButton = e.currentTarget.querySelector(
      "button"
    ) as HTMLButtonElement;
    const originalText = saveButton.innerHTML;

    saveButton.disabled = true;
    saveButton.innerHTML =
      '<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Updating...';

    setTimeout(() => {
      saveButton.disabled = false;
      saveButton.innerHTML = originalText;
      alert("Password changed successfully!");
    }, 1000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setUploadError(null);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedFile(null);
    setPreviewUrl(null);
    setUploadProgress(0);
    setUploadError(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploadingImage(true);
    setUploadError(null);
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("userId", userId?.toString() || "");

    try {
      // Simulate upload with progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);

        if (progress >= 100) {
          clearInterval(interval);

          // Simulate successful upload after reaching 100%
          setTimeout(() => {
            setUser((prev) => {
              if (!prev) return prev;
              return {
                ...prev,
                personalInformation: {
                  ...prev.personalInformation,
                  profile_pic: URL.createObjectURL(selectedFile),
                },
              };
            });
            handleModalClose();
            setUploadingImage(false);
            alert("Image uploaded successfully!");
          }, 500);
        }
      }, 200);

      // In a real implementation, you would use fetch or axios:
      /*
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData
      });
      
      if (!response.ok) {
        throw new Error("Upload failed");
      }
      
      const data = await response.json();
      setUser({
        ...user!,
        personalInformation: {
          ...user!.personalInformation,
          profile_pic: data.fileUrl,
        },
      });
      handleModalClose();
      */
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadError("Failed to upload image. Please try again.");
      setUploadingImage(false);
    }
  };

  if (loading || !userId) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-600">Loading profile information...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div className="text-center py-8 min-h-[60vh] flex flex-col justify-center items-center">
          <div className="text-red-500 text-5xl mb-4">
            <FaTimes />
          </div>
          <h2 className="text-2xl font-bold mb-2">Failed to load profile</h2>
          <p className="text-gray-600 mb-4">Please try refreshing the page</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-4 md:py-8 max-w-5xl">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 p-4 relative bg-gray-50">
              <div className="relative w-48 h-48 mx-auto md:w-full md:h-64 mb-4">
                <img
                  src={
                    user.personalInformation.profile_pic ||
                    "https://via.placeholder.com/200?text=Profile"
                  }
                  alt={`${user.personalInformation.firstname} ${user.personalInformation.lastname}'s profile`}
                  className="rounded-lg object-cover w-full h-full shadow-md"
                />
                <button
                  className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out md:hidden shadow-lg"
                  onClick={() => setIsModalOpen(true)}
                  aria-label="Edit profile image"
                >
                  <FaCamera />
                </button>
              </div>
              <button
                className="hidden md:flex mx-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300 ease-in-out items-center justify-center w-full shadow-sm"
                onClick={() => setIsModalOpen(true)}
              >
                <FaEdit className="mr-2" /> Change Photo
              </button>
            </div>
            <div className="md:w-2/3 p-4">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                {user.personalInformation.firstname}{" "}
                {user.personalInformation.lastname}
              </h2>
              <p className="text-lg md:text-xl text-gray-600 mb-4 flex items-center">
                <FaUserCircle className="mr-2 text-blue-500" /> @{user.username}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center mb-2 bg-gray-50 p-3 rounded-lg shadow-sm">
                  <FaEnvelope className="text-blue-500 mr-3 text-lg" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <span className="font-medium">{user.email}</span>
                  </div>
                </div>
                <div className="flex items-center mb-2 bg-gray-50 p-3 rounded-lg shadow-sm">
                  <FaPhone className="text-blue-500 mr-3 text-lg" />
                  <div>
                    <p className="text-sm text-gray-500">Contact</p>
                    <span className="font-medium">{user.contact}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modal for Image Upload */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Update Profile Picture</h2>
                  <button
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    onClick={handleModalClose}
                    aria-label="Close modal"
                  >
                    <FaTimes />
                  </button>
                </div>

                {previewUrl ? (
                  <div className="relative w-40 h-40 mx-auto mb-4">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="rounded-lg object-cover w-full h-full shadow-md"
                    />
                  </div>
                ) : (
                  <div className="h-40 w-40 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center shadow-inner">
                    <FaCamera className="text-gray-400 text-4xl" />
                  </div>
                )}

                <label className="block w-full mb-4">
                  <span className="sr-only">Choose profile photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100
                      cursor-pointer"
                  />
                </label>

                {uploadError && (
                  <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                    {uploadError}
                  </div>
                )}

                {uploadProgress > 0 && (
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 text-right">
                      {uploadProgress}%
                    </p>
                  </div>
                )}

                <div className="flex justify-end gap-3">
                  <button
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
                    onClick={handleModalClose}
                    disabled={uploadingImage}
                  >
                    Cancel
                  </button>
                  <button
                    className={`bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center min-w-[90px] ${
                      !selectedFile || uploadingImage
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    onClick={handleUpload}
                    disabled={!selectedFile || uploadingImage}
                  >
                    {uploadingImage ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Uploading...
                      </>
                    ) : (
                      <>
                        <FaCamera className="mr-2" /> Upload
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tabs Navigation */}
          <div className="border-t border-gray-200 mt-4">
            <nav className="flex overflow-x-auto scrollbar-hide">
              <button
                className={`py-3 px-4 text-center flex-shrink-0 border-b-2 text-sm md:text-base md:px-6 flex items-center ${
                  activeTab === "details"
                    ? "border-blue-500 text-blue-600 font-medium"
                    : "text-gray-700 border-transparent hover:text-blue-600 hover:border-blue-200"
                }`}
                onClick={() => handleTabChange("details")}
              >
                <FaUser className="mr-2" /> Your Details
              </button>
              <button
                className={`py-3 px-4 text-center flex-shrink-0 border-b-2 text-sm md:text-base md:px-6 flex items-center ${
                  activeTab === "edit"
                    ? "border-blue-500 text-blue-600 font-medium"
                    : "text-gray-700 border-transparent hover:text-blue-600 hover:border-blue-200"
                }`}
                onClick={() => handleTabChange("edit")}
              >
                <FaEdit className="mr-2" /> Edit Details
              </button>
              <button
                className={`py-3 px-4 text-center flex-shrink-0 border-b-2 text-sm md:text-base md:px-6 flex items-center ${
                  activeTab === "password"
                    ? "border-blue-500 text-blue-600 font-medium"
                    : "text-gray-700 border-transparent hover:text-blue-600 hover:border-blue-200"
                }`}
                onClick={() => handleTabChange("password")}
              >
                <FaLock className="mr-2" /> Password
              </button>
            </nav>

            <div className="p-4 md:p-6">
              {activeTab === "details" && (
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-4">
                    Your Details
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                      <label className="block text-gray-500 text-sm mb-1">
                        First Name
                      </label>
                      <p className="text-gray-800 font-medium">
                        {user.personalInformation.firstname}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                      <label className="block text-gray-500 text-sm mb-1">
                        Last Name
                      </label>
                      <p className="text-gray-800 font-medium">
                        {user.personalInformation.lastname}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                      <label className="block text-gray-500 text-sm mb-1">
                        Username
                      </label>
                      <p className="text-gray-800 font-medium">
                        @{user.username}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                      <label className="block text-gray-500 text-sm mb-1">
                        Date of Birth
                      </label>
                      <p className="text-gray-800 font-medium">
                        {new Date(
                          user.personalInformation.dob
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                      <label className="block text-gray-500 text-sm mb-1">
                        Registration Date
                      </label>
                      <p className="text-gray-800 font-medium">
                        {new Date(user.date_of_reg).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                      <label className="block text-gray-500 text-sm mb-1">
                        Account Status
                      </label>
                      <p
                        className={`font-medium inline-flex items-center ${
                          user.account_status === "active"
                            ? "text-green-600"
                            : "text-gray-800"
                        }`}
                      >
                        <span
                          className={`inline-block w-2 h-2 rounded-full mr-2 ${
                            user.account_status === "active"
                              ? "bg-green-600"
                              : "bg-gray-500"
                          }`}
                        ></span>
                        {user.account_status.charAt(0).toUpperCase() +
                          user.account_status.slice(1)}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "edit" && (
                <form onSubmit={handleSave} className="max-w-3xl mx-auto">
                  <h3 className="text-xl md:text-2xl font-semibold mb-4">
                    Edit Details
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
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
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                        placeholder="First name"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
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
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                        placeholder="Last name"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={user.email}
                        onChange={(e) =>
                          setUser({ ...user, email: e.target.value })
                        }
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                        placeholder="Email address"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Contact
                      </label>
                      <input
                        type="tel"
                        value={user.contact}
                        onChange={(e) =>
                          setUser({ ...user, contact: e.target.value })
                        }
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                        placeholder="Phone number"
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out flex items-center justify-center w-full md:w-auto shadow-sm"
                    >
                      <FaSave className="mr-2" /> Save Changes
                    </button>
                  </div>
                </form>
              )}

              {activeTab === "password" && (
                <form
                  onSubmit={handlePasswordChange}
                  className="max-w-md mx-auto"
                >
                  <h3 className="text-xl md:text-2xl font-semibold mb-4">
                    Change Password
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                        placeholder="Enter current password"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                        placeholder="Enter new password"
                        required
                        minLength={8}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Password must be at least 8 characters with a
                        combination of letters, numbers, and symbols
                      </p>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                        placeholder="Confirm new password"
                        required
                        minLength={8}
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out flex items-center justify-center w-full shadow-sm"
                  >
                    <FaLock className="mr-2" /> Update Password
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
