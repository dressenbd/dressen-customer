"use client";

import { useMemo, useRef, useState } from "react";
import { useGetActivePromoCategoriesQuery } from "@/redux/featured/promoCategory/promoCategoryApi";

export default function PromoCategoryRail({ onSelectCategory }: { onSelectCategory: (id: string | null) => void }) {
  const { data, isLoading, isError, error } = useGetActivePromoCategoriesQuery();
  const [selected, setSelected] = useState<string | null>(null);
  const railRef = useRef<HTMLDivElement>(null);

  const promoCategories = useMemo(() => data || [], [data]);

  if (isLoading) {
    return (
      <section className="w-full">
        <div className="mb-2 px-1">
          <h3 className="font-semibold text-base md:text-lg text-secondary">Browse by Promotional</h3>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-10 w-24 bg-gray-200 rounded-full animate-pulse" />
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    console.error("Promo Category Error:", error);
    return (
      <section className="w-full">
        <div className="mb-2 px-1">
          <h3 className="font-semibold text-base md:text-lg text-secondary">Browse by Promotional</h3>
        </div>
        <div className="text-sm text-red-500 px-1">Error loading promotional categories</div>
      </section>
    );
  }

  if (!promoCategories.length) {
    return null;
  }

  const handleSelect = (id: string | null) => {
    setSelected(id);
    onSelectCategory(id);
  };

  const scrollBy = (dx: number) => {
    if (railRef.current) {
      railRef.current.scrollBy({ left: dx, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full">
      <div className="mb-2 flex items-center justify-between px-1">
        <h3 className="font-semibold text-base md:text-lg text-secondary">Browse by Promotional</h3>
        <div className="hidden md:flex gap-2">
          <button 
            onClick={() => scrollBy(-240)} 
            className="w-8 h-8 flex items-center justify-center rounded-full border border-neutral hover:bg-section transition-colors text-secondary"
            aria-label="Previous categories"
          >
            ‹
          </button>
          <button 
            onClick={() => scrollBy(240)} 
            className="w-8 h-8 flex items-center justify-center rounded-full border border-neutral hover:bg-section transition-colors text-secondary"
            aria-label="Next categories"
          >
            ›
          </button>
        </div>
      </div>

      <div ref={railRef} className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
        <button
          onClick={() => handleSelect(null)}
          className={`whitespace-nowrap px-3 py-2 rounded-full border border-neutral ${!selected ? "bg-secondary text-accent" : "bg-accent text-secondary hover:bg-section"}`}
          aria-pressed={!selected}
        >
          All
        </button>

        {promoCategories.map((c) => (
          <button
            key={c._id}
            onClick={() => handleSelect(c._id)}
            className={`whitespace-nowrap px-3 py-2 rounded-full border border-neutral transition ${
              selected === c._id
                ? "bg-primary text-secondary"
                : "bg-accent text-secondary hover:bg-section"
            }`}
            aria-pressed={selected === c._id}
          >
            {c.name}
          </button>
        ))}
      </div>
    </section>
  );
}
