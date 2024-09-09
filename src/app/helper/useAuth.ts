import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (!token || !role) {
      router.push('/login');
    } else {
      setIsAuthenticated(true); // Set authenticated if token and role exist
    }
  }, [router]);

  return isAuthenticated; // Return the auth status
};

export default useAuth;