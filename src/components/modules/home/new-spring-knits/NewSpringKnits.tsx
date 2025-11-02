/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import SectionHeader from "../new-arrivals/SectionHeader";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useGetAllProductsQuery } from "@/redux/featured/product/productApi";

const NewSpringKnits = () => {
  const { data } = useGetAllProductsQuery();

  const springKnitsProducts = data?.slice(0, 4) || []; 

  return (
    <div>
      <SectionHeader title="New Spring Knits" />
      <section className="mt-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {springKnitsProducts.map((product : any) => (
            <div
              key={product._id}
              className="group rounded-2xl overflow-hidden bg-neutral border-none relative cursor-pointer"
            >
              <div className="relative w-full h-[145px] md:h-[252px] lg:h-[312px] rounded-3xl mt-2">
                <Image
                  src={product.featuredImg || "/placeholder-image.jpg"}
                  alt={product.description?.name || "Product"}
                  fill
                  className="object-cover transition-transform duration-300 
                    group-hover:scale-105 object-top"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>

              <div className="font-medium absolute bottom-5 xl:bottom-10 left-1/2 -translate-x-1/2 px-6 py-3 rounded-[9px] min-w-10/12 mx-auto">
                <div className="hidden md:flex justify-center mt-10">
                  <Button
                    className="py-5 !px-5 rounded-[12px] text-base"
                    variant={"outline"}
                  >
                    Go To Collection <ChevronRight />
                  </Button>
                </div>
              </div>

              {/* New spring badge */}
              <button className="text-secondary bg-accent py-1 px-3 rounded-full shadow absolute top-2 md:top-3 left-2 md:left-3 text-[6px] md:text-xs font-semibold">
                New spring
              </button>

              {/* Product info overlay (optional) */}
              <div className="absolute bottom-2 left-2 right-2 bg-accent/90 rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 md:hidden">
                <h3 className="text-sm font-medium truncate text-secondary">
                  {product.description?.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  {product.productInfo?.salePrice && (
                    <span className="text-sm font-bold text-discount">
                      ${product.productInfo.salePrice}
                    </span>
                  )}
                  {product.productInfo?.price && (
                    <span className={`text-xs ${product.productInfo.salePrice ? 'line-through text-secondary/50' : 'font-bold text-secondary'}`}>
                      ${product.productInfo.price}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="flex md:hidden justify-center mt-10">
        <Button
          className="py-6 xl:py-7 !px-5 xl:!px-8 rounded-[12px] text-base border 
            border-neutral md:border-secondary w-full md:w-fit"
          variant={"outline"}
        >
          Go To Collection <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default NewSpringKnits;