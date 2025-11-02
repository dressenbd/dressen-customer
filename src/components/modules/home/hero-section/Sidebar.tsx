"use client";

import { Button } from "@/components/ui/button";
import { categories } from "@/data/categories";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, Gift, PackageOpen } from "lucide-react";
import React, { useState } from "react";
import SmartImage from "@/components/shared/SmartImage";

const Sidebar = () => {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <aside className="rounded-[16px] w-full lg:w-[280px] xl:w-[375px] shrink-0 bg-neutral">
      <div className="rounded-2xl p-4 mt-8 lg:mt-0">
        <ul className="space-y-5">
          {categories.map((cat) => {
            const isOpen = open === cat.id;
            return (
              <li key={cat.id}>
                <button
                  onClick={() => setOpen(isOpen ? null : cat.id)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm",
                    isOpen ? "bg-accent/60" : "hover:bg-accent/40"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className="inline-flex items-center gap-2 font-medium bg-accent p-2 rounded-full relative w-12 xl:w-16 h-12 xl:h-16">
                      {/* ছোট আইকনে fill নয়; width+height + h-auto */}
                      <SmartImage
                        src={(cat.image || "/images/categories/default.png") as string}
                        alt={cat.label}
                        width={56}   // md
                        height={56}
                        className="h-auto w-12 xl:w-16"
                      />
                    </div>
                    <span className="font-medium xl:text-lg">{cat.label}</span>
                  </div>
                  {isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                </button>

                {isOpen && cat.children?.length ? (
                  <ul className="mt-1 space-y-2 pl-3">
                    {cat.children.map((c) => (
                      <li key={c.id}>
                        <button className="text-secondary/70 hover:text-secondary text-sm px-3 py-1.5 rounded-lg hover:bg-accent/40 w-full text-left">
                          {c.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            );
          })}
        </ul>

        <div className="mt-4 space-y-6 p-4 opacity-90">
          <span className="flex items-center gap-2 xl:text-lg">
            <PackageOpen size={24} /> Popular Products
          </span>

          <span className="flex items-center gap-2 xl:text-lg">
            <Gift size={24} /> Gift Packages
          </span>

          <div className="flex justify-center">
            <Button className="mt-8 xl:py-6 rounded-[12px]" size="lg">
              Go To Collection <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
