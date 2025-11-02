import React from "react";
import Image from "next/image";

const DiscountBanner = () => {
  return (
    <div
      className="mt-20 relative flex items-center justify-between z-0
      mb-24 overflow-hidden p-6 md:p-10 bg-gradient-to-r 
      h-28 md:h-[290px] lg:h-[330px] xl:h-[390px] rounded-[16px] md:rounded-[30px]
      bg-gradient-to-r from-highlight/60 via-primary/30 to-primary"
    >
      {/* Left Image */}
      <div
        className="relative w-7/12 lg:w-1/3 h-40  md:h-[250px] lg:h-[330px] xl:h-[390px]
        flex-shrink-0
     -ml-10  md:-ml-16 lg:-ml-10  md:mt-10 lg:mt-0"
      >
        <Image
          src="/1.png"
          alt="Model Left"
          fill
          className="object-contain object-bottom md:object-left md:object-cover"
        />
      </div>

      {/* Text Content */}
      <div
        className=" px-6 md:space-y-3 lg:space-y-4 absolute
      left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
"
      >
        <p className="text-[8px] md:text-xl lg:text-2xl mr-0 md:mr-52 lg:mr-80">
          Get Up to
        </p>
        <h2 className="text-xl md:text-5xl lg:text-6xl font-bold pl-4 md:pl-12 lg:pl-14">
          55% OFF
        </h2>
        <p className="text-[8px] md:text-xl lg:text-2xl pl-[65px] md:pl-48 lg:pl-60">
          Holiday Bit
        </p>

        <button
          className="py-1 md:py-2 lg:py-3 xl:py-4 !px-2 md:!px-5 xl:!px-8 rounded md:rounded-[12px] 
          text-[8px] md:text-base 
          ml-6 md:ml-20 lg:ml-24 mt-1
          bg-secondary text-accent"
        >
          Get Discount
        </button>
      </div>

      {/* Right Image */}
      <div
        className="relative w-1/2 lg:w-1/3 h-40 md:h-[250px] lg:h-[330px] xl:h-[390px]
       flex-shrink-0 -mr-8 md:-mr-14 lg:mr-0 md:mt-10 lg:mt-0"
      >
        <Image
          src="/zara-black-flip.png"
          alt="Model Right"
          fill
          className="object-contain object-bottom md:object-center md:object-cover"
        />
      </div>
    </div>
  );
};

export default DiscountBanner;
