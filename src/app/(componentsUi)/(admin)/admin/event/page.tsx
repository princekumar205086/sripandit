"use client";

import React, { useState, useEffect } from "react";
import { FiSearch, FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../../layout";
import CreateEvent from "./CreateEvent";
import Modal from "./Modal";
import EditEvent from "./EditEvent";

//import ViewEvent from "./ViewEvent";

interface Event {
  id: number;
  title: string;
  imagesrc: string;
  day: string;
  number: number;
  month: string;
  content: string;
}

const ManageEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEventIds, setSelectedEventIds] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);

  const API_ENDPOINT = "/api/events";

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async (searchQuery: string = "") => {
    try {
      const response = await fetch(`${API_ENDPOINT}?search=${searchQuery}`);
      if (!response.ok) throw new Error("Failed to fetch events");
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
      toast.error("Failed to fetch events");
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    fetchEvents(event.target.value);
  };

  const handleSelectEvent = (id: number) => {
    setSelectedEventIds((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id]
    );
  };
  const handleDeleteSingle = async (eventId: number) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        const response = await fetch(`${API_ENDPOINT}/${eventId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (!response.ok) throw new Error("Failed to delete event");
  
        toast.success("Event deleted successfully");
        setEvents((prev) => prev.filter((event) => event.id !== eventId));
      } catch (error) {
        console.error("Error deleting event:", error);
        toast.error("Failed to delete event");
      }
    }
  };
  

  return (
    <Layout>
      <ToastContainer />
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="bg-white p-4 rounded shadow mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Manage Events</h1>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <IoMdAdd className="mr-2" /> Add Event
          </button>
        </div>

        <div className="relative mb-4">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search events..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    onChange={() =>
                      setSelectedEventIds(
                        selectedEventIds.length === events.length
                          ? []
                          : events.map((event) => event.id)
                      )
                    }
                    checked={selectedEventIds.length === events.length}
                  />
                </th>
                <th className="px-6 py-3">SN.</th>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <tr key={event.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedEventIds.includes(event.id)}
                      onChange={() => handleSelectEvent(event.id)}
                    />
                  </td>
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{event.title}</td>
                  <td className="px-6 py-4">
                    {event.day} {event.number}, {event.month}
                  </td>
                  <td className="px-6 py-4 flex space-x-2">
                    <button
                      className="p-1 text-green-600"
                      onClick={() => {
                        setSelectedEvent(event);
                        setIsViewModalOpen(true);
                      }}
                    >
                      <FiEye />
                    </button>
                    <button
                      className="p-1 text-blue-600"
                      onClick={() => {
                        setSelectedEvent(event);
                        setIsEditModalOpen(true);
                      }}
                    >
                      <FiEdit />
                    </button>
                    <button
                      className="p-1 text-red-600"
                      onClick={() => handleDeleteSingle(event.id)}
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Event"
      >
        <CreateEvent onClose={() => setIsAddModalOpen(false)} />
      </Modal>

      {selectedEvent && isEditModalOpen && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Edit Event"
        >
          <EditEvent
            event={selectedEvent}
            onClose={() => setIsEditModalOpen(false)}
            onUpdate={(updatedEvent) => {
              setEvents((prevEvents) =>
                prevEvents.map((event) =>
                  event.id === updatedEvent.id ? updatedEvent : event
                )
              );
            }}
          />
        </Modal>
      )}
    </Layout>
  );
};

export default ManageEvents;
