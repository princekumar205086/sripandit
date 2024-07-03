"use client"
import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import Section from '../../(home)/pujaservice/section'

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

  return (
    <>
    <Section
        bgImageUrl="https://www.smartpuja.com/img/home/smartpuja-astrology.jpeg"
        title="Astrology Services"
        description="Explore the range of astrology services we provide."
      />
    <form onSubmit={formik.handleSubmit} className="max-w-lg mx-auto p-4">
      <label htmlFor="service_title" className="block mb-2  font-medium text-gray-900 text-xl">Service Title</label>
      <input
        id="service_title"
        type="text"
        name="service_title"
        onChange={formik.handleChange}
        value={formik.values.service_title}
        placeholder="Service Title"
        className="input input-bordered w-full text-gray-850 mb-4 h-12 border-2"
      />
      {formik.touched.service_title && formik.errors.service_title ? <div className="text-red-500">{formik.errors.service_title}</div> : null}

      <label htmlFor="service_type" className="block mb-2  font-medium text-gray-900 text-xl">Service Type</label>
      <input
        id="service_type"
        type="text"
        name="service_type"
        onChange={formik.handleChange}
        value={formik.values.service_type}
        placeholder="Service Type"
        className="input input-bordered w-full text-gray-850 mb-4 h-12 border-2"
      />
      {formik.touched.service_type && formik.errors.service_type ? <div className="text-red-500">{formik.errors.service_type}</div> : null}

      <label htmlFor="service_price" className="block mb-2  font-medium text-gray-900 text-xl">Service Price</label>
      <input
        id="service_price"
        type="number"
        name="service_price"
        onChange={formik.handleChange}
        value={formik.values.service_price}
        placeholder="Service Price"
        className="input input-bordered w-full text-gray-850 mb-4 h-12 border-2"
      />
      {formik.touched.service_price && formik.errors.service_price ? <div className="text-red-500">{formik.errors.service_price}</div> : null}

      <label htmlFor="service_desc" className="block mb-2  font-medium text-gray-900 text-xl">Service Description</label>
      <textarea
        id="service_desc"
        name="service_desc"
        onChange={formik.handleChange}
        value={formik.values.service_desc}
        placeholder="Service Description"
        className="textarea textarea-bordered w-full text-gray-850 mb-4 h-24 border-2"
      />
      {formik.touched.service_desc && formik.errors.service_desc ? <div className="text-red-500">{formik.errors.service_desc}</div> : null}

      <label htmlFor="service_image" className="block mb-2  font-medium text-gray-900 text-xl">Service Image</label>
      <input
        id="service_image"
        type="file"
        name="service_image"
        onChange={(event) => {
          if (event.currentTarget.files) {
            formik.setFieldValue('service_image', event.currentTarget.files[0]);
          }
        }}
        className="file:btn file:btn-bordered w-full text-gray-850 mb-4 h-12 border-2"
      />
      {formik.touched.service_image && formik.errors.service_image ? <div className="text-red-500">{formik.errors.service_image}</div> : null}

      <button type="submit" className="btn btn-primary w-full bg-green-800 h-10 text-gray-50">Submit</button>
    </form>
    </>
  );
};

export default AstrologyServiceForm;