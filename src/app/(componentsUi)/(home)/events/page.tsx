"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { toast } from "react-toastify";

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

  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const Slide = Slider as any;
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events");
        if (!response.ok) {
          throw new Error("Failed to fetch events data");
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        setError("An error occurred while fetching events.");
        toast.error("An error occurred while fetching events.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div>Loading events...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Slide
        {...settings}
        className="flex flex-wrap justify-center overflow-hidden bg-cream py-10"
      >
        {events.map((item, index) => (
          <div key={index} className="p-4 md:p-2 sm:p-1">
            <div className="max-w-sm h-full rounded overflow-hidden shadow-lg bg-orange-600 text-white transition-transform transform hover:scale-105">
              {/* <Image
                className="w-full h-52 object-cover"
                src={item?.imagesrc || "/uploads/car vehicle puja.jpeg"}
                alt={item?.title}
                width={400}
                height={200}
              /> */}
              <div className="px-6 py-4 md:px-4 md:py-2 sm:px-2 sm:py-1">
                <div className="font-bold text-lg mb-2 md:text-base sm:text-sm">
                  {item.title}
                </div>
                <p className="text-xs md:text-xs sm:text-2xs">{item.content}</p>
                <div className="mt-4">
                  {item.date &&
                  item.date.month &&
                  item.date.number &&
                  item.date.day ? (
                    <>
                      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 md:px-2 md:py-1 sm:px-1 sm:py-0.5">
                        {item.date.month} {item.date.number}
                      </span>
                      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 md:px-2 md:py-1 sm:px-1 sm:py-0.5">
                        {item.date.day}
                      </span>
                    </>
                  ) : (
                    <p className="text-xs text-red-500">
                      Date information missing
                    </p> // Fallback message if date is undefined
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slide>
    </>
  );
}
