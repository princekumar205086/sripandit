"use client";

import React, { useState, useEffect } from "react";
import { FiSearch, FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../../layout";
import CreateJob from "./CreateJob";
import Modal from "./Modal";
import EditJob from "./EditJob";
import ViewJob from "./ViewJob";

interface JobOpening {
  id: number;
  title: string;
  description: string;
  deadline: string;
}

const JobManagement: React.FC = () => {
  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [selectedJobIds, setSelectedJobIds] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);

  const API_ENDPOINT = "/api/jobopening";

  // Fetch job openings
  const fetchJobs = async (searchQuery: string = "") => {
    try {
      const response = await fetch(`${API_ENDPOINT}?search=${searchQuery}`);
      if (!response.ok) throw new Error("Failed to fetch job openings");
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast.error("Failed to fetch job openings");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Handle search
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchTerm(query);
    fetchJobs(query);
  };

  // Handle select/deselect job
  const handleSelectJob = (id: number) => {
    setSelectedJobIds((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id]
    );
  };

  // Bulk delete selected jobs
  const handleBulkDelete = async () => {
    if (selectedJobIds.length === 0) {
      toast.warning("Please select jobs to delete");
      return;
    }

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selectedJobIds }),
      });

      if (!response.ok) throw new Error("Failed to delete jobs");

      toast.success("Selected jobs deleted successfully");
      setJobs((prev) => prev.filter((job) => !selectedJobIds.includes(job.id)));
      setSelectedJobIds([]);
    } catch (error) {
      console.error("Error deleting jobs:", error);
      toast.error("Failed to delete jobs");
    }
  };

  // Delete single job
  const handleDeleteSingle = async (id: number) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete job");

      toast.success("Job deleted successfully");
      setJobs((prev) => prev.filter((job) => job.id !== id));
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error("Failed to delete job");
    }
  };

  return (
    <Layout>
      <ToastContainer />
      <div className="min-h-screen bg-gray-100 p-6">
        {/* Header Section */}
        <div className="bg-white p-4 rounded shadow mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Manage Job Openings</h1>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <IoMdAdd className="mr-2" />
              Add Job Opening
            </button>
          </div>
          <div className="relative mt-4">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        {/* Job Listings Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    onChange={() =>
                      setSelectedJobIds(
                        selectedJobIds.length === jobs.length
                          ? []
                          : jobs.map((job) => job.id)
                      )
                    }
                    checked={selectedJobIds.length === jobs.length}
                  />
                </th>
                <th className="px-6 py-3">SN.</th>
                <th className="px-6 py-3">Job Title</th>
                <th className="px-6 py-3">description</th>
                <th className="px-6 py-3">deadline</th>

                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, index) => (
                <tr key={job.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedJobIds.includes(job.id)}
                      onChange={() => handleSelectJob(job.id)}
                    />
                  </td>
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{job.title}</td>
                  <td className="px-6 py-4">{job.description}</td>
                  <td className="px-6 py-4">{job.deadline}</td>
                  <td className="px-6 py-4 flex space-x-2">
                    <button
                      className="p-1 text-green-600"
                      onClick={() => {setSelectedJob(job);
                        setIsViewModalOpen(true);


                      }}
                    >
                      <FiEye />
                    </button>
                    <button
                      className="p-1 text-blue-600"
                      onClick={() => {
                        setSelectedJob(job);
                        setIsEditModalOpen(true);
                      }}
                    >
                      <FiEdit />
                    </button>
                    <button
                      className="p-1 text-red-600"
                      onClick={() => handleDeleteSingle(job.id)}
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end mt-4">
          <button
            onClick={handleBulkDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Delete Selected
          </button>
        </div>
      </div>

      {/* Add Job Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Job Opening"
      >
        <CreateJob onClose={() => setIsAddModalOpen(false)} />
      </Modal>

      {selectedJob && isEditModalOpen && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title={`Edit ${selectedJob.title}`}
        >
          <EditJob
            jobOpening={selectedJob} // Corrected the prop name here to `jobOpening`
            onClose={() => setIsEditModalOpen(false)} // Close modal after update
            onUpdate={(updatedJobOpening) => {
              setJobs((prev) =>
                prev.map(
                  (
                    job // Use `job` instead of `jobs` here
                  ) =>
                    job.id === updatedJobOpening.id ? updatedJobOpening : job
                )
              );
            }}
          />
        </Modal>
      )}
      {selectedJob && isViewModalOpen && (
        <Modal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          title={`View ${selectedJob.title}`}
        >
          <ViewJob
            jobOpening={selectedJob}
            onClose={() => setIsViewModalOpen(false)}
          />
        </Modal>
      )}
    </Layout>
  );
};

export default JobManagement;
