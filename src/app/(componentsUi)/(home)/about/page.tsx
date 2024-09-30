"use client";
import { useState } from 'react';
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';
import Image from 'next/image';
import Section from '../pujaservice/section';
import MissionVision from './mission';
import './about.css';
import CustomerReviews from '../customerreview/page';
import ContactForm from '../contactus/contactForm';

const AboutPage = () => {
  const [activeProfile, setActiveProfile] = useState<number | null>(null); // Change to null for no active profile

  const profiles = [
    {
      name: "Rohan Shree",
      title: "Founder & CEO",
      image: "/image/rohan.jpg",
      social: {
        linkedin: "https://linkedin.com/in/janesmith",
        twitter: "https://twitter.com/janesmith",
        github: "https://github.com/janesmith",
      }
    },
    {
      name: "Pandit Suraj Bhardwaj",
      title: "Managing Director",
      image: "/image/suraj.jpg",
      social: {
        linkedin: "https://linkedin.com/in/johndoe",
        twitter: "https://twitter.com/johndoe",
        github: "https://github.com/johndoe",
      }
    }
  ];

  return (
    <>
      <Section
        bgImageUrl="image/about.jpeg"
        title="About Us"
        description="We are a team of dedicated professionals who are passionate about providing the best Puja services to our customers."
      />
      <MissionVision />
      <div className="min-h-screen bg-redOrange p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold text-center text-cream mb-12">About Us</h1>

          <div className="flex flex-wrap justify-center gap-12 mb-20">
            {profiles.map((profile, index) => (
              <div
                key={index}
                className={`rounded overflow-hidden shadow-lg transition-transform duration-300 ${activeProfile === index ? 'transform scale-105' : ''}`} // Apply scaling effect to the active profile
                style={{ width: "400px" }} // Set a fixed width for the card
                onMouseEnter={() => setActiveProfile(index)}
                onMouseLeave={() => setActiveProfile(null)} // Reset active profile on mouse leave
                tabIndex={0}
              >
                <Image
                  alt={profile.name}
                  src={profile.image}
                  className="profile-image"
                  width={360}
                  height={360}
                />
                <div className="px-6 py-4 bg-cream">
                  <div className="font-bold text-sm mb-2 text-center text-orangeRed">{profile.name}</div>
                  <p className="text-orange-500 text-xs text-center">{profile.title}</p>
                </div>
                <div className="px-6 py-4 flex justify-center space-x-4">
                  <a
                    href={profile.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:text-blue-900 transition-colors duration-300"
                  >
                    <FaLinkedin size={24} />
                  </a>
                  <a
                    href={profile.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-600 transition-colors duration-300"
                  >
                    <FaTwitter size={24} />
                  </a>
                  <a
                    href={profile.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-gray-900 transition-colors duration-300"
                  >
                    <FaGithub size={24} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20">
            <h2 className="text-3xl font-bold text-center text-cream mb-6">Testimonials</h2>
            <CustomerReviews />
          </div>
          <ContactForm />
        </div>
      </div>
    </>
  );
};

export default AboutPage;
