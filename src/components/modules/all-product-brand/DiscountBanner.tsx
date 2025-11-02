import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const DiscountBanner = () => {
  return (
    <div
      className="mt-20 relative flex items-center justify-between z-0
      mb-24 overflow-hidden p-6 md:p-10 bg-gradient-to-r 
      h-48 md:h-[290px] lg:h-[330px] rounded-[30px]
      bg-[linear-gradient(to_right,_#A7AAFF,_#E0E1FC,_#d9d9d9a2,_#d9d9d9a2,_#d9d9d9a2,_#F1ECD7,_#FFE67C)]"
    >
      {/* Left Image */}
      <div
        className="relative w-7/12 lg:w-1/3 h-40  md:h-[250px] lg:h-[330px] flex-shrink-0
     -ml-10  md:-ml-16 lg:-ml-10 mt-8 md:mt-10 lg:mt-0"
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
        <p className=" md:text-xl text-sm lg:text-2xl  mr-18 md:mr-52 lg:mr-80">
          Get Up to
        </p>
        <h2 className="text-2xl md:text-5xl lg:text-6xl font-bold pl-10 md:pl-12 lg:pl-14">
          55% OFF
        </h2>
        <p className="md:text-xl lg:text-2xl pl-14 md:pl-48 lg:pl-60">
          Holiday Bit
        </p>

        <Button
          className="py-0 md:py-6 xl:py-7 !px-4 md:!px-5 xl:!px-8 rounded-[12px] 
          text-[10px] md:text-base 
          ml-12 md:ml-20 lg:ml-24 mt-1"
        >
          Get Discount
        </Button>
      </div>

      {/* Right Image */}
      <div
        className="relative w-1/2 lg:w-1/3 h-40 md:h-[250px] lg:h-[330px]
       flex-shrink-0 -mr-8 md:-mr-14 lg:mr-0 mt-8 md:mt-10 lg:mt-0"
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
