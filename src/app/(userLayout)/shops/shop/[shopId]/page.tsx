/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Star } from "lucide-react";
import { useGetSingleShopQuery } from "@/redux/featured/shop/shopApi";
import { useParams } from "next/navigation";

export default function ShopPage() {
  const { shopId } = useParams() as { shopId: string };
  const [searchTerm, setSearchTerm] = useState("");

  // fetch single shop data
  const { data: shopData, isLoading, isError } = useGetSingleShopQuery(shopId);

  // console log for debugging
  useEffect(() => {}, [shopData]);

  const products = shopData?.products || [];

  // filter with search
  const filteredProducts = products.filter((product: any) =>
    product?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading products...</p>;
  }
  if (isError) {
    return <p className="text-center text-red-500">Failed to load products.</p>;
  }

  return (
    <div className="space-y-6 p-4">
      {/* Shop Info */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 relative rounded-full overflow-hidden bg-gray-200">
          <Image
            src={shopData?.logo || "/placeholder.png"}
            alt={shopData?.name || "Shop"}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="text-lg font-bold">{shopData?.name}</h2>
          <p className="text-sm text-gray-500">
            {shopData?.shopAddress?.city || "City"}
          </p>
          <p className="text-sm text-gray-500">{products.length} Products</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md mx-auto">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product: any) => (
            <div
              key={product._id}
              className="relative rounded-xl shadow-sm overflow-hidden h-[330px] border border-[#E2E8F0] bg-white"
            >
              {/* Product Image */}
              <div className="relative h-2/3 min-w-[242px]">
                <Image
                  src={product.logo || "/placeholder.png"}
                  alt={product.name}
                  fill
                  className="object-cover"
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
                        i < (product.rating || 0)
                          ? "fill-current"
                          : "text-gray-300"
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
                    ${product.price?.toFixed(2) || 0}
                  </span>
                  {product.oldPrice && (
                    <span className="text-gray-400 line-through text-sm">
                      ${product.oldPrice?.toFixed(2)}
                    </span>
                  )}
                </div>
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
