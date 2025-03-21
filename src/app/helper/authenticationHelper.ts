import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  role?: string;
  userId?: number;
  name?: string;
}

interface AuthOptions {
  allowedRoles?: string[];
  redirectTo?: string;
}

const useAuthentication = ({
  allowedRoles = [],
  redirectTo = "/login",
}: AuthOptions) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      // If no token, redirect to login
      router.push("/login");
      return;
    }

    try {
      const decoded: DecodedToken = jwtDecode(token);

      // Check if the user's role is allowed
      if (
        allowedRoles.length > 0 &&
        !allowedRoles.includes(decoded.role || "")
      ) {
        router.push("/unauthorized");
        return;
      }
    } catch (error) {
      console.error("Failed to decode token:", error);
      router.push("/login");
    }
  }, [allowedRoles, redirectTo, router]);
};

export default useAuthentication;
