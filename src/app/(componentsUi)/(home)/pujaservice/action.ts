"use server"
import axios from 'axios';

const handleAxiosError = (error: any) => {
  if (axios.isAxiosError(error) && error.response?.status === 404) {
    console.error('Resource not found');
    return null; // Return null if a 404 error occurs
  } else {
    console.error("Axios operation error:", error);
    throw error;
  }
};

const mapServiceData = (service: any) => ({
  id: service.id,
  title: service.title,
  img: service.img,
  desc: service.desc,
  categoryId: service.categoryId,
  date_of_create: service.date_of_create,
  category: service.category ? {
    id: service.category.id,
    name: service.category.name,
  } : null,
  packages: service.packages ? service.packages.map((pkg: any) => ({
    id: pkg.id,
    location: pkg.location,
    language: pkg.language,
    type: pkg.type,
    price: pkg.price,
    description: pkg.description,
    pujaServiceId: pkg.pujaServiceId,
  })) : [],
});

export async function getPujaService() {
  try {
    const response = await axios.get(`${process.env.BASE_URL}/api/pujaservice?include=category`);
    return response.data.map(mapServiceData);
  } catch (error: any) {
    return handleAxiosError(error) || [];
  }
}


// fetching category
export async function getPujaCategory() {
  try {
    const response = await axios.get(`${process.env.BASE_URL}/api/pujacategory`);
    return response.data.map((category: any) => ({
      id: category.id,
      name: category.name,
    }));
  } catch (error: any) {
    return handleAxiosError(error) || [];
  }
}

//fetching pujaDetails
export const fetchPujaServiceDetails = async (id: number) => {
  try {
    const response = await axios.get(`${process.env.BASE_URL}/api/pujaservice/${id}`);
    return response.data;
  } catch (error: any) {
    return handleAxiosError(error);
  }
};

