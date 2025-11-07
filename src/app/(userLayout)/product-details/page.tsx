"use client";


import { useSearchParams } from "next/navigation";
import ProductDetails from "@/components/product/ProductDetails";
import { useGetSingleProductQuery } from "@/redux/featured/product/productApi";
import { IProduct, RemoteProduct } from "@/types/product";
import { useScrollToTop } from "@/hooks/useScrollToTop";

// Normalize RemoteProduct to IProduct
const normalizeProduct = (data: RemoteProduct): IProduct => {
  if (!data) {
    return {
      _id: "",
      shopId: "",
      featuredImg: "/placeholder.png",
      gallery: [],
      brandAndCategories: {
        brand: { name: "" },
        categories: [],
        tags: [],
      },
      description: {
        name: "Product Not Found",
        unit: "",
        description: "No description available",
        status: "unavailable",
        slug: ""
      },
      productType: "",
      productInfo: {
        price: 0,
        salePrice: 0,
        quantity: 0,
        sku: "",
        width: "",
        height: "",
        length: "",
      },
    };
  }

  return {
    _id: data._id || "",
    shopId: data.shopId || "",
    featuredImg: data.featuredImg || "/placeholder.png",
    gallery: Array.isArray(data.gallery) ? data.gallery : [],
    brandAndCategories: {
      brand: data.brandAndCategories?.brand || { name: "" },
      categories: Array.isArray(data.brandAndCategories?.categories)
        ? data.brandAndCategories.categories
        : [],
      tags: Array.isArray(data.brandAndCategories?.tags)
        ? data.brandAndCategories.tags
        : [],
      subcategory: data.brandAndCategories?.subcategory,
    },
    description: {
      name: data.description?.name || "Untitled Product",
      unit: data.description?.unit || "",
      description: data.description?.description || "No description available",
      status: data.description?.status || "available",
      slug: data.description?.slug || "",
    },
    productType: data.productType || "",
    productInfo: {
      price: data.productInfo?.price || 0,
      salePrice: data.productInfo?.salePrice || 0,
      quantity: data.productInfo?.quantity || 0,
      sku: data.productInfo?.sku || "",
      width: data.productInfo?.width || "",
      height: data.productInfo?.height || "",
      length: data.productInfo?.length || "",
    },
    specifications: data.specifications || [],
  };
};

// Loading component for better UX
function ProductLoading() {
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image skeleton */}
        <div>
          <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-200 animate-pulse" />
          <div className="mt-4 grid grid-cols-4 gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
        
        {/* Content skeleton */}
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded animate-pulse w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
          <div className="h-10 bg-gray-200 rounded animate-pulse w-1/3"></div>
          <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

// Error component
function ProductError({ message }: { message: string }) {
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="text-center py-12">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <button 
          onClick={() => window.history.back()}
          className="bg-orange-500 text-[#2e2e2e] px-6 py-2 rounded-lg hover:bg-orange-600 transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default function ProductDetailsPage() {
  useScrollToTop();
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "";

  // Fetch product data for non-fallback IDs
  const { 
    data, 
    isLoading, 
    error,
    isError 
  } = useGetSingleProductQuery(id, {
    skip: !id ,
  });



  // Handle loading state
  if (isLoading) {
    return <ProductLoading />;
  }

  // Handle invalid id
  if (!id) {
    return (
      <ProductError message="Invalid product ID. Please check the product link." />
    );
  }

 
  // Handle error state
  if (isError || error) {
    return (
      <ProductError message="Failed to load product details. Please try again later." />
    );
  }

  // Handle no data case
  if (!data) {
    return (
      <ProductError message="Product not found. It may have been removed or is no longer available." />
    );
  }

  // Normalize and render product
  const normalizedProduct = normalizeProduct(data);
  return <ProductDetails product={normalizedProduct} />;
}