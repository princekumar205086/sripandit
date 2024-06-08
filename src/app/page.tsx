import Hero from "./(componentsUi)/(home)/herosection/page";
import ServiceCard from "./(componentsUi)/(home)/servicecard/page";
import FeaturedPujas from "./(componentsUi)/(home)/featurescard/page";
import Servicerange from "./(componentsUi)/(home)/servicerange/page";
import Howitworks from "./(componentsUi)/(home)/howitworks/page";
import Events from "./(componentsUi)/(home)/events/page";
import CustomerReviews from "./(componentsUi)/(home)/customerreview/page";
import UpcomingEvents from "./(componentsUi)/(home)/upcoming/page";
import QualifiedPandit from "./(componentsUi)/(home)/qualifiedpandit/page";

export default function Home() {
  return (
    <div className="container-fluid mx-auto overflow-hidden">
      <Hero />
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