import axios from "axios";

// fetch address

export async function fetchAddress(userId: number) {
  try {
    const response = await axios.get(`/api/address?userId=${userId}`);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
}

// add address

interface AddAddressData {
  userId: number;
  city: string;
  street: string;
  postalCode: string;
  state: string;
  country: string;
}

export async function addAddress(data: AddAddressData) {
  try {
    const response = await axios.post(`/api/address`, data);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
}

// update address

interface UpdateAddressData {
  id: number;
  city: string;
  street: string;
  postalCode: string;
  state: string;
  country: string;
}

export async function updateAddress(data: UpdateAddressData) {
  try {
    const response = await axios.put(`/api/address`, data);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
}

// delete address

export async function deleteAddress(id: number) {
  try {
    const response = await axios.delete(`/api/address/${id}`);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
}

//make default address

export async function makeDefaultAddress(id: number) {
  try {
    const response = await axios.put(`/api/address/makeDefault/${id}`);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
}