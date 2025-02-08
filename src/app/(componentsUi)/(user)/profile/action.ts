import axios from "axios";

// fetch profile data by id api/user/id

export const fetchProfile = async (id: number) => {
  try {
    const response = await axios.get(`/api/user/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching profile data:", error);
    return null;
  }
};

// update profile data api/user/id

export const updateProfile = async (id: number, data: any) => {
  try {
    const response = await axios.put(`/api/user/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating profile data:", error);
    return null;
  }
};