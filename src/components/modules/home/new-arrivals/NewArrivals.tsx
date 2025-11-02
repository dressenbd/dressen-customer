/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect } from "react";
import SectionHeader from "./SectionHeader";
import { useMemo, useState } from "react";
import NewArrivalsCard from "@/components/cards/NewArrivalsCard";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useGetAllProductsQuery } from "@/redux/featured/product/productApi";
import { IProduct, CategoryShape } from "@/types/product"; // আপনার existing types import করুন

const NewArrivals = () => {
  const { data } = useGetAllProductsQuery();
  const [tab, setTab] = useState<string>("");

  const categoryTabs = useMemo(() => {
    if (!data) return [];
    
    const categories = new Set<string>();
    data.forEach((product: IProduct) => {
      product.brandAndCategories?.categories?.forEach((category: CategoryShape) => {
        // Handle both string and object types for category
        if (typeof category === 'string') {
          categories.add(category);
        } else if (category && typeof category === 'object' && category.name) {
          categories.add(category.name);
        }
      });
    });
    
    return Array.from(categories).map(categoryName => ({
      value: categoryName.toLowerCase(),
      label: categoryName
    }));
  }, [data]);

  useEffect(() => {
    if (categoryTabs.length > 0 && !tab) {
      setTab(categoryTabs[0].value);
    }
  }, [categoryTabs, tab]);

  const arrivals = useMemo(() => {
    if (!data || !tab) return [];
    
    const selectedCategory = categoryTabs.find(cat => cat.value === tab);
    if (!selectedCategory) return data.slice(0, 5);
    
    const filteredProducts = data.filter((product: IProduct) => {
      return product.brandAndCategories?.categories?.some((category: CategoryShape) => {
        // Handle both string and object types for category matching
        if (typeof category === 'string') {
          return category === selectedCategory.label;
        } else if (category && typeof category === 'object' && category.name) {
          return category.name === selectedCategory.label;
        }
        return false;
      });
    });
    
    return filteredProducts.slice(0, 5);
  }, [data, tab, categoryTabs]);

  const transformedArrivals = useMemo(() => {
    return arrivals.map((product: IProduct) => ({
      id: product._id,
      title: product.description?.name,
      subtitle: product.description?.description,
      price: product.productInfo?.price,
      image: product.featuredImg 
    }));
  }, [arrivals]);

  return (
    <>
      <SectionHeader
        title="New Arrivals"
        tabs={categoryTabs}
        value={tab}
        onValueChange={(v) => setTab(v as any)}
      />

      <section className="mt-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {transformedArrivals.map((product: any) => (
            <NewArrivalsCard key={product.id} {...product} />
          ))}
        </div>
      </section>

      <div className="flex justify-center mt-10">
        <Button
          className="py-6 xl:py-7 !px-5 xl:!px-8 rounded-[12px] text-base border 
          border-neutral md:border-secondary w-full md:w-fit"
          variant={"outline"}
        >
          Go To Collection <ChevronRight />
        </Button>
      </div>
    </>
  );
};

export default NewArrivals;