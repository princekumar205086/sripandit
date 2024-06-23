import axios from "axios";

// Create a puja booking service

export const bookPujaService = async (data: any) => {
  try {
    const response = await axios.post("/api/bookpujaservice", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
    }
    catch (error: any) {
        console.error('Error', error.message);
        throw error;
    }
}

// Fetch all puja services
export const fetchServices = async () => {
  try {
    const response = await axios.get("/api/bookpujaservice");
    return response.data;
  } catch (error: any) {
    console.error('Error', error.message);
    throw error;
  }
};