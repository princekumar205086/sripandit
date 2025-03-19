"use client";
import React, { useState } from "react";
import {
  FaEye,
  FaEyeSlash,
  FaLock,
  FaShieldAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { IoArrowBack, IoInformationCircleOutline } from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";
import Layout from "../layout";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Password strength indicators
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Update password strength when new password changes
  React.useEffect(() => {
    if (!newPassword) {
      setPasswordStrength(0);
      return;
    }

    let strength = 0;

    // Length check
    if (newPassword.length >= 8) strength += 1;

    // Contains number
    if (/\d/.test(newPassword)) strength += 1;

    // Contains lowercase
    if (/[a-z]/.test(newPassword)) strength += 1;

    // Contains uppercase
    if (/[A-Z]/.test(newPassword)) strength += 1;

    // Contains special char
    if (/[^A-Za-z0-9]/.test(newPassword)) strength += 1;

    setPasswordStrength(strength);
  }, [newPassword]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters long.");
      return;
    }

    if (passwordStrength < 3) {
      setError("Please choose a stronger password.");
      return;
    }

    // Simulating password change with loading state
    setLoading(true);

    try {
      // Simulated API call
      await new Promise((resolve) => setTimeout(resolve, 1200));

      setSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordStrength(0);
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrengthLabel = () => {
    if (!newPassword) return "";
    if (passwordStrength <= 1) return "Weak";
    if (passwordStrength <= 3) return "Moderate";
    return "Strong";
  };

  const getPasswordStrengthColor = () => {
    if (!newPassword) return "bg-gray-200";
    if (passwordStrength <= 1) return "bg-red-500";
    if (passwordStrength <= 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 px-4 py-8 md:py-12">
        <div className="max-w-md mx-auto">
          {/* Header with back navigation */}
          <div className="flex items-center mb-6">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="mr-3 p-2 rounded-full bg-white shadow-sm hover:bg-gray-50 transition-colors"
              aria-label="Go back"
            >
              <IoArrowBack className="text-orange-600" />
            </button>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Change Password
            </h1>
          </div>

          {/* Main content card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {success ? (
              <div className="p-6 md:p-8 text-center">
                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <FaCheckCircle className="text-green-600 text-3xl" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                  Password Changed!
                </h2>
                <p className="text-gray-600 mb-6">
                  Your password has been updated successfully. You can now use
                  your new password to log in.
                </p>
                <button
                  type="button"
                  onClick={() => window.history.back()}
                  className="bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                >
                  Back to Account
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
                <div>
                  <label
                    htmlFor="currentPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Current Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="text-gray-400" />
                    </div>
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      id="currentPassword"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900"
                      required
                      aria-label="Current Password"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      aria-label={
                        showCurrentPassword
                          ? "Hide current password"
                          : "Show current password"
                      }
                      disabled={loading}
                    >
                      {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <RiLockPasswordLine className="text-gray-400" />
                    </div>
                    <input
                      type={showNewPassword ? "text" : "password"}
                      id="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900"
                      required
                      aria-label="New Password"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      aria-label={
                        showNewPassword
                          ? "Hide new password"
                          : "Show new password"
                      }
                      disabled={loading}
                    >
                      {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>

                  {/* Password strength indicator */}
                  {newPassword && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-gray-500">
                          Password Strength
                        </span>
                        <span
                          className={`text-xs font-medium ${
                            passwordStrength <= 1
                              ? "text-red-500"
                              : passwordStrength <= 3
                              ? "text-yellow-500"
                              : "text-green-500"
                          }`}
                        >
                          {getPasswordStrengthLabel()}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${getPasswordStrengthColor()}`}
                          style={{ width: `${(passwordStrength / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaShieldAlt className="text-gray-400" />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`w-full pl-10 pr-10 py-2.5 border ${
                        confirmPassword && newPassword !== confirmPassword
                          ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                      } rounded-md focus:outline-none focus:ring-2 text-gray-900`}
                      required
                      aria-label="Confirm New Password"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      aria-label={
                        showConfirmPassword
                          ? "Hide confirm password"
                          : "Show confirm password"
                      }
                      disabled={loading}
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {confirmPassword && newPassword !== confirmPassword && (
                    <p className="mt-1 text-xs text-red-500">
                      Passwords don't match
                    </p>
                  )}
                </div>

                {/* Error message */}
                {error && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-orange-600 text-white px-4 py-3 rounded-md hover:bg-orange-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:bg-orange-300 disabled:cursor-not-allowed flex items-center justify-center"
                    disabled={
                      loading ||
                      (!!confirmPassword && newPassword !== confirmPassword)
                    }
                  >
                    {loading ? (
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
                        Processing...
                      </>
                    ) : (
                      "Change Password"
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* Password guidelines */}
            {!success && (
              <div className="bg-gray-50 p-6 border-t border-gray-100">
                <div className="flex items-start mb-3">
                  <IoInformationCircleOutline className="text-orange-600 text-lg flex-shrink-0 mt-0.5 mr-2" />
                  <h2 className="text-sm font-semibold text-gray-800">
                    Password Guidelines
                  </h2>
                </div>
                <ul className="text-xs text-gray-600 space-y-1.5 pl-4">
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-1.5">•</span>
                    <span>At least 8 characters long</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-1.5">•</span>
                    <span>Include at least one uppercase letter (A-Z)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-1.5">•</span>
                    <span>Include at least one number (0-9)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-1.5">•</span>
                    <span>
                      Include at least one special character (!@#$%^&*)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-1.5">•</span>
                    <span>Avoid using easily guessable information</span>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Security note card */}
          <div className="mt-6 bg-white rounded-xl shadow-sm p-4 border border-orange-100">
            <div className="flex items-center text-orange-600 mb-2">
              <FaShieldAlt className="mr-2" />
              <h3 className="font-medium">Security Note</h3>
            </div>
            <p className="text-sm text-gray-600">
              For your security, after changing your password, you'll be
              required to log in again on all your devices.
            </p>
          </div>

          {/* Support link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Having trouble?{" "}
              <a
                href="/contact"
                className="text-orange-600 hover:text-orange-700 hover:underline"
              >
                Contact Support
              </a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
