import axios from "axios";

// insert cart

interface CartData {
  userId: number;
  pujaServiceId: number;
  packageId: number;
  selected_date: string;
  selected_time: string;
}

export async function insertCart(data: CartData) {  
  try {
    const response = await axios.post("/api/cart", data);
    return response.data;
  } catch (error:any) {
    return error.response.data;
  }
}

// fetch cart

export async function fetchCart(userId: number) {
  try {
    const response = await axios.get(`/api/cart?userId=${userId}`);
    return response.data;
  } catch (error:any) {
    return error.response.data;
  }
}

// delete cart

export async function deleteCart(cartId: number) {
  try {
    const response = await axios.delete(`/api/cart?bookingId=${cartId}`);
    return response.data;
  } catch (error:any) {
    return error.response.data;
  }
}

// delete all cart explicit function

export async function deleteAllCart() {
  try {
    const response = await axios.delete(`/api/cart`);
    return response.data;
  } catch (error:any) {
    return error.response.data;
  }
}

// update cart

interface UpdateCartData {
  cartId: number;
  selected_date: string;
  selected_time: string;
}

export async function updateCart(data: UpdateCartData) {
  try {
    const response = await axios.put("/api/cart", data);
    return response.data;
  } catch (error:any) {
    return error.response.data;
  }
}