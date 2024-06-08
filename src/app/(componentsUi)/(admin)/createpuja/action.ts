// action.ts
import axios from 'axios';

// Create a puja service
export const createPujaService = async (data:any) => {
  try {
    const response = await axios.post('/api/pujaservice', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error:any) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error', error.message);
    }
    throw error;
  }
};

// Fetch a puja category
export const fetchCategories = async () => {
  try {
    const response = await axios.get('/api/pujacategory');
    return response.data;
  } catch (error:any) {
    if (error.response) {
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
    } else if (error.request) {
      console.error(error.request);
    } else {
      console.error('Error', error.message);
    }
    throw error;
  }
};