"use client";
import React from "react";
import SectionHeader from "../new-arrivals/SectionHeader";
import BestSellerCard from "@/components/cards/BestSellerCard";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useGetAllProductsQuery } from "@/redux/featured/product/productApi";
import { TagShape } from "@/types/product"; // আপনার existing TagShape type import করুন

const BestSeller = () => {
  const { data } = useGetAllProductsQuery();

  // Filter products that have "Best Selling" tag
  const bestSellerProducts = React.useMemo(() => {
    if (!data || !Array.isArray(data)) return [];

    return data.filter(product => {
      return product.brandAndCategories?.tags?.some((tag: TagShape) => {
        // Handle both string and object types
        if (typeof tag === 'string') {
          return tag === "Best Selling";
        } else if (tag && typeof tag === 'object') {
          return tag.name === "Best Selling";
        }
        return false;
      });
    });
  }, [data]);

  if (bestSellerProducts.length === 0) {
    return (
      <>
        <SectionHeader title="Best Sellers" />
        <div className="flex justify-center items-center py-20">
          <div className="text-lg text-secondary/60">No best seller products found</div>
        </div>
      </>
    );
  }

  return (
    <>
      <SectionHeader title="Best Sellers" />
      <section className="mt-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {bestSellerProducts.slice(0, 8).map((product) => (
            <BestSellerCard
              id={product._id}
              key={product._id}
              title={product.description.name}
              subtitle={product.description.description}
              image={product.featuredImg}
            />
          ))}
        </div>
      </section>
      <div className="flex justify-center mt-10">
        <Button
          className="py-6 xl:py-7 !px-5 xl:!px-8 rounded-[12px] text-base border
           border-neutral w-full md:w-fit md:border-secondary"
          variant={"outline"}
        >
          Go To Collection <ChevronRight />
        </Button>
      </div>
    </>
  );
};

export default BestSeller;