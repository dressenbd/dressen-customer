"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, ChevronUp, ShoppingCart, Filter, X } from "lucide-react";
import Image from "next/image";
import { useGetPaginatedProductsQuery } from "@/redux/featured/product/productApi";
import { useGetAllCategoryQuery } from "@/redux/featured/category/categoryApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToCart, selectCartItems } from "@/redux/featured/cart/cartSlice";
import toast from "react-hot-toast";
import clsx from "clsx";
import type { RemoteProduct } from "@/types/product";
import MobileBottomNav from "@/components/home/MobileBottomNav";

interface Product {
  id: string | number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  category: string;
  size: string[];
  colors: string[];
  image: string;
}

interface FilterState {
  // categories will store stable ids (slug or _id) to avoid matching on display names
  categories: string[];
  subcategories: string[]; // Add subcategory filtering
  tags: string[]; // Changed from brands to tags
  priceRanges: string[];
  sizes: string[];
  colors: string[];
}

const filterOptions = {
  // categories is a placeholder list used only when the categories API is not available.
  // The real category list will be derived at runtime from the category API.
  categories: ["Men", "Women", "Kids"],
  brands: ["Adidas", "Tommy Hilfiger", "Nike", "Gucci", "Louis Vuitton"],
  priceRanges: [
    "Under ৳500",
    "৳500 – ৳1,000",
    "৳1,000 – ৳2,000",
    "৳2,000 – ৳5,000",
    "Above ৳5,000 ",
  ],
  sizes: ["Large", "Small", "Medium", "XL", "XXL"],
  colors: [
    "Black",
    "White",
    "Green",
    "Multi-Color",
    "Pink",
    "Yellow",
    "Red",
    "Grey",
  ],
};

const defaultFilters: FilterState = {
  categories: [],
  subcategories: [],
  tags: [], // Changed from brands to tags
  priceRanges: [],
  sizes: [],
  colors: [],
};

