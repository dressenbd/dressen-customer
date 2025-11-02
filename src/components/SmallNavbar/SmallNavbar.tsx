import type React from "react";
import Link from "next/link";
import { Home, Search, Heart, ShoppingCart, User } from "lucide-react";

export default function SmallNavbar() {
  return (
    <nav className="bg-gray-50 border-t border-gray-200 px-4 py-2 fixed bottom-0 w-full z-50">
      <div className="flex items-center justify-around max-w-md mx-auto">
        <NavItem icon={Home} label="Home" href="/" />
        <NavItem icon={Search} label="Search" href="#" />
        <NavItem icon={Heart} label="Wishlist" href="/dashboard/wishlistItems" />
        <NavItem icon={ShoppingCart} label="Cart" href="/dashboard/checkout" />
        <NavItem icon={User} label="My Account" href="/dashboard" isActive />
      </div>
    </nav>
  );
}

interface NavItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
  isActive?: boolean;
}

function NavItem({ icon: Icon, label, href, isActive = false }: NavItemProps) {
  return (
    <Link href={href} className="flex flex-col items-center justify-center min-w-0">
      <div
        className={`flex flex-col items-center justify-center gap-1 py-2 px-3 transition-colors ${
          isActive ? "text-orange-500" : "text-gray-600"
        }`}
      >
        <Icon className="w-6 h-6" />
        <span className="text-xs font-medium">{label}</span>
      </div>
    </Link>
  );
}
