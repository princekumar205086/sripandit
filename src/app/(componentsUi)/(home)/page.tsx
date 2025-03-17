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
import VideoCarousel from "./herocarousel/page";

export default function Home() {
  return (
    <div className="w-full overflow-hidden">
      {/* <Hero /> */}
      <VideoCarousel />
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
