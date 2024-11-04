import axios from 'axios';

export const verifyEmail = async (token: string) => {
  try {
    const response = await axios.post('/api/verify-email', { token });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "An error occurred while verifying your email.");
  }
};