"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Home, Layers, ShoppingCart, Menu, X } from "lucide-react";
import { ReactNode } from "react";
import { useGetAllCategoryQuery } from "@/redux/featured/category/categoryApi";

type NavKey = "home" | "categories" | "cart" | "menu";

type NavItem = {
  key: NavKey;
  label: string;
  icon: ReactNode;
  href?: string;
  onClick?: () => void;
};

export default function MobileBottomNav() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerType, setDrawerType] = useState<'categories' | 'menu'>('menu');
  const { data: remoteCats, isSuccess } = useGetAllCategoryQuery();

  const items: NavItem[] = useMemo(
    () => [
      { key: "home", label: "Home", icon: <Home size={18} />, href: "/" },
      { 
        key: "categories", 
        label: "Categories", 
        icon: <Layers size={18} />, 
        onClick: () => { setDrawerType('categories'); setDrawerOpen(true); }
      },
      { key: "cart", label: "Cart", icon: <ShoppingCart size={18} />, href: "/dashboard/checkout" },
      { 
        key: "menu", 
        label: "Menu", 
        icon: <Menu size={18} />, 
        onClick: () => { setDrawerType('menu'); setDrawerOpen(true); }
      },
    ],
    []
  );

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <>
      <nav className="fixed bottom-0 inset-x-0 z-40 bg-accent border-t border-neutral shadow-sm lg:hidden">
        <ul className="grid grid-cols-4">
          {items.map((it) =>
            it.href ? (
              <li key={it.key}>
                <Link href={it.href} className={`flex font=bold flex-col items-center justify-center py-2 ${it.key === 'home' ? 'text-primary' : 'text-secondary'}`}>
                  {it.icon}
                  <span className="text-[11px] mt-1">{it.label}</span>
                </Link>
              </li>
            ) : (
              <li key={it.key}>
                <button
                  type="button"
                  onClick={it.onClick}
                  className="w-full flex flex-col items-center justify-center py-2 text-secondary"
                >
                  {it.icon}
                  <span className="text-[11px] mt-1">{it.label}</span>
                </button>
              </li>
            )
          )}
        </ul>
      </nav>

      {/* Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-secondary bg-opacity-50"
            onClick={closeDrawer}
          />
          
          {/* Drawer Content */}
          <div className="absolute bottom-0 left-0 right-0 bg-accent rounded-t-2xl p-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{drawerType === 'categories' ? 'Categories' : 'Menu'}</h3>
              <button 
                onClick={closeDrawer}
                className="p-1 rounded-full hover:bg-neutral"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-2">
              {drawerType === 'categories' ? (
                // Categories content
                <>
                  {isSuccess && Array.isArray(remoteCats) && remoteCats.length > 0 ? (
                    remoteCats.map((cat: Record<string, unknown>, index: number) => (
                      <Link 
                        key={String(cat._id || cat.id || index)}
                        href={`/category?slug=${encodeURIComponent(String(cat.slug || ''))}`} 
                        className="block p-3 hover:bg-neutral rounded" 
                        onClick={closeDrawer}
                      >
                        {String(cat.name || 'Category')}
                      </Link>
                    ))
                  ) : (
                    <div className="p-3 text-center text-gray-500">No categories found</div>
                  )}
                </>
              ) : (
                // Menu content
                <>
                  <Link href="/product-listing" className="block p-3 hover:bg-neutral rounded" onClick={closeDrawer}>
                    All Products
                  </Link>
                  <Link href="/deals" className="block p-3 hover:bg-neutral rounded" onClick={closeDrawer}>
                    Today&apos;s Deals
                  </Link>
                  <Link href="/discounts" className="block p-3 hover:bg-neutral rounded" onClick={closeDrawer}>
                    Discounts
                  </Link>
                  <Link href="/more" className="block p-3 hover:bg-neutral rounded" onClick={closeDrawer}>
                    Featured
                  </Link>
                  <Link href="/reviews" className="block p-3 hover:bg-neutral rounded" onClick={closeDrawer}>
                    Top Reviewed
                  </Link>
                  <Link href="/about" className="block p-3 hover:bg-neutral rounded" onClick={closeDrawer}>
                    About Us
                  </Link>
                  <Link href="/contact-us" className="block p-3 hover:bg-neutral rounded" onClick={closeDrawer}>
                    Contact
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}