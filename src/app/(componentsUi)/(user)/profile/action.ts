import axios from "axios";

export const fetchProfile = async () => {
  try {
    const response = await axios.get("/api/user");
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};
