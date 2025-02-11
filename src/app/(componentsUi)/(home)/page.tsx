import Hero from "./herosection/page";
import ServiceCard from "./servicecard/page";
import FeaturedPujas from "./featurescard/page";
import Servicerange from "./servicerange/page";
import Howitworks from "./howitworks/page";
import Events from "./events/page";
import CustomerReviews from "./customerreview/page";
import UpcomingEvents from "./upcoming/page";
import QualifiedPandit from "./qualifiedpandit/page";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="w-full overflow-hidden">
      <Hero />
      {/* <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <img
            src="/image/kalash.jpg"
            alt="Background"
            className="w-full object-cover h-full"
          />
          <div className="absolute inset-0 bg-black opacity-70"></div>
        </div>
        <div className="relative container mx-auto px-4 text-center text-white">
          <h2 className="text-4xl md:text-6xl font-serif mb-6 fade-in-up">
            Connect with Divine Energy
          </h2>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="bg-[#FFA500] px-8 py-3 rounded-full hover:bg-[#DAA520] transition-colors text-lg">
              Book a Puja
            </button>
            <button className="border-2 border-white px-8 py-3 rounded-full hover:bg-white hover:text-[#2F1C0C] transition-colors text-lg">
              Consult Astrologer
            </button>
          </div>
        </div>
      </section> */}
      <ServiceCard />
      <FeaturedPujas />
      <Servicerange />
      <Howitworks />
      <UpcomingEvents />
      <Events />
      <CustomerReviews />
      <QualifiedPandit />
    </div>
  );
}
