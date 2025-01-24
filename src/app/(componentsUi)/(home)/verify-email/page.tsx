"use client"
import React, { useState, useEffect } from "react";
import { FiHelpCircle } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { BiTimeFive } from "react-icons/bi";
import axios from "axios";
import Link from "next/link";

const EmailVerification = () => {
  const [verificationStatus, setVerificationStatus] = useState<"verified" | "expired" | "loading">("loading");
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  // Fetch token from the URL on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('token');
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      setVerificationStatus("expired");
    }
  }, []);

  useEffect(() => {
    if (token) {
      verifyEmail(token);
    }
  }, [token]);

  // Handle email verification logic
  const verifyEmail = async (token: string) => {
    try {
      const data = JSON.stringify({ token });

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:3000/api/verify-email',
        headers: { 'Content-Type': 'application/json' },
        data,
      };

      setVerificationStatus("loading");

      const response = await axios(config);
      if (response.data.success) {
        setVerificationStatus("verified");
      } else {
        setVerificationStatus("expired");
      }
    } catch (error) {
      console.error("Error verifying email:", error);
      setVerificationStatus("expired");
    }
  };

  // Handle resending the verification email
  const handleResendEmail = async () => {
    setIsResending(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate an API call
      setShowToast(true);
    } catch (error) {
      console.error("Error resending email:", error);
    } finally {
      setIsResending(false);
    }
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  // Modal to provide help information
  const HelpModal = () => (
    <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center ${showModal ? "" : "hidden"}`}>
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-xl font-bold mb-4">Need Help?</h3>
        <p className="text-gray-600 mb-4">
          If you're experiencing issues with email verification, please contact our support team:
        </p>
        <ul className="list-disc list-inside mb-4 text-gray-600">
          <li>Email: support@example.com</li>
          <li>Phone: 1-800-123-4567</li>
          <li>Hours: 24/7</li>
        </ul>
        <button
          onClick={() => setShowModal(false)}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );

  // Toast message to show when email is successfully resent
  const Toast = () => (
    <div className={`fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transition-opacity duration-300 ${showToast ? "opacity-100" : "opacity-0"}`}>
      Verification email sent successfully!
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="w-full h-20 bg-transparent">   
      </header>
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {verificationStatus === "loading" ? (
          <div className="text-center">Loading...</div>
        ) : verificationStatus === "verified" ? (
          <div className="text-center">
            <div className="mb-8">
              <FaCheckCircle className="w-20 h-20 mx-auto text-green-500 mb-4" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Email Verified Successfully!
            </h1>
            <p className="text-gray-600 mb-8">
              Your email has been verified and your account is now active. You can proceed to login.
            </p>
            <Link href="/login" className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors w-full sm:w-auto">
              Go to Login
            </Link>
          </div>
        ) : (
          <div className="text-center">
            <div className="mb-8">
              <BiTimeFive className="w-20 h-20 mx-auto text-red-500 mb-4" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Oops! Your Verification Link Has Expired
            </h1>
            <p className="text-gray-600 mb-8">
              Don't worry! Click below to receive a new verification email.
            </p>
            <button
              onClick={handleResendEmail}
              disabled={isResending}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isResending ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                "Resend Verification Email"
              )}
            </button>
          </div>
        )}
      </main>

      <HelpModal />
      <Toast />
    </div>
  );
};

export default EmailVerification;
