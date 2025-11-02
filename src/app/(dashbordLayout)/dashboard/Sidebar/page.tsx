"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  Package,
  BarChart3,
  Heart,
  CreditCard,
  MapPin,
  Lock,
} from "lucide-react";

const sidebarItems = [
  { icon: User, label: "Profile", path: "/dashboard/profile" },
  { icon: Package, label: "Orders", path: "/dashboard/orders" },
  { icon: BarChart3, label: "Dashboard", path: "/dashboard/user-dashboard" },
  { icon: Heart, label: "Wishlist", path: "/dashboard/wishlistItems" },
  {
    icon: CreditCard,
    label: "My Cards",
    path: "/dashboard/add-payment-method-form",
  },
  { icon: MapPin, label: "Address", path: "/dashboard/addressesPage" },
  {
    icon: Lock,
    label: "Change Password",
    path: "/dashboard/changePasswordPage",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <Card className="w-60 flex-shrink-0 mt-5 bg-orange-50 border-orange-200">
      <CardContent className="p-0">
        {/* User Info */}
        <div className="p-6 bg-orange-100">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback className="bg-orange-200 text-orange-700">
                JD
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium text-orange-900">John Doe</div>
              <div className="text-sm text-orange-700">
                john.doe@example.com
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-2">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.label}
                href={item.path}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-colors
              ${
                isActive
                  ? "bg-orange-600 text-[#2e2e2e] font-medium"
                  : "text-orange-700 hover:bg-orange-200"
              }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </CardContent>
    </Card>
  );
}
