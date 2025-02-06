'use client';

import React, { useState } from 'react';
import { toast } from 'react-toastify';

interface CreateEventProps {
  onClose: () => void;
  onEventAdded?: () => void;
}

const CreateEvent: React.FC<CreateEventProps> = ({ onClose, onEventAdded }) => {
  const [title, setTitle] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null); // Store the actual file
  const [day, setDay] = useState('');
  const [number, setNumber] = useState('');
  const [month, setMonth] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const API_ENDPOINT = '/api/events';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!title || !imageFile || !day || !number || !month || !content) {
      toast.warning("Please fill out all fields.");
      return;
    }
  
    setLoading(true);
  
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("image", imageFile); // Append the actual file
      formData.append("day", day);
      formData.append("number", number);
      formData.append("month", month);
      formData.append("content", content);
  
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        body: formData,
      });
      
  
      if (!response.ok) throw new Error("Failed to create event");
  
      toast.success("Event added successfully!");
      setTitle("");
      setImageFile(null); // Reset the file
      setDay("");
      setNumber("");
      setMonth("");
      setContent("");
      onEventAdded && onEventAdded();
      onClose();
      
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error("Failed to add event. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Get the selected file
    if (file) {
      setImageFile(file); // Store the file object
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Event Title</label>
        <input
          type="text"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter event title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Event Image</label>
        <input
          type="file"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          onChange={handleImageChange} 
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Day</label>
        <input
          type="text"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter day (e.g., Monday)"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="number"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter date (e.g., 12)"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Month</label>
        <input
          type="text"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter month (e.g., January)"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Content</label>
        <textarea
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter event description"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
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
          className={`px-4 py-2 text-white rounded-lg ${loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Add Event'}
        </button>
      </div>
    </form>
  );
};

export default CreateEvent;
