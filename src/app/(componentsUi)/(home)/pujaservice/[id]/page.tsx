"use client";
import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import CryptoJS from "crypto-js";
import { getPujaSingleService } from "../action";
import { useSearchParams, useRouter } from "next/navigation";
import Section from "../section";

const SingleService = ({ params }: any) => {
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

  interface Service {
    id: number;
    title: string;
    img: string;
    desc: string;
    category: {
      id: number;
      name: string;
    };
  }
  
  const [pujaService, setPujaService] = useState<Service | null>(null);
  
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

  const [selectedTab, setSelectedTab] = useState("tab1");

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Section
        bgImageUrl="https://www.smartpuja.com/img/home/smartpuja-astrology.jpeg"
        title="Puja Services"
        description="Explore our diverse range of Puja services."
      />
      <div className="bg-single-service">
        <div className="min-h-screen pt-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-10 gap-8">
              <div className="col-span-10 md:col-span-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <p className="text-center md:text-left text-lg md:text-xl">
                    PUJA SERVICES / PUJAS AND CEREMONIES
                  </p>
                  <div className="card mt-8">
                    <div className="card-header">
                      <h2 className="text-3xl font-bold">{pujaService?.title}</h2>
                    </div>
                    <div className="card-body pt-4">
                      <p className="text-lg font-semibold">{pujaService?.desc}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 pt-6">
                    <div className="form-group">
                      <label htmlFor="" className="block text-lg text-black font-semibold pb-2">
                        Select options to book the service
                      </label>
                      <select
                        name="language"
                        id=""
                        className="form-select p-2 text-lg form-input mt-1 block w-full rounded-md shadow-sm border border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      >
                        <option>Select language</option>
                        <option value="Hindi">Hindi</option>
                        <option value="Tamil">Tamil</option>
                        <option value="Telugu">Telugu</option>
                        <option value="kannada">Kannada</option>
                        <option value="Marathi">Marathi</option>
                      </select>
                    </div>
                    <div className="form-group relative">
                      <input
                        type="text"
                        className="form-input p-2 mt-1 block w-full h-12 text-lg rounded-md shadow-sm border border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 pl-4 pr-10"
                        value="Select a package"
                        readOnly
                      />
                      <button className="bg-white text-indigo-500 border border-indigo-500 mt-1 absolute inset-y-0 right-0 px-4 py-2 rounded-md hover:bg-indigo-500 hover:text-white focus:outline-none focus:border-indigo-700 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-80">
                        Select
                      </button>
                    </div>
                    <div className="form-group">
                      <label htmlFor="date" className="block text-lg text-gray-700">
                        Select date
                      </label>
                      <input
                        id="date"
                        type="date"
                        className="form-input mt-1 block w-full h-12 text-lg rounded-md shadow-sm border border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="" className="block text-lg text-gray-700">
                        Select time
                      </label>
                      <input
                        type="time"
                        className="form-input mt-1 block w-full h-12 text-lg rounded-md shadow-sm border border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="" className="block text-lg text-gray-700">
                        Select location
                      </label>
                      <input
                        type="text"
                        className="form-input mt-1 block w-full h-12 text-lg rounded-md shadow-sm border border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        placeholder="Enter your location"
                      />
                    </div>
                    <div className="form-group">
                      <button className="bg-white text-red-500 border border-red-500 mt-1 px-4 py-2 rounded-md hover:bg-red-500 hover:text-white focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 focus:ring-opacity-50 w-full">
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-10 md:col-span-4">
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <Image
                    src={pujaService?.img || ""}
                    alt="Product Image"
                    className="w-full h-auto rounded-md"
                    width="500"
                    height="500"
                  />
                  <h2 className="text-lg font-semibold mt-4 text-center">
                    {pujaService?.title}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="min-h-screen">
          <div className="container mx-auto py-8">
            <div className="rounded-lg shadow-md">
              <div className="flex overflow-x-auto mb-4 text-lg">
                <div
                  className={`cursor-pointer p-2 font-bold ${
                    selectedTab === "tab1"
                      ? "text-blue-500 border-b-2 border-blue-500"
                      : "text-gray-500"
                  }`}
                  onClick={() => setSelectedTab("tab1")}
                >
                  Description
                </div>
                <div
                  className={`cursor-pointer p-2 font-bold ${
                    selectedTab === "tab2"
                      ? "text-blue-500 border-b-2 border-blue-500"
                      : "text-gray-500"
                  }`}
                  onClick={() => setSelectedTab("tab2")}
                >
                  Review
                </div>
                <div
                  className={`cursor-pointer p-2 font-bold ${
                    selectedTab === "tab3"
                      ? "text-blue-500 border-b-2 border-blue-500"
                      : "text-gray-500"
                  }`}
                  onClick={() => setSelectedTab("tab3")}
                >
                  Gallery
                </div>
                <div
                  className={`cursor-pointer p-2 font-bold ${
                    selectedTab === "tab4"
                      ? "text-blue-500 border-b-2 border-blue-500"
                      : "text-gray-500"
                  }`}
                  onClick={() => setSelectedTab("tab4")}
                >
                  FAQ
                </div>
              </div>

              {/* Tab Content */}
              <div className="text-lg text-semibold p-4">
                {selectedTab === "tab1" && <div>{pujaService?.desc}</div>}
                {selectedTab === "tab2" && <div>Reviews content will go here.</div>}
                {selectedTab === "tab3" && <div>Gallery images will go here.</div>}
                {selectedTab === "tab4" && <div>FAQ content will go here.</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default SingleService;
