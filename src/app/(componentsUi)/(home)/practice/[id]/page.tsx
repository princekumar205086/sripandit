"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Section from "../../pujaservice/section";
import Image from "next/image";
import { getPujaSingleService } from "../action";
import CryptoJS from "crypto-js";

export default function Page({ params }: any) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const encryptedId = searchParams.get("id");

  const decryptId = (encryptedId: string | null) => {
    if (encryptedId) {
      try {
        const bytes = CryptoJS.AES.decrypt(decodeURIComponent(encryptedId), "your-secret-key");
        return bytes.toString(CryptoJS.enc.Utf8);
      } catch (error) {
        return null;
      }
    }
    return null;
  };

  const id = decryptId(encryptedId);

  useEffect(() => {
    if (!id) {
      router.replace('/not-found');
    } else {
      getPujaSingleService(id)
        .then((data) => {
          setPujaService(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [id]);

  interface PujaService {
    img: string;
    title: string;
    category: {
      name: string;
    };
    desc: string;
  }

  const [pujaService, setPujaService] = useState<PujaService | null>(null);
  const imgsrc = pujaService?.img;

  return (
    <>
      <Section
        bgImageUrl="https://www.smartpuja.com/img/home/smartpuja-astrology.jpeg"
        title="Puja Services"
        description="See all the Puja services that we offer"
      />
      <h1 className="text-4xl">hello, {id}</h1>
      <div className="card-body">
        {imgsrc ? (
          <Image
            src={imgsrc}
            alt={`${pujaService?.title}`}
            width={300}
            height={300}
          />
        ) : (
          <Image
            src="/default-image.png"
            alt="Default"
            width={300}
            height={300}
          />
        )}
        <h5 className="card-title">{pujaService?.title}</h5>
        <h4 className="card-title">{pujaService?.category.name}</h4>
        <p className="card-text">{pujaService?.desc}</p>
      </div>
    </>
  );
}
