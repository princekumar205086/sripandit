import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const AstrologyBookingModal = ({ isOpen, onClose }: any) => {
  if (!isOpen) return null;

  // Form validation schema using Yup
  const validationSchema = Yup.object({
    language_consultation: Yup.string().required(
      "Language for consultation is required"
    ),
    preferred_date: Yup.date().required("Preferred date is required"),
    preferred_time: Yup.string().required("Preferred time is required"),
    place_birth: Yup.string().required("Place of birth is required"),
    dob: Yup.date().required("Date of birth is required"),
    time_birth: Yup.string().required("Time of birth is required"),
    gender: Yup.string().required("Gender is required"),
    question: Yup.string(),
  });

  // Formik hook for form handling
  const formik = useFormik({
    initialValues: {
      language_consultation: "",
      preferred_date: "",
      preferred_time: "",
      place_birth: "",
      dob: "",
      time_birth: "",
      gender: "male", // Default value
      question: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      // Handle form submission here
    },
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-black pt-20">
      <div className="bg-white rounded-lg w-full p-4 sm:p-6 lg:p-8 max-w-full sm:max-w-3xl lg:max-w-5xl xl:max-w-6xl relative">
        <img
          alt="image"
          src="https://www.smartpuja.com/img/home/svg/smartpuja-leaf.svg"
          className="absolute top-0 right-0 w-16 h-16"
        />
        <div className="header text-2xl font-semibold mb-4 text-black">
          <h2>
            Astrology - In-depth Horoscope Report (<i>in-person</i>)
          </h2>
          <p>Please enter your details for the booking</p>
        </div>
        <hr />
        <div className="body pt-4 mt-2">
          <form
            onSubmit={formik.handleSubmit}
            name="astrology-cart"
            className="form-cm-styles mx-auto horoscope-matching-popup"
          >
            <input type="hidden" name="type" value="single" />
            <input type="hidden" name="mode" value="in-person" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              {/* Language for consultation */}
              <div>
                <label className="text-xl">
                  Select language for consultation*
                </label>
                <select
                  name="language_consultation"
                  id="language_consultation"
                  className="rounded-lg px-4 py-3 w-full text-xl lg:text-2xl text-gray-800 bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                  onChange={formik.handleChange}
                  value={formik.values.language_consultation}
                >
                  <option value="null">Select Language</option>
                  <option value="english">English</option>
                  <option value="hindi">Hindi</option>
                  <option value="kannada">Kannada</option>
                  <option value="telugu">Telugu</option>
                </select>
                {formik.touched.language_consultation &&
                formik.errors.language_consultation ? (
                  <div>{formik.errors.language_consultation}</div>
                ) : null}
              </div>
              {/* Other input fields follow the same pattern as above */}
              {/* Preferred Date */}
              <div>
                <label className="text-xl">Preferred date*</label>
                <input
                  type="date"
                  name="preferred_date"
                  id="preferred_date"
                  className="rounded-lg px-4 py-3 w-full text-xl lg:text-2xl text-gray-800 bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                  onChange={formik.handleChange}
                  value={formik.values.preferred_date}
                />
                {formik.touched.preferred_date &&
                formik.errors.preferred_date ? (
                  <div>{formik.errors.preferred_date}</div>
                ) : null}
              </div>
              {/* Preferred Time */}
              <div>
                <label className="text-xl">Preferred time*</label>
                <input
                  type="time"
                  name="preferred_time"
                  id="preferred_time"
                  className="rounded-lg px-4 py-3 w-full text-xl lg:text-2xl text-gray-800 bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                  onChange={formik.handleChange}
                  value={formik.values.preferred_time}
                />
                {formik.touched.preferred_time &&
                formik.errors.preferred_time ? (
                  <div>{formik.errors.preferred_time}</div>
                ) : null}
              </div>
              {/* Place of Birth */}
              <div>
                <label className="text-xl">Place of Birth*</label>
                <input
                  type="text"
                  name="place_birth"
                  id="place_birth"
                  className="rounded-lg px-4 py-3 w-full text-xl lg:text-2xl text-gray-800 bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                  onChange={formik.handleChange}
                  value={formik.values.place_birth}
                />
                {formik.touched.place_birth && formik.errors.place_birth ? (
                  <div>{formik.errors.place_birth}</div>
                ) : null}
              </div>
              {/* Date of Birth */}
              <div>
                <label className="text-xl">Date of Birth*</label>
                <input
                  type="date"
                  name="dob"
                  id="dob"
                  className="rounded-lg px-4 py-3 w-full text-xl lg:text-2xl text-gray-800 bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                  onChange={formik.handleChange}
                  value={formik.values.dob}
                />
                {formik.touched.dob && formik.errors.dob ? (
                  <div>{formik.errors.dob}</div>
                ) : null}
              </div>
              {/* Time of Birth */}
              <div>
                <label className="text-xl">Time of Birth*</label>
                <input
                  type="time"
                  name="time_birth"
                  id="time_birth"
                  className="rounded-lg px-4 py-3 w-full text-xl lg:text-2xl text-gray-800 bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                  onChange={formik.handleChange}
                  value={formik.values.time_birth}
                />
                {formik.touched.time_birth && formik.errors.time_birth ? (
                  <div>{formik.errors.time_birth}</div>
                ) : null}
              </div>
            </div>
            <hr />
            {/* Gender */}
            <div className="flex flex-col mt-4">
              <label className="text-xl mb-2">Select Gender*</label>
              <div className="flex items-center mb-4">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  id="male"
                  className="cursor-pointer"
                  onChange={formik.handleChange}
                  checked={formik.values.gender === "male"}
                />
                <label htmlFor="male" className="ml-2">
                  Male
                </label>
              </div>
              <div className="flex items-center mb-4">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  id="female"
                  className="cursor-pointer"
                  onChange={formik.handleChange}
                  checked={formik.values.gender === "female"}
                />
                <label htmlFor="female" className="ml-2">
                  Female
                </label>
              </div>
              {formik.touched.gender && formik.errors.gender ? (
                <div className="text-red-500">{formik.errors.gender}</div>
              ) : null}
            </div>
            {/* Questions */}
            <div className="flex flex-col mb-10">
              <label className="text-xl mb-2">Have any questions?</label>
              <textarea
                name="question"
                className="rounded-lg px-4 py-3 w-full text-xl lg:text-2xl text-gray-800 bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                onChange={formik.handleChange}
                value={formik.values.question}
                placeholder="Please write your queries here..."
              ></textarea>
              {formik.touched.question && formik.errors.question ? (
                <div className="text-red-500">{formik.errors.question}</div>
              ) : null}
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Book service now
              </button>
            </div>
          </form>
        </div>

        <button onClick={onClose} className="absolute top-4 right-4 bg-blue-400 text-white p-2">
          X
        </button>
      </div>
    </div>
  );
};

export default AstrologyBookingModal;
