import axios from "axios";

// Add address
export async function addAddress(data: {
  addressline: string;
  addressline2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  userId: number;
}) {
  try {
    const response = await axios.post("/api/address", data);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
}

// Fetch all addresses for a user
export async function fetchAddresses(userId: number) {
  try {
    const response = await axios.get(`/api/address?userId=${userId}`);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
}

// Set default address
export async function setDefaultAddress(addressId: number, userId: number) {
  try {
    const response = await axios.put(`/api/address/setDefaultAddress?addressId=${addressId}&userId=${userId}`);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
}

// Update address
export async function updateAddress(addressId: number, data: {
  addressline: string;
  addressline2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}) {
  try {
    const response = await axios.put(`/api/address/${addressId}`, data);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
}

// Delete address
export async function deleteAddress(addressId: number) {
  try {
    const response = await axios.delete(`/api/address?addressId=${addressId}`);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
}