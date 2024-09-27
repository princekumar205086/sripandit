"use client";
import React, { useState } from "react";
import Section from "../pujaservice/section";
import ContactSection from "./ContactSection";
import ContactForm from "./contactForm";
import LocationMap from "./contactLocation";

const ContactUs = () => {
  return (
    <>
      <Section
        bgImageUrl="image/cont2.jpeg"
        title="Contact us"
        description="We are here to help you. Please fill out the form below and we will get back to you as soon as possible."
      />
      <ContactSection />
      <ContactForm />
      <LocationMap />
    </>
  );
};

export default ContactUs;
