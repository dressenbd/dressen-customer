// src/components/search/SmartSearch.tsx
"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Search, X } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { useGetAllProductsQuery } from "@/redux/featured/product/productApi";
import type { IProduct } from "@/types/product";

/** --- UI Suggestion টাইপ (সবসময় স্টেবল) --- */
type Suggestion = {
  id: string;
  title: string;
  slug?: string;
  thumb: string;
  price: number | null;
  brand?: string;
};

/** --- সেফ নাম্বার কনভার্টার --- */
const toNum = (v: unknown): number | null => {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string") {
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  }
  return null;
};

/** --- IProduct ➜ Suggestion (টাইপ-সেইফ নর্মালাইজার) --- */
function toSuggestion(p: IProduct): Suggestion {
  const title = p?.description?.name || p?.name || "Untitled";
  const thumb =
    p?.featuredImg ||
    (Array.isArray(p?.gallery) && p.gallery[0]) ||
    "/placeholder.png";

  const price =
    toNum(p?.productInfo?.salePrice) ??
    toNum(p?.productInfo?.price) ??
    toNum((p as { price?: unknown })?.price) ??
    null;

  const brand =
    typeof p?.brandAndCategories?.brand === "string"
      ? p.brandAndCategories.brand
      : (p?.brandAndCategories?.brand as { name?: string })?.name;

  return {
    id: String(p?._id),
    title,
    slug: p?.description?.slug,
    thumb: thumb || "/placeholder.png",
    price,
    brand: brand || undefined,
  };
}

/** --- ম্যাচিং/স্কোরিং (সিম্পল কিন্তু কাজে লাগে) --- */
function score(item: Suggestion, q: string): number {
  const query = q.trim().toLowerCase();
  if (!query) return 0;

  let s = 0;
  let matched = false;

  const title = item.title.toLowerCase();
  if (title.startsWith(query)) {
    s += 4;
    matched = true;
  } else if (title.includes(query)) {
    s += 2;
    matched = true;
  }

  if (item.brand) {
    const b = item.brand.toLowerCase();
    if (b.startsWith(query)) {
      s += 2;
      matched = true;
    } else if (b.includes(query)) {
      s += 1;
      matched = true;
    }
  }

  if (!matched) return 0;

  // সামান্য bonus: সস্তা হলে প্রায়োরিটি
  if (typeof item.price === "number" && item.price > 0) {
    s += 0.25;
  }

  return s;
}

/** --- টাকা ফরম্যাট (BDT) --- */
const formatBDT = (n: number) => `৳${Math.round(n)}`;

