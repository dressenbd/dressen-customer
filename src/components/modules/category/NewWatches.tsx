"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import type { IProduct, ProductData } from "@/types/product";
import { UIProduct } from "@/types/ui";

type Props = { data?: (IProduct | ProductData)[]; title?: string };

const formatBDT = (n: number) =>
  `৳${Math.max(0, Number.isFinite(n) ? Math.round(n) : 0)}`;

export default function NewWatches({ data = [], title = "New Products" }: Props) {
  const items: UIProduct[] = useMemo(() => {
    if (!Array.isArray(data)) return [];
    return data.map((item: IProduct | ProductData) => {
      const itemRecord = item as unknown as Record<string, unknown>;
      return {
        id: (itemRecord._id as string) || (itemRecord.id as string) || 'unknown',
        title: (itemRecord.name as string) || (itemRecord.title as string) || 'Product',
        image: (itemRecord.image as string) || '/placeholder.png',
        price: (itemRecord.price as number) || 0,
        salePrice: itemRecord.salePrice as number | undefined,
        categories: (itemRecord.categories as string[]) || [],
        tags: (itemRecord.tags as string[]) || []
      };
    });
  }, [data]);

  const categoryList = useMemo(() => {
    const set = new Set<string>();
    items.forEach((p) => (p.categories ?? []).forEach((c) => set.add(c)));
    return ["All", ...Array.from(set)];
  }, [items]);

  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    if (activeCategory === "All") return items;
    return items.filter((p) => p.categories?.includes(activeCategory));
  }, [items, activeCategory]);

  return (
    <section className="w-full py-12">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold md:text-3xl">{title}</h2>
        <div className="flex flex-wrap gap-2 md:gap-3">
          {categoryList.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "default" : "outline"}
              className={`rounded-full px-4 text-xs md:px-5 md:text-sm ${
                activeCategory === cat
                  ? "bg-black text-[#2e2e2e] hover:bg-black"
                  : "border bg-transparent text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4 px-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-6">
        {filtered.length > 0 ? (
          filtered.map((p) => {
            const href = `/product-details?id=${p.id}`;
            return (
            <Link key={p.id} href={href} className="group">
              <Card className="w-full cursor-pointer rounded-2xl border-none bg-[#F7F7F7] shadow-sm transition-all duration-300 hover:shadow-md">
              <CardContent className="flex flex-col p-4">
                {/* Image */}
                <div className="relative mb-4 flex h-28 w={ 'full' } items-center justify-center sm:h-32 lg:h-40">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(min-width:1024px) 20vw, (min-width:640px) 33vw, 50vw"
                    className="object-contain rounded-lg"
                  />
                </div>

                {/* Info */}
                <div className="flex-grow">
                  <h3 className="line-clamp-1 text-sm font-semibold md:text-base">
                    {p.title}
                  </h3>
                </div>

                {/* Price + CTA */}
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {p.salePrice ? (
                      <>
                        <span className="text-sm font-bold text-black md:text-lg">
                          {formatBDT(p.price)}
                        </span>
                      </>
                    ) : (
                      <span className="text-sm font-bold text-black md:text-lg">
                        {formatBDT(p.price)}
                      </span>
                    )}
                  </div>
                  <Button
                    size="icon"
                    className="h-8 w-8 rounded-full bg-gray-200 transition-colors hover:bg-gray-300 md:h-9 md:w-9"
                  >
                    <ArrowUpRight className="h-3 w-3 text-black md:h-4 md:w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            </Link>
          );
          })
        ) : (
          <div className="col-span-full py-12 text-center">
            <p className="text-lg text-gray-500">No products found.</p>
          </div>
        )}
      </div>

      {/* Bottom Button */}
      {filtered.length > 0 && (
        <div className="mt-10 flex justify-center">
          <Link href="/product-listing">
            <Button
              variant="outline"
              className="flex items-center gap-2 rounded-[12px] border border-gray-300 px-6 py-3 text-sm font-medium transition-colors hover:bg-gray-100 md:text-base"
            >
              View All
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      )}
    </section>
  );
}
