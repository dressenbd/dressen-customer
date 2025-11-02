"use client";

import { useState, useRef } from "react";
import { X, Search } from "lucide-react";

type SearchBarProps = {
  placeholder?: string;
  onSubmit?: (q: string) => void;
  defaultValue?: string;
  className?: string;
  /** বাইরের submit বাটনের সাথে bind করতে ব্যবহার করুন */
  formId?: string;
  variant?: "desktop" | "mobile";
};

export default function SearchBar({
  placeholder = "Search Product...",
  onSubmit,
  defaultValue = "",
  className = "",
  formId = "topbar-search-form",
  variant = "desktop",
}: SearchBarProps) {
  const [q, setQ] = useState<string>(defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = (): void => {
    setQ("");
    inputRef.current?.focus();
  };

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>): void => {
    e?.preventDefault();
    const value = q.trim();
    if (!value) return;
    onSubmit?.(value);
  };

  // Desktop variant - with fixed width
  if (variant === "desktop") {
    return (
      <div className="relative w-full max-w-2xl">
        <form id={formId} onSubmit={handleSubmit} className={`relative ${className}`}>
          {/* Search Icon */}
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
            <Search size={18} className="text-gray-500" />
          </div>

         <input
  ref={inputRef}
  value={q}
  onChange={(e) => setQ(e.target.value)}
  placeholder={placeholder}
  aria-label="Search"
  dir="auto"
  className="
    w-full h-11 outline-none
    border border-gray-200 focus:border-gray-300
    pl-10 pr-10 rounded-lg
    bg-white
    text-gray-900 placeholder:text-gray-500 caret-[#facf35]
  "
/>


          {/* Clear Button (X) - Show only when there's text */}
          {q && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700"
            >
              <X size={18} />
            </button>
          )}
        </form>
      </div>
    );
  }

  // Mobile variant - full width
  return (
    <div className="relative w-full">
      <form id={formId} onSubmit={handleSubmit} className={`relative ${className}`}>
      <input
  ref={inputRef}
  value={q}
  onChange={(e) => setQ(e.target.value)}
  placeholder={placeholder}
  aria-label="Search"
  dir="auto"
  className="
    w-full h-11 outline-none
    border border-gray-200 focus:border-gray-300
    px-4 rounded-lg
    bg-white
    text-gray-900 placeholder:text-gray-500 caret-[#facf35]
  "
/>


        {/* Clear Button for mobile */}
        {q && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700"
          >
            <X size={18} />
          </button>
        )}
      </form>
    </div>
  );
}