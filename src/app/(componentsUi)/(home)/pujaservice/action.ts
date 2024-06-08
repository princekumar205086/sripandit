"use server"
import axios from 'axios';

export async function getPujaService() {
  try {
    const response = await axios.get(`${process.env.BASE_URL}/api/pujaservice?include=category`);
    return response.data;
  } catch (error:any) {
    console.error(`There was a problem with the axios operation: ${error.message}`);
    return []; // Return an empty array if an error occurs
  }
}

export async function getPujaSingleService(id: string) {
  try {
    const response = await axios.get(`${process.env.BASE_URL}/api/pujaservice/${id}?include=category`);
    return response.data;
  } catch (error: any) {
    console.error(`There was a problem with the axios operation: ${error.message}`);
    return null; // Return null if an error occurs
  }
}

// fetching category
export async function getPujaCategory() {
  try {
    const response = await axios.get(`${process.env.BASE_URL}/api/pujacategory`);
    return response.data;
  } catch (error: any) {
    console.error(`There was a problem with the axios operation: ${error.message}`);
    return []; // Return an empty array if an error occurs
  }
}