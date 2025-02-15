import axios from "axios";

// fetching booking details

export async function fetchBookingDetails(userId: number, cartId: string) {
  try {
    const response = await axios.get(
      `/api/pujabookingdetails?userId=${userId}&cartId=${cartId}`
    );
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
}