const formatPrice = (value: number) => {
  // Show literal ৳ symbol and format the number with no decimals for compact UI
  const n = Number(value) || 0;
  return `৳${n.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
};

// Capitalize a color/label string for display (e.g. "red" -> "Red", "multi-color" -> "Multi-color")
const capitalize = (s: unknown) => {
  const str = String(s ?? "").trim();
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export default function ProductListing() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);

  const [filters, setFilters] = useState<FilterState>({ ...defaultFilters });
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    subcategories: true, // Make subcategory expanded by default
    tags: false,
    priceRanges: true, // Make price filtering expanded by default
    sizes: false,
    colors: false,
  });
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // RTK Query with Load More
  const {
    data: paginatedData,
    isLoading: apiIsLoading,
    isError: apiIsError,
    isFetching,
  } = useGetPaginatedProductsQuery({
    page: currentPage,
    limit: 20,
  });

  const apiProducts = useMemo(() => {
    return paginatedData?.data || [];
  }, [paginatedData?.data]);
  const hasNextPage = paginatedData?.pagination?.hasNextPage || false;
  const totalItems = paginatedData?.pagination?.totalItems || 0;

  // categories from API
  const { data: apiCategories } = useGetAllCategoryQuery();

  // small type-safe extractor to get a stable id from remote category-like objects
  const stableCatId = (c: unknown): string => {
    if (!c || typeof c !== "object") return "";
    const obj = c as Record<string, unknown>;
    if (typeof obj.slug === "string" && obj.slug) return obj.slug;
    if (typeof obj._id === "string" && obj._id) return obj._id;
    if (typeof obj.id === "string" && obj.id) return obj.id;
    if (typeof obj.name === "string" && obj.name) return obj.name;
    return "";
  };

  // Load More handler
  const handleLoadMore = () => {
    if (hasNextPage && !isFetching) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // map API products to local Product shape; use fallback if no API data
  const sourceProducts: Product[] = useMemo(() => {
    return apiProducts.map((prod: RemoteProduct) => {
      // create a local typed view for fields that are missing in RemoteProduct
      const p = prod as RemoteProduct & {
        specifications?: Array<{ key?: string; value?: unknown }>;
        brandAndCategories?: {
          brand?: string | { name?: string };
          categories?: Array<{ _id?: string; name?: string; slug?: string }>;
          tags?: Array<{ name?: string }>;
        };
      };

      // Extract tag as brand (first tag name)
      const brand = p.brandAndCategories?.tags?.[0]?.name ?? "";

      // price logic: use salePrice if > 0, otherwise use regular price
      const salePrice = Number(p.productInfo?.salePrice ?? 0);
      const regularPrice = Number(p.productInfo?.price ?? 0);
      const price = salePrice > 0 ? salePrice : regularPrice;
      const originalPrice = salePrice > 0 ? regularPrice : undefined;

      // Extract specifications
      const specs = Array.isArray(p.specifications) ? p.specifications : [];

      // colors: look into specifications for keys like 'color' or 'Color'
      const colors = specs
        .filter(
          (s) => typeof s?.key === "string" && /color/i.test(s.key) && s?.value
        )
        .map((s) => capitalize(s.value));

      // sizes: look into specifications for keys like 'size' or 'Size'
      const sizes = specs
        .filter(
          (s) => typeof s?.key === "string" && /size/i.test(s.key) && s?.value
        )
        .map((s) => capitalize(s.value));

      return {
        id: p._id,
        name: p.description?.name ?? "",
        brand,
        price,
        originalPrice,
        // keep product category as a stable id if available (use slug > _id > name)
        category:
          p.brandAndCategories?.categories && p.brandAndCategories.categories[0]
            ? stableCatId(p.brandAndCategories.categories[0])
            : "",
        size: sizes,
        colors,
        image: p.featuredImg ?? "/placeholder.svg",
      };
    });
  }, [apiProducts]);

  // derive category filter items from API categories only (no fallback)
  const categoryFilterItems: { id: string; label: string }[] = useMemo(() => {
    if (!apiCategories || apiCategories.length === 0) return []; // Return empty array instead of fallback categories

    // map to display label but keep stable id (slug/_id) as value
    return apiCategories.map((c) => {
      const id = c.slug ?? c._id ?? c.id ?? c.name ?? "unknown";
      const label = c.name ?? c.label ?? id;
      return { id, label };
    });
  }, [apiCategories]);

  // derive subcategory filter items based on selected categories
  const subcategoryFilterItems: {
    id: string;
    label: string;
    parentId: string;
  }[] = useMemo(() => {
    if (!apiCategories || filters.categories.length === 0) return [];

    const subcategories: { id: string; label: string; parentId: string }[] = [];

    apiCategories.forEach((category) => {
      const categoryId =
        category.slug ?? category._id ?? category.id ?? category.name ?? "";

      // Only show subcategories for selected categories
      if (filters.categories.includes(categoryId)) {
        // Check for children array
        if (category.children && Array.isArray(category.children)) {
          category.children.forEach((sub) => {
            const subId =
              sub.slug ?? sub._id ?? sub.id ?? sub.name ?? "unknown";
            const subLabel = sub.name ?? sub.label ?? subId;
            subcategories.push({
              id: subId,
              label: subLabel,
              parentId: categoryId,
            });
          });
        }
        // Also check for subCategories array (alternative structure)
        if (category.subCategories && Array.isArray(category.subCategories)) {
          category.subCategories.forEach((subName) => {
            if (typeof subName === "string") {
              subcategories.push({
                id: subName,
                label: subName,
                parentId: categoryId,
              });
            }
          });
        }
      }
    });

    return subcategories;
  }, [apiCategories, filters.categories]);

  // build a lookup to map category label (name) -> stable id (slug/_id/name)
  const categoryNameToId = useMemo(() => {
    const map: Record<string, string> = {};
    if (!apiCategories) return map;
    apiCategories.forEach((c) => {
      const id = c.slug ?? c._id ?? c.id ?? c.name ?? "";
      const label = c.name ?? c.label ?? id;
      if (label) map[label] = id;
      if (id) map[id] = id;
    });
    return map;
  }, [apiCategories]);

  // derive dynamic filter options from actual product data
  const derivedFilters: {
    tags: string[];
    colors: string[];
    sizes: string[];
    priceRanges: string[];
    getRange: (price: number) => string;
  } = useMemo(() => {
    const tagsSet = new Set<string>();
    const colorsSet = new Set<string>();
    const sizesSet = new Set<string>();
    const prices: number[] = [];

    sourceProducts.forEach((p) => {
      if (p.brand) tagsSet.add(p.brand);
      if (Array.isArray(p.colors))
        p.colors.forEach((c) => c && colorsSet.add(capitalize(c)));
      if (Array.isArray(p.size))
        p.size.forEach((s) => s && sizesSet.add(capitalize(s)));
      if (typeof p.price === "number" && Number.isFinite(p.price))
        prices.push(p.price);
    });

    // Use fixed BDT ranges provided by the user
    const priceRangesFinal = filterOptions.priceRanges;
    const thresholds = [0, 500, 1000, 2000, 5000];

    const getRange = (price: number): string => {
      // Assume `price` is expressed in the same unit as the thresholds (here we
      // keep the numeric thresholds but display labels with $). If your API
      // uses another currency, convert to USD (or the bucket currency) first.
      if (typeof price !== "number" || !Number.isFinite(price))
        return priceRangesFinal[0];
      if (price < thresholds[1]) return priceRangesFinal[0];
      if (price >= thresholds[1] && price < thresholds[2])
        return priceRangesFinal[1];
      if (price >= thresholds[2] && price < thresholds[3])
        return priceRangesFinal[2];
      if (price >= thresholds[3] && price < thresholds[4])
        return priceRangesFinal[3];
      return priceRangesFinal[4];
    };

    return {
      tags: Array.from(tagsSet).sort(),
      colors: Array.from(colorsSet).sort(),
      sizes: Array.from(sizesSet).sort(),
      priceRanges: priceRangesFinal,
      getRange,
    };
  }, [sourceProducts]);

  // Note: getDerivedPriceRange moved inside derivedFilters useMemo to keep dependencies stable

  const isAnyFilterActive =
    filters.categories.length +
      filters.subcategories.length +
      filters.tags.length +
      filters.priceRanges.length +
      filters.sizes.length +
      filters.colors.length >
    0;

  // Prevent background scroll when mobile filter drawer is open
  useEffect(() => {
    if (isMobileFilterOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isMobileFilterOpen]);

  const handleFilterChange = (
    filterType: keyof FilterState,
    value: string,
    checked: boolean
  ) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: checked
        ? [...prev[filterType], value]
        : prev[filterType].filter((item) => item !== value),
    }));

    // Scroll to top when filter changes
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // No need to reset page for client-side search
  };

  const clearAll = () => {
    setFilters({ ...defaultFilters });
  };

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const cartItem = {
      productId: String(product.id),
      productName: product.name,
      productImage: product.image,
      unitPrice: product.price,
      quantity: 1,
      color: product.colors[0] || "Default",
      size: product.size[0] || "M",
    };

    dispatch(addToCart(cartItem));
    toast.success("Added to cart successfully!");
  };

  const isAddedToCart = (productId: string | number) => {
    const productIdStr = String(productId);
    return cartItems.some((item) => item.productId === productIdStr);
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // SmartSearch-like scoring function
  const scoreProduct = (product: Product, query: string): number => {
    const q = query.trim().toLowerCase();
    if (!q) return 1; // No query means all products match

    let score = 0;
    let matched = false;

    const name = product.name.toLowerCase();
    if (name.startsWith(q)) {
      score += 4;
      matched = true;
    } else if (name.includes(q)) {
      score += 2;
      matched = true;
    }

    if (product.brand) {
      const brand = product.brand.toLowerCase();
      if (brand.startsWith(q)) {
        score += 2;
        matched = true;
      } else if (brand.includes(q)) {
        score += 1;
        matched = true;
      }
    }

    return matched ? score : 0;
  };

  const filteredProducts = useMemo(() => {
    let products = sourceProducts.filter((product) => {
      // categories: tolerant match (product.category may be a name or id; selected values are ids)
      if (filters.categories.length > 0) {
        const candidates = new Set<string>();
        if (product.category) candidates.add(product.category);
        const mapped = categoryNameToId[product.category];
        if (mapped) candidates.add(mapped);

        const matchesCategory = filters.categories.some((sel) =>
          candidates.has(sel)
        );
        if (!matchesCategory) return false;
      }

      // subcategory filtering - check if product's subcategory matches selected subcategories
      if (filters.subcategories.length > 0) {
        const originalProduct = apiProducts.find((p) => p._id === product.id);
        const productSubcategory =
          originalProduct?.brandAndCategories?.subcategory;
        const hasMatchingSubcategory = filters.subcategories.some(
          (subId) =>
            productSubcategory === subId ||
            subcategoryFilterItems.some(
              (sub) => sub.id === subId && sub.label === productSubcategory
            )
        );
        if (!hasMatchingSubcategory) return false;
      }

      if (filters.tags.length > 0 && !filters.tags.includes(product.brand))
        return false;
      if (
        filters.priceRanges.length > 0 &&
        !filters.priceRanges.includes(derivedFilters.getRange(product.price))
      )
        return false;
      if (
        filters.sizes.length > 0 &&
        !filters.sizes.some((s) => product.size.includes(s))
      )
        return false;
      if (
        filters.colors.length > 0 &&
        !filters.colors.some((c) => product.colors.includes(c))
      )
        return false;
      return true;
    });

    // Apply search filtering with scoring
    if (searchQuery.trim()) {
      products = products
        .map((product) => ({
          product,
          score: scoreProduct(product, searchQuery),
        }))
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .map((item) => item.product);
    }

    return products;
  }, [
    filters,
    sourceProducts,
    categoryNameToId,
    derivedFilters,
    searchQuery,
    apiProducts,
    subcategoryFilterItems,
  ]);

  const FilterSection = ({
    title,
    items,
    filterKey,
  }: {
    title: string;
    items: string[];
    filterKey: keyof FilterState;
  }) => (
    <div className="mb-6">
      <button
        type="button"
        className="flex w-full items-center justify-between mb-3"
        onClick={() => toggleSection(filterKey)}
        aria-expanded={expandedSections[filterKey]}
      >
        <h3 className="font-medium text-sm">{title}</h3>
        {expandedSections[filterKey] ? (
          <ChevronUp className="h-4 w-4 text-secondary" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-400" />
        )}
      </button>

      {expandedSections[filterKey] && (
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item} className="flex items-center gap-2">
              <Checkbox
                id={`${filterKey}-${item}`}
                checked={filters[filterKey].includes(item)}
                onCheckedChange={(checked) =>
                  handleFilterChange(filterKey, item, checked as boolean)
                }
                className="h-4 w-4"
              />
              <label
                htmlFor={`${filterKey}-${item}`}
                className="text-sm text-gray-700 cursor-pointer"
              >
                {item}
              </label>
            </div>
          ))}
          <button
            className="text-sm text-blue-600 hover:underline mt-2"
            type="button"
          >
            + More
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-screen-2xl w-full px-4 sm:px-6 lg:px-8 py-6">
        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Top row (mobile: stacked) */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
          <p className="text-sm text-gray-600">
            {isAnyFilterActive ? (
              <>
                Showing{" "}
                <span className="font-medium">{filteredProducts.length}</span>{" "}
                filtered of <span className="font-medium">{totalItems}</span>{" "}
                total products
              </>
            ) : (
              <>
                Showing <span className="font-medium">{totalItems}</span>{" "}
                products
              </>
            )}
          </p>

          <div className="flex gap-2">
            {isAnyFilterActive && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAll}
                className="text-sm"
              >
                Clear all
              </Button>
            )}
            <Button
              onClick={() => setIsMobileFilterOpen(true)}
              variant="outline"
              className="flex items-center gap-2 w-full justify-center sm:w-auto lg:hidden"
            >
              <Filter className="h-4 w-4" />
              Filters{" "}
              {isAnyFilterActive
                ? `(${
                    filters.categories.length +
                    filters.subcategories.length +
                    filters.tags.length +
                    filters.priceRanges.length +
                    filters.sizes.length +
                    filters.colors.length
                  })`
                : ""}
            </Button>
          </div>
        </div>

        <div className="flex gap-4 lg:gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block lg:w-56 xl:w-56">
            <div className="sticky top-24 bg-white rounded-lg p-6 border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                {isAnyFilterActive && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAll}
                    className="text-xs"
                  >
                    Clear all
                  </Button>
                )}
              </div>

              {/* Category: use API-driven items (label + stable id) */}
              <div className="mb-6">
                <button
                  type="button"
                  className="flex w-full items-center justify-between mb-3"
                  onClick={() => toggleSection("categories")}
                  aria-expanded={expandedSections.categories}
                >
                  <h3 className="font-medium text-sm">Category</h3>
                  {expandedSections.categories ? (
                    <ChevronUp className="h-4 w-4 text-secondary" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  )}
                </button>

                {expandedSections.categories && (
                  <div className="space-y-2">
                    {categoryFilterItems.map((item) => {
                      const id = item.id ?? String(item);
                      const label = item.label ?? String(item);
                      return (
                        <div key={id} className="flex items-center gap-2">
                          <Checkbox
                            id={`categories-${id}`}
                            checked={filters.categories.includes(id)}
                            onCheckedChange={(checked) =>
                              handleFilterChange(
                                "categories",
                                id,
                                checked as boolean
                              )
                            }
                            className="h-4 w-4"
                          />
                          <label
                            htmlFor={`categories-${id}`}
                            className="text-sm text-gray-700 cursor-pointer"
                          >
                            {label}
                          </label>
                        </div>
                      );
                    })}
                    <button
                      className="text-sm text-blue-600 hover:underline mt-2"
                      type="button"
                    >
                      + More
                    </button>
                  </div>
                )}
              </div>
              <hr className="pb-3" />
              {/* Subcategory filter - always show */}
              <div className="mb-6">
                <button
                  type="button"
                  className="flex w-full items-center justify-between mb-3"
                  onClick={() => toggleSection("subcategories")}
                  aria-expanded={expandedSections.subcategories}
                >
                  <h3 className="font-medium text-sm">Subcategory</h3>
                  {expandedSections.subcategories ? (
                    <ChevronUp className="h-4 w-4 text-secondary" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  )}
                </button>

                {expandedSections.subcategories && (
                  <div className="space-y-2">
                    {subcategoryFilterItems.length > 0 ? (
                      subcategoryFilterItems.map((item, index) => (
                        <div
                          key={`${item.parentId}-${item.id}-${index}`}
                          className="flex items-center gap-2"
                        >
                          <Checkbox
                            id={`subcategories-${item.parentId}-${item.id}`}
                            checked={filters.subcategories.includes(item.id)}
                            onCheckedChange={(checked) =>
                              handleFilterChange(
                                "subcategories",
                                item.id,
                                checked as boolean
                              )
                            }
                            className="h-4 w-4"
                          />
                          <label
                            htmlFor={`subcategories-${item.parentId}-${item.id}`}
                            className="text-sm text-gray-700 cursor-pointer"
                          >
                            {item.label}
                          </label>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">
                        Select a category first
                      </p>
                    )}
                  </div>
                )}
              </div>
              <hr className="pb-3" />
              <FilterSection
                title="Price"
                items={derivedFilters.priceRanges}
                filterKey="priceRanges"
              />
              <hr className="pb-3" />
              <FilterSection
                title="Size"
                items={
                  derivedFilters.sizes.length
                    ? derivedFilters.sizes
                    : filterOptions.sizes
                }
                filterKey="sizes"
              />
              <hr className="pb-3" />
              <FilterSection
                title="Tags"
                items={
                  derivedFilters.tags.length
                    ? derivedFilters.tags
                    : filterOptions.brands
                }
                filterKey="tags"
              />
              <hr className="pb-3" />
              <FilterSection
                title="Colors"
                items={
                  derivedFilters.colors.length
                    ? derivedFilters.colors
                    : filterOptions.colors
                }
                filterKey="colors"
              />
            </div>
          </aside>

          {/* Product Grid: 1 → 2 → 3 columns */}
          <main className="flex-1">
            {apiIsLoading && currentPage === 1 ? (
              <div className="bg-white border rounded-lg p-8 text-center">
                Loading products...
              </div>
            ) : apiIsError ? (
              <div className="bg-white border rounded-lg p-8 text-center">
                Failed to load products.
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="bg-white border rounded-lg p-8 text-center">
                <p className="text-sm text-gray-600">
                  No products match your filters.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 md:gap-6">
                  {filteredProducts.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product-details?id=${product.id}`}
                      className="group"
                      aria-label={`View details for ${product.name}`}
                      style={{ willChange: "transform, box-shadow" }}
                    >
                      <Card className="bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transform-gpu transition-all duration-300 ease-in-out hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex flex-col overflow-hidden rounded-lg h-full">
                        <CardContent className="p-0 flex flex-col h-full min-h-0">
                          <div className="relative flex-shrink-0">
                            {/* Square card media for consistency */}
                            <div
                              className="w-full aspect-square overflow-hidden rounded-t-lg"
                              style={{
                                willChange: "transform",
                                transform: "translateZ(0)",
                                backfaceVisibility: "hidden",
                              }}
                            >
                              <Image
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                width={500}
                                height={500}
                                className="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105 transform-gpu"
                                loading="lazy"
                              />
                            </div>

                            <Button
                              size="icon"
                              variant="ghost"
                              className={clsx(
                                "absolute top-2 right-2 h-8 w-8 transition-all duration-200 shadow-md",
                                isAddedToCart(product.id)
                                  ? " bg-green-600 text-secondary hover:bg-success  cursor-default shadow-lg"
                                  : "bg-primary text-secondary hover:bg-green-400 hover:text-secondary  hover:shadow-lg"
                              )}
                              aria-label={`Add ${product.name} to cart`}
                              onClick={(e) =>
                                !isAddedToCart(product.id) &&
                                handleAddToCart(product, e)
                              }
                              disabled={isAddedToCart(product.id)}
                            >
                              <ShoppingCart className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="p-4 flex flex-col flex-1 justify-between min-h-0">
                            <div>
                              <h3 className="font-medium text-gray-900 mb-1 text-sm line-clamp-2 leading-tight min-h-[2.5rem] flex items-center">
                                {product.name}
                              </h3>
                              <p className="text-xs text-gray-500 mb-2 truncate">
                                {product.brand}
                              </p>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="text-lg font-bold text-secondary">
                                {formatPrice(product.price)}
                              </span>
                              {product.originalPrice && (
                                <span className="text-sm text-gray-500 line-through decoration-red-500">
                                  {formatPrice(product.originalPrice)}
                                </span>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>

                {/* Load More Button */}
                {hasNextPage && (
                  <div className="mt-8 flex justify-center">
                    <Button
                      onClick={handleLoadMore}
                      disabled={isFetching}
                      variant="outline"
                      size="lg"
                      className="px-8"
                    >
                      {isFetching ? "Loading..." : "Load More"}
                    </Button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <>
          {/* Backdrop */}
          <button
            aria-label="Close filters"
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          {/* Panel */}
          <div
            className="fixed inset-y-0 left-0 w-full max-w-xs bg-white z-50 p-6 border-r shadow-lg lg:hidden
                       animate-in slide-in-from-left duration-200"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <div className="flex items-center gap-2">
                {isAnyFilterActive && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAll}
                    className="text-xs"
                  >
                    Clear
                  </Button>
                )}
                <Button
                  onClick={() => setIsMobileFilterOpen(false)}
                  variant="ghost"
                  size="icon"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="overflow-y-auto h-[calc(100vh-7.5rem)] pr-2">
              {/* Mobile Category filter */}
              <div className="mb-6">
                <button
                  type="button"
                  className="flex w-full items-center justify-between mb-3"
                  onClick={() => toggleSection("categories")}
                  aria-expanded={expandedSections.categories}
                >
                  <h3 className="font-medium text-sm">Category</h3>
                  {expandedSections.categories ? (
                    <ChevronUp className="h-4 w-4 text-secondary" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  )}
                </button>

                {expandedSections.categories && (
                  <div className="space-y-2">
                    {categoryFilterItems.map((item) => {
                      const id = item.id ?? String(item);
                      const label = item.label ?? String(item);
                      return (
                        <div key={id} className="flex items-center gap-2">
                          <Checkbox
                            id={`categories-mobile-${id}`}
                            checked={filters.categories.includes(id)}
                            onCheckedChange={(checked) =>
                              handleFilterChange(
                                "categories",
                                id,
                                checked as boolean
                              )
                            }
                            className="h-4 w-4"
                          />
                          <label
                            htmlFor={`categories-mobile-${id}`}
                            className="text-sm text-gray-700 cursor-pointer"
                          >
                            {label}
                          </label>
                        </div>
                      );
                    })}
                    <button
                      className="text-sm text-blue-600 hover:underline mt-2"
                      type="button"
                    >
                      + More
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Subcategory filter - always show */}
              <div className="mb-6">
                <button
                  type="button"
                  className="flex w-full items-center justify-between mb-3"
                  onClick={() => toggleSection("subcategories")}
                  aria-expanded={expandedSections.subcategories}
                >
                  <h3 className="font-medium text-sm">Subcategory</h3>
                  {expandedSections.subcategories ? (
                    <ChevronUp className="h-4 w-4 text-secondary" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  )}
                </button>

                {expandedSections.subcategories && (
                  <div className="space-y-2">
                    {subcategoryFilterItems.length > 0 ? (
                      subcategoryFilterItems.map((item, index) => (
                        <div
                          key={`mobile-${item.parentId}-${item.id}-${index}`}
                          className="flex items-center gap-2"
                        >
                          <Checkbox
                            id={`subcategories-mobile-${item.parentId}-${item.id}`}
                            checked={filters.subcategories.includes(item.id)}
                            onCheckedChange={(checked) =>
                              handleFilterChange(
                                "subcategories",
                                item.id,
                                checked as boolean
                              )
                            }
                            className="h-4 w-4"
                          />
                          <label
                            htmlFor={`subcategories-mobile-${item.parentId}-${item.id}`}
                            className="text-sm text-gray-700 cursor-pointer"
                          >
                            {item.label}
                          </label>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">
                        Select a category to see subcategories
                      </p>
                    )}
                  </div>
                )}
              </div>

              <FilterSection
                title="Price"
                items={derivedFilters.priceRanges}
                filterKey="priceRanges"
              />
              <FilterSection
                title="Size"
                items={derivedFilters.sizes}
                filterKey="sizes"
              />
              <FilterSection
                title="Tags"
                items={
                  derivedFilters.tags.length
                    ? derivedFilters.tags
                    : filterOptions.brands
                }
                filterKey="tags"
              />
              <FilterSection
                title="Colors"
                items={
                  derivedFilters.colors.length
                    ? derivedFilters.colors
                    : filterOptions.colors
                }
                filterKey="colors"
              />
            </div>

            <div className="mt-4">
              <Button
                className="w-full"
                onClick={() => setIsMobileFilterOpen(false)}
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </>
      )}

      <MobileBottomNav />
    </div>
  );
}
