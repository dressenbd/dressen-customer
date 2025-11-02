"use client";

import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// BestSelling.tsx / CategoryProduct.tsx / Discount.tsx
import type { IProduct } from "@/types/product";
import type { ProductData } from "@/types/product";

interface FlexibleProduct {
  id?: string | number;
  _id?: string;
  name?: string;
  subtitle?: string;
  price?: number | string;
  image?: string;
  description?: string | Record<string, unknown>;
  productInfo?: Record<string, unknown>;
  featuredImg?: string;
  [key: string]: unknown; // Allow any additional properties
}

type Props = {
  data?: (IProduct | ProductData)[];
};

const products: ProductData[] = [
  {
    _id: "1",
    id: 1,
    name: "The Horse Original",
    subtitle: "Perfect for Men Watch",
    price: 250.0,
    image: "/placeholder-a56ds.png",
  },
  {
    _id: "2",
    id: 2,
    name: "Nike Car Wheel Watch",
    subtitle: "Perfect for Men Watch",
    price: 150.0,
    image: "/man-gray-tshirt-casual.png",
  },
  {
    _id: "3",
    id: 3,
    name: "Hermes Galaxy Watch 3",
    subtitle: "Perfect for Men Watch",
    price: 305.0,
    image: "/placeholder-1d7fr.png",
  },
  {
    _id: "4",
    id: 4,
    name: "Parimani Submariner",
    subtitle: "Perfect for Men Watch",
    price: 170.0,
    image: "/black-red-sports-watch.png",
  },
  {
    _id: "5",
    id: 5,
    name: "Punch Fusion watch",
    subtitle: "Perfect for Men Watch",
    price: 110.0,
    image: "/man-navy-sunglasses.png",
  },
  {
    _id: "6",
    id: 6,
    name: "Pixset Super Dry",
    subtitle: "Perfect for Men Watch",
    price: 320.0,
    image: "/placeholder-xfc5a.png",
  },
  {
    _id: "7",
    id: 7,
    name: "The Horse Original",
    subtitle: "Perfect for Men Watch",
    price: 220.0,
    image: "/man-red-patterned-shirt.png",
  },
  {
    _id: "8",
    id: 8,
    name: "Hermes Galaxy Watch 3",
    subtitle: "Perfect for Men Watch",
    price: 650.0,
    image: "/placeholder-mj8hy.png",
  },
];

export default function BestSellingProducts({ data }: Props) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Use provided data or fallback to static products
  const displayProducts = data && data.length > 0 ? data : products;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div
        className={`flex items-center justify-between mb-8 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <h2 className="text-3xl font-bold text-gray-900">
          Best Selling Product&apos;s
        </h2>
        <Button
          variant="outline"
          className="group border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-lg bg-transparent hover:scale-105 hover:shadow-md transition-all duration-300 hover:border-gray-400"
        >
          Go To Collection
          <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
        </Button>
      </div>

      {/* Products Grid */}
      {/* Default: 2 cols (mobile) | lg: 4 cols */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {displayProducts.map((product, index) => {
          // Normalize product data for consistent display
          const normalizedProduct: {
  id: string | number;
  name: string;
  subtitle: string;
  price: number;
  image: string;
} = {
  id: (product as FlexibleProduct).id || 
      (product as FlexibleProduct)._id || 
      index + 1,
  
  name: typeof (product as FlexibleProduct).name === 'string' ? 
        (product as FlexibleProduct).name as string :
        (product as FlexibleProduct).description && 
        typeof (product as FlexibleProduct).description === 'object' ? 
        String(((product as FlexibleProduct).description as Record<string, unknown>).name || 'Product Name') :
        'Product Name',
  
  subtitle: typeof (product as FlexibleProduct).subtitle === 'string' ? 
            (product as FlexibleProduct).subtitle as string :
            (product as FlexibleProduct).description && 
            typeof (product as FlexibleProduct).description === 'object' ? 
            String(((product as FlexibleProduct).description as Record<string, unknown>).description || '').substring(0, 50) + '...' :
            'Product Description',
  
  price: typeof (product as FlexibleProduct).price === 'number' ? 
         (product as FlexibleProduct).price as number :
         typeof (product as FlexibleProduct).price === 'string' ? 
         parseFloat((product as FlexibleProduct).price as string) || 0 :
         (product as FlexibleProduct).productInfo && 
         typeof (product as FlexibleProduct).productInfo === 'object' ? 
         Number(((product as FlexibleProduct).productInfo as Record<string, unknown>).price) || 0 :
         0,
  
  image: typeof (product as FlexibleProduct).image === 'string' ? 
         (product as FlexibleProduct).image as string :
         typeof (product as FlexibleProduct).featuredImg === 'string' ? 
         (product as FlexibleProduct).featuredImg as string :
         '/placeholder.svg'
};

          return (
            <Link 
              key={normalizedProduct.id} 
              href={`/product-details?id=${normalizedProduct.id}`}
            >
              <div
                className={`bg-gray-100 rounded-2xl p-4 sm:p-6 group hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: isVisible ? `${index * 100}ms` : "0ms" }}
              >
                {/* Product Image */}
                <div className="aspect-square mb-3 sm:mb-4 flex items-center justify-center overflow-hidden rounded-lg relative">
                  <Image
                    src={normalizedProduct.image || "/placeholder.svg"}
                    alt={normalizedProduct.name}
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>

                {/* Product Info */}
                <div className="space-y-1.5 sm:space-y-2">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base transition-colors duration-300 group-hover:text-gray-700">
                    {normalizedProduct.name}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm transition-colors duration-300 group-hover:text-gray-500">
                    {normalizedProduct.subtitle}
                  </p>

                  {/* Price and Arrow */}
                  <div className="flex items-center justify-between pt-1.5 sm:pt-2">
                    <span className="font-bold text-lg sm:text-xl text-gray-900 transition-all duration-300 group-hover:tracking-tight">
                      ${normalizedProduct.price}
                    </span>
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:bg-gray-50">
                      <ArrowUpRight className="h-4 w-4 text-gray-600 transition-all duration-300 group-hover:text-gray-800 group-hover:rotate-45" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}