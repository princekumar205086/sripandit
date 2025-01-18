import axios from "axios";

// Fetch blog posts data
export const fetchblogdata = async () => {
  try {
    const response = await axios.get('api/blogpost');
    return response.data; // Assuming the response contains the data you need
  } catch (error: any) {
    console.error("Error fetching blog posts:", error);
    return []; // Return an empty array on error
  }
}

// Fetch categories data
export const fetchCategories = async () => {
  try {
    const response = await axios.get("/api/blogcategory");
    if (response.status !== 200) {
      throw new Error("Failed to fetch categories");
    }
    return response.data; // Return the categories from the response data
  } catch (error: any) {
    console.error("Error fetching categories:", error);
    throw error; 
  }
};

export const fetchBlogPost = async (id: string) => {
  try {
    const response = await axios.get(`/api/blogpost/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching blog post:", error);
    return null;
  }
};