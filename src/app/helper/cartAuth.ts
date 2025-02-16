import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const cartAuth = () => {
  const [isUser, setIsUser] = useState<boolean | null>(null); // Use null initially to indicate that the check is ongoing

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role: "USER" | "ADMIN" | null = localStorage.getItem("role") as
      | "USER"
      | "ADMIN"
      | null;

    if (role !== "USER" || !token) {
      setIsUser(false); // Set user status to false if not authenticated
      toast.error("Please login to add to cart");
    } else if (role === "USER" && token) {
      setIsUser(true); // Set user status to true if authenticated as a user
    } else if (role !== "USER" && role === "ADMIN" && token) {
      toast.error("Admin cannot add to cart");
      setIsUser(false); // Prevent admin from adding to cart
    } else {
      setIsUser(false); // Default case
    }
  }, []);

  return isUser; // Return the authentication status (null, true, or false)
};

export default cartAuth;
