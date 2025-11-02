"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Lock, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AddPaymentMethod() {
  const [formData, setFormData] = useState({
    cardNumber: "",
    expirationDate: "",
    cvc: "",
    nameOnCard: "",
    billingAddress: "",
    setAsDefault: false,
    saveCard: false,
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleCancel = () => {
  };

  return (
    <div className="w-full min-h-screen  bg-white">
      {/* w-full + mx-auto here */}
      <div className="w-full max-w-6xl mx-auto ">
        <Card className="rounded-sm border border-slate-200/60 shadow-none">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-3">
              <Link href={`/dashboard/add-payment-method-form`}>
                <Button variant="ghost" size="sm" className="p-0 h-auto">
                  <ArrowLeft className="h-5 w-5 text-gray-600" />
                </Button>
              </Link>
              <h1 className="text-lg font-medium text-gray-900">
                Add Payment Method
              </h1>
            </div>
          </CardHeader>

          <CardContent>
            {/* Security notice */}
            <div className="flex items-center gap-2 p-3 mb-4 bg-slate-50 border border-slate-200 rounded-md text-sm text-gray-600">
              <Lock className="h-4 w-4 text-green-600" />
              <span>
                Your payment information is encrypted and secure. We never store
                your full card details.
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Card Number */}
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <CreditCard className="h-4 w-4" />
                  </span>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    inputMode="numeric"
                    className="h-11 pl-9"
                    value={formData.cardNumber}
                    onChange={(e) =>
                      handleInputChange("cardNumber", e.target.value)
                    }
                  />
                </div>
              </div>

              {/* Expiration / CVC */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expirationDate">Expiration Date</Label>
                  <Input
                    id="expirationDate"
                    placeholder="MM/YY"
                    className="h-11"
                    value={formData.expirationDate}
                    onChange={(e) =>
                      handleInputChange("expirationDate", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input
                    id="cvc"
                    placeholder="123"
                    className="h-11"
                    value={formData.cvc}
                    onChange={(e) => handleInputChange("cvc", e.target.value)}
                  />
                </div>
              </div>

              {/* Name on Card */}
              <div className="space-y-2">
                <Label htmlFor="nameOnCard">Name on Card</Label>
                <Input
                  id="nameOnCard"
                  placeholder="John Doe"
                  className="h-11"
                  value={formData.nameOnCard}
                  onChange={(e) =>
                    handleInputChange("nameOnCard", e.target.value)
                  }
                />
              </div>

              {/* Billing Address */}
              <div className="space-y-2">
                <Label htmlFor="billingAddress">Billing Address</Label>
                <Select
                  onValueChange={(value) =>
                    handleInputChange("billingAddress", value)
                  }
                >
                  <SelectTrigger id="billingAddress" className="h-11">
                    <SelectValue placeholder="Select a saved address" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="address1">123 Main St, NY</SelectItem>
                    <SelectItem value="address2">456 Park Ave, CA</SelectItem>
                    <SelectItem value="address3">789 Market St, TX</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Options */}
              <div className="flex flex-col gap-2 pt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="setAsDefault"
                    checked={formData.setAsDefault}
                    onCheckedChange={(checked) =>
                      handleInputChange("setAsDefault", checked as boolean)
                    }
                  />
                  <Label htmlFor="setAsDefault" className="text-sm text-gray-700">
                    Set as default payment method
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="saveCard"
                    checked={formData.saveCard}
                    onCheckedChange={(checked) =>
                      handleInputChange("saveCard", checked as boolean)
                    }
                  />
                  <Label htmlFor="saveCard" className="text-sm text-gray-700">
                    Save card for future purchases
                  </Label>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  className="h-11 bg-transparent"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="h-11 bg-orange-500 hover:bg-orange-600 text-[#2e2e2e]"
                >
                  Save Payment Method
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
