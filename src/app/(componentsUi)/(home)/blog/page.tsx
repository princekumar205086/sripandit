"use client";
import React, { useEffect, useState } from "react";
import Section from "../pujaservice/section";
import Image from "next/image";
import Link from "next/link";
import { FaClock, FaUser, FaEye, FaComments } from "react-icons/fa";
import { TiArrowRight } from "react-icons/ti";
import { fetchblogdata } from "./action";

export default function Blog() {
  const [posts, setPosts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getBlogPosts = async () => {
      try {
        const data = await fetchblogdata();
        setPosts(data); 
      } catch (error: any) {
        setError("Failed to load blog posts");
        console.error(error);
      }
    };
    
    getBlogPosts();
  }, []);

  return (
    <>
      <Section
        bgImageUrl="image/blg.jpeg"
        title="Okpuja Blog"
        description="Read our latest blog posts and stay updated with the latest trends. We cover a wide range of topics including astrology, puja services, and more."
      />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-gray-600 text-center">
          <h1 className="text-3xl text-orange-500">All Kind of Puja</h1>
        </div>

        {error && (
          <div className="text-center text-red-500 py-8">
            <p>{error}</p>
          </div>
        )}

        {posts.length === 0 && !error ? (
          <div className="text-center text-gray-500 py-8">
            <p>No blog posts available at the moment. Please check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post: any, index: number) => (
              <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="relative">
                  <Link href={`/blog/${post.post_slug}`}>
                    <Image
                      className="w-full h-56 object-cover"
                      src={post.featured_image}
                      alt={`Post Title ${index + 1}`}
                      width={500}
                      height={400}
                    />
                  </Link>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-3 text-orange-500">
                    <Link href={`/blog/${post.post_slug}`} className="text-orange-500 hover:underline">
                      {post.post_title}
                    </Link>
                  </h2>
                  <ul className="flex items-center text-sm text-gray-500 space-x-4 mb-5">
                    <li>
                      <FaClock /> {new Date(post.createdAt).toLocaleDateString()}
                    </li>
                    <li>
                      <FaUser /> {post.user?.name || "Unknown Author"}
                    </li>
                  </ul>
                  <ul className="flex items-center text-sm text-gray-500 space-x-4 mb-5">
                    <li>
                      <FaEye /> {post.view_count || 0}
                    </li>
                    <li>
                      <FaComments /> {post.blogComments?.length || 0}
                    </li>
                  </ul>
                  <p className="text-sm text-gray-700 mb-5">{post.post_description}</p>
                  <Link href={`/blog/${post.post_slug}`} className="text-orange-500 hover:underline text-sm">
                    Read more <TiArrowRight />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
