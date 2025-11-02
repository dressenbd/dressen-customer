import Image from "next/image";
import React from "react";

const AppPromo = () => {
  return (
    <div
      className="w-full rounded-2xl mb-10  h-[517px] md:h-80 lg:h-[400px] p-8 md:p-12 
 bg-[linear-gradient(to_right,_#ffffff,_#EDE9FE,_#FEF9C3,_#ffffff)]
     flex flex-col md:flex-row items-center justify-between md:gap-8"
    >
      {/* Left Content */}
      <div className="max-w-lg text-center md:text-left">
        <p className="text-lg lg:text-xl opacity-90">The Dressen App</p>
        <h2 className="text-2xl lg:text-3xl font-semibold mt-2">
          Share your ideas & shop <br /> endless Inspiration
        </h2>

        {/* App Store Buttons */}
        <div className="flex gap-4 mt-2 lg:mt-6 justify-center md:justify-start">
          <div className="relative w-28 lg:w-44 h-14">
            <Image
              src="/googleplay.png"
              alt="Get it on Google Play"
              fill
              className="object-contain cursor-pointer"
            />
          </div>
          <div className="relative w-28 lg:w-44 h-14">
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
      <div className="flex-shrink-0 mt-10 lg:mt-12">
        <div className="relative w-[300px] lg:w-[362px] h-[282px] lg:h-[354px]">
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
