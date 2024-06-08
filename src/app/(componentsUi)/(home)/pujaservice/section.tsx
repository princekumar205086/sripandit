import React from 'react'
import './pujaservice.css';
interface SectionProps {
  bgImageUrl: string;
  title: string;
  description: string;
}

export default function Section({ bgImageUrl, title, description }: SectionProps) {
  return (
    <section className="our-service-listing relative bg-fixed bg-cover bg-center h-200 flex justify-center items-center" style={{backgroundImage: `url('${bgImageUrl}')`}}>
      <div className="container mx-auto">
        <div className="text-center mt-28">
          <p className="title mt-0 text-5xl font-bold text-white">
            {title}
          </p>
          <hr className="w-16 border-t-2 border-white my-4 mx-auto" />
          <p className="text text-xl text-white">
            {description}
          </p>
        </div>
      </div>
    </section>
  )
}