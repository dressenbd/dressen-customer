"use client";

import { CheckCircle2, Truck } from "lucide-react";

interface PaymentMethodProps {
  paymentMethod: "cod" | "bkash" | "nagad";
  onPaymentMethodChange: (method: "cod" | "bkash" | "nagad") => void;
}

export default function PaymentMethod({ paymentMethod, onPaymentMethodChange }: PaymentMethodProps) {
  return (
    <>
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center mr-3">
          <Truck className="w-4 h-4 text-orange-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">
          Payment Information
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div
          onClick={() => onPaymentMethodChange("cod")}
          className={`rounded-lg border p-4 cursor-pointer transition-all duration-200 relative ${
            paymentMethod === "cod"
              ? "border-orange-500 ring-2 ring-orange-200"
              : "border-gray-300 hover:border-orange-400"
          }`}
        >
          <div className="flex items-center">
            <Truck className="w-5 h-5 mr-3 text-gray-600" />
            <div>
              <p className="font-medium text-gray-800">
                Cash on Delivery
              </p>
              <p className="text-xs text-gray-500">
                Pay when you receive
              </p>
            </div>
          </div>
          {paymentMethod === "cod" && (
            <CheckCircle2 className="absolute top-3 right-3 w-5 h-5 text-orange-500" />
          )}
        </div>
        <div
          onClick={() => onPaymentMethodChange("bkash")}
          className={`rounded-lg border p-4 cursor-pointer transition-all duration-200 relative ${
            paymentMethod === "bkash"
              ? "border-orange-500 ring-2 ring-orange-200"
              : "border-gray-300 hover:border-orange-400"
          }`}
        >
          <div className="flex items-center">
            <Truck className="w-5 h-5 mr-3 text-gray-600" />
            <div>
              <p className="font-medium text-gray-800">bKash</p>
              <p className="text-xs text-gray-500">
                Mobile Payment
              </p>
            </div>
          </div>
          {paymentMethod === "bkash" && (
            <CheckCircle2 className="absolute top-3 right-3 w-5 h-5 text-orange-500" />
          )}
        </div>
        <div
          onClick={() => onPaymentMethodChange("nagad")}
          className={`rounded-lg border p-4 cursor-pointer transition-all duration-200 relative ${
            paymentMethod === "nagad"
              ? "border-orange-500 ring-2 ring-orange-200"
              : "border-gray-300 hover:border-orange-400"
          }`}
        >
          <div className="flex items-center">
            <Truck className="w-5 h-5 mr-3 text-gray-600" />
            <div>
              <p className="font-medium text-gray-800">Nagad</p>
              <p className="text-xs text-gray-500">
                Mobile Payment
              </p>
            </div>
          </div>
          {paymentMethod === "nagad" && (
            <CheckCircle2 className="absolute top-3 right-3 w-5 h-5 text-orange-500" />
          )}
        </div>
      </div>
      {paymentMethod === "cod" && (
        <div className="rounded-lg border bg-gray-50 p-6 text-center animate-in fade-in duration-300">
          <Truck className="w-8 h-8 mx-auto text-gray-500 mb-2" />
          <p className="text-sm font-medium text-gray-800">
            You will pay in cash upon delivery.
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Please have the exact amount ready.
          </p>
        </div>
      )}
      {paymentMethod === "bkash" && (
        <div className="rounded-lg border bg-gray-50 p-6 text-center animate-in fade-in duration-300">
          <Truck className="w-8 h-8 mx-auto text-gray-500 mb-2" />
          <p className="text-sm font-medium text-gray-800 mb-2">
            bKash Number: +8801909008004
          </p>
          <p className="text-xs text-gray-500">
            Send money to this number and call admin at +8801909008004
            to confirm your payment.
          </p>
        </div>
      )}
      {paymentMethod === "nagad" && (
        <div className="rounded-lg border bg-gray-50 p-6 text-center animate-in fade-in duration-300">
          <Truck className="w-8 h-8 mx-auto text-gray-500 mb-2" />
          <p className="text-sm font-medium text-gray-800 mb-2">
            Nagad Number: +8801909008004
          </p>
          <p className="text-xs text-gray-500">
            Send money to this number and call admin at +8801909008004
            to confirm your payment.
          </p>
        </div>
      )}
    </>
  );
}