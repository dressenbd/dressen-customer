"use client";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import SectionHeader from "../home/new-arrivals/SectionHeader";
import { useAppSelector } from "@/redux/hooks";
import { selectBrands } from "@/redux/featured/brand/brandSlice";
import { TBrand } from "@/redux/featured/brand/brandSlice"; // আপনার existing TBrand type import করুন

const TopBrands = () => {
  const brands = useAppSelector(selectBrands);

  if (!brands.length)
    return <p className="text-center py-4">Loading brands...</p>;

  // Map brands to only include name and icon URL - TBrand type ব্যবহার করুন
  const brad = brands.map((bran: TBrand) => ({
    name: bran.name,
    url: bran.icon?.url || "/placeholder.png",
  }));

  const extendedBrands = [...brad, ...brad];

  return (
    <>
      <SectionHeader title="Top Brand's" />

      <div className="w-full h-14 md:h-44 overflow-hidden">
        <Marquee speed={50} gradient={false} pauseOnHover={true} loop={0}>
          {extendedBrands.map((brand, index) => (
            <div
              key={index}
              className="relative w-14 md:w-44 h-14 md:h-44 md:px-6 flex items-center justify-center mx-3"
            >
              <Image
                src={brand.url}
                alt={brand.name}
                fill
                className="object-scale-down"
                sizes="(max-width: 768px) 56px, 176px"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </>
  );
};

export default TopBrands;