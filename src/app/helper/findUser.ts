import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  role?: string;
  UserId?: number;
}

const findUser = () => {
  const [isRole, setIsRole] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        setIsRole(decoded.role || null); 
        setUserId(decoded.UserId || null); 
      } catch (error) {
        console.error('Failed to decode token:', error);
        setIsRole(null);
        setUserId(null);
      }
    } else {
      setIsRole(null);
      setUserId(null);
    }
  }, []);

  return { isRole, userId };
};

export default findUser;