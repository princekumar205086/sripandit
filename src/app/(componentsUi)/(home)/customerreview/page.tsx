"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { url } from "inspector";

const reviews = [
  {
    id: 1,
    name: "John Doe",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    rating: 5,
  },
  {
    id: 2,
    name: "Jane Smith",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    review:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    rating: 4,
  },
  {
    id: 3,
    name: "Alice Johnson",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    review:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    rating: 3,
  },
  {
    id: 4,
    name: "Bob Williams",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    review:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    rating: 5,
  },
  {
    id: 5,
    name: "Emily Brown",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    review:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
    rating: 4,
  },
  {
    id: 6,
    name: "Michael Wilson",
    image: "https://randomuser.me/api/portraits/men/6.jpg",
    review:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
    rating: 5,
  },
  {
    id: 7,
    name: "Sophia Lee",
    image: "https://randomuser.me/api/portraits/women/7.jpg",
    review:
      "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
    rating: 3,
  },
  {
    id: 8,
    name: "David Miller",
    image: "https://randomuser.me/api/portraits/men/8.jpg",
    review:
      "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
    rating: 4,
  },
  {
    id: 9,
    name: "Olivia Taylor",
    image: "https://randomuser.me/api/portraits/women/9.jpg",
    review:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores.",
    rating: 5,
  },
  {
    id: 10,
    name: "William Martinez",
    image: "https://randomuser.me/api/portraits/men/10.jpg",
    review:
      "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit.",
    rating: 4,
  },
  {
    id: 11,
    name: "Ava Anderson",
    image: "https://randomuser.me/api/portraits/women/11.jpg",
    review:
      "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.",
    rating: 5,
  },
  {
    id: 12,
    name: "Daniel Hernandez",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
    review:
      "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
    rating: 3,
  },
  {
    id: 13,
    name: "Isabella Gonzalez",
    image: "https://randomuser.me/api/portraits/women/13.jpg",
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    rating: 4,
  },
  {
    id: 14,
    name: "Joseph Perez",
    image: "https://randomuser.me/api/portraits/men/14.jpg",
    review:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    rating: 5,
  },
  {
    id: 15,
    name: "Samantha Sanchez",
    image: "https://randomuser.me/api/portraits/women/15.jpg",
    review:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    rating: 4,
  },
];

export default function CustomerReviews() {
  const settings = {
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      { breakpoint: 480, settings: { slidesToShow: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 1368, settings: { slidesToShow: 3 } },
    ],
  };

  return (
    <>
      <div className="p-4 bg-orange-600">
        <h2 className="text-3xl font-bold text-white text-center">
          Customer Reviews
        </h2>
      </div>
      <div
        className="bg-purple-600 p-8 h-auto"
        style={{
          backgroundImage: "url(/image/reviews.jpeg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Slider {...settings} className="px-8 grid grid-cols-12 gap-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="col-span-12 md:col-span-4 flex h-auto justify-center"
              >
                <div className="max-w-lg w-full mx-auto">
                  <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 text-center">
                    <Image
                      src={review.image}
                      alt={review.name}
                      className="w-20 h-20 rounded-full mx-auto"
                      height={80}
                      width={80}
                    />
                    <h3 className="text-xl font-semibold text-gray-900 mt-3">
                      {review.name}
                    </h3>
                    <div className="flex justify-center items-center mt-2">
                      {[...Array(review.rating)].map((_, index) => (
                        <svg
                          key={index}
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-yellow-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 0l2.39 7.34H20l-6.15 4.47 2.39 7.34L10 14.69l-5.25 4.46 2.39-7.34L0 7.34h7.61L10 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-700 text-md leading-relaxed mt-2">
                      {review.review}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}