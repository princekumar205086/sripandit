import React from 'react';

interface SectionProps {
  bgImageUrl: string;
  title: string;
  description: string;
}

export default function Section({ bgImageUrl, title, description }: SectionProps) {
  return (
    <section 
      className="relative bg-fixed bg-cover bg-center h-[300px] md:h-[400px] lg:h-[500px] flex justify-center items-center" 
      style={{ backgroundImage: `url('${bgImageUrl}')` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40" /> {/* Overlay for better text readability */}
      <div className="container mx-auto relative z-10 flex flex-col justify-center items-center text-center p-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          {title}
        </h2>
        <hr className="w-16 border-t-2 border-orange-500 my-4 mx-auto" />
        <p className="text-lg md:text-xl lg:text-2xl text-white max-w-3xl">
          {description}
        </p>
      </div>
    </section>
  );
}
