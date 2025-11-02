"use client";

import { useState } from "react";
import { ArrowLeft, CreditCard, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

export default function EditPaymentMethod() {
  const [cardNumber, setCardNumber] = useState("4242 4242 4242 4242");
  const [expirationDate, setExpirationDate] = useState("12/25");
  const [cvc, setCvc] = useState("123");
  const [nameOnCard, setNameOnCard] = useState("John Doe");
  const [billingAddress, setBillingAddress] = useState("home");
  const [setAsDefault, setSetAsDefault] = useState(true);
  const [saveCard, setSaveCard] = useState(true);

  return (
    <div className="min-h-screen w-full rounded-xl  bg-[#FFFFFF] shadow-sm p-4 ml-4  p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link href={`/dashboard/add-payment-method-form`}>
          <Button variant="ghost" size="sm" className="p-0 h-auto">
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Button>
        </Link>
        <h1 className="text-lg font-medium text-gray-900">
          Edit Payment Method
        </h1>
      </div>

      {/* Security Notice */}
      <div className="flex items-start gap-2 mb-6 p-3 bg-green-50 rounded-md border border-green-200">
        <Shield className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
        <p className="text-sm text-green-800">
          Your payment information is encrypted and secure. We never store your
          full card details.
        </p>
      </div>

      <div className="space-y-4">
        {/* Card Number */}
        <div className="space-y-2">
          <Label
            htmlFor="cardNumber"
            className="text-sm font-medium text-gray-700"
          >
            Card Number
          </Label>
          <div className="relative">
            <Input
              id="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="pl-10 font-mono"
              placeholder="1234 1234 1234 1234"
            />
            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          <p className="text-xs text-gray-500">Card Type: Visa</p>
        </div>

        {/* Expiration Date and CVC */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label
              htmlFor="expirationDate"
              className="text-sm font-medium text-gray-700"
            >
              Expiration Date
            </Label>
            <Input
              id="expirationDate"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              placeholder="MM/YY"
              className="font-mono"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cvc" className="text-sm font-medium text-gray-700">
              CVC
            </Label>
            <Input
              id="cvc"
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
              placeholder="123"
              className="font-mono"
            />
          </div>
        </div>

        {/* Name on Card */}
        <div className="space-y-2">
          <Label
            htmlFor="nameOnCard"
            className="text-sm font-medium text-gray-700"
          >
            Name on Card
          </Label>
          <Input
            id="nameOnCard"
            value={nameOnCard}
            onChange={(e) => setNameOnCard(e.target.value)}
            placeholder="John Doe"
          />
        </div>

        {/* Billing Address */}
        <div className="space-y-2">
          <Label
            htmlFor="billingAddress"
            className="text-sm font-medium text-gray-700"
          >
            Billing Address
          </Label>
          <Select value={billingAddress} onValueChange={setBillingAddress}>
            <SelectTrigger>
              <SelectValue placeholder="Select billing address" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="home">
                Home - 123 Main St, New York, NY 10001
              </SelectItem>
              <SelectItem value="work">
                Work - 456 Business Ave, New York, NY 10002
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Checkboxes */}
        <div className="space-y-3 pt-2">
          <div className="flex  items-center space-x-2">
            <Checkbox
              id="setAsDefault"
              className="bg-orange-200"
              checked={setAsDefault}
              onCheckedChange={(checked) => setSetAsDefault(checked as boolean)}
            />
            <Label
              htmlFor="setAsDefault"
              className="text-sm font-medium text-gray-700 cursor-pointer"
            >
              Set as default payment method
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              className="bg-orange-200"
              id="saveCard"
              checked={saveCard}
              onCheckedChange={(checked) => setSaveCard(checked as boolean)}
            />
            <Label
              htmlFor="saveCard"
              className="text-sm font-medium text-gray-700 cursor-pointer"
            >
              Save card for future purchases
            </Label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-6">
          <Button variant="outline" className=" bg-transparent">
            Cancel
          </Button>
          <Button className=" bg-orange-600 hover:bg-orange-700">
            Update Payment Method
          </Button>
        </div>
      </div>
    </div>
  );
}
