"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, Copy } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface ThanksModalProps {
  isOpen: boolean;
  trackingNumber: string;
  onClose: () => void;
}

export default function ThanksModal({ isOpen, trackingNumber, onClose }: ThanksModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-xs flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-md mx-4 text-center shadow-2xl">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Order Placed Successfully!
        </h2>
        <p className="text-gray-600 mb-6">
          Your order has been placed successfully. We&apos;ll process it shortly.
        </p>
        
        {/* Tracking Number Section */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-sm font-medium text-gray-700 mb-2">Tracking Number</p>
          <div className="flex items-center justify-between bg-white border rounded-lg p-3">
            <span className="font-mono text-sm font-bold text-gray-900">{trackingNumber}</span>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(trackingNumber);
                toast.success('Tracking number copied to clipboard!');
              }}
              variant="outline"
              size="sm"
              className="ml-2"
            >
              <Copy className="w-4 h-4 mr-1" />
              Copy
            </Button>
          </div>
          <p className="text-xs text-red-700 mt-2">
            Save this tracking number for future reference. You can also use it to track your order
          </p>
        </div>
        
        <div className="flex flex-col gap-3">
          <Button
            onClick={() => {
              onClose();
              router.push('/dashboard/orders');
            }}
            className="w-full bg-primary hover:bg-primary/90"
          >
            View Your Orders
          </Button>
          <div className="flex gap-3">
            <Button
              onClick={() => {
                onClose();
                router.push('/product-listing');
              }}
              variant="outline"
              className="flex-1"
            >
              Continue Shopping
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}