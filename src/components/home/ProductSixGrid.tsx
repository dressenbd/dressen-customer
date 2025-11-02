"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { useGetAllProductsQuery } from "@/redux/featured/product/productApi";
import { IProduct } from "@/types/product";

type RemoteImage = string | { url?: string } | null | undefined;

type RemoteProduct = {
  _id?: string;
  id?: string;
  slug?: string;
  name?: string;
  title?: string;
  label?: string;
  featuredImg?: string;
  gallery?: string[];
  image?: RemoteImage;
  images?: Array<string | { url?: string }>;
  thumbnail?: string;
  price?:
    | number
    | string
    | {
        regular?: number | string;
        sale?: number | string;
      };
  mrp?: number | string;
  oldPrice?: number | string;
  offerPrice?: number | string;
  discountPrice?: number | string;
  currentPrice?: number | string;
  [key: string]: unknown;
  productInfo?: {
    // ✅ Added this for IProduct compatibility
    price?: number | string;
    salePrice?: number | string;
  };
  description?: {
    // ✅ Added this for IProduct compatibility
    name?: string;
  };
};

type UProduct = {
  id: string;
  title: string;
  image: string;
  mrp?: number | null;
  sale?: number | null;
};

type Props = {
  title?: string;
  useQuery?: () => { data?: IProduct[]; isLoading: boolean; error?: unknown };
  fallback?: RemoteProduct[];
};


// Type guards to distinguish between IProduct and RemoteProduct
const isIProduct = (p: RemoteProduct | IProduct): p is IProduct => {
  return "productInfo" in p && "description" in p;
};

// Converts value to number, returns null if invalid
const toNumber = (v: unknown): number | null => {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string") {
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  }
  return null;
};

// Picks product title from multiple possible fields
const pickTitle = (p: RemoteProduct | IProduct): string => {
  if (isIProduct(p)) {
    return p.description?.name || "Product";
  }

  // Handle RemoteProduct structure
  return (
    (typeof p.name === "string" ? p.name : undefined) ??
    (typeof p.title === "string" ? p.title : undefined) ??
    (typeof p.label === "string" ? p.label : undefined) ??
    "Product"
  );
};
const pickImage = (p: RemoteProduct | IProduct): string => {
  // For IProduct structure
  if (isIProduct(p)) {
    // Priority: featuredImg -> gallery[0] -> fallback
    if (typeof p.featuredImg === "string" && p.featuredImg.trim() !== "") {
      return p.featuredImg;
    }
    if (
      Array.isArray(p.gallery) &&
      p.gallery.length > 0 &&
      typeof p.gallery[0] === "string"
    ) {
      return p.gallery[0];
    }
    return "/mens.png";
  }

  // For RemoteProduct structure
  // Priority: featuredImg -> gallery[0] -> image -> thumbnail -> images[0] -> fallback
  if (typeof p.featuredImg === "string" && p.featuredImg.trim() !== "") {
    return p.featuredImg;
  }

  if (
    Array.isArray(p.gallery) &&
    p.gallery.length > 0 &&
    typeof p.gallery[0] === "string"
  ) {
    return p.gallery[0];
  }

  const candidate: RemoteImage =
    p.image ??
    p.thumbnail ??
    (Array.isArray(p.images) ? p.images[0] : undefined);

  const asStr =
    typeof candidate === "string"
      ? candidate
      : candidate &&
        typeof candidate === "object" &&
        "url" in candidate &&
        typeof candidate.url === "string"
      ? candidate.url
      : undefined;

  return asStr && asStr.trim() !== ""
    ? asStr.startsWith("/") || asStr.startsWith("http")
      ? asStr
      : `/${asStr}`
    : "/mens.png";
};

// Picks MRP (regular price) from multiple possible fields
const pickMrp = (p: RemoteProduct | IProduct): number | null => {
  if (isIProduct(p)) {
    return toNumber(p.productInfo?.price);
  }

  // Handle RemoteProduct structure
  const fromNested =
    typeof p.price === "object" && p.price !== null && "regular" in p.price
      ? toNumber(p.price.regular)
      : null;

  return (
    fromNested ??
    toNumber(p.mrp) ??
    (typeof p.price !== "object" ? toNumber(p.price) : null) ??
    toNumber(p.oldPrice)
  );
};

