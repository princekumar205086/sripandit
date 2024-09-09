import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const useRedirectIfAuthenticated = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role'); // Retrieve the user's role

    if (token && role) {
      setIsAuthenticated(true);
      
      // Redirect based on role
      if (role === 'ADMIN') {
        router.push('/admin/dashboard');
      } else {
        router.push('/dashboard');
      }
    } else {
      setIsAuthenticated(false);
    }
  }, [router]);

  return isAuthenticated;
};

export default useRedirectIfAuthenticated;