import axios from "axios";

// fetch checkout details by cartId

export async function fetchCheckoutDetails(cartId: string) {
  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `/api/chekoutdetails?cartId=${cartId}`,
      headers: {},
    };

    const response = await axios.request(config);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching checkout details:", error);
    return error.response?.data || { error: "An error occurred" };
  }
}

// save booking

interface SaveBookingData {
  userId: number;
  cartId: number;
  BookId: number;
  selected_date: string;
  selected_time: string;
  addressId: number;
  status: string;
  cancellationReason: string;
  failureReason: string;
}

export async function saveBooking(data: SaveBookingData) {
  try {
    const response = await axios.post("/api/booking", data);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
}

// fetch bookingid

export async function fetchBookingId(userId: number, cartId: string) {
  try {
    const response = await axios.get(
      `/api/booking?userId=${userId}&cartId=${cartId}`
    );
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
}

// fetch payment

export async function fetchPayment(transactionId: number) {
  try {
    const response = await axios.get(
      `/api/paymentstatus?transactionId=${transactionId}`
    );
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
}

// save payment
interface SavePaymentData {
  bookingId: number;
  transactionId: string;
  amount: number;
  method: string;
  status: string;
}

export async function savePayment(data: SavePaymentData) {
  try {
    const response = await axios.post("/api/payment", data);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
}
