"use client";

import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import { selectCartCount } from "@/redux/featured/customer/customerSlice";

export default function NavbarActions() {
  const cartCount = useAppSelector(selectCartCount);

  return (
    <div className="flex items-center gap-4 text-[#2e2e2e]">
      <Link href="/auth/login" className="text-sm hover:underline">
        Login / Register
      </Link>

      <Link
        href="/dashboard"
        className="hidden sm:inline-flex items-center gap-1 text-sm hover:underline"
      >
        <User size={16} />
        <span>Account</span>
      </Link>

      <Link href="/dashboard/checkout" className="relative inline-flex">
        <ShoppingCart size={20} />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 h-5 min-w-5 px-1 rounded-full text-xs bg-orange-500 text-[#2e2e2e] flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </Link>
    </div>
  );
}
