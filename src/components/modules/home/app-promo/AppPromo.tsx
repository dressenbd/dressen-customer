import Image from "next/image";
import React from "react";

const AppPromo = () => {
  return (
    <div
      className="w-full rounded-2xl md:my-20 h-[132px] md:h-80 lg:h-[400px] p-8 md:p-12 
      bg-gradient-to-r from-accent via-section to-primary/20
      flex items-center justify-between md:gap-8"
    >
      {/* Left Content */}
      <div className="max-w-lg">
        <p className="text-[10px] md:text-lg lg:text-xl text-secondary/70">
          The Dressen App
        </p>
        <h2 className="text-sm md:text-2xl lg:text-3xl font-semibold md:mt-2 text-secondary">
          Share your ideas & shop <br /> endless Inspiration
        </h2>

        {/* App Store Buttons */}
        <div className="flex gap-4 mt-2 lg:mt-6 ">
          <div className="relative w-16 md:w-28 lg:w-44 h-6 md:h-14">
            <Image
              src="/googleplay.png"
              alt="Get it on Google Play"
              fill
              className="object-contain cursor-pointer"
            />
          </div>
          <div className="relative w-16 md:w-28 lg:w-44 h-6 md:h-14">
            <Image
              src="/appstore.png"
              alt="Download on the App Store"
              fill
              className="object-contain cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Right Image */}
      <div className="flex-shrink-0 mt-1 md:mt-10 lg:mt-12">
        <div
          className="relative w-[130px] md:w-[300px] lg:w-[362px] 
        h-[127px] md:h-[282px] lg:h-[354px]"
        >
          <Image
            src="/Dressenmobileapp.png"
            alt="App Mockup"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default AppPromo;
