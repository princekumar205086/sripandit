import axios from "axios";

interface CheckoutData {
  userId: number;
  cartId: number;
  promoCodeId: number;
}

// insert checkout

export async function insertCheckout(data: CheckoutData) {  
  try {
    const response = await axios.post("/api/checkout", data);
    return response.data;
  } catch (error:any) {
    return error.response.data;
  }
}

// fetch checkout

export async function fetchCheckout(userId: number) {
  try {
    const response = await axios.get(`/api/checkout?userId=${userId}`);
    return response.data;
  } catch (error:any) {
    return error.response.data;
  }
}

// delete checkout

export async function deleteCheckout(checkoutId: number) {
  try {
    const response = await axios.delete(`/api/checkout?checkoutId=${checkoutId}`);
    return response.data;
  } catch (error:any) {
    return error.response.data;
  }
}

// update checkout

interface UpdateCheckoutData {
  checkoutId: number;
  promoCodeId: number;
}

export async function updateCheckout(data: UpdateCheckoutData) {
  try {
    const response = await axios.put("/api/checkout", data);
    return response.data;
  } catch (error:any) {
    return error.response.data;
  }
}

// delete all checkout explicit function

export async function deleteAllCheckout() {
  try {
    const response = await axios.delete(`/api/checkout`);
    return response.data;
  } catch (error:any) {
    return error.response.data;
  }
}