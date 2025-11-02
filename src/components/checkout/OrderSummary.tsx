"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, Tag, Copy, X } from "lucide-react";
import { TCoupon } from "@/redux/featured/coupons/couponSlice";

interface OrderSummaryProps {
  subTotal: number;
  discount: number;
  finalTotal: number;
  appliedCoupon: TCoupon | null;
  promoCode: string;
  couponsData: TCoupon[] | undefined;
  onPromoCodeChange: (value: string) => void;
  onApplyPromoCode: () => void;
  onRemoveCoupon: () => void;
  onCopyCouponCode: (code: string) => void;
}

export default function OrderSummary({
  subTotal,
  discount,
  finalTotal,
  appliedCoupon,
  promoCode,
  couponsData,
  onPromoCodeChange,
  onApplyPromoCode,
  onRemoveCoupon,
  onCopyCouponCode
}: OrderSummaryProps) {
  return (
    <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 h-fit lg:sticky lg:top-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 md:mb-6 pb-3 border-b">
        Order Summary
      </h2>
      <div className="space-y-3 mb-4 md:mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-gray-900">৳{subTotal.toFixed(2)}</span>
        </div>
        {appliedCoupon && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">
              {appliedCoupon.type === "free-shipping" ? "Free Shipping" : "Discount"}
            </span>
            <span className="text-green-600">
              {appliedCoupon.type === "free-shipping" 
                ? "Free" 
                : `-৳${discount.toFixed(2)}`}
            </span>
          </div>
        )}
        <div className="border-t pt-3">
          <div className="flex justify-between font-medium">
            <span className="text-gray-900">Total</span>
            <span className="text-gray-900">
              ৳{finalTotal.toFixed(2)}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">Including VAT</p>
        </div>
      </div>
      
      {/* Security Badge */}
      <div className="flex items-center justify-center space-x-2 mb-4 p-3 bg-gray-50 rounded-lg">
        <Shield className="w-4 h-4 text-green-600" />
        <span className="text-xs text-gray-600">
          Secure SSL encrypted checkout
        </span>
      </div>
      
      {/* Available Coupons */}
      {couponsData && couponsData.length > 0 && (
        <div className="border-t pt-4 mb-4">
          <p className="text-sm font-medium text-gray-900 mb-3 flex items-center">
            <Tag className="w-4 h-4 mr-2 text-orange-500" />
            Available Coupons
          </p>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {couponsData
              .filter((coupon: TCoupon) => coupon.isApproved)
              .map((coupon: TCoupon) => {
                const isEligible = subTotal >= coupon.minimumPurchaseAmount;
                const isExpired = new Date(coupon.expireDate) < new Date();
                return (
                  <div
                    key={coupon._id}
                    className={`p-2 rounded-lg border text-xs ${
                      isEligible && !isExpired
                        ? "border-green-200 bg-green-50"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-orange-600">
                            {coupon.code}
                          </span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => onCopyCouponCode(coupon.code)}
                            className="h-5 w-5 p-0 hover:bg-orange-100"
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                        <p className="text-gray-600 mt-1">{coupon.description}</p>
                        <p className="text-gray-500 mt-1">
                          {coupon.type === "free-shipping"
                            ? "Free shipping"
                            : coupon.type === "percentage"
                            ? `${coupon.discountAmount}% off`
                            : `৳${coupon.discountAmount} off`}
                          {" • Min: ৳"}{coupon.minimumPurchaseAmount}
                        </p>
                      </div>
                      {!isEligible && (
                        <span className="text-red-500 text-xs">
                          Need ৳{(coupon.minimumPurchaseAmount - subTotal).toFixed(2)} more
                        </span>
                      )}
                      {isExpired && (
                        <span className="text-red-500 text-xs">Expired</span>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
      
      {/* Promo Code */}
      <div className="border-t pt-4">
        <p className="text-sm font-medium text-gray-900 mb-2">
          Apply Coupon Code
        </p>
        {appliedCoupon ? (
          <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
            <div>
              <p className="text-sm font-medium text-green-800">
                {appliedCoupon.code} Applied
              </p>
              <p className="text-xs text-green-600">
                {appliedCoupon.description}
              </p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onRemoveCoupon}
              className="text-red-600 hover:text-red-800 hover:bg-red-50"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-2">
            <Input
              placeholder="Enter coupon code"
              value={promoCode}
              onChange={(e) => onPromoCodeChange(e.target.value.toUpperCase())}
              className="flex-1 h-10"
            />
            <Button
              type="button"
              onClick={onApplyPromoCode}
              className="bg-primary hover:bg-gray-400 h-10 w-full md:w-auto px-4"
            >
              Apply
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}