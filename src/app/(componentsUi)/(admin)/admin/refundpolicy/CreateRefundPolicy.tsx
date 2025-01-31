import React, { useState } from "react";
import { toast } from "react-toastify";

interface CreateRefundPolicyProps {
  onClose: () => void; // Function to close the modal
  onPolicyAdded?: () => void; // Optional callback for when a policy is added
}

const CreateRefundPolicy: React.FC<CreateRefundPolicyProps> = ({
  onClose,
  onPolicyAdded,
}) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const API_ENDPOINT = "/api/refundpolicy";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content) {
      toast.warning("Please fill out all fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) throw new Error("Failed to create refund policy");

      toast.success("Refund policy added successfully!");
      setTitle("");
      setContent("");
      onPolicyAdded && onPolicyAdded(); // Optional callback to refresh data
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error creating refund policy:", error);
      toast.error("Failed to add refund policy. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter refund policy title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Content
          </label>
          <textarea
            id="content"
            rows={4}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter refund policy content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={`px-4 py-2 text-white rounded-lg ${
            loading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Saving..." : "Add Policy"}
        </button>
      </div>
    </form>
  );
};

export default CreateRefundPolicy;
