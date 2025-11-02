/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useMemo, useEffect } from "react";
import { useParams } from "next/navigation";
import { ShoppingCart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  useCreateCustomerMutation,
  useGetSingleCustomerQuery,
} from "@/redux/featured/customer/customerApi";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/featured/auth/authSlice";
import Image from "next/image";

// Strip unnecessary fields
function stripServerFields<T extends Record<string, any>>(data: T) {
  const { id, _id, createdAt, updatedAt, ...rest } = data || {};
  return rest;
}

export default function CustomerSync() {
  const currentUser = useAppSelector(selectCurrentUser);
  const params = useParams();
  const customerId = "68977cb8e9dabd00341e79e0";

  const {
    data: customer,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetSingleCustomerQuery(customerId, { skip: !customerId });

  const [createCustomer, { isLoading: creating, isSuccess: createOk }] =
    useCreateCustomerMutation();

  const clonedPayload = useMemo(() => {
    if (!customer) return null;
    const base = stripServerFields(customer);
    return {
      ...base,
      clonedFrom: customerId,
    };
  }, [customer, customerId]);

  useEffect(() => {

  }, [customer]);

  useEffect(() => {
    if (isError) console.error("❌ API Error:", error);
  }, [isError, error]);

  const handleClone = async () => {
    if (!clonedPayload) return;
    try {
      const res = await createCustomer(clonedPayload).unwrap();
      alert("✅ Customer cloned (POST) successfully!");
    } catch (e: any) {
      alert("❌ Clone failed. Check console/logs.");
    }
  };

  if (!customerId) {
    return (
      <p className="text-sm text-gray-500">
        ⚠️ URL এ /customers/[id] ফরম্যাটে id দিন।
      </p>
    );
  }

  if (isLoading) {
    return <p className="text-sm">Loading customer...</p>;
  }

  if (isError) {
    return (
      <p className="text-sm text-red-600">Error: {JSON.stringify(error)}</p>
    );
  }

  if (!customer) {
    return <p className="text-sm text-gray-500">No customer found.</p>;
  }

  // Assume wishlist is an array of objects with { id, name, category, price }
  const wishlistItems = Array.isArray(customer.wishlist)
    ? customer.wishlist
    : [];

  return (
    <div className="w-full p-6">
      <h1 className="text-2xl font-semibold mb-8">My Wishlist</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {wishlistItems.map((item: any) => (
          <Card key={item.id || item._id} className="p-4 relative">
            <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
              <X size={16} />
            </button>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-gray-200 rounded-md flex items-center justify-center text-gray-400 text-xs">
                  <Image
                    src={
                      item.wishlist?.products?.productInfo?.external?.productUrl
                    } // fallback image
                    alt={item.userId?.name || "User"}
                    width={48}
                    height={48}
                    className="rounded object-cover"
                  />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 mb-1">
                  {item.products?.description?.name || "Unknown"}
                </h3>
                <p className="text-sm text-gray-500 mb-3">
                  {item.products?.description?.description || "-"}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">
                    ${item.products?.productInfo?.price || 0}
                  </span>
                  <Button
                    size="sm"
                    className="bg-orange-500 hover:bg-orange-600 text-[#2e2e2e] px-3 py-1.5 text-sm"
                    onClick={handleClone}
                    disabled={!clonedPayload || creating}
                  >
                    <ShoppingCart size={14} className="mr-1" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
