"use client";

import { useEffect, useMemo, useState } from "react";
import type { IOrder } from "@/types/order";
import { toOrderLines } from "@/utils/order";
import { useLazyGetSingleProductQuery } from '@/redux/featured/product/productApi';

export type ProductView = {
  title: string;
  image: string;
  price?: number;
};

// id -> ProductView ম্যাপ
type ProductMap = Record<string, ProductView | undefined>;

export function useOrderProductLookup(order?: IOrder | null): ProductMap {
  const [fetchProduct] = useLazyGetSingleProductQuery();
  const [map, setMap] = useState<ProductMap>({});

  // অর্ডার থেকে ইউনিক productId বের করি
  const ids = useMemo(() => {
    if (!order) return [] as string[];
    const set = new Set<string>();
    for (const line of toOrderLines(order.orderInfo)) {
      if (typeof line.productInfo === "string" && line.productInfo.trim()) {
        set.add(line.productInfo);
      }
    }
    return Array.from(set);
  }, [order]);

  useEffect(() => {
    let active = true;

    const load = async () => {
      const entries: [string, ProductView | undefined][] = [];
      for (const id of ids) {
        try {
          const prod = await fetchProduct(id, true).unwrap();
          const title = prod?.description?.name ?? prod?.name ?? "Product";
          const image =
            prod?.featuredImg ??
            (Array.isArray(prod?.gallery) && prod.gallery[0]) ??
            "/placeholder.svg";
          const price =
            prod?.productInfo?.salePrice ??
            prod?.productInfo?.price ??
            undefined;

          entries.push([id, { title, image, price }]);
        } catch {
          // না মিললে ফাঁকা রাখি → UI তে placeholder ব্যবহৃত হবে
          entries.push([id, undefined]);
        }
      }
      if (active && entries.length) {
        setMap((prev) => ({ ...prev, ...Object.fromEntries(entries) }));
      }
    };

    if (ids.length) load();
    return () => {
      active = false;
    };
  }, [ids, fetchProduct]);

  return map;
}
