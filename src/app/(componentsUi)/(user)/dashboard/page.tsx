"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashBoard() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setToken(localStorage.getItem('token'));
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    router.push('/login'); // Redirect to login page
  };

  return (
    <>
      <h1>Your are logged in</h1>
      <h2>Your jwt token is: {token}</h2>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}