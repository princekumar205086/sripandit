"use client";
import React, { useEffect, useState } from "react";
import Section from "../pujaservice/section";
import { getPujaService } from "./action";
import Link from "next/link";
import slugify from "slugify";
import CryptoJS from "crypto-js";

export default function Page() {
  interface Data {
    id: number;
    title: string;
    img: string;
    category: {
      id: number;
      name: string;
    };
  }

  const [data, setData] = useState<Data[]>([]);

  const fetchData = async () => {
    try {
      const response = await getPujaService();
      if (response && response.length > 0) {
        const data = response.map((service: Data) => ({
          id: service.id,
          title: service.title,
          img: service.img,
          category: {
            id: service.category.id,
            name: service.category.name,
          },
        }));
        setData(data);
      } else {
        console.error("No data received from getPujaService");
      }
    } catch (error: any) {
      console.error(`There was a problem with the axios operation: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const encryptId = (id: number) => {
    return CryptoJS.AES.encrypt(id.toString(), 'your-secret-key').toString();
  };

  return (
    <>
      <Section
        bgImageUrl="https://www.smartpuja.com/img/home/smartpuja-astrology.jpeg"
        title="Puja Services"
        description="See all the Puja services that we offer"
      />
      <table className="table table-bordered mx-auto table-responsive text-2xl">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((service: Data) => (
            <tr key={service.id}>
              <td>{service.id}</td>
              <td>{service.title}</td>
              <td>{service.category.name} </td>
              <td>
                <Link href={`/practice/${slugify(service.title)}?id=${encodeURIComponent(encryptId(service.id))}`}><button className="btn btn-primary mx-2">View</button></Link>
                <Link href=""><button className="btn btn-danger mx-2">Delete</button></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
