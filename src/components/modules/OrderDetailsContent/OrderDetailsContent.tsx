"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type {
  IOrder,
} from "@/types/order";
import { statusLabel, trackingNumber, ymd } from "@/utils/order";
import { Check, X } from "lucide-react";
import Image from "next/image";

export function OrderDetailsContent({
  order,
  onClose,
}: {
  order: IOrder;
  onClose: () => void;
}) {
  // Handle new API structure
  const orderItems = Array.isArray(order.orderInfo) ? order.orderInfo : [];

  // show more control (many items)
  const [showAll, setShowAll] = useState(false);
  const VISIBLE = 8;
  const visibleItems = showAll ? orderItems : orderItems.slice(0, VISIBLE);
  const hasMore = orderItems.length > VISIBLE;

  // tracking + totals (prefer per-line totals; fallback to top-level number)
  const tracking = trackingNumber(order);
  const topLevelTotal =
    typeof order.totalAmount === "number" ? order.totalAmount : undefined;

  return (
    <>
      {/* Sticky header */}
      <div className="px-6 pt-6 pb-3 border-b bg-white sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <DialogHeader className="p-0">
            <DialogTitle className="text-lg font-semibold">
              Order Details - {order._id}
            </DialogTitle>
          </DialogHeader>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-300 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5 text-red-500" />
          </button>
        </div>
        <div className="mt-2 flex items-center gap-2 text-sm">
          <Check className="h-5 w-5 text-green-600" />
          <span className="font-medium text-green-600">
            {statusLabel(order)}
          </span>
          <span className="text-gray-500">• {ymd(order.createdAt)}</span>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="px-6 pb-6 max-h-[75svh] md:max-h-[80svh] overflow-y-auto">
        {/* Meta */}
        <div className="text-sm text-gray-600 mt-3">
          <div>Generated on: {ymd(order.createdAt)}</div>
          <div>Tracking Number: {tracking || "N/A"}</div>
        </div>

        {/* Items */}
        <div className="mt-5">
          <h3 className="font-medium text-gray-900 mb-3">Items ({orderItems.length})</h3>
          <div className="space-y-3 relative">
            {visibleItems.map((item: unknown, idx: number) => {
              // Handle new API structure
              const itemData = item as Record<string, unknown>;
              const productInfo = (itemData.productInfo as Record<string, unknown>) || {};
              const productName = String((productInfo?.description as Record<string, unknown>)?.name || "Product");
              const productImage = String(productInfo?.featuredImg || "/placeholder.svg");
              const productInfoData = (productInfo?.productInfo as Record<string, unknown>) || {};
              const price = Number(itemData.selectedPrice || productInfoData?.salePrice || productInfoData?.price || 0);
              const quantity = Number(itemData.quantity || 1);
              const totalAmount = (itemData.totalAmount as Record<string, unknown>) || {};
              const total = Number(totalAmount.total || (price * quantity));

              return (
                <div
                  key={`item-${idx}`}
                  className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="relative w-12 h-12 md:w-14 md:h-14 rounded overflow-hidden border border-gray-200 flex-shrink-0">
                    <Image
                      src={productImage}
                      alt={productName}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 48px, 56px"
                      unoptimized={productImage.startsWith("http")}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 truncate">
                      {productName}
                    </div>
                    <div className="text-sm text-gray-500">
                      Qty: {quantity} × ৳{price.toFixed(2)}
                    </div>
                  </div>
                  <div className="font-medium text-gray-900">
                    ৳{total.toFixed(2)}
                  </div>
                </div>
              );
            })}

            {/* Fade overlay before show more */}
            {!showAll && hasMore && (
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent" />
            )}
          </div>

          {/* Show more / less */}
          {hasMore && (
            <div className="mt-3 flex justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAll((s) => !s)}
              >
                {showAll ? "Show less" : `Show all items (${orderItems.length})`}
              </Button>
            </div>
          )}
        </div>

        {/* Customer & Payment Info */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">
              Customer Information
            </h3>
            <div className="text-sm text-gray-600 space-y-1">
              {typeof order.customerInfo === 'object' && order.customerInfo && (
                <>
                  <div className="font-medium text-gray-900">
                    {order.customerInfo.firstName} {order.customerInfo.lastName}
                  </div>
                  <div>{order.customerInfo.email}</div>
                  <div>{order.customerInfo.phone}</div>
                  <div>{order.customerInfo.address}</div>
                  <div>{order.customerInfo.country}</div>
                </>
              )}
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-3">
              Order Summary
            </h3>
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method:</span>
                <span>{order.paymentInfo === 'cash-on' ? 'Cash on Delivery' : typeof order.paymentInfo === 'string' ? order.paymentInfo : 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Quantity:</span>
                <span>{String((order as unknown as Record<string, unknown>).totalQuantity || orderItems.length)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="capitalize">{String((order as unknown as Record<string, unknown>).status || 'pending')}</span>
              </div>
              <div className="flex justify-between font-medium text-gray-900 pt-2 border-t">
                <span>Total Amount:</span>
                <span>৳{topLevelTotal?.toFixed(2) || '0.00'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex gap-3 pt-4">
          <Button variant="outline"  onClick={onClose} className="flex-1 hover:bg-orange-300">
            Close
          </Button>
          <Button className="flex-1 bg-primary hover:bg-gray-300">
            Buy Again
          </Button>
        </div>
      </div>
    </>
  );
}
