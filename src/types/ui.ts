// src/types/ui.ts
import type { IProduct, ProductData, CategoryShape, TagShape } from "@/types/product";

export type UIProduct = {
  id: string;
  title: string;
  image: string;
  price: number;
  salePrice?: number | null;
  status?: string;
  tags?: string[];
  categories?: string[];
};

// helpers
const asString = (v: unknown, fallback = ""): string =>
  typeof v === "string" ? v : fallback;

const asNumber = (v: unknown, fallback = 0): number => {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  const n = typeof v === "string" ? Number(v) : NaN;
  return Number.isFinite(n) ? n : fallback;
};

const normalizeNames = (list: unknown): string[] => {
  if (!Array.isArray(list)) return [];
  return list.flatMap((item) => {
    if (typeof item === "string") return [item];
    if (item && typeof item === "object" && "name" in (item as object)) {
      const nm = (item as { name?: unknown }).name;
      return typeof nm === "string" ? [nm] : [];
    }
    return [];
  });
};

// type guards
export const isIProduct = (v: unknown): v is IProduct => {
  if (!v || typeof v !== "object") return false;
  const o = v as Partial<IProduct>;
  return typeof o.featuredImg === "string" && !!o.productInfo && !!o.description;
};

export const isProductData = (v: unknown): v is ProductData => {
  if (!v || typeof v !== "object") return false;
  const o = v as Partial<ProductData>;
  return typeof o.name === "string" && "price" in (o as object);
};

// normalizer
export function toUIProduct(src: IProduct | ProductData): UIProduct {
  if (isIProduct(src)) {
    // price logic: use salePrice if > 0, otherwise use regular price
    const salePrice = asNumber(src.productInfo?.salePrice, 0);
    const regularPrice = asNumber(src.productInfo?.price, 0);
    const displayPrice = salePrice > 0 ? salePrice : regularPrice;
    const displaySalePrice = salePrice > 0 ? salePrice : null;
    const originalPrice = salePrice > 0 ? regularPrice : null;
    
    return {
      id: asString(src._id, ""),
      title: asString(src.description?.name, "Product"),
      image: asString(src.featuredImg, "/placeholder-product.jpg"),
      price: originalPrice || displayPrice,
      salePrice: displaySalePrice,
      status: (src.productInfo as { status?: string })?.status,
      tags: normalizeNames(src.brandAndCategories?.tags as TagShape[]),
      categories: normalizeNames(src.brandAndCategories?.categories as CategoryShape[]),
    };
  }

  // ProductData -> UIProduct
  return {
    id: String(src.id),
    title: asString(src.name, "Product"),
    image: src.image ?? "/placeholder-product.jpg",
    price: asNumber(src.price, 0),
    salePrice: undefined,
    status: undefined,
    tags: [],
    categories: [],
  };
}

export function toUIList(list: readonly (IProduct | ProductData)[] | undefined): UIProduct[] {
  if (!Array.isArray(list)) return [];
  return list.map(toUIProduct);
}