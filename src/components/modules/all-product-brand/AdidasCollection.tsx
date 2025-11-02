"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import { selectAllProducts } from "@/redux/featured/product/productSlice";
import Link from "next/link";
import { IProduct } from "@/types/product";

export default function AdidasCollection() {
  // Get products from Redux
  const products = useAppSelector(selectAllProducts);

  // Console log raw data

  if (!products.length)
    return <p className="text-center py-4">Loading products...</p>;

  return (
    <section className="w-full py-12">
      {/* Header */}
      <div className="flex md:items-center justify-between mb-8 gap-4">
        <h2 className="md:text-3xl text-xl font-bold">Adidas Collection</h2>
        <Button
          variant="outline"
          className="rounded-[12px] border border-gray-300 px-6 py-3 text-sm md:text-base font-medium flex items-center gap-2 hover:bg-gray-100 transition"
        >
          Go To Collection
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 px-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-6">
        {products.map((product: IProduct) => (
          <Card
            key={product._id}
            className="rounded-2xl w-full lg:w-[220px] bg-[#F7F7F7] border-none shadow-sm hover:shadow-md transition"
          >
            <CardContent className="flex flex-col">
              {/* Image */}
              <div className="w-full lg:h-50 md:h-40 h-30 relative flex items-center justify-center mb-4">
                <Image
                  src={
                    (typeof product.image === "string" && product.image) ||
                    (typeof product.featuredImg === "string" &&
                      product.featuredImg) ||
                    "/placeholder.png"
                  }
                  alt={
                    typeof product.name === "string"
                      ? product.name
                      : product.description &&
                        typeof product.description === "object" &&
                        "name" in product.description
                      ? String(
                          (product.description as Record<string, unknown>).name
                        )
                      : "No Name"
                  }
                  fill
                  className="object-contain rounded-2xl bg-[#eeeeee]"
                />
              </div>

              {/* Info */}
              <h3 className="font-semibold text-sm md:text-base">
                {typeof product.name === "string"
                  ? product.name
                  : product.description &&
                    typeof product.description === "object" &&
                    "name" in product.description
                  ? String(
                      (product.description as Record<string, unknown>)
                        .description
                    )
                  : "No Description"}
              </h3>
              <p className="text-xs md:text-sm text-gray-500">
                {typeof product.description === "string"
                  ? product.description
                  : product.description &&
                    typeof product.description === "object" &&
                    "description" in product.description
                  ? String(
                      (product.description as Record<string, unknown>)
                        .description
                    )
                  : "No Description"}
              </p>

              {/* Price + Arrow */}
              <div className="flex items-center justify-between mt-3">
                <p className="text-lg md:text-xl font-bold">
                  $
                  {(typeof product?.price === "number"
                    ? product?.price
                    : product.productInfo &&
                      typeof product.productInfo === "object" &&
                      "price" in product.productInfo
                    ? Number(
                        (product.productInfo as Record<string, unknown>).price
                      )
                    : 0
                  ).toFixed(2)}
                </p>
                <Link href={`/all-product-brand/${product._id}`}>
                  <Button
                    size="icon"
                    className="rounded-full w-9 h-9 bg-gray-200 hover:bg-gray-300"
                  >
                    <ArrowUpRight className="w-4 h-4 text-black" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
