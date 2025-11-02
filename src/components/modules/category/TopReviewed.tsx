"use client";

import Link from "next/link";
import Image from "next/image";
import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import type { IProduct } from "@/types/product";

/** ---------- helpers (type-safe) ---------- */
const toNum = (v: unknown): number => {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string") {
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
};
const pickTitle = (p: IProduct) => p?.description?.name || p?.name || "Product";

/** ✅ BUG FIX: return যোগ করা হয়েছে */
const pickImage = (p: IProduct): string => {
  if (!p) return "/mens.png";
  const candidate =
    (p.featuredImg && p.featuredImg.trim() !== "" ? p.featuredImg : p?.gallery?.[0]) || "";
  return candidate || "/mens.png";
};

const formatBDT = (n: number) => `৳${Math.max(0, Math.round(n || 0))}`;

const createdAtTs = (p: IProduct): number => {
  const pi = (p as unknown as { productInfo?: { createdAt?: string } }).productInfo;
  const d = pi?.createdAt ?? p.createdAt ?? "";
  const ms = d ? new Date(d).getTime() : 0;
  return Number.isFinite(ms) ? ms : 0;
};

/** ---------- UI shape ---------- */
type UIItem = {
  id: string;
  title: string;
  image: string;
  price: number;     // show price (sale || price)
  rating: number;    // 0..5
  reviews: number;   // synthetic or 0
  fallback?: boolean;
};

