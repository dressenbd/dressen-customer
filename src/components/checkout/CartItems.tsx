"use client";

import { Button } from "@/components/ui/button";
import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import { CartItem, selectCartTotalItems } from "@/redux/featured/cart/cartSlice";
import { useAppSelector } from "@/redux/hooks";

interface CartItemsProps {
  cartItems: CartItem[];
  onQuantityChange: (productId: string, direction: "inc" | "dec") => void;
  onRemoveItem: (productId: string) => void;
}

export default function CartItems({ cartItems, onQuantityChange, onRemoveItem }: CartItemsProps) {
  const cartCount = useAppSelector(selectCartTotalItems);
  
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Your Items: ({cartCount})</h3>
        
      </div>
      {cartItems.length > 0 ? (
        <div className="space-y-3 max-h-96 lg:max-h-80 overflow-y-auto">
          {cartItems.map((item) => (
            <div
              key={item.productId}
              className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 p-3 bg-gray-50 rounded-lg"
            >
              <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <div className="w-10 h-10 relative rounded overflow-hidden">
                  <Image
                    src={item.productImage}
                    alt={item.productName}
                    fill
                    className="object-cover"
                    sizes="40px"
                    unoptimized
                  />
                </div>
              </div>
              <div className="flex-1 min-w-0 w-full sm:w-auto">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {item.productName}
                </p>
                <p className="text-xs text-gray-600">
                  ৳{item.unitPrice.toFixed(2)} each
                </p>
                {(item.size || item.color) && (
                  <p className="text-xs text-gray-500">
                    {item.size && <span>Size: {item.size.toUpperCase()}</span>}
                    {item.size && item.color && <span> • </span>}
                    {item.color && <span>Color: {item.color}</span>}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between w-full sm:w-auto sm:flex-shrink-0">
                <div className="flex items-center space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => onQuantityChange(item.productId, "dec")}
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-8 text-center text-sm font-medium">
                    {item.quantity}
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => onQuantityChange(item.productId, "inc")}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      ৳{item.totalAmount.toFixed(2)}
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveItem(item.productId)}
                  >
                    <X className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No items in cart</p>
      )}
    </div>
  );
}