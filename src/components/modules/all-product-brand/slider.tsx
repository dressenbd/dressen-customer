"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

function SliderItem({ image }: { image: string }) {
  return (
    <div
      className="
        relative w-full 
        h-[180px]   /* mobile */
        sm:h-[220px] /* small devices */
        md:h-[300px] /* tablets */
        lg:h-[360px] /* laptops */
        xl:h-[420px] /* large screens */
        rounded-2xl overflow-hidden
      "
    >
      <Image
        src={image}
        alt="Slider"
        fill
        priority
        className="object-cover transition-all duration-500"
        // 👉 use "object-contain" if you want the whole image visible
      />
    </div>
  );
}

export function Slider() {
  const slides = [
    "/Frame 224.png",
    "/Frame 224.png",
    "/Frame 224.png",
    "/Frame 224.png",
  ];

  const [current, setCurrent] = useState(0);

  // Auto slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="w-full flex justify-center items-center py-6 sm:py-8 lg:py-10">
      <div className="relative w-full max-w-6xl overflow-hidden rounded-2xl">
        <SliderItem image={slides[current]} />

        {/* Pagination Dots */}
        <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <span
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-2 h-2 rounded-full cursor-pointer transition ${
                index === current ? "bg-gray-800" : "bg-gray-300"
              }`}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
}
