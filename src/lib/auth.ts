import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  role?: string;
  userId?: number;
}

export const checkUser = (token: string) => {
  try {
    const decoded: DecodedToken = jwtDecode(token);
    return { role: decoded.role || null, userId: decoded.userId || null };
  } catch (error) {
    console.error("Failed to decode token:", error);
    return { role: null, userId: null };
  }
};
