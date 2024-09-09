"use client"
import dynamic from 'next/dynamic';
import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import Section from '../pujaservice/section';
// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css'; // Import quill styles

const validationSchema = yup.object({
  service_title: yup.string().required('Service title is required'),
  service_type: yup.string().required('Service type is required'),
  service_price: yup.number().required('Service price is required').positive('Price must be positive'),
  service_desc: yup.string().required('Description is required'),
  service_image: yup.mixed().required('A file is required'),
});

const AstrologyServiceForm = () => {
  const formik = useFormik({
    initialValues: {
      service_title: '',
      service_type: '',
      service_price: '',
      service_desc: '',
      service_image: null,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append('service_title', values.service_title);
      formData.append('service_type', values.service_type);
      formData.append('service_price', values.service_price.toString());
      formData.append('service_desc', values.service_desc);
      if (values.service_image) {
        formData.append('service_image', values.service_image);
      }

      try {
        const response = await axios.post('/api/astrology', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success('Service created successfully');
        resetForm();
      } catch (error) {
        toast.error('An error occurred while creating the service');
      }
    },
  });

  // Custom handler to integrate with Formik
  const handleServiceDescChange = (value:any) => {
    formik.setFieldValue('service_desc', value);
  };

  return (
    <>
      <Section
        bgImageUrl="https://www.smartpuja.com/img/home/smartpuja-astrology.jpeg"
        title="Astrology Services"
        description="Explore the range of astrology services we provide."
      />
      <form onSubmit={formik.handleSubmit} className="max-w-4xl mx-auto p-4 space-y-4">
        <label htmlFor="service_title" className="block text-xl font-medium text-gray-900">Service Title</label>
        <input
          id="service_title"
          type="text"
          name="service_title"
          onChange={formik.handleChange}
          value={formik.values.service_title}
          placeholder="Service Title"
          className="input input-bordered w-full h-12 border-2 text-gray-850"
        />
        {formik.touched.service_title && formik.errors.service_title ? <div className="text-red-500">{formik.errors.service_title}</div> : null}

        <label htmlFor="service_type" className="block text-xl font-medium text-gray-900">Service Type</label>
        <input
          id="service_type"
          type="text"
          name="service_type"
          onChange={formik.handleChange}
          value={formik.values.service_type}
          placeholder="Service Type"
          className="input input-bordered w-full h-12 border-2 text-gray-850"
        />
        {formik.touched.service_type && formik.errors.service_type ? <div className="text-red-500">{formik.errors.service_type}</div> : null}

        <label htmlFor="service_price" className="block text-xl font-medium text-gray-900">Service Price</label>
        <input
          id="service_price"
          type="number"
          name="service_price"
          onChange={formik.handleChange}
          value={formik.values.service_price}
          placeholder="Service Price"
          className="input input-bordered w-full h-12 border-2 text-gray-850"
        />
        {formik.touched.service_price && formik.errors.service_price ? <div className="text-red-500">{formik.errors.service_price}</div> : null}

        <label htmlFor="service_desc" className="block text-xl font-medium text-gray-900">Service Description</label>
        <ReactQuill
          theme="snow"
          value={formik.values.service_desc}
          onChange={handleServiceDescChange}
          placeholder="Service Description"
          className="h-60 text-gray-850"
        />
        {formik.touched.service_desc && formik.errors.service_desc ? <div className="text-red-500">{formik.errors.service_desc}</div> : null}
        <br/>
        <br/>
        <br/>
        <label htmlFor="service_image" className="block text-xl font-medium text-gray-900">Service Image</label>
        <input
          id="service_image"
          type="file"
          name="service_image"
          onChange={(event) => {
            if (event.currentTarget.files) {
              formik.setFieldValue('service_image', event.currentTarget.files[0]);
            }
          }}
          className="file:btn file:btn-bordered w-full h-12 border-2 text-gray-850"
        />
        {formik.touched.service_image && formik.errors.service_image ? <div className="text-red-500">{formik.errors.service_image}</div> : null}

        <button type="submit" className="btn btn-primary w-full bg-green-800 h-12 text-white">Submit</button>
      </form>
    </>
  );
};

export default AstrologyServiceForm;