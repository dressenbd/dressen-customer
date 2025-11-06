"use client";

import Image from "next/image";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGetPaginatedProductsQuery } from "@/redux/featured/product/productApi";
import { useGetAllCategoryQuery } from "@/redux/featured/category/categoryApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToCart, selectCartItems } from "@/redux/featured/cart/cartSlice";
import toast from 'react-hot-toast';
import clsx from 'clsx';
import { IProduct } from "@/types/product";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  FilterX,
  ShoppingCart,
  Star,
  Flame,
} from "lucide-react";

type DealCategory = string;

type DealItem = {
  id: string;
  title: string;
  category: DealCategory;
  image: string;
  price: number;
  oldPrice: number;
  createdAt: string;
  rating?: number;
  reviews?: number;
  sold?: number;
  badge?: "SALE" | "HOT" | "NEW";
};

const FALLBACK_DEALS: DealItem[] = [
  {
    id: "t1",
    title: "Creamy Milk Tea",
    category: "Beverages",
    image: "/new-arrival-3.png",
    price: 120,
    oldPrice: 150,
    createdAt: "2025-01-09T09:00:00Z",
    rating: 4.6,
    reviews: 120,
    sold: 930,
    badge: "SALE",
  },
  {
    id: "t2",
    title: "Cold Coffee Special",
    category: "Beverages",
    image: "/man-model.png",
    price: 180,
    oldPrice: 220,
    createdAt: "2025-01-08T12:00:00Z",
    rating: 4.5,
    reviews: 96,
    sold: 700,
  },
  {
    id: "t3",
    title: "Chocolate Waffle",
    category: "Desserts",
    image: "/new-arrival-1.png",
    price: 250,
    oldPrice: 300,
    createdAt: "2025-01-09T03:00:00Z",
    rating: 4.4,
    reviews: 80,
    sold: 450,
    badge: "NEW",
  },
  {
    id: "t4",
    title: "Street Chicken Roll",
    category: "Street Food",
    image: "/mens.png",
    price: 200,
    oldPrice: 250,
    createdAt: "2025-01-07T09:00:00Z",
    rating: 4.3,
    reviews: 61,
    sold: 380,
  },
  {
    id: "t5",
    title: "Mixed Fruit Lassi",
    category: "Beverages",
    image: "/new-arrival-4.png",
    price: 160,
    oldPrice: 200,
    createdAt: "2025-01-09T01:30:00Z",
    rating: 4.5,
    reviews: 140,
    sold: 1020,
    badge: "HOT",
  },
  {
    id: "t6",
    title: "Crispy Samosa",
    category: "Snacks",
    image: "/new-arrival-2.png",
    price: 80,
    oldPrice: 100,
    createdAt: "2025-01-06T10:00:00Z",
    rating: 4.6,
    reviews: 75,
    sold: 310,
  },
];

type Category = string;

function formatBDT(n: number) {
  return `৳${Math.round(n)}`;
}
function discountPct(price: number, oldPrice: number) {
  const pct = Math.round(((oldPrice - price) / oldPrice) * 100);
  return Math.max(1, Math.min(90, pct));
}

// Helper functions
const normalizeProduct = (p: IProduct, categoryName?: string): DealItem => {
  const price = Number(p.productInfo?.salePrice || p.productInfo?.price || 0);
  const oldPrice = Number(p.productInfo?.price || price * 1.3);
  
  return {
    id: p._id,
    title: p.description?.name || "Product",
    category: categoryName || "General",
    image: p.featuredImg || p.gallery?.[0] || "/mens.png",
    price,
    oldPrice,
    createdAt: new Date().toISOString(),
    rating: 4.5,
    reviews: Math.floor(Math.random() * 100) + 20,
    sold: Math.floor(Math.random() * 500) + 100,
  };
};

