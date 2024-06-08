export interface User {
  id: number;
  username: string;
  email: string;
  contact: string;
  password: string;
  isVerified: boolean;
  isAdmin: boolean;
  forgotPasswordToken: string | null;
  forgotPasswordTokenExpiry: Date | null;
  verifyToken: string | null;
  verifyTokenExpiry: Date | null;
  date_of_creation: Date;
}