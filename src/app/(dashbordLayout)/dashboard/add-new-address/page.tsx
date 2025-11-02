"use client";

import type React from "react";
import type { LucideIcon } from "lucide-react";
import { Home, Building2, MapPin, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";

export type AddressType = "Home" | "Office" | "Other";

type AddressItem = {
  key: AddressType;
  label: AddressType;
  icon: LucideIcon;
};

export default function AddAddressForm() {
  const [formData, setFormData] = useState({
    addressName: "",
    fullName: "",
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phoneNumber: "",
    isDefault: false,
    addressType: "Home" as AddressType,
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleCancel = () => {};

  const items: AddressItem[] = [
    { key: "Home", label: "Home", icon: Home },
    { key: "Office", label: "Office", icon: Building2 },
    { key: "Other", label: "Other", icon: MapPin },
  ];

  return (
    <Card className="w-full  rounded-sm">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Link href={`/dashboard/addressesPage`}>
            <Button variant="ghost" size="sm" className="p-0 h-auto">
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </Button>
          </Link>

          <h1 className="text-lg font-medium text-gray-900">Add New Address</h1>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 h-full">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 h-full flex flex-col"
        >
          <div className="flex-1 space-y-4">
            {/* Address Type pills (mobile view) */}
            <div className="w-full md:hidden">
              <label className="block text-slate-700 text-sm font-medium mb-3">
                Address Type
              </label>

              <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                {items.map(({ key, label, icon: Icon }) => {
                  const isActive = formData.addressType === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handleInputChange("addressType", key)}
                      className={[
                        "group inline-flex items-center gap-1 rounded-full",
                        "px-4 py-2.5 sm:px-4 sm:py-2 text-sm font-medium transition-all",
                        "shrink-0 whitespace-nowrap",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FF7A00]",
                        isActive
                          ? "bg-[#FF7A00] text-[#2e2e2e] shadow-sm"
                          : "text-slate-700 bg-white border border-slate-200 hover:border-slate-300",
                      ].join(" ")}
                      aria-pressed={isActive}
                    >
                      <Icon
                        className={[
                          "h-4 w-4",
                          isActive
                            ? "text-[#2e2e2e]"
                            : "text-slate-500 group-hover:text-slate-700",
                        ].join(" ")}
                      />
                      <span>{label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Address Name */}
            <div className="space-y-2">
              <Label htmlFor="addressName">Address Name</Label>
              <Input
                id="addressName"
                placeholder="Home, Work, etc."
                value={formData.addressName}
                onChange={(e) =>
                  handleInputChange("addressName", e.target.value)
                }
                className="h-11"
              />
            </div>

            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                className="h-11"
              />
            </div>

            {/* Street Address */}
            <div className="space-y-2">
              <Label htmlFor="streetAddress">Street Address</Label>
              <Input
                id="streetAddress"
                placeholder="123 Main St, Apt 4B"
                value={formData.streetAddress}
                onChange={(e) =>
                  handleInputChange("streetAddress", e.target.value)
                }
                className="h-11"
              />
            </div>

            {/* City & State */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  placeholder="New York"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State/Province</Label>
                <Input
                  id="state"
                  placeholder="NY"
                  value={formData.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                  className="h-11"
                />
              </div>
            </div>

            {/* Postal Code & Country */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input
                  id="postalCode"
                  placeholder="10001"
                  value={formData.postalCode}
                  onChange={(e) =>
                    handleInputChange("postalCode", e.target.value)
                  }
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select
                  onValueChange={(value) => handleInputChange("country", value)}
                >
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select Country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                    <SelectItem value="de">Germany</SelectItem>
                    <SelectItem value="fr">France</SelectItem>
                    <SelectItem value="jp">Japan</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                placeholder="+1 (555) 123-4567"
                value={formData.phoneNumber}
                onChange={(e) =>
                  handleInputChange("phoneNumber", e.target.value)
                }
                className="h-11"
              />
            </div>

            {/* Default Checkbox */}
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox
                id="isDefault"
                checked={formData.isDefault}
                onCheckedChange={(checked) =>
                  handleInputChange("isDefault", checked as boolean)
                }
              />
              <Label htmlFor="isDefault" className="text-sm text-gray-700">
                Set as default shipping address
              </Label>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-3 pt-6 mt-auto">
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
              Save Address
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
