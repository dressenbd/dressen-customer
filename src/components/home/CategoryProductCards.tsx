"use client";

/**
 * কী হচ্ছে (ধাপে ধাপে):
 * 1) ক্যাটাগরি + প্রোডাক্ট—দুই API থেকে ডেটা আনি।
 * 2) URL থেকে selectedKey (?category|?slug|?cat) নেই — slug/id/name যাই হোক।
 * 3) ক্যাটাগরিকে normalize করি (id/slug/label/image/subCategories)।
 * 4) নির্বাচিত ক্যাটাগরিকে tokens-এ ভাঙি: { id, slug, name } lowercase।
 * 5) প্রতিটি প্রোডাক্টের category tokens নেই: ids/slugs/names (brandAndCategories.categories + product.categories)।
 * 6) exact equality ম্যাচ (id OR slug OR name) — কোনো partial match না।
 * 7) selected থাকলে matched.slice(0,3); selected না থাকলে হোম ডিফল্ট first 3।
 * 8) selected থাকলেও matched ফাঁকা হলে → fallback নয়; empty state দেখাই。
 */

import Image from "next/image";
import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetAllCategoryQuery, type RemoteCategory } from "@/redux/featured/category/categoryApi";
import { useGetAllProductsQuery } from "@/redux/featured/product/productApi";
import type { IProduct } from "@/types/product";

/* ---------- safe access helpers (no any) ---------- */
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
function getArray(o: unknown, k: string): unknown[] {
  const v = getProp(o, k);
  return Array.isArray(v) ? v : [];
}

/* ---------- category normalize ---------- */
type UICategory = {
  id: string;
  slug?: string;
  label: string;
  image?: string;
  sub: { id: string; slug?: string; label: string }[];
};

function normCategory(c: RemoteCategory): UICategory {
  const id = String((c._id ?? c.id ?? c.slug ?? "") || "");
  const slug = typeof c.slug === "string" ? c.slug : undefined;
  const label = String(getStr(c, "name") ?? getStr(c, "label") ?? "Category");

  const icon = getProp(c, "icon");
  const iconUrl = isRecord(icon) ? getStr(icon, "url") : undefined;
  const image = iconUrl ?? getStr(c, "image") ?? undefined;

  // আপনার ডেটায় subCategories আছে
  const rawSub = getArray(c, "subCategories");
  const sub = rawSub.map((sc) => {
    const sid =
      (isRecord(sc) && (getStr(sc, "_id") ?? getStr(sc, "id") ?? getStr(sc, "slug"))) || "";
    const sslug = isRecord(sc) ? getStr(sc, "slug") : undefined;
    const slabel =
      (isRecord(sc) && (getStr(sc, "name") ?? getStr(sc, "label"))) || "Subcategory";
    return { id: String(sid), slug: sslug, label: String(slabel) };
  });

  return { id, slug, label, image, sub };
}

/* ---------- product helpers ---------- */
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

/** প্রোডাক্টের ক্যাটাগরি টোকেন (ids/slugs/names) — lowercase string arrays */
function productCategoryTokens(p: IProduct): { ids: string[]; slugs: string[]; names: string[] } {
  const ids: string[] = [];
  const slugs: string[] = [];
  const names: string[] = [];

  // brandAndCategories.categories
  const bac = getProp(p as unknown, "brandAndCategories");
  const bcats = isRecord(bac) ? getArray(bac, "categories") : [];

  for (const item of bcats) {
    if (typeof item === "string") {
      const t = item.trim().toLowerCase();
      ids.push(t); slugs.push(t); names.push(t);
    } else if (isRecord(item)) {
      const id = getStr(item, "_id") ?? getStr(item, "id");
      const slug = getStr(item, "slug");
      const nm = getStr(item, "name") ?? getStr(item, "label");
      if (id) ids.push(id.toLowerCase());
      if (slug) slugs.push(slug.toLowerCase());
      if (nm) names.push(nm.trim().toLowerCase());
    }
  }

  // fallback: p.categories: string[]
  const flat = getArray(p as unknown, "categories");
  for (const v of flat) {
    if (typeof v === "string") {
      const t = v.trim().toLowerCase();
      ids.push(t); slugs.push(t); names.push(t);
    }
  }

  return { ids, slugs, names };
}

/** নির্বাচিত ক্যাটাগরির টোকেন */
function selectedTokens(cat?: UICategory | null): { id?: string; slug?: string; name?: string } {
  if (!cat) return {};
  return {
    id: cat.id.toLowerCase(),
    slug: cat.slug?.toLowerCase(),
    name: cat.label.trim().toLowerCase(),
  };
}

/** exact match: id OR slug OR name */
function matchesCategory(p: IProduct, t: { id?: string; slug?: string; name?: string }): boolean {
  const { id, slug, name } = t;
  if (!id && !slug && !name) return true; // selected নেই (হোম ডিফল্ট)
  const { ids, slugs, names } = productCategoryTokens(p);
  if (id && ids.includes(id)) return true;
  if (slug && slugs.includes(slug)) return true;
  if (name && names.includes(name)) return true;
  return false;
}

/* ---------- Component ---------- */
export default function CategoryProductCards() {
  const { data: catData } = useGetAllCategoryQuery();
  const { data: prodData } = useGetAllProductsQuery();

  const router = useRouter();
  const params = useSearchParams();

  // URL selected key (slug/id/name)
  const selectedKey = (params.get("category") || params.get("slug") || params.get("cat") || "")
    .trim()
    .toLowerCase();

  // ক্যাটাগরি normalize
  const categories = useMemo<UICategory[]>(() => {
    const raw: RemoteCategory[] = Array.isArray(catData) ? catData : [];
    return raw.map(normCategory);
  }, [catData]);

  // selected ক্যাটাগরি resolve: id → slug → name
  const selected = useMemo<UICategory | null>(() => {
    if (!selectedKey) return null;
    return (
      categories.find((c) => c.id.toLowerCase() === selectedKey) ??
      categories.find((c) => (c.slug ? c.slug.toLowerCase() === selectedKey : false)) ??
      categories.find((c) => c.label.toLowerCase() === selectedKey) ??
      null
    );
  }, [categories, selectedKey]);

  // সব প্রোডাক্ট
  const allProducts = useMemo<IProduct[]>(
    () => (Array.isArray(prodData) ? prodData : []),
    [prodData]
  );

  // টোকেন + ম্যাচড
  const selTok = useMemo(() => selectedTokens(selected), [selected]);

  // ✅ selected থাকলে কেবল matched; selected না থাকলে first 3 (হোম ডিফল্ট)
  const matched = useMemo(() => {
    if (!selected) return allProducts.slice(0, 3);
    return allProducts.filter((p) => matchesCategory(p, selTok)).slice(0, 3);
  }, [allProducts, selected, selTok]);

  const items = useMemo(
    () =>
      matched.map((p) => ({
        id: productId(p),
        title: productTitle(p),
        image: productImage(p),
        priceText: productPriceText(p),
      })),
    [matched]
  );

  const showEmpty = !!selected && items.length === 0;

  const goDetails = (pid: string) =>
    router.push(`/product-details?id=${encodeURIComponent(pid)}`);

  return (
    <section id="category-product-cards" className="w-full bg-white">
      <div className="container mx-auto px-3 md:px-4 xl:px-6">
        {showEmpty ? (
          <div className="py-6 text-center text-sm text-gray-600">
            There is no product in this Category.
          </div>
        ) : (
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
        )}
      </div>
    </section>
  );
}