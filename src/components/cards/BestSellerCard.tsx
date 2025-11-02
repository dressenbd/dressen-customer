import Image from "next/image";
import NextLink from "next/link"; // ✅ correct import
import React from "react";
import { ArrowUpRight } from "lucide-react";

type BestSellerCardProps = {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
};

const BestSellerCard = ({
  id,
  title,
  subtitle,
  image,
}: BestSellerCardProps) => {
  return (
    <div
      className="group rounded-2xl overflow-hidden bg-neutral border-none
     relative"
    >
      <div className="relative w-full h-[235px]  md:h-[312px] rounded-3xl mt-2">
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain transition-transform duration-300 
          group-hover:scale-105 object-top"
        />
      </div>

      <div
        className="font-medium absolute bottom-4 md:bottom-7 xl:bottom-10 left-1/2 -translate-x-1/2 
                bg-gradient-to-r from-secondary/20 via-secondary/55 to-secondary/20
              px-3 md:px-4 py-1 md:py-3 rounded-[9px] min-w-8/12 md:min-w-10/12 mx-auto
              text-accent"
      >
        <h2 className="text-[8px] md:text-xs lg:text-[10px] xl:text-xs md:mb-1">
          {title}
        </h2>
        {subtitle && (
          <p className="text-[6px] md:text-[10px] lg:text-[8px] xl:text-[10px] text-neutral ">
            {subtitle}
          </p>
        )}
      </div>

      {/* btn */}
      <NextLink
        href={`/product-details/${id}`}
        className=" bg-secondary text-accent p-0.5 md:p-2 rounded-full 
        shadow absolute top-3 right-3"
      >
        <ArrowUpRight className="w-5 h-5 xl:w-6 xl:h-6" />
      </NextLink>
    </div>
  );
};

export default BestSellerCard;
