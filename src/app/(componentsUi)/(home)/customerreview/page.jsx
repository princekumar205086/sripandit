"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";


const reviews = [
  {
    id: 1,
    name: "Rahul Sharma",
    image: "https://randomuser.me/api/portraits/men/31.jpg",
    review:
      "The puja I booked was conducted beautifully. The pandit explained all the rituals and the process was seamless. Highly recommend this service!",
    rating: 5,
  },
  {
    id: 2,
    name: "Priya Singh",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
    review:
      "I consulted an astrologer through the platform, and the advice I received was insightful. It was a smooth experience, and the customer support was very helpful.",
    rating: 4,
  },
  {
    id: 3,
    name: "Anjali Patel",
    image: "https://randomuser.me/api/portraits/women/33.jpg",
    review:
      "The booking process was easy, and the puja was done on time. However, I faced some delays in receiving the prasad.",
    rating: 3,
  },
  {
    id: 4,
    name: "Vikram Reddy",
    image: "https://randomuser.me/api/portraits/men/34.jpg",
    review:
      "Fantastic experience! The online astrology consultation was detailed, and the astrologer was very knowledgeable. Would definitely use this service again.",
    rating: 5,
  },
  {
    id: 5,
    name: "Sneha Kapoor",
    image: "https://randomuser.me/api/portraits/women/35.jpg",
    review:
      "I booked a Griha Pravesh puja through the website, and the arrangements were excellent. The pandit was professional and the entire process went smoothly.",
    rating: 4,
  },
  {
    id: 6,
    name: "Rohan Gupta",
    image: "https://randomuser.me/api/portraits/men/36.jpg",
    review:
      "I consulted an astrologer for career guidance. The consultation was thorough, and I found it to be very beneficial. Great service!",
    rating: 5,
  },
  {
    id: 7,
    name: "Neha Iyer",
    image: "https://randomuser.me/api/portraits/women/37.jpg",
    review:
      "The puja service was good, but I think the process could be a bit more streamlined, especially when it comes to booking slots.",
    rating: 3,
  },
  {
    id: 8,
    name: "Raj Mehta",
    image: "https://randomuser.me/api/portraits/men/38.jpg",
    review:
      "I booked a Navagraha Shanti puja, and the process was hassle-free. The pandit was punctual, and the entire experience was fulfilling.",
    rating: 4,
  },
  {
    id: 9,
    name: "Pooja Nair",
    image: "https://randomuser.me/api/portraits/women/39.jpg",
    review:
      "Very professional service. I booked an astrology session, and the astrologer’s predictions were accurate. Highly recommended!",
    rating: 5,
  },
  {
    id: 10,
    name: "Arjun Desai",
    image: "https://randomuser.me/api/portraits/men/40.jpg",
    review:
      "Great experience booking a Vastu consultation through the platform. The pandit gave valuable insights, and the service was top-notch.",
    rating: 4,
  },
  {
    id: 11,
    name: "Meera Chaudhary",
    image: "https://randomuser.me/api/portraits/women/41.jpg",
    review:
      "I had an online astrology consultation and was very impressed with the advice. The platform is user-friendly and easy to navigate.",
    rating: 5,
  },
  {
    id: 12,
    name: "Karan Jain",
    image: "https://randomuser.me/api/portraits/men/42.jpg",
    review:
      "The puja service was good, but I felt the communication could be improved. Overall, I’m satisfied with the service.",
    rating: 3,
  },
  {
    id: 13,
    name: "Aditi Bhatt",
    image: "https://randomuser.me/api/portraits/women/43.jpg",
    review:
      "I booked a marriage consultation with an astrologer, and the session was very insightful. The process was easy, and I’m happy with the service.",
    rating: 4,
  },
  {
    id: 14,
    name: "Aman Verma",
    image: "https://randomuser.me/api/portraits/men/44.jpg",
    review:
      "The online puja was very well organized. The pandit was knowledgeable, and the process was smooth. I’ll definitely use this service again.",
    rating: 5,
  },
  {
    id: 15,
    name: "Ritika Malhotra",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    review:
      "I booked a health-related puja, and everything went well. The platform is easy to use, and the service was professional.",
    rating: 4,
  },
];


export default function CustomerReviews() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
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