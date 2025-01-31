import React, { useState, useEffect } from "react";
import { FiEye } from "react-icons/fi"; // Import the eye icon

interface JobOpening {
  id: number;
  title: string;
  description: string;
  deadline: string;
}
interface ViewJobProps {
  jobOpening: JobOpening;
  onClose: () => void;
}

const ViewJob: React.FC<ViewJobProps> = ({ jobOpening, onClose }) => {
  const [jobs, setJobs] = useState<JobOpening[]>([]); // State for all jobs
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null); // State for the selected job
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  // Fetch job openings from API
  const fetchJobs = async () => {
    try {
      const response = await fetch("/api/jobopening"); // Replace with your actual API endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch job openings");
      }
      const data: JobOpening[] = await response.json();
      setJobs(data);
    } catch (error) {
      setError("Error loading job openings");
    } finally {
      setLoading(false);
    }
  };

  // Fetch job data on component mount
  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {/* Display the list of jobs */}
      <ul>
        {jobs.map((job) => (
          <li key={job.id} className="flex justify-between p-4">
            <span>{job.title}</span>
            <button
              className="p-1 text-green-600"
              onClick={() => setSelectedJob(job)} // Select the job on click
            >
              <FiEye />
            </button>
          </li>
        ))}
      </ul>

      {/* Display selected job details if a job is selected */}
      {selectedJob && (
        <div className="mt-4 p-4 border border-gray-300">
          <h2 className="text-2xl font-bold">{selectedJob.title}</h2>
          <p>{selectedJob.description}</p>
          <p className="text-gray-500">Deadline: {selectedJob.deadline}</p>
        </div>
      )}
    </div>
  );
};

export default ViewJob;
