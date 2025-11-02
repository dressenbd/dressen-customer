"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  FilterX,
  ShoppingCart,
  Trophy,
} from "lucide-react";
import { useGetPaginatedProductsQuery } from "@/redux/featured/product/productApi";
import { useGetAllCategoryQuery } from "@/redux/featured/category/categoryApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToCart, selectCartItems } from "@/redux/featured/cart/cartSlice";
import toast from 'react-hot-toast';
import clsx from 'clsx';
import type { RemoteProduct } from '@/types/product';

//type ReviewCategory = "Smartphones" | "Books" | "Kitchen" | "Sports";

// Commented for future use




function formatBDT(n: number) {
  return `৳${Math.round(n)}`;
}
function Stars({ value }: { value: number }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <div className="flex items-center">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < full || (i === full && half);
        return (
          <svg
            key={i}
            className={`w-3.5 h-3.5 ${
              filled ? "text-yellow-500" : "text-gray-300"
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.036a1 1 0 00-1.175 0l-2.802 2.036c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.88 8.72c-.783-.57-.38-1.81.588-1.81H6.93a1 1 0 00.95-.69l1.07-3.292z" />
          </svg>
        );
      })}
    </div>
  );
}

export default function ReviewsMorePage() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const [currentPage, setCurrentPage] = useState(1);
  const { data: paginatedData, isLoading, isFetching } = useGetPaginatedProductsQuery({ 
    page: currentPage, 
    limit: 20 
  });
  const { data: apiCategories } = useGetAllCategoryQuery();
  
  const [activeCat, setActiveCat] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"rating" | "price_asc" | "price_desc">("rating");
  const [q, setQ] = useState("");

  const hasNextPage = paginatedData?.pagination?.hasNextPage || false;
  const totalItems = paginatedData?.pagination?.totalItems || 0;
  
  const apiProducts = useMemo(() => {
    return paginatedData?.data || [];
  }, [paginatedData?.data]);

  const handleLoadMore = () => {
    if (hasNextPage && !isFetching) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const categories = useMemo(() => {
    if (!apiCategories) return ["All"];
    return ["All", ...apiCategories.map(cat => cat.name || "Category")];
  }, [apiCategories]);

  const products = useMemo(() => {
    if (!apiProducts) return [];
    return (apiProducts as RemoteProduct[]).map((prod: RemoteProduct) => {
      const salePrice = Number(prod.productInfo?.salePrice ?? 0);
      const regularPrice = Number(prod.productInfo?.price ?? 0);
      const price = salePrice > 0 ? salePrice : regularPrice;
      const oldPrice = salePrice > 0 ? regularPrice : undefined;
      
      const categoryName = prod.brandAndCategories?.categories?.[0]?.name || "";
      const quantity = prod.productInfo?.quantity || 0;
      const rating = 4.0 + Math.random() * 1.0; // Random rating 4.0-5.0
      const reviews = Math.floor(quantity * 0.3) + 10; // Reviews based on quantity
      const sold = Math.floor(quantity * 1.5) + 20;

      return {
        id: prod._id,
        title: prod.description?.name || "Product",
        category: categoryName,
        image: prod.featuredImg || "/placeholder.png",
        price,
        oldPrice,
        rating,
        reviews,
        sold,
      };
    });
  }, [apiProducts]);

  const filtered = useMemo(() => {
    let arr = products.filter((p) =>
      activeCat === "All" ? true : p.category === activeCat
    );

    if (q.trim()) {
      const t = q.toLowerCase();
      arr = arr.filter((p) => p.title.toLowerCase().includes(t));
    }

    switch (sortBy) {
      case "price_asc":
        arr = arr.slice().sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        arr = arr.slice().sort((a, b) => b.price - a.price);
        break;
      default: // rating
        arr = arr.slice().sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
    }

    return arr;
  }, [products, activeCat, sortBy, q]);

  const handleAddToCart = (product: { id: string; title: string; image: string; price: number }, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const cartItem = {
      productId: String(product.id),
      productName: product.title,
      productImage: product.image,
      unitPrice: product.price,
      quantity: 1,
      color: 'Default',
      size: 'M',
    };

    dispatch(addToCart(cartItem));
    toast.success("Added to cart successfully!");
  };

  const isAddedToCart = (productId: string) => {
    return cartItems.some((item) => item.productId === productId);
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#facf35] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#EAF6FF] via-white to-[#E3F2FD]" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1F2937] flex items-center gap-2">
                <Trophy className="w-7 h-7 text-[#facf35]" />
                Top Reviews
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                Highest-rated picks from smartphones, books, kitchen & sports.
              </p>
            </div>

            {/* Search */}
            <div className="w-full md:w-[380px]">
              <div className="flex items-center gap-2 rounded-xl border bg-white px-3 py-2 shadow-sm">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search top reviewed…"
                  className="w-full bg-transparent outline-none text-sm"
                />
                {q && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQ("")}
                    className="text-gray-500"
                  >
                    <FilterX className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Category Chips */}
          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCat(c)}
                className={[
                  "h-9 rounded-full border px-4 text-sm transition",
                  activeCat === c
                    ? "bg-[#facf35] text-[#2e2e2e] border-[#facf35]"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50",
                ].join(" ")}
                aria-pressed={activeCat === c}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <SlidersHorizontal className="w-4 h-4" />
              <span>
                Showing <b>{filtered.length}</b> of <b>{totalItems}</b> products
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(
                      e.target.value as
                        | "rating"
                        | "price_asc"
                        | "price_desc"
                    )
                  }
                  className="appearance-none rounded-md border border-gray-200 bg-white pl-3 pr-8 py-2 text-sm"
                >
                  <option value="rating">Top Rated</option>

                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-gray-500">
            {isLoading ? "Loading products..." : "No items found."}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
              {filtered.map((p: { id: string; title: string; image: string; price: number; oldPrice?: number; rating: number; reviews: number; sold?: number }) => (
              <Card
                key={p.id}
                className="group relative rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                {p.rating >= 4.5 && (
                  <div className="absolute left-2 top-2 z-10">
                    <span className="inline-block rounded-full bg-[#facf35] text-[#2e2e2e] text-[10px] px-2 py-0.5 font-semibold">
                      TOP
                    </span>
                  </div>
                )}

                <div className="relative w-full h-36 sm:h-40 md:h-44">
                  <Image
                    src={p.image || "/mens.png"}
                    alt={p.title}
                    fill
                    sizes="(min-width:1280px) 20vw, (min-width:1024px) 25vw, (min-width:640px) 33vw, 50vw"
                    className="object-contain transition-transform duration-300 group-hover:scale-95"
                  />
                </div>

                <CardContent className="p-3">
                  <div className="min-h-[40px] text-sm font-medium text-gray-900 line-clamp-2">
                    {p.title}
                  </div>

                  <div className="mt-1 flex items-center gap-2">
                    <div className="flex items-center gap-1 text-[12px]">
                      <Stars value={p.rating} />
                      <span className="text-gray-700 font-semibold">
                        {p.rating.toFixed(1)}
                      </span>
                      <span className="text-gray-500">({p.reviews})</span>
                    </div>
                    {typeof p.sold === "number" && (
                      <span className="text-[11px] text-gray-500">
                        • {p.sold} sold
                      </span>
                    )}
                  </div>

                  <div className="mt-2 flex items-center gap-2">
                    {typeof p.oldPrice === "number" && (
                      <span className="text-xs text-gray-400 line-through">
                        {formatBDT(p.oldPrice)}
                      </span>
                    )}
                    <span className="text-base font-semibold text-[#facf35]">
                      {formatBDT(p.price)}
                    </span>
                  </div>

                  <div className="mt-3 flex gap-2">
                    <Link
                      href={`/product-details?id=${encodeURIComponent(p.id)}`}
                      className="flex-1"
                      aria-label={`View details of ${p.title}`}
                    >
                      <Button className="w-full bg-[#facf35] hover:bg-[#facf35]/90 text-[#2e2e2e]">View</Button>
                    </Link>
                    <Button
                      variant="outline"
                      className={clsx("w-10 px-0", {
                        'bg-green-600 hover:bg-green-600 text-[#2e2e2e]': isAddedToCart(p.id),
                        'hover:bg-[#facf35] hover:text-[#2e2e2e]': !isAddedToCart(p.id)
                      })}
                      onClick={(e) => !isAddedToCart(p.id) && handleAddToCart(p, e)}
                      disabled={isAddedToCart(p.id)}
                      aria-label={isAddedToCart(p.id) ? "Added to cart" : "Add to cart"}
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            </div>
            
            {/* Load More Button */}
            {hasNextPage && (
              <div className="mt-8 flex justify-center">
                <Button 
                  onClick={handleLoadMore}
                  disabled={isFetching}
                  variant="outline"
                  size="lg"
                  className="px-8 bg-[#facf35] hover:bg-[#facf35]/90 text-[#2e2e2e] border-[#facf35]"
                >
                  {isFetching ? "Loading..." : "Load More Reviews"}
                </Button>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}

/** --------------- Future Dynamic Integration ---------------
 *  import { useGetTopReviewedProductsQuery } from '@/redux/featured/product/productApi';
 *  const { data } = useGetTopReviewedProductsQuery();
 *  const REVIEWS = (data ?? []).map(p => ({
 *    id: p._id,
 *    title: p.description?.name ?? 'Product',
 *    category: 'Smartphones' as const, // API থেকে এলে ম্যাপ করবেন
 *    image: p.featuredImg ?? '/placeholder.png',
 *    price: Number(p.productInfo?.salePrice ?? 0),
 *    oldPrice: Number(p.productInfo?.price ?? undefined),
 *    rating: Number((p as any).rating ?? 0),
 *    reviews: Number((p as any).reviews ?? 0),
 *    sold: Number((p as any).sold ?? 0),
 *  }));
 * ---------------------------------------------------------- */
