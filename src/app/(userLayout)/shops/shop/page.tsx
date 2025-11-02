/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Star } from "lucide-react";
import { useGetAllShopsQuery } from "@/redux/featured/shop/shopApi";

export default function ShopPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // fetch shops from API
  const { data: productsData = [], isLoading, isError } = useGetAllShopsQuery();

  // filter with search
  const filteredProducts = productsData.filter((product: any) =>
    product.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading products...</p>;
  }

  if (isError) {
    return <p className="text-center text-red-500">Failed to load products.</p>;
  }

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Input
          placeholder="Search Product..."
          className="pl-10 rounded-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
          />
        </svg>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product: any) => (
            <div
              key={product._id}
              className="group relative rounded-xl shadow-sm overflow-hidden h-[360px] border border-[#E2E8F0] bg-white hover:border-[#FF6933] hover:shadow-md transition"
            >
              {product.sale && (
                <span className="absolute z-30 top-3 left-3 bg-red-500 text-[#2e2e2e] text-xs font-semibold px-2.5 py-[2px] rounded-full">
                  SALE
                </span>
              )}

              {/* Product Image */}
              <div className="relative h-2/3 min-w-[242px] overflow-hidden">
                <Image
                  src={product.logo} // ✅ product[0]?.logo না
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Product Info */}
              <div className="p-4 space-y-2">
                {/* Rating */}
                <div className="flex items-center gap-1 text-yellow-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < product.rating ? "fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                {/* Product Name */}
                <p className="text-xs md:text-sm font-bold text-[#020817] truncate">
                  {product.name}
                </p>

                {/* Price */}
                <div className="flex items-center gap-2">
                  <span className="text-[#FF6933] font-bold text-lg">
                    ${product.price?.toFixed(2)}
                  </span>
                  {product.oldPrice && (
                    <span className="text-gray-400 line-through text-sm">
                      ${product.oldPrice?.toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Action Button */}
                <button className="px-3 py-1 rounded-lg bg-gray-200 text-xs font-semibold group-hover:bg-[#FF6933] group-hover:text-[#2e2e2e] transition">
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No products found
          </p>
        )}
      </div>
    </div>
  );
}
