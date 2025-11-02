"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Check } from "lucide-react";
import { useRouter } from "next/navigation";

interface CheckoutHeaderProps {
  currentStep: 1 | 2 | 3 | 4;
}

export default function CheckoutHeader({ currentStep }: CheckoutHeaderProps) {
  const router = useRouter();

  return (
    <div className="text-center mb-6 md:mb-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">
        Complete Your Order
      </h1>
      <div className="relative flex items-center justify-center mb-6 md:mb-8">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/product-listing')}
          className="absolute left-0 hidden lg:flex items-center text-gray-600 hover:text-gray-800 border-gray-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Shopping
        </Button>
        <div className="flex items-center">
          <div className="flex flex-col items-center w-16 md:w-24">
            <div
              className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-medium ${
                currentStep >= 1
                  ? "bg-primary text-[#2e2e2e]"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {currentStep > 1 ? <Check className="w-3 h-3 md:w-4 md:h-4" /> : "1"}
            </div>
            <span
              className={`mt-1 text-xs ${
                currentStep >= 1
                  ? "text-secondary font-medium"
                  : "text-gray-500"
              }`}
            >
              Cart
            </span>
          </div>
          <div
            className={`w-4 md:w-8 h-1 ${
              currentStep >= 2 ? "bg-primary" : "bg-gray-300"
            }`}
          />
          <div className="flex flex-col items-center w-16 md:w-24">
            <div
              className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-medium ${
                currentStep >= 2
                  ? "bg-primary text-[#2e2e2e]"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {currentStep > 2 ? <Check className="w-3 h-3 md:w-4 md:h-4" /> : "2"}
            </div>
            <span
              className={`mt-1 text-xs ${
                currentStep >= 2
                  ? "text-secondary font-medium"
                  : "text-gray-500"
              }`}
            >
              Shipping
            </span>
          </div>
          <div
            className={`w-4 md:w-8 h-1 ${
              currentStep >= 3 ? "bg-primary" : "bg-gray-300"
            }`}
          />
          <div className="flex flex-col items-center w-16 md:w-24">
            <div
              className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-medium ${
                currentStep >= 3
                  ? "bg-primary text-[#2e2e2e]"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {currentStep > 3 ? <Check className="w-3 h-3 md:w-4 md:h-4" /> : "3"}
            </div>
            <span
              className={`mt-1 text-xs ${
                currentStep >= 3
                  ? "text-secondary font-medium"
                  : "text-gray-500"
              }`}
            >
              Payment
            </span>
          </div>
          <div
            className={`w-4 md:w-8 h-1 ${
              currentStep >= 4 ? "bg-primary" : "bg-gray-300"
            }`}
          />
          <div className="flex flex-col items-center w-16 md:w-24">
            <div
              className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-medium ${
                currentStep >= 4
                  ? "bg-primary text-[#2e2e2e]"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              4
            </div>
            <span
              className={`mt-1 text-xs ${
                currentStep >= 4
                  ? "text-secondary font-medium"
                  : "text-gray-500"
              }`}
            >
              Review
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}