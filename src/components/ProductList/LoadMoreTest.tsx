"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useGetPaginatedProductsQuery } from "@/redux/featured/product/productApi";

export default function LoadMoreTest() {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: paginatedData,
    isLoading,
    isError,
    isFetching,
  } = useGetPaginatedProductsQuery({ 
    page: currentPage, 
    limit: 5 
  });

  const products = paginatedData?.data || [];
  const hasNextPage = paginatedData?.pagination?.hasNextPage || false;

  const handleLoadMore = () => {
    if (hasNextPage && !isFetching) {
      setCurrentPage(prev => prev + 1);
    }
  };

  if (isLoading && currentPage === 1) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading products</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Load More Test</h2>
      
      <div className="space-y-2 mb-4">
        {products.map((product) => (
          <div key={product._id} className="p-2 border rounded">
            <h3 className="font-medium">{product.description?.name}</h3>
            <p className="text-sm text-gray-600">
              Price: ৳{product.productInfo?.price}
            </p>
          </div>
        ))}
      </div>

      {hasNextPage && (
        <Button 
          onClick={handleLoadMore}
          disabled={isFetching}
          className="w-full"
        >
          {isFetching ? "Loading..." : "Load More"}
        </Button>
      )}

      <div className="mt-4 text-sm text-gray-600">
        Page: {currentPage} | Total: {paginatedData?.pagination?.totalItems || 0}
      </div>
    </div>
  );
}