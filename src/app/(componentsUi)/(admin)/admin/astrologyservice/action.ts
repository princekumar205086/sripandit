import axios from "axios";

interface AstrologyFormData {
    id: number;
    service_title: string;
    service_image: File | null;
    service_type: string;
    service_price: number | string;
    service_desc: string;
    timestamp: string;
}
interface AstrologyServiceDetails {
  id: number;
  service_title: string;
  service_image: File | null;
  service_type: string;
  service_price: number | string;
  service_desc: string;
  timestamp: string;
}
const handleAxiosError = (error: any) => {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      console.error("Resource not found");
      return null;
    } else {
      console.error("Axios operation error:", error);
      throw error;
    }
  };
export const addAstrologyService = async (formData: AstrologyFormData) => {
    try {
      const data = new FormData();
      data.append("service_title", formData.service_title); 
      data.append("service_desc", formData.service_desc);    
      data.append("service_type", formData.service_type);   
      data.append("service_price", String(formData.service_price)); 
      if (formData.service_image) {
        data.append("service_image", formData.service_image);
      }

      const response = await axios.post("/api/astrology", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Axios response:", response.data);
  
      return response.data;
    } catch (error) {
      console.error("Error adding astrology service:", error);
      throw error;
    }
  };

  const mapServiceData = (service: any) => ({
    id: service.id,
    service_title: service.service_title || "",
    service_image: service.service_image || "",
    service_desc: service.service_desc || "",
    service_price: service.service_price || 0,
    timestamp: service.timestamp || "",
  });

export const getAstrologyService = async () => {
    try {
      const response = await axios.get("/api/astrology");
      return response.data.map(mapServiceData);
    } catch (error: any) {
      return handleAxiosError(error) || [];
    }
  };

export const fetchAstrologyServiceDetails = async (
    id: number
  ): Promise<AstrologyServiceDetails | null> => {
    try {
      const response = await axios.get(`/api/astrology/${id}`);
      return response.data as AstrologyServiceDetails;
    } catch (error: any) {
      return handleAxiosError(error);
    }
  };