"use client";
import React, { useState, useEffect } from "react";
import Section from "../pujaservice/section";
import { FaEnvelope, FaPaperPlane } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import { verifyEmail } from "./action";
import { toast } from "react-toastify";

export default function VerifyEmail() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      handleVerifyEmail(token);
    }
  }, [token]);

  const handleVerifyEmail = async (token: string) => {
    try {
      const data = await verifyEmail(token);
      if (data.success) {
        setSuccess(data.message);
        toast.success(data.message);
      } else {
        setError(data.error);
        toast.error(data.error);
      }
    } catch (error: any) {
      setError(error.message);
      toast.error(error.message);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address");
      return;
    }
    // Simulating email verification process
    setSuccess("Verification email sent successfully!");
    setError("");
  };

  return (
    <>
      <Section
        bgImageUrl="image/term.jpeg"
        title="Forgot Password"
        description="Welcome to forget password page."
      />
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit">
          <FaPaperPlane /> Send Verification Email
        </button>
      </form>
      {success && (
        <div>
          <p>{success}</p>
          <a href="/login">Go to Login</a>
        </div>
      )}
      {error && <p>{error}</p>}
    </>
  );
}