// Picks sale price from multiple possible fields
const pickSale = (p: RemoteProduct | IProduct): number | null => {
  if (isIProduct(p)) {
    return toNumber(p.productInfo?.salePrice);
  }

  // Handle RemoteProduct structure
  const fromNested =
    typeof p.price === "object" && p.price !== null && "sale" in p.price
      ? toNumber(p.price.sale)
      : null;

  return (
    fromNested ??
    toNumber(p.offerPrice) ??
    toNumber(p.discountPrice) ??
    toNumber(p.currentPrice)
  );
};

// Normalizes product data to a consistent UProduct format
const normalizeProduct = (p: RemoteProduct | IProduct, i: number): UProduct => {
  const id = isIProduct(p)
    ? p._id
    : (typeof p._id === "string" ? p._id : undefined) ??
      (typeof p.id === "string" ? p.id : undefined) ??
      (typeof p.slug === "string" ? p.slug : undefined) ??
      `idx-${i}`;

  const title = pickTitle(p);
  const image = pickImage(p);
  const mrp = pickMrp(p);
  const sale = pickSale(p);

  return { id: String(id), title, image, mrp, sale };
};

// Formats number to BDT currency
const formatBDT = (n: number): string => `৳${Math.round(n)}`;

// Calculates discount percentage
const discountPct = (mrp?: number | null, sale?: number | null): number => {
  if (!mrp || !sale || mrp <= sale) return 30;
  const pct = Math.round(((mrp - sale) / mrp) * 100);
  return Math.max(1, Math.min(90, pct));
};

export default function ProductSixGrid({
  title = "Featured Deals",
  useQuery = () => useGetAllProductsQuery(),
  fallback = [],
}: Props) {
  const { data: fetched, isLoading, error } = useQuery();

  // Select data source: fetched data or fallback
  const source: (RemoteProduct | IProduct)[] = useMemo(() => {
    const data =
      Array.isArray(fetched) && fetched.length > 0 ? fetched : fallback;
    return data;
  }, [fetched, fallback]);

  // Normalize products to UProduct format, limit to 6
  const items: UProduct[] = useMemo(
    () => source.slice(0, 6).map(normalizeProduct),
    [source]
  );

  return (
    <section className="w-full bg-white">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        <h2 className="text-lg sm:text-xl font-semibold text-secondary mb-3">
          {title}
        </h2>

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-lg border bg-white p-3 animate-pulse h-[320px]"
              />
            ))}
          </div>
        ) : error ? (
           <div className="text-center py-12">
          <p className="text-secondary/60">Failed to load products</p>
        </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4">
            {items.map((p) => {
              const sale = p.sale ?? (p.mrp ? Math.round(p.mrp * 0.7) : 0);
              const mrp = p.mrp ?? undefined;
              const pct = discountPct(mrp, sale);

              return (
                <Link
                  key={p.id}
                  href={`/product-details?id=${encodeURIComponent(p.id)}`}
                  className="group relative rounded-lg border bg-white overflow-hidden p-3 flex flex-col h-[320px] hover:shadow-md transition-shadow duration-300"
                  aria-label={`View details for ${p.title}`}
                >
                  <span className="absolute top-2 right-2 z-10 px-2 py-0.5 rounded-md text-[11px] font-semibold  bg-red-500 text-white">
                    {pct}%
                  </span>

                  <div className="relative mx-auto w-full max-w-[180px] h-28 sm:h-32 md:h-36 grid place-items-center">
                    <Image
                      src={p.image || "/mens.png"}
                      alt={p.title}
                      fill
                      sizes="(min-width:1280px) 16vw, (min-width:1024px) 20vw, (min-width:640px) 33vw, 50vw"
                      className="object-contain transition-transform duration-300 group-hover:scale-95"
                      unoptimized={p.image.startsWith("http")}
                    />
                  </div>

                  <div className="mt-3 text-center text-[13px] sm:text-sm font-medium text-secondary min-h-[40px]">
                    {p.title}
                  </div>

                  <div className="mt-2 flex items-center justify-center gap-2 min-h-[24px]">
                    {typeof mrp === "number" ? (
                      <span className="text-xs sm:text-sm text-secondary/40 line-through decoration-red-500">
                        {formatBDT(mrp)}
                      </span>
                    ) : null}
                    <span className="text-sm sm:text-base font-semibold text-secondary">
                      {formatBDT(sale || mrp || 0)}
                    </span>
                  </div>

                  <div className="mt-auto">
                    <button className="inline-flex w-full items-center justify-center h-9 rounded-md text-highlight text-sm font-bold hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                      Buy now
                    </button>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
