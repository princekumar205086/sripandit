import React, { useState } from "react";
import { toast } from "react-toastify";

interface RefundPolicy {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

interface EditRefundPolicyProps {
  policy: RefundPolicy;
  onClose: () => void; // Function to close the modal
  onUpdate: (updatedPolicy: RefundPolicy) => void; // Callback to update the policy in the parent component
}

const EditRefundPolicy: React.FC<EditRefundPolicyProps> = ({
  policy,
  onClose,
  onUpdate,
}) => {
  const [title, setTitle] = useState(policy.title);
  const [content, setContent] = useState(policy.content);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const API_ENDPOINT = `/api/refundpolicy/${policy.id}`;

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        throw new Error("Failed to update refund policy");
      }

      const updatedPolicy = await response.json();
      toast.success("Refund policy updated successfully");

      onUpdate(updatedPolicy); // Update the policy in the parent component
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error updating policy:", error);
      toast.error("Failed to update refund policy");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleEditSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            rows={6}
            required
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="mr-3 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRefundPolicy;
