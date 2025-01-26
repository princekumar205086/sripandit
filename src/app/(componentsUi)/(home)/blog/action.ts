import { BlogPost } from "@prisma/client";
import axios from "axios";

// Fetch blog posts data
export const fetchblogdata = async () => {
  try {
    const response = await axios.get('api/blogpost');
    return response.data; 
  } catch (error: any) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

// Fetch categories data
export const fetchCategories = async () => {
  try {
    const response = await axios.get("/api/blogcategory");
    if (response.status !== 200) {
      throw new Error("Failed to fetch categories");
    }
    return response.data; 
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
export const deleteBlogPost = async (id: number) => {
  const response = await axios.delete(`/api/blogpost/${id}`, {
    method: 'DELETE',
  });

  if (response.status !== 200) {
    throw new Error('Failed to delete blog post');
  }
};
export const updateBlogPost = async (post: BlogPost) => {
  try {
    const response = await axios.put(`/api/blogpost/${post.id}`, post, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status !== 200) {
      throw new Error('Failed to update blog post');
    }

    return response.data;
  } catch (error: any) {
    console.error("Error updating blog post:", error);
    throw error; 
  }
};

