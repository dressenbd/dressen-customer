/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Search } from "lucide-react";
import Link from "next/link";
import { useGetAllShopsQuery } from "@/redux/featured/shop/shopApi";
import Image from "next/image";

export default function ShopsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // fetch shops from API
  const { data: shopsData = [], isLoading, isError } = useGetAllShopsQuery();

  // debug
  useEffect(() => {
  }, [shopsData]);

  if (isLoading) {
    return <p className="text-gray-500 text-sm">Loading shops...</p>;
  }
  if (isError) {
    return <p className="text-red-500 text-sm">Failed to load shops.</p>;
  }

  // Filter shops
  const filteredShops = shopsData.filter((shop: any) => {
    const name = shop?.basicInfo?.name?.toLowerCase?.() || "";
    const address = shop?.shopAddress
      ? `${shop.shopAddress.streetAddress} ${shop.shopAddress.city} ${shop.shopAddress.state} ${shop.shopAddress.country}`.toLowerCase()
      : "";

    return (
      name.includes(searchTerm.toLowerCase()) ||
      address.includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search shop..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent border-none outline-none px-2 flex-1"
        />
      </div>

      {/* Shops Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredShops.length > 0 ? (
          filteredShops.map((shop: any, idx: number) => (
            <div
              key={shop._id || idx}
              className="border rounded-xl p-4 shadow-sm hover:shadow-md transition"
            >
              {/* Top Row */}
              <div className="flex items-center gap-3">
                <Image
                  src={shop?.logo || "/placeholder.png"}
                  alt={shop?.basicInfo?.name || "Shop Logo"}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-[16px] font-bold">
                      {shop?.basicInfo?.name ?? "Unnamed Shop"}
                    </h3>
                    <Badge variant="secondary" className="text-xs capitalize">
                      {shop?.status ?? "pending"}
                    </Badge>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-xs bg-[#FFF7ED] px-[11px] py-[3px]"
                  >
                    SINCE {new Date(shop?.createdAt).getFullYear()}
                  </Badge>
                </div>
              </div>

              {/* Description */}
              <p className="mt-2 text-xs text-[#000000] line-clamp-2">
                {shop?.basicInfo?.description ?? "No description available"}
              </p>

              {/* Products & Rating */}
              <div className="mt-3 space-y-1 text-sm">
                <p className="flex justify-between">
                  <span className="text-xs text-[#64748B]">Products</span>
                  <span>
                    {Array.isArray(shop?.products) ? shop.products.length : 0}
                  </span>
                </p>

                <p className="flex items-center justify-between gap-1">
                  <span className="text-xs text-[#64748B]">Rating</span>
                  <span className="flex">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    {shop?.rating ?? 0} ({shop?.reviews ?? 0})
                  </span>
                </p>
              </div>

              {/* Address */}
              <div className="flex gap-1 text-xs text-gray-500 mt-2">
                <MapPin className="w-5 h-5 text-gray-400" />
                <p>
                  {shop?.shopAddress
                    ? `${shop.shopAddress.streetAddress}, ${shop.shopAddress.city}, ${shop.shopAddress.country}`
                    : "Unknown"}
                </p>
              </div>

              {/* Button */}
              <Link href={`/shops/shop/${shop?._id || ""}`}>
                <Button
                  className="mt-4 w-full bg-gray-50 text-gray-700 hover:bg-orange-600 "
                  variant="default"
                >
                  Visit Shop
                </Button>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No shops found.</p>
        )}
      </div>
    </div>
  );
}
