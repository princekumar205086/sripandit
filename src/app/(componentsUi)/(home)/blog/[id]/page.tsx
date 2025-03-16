"use client";
import React, { useEffect, useState } from "react";
import { fetchBlogPost, postBlogComment, singlegetBlogComment } from "../action";
import Section from "../../pujaservice/section";
import Image from "next/image";
import { FaClock, FaUser, FaEye, FaComments } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import CryptoJS from "crypto-js";
import axios from "axios";

interface BlogPost {
  id: number;
  post_slug: string;
  post_title: string;
  featured_image: string;
  createdAt: string;
  user: { name: string };
  view_count: number;
  blogComments: Array<any>;
  post_description: string;
  categories: { category_slug: string; category_name: string }[];
}

const BlogPostPage = () => {
  const searchParams = useSearchParams();
  const encryptedId = searchParams.get("id");

  const decryptId = (encryptedId: string | null): string | null => {
    if (encryptedId) {
      try {
        const bytes = CryptoJS.AES.decrypt(
          decodeURIComponent(encryptedId),
          process.env.NEXT_PUBLIC_SECRET_KEY || "default-secret-key"
        );
        return bytes.toString(CryptoJS.enc.Utf8);
      } catch (error) {
        console.error("Decryption failed", error);
        return null;
      }
    }
    return null;
  };

  const blogId = decryptId(encryptedId);

  const [post, setPost] = useState<BlogPost | null>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [comment, setComment] = useState<string>("");

  // Fetch the blog post and comments based on the postId
  useEffect(() => {
    const getBlogPost = async () => {
      if (!blogId) {
        setError("Invalid Post ID");
        setLoading(false);
        return;
      }

      try {
        // Fetch the blog post
        const data = await fetchBlogPost(blogId);
        setPost(data);
        setLoading(false);

        // Fetch comments for this specific post
        const postComments = await singlegetBlogComment(Number(blogId));
        console.log(postComments);
        setComments(postComments);
      } catch (error) {
        setError("Failed to load blog post");
        setLoading(false);
        console.error(error);
      }
    };

    getBlogPost();
  }, [blogId]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handlePostComment = async () => {
    try {
      if (!blogId) {
        alert("Invalid blog ID. Cannot post comment.");
        return;
      }

      const numericBlogId = Number(blogId);

      if (isNaN(numericBlogId)) {
        alert("Invalid blog ID. Cannot post comment.");
        return;
      }

      const userId = 2; // Replace with dynamic user ID

      if (!userId) {
        alert("You must be logged in to post a comment.");
        return;
      }

      if (comment.trim()) {
        const { success, blogComment, error } = await postBlogComment(numericBlogId, comment, userId);

        if (success && blogComment) {
          setComment("");
          alert("Comment posted/updated successfully");

          // Update the comments immediately without re-fetching the post
          setComments((prevComments) => [...prevComments, blogComment]);
        } else {
          alert(error || "Failed to post/update comment. Please try again later.");
        }
      } else {
        alert("Please write a comment before posting.");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
      alert("An error occurred while posting your comment. Please try again later.");
    }
  };

  if (error) {
    return (
      <div className="text-center text-red-500 py-8">
        <p>{error}</p>
        <button
          onClick={() => {
            setError(null);
            setLoading(true);
            setPost(null);
            setComment("");
            setComments([]); // Clear comments as well
          }}
          className="mt-4 bg-orange-500 text-white py-2 px-4 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <>
      <Section
        bgImageUrl="image/blg.jpeg"
        title={post.post_title}
        description="Read our latest blog posts and stay updated with the latest trends."
      />
      <div className="container mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-orange-500">{post.post_title}</h1>
          <ul className="flex items-center justify-center text-sm text-gray-500 space-x-6 mt-4 left-0 right-0 mx-auto max-w-2xl">
            <li className="flex items-center">
              <FaClock className="mr-2 text-gray-600" />
              {new Date(post.createdAt).toLocaleDateString()}
            </li>
            <li className="flex items-center">
              <FaUser className="mr-2 text-gray-600" />
              {post.user?.name || "Unknown Author"}
            </li>
            <li className="flex items-center">
              <FaEye className="mr-2 text-gray-600" />
              {post.view_count || 0} Views
            </li>
            <li className="flex items-center">
              <FaComments className="mr-2 text-gray-600" />
              {comments.length || 0} Comments
            </li>
          </ul>
        </div>

        <div className="relative flex mx-auto justify-center w-full sm:w-96 h-auto mb-6">
          <Image
            className="w-full rounded-lg shadow-md border border-gray-300"
            src={post.featured_image}
            alt={post.post_title}
            width={1200}
            height={800}
          />
        </div>

        <div className="bg-white p-6 rounded-lg mb-4">
          <p className="text-lg text-gray-700 leading-relaxed">{post.post_description}</p>
        </div>

        {/* Comment Section */}
        <div className="bg-gray-100 py-12">
          <div className="container mx-auto px-6">
            <h3 className="text-3xl font-semibold text-gray-800 text-center mb-8">Join the Conversation</h3>
            <div className="flex flex-col items-center">
              <textarea
                className="w-full max-w-2xl h-40 p-4 border border-gray-300 rounded-lg mb-4 text-lg"
                placeholder="Write your comment here..."
                value={comment}
                onChange={handleCommentChange}
              />
              <button
                onClick={handlePostComment}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md"
              >
                Post Comment
              </button>
            </div>

            <div className="mt-8">
              <h4 className="text-2xl font-semibold text-gray-800">Recent Comments</h4>
              {comments.length ? (
                <div className="mt-6 space-y-4">
                  {comments.map((comment, index) => (
                    <div key={index} className="p-4 bg-white rounded-lg shadow-md">
                      <p className="text-gray-700">{comment.comment_text}</p>
                      <span className="text-sm text-gray-500">By {comment?.user?.name || "Anonymous"}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 mt-4">No comments yet. Be the first to comment!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPostPage;
