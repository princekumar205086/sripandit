"use server"
import axios from 'axios';

export async function getAstrologyService() {
  try {
    const response = await axios.get(`${process.env.BASE_URL}/api/astrology`);
    return response.data;
  } catch (error:any) {
    console.error(`There was a problem with the axios operation: ${error.message}`);
    return []; // Return an empty array if an error occurs
  }
}

export async function getAstrologySingleService(id: string) {
  try {
    const response = await axios.get(`${process.env.BASE_URL}/api/astrology/${id}`);
    return response.data;
  } catch (error: any) {
    console.error(`There was a problem with the axios operation: ${error.message}`);
    return null; // Return null if an error occurs
  }
}