"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

type Props = {
  title: string;
  tabs?: { value: string; label: string }[];
  value?: string;
  onValueChange?: (v: string) => void;
  action?: React.ReactNode;
};

const SectionHeader = ({
  title,
  tabs,
  value,
  onValueChange,
  action,
}: Props) => {
  return (
    <div className="mb-4  flex bg items-center justify-between mt-16 md:mt-20">
      <h2 className="md:text-2xl lg:text-4xl font-semibold sm:mb-3 md:mb-0 text-secondary">
        {title}
      </h2>
      <div className="flex items-center gap-3 md:w-auto">
        {tabs && (
          <div className="">
            {/* Desktop Tabs */}
            <div className="hidden sm:block">
              <Tabs value={value} onValueChange={onValueChange}>
                <TabsList className="flex justify-between h-full bg-accent gap-1 md:gap-5">
                  {tabs.slice(0, 3).map((t) => (
                    <TabsTrigger
                      key={t.value}
                      value={t.value}
                      className="rounded-full border border-secondary/20 font-normal text-xs md:text-base xl:text-xl px-1.5 xl:px-3 md:py-2 xl:py-3 data-[state=active]:bg-secondary data-[state=active]:text-accent bg-section"
                    >
                      {t.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            {/* Mobile Dropdown */}
            <div className="block sm:hidden w-full ">
              <select
                className="w-full border border-neutral rounded-md p-1 bg-accent text-secondary"
                value={value}
                onChange={(e) => onValueChange && onValueChange(e.target.value)}
              >
                {tabs.slice(0, 3).map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
        {action}
      </div>
    </div>
  );
};

export default SectionHeader;
