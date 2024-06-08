// want nested route to be: /pujaservice/:id/page
"use client";
import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import CryptoJS from "crypto-js";
import { getPujaSingleService } from "../action";
import { useSearchParams, useRouter } from "next/navigation";
import Section from "../section";

const SingleService = ({ params }: any) => {
  // service data
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
        description="See all the Puja services that we offer"
      />
      <div className="bg-single-service">
        <div className="min-h-screen pt-8">
          <div className="container mx-auto p-0 m-0">
            <div className="grid grid-cols-1 md:grid-cols-10 gap-8">
              {/* Product Details */}
              <div className="col-span-10 md:col-span-6">
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <p className="text-center md:text-left text-xl">
                    PUJA SERVICES / PUJAS AND CEREMONIES
                  </p>
                  <div className="card mt-8">
                    <div className="card-header">
                      <h2 className="text-4xl font-bold">{pujaService?.title}</h2>
                    </div>
                    <div className="card-body pt-10">
                      <p className="text-xl font-semibold">{pujaService?.desc}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 pt-10">
                    <div className="form-group">
                      <label
                        htmlFor=""
                        className="block text-3xl text-black font-semibold pb-5"
                      >
                        Select options to book the service
                      </label>
                      <select
                        name="language"
                        id=""
                        className="form-select p-2 text-2xl form-input mt-1 block w-full rounded-md shadow-sm border border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      >
                        <option>Select language</option>
                        <option value="Hindi">Hindi</option>
                        <option value="Tamil">Tamil</option>
                        <option value="Telugu">Telugu</option>
                        <option value="kannada">kannada</option>
                        <option value="Marathi">Marathi</option>
                      </select>
                    </div>
                    <div className="form-group relative">
                      <input
                        type="text"
                        className="form-input p-2 mt-1 block w-full h-12 text-2xl rounded-md shadow-sm border border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 pl-4 pr-10"
                        value="Select a package"
                        readOnly
                      />
                      <button className="bg-white text-indigo-500 border border-indigo-500 mt-1 absolute inset-y-0 right-0 px-4 py-2 rounded-md hover:bg-indigo-500 hover:text-white focus:outline-none focus:border-indigo-700 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-80">
                        Select
                      </button>
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="date"
                        className="block text-2xl text-gray-700"
                      >
                        Select date
                      </label>
                      <input
                        id="date"
                        type="date"
                        className="form-input mt-1 block w-full h-12 text-2xl rounded-md shadow-sm border border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor=""
                        className="block text-2xl text-gray-700"
                      >
                        Select time
                      </label>
                      <input
                        type="time"
                        className="form-input mt-1 block w-full h-12 text-2xl rounded-md shadow-sm border border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor=""
                        className="block text-2xl text-gray-700"
                      >
                        Select location
                      </label>
                      <input
                        type="text"
                        className="form-input mt-1 block w-full h-12 text-2xl rounded-md shadow-sm border border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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

              {/* Product Image */}
              <div className="col-span-10 md:col-span-4">
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <Image
                    src={pujaService?.img || ""}
                    alt="Product"
                    className="w-full h-auto"
                    width="500"
                    height="500"
                  />

                  <h2 className="text-xl font-semibold mt-4 text-center">
                    {pujaService?.title}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* tabs */}
        <div className="min-h-screen">
          <div className="container mx-auto py-8">
            <div className="rounded-lg shadow-md">
              {/* Tabs */}
              <div className="flex overflow-x-auto mb-4 text-2xl">
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
                  Faq
                </div>
              </div>

              {/* Tab Content */}
              {selectedTab === "tab1" && (
                <div className="text-xl text-semibold p-4">
                  {pujaService?.desc}
                </div>
              )}
              {selectedTab === "tab2" && (
                <div className="text-xl text-semibold p-4">
                  Tab 2 Content Lorem, ipsum dolor sit amet consectetur
                  adipisicing elit. Quibusdam tempora accusamus placeat,
                  perferendis aut aperiam, voluptatem, doloribus facilis
                  consequuntur quaerat veritatis est. Nisi at, mollitia nobis
                  quos dicta illo fugiat ipsum, nihil officiis commodi modi, hic
                  similique quaerat. Maxime optio iusto animi dolore voluptatem?
                  Totam molestiae veritatis error sed ullam.
                </div>
              )}
              {selectedTab === "tab3" && (
                <div className="text-xl text-semibold p-4">
                  Tab 3 Content Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Minima, dolore nobis officia sunt suscipit,
                  quo, commodi ut ad neque tenetur quos. Voluptates, dolores
                  excepturi ex officia ipsa totam eum consectetur quas soluta
                  atque sint nostrum sunt similique quidem debitis deserunt
                  autem facilis numquam laborum! Nam at veniam, autem totam
                  omnis nulla suscipit quibusdam? Vitae earum laborum placeat
                  consequuntur nisi delectus voluptatem ex incidunt qui eveniet
                  debitis atque impedit vel hic possimus cumque, eum ipsum
                  tenetur voluptatibus magnam temporibus expedita aspernatur.
                  Similique tempora sit reiciendis explicabo! Suscipit
                  repudiandae explicabo eos iusto culpa, voluptates, numquam
                  quibusdam incidunt maxime ut debitis et magni.
                </div>
              )}
              {selectedTab === "tab4" && (
                <div className="text-xl text-semibold p-4">
                  Tab 4 Content Lorem ipsum dolor sit amet, consectetur
                  adipisicing elit. Molestias numquam pariatur eaque, eveniet
                  quae laudantium velit architecto. Quo, tempora? Possimus
                  voluptatem magni blanditiis consequatur similique? Illum,
                  earum animi sed aliquam minus ipsa explicabo, laborum,
                  temporibus rem itaque expedita? Laudantium maxime, dicta fugit
                  sint quo maiores numquam praesentium accusantium repellendus
                  ratione ipsam eveniet rerum aliquam earum tempore unde
                  doloribus fuga voluptatem in nostrum cumque esse quod sunt
                  quasi. Eum tenetur repellendus libero nam nesciunt unde
                  incidunt vel accusantium ipsam deleniti voluptate a, amet
                  mollitia facilis, soluta ullam veniam quae! Maxime inventore
                  laboriosam, labore eos totam velit repellat quod voluptatibus
                  repellendus vero laborum expedita adipisci suscipit delectus
                  officia unde eaque hic magni officiis, cum animi dolorum.
                  Corporis reprehenderit repudiandae officia sed distinctio aut
                  voluptatibus illo. Aliquam, nobis rerum. Voluptatem hic optio
                  doloribus similique pariatur, voluptates alias? Rem vitae
                  debitis veniam eius ex provident modi sit at? Perferendis
                  omnis aperiam, veritatis cupiditate explicabo nulla recusandae
                  facilis autem quo incidunt aliquid, quas assumenda? Sit ab et
                  laudantium incidunt ipsam eligendi maxime fuga nulla vel
                  voluptatem quisquam ducimus sapiente, autem quaerat dolorem
                  obcaecati sint corrupti aperiam, placeat facere beatae.
                  Repellat perferendis praesentium voluptate, molestiae
                  aspernatur distinctio aliquam deleniti fuga qui, iste non
                  earum aliquid sapiente.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default SingleService;
