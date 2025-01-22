import dynamic from "next/dynamic";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface EditTermsOfServiceProps {
  term: { id: number; title: string; content: string };
  onClose: () => void;
}

const EditTermsOfService: React.FC<EditTermsOfServiceProps> = ({ term, onClose }) => {
  const [editedTerm, setEditedTerm] = useState(term);
  const [isLoading, setIsLoading] = useState(false); 
  const [isSuccess, setIsSuccess] = useState(false); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!editedTerm.title || !editedTerm.content) {
      toast.error("Please fill in both title and content.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`/api/termofservice/${editedTerm.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editedTerm.title,
          content: editedTerm.content,
        }),
      });

      if (!response.ok) throw new Error("Failed to update term");

      toast.success("Term updated successfully!"); 
      setIsSuccess(true); // Set the success state
      setIsLoading(false);

      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error) {
      toast.error("Failed to update term.");
      console.error("Error updating term:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">Edit Terms of Service</h2>

      {isSuccess && (
        <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4">
          <p className="text-center">Term updated successfully!</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={editedTerm.title}
            onChange={(e) => setEditedTerm({ ...editedTerm, title: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter the title"
            disabled={isLoading}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
            Content
          </label>
          <ReactQuill
            theme="snow"
            value={editedTerm.content}
            onChange={(value) => setEditedTerm({ ...editedTerm, content: value })}
            className="mt-1 border-gray-300 rounded-md mb-12"
            style={{ height: "150px" }}
            
          />
        </div>

        <div className="flex justify-between items-center">
          <button
            type="submit"
            disabled={isLoading}
            className={`px-4 py-2 text-white rounded-lg ${isLoading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTermsOfService;
