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
  Truck,
  LucideIcon,
} from "lucide-react";

import { selectCurrentUser } from "@/redux/featured/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { useGetSingleUserQuery } from "@/redux/featured/user/userApi";

interface SidebarItem {
  icon: LucideIcon;
  label: string;
  path: string;
}

const sidebarItems: SidebarItem[] = [
  { icon: User, label: "Profile", path: "/dashboard/profile" },
  { icon: Package, label: "Orders", path: "/dashboard/orders" },
  { icon: Truck, label: "Tracking Order", path: "/dashboard/tracking-order" },
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

interface UserApiResponse {
  success: boolean;
  message: string;
  data: {
    _id: string;
    name: string;
    email: string;
    image?: string;
  };
}

interface DashboardSidebarProps {
  onClose?: () => void;
}

export default function DashboardSidebar({ onClose }: DashboardSidebarProps) {
  const pathname = usePathname();
  const currentUser = useAppSelector(selectCurrentUser);

  const { data: userData } = useGetSingleUserQuery(currentUser?._id as string, {
    skip: !currentUser?._id,
  }) as { data?: UserApiResponse };

  const userName = currentUser?.name || "John Doe";
  const userEmail = currentUser?.email || "john.doe@example.com";
  const userImage =
    userData?.data?.image || "/placeholder.svg?height=40&width=40";


  return (
    <Card className="md:w-72 bg-[#F9FAFB] shadow-sm rounded-xl">
      <CardContent className="p-0">
        {/* User Info */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <Avatar className="w-12 h-12 border border-gray-300">
              <AvatarImage src={userImage} />
              <AvatarFallback className="bg-orange-200 text-black p-1 rounded-full">
                {userName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-0.5">
              <div className="text-black">{userName}</div>
              <div className="text-sm text-gray-600">{userEmail}</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1 bg-white rounded-b-xl">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.path;

            return (
              <Link
                key={item.label}
                href={item.path}
                onClick={onClose}
                aria-current={isActive ? "page" : undefined}
                className={[
                  "group flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  "focus:outline-none focus:ring-2 focus:ring-black/30",
                  isActive
                    ? "bg-[#FFF7ED] text-black" // active background color
                    : "text-gray-700 hover:bg-gray-100 hover:text-black",
                ].join(" ")}
              >
                <item.icon
                  className={[
                    "w-5 h-5",
                    isActive
                      ? "text-black"
                      : "text-gray-600 group-hover:text-black",
                  ].join(" ")}
                />
                <span className="text-current">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </CardContent>
    </Card>
  );
}