/** --- SmartSearch (ইনপুট+সাজেশন) --- */
export default function SmartSearch({
  placeholder = "Search Product...",
  maxResults = 8,
  className = "",
  onSearch, // নতুন prop যোগ করুন
}: {
  placeholder?: string;
  maxResults?: number;
  className?: string;
  onSearch?: (query: string) => void; // Optional search handler
}) {
  const router = useRouter();

  // লোকাল কন্ট্রোলড ইনপুট
  const [query, setQuery] = useState("");
  const debounced = useDebounce(query, 280);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // ফুল লিস্ট (RTK Query) – শুধু ফ্রন্টএন্ড ফিল্টার
  const { data: products, isLoading, isError } = useGetAllProductsQuery();



  // সাজেশন বানাও
  const suggestions = useMemo(() => {
    const src = Array.isArray(products) ? products : [];
    const all = src.map(toSuggestion);

    const q = debounced.trim().toLowerCase();
    if (q.length < 2) return []; // ২ অক্ষরের আগে সাজেশন দিচ্ছি না

    return all
      .map((it) => ({ it, s: score(it, q) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, maxResults)
      .map((x) => x.it);
  }, [products, debounced, maxResults]);

  // সার্চ হ্যান্ডলার
  const handleSearch = (searchQuery: string = query) => {
    const q = searchQuery.trim();
    if (!q) return;

    if (onSearch) {
      // যদি parent component থেকে onSearch function থাকে
      onSearch(q);
    } else {
      // Default behavior
      router.push(`/product-listing?search=${encodeURIComponent(q)}`);
    }
    setOpen(false);
  };

  // ইনপুটে কিছু লিখলেই ড্রপডাউন খুলো
  useEffect(() => {
    setOpen(debounced.trim().length >= 2);
    setActiveIndex(-1);
  }, [debounced]);

  // সিলেক্ট করলে ন্যাভিগেট
  const gotoProduct = (p: Suggestion) => {
    router.push(`/product-details?id=${encodeURIComponent(p.id)}`);
    setOpen(false);
  };

  // কীবোর্ড হ্যান্ডলিং
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) =>
        Math.min((i < 0 ? -1 : i) + 1, suggestions.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      if (activeIndex >= 0 && suggestions[activeIndex]) {
        e.preventDefault();
        gotoProduct(suggestions[activeIndex]);
      } else {
        // Enter press করলে সার্চ execute হবে
        handleSearch();
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div className={`relative w-full ${className}`}>
      {/* Input with Integrated Search Button */}
      <div className="relative flex items-center">
        {/* Search Icon - Left */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
          <Search size={18} className="text-gray-500" />
        </div>

        {/* Input Field */}
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          aria-label="Search products"
          dir="auto"
          className="w-full h-11 pl-10 pr-20 rounded-full outline-none bg-white text-sm md:text-base text-gray-900 placeholder-gray-500 border border-gray-200 lg:bg-transparent lg:border-[#facf35]"
        />

        {/* Clear Button - Inside Right */}
        {query && (
          <button
            type="button"
            className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 p-1"
            onClick={() => {
              setQuery("");
              setOpen(false);
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}

        {/* Search Button - Inside Right */}
        <button
          type="button"
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#facf35] text-[#2e2e2e] rounded-r-3xl p-3 hover:bg-[#6b4c3e] transition-colors flex items-center justify-center"
          aria-label="Search"
          onClick={() => handleSearch()}
        >
          <Search size={18} className="flex-shrink-0" />
        </button>
      </div>

      {/* Suggestions Panel - Responsive */}
      {open && (
        <div
          ref={listRef}
          role="listbox"
          aria-label="Search suggestions"
          className="absolute z-80 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg overflow-hidden max-h-80 overflow-y-auto"
        >
          {/* Loading state */}
          {isLoading && (
            <div className="p-3 space-y-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded animate-pulse" />
                  <div className="flex-1">
                    <div className="h-3 bg-gray-100 rounded w-3/4 animate-pulse mb-2" />
                    <div className="h-2 bg-gray-100 rounded w-1/2 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {!isLoading && isError && (
            <div className="p-3 text-sm text-gray-600 text-center">
              Couldn not load products. Try again.
            </div>
          )}

          {/* Results */}
          {!isLoading && !isError && suggestions.length > 0 && (
            <ul className="py-1">
              {suggestions.map((s, idx) => (
                <li
                  key={s.id}
                  role="option"
                  aria-selected={idx === activeIndex}
                  className={`flex items-center gap-3 px-3 py-2 cursor-pointer border-b border-gray-100 last:border-b-0 ${
                    idx === activeIndex ? "bg-gray-50" : ""
                  } hover:bg-gray-50 transition-colors`}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => gotoProduct(s)}
                >
                  {/* Product Image */}
                  <div className="relative w-10 h-10 shrink-0 rounded overflow-hidden border border-gray-200">
                    <Image
                      src={s.thumb}
                      alt={s.title}
                      fill
                      className="object-cover"
                      sizes="40px"
                      unoptimized={s.thumb.startsWith("http")}
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className="truncate text-sm font-medium text-gray-900">
                      {s.title}
                    </div>
                    {s.brand && (
                      <div className="truncate text-xs text-gray-500 mt-0.5">
                        {s.brand}
                      </div>
                    )}
                  </div>

                  {/* Price */}
                  {typeof s.price === "number" && (
                    <div className="text-sm font-semibold text-[#facf35] shrink-0 ml-2">
                      {formatBDT(s.price)}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}

          {/* Empty state */}
          {!isLoading &&
            !isError &&
            suggestions.length === 0 &&
            debounced.trim().length >= 2 && (
              <div className="p-4 text-center text-sm text-gray-600">
                No results for{" "}
                <span className="font-medium">&quot;{debounced}&quot;</span>
                <div className="text-xs text-gray-500 mt-1">
                  Try different keywords
                </div>
              </div>
            )}

          {/* Helper for very short input */}
          {!isLoading && debounced.trim().length < 2 && (
            <div className="p-3 text-sm text-gray-500 text-center">
              Type at least 2 characters...
            </div>
          )}
        </div>
      )}
    </div>
  );
}
