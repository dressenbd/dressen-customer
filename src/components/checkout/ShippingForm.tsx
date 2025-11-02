"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Truck } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/featured/auth/authSlice";

interface ShippingFormProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  formErrors: Record<string, string>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ShippingForm({ formData, formErrors, onInputChange }: ShippingFormProps) {
  const currentUser = useAppSelector(selectCurrentUser);
  
  return (
    <>
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
          <Truck className="w-4 h-4 text-gray-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">
          Customer Information
        </h2>
      </div>
      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <Label htmlFor="firstName" className="text-sm font-medium">
              First Name
            </Label>
            <Input
              required
              id="firstName"
              value={formData.firstName}
              onChange={onInputChange}
              className={`mt-1 ${formErrors.firstName ? "border-red-500" : ""}`}
            />
            {formErrors.firstName && (
              <p className="mt-1 text-xs text-red-500">
                {formErrors.firstName}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="lastName" className="text-sm font-medium">
              Last Name
            </Label>
            <Input
              required
              id="lastName"
              value={formData.lastName}
              onChange={onInputChange}
              className={`mt-1 ${formErrors.lastName ? "border-red-500" : ""}`}
            />
            {formErrors.lastName && (
              <p className="mt-1 text-xs text-red-500">
                {formErrors.lastName}
              </p>
            )}
          </div>
        </div>
        {currentUser && (
          <div>
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <Input
              required
              id="email"
              type="email"
              value={formData.email || currentUser.email}
              onChange={onInputChange}
              className={`mt-1 ${formErrors.email ? "border-red-500" : ""}`}
              placeholder={currentUser.email}
            />
            {formErrors.email && (
              <p className="mt-1 text-xs text-red-500">
                {formErrors.email}
              </p>
            )}
          </div>
        )}
        <div>
          <Label htmlFor="phone" className="text-sm font-medium">
            Phone
          </Label>
          <Input
            required
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={onInputChange}
            className={`mt-1 ${formErrors.phone ? "border-red-500" : ""}`}
          />
          {formErrors.phone && (
            <p className="mt-1 text-xs text-red-500">
              {formErrors.phone}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="address" className="text-sm font-medium">
            Address
          </Label>
          <Input
            required
            id="address"
            value={formData.address}
            onChange={onInputChange}
            className={`mt-1 ${formErrors.address ? "border-red-500" : ""}`}
          />
          {formErrors.address && (
            <p className="mt-1 text-xs text-red-500">
              {formErrors.address}
            </p>
          )}
        </div>
      </div>
    </>
  );
}