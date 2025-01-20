import axios from "axios";

interface UserFormData {
  id:                 number;
  username:           string;
  email:              string;  
  contact:            string;
  password:           string;
  date_of_reg:        string;
  account_status:     string;
}
interface UserServiceDetails {
  id:                 number;
  username:           string;
  email:              string;  
  contact:            string;
  password:           string;
  date_of_reg:        string;
  account_status:     string;
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
export const addUserService = async (formData: UserFormData) => {
    try {
      const data = new FormData();
      data.append("username", formData.username); 
      data.append("email", formData.email);    
      data.append("contact", formData.contact);   
      data.append("date_of_reg", String(formData.date_of_reg)); 
      data.append("account_status", formData.account_status);

      const response = await axios.post("/api/user", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Axios response:", response.data);
  
      return response.data;
    } catch (error) {
      console.error("Error adding User service:", error);
      throw error;
    }
  };

  const mapServiceData = (user: any) => ({
    id: user.id || 0,
    username: user.username || "",
    email: user.email || "",
    contact: user.contact || "",
    date_of_reg: user.date_of_reg || 0,
    account_status: user.account_status || "",
  });

export const getUserService = async () => {
    try {
      const response = await axios.get(`/api/user`);
      return response.data.map(mapServiceData);
    } catch (error: any) {
      return handleAxiosError(error) || [];
    }
  };

export const fetchUserServiceDetails = async (
    id: number
  ): Promise<UserServiceDetails | null> => {
    try {
      const response = await axios.get(`/api/user/${id}`);
      return response.data as UserServiceDetails;
    } catch (error: any) {
      return handleAxiosError(error);
    }
  };