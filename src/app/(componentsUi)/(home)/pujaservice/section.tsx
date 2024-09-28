"use client"
import React, { useRef, useEffect, useState } from 'react';

interface SectionProps {
  bgImageUrl: string;
  title: string;
  description: string;
}

export default function Section({ bgImageUrl, title, description }: SectionProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [hrWidth, setHrWidth] = useState('80%');

  useEffect(() => {
    if (titleRef.current) {
      const titleWidth = titleRef.current.offsetWidth;
      setHrWidth(`${titleWidth * 0.8}px`);
    }
  }, [title]);

  return (
    <section 
      className="relative bg-fixed bg-cover bg-center h-[300px] md:h-[400px] lg:h-[500px] flex justify-center items-center" 
      style={{ backgroundImage: `url('${bgImageUrl}')` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-70" />
      <div className="container mx-auto relative z-10 flex flex-col justify-center items-center text-center p-4">
        <h2 ref={titleRef} className="text-4xl md:text-5xl font-extrabold text-orangeRed tracking-tight">
          {title}
        </h2>
        <hr 
          className="my-4 mx-auto" 
          style={{ 
            width: hrWidth, 
            borderTop: '2px solid', 
            borderImage: 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet) 1' 
          }} 
        />
        <p className="text-sm md:text-md lg:text-lg text-orange-500 max-w-4xl">
          {description}
        </p>
      </div>
    </section>
  );
}

