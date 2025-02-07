import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/ReactToastify.min.css';
import { useRouter } from "next/navigation";

export interface FormState {
  email: string;
  password: string;
  staySignedIn: boolean;
}

export interface Errors {
  email?: string;
  password?: string;
}

export function useLogin() {
  const router = useRouter();

  const handleSubmit = async (
    formState: FormState,
    setErrors: (errors: Errors) => void
  ) => {
    try {
      const response = await axios.post("/api/login", {
        email: formState.email,
        password: formState.password,
      });

      const { token, role, account_status, message, username } = response.data;

    if (account_status === "ACTIVE") {
        // Set token and role in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);

        // Redirect based on the user's role
        toast.success(message || "Logged in successfully!");
        router.push(role === "ADMIN" ? "/admin/dashboard" : "/dashboard");
      } else if (account_status === "PENDING") {
        toast.error("Verify your email first.");
      } else if (account_status === "DEACTIVATED") {
        toast.error("You can't log in, your account is blocked.");
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || "An error occurred. Please try again.";
      setErrors({
        email: "",
        password: errorMessage,
      });
      toast.error(errorMessage);
    }
  };

  const validateForm = (formState: FormState): boolean => {
    if (!formState.email || !formState.password) {
      toast.error("Please fill in all fields");
      return false;
    }
    return true;
  };

  return { handleSubmit, validateForm };
}