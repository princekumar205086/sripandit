"use client";
import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import CryptoJS from "crypto-js";
import { getAstrologySingleService } from "../action";
import { useSearchParams, useRouter } from "next/navigation";
import Section from "@/app/(componentsUi)/(home)/pujaservice/section";
import AstrologyBookingModal from "../astrologyBookingModal";
import { motion } from "framer-motion";
import {
  FaRegClock,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaStar,
} from "react-icons/fa";

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
    service_type: string;
    service_price: string;
    service_desc: string;
  }

  const [astroService, setAstroService] = useState<AstrologyService | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      router.replace("/not-found");
    } else {
      setLoading(true);
      getAstrologySingleService(id)
        .then((data) => {
          setAstroService(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    }
  }, [id, router]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Loading skeleton
  const LoadingSkeleton = () => (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-10 gap-8">
        <div className="col-span-10 md:col-span-6">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="h-32 bg-gray-200 rounded mb-6"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
        <div className="col-span-10 md:col-span-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md animate-pulse">
            <div className="h-64 bg-gray-200 rounded mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <Section
        bgImageUrl="/image/astrology.png"
        title="Astrology Services"
        description="See all the Astrology services that we offer"
      />

      {loading ? (
        <LoadingSkeleton />
      ) : (
        <div className="bg-gradient-to-b from-cream to-cream/80 py-8 sm:py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center text-sm font-medium text-gray-600 mb-6"
            >
              <a
                href="/astrology"
                className="hover:text-orange-600 transition-colors"
              >
                Astrology
              </a>
              <span className="mx-2">›</span>
              <span className="text-orange-600">
                {astroService?.service_title}
              </span>
            </motion.nav>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Main content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="col-span-1 md:col-span-7 lg:col-span-8"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                  {/* Image for mobile only */}
                  <div className="md:hidden relative w-full h-[280px] overflow-hidden">
                    <Image
                      src={astroService?.service_image || ""}
                      alt={astroService?.service_title || ""}
                      fill
                      className="object-cover"
                      sizes="100vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 w-full p-4">
                      <div className="bg-orange-600 text-white text-xs font-bold py-1 px-2 rounded inline-block mb-2">
                        {astroService?.service_type}
                      </div>
                    </div>
                  </div>

                  <div className="p-5 sm:p-8">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                      {astroService?.service_title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-4 mb-6">
                      {/* Service type badge */}
                      <div className="flex items-center bg-orange-50 text-orange-700 px-3 py-1 rounded-full">
                        <FaRegClock className="mr-2 text-orange-600" />
                        <span className="text-sm font-medium">
                          Delivered via {astroService?.service_type}
                        </span>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">
                          5.0 (120+ reviews)
                        </span>
                      </div>
                    </div>

                    {/* Price and booking section */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-orange-50 rounded-xl mb-8">
                      <div className="flex items-center mb-4 sm:mb-0">
                        <FaRupeeSign className="text-xl text-orange-600" />
                        <span className="text-2xl font-bold text-gray-800 ml-1">
                          {astroService?.service_price}
                        </span>
                        <span className="text-sm text-gray-500 ml-2">
                          / consultation
                        </span>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleOpenModal}
                        className="bg-gradient-to-r from-orange-500 to-red-600 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-orange-300/30 transition-all flex items-center justify-center"
                      >
                        Book Consultation
                      </motion.button>
                    </div>

                    {/* Description */}
                    <div className="prose prose-sm sm:prose max-w-none">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        About This Service
                      </h3>
                      <div
                        className="text-gray-700 leading-relaxed"
                        dangerouslySetInnerHTML={{
                          __html: astroService?.service_desc || "",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Sidebar - image and additional info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="col-span-1 md:col-span-5 lg:col-span-4"
              >
                {/* Image for tablet and desktop */}
                <div className="hidden md:block bg-white rounded-2xl overflow-hidden shadow-lg mb-6">
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={astroService?.service_image || ""}
                      alt={astroService?.service_title || ""}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority
                    />
                  </div>
                </div>

                {/* Service highlights */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Service Highlights
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center mt-1">
                        <span className="text-orange-600 text-xs">✓</span>
                      </div>
                      <span className="ml-3 text-gray-700">
                        Professional consultation with expert astrologers
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center mt-1">
                        <span className="text-orange-600 text-xs">✓</span>
                      </div>
                      <span className="ml-3 text-gray-700">
                        Personalized guidance based on birth details
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center mt-1">
                        <span className="text-orange-600 text-xs">✓</span>
                      </div>
                      <span className="ml-3 text-gray-700">
                        Detailed analysis of planetary positions
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center mt-1">
                        <span className="text-orange-600 text-xs">✓</span>
                      </div>
                      <span className="ml-3 text-gray-700">
                        Practical remedies and solutions
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Related services - visible on mobile only */}
                <div className="mt-6 block md:hidden">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Related Services
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[1, 2].map((item) => (
                      <a
                        key={item}
                        href="#"
                        className="block rounded-lg overflow-hidden shadow-md bg-white hover:shadow-lg transition-shadow"
                      >
                        <div className="relative h-32">
                          <div className="absolute inset-0 bg-gradient-to-tr from-orange-400 to-red-500 opacity-80"></div>
                          <div className="absolute inset-0 flex items-center justify-center p-3">
                            <span className="text-white text-center font-medium">
                              Related Astrology Service {item}
                            </span>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      )}

      <AstrologyBookingModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </Suspense>
  );
};

export default SingleAstroService;
