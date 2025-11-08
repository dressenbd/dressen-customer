"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Menu,
  Phone,
  Search,
  Headphones,
  ShoppingCart,
  LogOut,
  User as UserIcon,
  ChevronDown,
  ChevronRight,
  Heart,
  X,
  Home,
  Info,
  Package,
  Shield,
  RotateCcw,
  Grid3X3,
} from "lucide-react";

import {
  useGetAllCategoryQuery,
  type RemoteCategory,
} from "@/redux/featured/category/categoryApi";
import { useGetSettingsQuery } from "@/redux/featured/settings/settingsApi";
import Image from "next/image";

// 🔐 auth + cart selectors & logout
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { signOut } from "next-auth/react";

import { selectCurrentUser, logoutUser } from "@/redux/featured/auth/authSlice";
import { useLogoutMutation } from "@/redux/featured/auth/authApi";
import SmartSearch from "@/components/search/SmartSearch";
import { selectCartItems } from "@/redux/featured/cart/cartSlice";
import { useWishlist } from "@/hooks/useWishlist";
import toast from "react-hot-toast";

// ----- safe helpers -----
function isRecord(v: unknown): v is Record<string, unknown> {
  return !!v && typeof v === "object";
}
function getProp(o: unknown, k: string): unknown {
  return isRecord(o) && k in o ? (o as Record<string, unknown>)[k] : undefined;
}
function getStr(o: unknown, k: string): string | undefined {
  const v = getProp(o, k);
  return typeof v === "string" ? v : undefined;
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const [isClient, setIsClient] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );
  const { data: settings } = useGetSettingsQuery();

  const router = useRouter();

  const currentUser = useAppSelector(selectCurrentUser);
  const [logoutMutation, { isLoading: isLogoutLoading }] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const isLoggedIn = Boolean(currentUser?.id);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const cartItems = useAppSelector(selectCartItems);
  const { wishlist } = useWishlist();
  // Fetch categories from API
  const { data } = useGetAllCategoryQuery();

  // Transform categories for UI
  const categories = useMemo(() => {
    const raw: RemoteCategory[] = Array.isArray(data) ? data : [];

    return raw.map((c) => {
      const id = String((c._id ?? c.id ?? c.slug ?? "") || "");
      const slug = typeof c.slug === "string" ? c.slug : undefined;
      const label = String(
        getStr(c, "name") ?? getStr(c, "label") ?? "Category"
      );
      const subCategories = Array.isArray(c.subCategories)
        ? c.subCategories
        : Array.isArray(c.children)
        ? c.children.map(
            (child) =>
              getStr(child, "name") ?? getStr(child, "label") ?? "Subcategory"
          )
        : [];

      return { id, slug, label, subCategories };
    });
  }, [data]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  const handleLogout = async () => {
    try {
      const userId = currentUser?.id;
      if (userId) {
        await logoutMutation(userId).unwrap();
      }
    } catch {
      // Handle error silently
    } finally {
      // Redux state clear
      dispatch(logoutUser());

      // NextAuth session clear + redirect
      await signOut({ callbackUrl: "/auth/login", redirect: false });

      // Show success toast
      toast.success("Successfully signed out!");
    }
  };

  return (
    <>
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Slide Menu */}
      <div
        className={`fixed top-0 left-0 h-full min-w-72 max-w-72 bg-white/98 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200">
            <span className="font-bold text-xl text-primary">Menu</span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-4">
            <nav className="space-y-1">
              {/* Home Link */}
              <Link
                href="/"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home size={20} />
                <span>Home</span>
              </Link>

              {/* All Products Link */}
              <Link
                href="/product-listing"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                <Grid3X3 size={20} />
                <span>All Products</span>
              </Link>

              {/* Categories Section */}
              <div className="space-y-1">
                {categories.map((category) => (
                  <div key={category.id}>
                    <div className="flex items-center justify-between py-2 px-3 hover:bg-gray-100 rounded transition-colors">
                      <Link
                        href={`/category?slug=${encodeURIComponent(
                          category.slug ?? category.id
                        )}`}
                        className="flex-1 text-gray-700"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {category.label}
                      </Link>
                      {category.subCategories &&
                        category.subCategories.length > 0 && (
                          <button
                            onClick={() => toggleCategory(category.id)}
                            className="p-1 hover:bg-gray-200 rounded"
                            aria-label={`Toggle ${category.label} subcategories`}
                          >
                            {expandedCategories.has(category.id) ? (
                              <ChevronDown
                                size={16}
                                className="text-gray-600"
                              />
                            ) : (
                              <ChevronRight
                                size={16}
                                className="text-gray-600"
                              />
                            )}
                          </button>
                        )}
                    </div>
                    {category.subCategories &&
                      category.subCategories.length > 0 &&
                      expandedCategories.has(category.id) && (
                        <div className="ml-4 space-y-1">
                          {category.subCategories.map((subCat, index) => (
                            <Link
                              key={`${subCat}-${index}`}
                              href={`/category?slug=${encodeURIComponent(
                                category.slug ?? category.id
                              )}&sub=${encodeURIComponent(subCat)}`}
                              className="block py-1.5 px-3 text-sm hover:bg-gray-100 rounded transition-colors text-gray-600"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {subCat}
                            </Link>
                          ))}
                        </div>
                      )}
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 my-4" />

              {/* Other Navigation Links */}
              <Link
                href="/tracking-order"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                <Package size={20} />
                <span>Track Order</span>
              </Link>

              <Link
                href="/wishlist"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                <Heart size={20} />
                <span>Wishlist</span>
              </Link>

              <Link
                href="/about"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                <Info size={20} />
                <span>About Us</span>
              </Link>

              <Link
                href="/contact-us"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                <Phone size={20} />
                <span>Contact Us</span>
              </Link>

              <Link
                href="/privacy-policy"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                <Shield size={20} />
                <span>Privacy Policy</span>
              </Link>

              <Link
                href="/return-policy"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                <RotateCcw size={20} />
                <span>Return & Refund</span>
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* ===== Desktop/Large Screen ===== */}
      <div className="hidden lg:block w-full bg-accent border-b border-neutral shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 w-full md:px-6 lg:px-36">
          <div className="flex items-center justify-between h-16">
            {/* Logo + Title */}
            <div className="flex items-center space-x-3 flex-shrink-0">
              <Link
                href="/"
                className="flex items-center"
                aria-label="Go to homepage"
              >
                {settings?.logo ? (
                  <Image
                    src={settings.logo}
                    alt="Dressen Logo"
                    width={120}
                    height={40}
                    className="h-10"
                    style={{ width: "auto" }}
                  />
                ) : (
                  <span className="font-extrabold text-3xl text-primary">
                    Dressen
                  </span>
                )}
              </Link>
            </div>

            {/* Search Area */}
            <div className="flex-1 flex justify-center lg:ml-30">
              <div className="flex items-center gap-2 w-full max-w-2xl">
                <div className="flex-1 flex justify-center">
                  <div className="w-full max-w-2xl">
                    <SmartSearch />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <Link
                href="/contact-us"
                className="inline-flex items-center text-accent gap-2 px-3 py-2 rounded-md border border-neutral hover:bg-secondary bg-primary"
                aria-label="contact"
              >
                <Headphones size={18} />
              </Link>

              <Link
                href="/wishlist"
                className="relative inline-flex items-center justify-center h-10 w-10 rounded-md border border-neutral hover:bg-primary hover:text-secondary"
                aria-label="wishlist"
              >
                <Heart size={18} />
                {isClient && wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 h-5 min-w-5 px-1 rounded-full text-xs bg-secondary text-accent flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              <Link
                href="/dashboard/checkout"
                className="relative inline-flex items-center justify-center h-10 w-10 rounded-md border border-neutral hover:bg-primary hover:text-secondary"
                aria-label="cart"
              >
                <ShoppingCart size={18} />
                {isClient && cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 h-5 min-w-5 px-1 rounded-full text-xs bg-secondary text-accent flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Mobile/Small Screen ===== */}
      <div className="lg:hidden sticky top-0 z-30 bg-primary text-accent w-full">
        <div className="container mx-auto px-4 py-3">
          {/* Normal State */}
          {!isSearchActive && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  className="p-2 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors"
                  aria-label="Menu"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <Menu size={20} />
                </button>
                <Link href="/" className="flex items-center">
                  {/* {settings?.logo ? (
                    <Image
                      src={settings.logo}
                      alt="Dressen Logo"
                      width={80}
                      height={32}
                      className="h-8 w-auto"
                    />
                  ) : ( */}
                  <span className="font-bold text-xl text-accent">Dressen</span>
                  {/* )} */}
                </Link>
              </div>

              <div className="flex items-center gap-2">
                <button
                  className="p-2 rounded-lg bg-accent text-secondary hover:bg-accent/90 transition-colors"
                  aria-label="Search"
                  onClick={() => setIsSearchActive(true)}
                >
                  <Search size={18} />
                </button>

                <Link
                  href="/contact-us"
                  className="hidden sm:block p-2 rounded-lg bg-accent text-secondary hover:bg-accent/90 transition-colors"
                  aria-label="Contact"
                >
                  <Phone size={18} />
                </Link>

                <Link
                  href="/dashboard/checkout"
                  className="hidden sm:block relative p-2 rounded-lg bg-accent text-secondary hover:bg-accent/90 transition-colors"
                  aria-label="Cart"
                >
                  <ShoppingCart size={18} />
                  {isClient && cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 min-w-4 px-1 rounded-full text-xs bg-secondary text-accent flex items-center justify-center">
                      {cartItems.length}
                    </span>
                  )}
                </Link>

                {!isLoggedIn ? (
                  <Link
                    href="/auth/login"
                    className="p-2 rounded-lg bg-accent text-secondary hover:bg-accent/90 transition-colors"
                    aria-label="Login/Register"
                  >
                    <UserIcon size={18} />
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={handleLogout}
                    aria-label="Logout"
                    disabled={isLogoutLoading}
                    className="p-2 rounded-lg bg-accent text-orange-700 hover:bg-accent/90 transition-colors disabled:opacity-60"
                  >
                    <LogOut size={18} />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Search Active State */}
          {isSearchActive && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSearchActive(false)}
                className="p-2 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors flex-shrink-0"
                aria-label="Close search"
              >
                <Menu size={20} />
              </button>

              <div className="flex-1">
                <SmartSearch
                  placeholder="Search Product..."
                  className="w-full"
                  onSearch={(q) => {
                    // ডিফল্ট রাউটিং
                    router.push(
                      `/product-listing?search=${encodeURIComponent(q)}`
                    );
                    setIsSearchActive(false);
                  }}
                />
              </div>

              {/* ডানপাশে আলাদা বোতাম লাগবে না—SmartSearch নিজেই সার্চ করতে পারে */}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
