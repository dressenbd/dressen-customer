"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import type { IProduct, ProductData } from "@/types/product";
import { toUIList, type UIProduct } from "@/types/ui";

// 🔒 Props: API shape বা UI shape – দুইটাই সাপোর্ট
type Props = {
  data?: Array<IProduct | ProductData>;
  loading?: boolean;
  error?: boolean;
  title?: string;
  limit?: number;
};

const formatBDT = (n: number) =>
  `৳${Math.max(0, Number.isFinite(n) ? Math.round(n) : 0)}`;



export default function Discount({
  data = [],
  loading,
  
  title = "Up to 10% Discount",
  limit = 6,
}: Props) {
  // সবসময় UIProduct লিস্ট বানিয়ে নেই (API/ProductData → UI)
  const items: UIProduct[] = useMemo(() => {
    const list = toUIList(Array.isArray(data) ? data : []);
    return list.slice(0, limit);
  }, [data, limit]);

  // Loader
  if (loading) {
    return (
      <section className="w-full py-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold md:text-3xl">{title}</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 px-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-6">
          {Array.from({ length: limit }).map((_, i) => (
            <div key={i} className="h-[320px] w-full rounded-2xl bg-gray-100 animate-pulse" />
          ))}
        </div>
      </section>
    );
  }

  // Show only actual data, no fallback
  const dataset = items;

  return (
    <section className="w-full py-12">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold md:text-3xl text-secondary">{title}</h2>
        <Button
          asChild
          variant="outline"
          className="rounded-[12px] border border-neutral px-4 py-2 text-sm bg-primary hover:bg-gray-100 md:px-6 md:py-3 md:text-base"
        >
          <Link href="/discounts">
            View All <ChevronRight className="ml-1 inline h-4 w-4" />
          </Link>
        </Button>
      </div>

      {dataset.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-secondary/60">Failed to load products</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 px-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-6">
        {dataset.slice(0, limit).map((p) => {
          const href = `/product-details?id=${encodeURIComponent(p.id)}`;
          const showSale = p.salePrice != null && p.salePrice < (p.price ?? 0);
          const discountPct = showSale ? Math.round(((p.price ?? 0) - (p.salePrice ?? 0)) / (p.price ?? 1) * 100) : 0;
          return (
            <Link key={p.id} href={href} className="group">
              <Card className="relative w-full cursor-pointer rounded-2xl border-none bg-section shadow-sm transition-all duration-300 hover:shadow-md">
                <CardContent className="flex flex-col p-4">
                  <div className="relative mb-4 grid h-28 w-full place-items-center sm:h-32 lg:h-40">
                    {showSale && discountPct > 0 && (
                      <div className="absolute left-0 top-0 z-10">
                        <span className="inline-block bg-discount text-white bg-red-500 rounded-sm text-[10px] px-1 py-1 font-semibold">
                          {discountPct}%
                        </span>
                      </div>
                    )}
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(min-width:1024px) 20vw, (min-width:640px) 33vw, 50vw"
                      className="rounded-lg object-contain transition-transform duration-300 group-hover:scale-95"
                    />
                  </div>

                  <div className="flex-grow">
                    <h3 className="line-clamp-1 text-sm font-semibold md:text-base text-secondary">
                      {p.title}
                    </h3>
                  </div>

                  <div className="mt-3">
                    {showSale ? (
                      <>
                        <div className="text-xs text-secondary/40 line-through decoration-red-500">
                          {formatBDT(p.price ?? 0)}
                        </div>
                        <div className="text-lg font-bold text-secondary">
                          {formatBDT(p.salePrice ?? 0)}
                        </div>
                      </>
                    ) : (
                      <div className="text-lg font-bold text-secondary">
                        {formatBDT(p.price ?? 0)}
                      </div>
                    )}
                  </div>

                  <div className="absolute bottom-3 right-3">
                    <Button
                      size="icon"
                      className="h-8 w-8 rounded-full bg-neutral transition-colors hover:bg-neutral/80"
                    >
                      <ArrowUpRight className="h-4 w-4 text-secondary" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
        </div>
      )}
    </section>
  );
}
