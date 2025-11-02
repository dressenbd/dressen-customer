/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import SectionHeader from "../new-arrivals/SectionHeader";
import { useGetAllProductsQuery } from "@/redux/featured/product/productApi";

type Brand = {
  name: string;
  src: string;
};

const TopBrands = () => {
  const { data } = useGetAllProductsQuery();
  const brands = data
    ? data
        .map((product: any) => ({
          name: product.brandAndCategories?.brand?.name,
          src: product.brandAndCategories?.brand?.icon?.url,
        }))
        .filter((brand: any) => brand.name && brand.src)
        .reduce((unique: any, brand: any) => {
          const exists = unique.find((b: any) => b.name === brand.name);
          return exists ? unique : [...unique, brand];
        }, [])
    : [];

  const extendedBrands = [...brands, ...brands];

  return (
    <>
      <SectionHeader title="Top Brand's" />

      <div className="w-full h-14 md:h-44 overflow-hidden">
        <Marquee speed={50} gradient={false} pauseOnHover={true} loop={0}>
          {extendedBrands.map((brand: Brand, index: number) => (
            <div
              key={index}
              className="relative w-14 md:w-44 h-14 md:h-44 md:px-6 flex items-center justify-center mx-3"
            >
              <Image
                src={brand.src}
                alt={brand.name}
                fill
                className="object-scale-down"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </>
  );
};

export default TopBrands;
