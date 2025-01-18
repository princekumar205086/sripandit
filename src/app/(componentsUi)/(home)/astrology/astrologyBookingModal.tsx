import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const AstrologyBookingModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

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

  const formik = useFormik({
    initialValues: {
      language_consultation: "",
      preferred_date: "",
      preferred_time: "",
      place_birth: "",
      dob: "",
      time_birth: "",
      gender: "male",
      question: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      onClose();
    },
  });

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-lg shadow-lg w-full md:w-4/5 lg:w-3/5 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b p-4">
          <div className="header text-2xl font-semibold text-black">
            <h2>
              Astrology - In-depth Horoscope Report (<i>in-person</i>)
            </h2>
            <p className="text-sm text-gray-600">
              Please enter your details for the booking
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-2xl"
          >
            &times;
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6">
          <form className="space-y-4" onSubmit={formik.handleSubmit}>
            {/* Language for consultation */}
            <div>
              <label className="text-lg" htmlFor="language_consultation">
                Select language for consultation*
              </label>
              <select
                name="language_consultation"
                id="language_consultation"
                className="rounded-lg px-4 py-3 w-full text-lg lg:text-xl text-gray-800 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                onChange={formik.handleChange}
                value={formik.values.language_consultation}
              >
                <option value="">Select Language</option>
                <option value="english">English</option>
                <option value="hindi">Hindi</option>
                <option value="kannada">Kannada</option>
                <option value="telugu">Telugu</option>
              </select>
              {formik.touched.language_consultation &&
                formik.errors.language_consultation && (
                  <div className="text-red-500">
                    {formik.errors.language_consultation}
                  </div>
                )}
            </div>

            {/* Form fields in three columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Preferred Date */}
              <div>
                <label className="text-lg" htmlFor="preferred_date">
                  Preferred date*
                </label>
                <input
                  type="date"
                  name="preferred_date"
                  id="preferred_date"
                  className="rounded-lg px-4 py-2 w-full text-lg  lg:text-xl text-gray-800 bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                  onChange={formik.handleChange}
                  value={formik.values.preferred_date}
                  
                />
                {formik.touched.preferred_date &&
                  formik.errors.preferred_date && (
                    <div className="text-red-500">
                      {formik.errors.preferred_date}
                    </div>
                  )}
              </div>

              {/* Preferred Time */}
              <div>
                <label className="text-lg" htmlFor="preferred_time">
                  Preferred time*
                </label>
                <input
                  type="time"
                  name="preferred_time"
                  id="preferred_time"
                  className="rounded-lg px-4 py-2 w-full text-lg lg:text-xl text-gray-800 bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                  onChange={formik.handleChange}
                  value={formik.values.preferred_time}
                />
                {formik.touched.preferred_time &&
                  formik.errors.preferred_time && (
                    <div className="text-red-500">
                      {formik.errors.preferred_time}
                    </div>
                  )}
              </div>

              {/* Place of Birth */}
              <div>
                <label className="text-lg" htmlFor="place_birth">
                  Place of Birth*
                </label>
                <input
                  type="text"
                  name="place_birth"
                  id="place_birth"
                  className="rounded-lg px-4 py-2 w-full text-lg lg:text-xl text-gray-800 bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                  onChange={formik.handleChange}
                  value={formik.values.place_birth}
                />
                {formik.touched.place_birth && formik.errors.place_birth && (
                  <div className="text-red-500">{formik.errors.place_birth}</div>
                )}
              </div>

              {/* Date of Birth */}
              <div>
                <label className="text-lg" htmlFor="dob">
                  Date of Birth*
                </label>
                <input
                  type="date"
                  name="dob"
                  id="dob"
                  className="rounded-lg px-4 py-2 w-full text-lg lg:text-xl text-gray-800 bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                  onChange={formik.handleChange}
                  value={formik.values.dob}
                />
                {formik.touched.dob && formik.errors.dob && (
                  <div className="text-red-500">{formik.errors.dob}</div>
                )}
              </div>

              {/* Time of Birth */}
              <div>
                <label className="text-lg" htmlFor="time_birth">
                  Time of Birth*
                </label>
                <input
                  type="time"
                  name="time_birth"
                  id="time_birth"
                  className="rounded-lg px-4 py-2 w-full text-md lg:text-xl text-gray-800 bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                  onChange={formik.handleChange}
                  value={formik.values.time_birth}
                />
                {formik.touched.time_birth && formik.errors.time_birth && (
                  <div className="text-red-500">{formik.errors.time_birth}</div>
                )}
              </div>
               {/* Gender */}
            <div>
              <label className="block font-medium">Select Gender*</label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    onChange={formik.handleChange}
                    checked={formik.values.gender === "male"}
                    className="mr-2"
                  />
                  Male
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    onChange={formik.handleChange}
                    checked={formik.values.gender === "female"}
                    className="mr-2"
                  />
                  Female
                </label>
              </div>
              {formik.errors.gender && (
                <p className="text-red-500 text-sm">{formik.errors.gender}</p>
              )}
            </div>
            </div>

           

            {/* Questions */}
            <div>
              <label className="block font-medium">
                Have any questions? (optional)
              </label>
              <textarea
                rows={4}
                className="w-full border rounded-lg p-2"
                placeholder="Enter your questions here..."
                name="question"
                onChange={formik.handleChange}
                value={formik.values.question}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-red-500 text-white rounded-lg px-4 py-2 text-xl w-full hover:bg-red-600 transition-colors duration-300"
            >
              Book Consultation
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AstrologyBookingModal;
