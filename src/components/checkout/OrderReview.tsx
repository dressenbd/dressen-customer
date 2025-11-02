"use client";

import { Button } from "@/components/ui/button";
import { Truck } from "lucide-react";
import Image from "next/image";
import { CartItem } from "@/redux/featured/cart/cartSlice";

interface OrderReviewProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: "cod" | "bkash" | "nagad";
  cartItems: CartItem[];
  onEditShipping: () => void;
  onEditPayment: () => void;
}

const num = (v: unknown, d = 0): number => {
  const n = typeof v === "number" ? v : typeof v === "string" ? Number(v) : NaN;
  return Number.isFinite(n) ? n : d;
};

export default function OrderReview({ 
  formData, 
  paymentMethod, 
  cartItems, 
  onEditShipping, 
  onEditPayment 
}: OrderReviewProps) {
  return (
    <div className="w-full block">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Review Your Order
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Please confirm all details before placing your order
        </p>
      </div>
      <div className="space-y-6 w-full">
        {/* Customer Information */}
        <div className="border rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
            <Truck className="w-4 h-4 mr-2 text-orange-500" />
            Customer Information
          </h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p>{`${formData.firstName} ${formData.lastName}`}</p>
            <p>{formData.email}</p>
            <p>{formData.address}</p>
            <p>{formData.phone}</p>
            <p>{formData.country}</p>
          </div>
          <Button
            type="button"
            onClick={onEditShipping}
            variant="link"
            className="text-orange-500 p-0 h-auto text-xs mt-2"
          >
            Edit customer information
          </Button>
        </div>
        
        {/* Payment Method */}
        <div className="border rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
            <Truck className="w-4 h-4 mr-2 text-orange-500" />
            Payment Method
          </h3>
          {paymentMethod === "cod" ? (
            <div className="text-sm text-gray-700">
              Cash on delivery
            </div>
          ) : paymentMethod === "bkash" ? (
            <div className="text-sm text-gray-700">
              bKash Mobile Payment
            </div>
          ) : (
            <div className="text-sm text-gray-700">
              Nagad Mobile Payment
            </div>
          )}
          <Button
            type="button"
            onClick={onEditPayment}
            variant="link"
            className="text-orange-500 p-0 h-auto text-xs mt-2"
          >
            Edit payment method
          </Button>
        </div>

        {/* Order Items */}
        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-900">
              Order Items: ({cartItems.length})
            </h3>
          </div>
          <div className="max-h-[200px] overflow-y-auto space-y-3">
            {cartItems.length > 0
              ? cartItems.map((item: CartItem, index: number) => {
                  const title = item.productName ?? "Product";
                  const lineTotal = item.totalAmount;
                  const img = item.productImage ?? "/placeholder.svg";
                  return (
                    <div
                      key={`${item.productId}-${index}`}
                      className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center">
                        <div className="w-10 h-10 relative rounded overflow-hidden">
                          <Image
                            src={img}
                            alt={title}
                            fill
                            className="object-cover"
                            sizes="40px"
                            unoptimized={img.startsWith("http")}
                          />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {title}
                        </p>
                        <p className="text-xs text-gray-600">
                          Qty: {num(item.quantity, 1)}
                          {(item.size || item.color) && (
                            <span className="ml-2">
                              {item.size && <span>• Size: {item.size.toUpperCase()}</span>}
                              {item.size && item.color && <span> </span>}
                              {item.color && <span>• Color: {item.color}</span>}
                            </span>
                          )}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          ৳{lineTotal.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  );
                })
              : "No items in the cart"}
          </div>
        </div>
      </div>
    </div>
  );
}