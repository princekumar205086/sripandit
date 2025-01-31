import React, { useState } from "react";
import { toast } from "react-toastify";

interface JobOpening {
    id:number;
  title: string;
  description: string;
  deadline: string;
}

interface EditJobProps {
  jobOpening: JobOpening;
  onClose: () => void; // Function to close the modal
  onUpdate: (updatedJobOpening: JobOpening) => void; // Callback to update the job opening in the parent component
}

const EditJob: React.FC<EditJobProps> = ({
  jobOpening,
  onClose,
  onUpdate,
}) => {
  const [title, setTitle] = useState(jobOpening.title);
  const [description, setDescription] = useState(jobOpening.description);
  const [deadline, setDeadline] = useState(jobOpening.deadline);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const API_ENDPOINT = `/api/jobopening/${jobOpening.id}`; // Adjust API endpoint as needed

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, deadline }),
      });

      if (!response.ok) {
        throw new Error("Failed to update job opening");
      }

      const updatedJobOpening = await response.json();
      toast.success("Job opening updated successfully");

      onUpdate(updatedJobOpening); // Update the job opening in the parent component
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error updating job opening:", error);
      toast.error("Failed to update job opening");
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
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            rows={6}
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
            Deadline
          </label>
          <input
            id="deadline"
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="mr-3 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
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

export default EditJob;