/** ---------- Star view ---------- */
function Stars({ value }: { value: number }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <div className="flex items-center gap-0.5" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < full || (i === full && half);
        return (
          <svg
            key={i}
            className={`w-4 h-4 ${filled ? "text-yellow-500" : "text-gray-300"}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.036a1 1 0 00-1.175 0l-2.802 2.036c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.88 8.72c-.783-.57-.38-1.81.588-1.81H6.93a1 1 0 00.95-.69l1.07-3.292z" />
          </svg>
        );
      })}
    </div>
  );
}

/** ---------- Skeleton ---------- */
function SkeletonCard() {
  return (
    <div className="rounded-2xl border bg-white p-3 h-[320px] animate-pulse">
      <div className="h-36 bg-gray-100 rounded-lg" />
      <div className="mt-3 h-4 bg-gray-100 rounded" />
      <div className="mt-2 h-4 w-2/3 bg-gray-100 rounded" />
      <div className="mt-6 h-9 bg-gray-100 rounded" />
    </div>
  );
}

/** ---------- map: real reviewed ---------- */
function mapRealReviewed(list: IProduct[], limit: number): UIItem[] {
  const withRating = list
    .map((p) => ({
      id: p._id,
      title: pickTitle(p),
      image: pickImage(p),
      price: toNum(p?.productInfo?.salePrice) || toNum(p?.productInfo?.price),
      rating: typeof p.rating === "number" ? Math.max(0, Math.min(5, p.rating)) : 0,
      reviews: 0,
    }))
    .filter((x) => x.rating > 0);

  return withRating
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
}

/** ---------- map: fallback from existing data ---------- */
function mapFallbackFromData(list: IProduct[], limit: number): UIItem[] {
  const sorted = list.slice().sort((a, b) => createdAtTs(b) - createdAtTs(a));
  const ratingPool = [4.2, 4.4, 4.5, 4.6, 4.7, 4.8];

  return sorted.slice(0, limit).map((p, i) => {
    const base = toNum(p?.productInfo?.salePrice) || toNum(p?.productInfo?.price) || 0;
    return {
      id: p._id,
      title: pickTitle(p),
      image: pickImage(p),
      price: base || 1200 + i * 60,
      rating: ratingPool[i % ratingPool.length],
      reviews: 50 + i * 7,
      fallback: true,
    };
  });
}

/** ---------- static fallback ---------- */
const STATIC_FALLBACK: UIItem[] = [
  { id: "r1", title: "Portable Chair", image: "/new-arrival-1.png", price: 1500, rating: 4.5, reviews: 112, fallback: true },
  { id: "r2", title: "Summer T-Shirt", image: "/new-arrival-2.png", price: 900, rating: 4.6, reviews: 86, fallback: true },
  { id: "r3", title: "Casual Pants", image: "/new-arrival-3.png", price: 1450, rating: 4.4, reviews: 73, fallback: true },
  { id: "r4", title: "Analog Watch", image: "/new-arrival-4.png", price: 2200, rating: 4.7, reviews: 128, fallback: true },
  { id: "r5", title: "Smart Watch", image: "/man-model.png", price: 2800, rating: 4.5, reviews: 94, fallback: true },
  { id: "r6", title: "Sneakers", image: "/mens.png", price: 3200, rating: 4.6, reviews: 77, fallback: true },
];

/** ---------- Component ---------- */
type Props = {
  data?: IProduct[];
  loading?: boolean;
  error?: boolean;
  title?: string;
  limit?: number;
};

function TopReviewedImpl({
  data = [],
  loading = false,
  error = false,
  title = "Top Reviewed Products",
  limit = 6,
}: Props) {
  const items = useMemo<UIItem[]>(() => {
    // 1) real reviewed (rating>0)
    const real = Array.isArray(data) ? mapRealReviewed(data, limit) : [];
    if (real.length > 0) return real;

    // 2) fallback from given data
    if (Array.isArray(data) && data.length > 0) {
      return mapFallbackFromData(data, limit);
    }

    // 3) static fallback
    return STATIC_FALLBACK.slice(0, limit);
  }, [data, limit]);

  

  const isFallback = items.some((x) => x.fallback);



  return (
    <section className="w-full">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        {/* Header */}
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-bold sm:text-xl text-secondary">{title}</h3>
          <Link href="/reviews" className="text-sm text-highlight hover:underline hover:text-primary">
            View all
          </Link>
        </div>

        {!loading && !error && isFallback && (
          <div className="mb-3 rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-xs text-blue-800">
            Showing smart picks as we couldn&apos;t find rated products right now.
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {Array.from({ length: limit }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
          <p className="text-secondary/60">Failed to load products</p>
        </div>
        ) : (
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0, y: 8 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: 0.06, duration: 0.25 },
              },
            }}
          >
            {items.map((p) => (
              <motion.div
                key={p.id}
                variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="group relative rounded-2xl border bg-white p-3 h-[320px] shadow-sm hover:shadow-md"
              >
                {/* badge */}
                {p.fallback && (
                  <span className="absolute top-2 right-2 z-10 rounded-md px-2 py-0.5 text-[11px] font-semibold text-accent bg-secondary/90">
                    Smart picks
                  </span>
                )}

                <Link
                  href={`/product-details?id=${encodeURIComponent(p.id)}`}
                  aria-label={`View ${p.title}`}
                  className="flex h-full flex-col"
                >
                  {/* image */}
                  <div className="relative mx-auto grid h-32 w-full max-w-[180px] place-items-center sm:h-36 md:h-40">
                    <Image
                      src={p.image || "/man-model.png"}
                      alt={p.title}
                      fill
                      className="object-contain rounded-md transition-transform duration-300 group-hover:scale-95"
                      sizes="(min-width:1024px) 16vw, (min-width:640px) 33vw, 50vw"
                      /** রিমোট ইউআরএল হলে unoptimized=true */
                      unoptimized={p.image?.startsWith("http")}
                      loading="lazy"
                    />
                  </div>

                  {/* title */}
                  <div className="mt-3 line-clamp-2 h-[42px] text-center text-[13px] font-medium text-secondary sm:text-sm">
                    {p.title}
                  </div>

                  {/* rating */}
                  <div className="mt-1 flex items-center justify-center gap-2">
                    <Stars value={p.rating} />
                    <span className="text-xs text-secondary/60">({p.reviews})</span>
                  </div>

                  {/* price */}
                  <div className="mt-2 flex min-h-[24px] items-center justify-center">
                    <span className="text-sm font-semibold text-secondary sm:text-base">
                      {formatBDT(p.price)}
                    </span>
                  </div>

                  {/* CTA */}
                  <div className="mt-auto">
                    <span className="inline-flex w-full items-center justify-center h-9 rounded-md text-highlight text-sm font-bold hover:text-primary transition-colors">
                      View details
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

const TopReviewed = memo(TopReviewedImpl);
export default TopReviewed;
