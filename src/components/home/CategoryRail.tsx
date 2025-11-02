"use client";

import { useMemo, useRef } from "react";
import { useGetAllCategoryQuery, type RemoteCategory } from "@/redux/featured/category/categoryApi";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type UICategory = { id: string; slug?: string; label: string; image?: string };

// ----- safe helpers (no any) -----
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

export default function CategoryRail() {
  const { data } = useGetAllCategoryQuery();
  const router = useRouter();
  const pathname = usePathname();
  const search = useSearchParams();
  const current = search.get("category") ?? "";
  const railRef = useRef<HTMLDivElement>(null);

  const cats = useMemo<UICategory[]>(() => {
    const raw: RemoteCategory[] = Array.isArray(data) ? data : [];
    return raw.map((c) => {
      const id = String((c._id ?? c.id ?? c.slug ?? "") || "");
      const slug = typeof c.slug === "string" ? c.slug : undefined;
      const label = String(getStr(c, "name") ?? getStr(c, "label") ?? "Category");
      const icon = getProp(c, "icon");
      const iconUrl = isRecord(icon) ? getStr(icon, "url") : undefined;
      const image = iconUrl ?? getStr(c, "image") ?? undefined;
      return { id, slug, label, image };
    });
  }, [data]);

  const setCategory = (cat?: UICategory) => {
    const params = new URLSearchParams(search.toString());
    if (!cat) params.delete("category");
    else params.set("category", cat.slug ?? cat.id); // ✅ slug first
    router.push(`${pathname}?${params.toString()}`);
  };

  const scrollBy = (dx: number) => {
    if (railRef.current) {
      railRef.current.scrollBy({ left: dx, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full">
      <div className="mb-2 flex items-center justify-between px-1">
        <h3 className="font-semibold text-base md:text-lg text-secondary">Browse by Category</h3>
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
          onClick={() => setCategory(undefined)}
          className={`whitespace-nowrap px-3 py-2 rounded-full border border-neutral ${current ? "bg-accent text-secondary hover:bg-section" : "bg-secondary text-accent"}`}
          aria-pressed={!current}
        >
          All
        </button>

        {cats.map((c) => (
          <button
            key={c.id}
            onClick={() => setCategory(c)}
            className={`whitespace-nowrap px-3 py-2 rounded-full border border-neutral transition ${
              current && current === (c.slug ?? c.id)
                ? "bg-primary text-secondary"
                : "bg-accent text-secondary hover:bg-section"
            }`}
            aria-pressed={current === (c.slug ?? c.id)}
          >
            {c.label}
          </button>
        ))}
      </div>
    </section>
  );
}
