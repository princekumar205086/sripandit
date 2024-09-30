"use client";

import React, { useState } from "react";
import Section from "../pujaservice/section";
import { FaBriefcase, FaUsers, FaChartLine, FaClipboardCheck } from "react-icons/fa";
import { BsCheckCircleFill } from "react-icons/bs";

interface JobOpening {
  id: number;
  title: string;
  description: string;
  deadline: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  resume: File | null;
  coverLetter: string;
  selectedJob: string;
}

interface Errors {
  name?: string;
  email?: string;
  phone?: string;
  resume?: string;
  coverLetter?: string;
  selectedJob?: string;
}

export default function Career() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    resume: null,
    coverLetter: "",
    selectedJob: "",
  });

  const [errors, setErrors] = useState<Errors>({});

  const jobOpenings: JobOpening[] = [
    {
      id: 1,
      title: "Puja Coordinator",
      description: "Manage and coordinate various puja events.",
      deadline: "2023-08-31",
    },
    {
      id: 2,
      title: "Customer Support Specialist",
      description: "Provide excellent support to our puja booking clients.",
      deadline: "2023-09-15",
    },
    {
      id: 3,
      title: "Digital Marketing Expert",
      description: "Drive our online presence and attract more devotees.",
      deadline: "2023-09-30",
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (allowedTypes.includes(file.type)) {
        setFormData({ ...formData, resume: file });
        setErrors({ ...errors, resume: "" });
      } else {
        setErrors({
          ...errors,
          resume: "Please upload a PDF, DOC, or DOCX file.",
        });
      }
    }
  };

  const validateField = (name: string, value: string) => {
    let error = "";
    switch (name) {
      case "name":
        error = value.trim() === "" ? "Name is required" : "";
        break;
      case "email":
        error = !/\S+@\S+\.\S+/.test(value) ? "Invalid email address" : "";
        break;
      case "phone":
        error = !/^\d{10}$/.test(value) ? "Invalid phone number" : "";
        break;
      case "coverLetter":
        error = value.trim() === "" ? "Cover letter is required" : "";
        break;
      case "selectedJob":
        error = value === "" ? "Please select a job" : "";
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Errors = {};
    Object.keys(formData).forEach((key) => {
      validateField(key, formData[key as keyof FormData] as string);
      if (errors[key as keyof Errors]) {
        newErrors[key as keyof Errors] = errors[key as keyof Errors];
      }
    });
    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted:", formData);
      // Submit the form data to the server here
    } else {
      setErrors(newErrors);
    }
  };

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Section
        bgImageUrl="image/career.jpeg"
        title="Explore Career Opportunities"
        description="We are always looking for talented individuals to join our team. If you are passionate about technology and want to make a difference, we would love to hear from you."
      />
      <div className="bg-redOrange min-h-screen font-sans">
        <header className="bg-redOrange text-cream py-4">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold">Join Our Puja Booking Team</h1>
            <p className="mt-2 text-xl">Discover Exciting Career Opportunities</p>
          </div>
        </header>

        <nav className="bg-cream text-orangeRed sticky top-16 z-10">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <ul className="flex space-x-6">
              <li>
                <button onClick={() => scrollTo("job-openings")} className="hover:text-purple-200 transition duration-300">
                  Job Openings
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo("why-join-us")} className="hover:text-purple-200 transition duration-300">
                  Why Join Us
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo("application-form")} className="hover:text-purple-200 transition duration-300">
                  Apply Now
                </button>
              </li>
            </ul>
          </div>
        </nav>

        <main className="container mx-auto px-4 py-8">
          <section id="job-openings" className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-cream">Current Job Openings</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobOpenings.map((job) => (
                <div
                  key={job.id}
                  className="bg-cream rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300"
                >
                  <h3 className="text-xl font-semibold mb-2 text-orangeRed">{job.title}</h3>
                  <p className="text-orangeRed mb-4">{job.description}</p>
                  <p className="text-sm text-orangeRed mb-4">Application Deadline: {job.deadline}</p>
                  <button
                    onClick={() => scrollTo("application-form")}
                    className="bg-redOrange text-cream py-2 px-4 rounded hover:bg-orange-500 transition duration-300"
                  >
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section id="why-join-us" className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-cream">Why Join Us</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-cream rounded-lg shadow-md p-6 flex flex-col items-center text-center">
                <FaBriefcase className="text-4xl text-orangeRed mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-orange-500">Meaningful Work</h3>
                <p className="text-orange-400">Make a difference in people's spiritual lives</p>
              </div>
              <div className="bg-cream rounded-lg shadow-md p-6 flex flex-col items-center text-center">
                <FaUsers className="text-4xl text-orangeRed mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-orange-500">Inclusive Culture</h3>
                <p className="text-orange-400">Be part of a diverse and supportive team</p>
              </div>
              <div className="bg-cream rounded-lg shadow-md p-6 flex flex-col items-center text-center">
                <FaChartLine className="text-4xl text-orangeRed mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-orange-500">Growth Opportunities</h3>
                <p className="text-orange-400">Continuous learning and career advancement</p>
              </div>
              <div className="bg-cream rounded-lg shadow-md p-6 flex flex-col items-center text-center">
                <FaClipboardCheck className="text-4xl text-orangeRed mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-orange-500">Work-Life Balance</h3>
                <p className="text-orange-400">Flexible schedules and generous time off</p>
              </div>
            </div>
          </section>

          <section id="application-form" className="bg-cream rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold mb-6 text-orangeRed">Application Form</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-orange-500 font-semibold mb-2" htmlFor="name">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 text-orangeRed ${errors.name ? "border-red-500" : "border-gray-300"
                      }`}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-orange-500 font-semibold mb-2" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 text-orangeRed ${errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-orange-500 font-semibold mb-2" htmlFor="phone">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 text-orangeRed ${errors.phone ? "border-red-500" : "border-gray-300"
                      }`}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-orange-500 font-semibold mb-2" htmlFor="selectedJob">
                    Select Job
                  </label>
                  <select
                    id="selectedJob"
                    name="selectedJob"
                    value={formData.selectedJob}
                    onChange={handleInputChange}
                    className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 text-orangeRed ${errors.selectedJob ? "border-red-500" : "border-gray-300"
                      }`}
                  >
                    <option value="">-- Select Job --</option>
                    {jobOpenings.map((job) => (
                      <option key={job.id} value={job.title}>
                        {job.title}
                      </option>
                    ))}
                  </select>
                  {errors.selectedJob && <p className="text-red-500 text-sm mt-1">{errors.selectedJob}</p>}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-orange-500 font-semibold mb-2" htmlFor="resume">
                  Upload Resume (PDF, DOC, DOCX)
                </label>
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 text-orangeRed ${errors.resume ? "border-red-500" : "border-gray-300"
                    }`}
                />
                {errors.resume && <p className="text-red-500 text-sm mt-1">{errors.resume}</p>}
              </div>

              <div className="mb-6">
                <label className="block text-orange-500 font-semibold mb-2" htmlFor="coverLetter">
                  Cover Letter
                </label>
                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 text-orangeRed ${errors.coverLetter ? "border-red-500" : "border-gray-300"
                    }`}
                  rows={4}
                ></textarea>
                {errors.coverLetter && <p className="text-red-500 text-sm mt-1">{errors.coverLetter}</p>}
              </div>

              <button
                type="submit"
                className="bg-redOrange text-cream py-2 px-4 rounded hover:bg-orange-800 transition duration-300"
              >
                Submit Application
              </button>
            </form>
          </section>
        </main>
      </div>
    </>
  );
}
