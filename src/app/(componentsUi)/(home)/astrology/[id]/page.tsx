"use client";
import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import CryptoJS from "crypto-js";
import { getAstrologySingleService } from "../action";
import { useSearchParams, useRouter } from "next/navigation";
import Section from "@/app/(componentsUi)/(home)/pujaservice/section";
import AstrologyBookingModal from "../astrologyBookingModal";

const SingleAstroService = ({ params }: any) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const encryptedId = searchParams.get("id");

  const decryptId = (encryptedId: string | null) => {
    if (encryptedId) {
      try {
        const bytes = CryptoJS.AES.decrypt(
          decodeURIComponent(encryptedId),
          "your-secret-key"
        );
        return bytes.toString(CryptoJS.enc.Utf8);
      } catch (error) {
        return null;
      }
    }
    return null;
  };

  const id = decryptId(encryptedId);

  interface AstrologyService {
    id: number;
    service_title: string;
    service_image: string;
    service_type: String;
    service_price: String;
    service_desc: String;
  }
  
  const [astroService, setAstroService] = useState<AstrologyService | null>(null);
  
  useEffect(() => {
    if (!id) {
      router.replace("/not-found");
    } else {
      getAstrologySingleService(id)
        .then((data) => {
          setAstroService(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [id]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Section
        bgImageUrl="/image/astrology.png"
        title="Astrology Services"
        description="See all the Astrology services that we offer"
      />
      <div className="bg-single-service">
        <div className="min-h-screen pt-8">
          <div className="container mx-auto p-0 m-0">
            <div className="grid grid-cols-1 md:grid-cols-10 gap-8">
              <div className="col-span-10 md:col-span-6">
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <p className="text-center md:text-left text-lg"> {/* Changed to lg */}
                    ASTROLOGY SERVICES / {astroService?.service_title}
                  </p>
                  <div className="card mt-8">
                    <div className="card-header p-4">
                      <h2 className="text-3xl font-bold text-black text-left"> {/* Changed to 3xl */}
                        {astroService?.service_title}
                      </h2>
                    </div>
                    <div className="col-span-10 md:col-span-6">
                      <div className="bg-white p-4 rounded-lg shadow-md">
                        <div className="service-type-button flex p-2">
                          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
                            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold"> {/* Changed to lg and adjusted sizes */}
                              Service delivered on {astroService?.service_type}
                            </h2>
                          </button>
                        </div>
                        <div className="service-price p-2">
                          <h2 className="text-xl font-semibold text-black text-left"> {/* Changed to xl */}
                            Price: &#8377; {astroService?.service_price}
                          </h2>
                        </div>
                        <div className="service-book-button">
                          <button onClick={openModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
                            Book Now
                          </button>
                          <AstrologyBookingModal isOpen={isModalOpen} onClose={closeModal} />
                        </div>
                        <div className="text-lg" 
                          dangerouslySetInnerHTML={{
                            __html: astroService?.service_desc || "",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Image */}
              <div className="col-span-10 md:col-span-4">
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <Image
                    src={astroService?.service_image || ""}
                    alt="Product"
                    className="w-full h-auto"
                    width="500"
                    height="500"
                  />
                  <h2 className="text-lg font-semibold mt-4 text-center text-black"> {/* Changed to lg */}
                    {astroService?.service_title}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default SingleAstroService;
