/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import {
  X,
  Minus,
  Plus,
  Search,
  User,
  ShoppingCart as CartIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@radix-ui/react-navigation-menu";
import MegaMenu from "../modules/Navbar/MegaMenu";
import { megaMenuItems } from "@/data/megaMenuItems";
import { useAppSelector } from "@/redux/hooks";
import { useGetSingleCustomerQuery } from "@/redux/featured/customer/customerApi";
import { selectCurrentUser } from "@/redux/featured/auth/authSlice";
import CartSidebar from "./CartSidebar";
import { selectCustomer } from "@/redux/featured/customer/customerSlice";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function ShoppingPage() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const customerData = useAppSelector(selectCustomer);

  const cartItems = customerData?.cartItem[0]?.productInfo || [];

  const updateQuantity = (id: string, newQuantity: number) => {};

  const removeItem = (id: string) => {};

  const subtotal = cartItems
    .map((item: any) => item.productInfo)
    .reduce((sum: number, item: any) => {
      const price =
        typeof item === "string" ? 0 : item?.productInfo?.price || 0;
      return sum + price;
    }, 0);

  return (
    <div className="relative">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link href="/" className="text-xl md:text-2xl font-bold">
                Dressen
              </Link>
            </div>

            <div className="hidden lg:flex items-center gap-6">
              <NavigationMenu>
                <NavigationMenuList className="text-sm flex font-medium">
                  <MegaMenu items={megaMenuItems} />
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Action buttons */}
            <div className="flex items-center space-x-2 md:space-x-4 justify-end">
              <Button
                variant="ghost"
                size="icon"
                className="hidden sm:inline-flex h-10 w-10"
              >
                <Search className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hidden sm:inline-flex h-10 w-10"
              >
                <User className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCartOpen(true)}
                className="relative h-10 w-10"
              >
                <CartIcon className="h-5 w-5" />
                {cartItems.length > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-orange-500 hover:bg-orange-600"
                  >
                    {cartItems.length}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-white md:hidden">
            <div className="flex flex-col h-full p-4">
              <div className="flex justify-between items-center border-b pb-4">
                <h1 className="text-xl font-bold">Menu</h1>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="h-10 w-10"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* এখানে যদি চাইলে nav লিংক আবার অ্যাড করতে পারো */}

              <div className="mt-auto pt-4 border-t">
                <div className="flex space-x-4">
                  <Button variant="ghost" size="icon" className="flex-1 h-10">
                    <Search className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="flex-1 h-10">
                    <User className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      <CartSidebar
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        cartItems={cartItems}
      />
    </div>
  );
}
