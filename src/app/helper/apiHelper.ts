import axios from "axios";

export async function apiRequest(
  method: string,
  url: string,
  data?: any,
  headers?: any
) {
  try {
    const isFormData = data instanceof FormData;
    const response = await axios({
      method,
      url,
      data,
      headers: {
        "Content-Type": isFormData ? "multipart/form-data" : "application/json",
        ...headers,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response?.data || { message: error.message };
  }
}