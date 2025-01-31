"use client"
import { useState } from "react";

const CreateJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newJob = { title, description, deadline };

    const response = await fetch("/api/jobopening", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJob),
    });

    if (response.ok) {
      alert("Job added successfully!");
      setTitle("");
      setDescription("");
      setDeadline("");
    } else {
      alert("Failed to add job.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="job-form">
      <h2>Add Job Opening</h2>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Deadline:</label>
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Job</button>
    </form>
  );
};

export default CreateJob;