export default function DealsMorePage() {
  useScrollToTop();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const [currentPage, setCurrentPage] = useState(1);
  const { data: paginatedData, isLoading, isFetching } = useGetPaginatedProductsQuery({ 
    page: currentPage, 
    limit: 20 
  });
  const { data: categories } = useGetAllCategoryQuery();
  const [activeCat, setActiveCat] = useState<Category>("All");
  const [sortBy, setSortBy] = useState<
    "newest" | "discount" | "price_asc" | "price_desc"
  >("newest");
  const [q, setQ] = useState("");
  const [minOff, setMinOff] = useState<0 | 10 | 20 | 30>(0);

  const categoryMap = useMemo(() => {
    if (!Array.isArray(categories)) return new Map();
    const map = new Map();
    categories.forEach((cat) => {
      const id = cat._id || cat.id || cat.slug || 'unknown';
      map.set(id, cat.name || cat.label || "Category");
    });
    return map;
  }, [categories]);

  const allCategories = useMemo(() => {
    const cats = ["All"];
    if (Array.isArray(categories)) {
      cats.push(...categories.map((cat) => cat.name || cat.label || "Category"));
    }
    return cats;
  }, [categories]);

  const hasNextPage = paginatedData?.pagination?.hasNextPage || false;
  
  const apiProducts = useMemo(() => {
    return paginatedData?.data || [];
  }, [paginatedData?.data]);

  const handleLoadMore = () => {
    if (hasNextPage && !isFetching) {
      setCurrentPage(prev => prev + 1);
    }
  };

  // Today's bounds logic from productApi
  const getTodayBounds = () => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    return { startMs: start.getTime(), endMs: end.getTime() };
  };

  const getCreatedAtMs = (p: IProduct): number => {
    const raw = p?.createdAt ?? (p as unknown as Record<string, unknown>)?.created_at ?? (p as unknown as Record<string, unknown>)?.createdOn ?? (p as unknown as Record<string, unknown>)?.date ?? null;
    if (!raw) return 0;
    const t = new Date(raw as string).getTime();
    return Number.isFinite(t) ? t : 0;
  };

  const allDeals = useMemo(() => {
    if (Array.isArray(apiProducts) && apiProducts.length > 0) {
      const { startMs, endMs } = getTodayBounds();
      
      // Filter for today's products (created today)
      const todaysProducts = apiProducts.filter((p: IProduct) => {
        const createdMs = getCreatedAtMs(p);
        return createdMs >= startMs && createdMs <= endMs;
      });
      
      // If no products created today, fallback to newest products
      const productsToUse = todaysProducts.length > 0 ? todaysProducts : apiProducts.slice(0, 10);
      
      return productsToUse.map((p: IProduct) => {
        const firstCategory = p.brandAndCategories?.categories?.[0];
        const categoryName = firstCategory ? categoryMap.get(firstCategory.name) : undefined;
        return normalizeProduct(p, categoryName);
      });
    }
    return FALLBACK_DEALS;
  }, [apiProducts, categoryMap]);

  const filtered: DealItem[] = useMemo(() => {
    let arr = allDeals.filter((p) =>
      activeCat === "All" ? true : p.category === activeCat
    );

    if (q.trim()) {
      const t = q.toLowerCase();
      arr = arr.filter((p) => p.title.toLowerCase().includes(t));
    }

    if (minOff > 0) {
      arr = arr.filter((p) => discountPct(p.price, p.oldPrice) >= minOff);
    }

    switch (sortBy) {
      case "price_asc":
        arr = arr.slice().sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        arr = arr.slice().sort((a, b) => b.price - a.price);
        break;
      case "discount":
        arr = arr
          .slice()
          .sort(
            (a, b) =>
              discountPct(b.price, b.oldPrice) -
              discountPct(a.price, a.oldPrice)
          );
        break;
      default: // newest
        arr = arr
          .slice()
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
    }

    return arr;
  }, [allDeals, activeCat, sortBy, q, minOff]);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFF3E9] via-white to-[#FFD7C4]" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-secondary flex items-center gap-2">
                <Flame className="w-7 h-7 text-primary" />
                More Deals
              </h1>
              <p className="text-sm sm:text-base text-secondary/60 mt-1">
                Today’s fresh deals—sorted your way.
              </p>
            </div>

            {/* Search */}
            <div className="w-full md:w-[380px]">
              <div className="flex items-center gap-2 rounded-xl border bg-white px-3 py-2 shadow-sm">
                <Search className="w-5 h-5 text-secondary/40" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search deals…"
                  className="w-full bg-transparent outline-none text-sm"
                />
                {q && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQ("")}
                    className="text-secondary/50"
                  >
                    <FilterX className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Category chips */}
          <div className="mt-4 flex flex-wrap gap-2">
            {allCategories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCat(c)}
                className={[
                  "h-9 rounded-full border px-4 text-sm transition",
                  activeCat === c
                    ? "bg-primary text-secondary border-primary"
                    : "bg-accent text-secondary border-neutral hover:bg-section",
                ].join(" ")}
                aria-pressed={activeCat === c}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Sort & Min Discount */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <SlidersHorizontal className="w-4 h-4" />
              <span>
                Showing <b>{filtered.length}</b> today&apos;s deal{filtered.length !== 1 ? 's' : ''}
              </span>

              {/* Quick Min %OFF */}
              <div className="ml-3 flex items-center gap-1">
                {[0, 5, 10, 20, 50].map((d) => (
                  <button
                    key={d}
                    onClick={() => setMinOff(d as 0 | 10 | 20 | 30)}
                    className={[
                      "h-7 rounded-full border px-3 text-xs transition",
                      minOff === d
                        ? "0 text-[#2e2e2e] bg-primary border-primary"
                        : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50",
                    ].join(" ")}
                    aria-pressed={minOff === d}
                  >
                    {d === 0 ? "Any" : `≥ ${d}% OFF`}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-secondary/60">Sort by:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(
                      (e.target as HTMLSelectElement).value as
                        | "newest"
                        | "discount"
                        | "price_asc"
                        | "price_desc"
                    )
                  }
                  className="appearance-none rounded-md border border-neutral bg-accent pl-3 pr-8 py-2 text-sm text-secondary"
                >
                  <option value="newest">Newest</option>
                  <option value="discount">Biggest Discount</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary/40" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="rounded-xl border bg-white p-3 animate-pulse h-[320px]" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-secondary/60">No deals found.</div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
              {filtered.map((p: DealItem) => {
              const pct = discountPct(p.price, p.oldPrice);
              const isNew =
                (Date.now() - new Date(p.createdAt).getTime()) / 36e5 < 48; // <48h

              return (
                <Card
                  key={p.id}
                  className="group relative rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  {/* Badges */}
                  <div className="absolute left-2 top-2 z-10 flex flex-col gap-1">
                    <span className="inline-block rounded-full bg-discount text-white text-[10px] px-2 py-0.5 font-semibold">
                      {pct}% OFF
                    </span>
                    {(p.badge || isNew) && (
                      <span className="inline-block rounded-full bg-primary text-secondary text-[10px] px-2 py-0.5 font-semibold">
                        {p.badge ?? "NEW"}
                      </span>
                    )}
                  </div>

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
                    <div className="min-h-[40px] text-sm font-medium text-secondary line-clamp-2">
                      {p.title}
                    </div>

                    <div className="mt-1 flex items-center gap-1 text-[11px] text-secondary/50">
                      {typeof p.rating === "number" ? (
                        <>
                          <Star className="w-3.5 h-3.5 text-yellow-500" />
                          <span>{p.rating.toFixed(1)}</span>
                        </>
                      ) : null}
                      {typeof p.reviews === "number" && (
                        <span>• {p.reviews} reviews</span>
                      )}
                      {typeof p.sold === "number" && (
                        <span>• {p.sold} sold</span>
                      )}
                    </div>

                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-xs text-secondary/40 line-through decoration-red-500">
                        {formatBDT(p.oldPrice)}
                      </span>
                      <span className="text-base font-semibold text-secondary">
                        {formatBDT(p.price)}
                      </span>
                    </div>

                    <div className="mt-3 flex gap-2">
                      <Link
                        href={`/product-details?id=${encodeURIComponent(p.id)}`}
                        className="flex-1"
                        aria-label={`View details of ${p.title}`}
                      >
                        <Button className="w-full">View</Button>
                      </Link>
                      <Button
                        variant="outline"
                        className={clsx("w-10 px-0", {
                          'bg-success hover:bg-success text-accent': cartItems.some(item => item.productId === p.id),
                          'hover:bg-primary hover:text-secondary': !cartItems.some(item => item.productId === p.id)
                        })}
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                          e.preventDefault();
                          e.stopPropagation();
                          
                          if (!cartItems.some(item => item.productId === p.id)) {
                            const cartItem = {
                              productId: p.id,
                              productName: p.title,
                              productImage: p.image,
                              unitPrice: p.price,
                              quantity: 1,
                              color: 'Default',
                              size: 'M',
                            };
                            dispatch(addToCart(cartItem));
                            toast.success("Added to cart successfully!");
                          }
                        }}
                        disabled={cartItems.some(item => item.productId === p.id)}
                        aria-label={cartItems.some(item => item.productId === p.id) ? "Added to cart" : "Add to cart"}
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
            </div>
            
            {hasNextPage && (
              <div className="mt-8 text-center">
                <Button
                  onClick={handleLoadMore}
                  disabled={isFetching}
                  className="px-8 py-2"
                >
                  {isFetching ? "Loading..." : "Load More Deals"}
                </Button>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}
