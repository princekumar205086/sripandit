import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaBirthdayCake,
  FaUserAlt,
  FaLanguage,
} from "react-icons/fa";

const AstrologyBookingModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const validationSchema = Yup.object({
    language_consultation: Yup.string().required(
      "Language for consultation is required"
    ),
    preferred_date: Yup.date()
      .required("Preferred date is required")
      .min(new Date(), "Date cannot be in the past"),
    preferred_time: Yup.string().required("Preferred time is required"),
    place_birth: Yup.string().required("Place of birth is required"),
    dob: Yup.date()
      .required("Date of birth is required")
      .max(new Date(), "Date of birth cannot be in the future"),
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
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Form values:", values);
        setIsSubmitting(false);
        onClose();
      } catch (error) {
        setIsSubmitting(false);
        console.error("Error submitting form:", error);
      }
    },
  });

  if (!isOpen) return null;

  const inputBaseClass =
    "rounded-lg px-4 py-2 w-full text-base md:text-lg text-gray-800 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200";
  const errorClass = "text-red-500 text-xs md:text-sm mt-1";
  const labelClass =
    "text-sm md:text-base font-medium text-gray-700 mb-1 block";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white rounded-xl shadow-2xl w-full md:w-4/5 lg:w-3/5 max-h-[90vh] overflow-hidden"
          >
            <div className="flex justify-between items-center border-b p-4 bg-gradient-to-r from-orange-50 to-red-50">
              <div className="header">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center">
                  <span className="inline-block p-2 rounded-full bg-orange-100 text-orange-600 mr-2">
                    <FaUserAlt />
                  </span>
                  Astrology Consultation Booking
                </h2>
                <p className="text-xs md:text-sm text-gray-600 mt-1">
                  In-depth Horoscope Reading & Analysis (50 min session)
                </p>
              </div>

              <button
                onClick={onClose}
                className="text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full p-2 transition-colors"
                aria-label="Close modal"
              >
                <IoClose size={24} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-4 md:p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              <form className="space-y-5" onSubmit={formik.handleSubmit}>
                {/* Language for consultation */}
                <div className="relative">
                  <label className={labelClass} htmlFor="language_consultation">
                    <span className="flex items-center">
                      <FaLanguage className="mr-2 text-orange-500" />
                      Select language for consultation*
                    </span>
                  </label>
                  <select
                    name="language_consultation"
                    id="language_consultation"
                    className={`${inputBaseClass} appearance-none`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.language_consultation}
                  >
                    <option value="">Select Language</option>
                    <option value="english">English</option>
                    <option value="hindi">Hindi</option>
                    <option value="kannada">Kannada</option>
                    <option value="telugu">Telugu</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 pt-6">
                    <svg
                      className="fill-current h-4 w-4 text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                  {formik.touched.language_consultation &&
                    formik.errors.language_consultation && (
                      <div className={errorClass}>
                        {formik.errors.language_consultation}
                      </div>
                    )}
                </div>

                {/* Form fields in responsive grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Preferred Date */}
                  <div>
                    <label className={labelClass} htmlFor="preferred_date">
                      <span className="flex items-center">
                        <FaCalendarAlt className="mr-2 text-orange-500" />
                        Preferred date*
                      </span>
                    </label>
                    <input
                      type="date"
                      name="preferred_date"
                      id="preferred_date"
                      className={inputBaseClass}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.preferred_date}
                      min={new Date().toISOString().split("T")[0]}
                    />
                    {formik.touched.preferred_date &&
                      formik.errors.preferred_date && (
                        <div className={errorClass}>
                          {formik.errors.preferred_date}
                        </div>
                      )}
                  </div>

                  {/* Preferred Time */}
                  <div>
                    <label className={labelClass} htmlFor="preferred_time">
                      <span className="flex items-center">
                        <FaClock className="mr-2 text-orange-500" />
                        Preferred time*
                      </span>
                    </label>
                    <input
                      type="time"
                      name="preferred_time"
                      id="preferred_time"
                      className={inputBaseClass}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.preferred_time}
                    />
                    {formik.touched.preferred_time &&
                      formik.errors.preferred_time && (
                        <div className={errorClass}>
                          {formik.errors.preferred_time}
                        </div>
                      )}
                  </div>

                  {/* Place of Birth */}
                  <div>
                    <label className={labelClass} htmlFor="place_birth">
                      <span className="flex items-center">
                        <FaMapMarkerAlt className="mr-2 text-orange-500" />
                        Place of Birth*
                      </span>
                    </label>
                    <input
                      type="text"
                      name="place_birth"
                      id="place_birth"
                      placeholder="City, Country"
                      className={inputBaseClass}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.place_birth}
                    />
                    {formik.touched.place_birth &&
                      formik.errors.place_birth && (
                        <div className={errorClass}>
                          {formik.errors.place_birth}
                        </div>
                      )}
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label className={labelClass} htmlFor="dob">
                      <span className="flex items-center">
                        <FaBirthdayCake className="mr-2 text-orange-500" />
                        Date of Birth*
                      </span>
                    </label>
                    <input
                      type="date"
                      name="dob"
                      id="dob"
                      className={inputBaseClass}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.dob}
                      max={new Date().toISOString().split("T")[0]}
                    />
                    {formik.touched.dob && formik.errors.dob && (
                      <div className={errorClass}>{formik.errors.dob}</div>
                    )}
                  </div>

                  {/* Time of Birth */}
                  <div>
                    <label className={labelClass} htmlFor="time_birth">
                      <span className="flex items-center">
                        <FaClock className="mr-2 text-orange-500" />
                        Time of Birth*
                      </span>
                    </label>
                    <input
                      type="time"
                      name="time_birth"
                      id="time_birth"
                      className={inputBaseClass}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.time_birth}
                    />
                    {formik.touched.time_birth && formik.errors.time_birth && (
                      <div className={errorClass}>
                        {formik.errors.time_birth}
                      </div>
                    )}
                  </div>

                  {/* Gender */}
                  <div>
                    <label className={labelClass}>
                      <span className="flex items-center">
                        <FaUserAlt className="mr-2 text-orange-500" />
                        Select Gender*
                      </span>
                    </label>
                    <div className="flex items-center space-x-4 mt-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="gender"
                          value="male"
                          onChange={formik.handleChange}
                          checked={formik.values.gender === "male"}
                          className="form-radio text-orange-500 h-4 w-4 mr-2"
                        />
                        <span className="text-sm md:text-base text-gray-700">
                          Male
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="gender"
                          value="female"
                          onChange={formik.handleChange}
                          checked={formik.values.gender === "female"}
                          className="form-radio text-orange-500 h-4 w-4 mr-2"
                        />
                        <span className="text-sm md:text-base text-gray-700">
                          Female
                        </span>
                      </label>
                    </div>
                    {formik.errors.gender && formik.touched.gender && (
                      <div className={errorClass}>{formik.errors.gender}</div>
                    )}
                  </div>
                </div>

                {/* Questions */}
                <div>
                  <label className={labelClass} htmlFor="question">
                    Have any questions? (optional)
                  </label>
                  <textarea
                    id="question"
                    rows={3}
                    className={`${inputBaseClass} resize-none`}
                    placeholder="Enter your questions or specific concerns you'd like addressed during the consultation..."
                    name="question"
                    onChange={formik.handleChange}
                    value={formik.values.question}
                  />
                </div>

                {/* Info Text */}
                <div className="text-xs md:text-sm text-gray-600 bg-blue-50 p-3 rounded-lg border border-blue-100">
                  <p>
                    <strong>Note:</strong> Accurate birth details are essential
                    for precise astrological readings. Your consultation will be
                    scheduled within 24-48 hours of booking confirmation.
                  </p>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting || !formik.isValid}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className={`${
                    isSubmitting || !formik.isValid
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-orange-500 to-red-600 hover:shadow-lg hover:shadow-orange-200"
                  } text-white rounded-lg px-6 py-3 text-base md:text-lg w-full font-medium transition-all duration-300 flex items-center justify-center`}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Book Consultation"
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AstrologyBookingModal;
