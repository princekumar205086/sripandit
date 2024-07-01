// BookingModal.tsx
import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { bookPujaService } from "./action";
import { toast } from "react-toastify";
import axios from "axios";

interface BookingModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSubmit: (values: any, actions: any) => void;
  initialLocation: string;
  initialPujaName: string;
}

const validationSchema = Yup.object({
  city: Yup.string().required("City is required"),
  pujaName: Yup.string().required("Puja name is required"),
  language: Yup.string().required("Language is required"),
  date: Yup.date().required("Date is required"),
  time: Yup.string().required("Time is required"),
  location: Yup.string().required("Location is required"),
  contactNumber: Yup.string()
    .matches(
      /^[6-9]\d{9}$/,
      "Contact number must be exactly 10 digits and start with 6-9"
    )
    .required("Contact number is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

// location data
const locations = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Delhi",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

// language data
const languages = [
  "Hindi",
  "English",
  "Tamil",
  "Telugu",
  "Kannada",
  "Malayalam",
];

interface FormValues {
  city: string;
  pujaName: string;
  language: string;
  date: null;
  time: string;
  location: string;
  contactNumber: string;
  email: string;
}

const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onRequestClose,
  onSubmit,
  initialLocation,
  initialPujaName,
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    try {
      await bookPujaService(values);
      toast.success("Puja service booked successfully!");
      onRequestClose();
    } catch (error) {
      toast.error("Failed to book puja service. Please try again.");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const fetchSuggestions = async (pujaName: string) => {
    if (pujaName.length >= 3) {
      try {
        const response = await axios.get("/api/advicepujaname", {
          params: { pujaName },
        });
        setSuggestions(response.data.map((item: any) => item.title));
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    fetchSuggestions(""); // Clear suggestions on modal open
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-1100 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto z-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="relative bg-white rounded-lg p-6 w-full max-w-7xl top-32">
        <button
          className="absolute top-2 right-5 text-gray-500 hover:text-gray-800 text-4xl"
          onClick={onRequestClose}
        >
          &times;
        </button>
        <h2 className="text-3xl font-bold mb-6 text-black">
          Book Puja Service
        </h2>
        <Formik
          initialValues={{
            city: "",
            pujaName: "",
            language: "",
            date: null,
            time: "",
            location: initialLocation,
            contactNumber: "",
            email: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => onSubmit(values, actions)}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="mb-6 lg:mb-8">
                  <label
                    htmlFor="city"
                    className="block text-xl lg:text-2xl font-medium text-black mb-2"
                  >
                    Select City
                  </label>
                  <Field
                    name="city"
                    as="select"
                    className="rounded-lg px-4 py-3 w-full text-xl lg:text-2xl text-gray-800 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="" label="Select city" />
                    {locations.map((state, index) => (
                      <option key={index} value={state}>
                        {state}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="city"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="mb-6 lg:mb-8">
                  <label
                    htmlFor="pujaName"
                    className="block text-xl lg:text-2xl font-medium text-black mb-2"
                  >
                    Enter a Puja or Homa name
                  </label>
                  <Field
                    id="pujaName"
                    name="pujaName"
                    type="text"
                    className="rounded-lg px-4 py-3 w-full text-xl lg:text-2xl text-gray-800 bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Enter a Puja or Homa name"
                    value={initialPujaName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const { value } = e.target;
                      setFieldValue("pujaName", value);
                      fetchSuggestions(value);
                    }}
                  />
                  {suggestions.length > 0 && (
                    <ul className="bg-white border border-gray-300 rounded-lg mt-2 max-h-40 overflow-auto">
                      {suggestions.map((suggestion, index) => (
                        <li
                          key={index}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            setFieldValue("pujaName", suggestion);
                            setSuggestions([]);
                          }}
                        >
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  )}
                  <ErrorMessage
                    name="pujaName"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="mb-6 lg:mb-8">
                  <label
                    htmlFor="language"
                    className="block text-xl lg:text-2xl font-medium text-black mb-2"
                  >
                    Select Language
                  </label>
                  <Field
                    name="language"
                    as="select"
                    className="rounded-lg px-4 py-3 w-full text-xl lg:text-2xl text-gray-800 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="" label="Select language" />
                    {languages.map((lang, index) => (
                      <option key={index} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="language"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="mb-6 lg:mb-8">
                  <label
                    htmlFor="date"
                    className="block text-xl lg:text-2xl font-medium text-black mb-2"
                  >
                    Date
                  </label>
                  <Field
                    id="date"
                    name="date"
                    type="date"
                    className="rounded-lg px-4 py-3 w-full text-xl lg:text-2xl text-gray-800 bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <ErrorMessage
                    name="date"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="mb-6 lg:mb-8">
                  <label
                    htmlFor="time"
                    className="block text-xl lg:text-2xl font-medium text-black mb2"
                  >
                    Time
                  </label>
                  <Field
                    id="time"
                    name="time"
                    type="time"
                    className="rounded-lg px-4 py-3 w-full text-xl lg:text-2xl text-gray-800 bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <ErrorMessage
                    name="time"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="mb-6 lg:mb-8">
                  <label
                    htmlFor="location"
                    className="block text-xl lg:text-2xl font-medium text-black mb-2"
                  >
                    Location
                  </label>
                  <Field
                    id="location"
                    name="location"
                    type="text"
                    className="rounded-lg px-4 py-3 w-full text-xl lg:text-2xl text-gray-800 bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Location"
                    value={initialLocation}
                    readOnly
                  />
                  <ErrorMessage
                    name="location"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="mb-6 lg:mb-8">
                  <label
                    htmlFor="contactNumber"
                    className="block text-xl lg:text-2xl font-medium text-black mb-2"
                  >
                    Contact Number
                  </label>
                  <Field
                    id="contactNumber"
                    name="contactNumber"
                    type="text"
                    className="rounded-lg px-4 py-3 w-full text-xl lg:text-2xl text-gray-800 bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Contact Number"
                  />
                  <ErrorMessage
                    name="contactNumber"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="mb-6 lg:mb-8">
                  <label
                    htmlFor="email"
                    className="block text-xl lg:text-2xl font-medium text-black mb-2"
                  >
                    Email
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    className="rounded-lg px-4 py-3 w-full text-xl lg:text-2xl text-gray-800 bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="block w-full rounded-lg bg-red-500 px-8 py-4 font-semibold text-white text-xl lg:text-2xl hover:bg-red-600 transition duration-300 ease-in-out"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default BookingModal;
