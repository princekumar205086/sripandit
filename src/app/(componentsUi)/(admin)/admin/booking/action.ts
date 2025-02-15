import axios from "axios";
import { number } from "yup";

// fetching booking details

export async function fetchBookingDetails(userId: number) {
  try {
    const response = await axios.get(`/api/booking/${userId}`);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
}

// update booking details

interface updateData {
  userId: number,
  cartId: number,
  BookId: string,
  selected_date: string,
  selected_time: string,
  status: string,
  cancellationReason: string,
  failureReason: string,
  rejectionReason: string,
};

export async function updateBookingDetails(id: number, data:updateData) {
  try {
    const response = await axios.put(`/api/booking/${id}`, data);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
}
