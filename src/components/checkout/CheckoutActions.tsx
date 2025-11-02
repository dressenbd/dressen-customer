"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface CheckoutActionsProps {
  currentStep: 1 | 2 | 3 | 4;
  createOrderLoading: boolean;
  cartItemsLength: number;
  onBackClick: () => void;
  onNextStepOrSubmit: () => void;
}

export default function CheckoutActions({
  currentStep,
  createOrderLoading,
  cartItemsLength,
  onBackClick,
  onNextStepOrSubmit
}: CheckoutActionsProps) {
  const nextCtaText =
    currentStep === 1
      ? "Continue to Shipping"
      : currentStep === 2
      ? "Continue to Payment"
      : currentStep === 3
      ? "Review Order"
      : "Place Order";

  return (
    <>
      {/* Desktop actions */}
      <div className="mt-6 hidden md:flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onBackClick}
          className="bg-transparent text-gray-700 border-gray-300 h-10 px-4 text-sm"
          disabled={currentStep === 1}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button
          type="button"
          onClick={onNextStepOrSubmit}
          className="bg-primary hover:bg-gray-300 h-10 px-5 text-sm"
          disabled={createOrderLoading || cartItemsLength === 0}
        >
          {createOrderLoading ? `Creating Order...` : nextCtaText}
          {currentStep < 4 && <ArrowRight className="w-4 h-4 ml-2" />}
        </Button>
      </div>

      {/* Mobile controls */}
      <div className="mt-4 flex justify-end flex-col md:hidden gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={onBackClick}
          className="bg-transparent text-gray-700 border-gray-300 h-12 w-full"
          disabled={currentStep === 1}
        >
          <ArrowLeft className="mr-2" />
          Back
        </Button>
        <Button
          type="button"
          onClick={onNextStepOrSubmit}
          className="bg-primary hover:bg-orange-600 px-6 py-2 h-12 w-full"
          disabled={createOrderLoading || cartItemsLength === 0}
        >
          {createOrderLoading ? `Creating Order...` : nextCtaText}
          {currentStep < 4 && <ArrowRight className="ml-2" />}
        </Button>
      </div>
    </>
  );
}