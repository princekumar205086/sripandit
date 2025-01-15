"use client";
import React from "react";
import Section from "../pujaservice/section";
import Image from "next/image";
import Link from "next/link";
import { FaClock, FaUser, FaEye, FaComments, FaThumbsUp } from "react-icons/fa";
import { TiArrowRight } from "react-icons/ti";

export default function Blog() {
  const postData = [
    {
      image: "/image/satnarayan.png", // Corrected path
      title: "Satyanarayan Pooja Guide 2025",
      date: "01 January 2025",
      author: "Saurav",
      views: 125,
      comments: 8,
      description:
        "Satyanarayan Puja is performed to appease Lord Vishnu or Narayana, the preserver of this whole creation.",
    },
    {
      image: "/image/ganpati.png", // Corrected path
      title: "Ganesh Chaturthi Puja Guide 2025",
      date: "10 February 2025",
      author: "Amit",
      views: 150,
      comments: 12,
      description:
        "Celebrate Ganesh Chaturthi with the most auspicious rituals and blessings from Lord Ganesha.",
    },
    {
      image: "/image/shivratri.png", // Corrected path
      title: "Laxmi Puja for Prosperity 2025",
      date: "15 March 2025",
      author: "Priya",
      views: 200,
      comments: 25,
      description:
        "Perform Laxmi Puja for wealth and prosperity during the festival of Diwali.",
    },
    {
      image: "/image/hawan.jpeg", // Corrected path
      title: "Kumari Puja Rituals and Significance",
      date: "25 April 2025",
      author: "Rajesh",
      views: 95,
      comments: 5,
      description:
        "Kumari Puja is a special ritual dedicated to the worship of young girls in Nepal and India.",
    },
    {
      image: "/image/select puja.jpeg", // Corrected path
      title: "Maha Shivaratri Puja Rituals",
      date: "01 March 2025",
      author: "Anita",
      views: 300,
      comments: 45,
      description:
        "Maha Shivaratri is one of the most significant Hindu festivals dedicated to Lord Shiva.",
    },
    {
      image: "/image/book pandit jee.jpeg", // Corrected path
      title: "Complete Guide to Puja Services",
      date: "01 April 2025",
      author: "Vikram",
      views: 180,
      comments: 10,
      description:
        "Learn everything about different types of puja services available for every occasion.",
    },
  ];

  const popularPosts = [
    {
      image: "/image/ganpati.png", // Corrected path
      title: "Popular Ganesh Chaturthi Guide",
    },
    {
      image: "/image/shivratri.png", // Corrected path
      title: "Top Maha Shivaratri Rituals",
    },
    {
      image: "/image/select puja.jpeg", // Corrected path
      title: "Best Laxmi Puja Services",
    },
  ];

  return (
    <>
      <Section
        bgImageUrl="/image/blg.jpeg" // Corrected path
        title="Okpuja Blog"
        description="Read our latest blog posts and stay updated with the latest trends. We cover a wide range of topics including astrology, puja services, and more."
      />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-gray-600 text-center">
          <h1 className="text-3xl text-orange-500">All Kind a Puja</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {postData.map((post, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <div className="relative">
                <Link href="#">
                  <Image
                    className="w-full h-66 object-cover"
                    src={post.image} // Corrected path
                    alt={`Post Title ${index + 1}`}
                    width={500} // Set width for optimization
                    height={400} // Set height for optimization
                  />
                </Link>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-3 text-orange-500">
                  <Link href="#" className="text-orange-500 hover:underline">
                    {post.title}
                  </Link>
                </h2>
                <ul className="flex items-center text-sm text-gray-500 space-x-4 mb-5">
                  <li>
                    <FaClock /> {post.date}
                  </li>
                  <li>
                    <FaUser /> {post.author}
                  </li>
                </ul>
                <ul className="flex items-center text-sm text-gray-500 space-x-4 mb-5">
                  <li>
                    <FaEye /> {post.views}
                  </li>
                  <li>
                    <FaComments /> {post.comments}
                  </li>
                </ul>
                <p className="text-sm text-gray-700 mb-5">{post.description}</p>
                <Link
                  href="#"
                  className="text-orange-500 hover:underline text-sm"
                >
                  Read more <TiArrowRight />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex justify-center">
          <nav className="inline-flex rounded-md shadow-md">
            <Link
              href="#"
              className="px-4 py-2 bg-white border border-gray-300 rounded-l-md text-orange-500 hover:bg-orange-500 hover:text-white transition"
            >
              Previous
            </Link>
            <Link
              href="#"
              className="px-4 py-2 bg-white border border-gray-300 text-orange-500 hover:bg-orange-500 hover:text-white transition"
            >
              1
            </Link>
            <Link
              href="#"
              className="px-4 py-2 bg-white border border-gray-300 text-orange-500 hover:bg-orange-500 hover:text-white transition"
            >
              2
            </Link>
            <Link
              href="#"
              className="px-4 py-2 bg-white border border-gray-300 rounded-r-md text-orange-500 hover:bg-orange-500 hover:text-white transition"
            >
              Next
            </Link>
          </nav>
        </div>

        {/* Most Popular Posts */}
        <div className="mt-12">
        <h4 className="text-2xl font-semibold text-gray-800 mb-8"><FaThumbsUp /> Most Popular Posts</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {popularPosts.map((post, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <Link href="#">
                  <Image
                    className="w-full h-46 object-cover"
                    src={post.image}
                    alt={`Popular Post ${index + 1}`}
                    width={300}
                    height={200}
                  />
                </Link>
                <div className="p-6">
                  <h5 className="text-lg font-medium text-gray-700">
                    <Link href="#" className="text-orange-500 hover:underline">
                      {post.title}
                    </Link>
                  </h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
