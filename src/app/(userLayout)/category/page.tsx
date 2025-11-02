"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import CategoryProduct from "@/components/modules/category/CategoryProduct";
import BestSelling from "@/components/modules/category/BestSelling";
import Discount from "@/components/modules/category/Discount";
import SaveMoreSection from "@/components/modules/category/SaveMoreSection";
import AppPromo from "@/components/modules/category/AppPromo";
import { useGetAllProductsQuery, useGetDiscountedProductsQuery } from "@/redux/featured/product/productApi";
import { useGetAllCategoryQuery, type RemoteCategory } from "@/redux/featured/category/categoryApi";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import type { IProduct, ProductData } from "@/types/product";

export default function CategorySection() {
  const { data } = useGetAllProductsQuery();
  const { data: categoryData } = useGetAllCategoryQuery();
  const { data: discountedData, isLoading: discountLoading, isError: discountError } = useGetDiscountedProductsQuery();
  const searchParams = useSearchParams();
  const categorySlug = searchParams.get('slug');

  // Find the selected category
  const selectedCategory = useMemo(() => {
    if (!categorySlug || !categoryData) return null;
    return categoryData.find((cat: RemoteCategory) => 
      cat.slug === categorySlug || 
      cat._id === categorySlug || 
      cat.id === categorySlug
    );
  }, [categorySlug, categoryData]);

  // Filter products by category
  const categoryProducts = useMemo(() => {
    if (!data || !selectedCategory) return data;
    
    return data.filter((product: IProduct) => {
      const productCategories = product.brandAndCategories?.categories || [];
      return productCategories.some((cat: Record<string, unknown>) => 
        cat._id === selectedCategory._id ||
        cat.slug === selectedCategory.slug ||
        cat.name === selectedCategory.name
      );
    });
  }, [data, selectedCategory]);

  // ✅ Proper transformation with type safety
  const normalized: ProductData[] | undefined = Array.isArray(categoryProducts)
    ? categoryProducts.map((p: IProduct | Record<string, unknown>) => {
        // Type guard to check if it's IProduct
        // COMPLETELY FIXED VERSION:
const isIProduct = (item: unknown): item is IProduct => {
  // First check if it's an object
  if (!item || typeof item !== 'object') return false;
  
  const obj = item as Record<string, unknown>;
  
  // Check _id
  if (typeof obj._id !== 'string') return false;
  
  // Check description - PROPERLY
  if (!obj.description || typeof obj.description !== 'object') return false;
  
  const description = obj.description as Record<string, unknown>;
  if (typeof description.name !== 'string') return false;
  
  // Check productInfo - PROPERLY  
  if (!obj.productInfo || typeof obj.productInfo !== 'object') return false;
  
  const productInfo = obj.productInfo as Record<string, unknown>;
  if (typeof productInfo.price !== 'number') return false;
  
  return true;
};
        if (isIProduct(p)) {
          // Handle IProduct type
          const numericId = parseInt(p._id, 10);
          const salePrice = Number(p.productInfo.salePrice ?? 0);
          const regularPrice = Number(p.productInfo.price ?? 0);
          return {
            _id: p._id,
            id: isNaN(numericId) ? Date.now() : numericId,
            name: p.description.name,
            price: salePrice > 0 ? salePrice : regularPrice,
            salePrice: salePrice > 0 ? salePrice : undefined,
            originalPrice: salePrice > 0 ? regularPrice : undefined,
            subtitle: p.description.description,
            image: p.featuredImg,
            category: p.brandAndCategories.categories[0]?.name || undefined
          };
        } else {
          // Handle generic object type
          const pAny = p as Record<string, unknown>;
          const numericId = parseInt(pAny._id as string, 10);
          
          const name = 
            (pAny.name as string) || 
            ((pAny.description as Record<string, unknown>)?.name as string) || 
            (pAny.title as string) || 
            "Unnamed Product";
          
          const salePrice = Number((pAny.productInfo as Record<string, unknown>)?.salePrice ?? 0);
          const regularPrice = 
            typeof pAny.price === 'number' ? pAny.price :
            typeof pAny.price === 'string' ? parseFloat(pAny.price) || 0 :
            0;
          const price = salePrice > 0 ? salePrice : regularPrice;
          
          const subtitle = 
            (pAny.subtitle as string) || 
            ((pAny.description as Record<string, unknown>)?.subtitle as string) ||
            ((pAny.description as Record<string, unknown>)?.description as string) ||
            undefined;
          
          const image = 
            (pAny.featuredImg as string) ||
            (pAny.image as string) ||
            "/fallback-product.png";
          
          const category = 
            typeof pAny.category === 'string' ? pAny.category :
            undefined;

          return {
            _id: (pAny._id as string) || `product-${Date.now()}`,
            id: isNaN(numericId) ? Date.now() : numericId,
            name,
            price,
            salePrice: salePrice > 0 ? salePrice : undefined,
            originalPrice: salePrice > 0 ? regularPrice : undefined,
            subtitle,
            image,
            category
          };
        }
      })
    : undefined;

  // Show message if no category selected
  if (!categorySlug) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Select a Category</h1>
          <p className="text-gray-600">Please select a category from the homepage to view products.</p>
        </div>
      </div>
    );
  }

  // Show message if category not found
  if (categorySlug && !selectedCategory) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
          <p className="text-gray-600">The requested category could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="w-full bg-gray-50 rounded-2xl p-6 md:p-12 flex items-center justify-between gap-6 md:gap-10">
        {/* Left Content */}
        <div className="flex-1 max-w-lg space-y-4">
          <Badge className="px-4 py-2 rounded-full bg-primary text-[#2e2e2e] w-fit">
            ● {selectedCategory?.name || 'Category'}
          </Badge>

          <h2 className="text-sm sm:text-2xl md:text-4xl font-bold leading-snug">
            {selectedCategory?.name || 'Category'} <br /> Collection
          </h2>

          <p className="text-gray-600 text-[10px] sm:text-base md:text-lg leading-relaxed">
            {(selectedCategory as Record<string, unknown>)?.description as string || `Discover our amazing ${selectedCategory?.name || 'products'} collection. Quality products crafted for style and performance.`}
          </p>
        </div>

        {/* Right Image */}
        <div className="relative w-40 h-40 sm:w-56 sm:h-56 md:w-80 md:h-80 lg:w-96 lg:h-96 flex-shrink-0">
          <Image
            src={((selectedCategory as Record<string, unknown>)?.icon as Record<string, unknown>)?.url as string || (selectedCategory as Record<string, unknown>)?.image as string || "/placeholder.jpg"}
            alt={selectedCategory?.name || "Category"}
            fill
            className="object-contain"
            priority
          />
        </div>
      </section>

      <BestSelling data={normalized} title={`Best Selling ${selectedCategory?.name || 'Products'}`} />
      <CategoryProduct data={normalized} title={`${selectedCategory?.name || ''} Products`} />
      <Discount 
        data={discountedData}
        loading={discountLoading}
        error={discountError}
        title="Discounted Products"
        limit={6}
      />
      <SaveMoreSection />
      <AppPromo />
    </div>
  );
}