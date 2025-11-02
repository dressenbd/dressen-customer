"use client";

import Link from "next/link";
import { ShoppingCart, Search, User, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logoutUser, selectCurrentUser } from "@/redux/featured/auth/authSlice";
import { useLogoutMutation } from "@/redux/featured/auth/authApi";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import CartSidebar from "@/components/navBer/CartSidebar";
import { useState } from "react";
import { selectCustomer } from "@/redux/featured/customer/customerSlice";
import { selectCartTotalItems } from "@/redux/featured/cart/cartSlice";

const NavbarActions = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const customerData = useAppSelector(selectCustomer);
  const customerCartItems = customerData?.cartItem[0]?.productInfo || [];

  const reduxCartTotalItems = useAppSelector(selectCartTotalItems);
  const currentUser = useAppSelector(selectCurrentUser);
  
  // Use redux cart total items (this is where addToCart adds items)
  const cartCount = reduxCartTotalItems;
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  const { data: session } = useSession();

  const handleLogout = async () => {
    if (currentUser?._id) {
      try {
        await logout(currentUser._id).unwrap();
      } catch {}
    }
    dispatch(logoutUser());
    await signOut({ callbackUrl: "/auth/login" });
  };

  return (
    <>
      <div className="flex items-center gap-3">
        <Search size={18} />
        <div
          onClick={() => setIsCartOpen(!isCartOpen)}
          className="relative cursor-pointer"
        >
          <ShoppingCart size={18} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full p-0 flex items-center justify-center text-xs bg-orange-500 hover:bg-orange-600 text-white">
              <span className="p-1">{cartCount}</span>
            </span>
          )}
        </div>
        {currentUser || session ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer px-2 py-1 rounded-lg hover:bg-gray-100 ml-1">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="hidden lg:flex flex-col items-start">
                  <span className="text-sm font-medium text-gray-800">
                    {currentUser?.name || session?.user?.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    {currentUser?.email || session?.user?.email}
                  </span>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 shadow-lg rounded-lg border border-gray-200"
            >
              <div className="px-3 py-2 border-b">
                <p className="text-sm font-medium">
                  {currentUser?.name || session?.user?.name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {currentUser?.email || session?.user?.email}
                </p>
              </div>
              {/* <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50">
              <Link href="/dashboard/profile">
                <p className="flex gap-2 items-center">
                  <User className="h-4 w-4" /> Profile
                </p>
              </Link>
            </DropdownMenuItem> */}
              <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer">
                <LayoutDashboard className="h-4 w-4" />
                <Link href="/dashboard/profile">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleLogout}
                className="rounded-full px-3  py-0 md:py-1 text-xs md:text-sm"
              >
                <span>🚪</span>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Link href="/auth/register">
              <Button
                size="sm"
                variant="secondary"
                className="rounded-full px-3 md:px-5 py-0 md:py-1 text-xs md:text-sm"
              >
                Sign Up
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button
                size="sm"
                className="rounded-full px-3 md:px-5 py-0 md:py-1 text-xs md:text-sm"
              >
                Log In
              </Button>
            </Link>
          </>
        )}
      </div>
      <CartSidebar
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        cartItems={customerCartItems}
      />
    </>
  );
};

export default NavbarActions;
