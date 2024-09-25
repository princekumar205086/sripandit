"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

const data = [
  {
    imagesrc: "/calander/1.png",
    title: "Republic Day",
    date: { day: "Friday", number: "26", month: "January" },
    content:
      "January 26 2024, Friday. Republic Day is celebrated to mark the day when the Constitution of India came into effect on January 26, 1950. It is a national holiday in India.",
  },
  {
    imagesrc: "/calander/2.png",
    title: "Vasant Panchami",
    date: { day: "Thursday", number: "1", month: "February" },
    content:
      "February 1 2024, Thursday. Vasant Panchami, also known as Saraswati Puja, is dedicated to Goddess Saraswati, the Hindu deity of learning, wisdom, and knowledge. It marks the onset of the spring season.",
  },
  {
    imagesrc: "/calander/3.png",
    title: "Guru Ravidas Jayanti",
    date: { day: "Sunday", number: "4", month: "February" },
    content:
      "February 4 2024, Sunday. Guru Ravidas Jayanti celebrates the birth anniversary of Guru Ravidas, a saint, poet, and social reformer in the Bhakti movement during the 15th century.",
  },
  {
    imagesrc: "/calander/4.png",
    title: "Swami Dayanand Saraswati Jayanti",
    date: { day: "Sunday", number: "11", month: "February" },
    content:
      "February 11 2024, Sunday. Swami Dayanand Saraswati Jayanti marks the birth anniversary of Swami Dayanand Saraswati, an important Hindu religious scholar, reformer, and founder of the Arya Samaj.",
  },
  {
    imagesrc: "/calander/5.png",
    title: "Maha Shivaratri",
    date: { day: "Tuesday", number: "13", month: "February" },
    content:
      "February 13 2024, Tuesday. Maha Shivaratri is a Hindu festival dedicated to Lord Shiva, celebrated annually in honor of the god's marriage to Goddess Parvati. It is a day of fasting, prayer, and devotion.",
  },
  {
    imagesrc: "/calander/6.png",
    title: "Holika Dahan",
    date: { day: "Wednesday", number: "14", month: "February" },
    content:
      "February 14 2024, Wednesday. Holika Dahan, also known as Choti Holi, commemorates the victory of good over evil and the burning of demoness Holika.",
  },
  {
    imagesrc: "/calander/7.png",
    title: "Holi",
    date: { day: "Thursday", number: "15", month: "February" },
    content:
      "February 15 2024, Thursday. Holi, also known as the Festival of Colors, celebrates the arrival of spring and the victory of good over evil.",
  },
  {
    imagesrc: "/calander/8.png",
    title: "Maha Navami",
    date: { day: "Thursday", number: "29", month: "February" },
    content:
      "February 29 2024, Thursday. Maha Navami, or Navami Puja, is celebrated on the ninth day of Navratri, dedicated to worshipping Goddess Durga.",
  },
];

export default function Events() {
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
      <Slider
        {...settings}
        className="flex flex-wrap justify-center overflow-hidden bg-cream py-10"
      >
        {data.map((item, index) => (
          <div key={index} className="p-4 md:p-2 sm:p-1">
            <div className="max-w-sm h-full rounded overflow-hidden shadow-lg bg-orange-600 text-white transition-transform transform hover:scale-105">
              <Image
                className="w-full h-52 object-cover"
                src={item.imagesrc}
                alt={item.title}
                width={400}
                height={200}
              />
              <div className="px-6 py-4 md:px-4 md:py-2 sm:px-2 sm:py-1">
                <div className="font-bold text-lg mb-2 md:text-base sm:text-sm">
                  {item.title}
                </div>
                <p className="text-xs md:text-xs sm:text-2xs">{item.content}</p>
                <div className="mt-4">
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 md:px-2 md:py-1 sm:px-1 sm:py-0.5">
                    {item.date.month} {item.date.number}
                  </span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 md:px-2 md:py-1 sm:px-1 sm:py-0.5">
                    {item.date.day}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
}
