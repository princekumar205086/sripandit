"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./featurecard.css";
import Link from "next/link";
import Image from 'next/image';

const pujas = [
  {
    pujaName: "Marriage Puja",
    imageSource: "/image/marrige.png",
  },
  {
    pujaName: "Maha Shivaratri Puja",
    imageSource: "/image/shivratri.png",
  },
  {
    pujaName: "Griha Pravesh Puja",
    imageSource: "/image/griha.png",
  },
  {
    pujaName: "Satyanarayan Puja",
    imageSource: "/image/satnarayan.png",
  },
  {
    pujaName: "Maha Ganapati Homa",
    imageSource: "/image/ganpati.png",
  },
  {
    pujaName: "Office Puja / Business Puja",
    imageSource: "/image/office.png",
  },
];

const FeaturedPujas = ({}:any) => {
  const settings = {
    accessibility: true,
    dots: true,
    autoplay: true,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <div className="row m-0 p-2 bg-purple-700">
        <h2 className="text-center">Featured Pujas</h2>
        <h6 className="text-center text-2xl text-white">Here are some of the most popular Pujas and Homas booked on our portal</h6>
      </div>
      <Slider {...settings} className="m-0 p-0 row overflow-hidden">
        {pujas.map((puja, index) => (
          <div className="featurespuja-card m-0 p-0" key={index}>
            <Image
              className="featurespuja-card-img-top"
              src={puja.imageSource}
              alt={puja.pujaName}
              width={200}
              height={200}
            />
            <div className="featurespuja-card-body bg-orange-700 m-0 p-0">
              <h5 className="featurespuja-card-title font-bold text-2xl p-1 text-center text-white">
                {puja.pujaName}
              </h5>
            </div>
          </div>
        ))}
      </Slider>
      <div className="row bg-purple-700 p-1">
          <Link href='' className="card-btn text-xl">Explore all our puja services</Link>
      </div>
    </>
  );
};

export default FeaturedPujas;
