"use client";
import React, { useEffect, useState } from "react";
import Section from "../pujaservice/section";
import { deletecomments, getBlogComment } from "../blog/action";

interface BlogComment {
  id: number;
  post: { post_title: string };
  comment_text: string;
}

const Page = () => {
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const commentsPerPage = 5;

  useEffect(() => {
    // Function to fetch comments
    const getComments = async () => {
      try {
        const data = await getBlogComment();
        setComments(data);
        setLoading(false);
      } catch (error) {
        setError("Failed to load comments");
        setLoading(false);
        console.error(error);
      }
    };

    getComments();
  }, []); 
  useEffect(() => {
    const totalComments = comments.length;
    const totalPages = Math.ceil(totalComments / commentsPerPage);

    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [comments, currentPage]);

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      try {
        await deletecomments(id);
        const updatedComments = comments.filter((comment) => comment.id !== id);
        setComments(updatedComments);
        const totalComments = updatedComments.length;
        const totalPages = Math.ceil(totalComments / commentsPerPage);
        if (currentPage >= totalPages) {
          setCurrentPage(totalPages);
        }
      } catch (error) {
        setError("Failed to delete comment");
        console.error(error);
      }
    }
  };

  // Handle search input change
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Filter comments based on search term
  const filteredComments = comments.filter(comment => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    return (
      comment.post?.post_title.toLowerCase().includes(lowercasedSearchTerm) ||
      comment.comment_text.toLowerCase().includes(lowercasedSearchTerm)
    );
  });

  const totalComments = filteredComments.length;
  const totalPages = Math.ceil(totalComments / commentsPerPage);

  // Calculate the index of the comments to display on the current page
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = filteredComments.slice(indexOfFirstComment, indexOfLastComment);

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page < 0 || page > totalPages) return;
    setCurrentPage(page);
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>;
  }

  return (
    <>
      <Section
        bgImageUrl="/image/blg.jpeg"
        title="Okpuja Blog"
        description="Read our latest blog posts and stay updated with the latest trends."
      />
      <div className="container mx-auto py-4">
        <div className="bg-white p-6 rounded-lg border shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Blog Comments</h2>

          {/* Search Input */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by title or description"
              className="p-2 lg:text-md border border-gray-300 rounded-md w-full"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          {/* Table for Blog Comments */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Post Title</th>
                  <th className="py-2 px-4 border-b">Comment</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentComments.map((comment) => (
                  <tr key={comment.id}>
                    <td className="py-2 px-4 border-b">{comment.post?.post_title}</td>
                    <td className="py-2 px-4 border-b">{comment.comment_text}</td>
                    <td className="py-2 px-4 border-b">
                      <button
                        className="text-red-500 hover:text-red-600 text-sm"
                        onClick={() => handleDelete(comment.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-6">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 mx-1 border border-gray-300 rounded text-sm"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 mx-1 border border-gray-300 rounded text-sm ${
                  currentPage === index + 1 ? "bg-blue-500 text-white" : ""
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 mx-1 border border-gray-300 rounded text-sm"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
