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

export const getBlogComment = async () => {
  try {
    const response = await axios.get(`/api/blogcomments`);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching blog comments:", error);
    return [];
  }
}
export const singlegetBlogComment = async (postId: number) => {
  try {
    const response = await axios.get(`/api/blogcomments?post_id=${postId}`);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching blog comments:", error);
    return [];
  }
};
export const postBlogComment = async (postId: number, commentText: string, userId: number) => {
  try {
    // Check if the user has already commented on this post
    const existingCommentResponse = await axios.get(`/api/blogcomments?post_id=${postId}&user_id=${userId}`);

    if (existingCommentResponse.data && existingCommentResponse.data.length > 0) {
      // If the user has already commented, update the existing comment
      const existingComment = existingCommentResponse.data[0];
      const updateResponse = await axios.put(`/api/blogcomments/${existingComment.id}`, {
        comment_text: commentText,
      });

      return {
        success: true,
        blogComment: updateResponse.data, // Return the updated comment
      };
    } else {
      // If the user has not commented, create a new comment
      const createResponse = await axios.post(`/api/blogcomments`, {
        post_id: postId,
        user_id: userId,
        comment_text: commentText,
      });

      return {
        success: true,
        blogComment: createResponse.data, // Return the newly created comment
      };
    }
  } catch (error) {
    console.error("Error posting/updating blog comment:", error);
    return {
      success: false,
      error: "Failed to post/update comment",
    };
  }
};

export const deletecomments = async (id: number) => {
  const response = await axios.delete(`/api/blogcomments/${id}`, {
    method: 'DELETE',
  });
  if (response.status !== 200) {
    throw new Error('Failed to delete blog post');
  }
};
