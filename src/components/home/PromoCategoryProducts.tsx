"use client";

import Image from "next/image";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useGetAllPromoProductsQuery, useGetProductsByPromoCategoryQuery } from "@/redux/featured/promoCategory/promoCategoryApi";
import type { IProduct } from "@/types/product";

function isRecord(v: unknown): v is Record<string, unknown> {
  return !!v && typeof v === "object";
}
function getProp(o: unknown, k: string): unknown {
  return isRecord(o) && k in o ? (o as Record<string, unknown>)[k] : undefined;
}
function getStr(o: unknown, k: string): string | undefined {
  const v = getProp(o, k);
  return typeof v === "string" ? v : undefined;
}

function productId(p: IProduct): string {
  const id = getStr(p as unknown, "_id") ?? getStr(p as unknown, "id") ?? getStr(p as unknown, "slug") ?? "";
  return String(id);
}
function productTitle(p: IProduct): string {
  return (
    getStr(p as unknown, "name") ??
    (isRecord(getProp(p as unknown, "description")) ? getStr(getProp(p as unknown, "description"), "name") : undefined) ??
    getStr(p as unknown, "title") ??
    getStr(p as unknown, "label") ??
    "Product"
  );
}
function isValidImageUrl(src: string): boolean {
  try {
    const u = new URL(src);
    const ok = u.protocol === "http:" || u.protocol === "https:";
    if (!ok) return false;
    const looksImg = /\.(png|jpe?g|gif|webp|avif|svg)$/i.test(u.pathname);
    const known = /res\.cloudinary\.com$|images\.unsplash\.com$|picsum\.photos$/.test(u.hostname);
    return looksImg || known;
  } catch {
    return false;
  }
}
function productImage(p: IProduct): string | undefined {
  const feat = getProp(p as unknown, "featuredImg");
  const gal = getProp(p as unknown, "gallery");
  const image = getStr(p as unknown, "image");

  if (typeof feat === "string" && isValidImageUrl(feat)) return feat;
  if (Array.isArray(feat)) {
    const f = feat.find((x) => typeof x === "string" && isValidImageUrl(x));
    if (typeof f === "string") return f;
  }
  if (Array.isArray(gal)) {
    const g = gal.find((x) => typeof x === "string" && isValidImageUrl(x));
    if (typeof g === "string") return g;
  }
  if (image && isValidImageUrl(image)) return image;
  return undefined;
}
function productPriceText(p: IProduct): string | undefined {
  const info = getProp(p as unknown, "productInfo");
  const sale = isRecord(info) ? getStr(info, "salePrice") : undefined;
  const saleNum = sale ? Number(sale) : undefined;
  const price = isRecord(info) ? getStr(info, "price") : undefined;
  const priceNum = price ? Number(price) : undefined;

  const num =
    typeof saleNum === "number" && Number.isFinite(saleNum)
      ? saleNum
      : typeof priceNum === "number" && Number.isFinite(priceNum)
      ? priceNum
      : undefined;

  return typeof num === "number" ? `৳ ${Math.round(num)}` : undefined;
}

export default function PromoCategoryProducts({ selectedPromoCategoryId }: { selectedPromoCategoryId: string | null }) {
  const { data: allPromoData, isLoading: allLoading } = useGetAllPromoProductsQuery(undefined, {
    skip: !!selectedPromoCategoryId,
  });
  const { data: categoryPromoData, isLoading: categoryLoading } = useGetProductsByPromoCategoryQuery(selectedPromoCategoryId || "", {
    skip: !selectedPromoCategoryId,
  });

  const prodData = selectedPromoCategoryId ? categoryPromoData : allPromoData;
  const isLoading = selectedPromoCategoryId ? categoryLoading : allLoading;

  const router = useRouter();

  const allProducts = useMemo<IProduct[]>(
    () => (Array.isArray(prodData) ? prodData : []),
    [prodData]
  );

  const items = useMemo(
    () =>
      allProducts.slice(0, 3).map((p) => ({
        id: productId(p),
        title: productTitle(p),
        image: productImage(p),
        priceText: productPriceText(p),
      })),
    [allProducts]
  );

  const goDetails = (pid: string) =>
    router.push(`/product-details?id=${encodeURIComponent(pid)}`);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-64 bg-gray-200 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return null;
  }

  return (
    <div id="promo-category-products" className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {items.map((it) => {
              const src = it.image && isValidImageUrl(it.image) ? it.image : "/placeholder.png";
              return (
                <button
                  key={it.id}
                  onClick={() => goDetails(it.id)}
                  className="group text-left"
                  aria-label={`View ${it.title}`}
                >
                  <div className="relative rounded-lg border bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-col items-center justify-center p-4">
                      <div className="relative w-full max-w-[320px] aspect-[4/3] grid place-items-center">
                        <Image
                          src={src}
                          alt={it.title}
                          fill
                          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                          className="object-contain transition-transform duration-300 group-hover:scale-95"
                        />
                      </div>
                      <p className="mt-3 text-center text-sm md:text-base font-medium text-gray-800 line-clamp-1">
                        {it.title}
                      </p>
                      {it.priceText && (
                        <p className="text-center text-sm text-orange-600 font-semibold">
                          {it.priceText}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
      </div>
    </div>
  );
}
