/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/featured/auth/authSlice";
import Footer from "@/components/footer/footer";
import NavBer from "@/components/navBer/navBer";
import DashboardSideber from "@/components/Siderbar-dashbord/Dashbord-sideber";
import SmallNavbar from "@/components/SmallNavbar/SmallNavbar";
import Navbar from "@/components/modules/Navbar/Navbar";

interface AccountLayoutProps {
  children: React.ReactNode;
}

export default function AccountLayout({ children }: AccountLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const currentUser = useAppSelector(selectCurrentUser);

  const isCheckoutPage = pathname.startsWith("/dashboard/checkout");
  const showSidebar = !isCheckoutPage;
  
  // Check if user is authenticated for non-checkout pages
  const isAuthenticated = Boolean(currentUser?.id);
  const requiresAuth = pathname.startsWith("/dashboard") && !isCheckoutPage;

  useEffect(() => {
    if (requiresAuth && !isAuthenticated) {
      router.push("/auth/login");
    }
  }, [requiresAuth, isAuthenticated, router]);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", sidebarOpen);
    return () => document.body.classList.remove("overflow-hidden");
  }, [sidebarOpen]);

  // Show loading or redirect for protected routes
  if (requiresAuth && !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* === Header/Navbar === */}
      <header className="sticky top-0 z-40 bg-white border-b">
        <div className="w-full px-4 py-3 flex items-center justify-between">
          {showSidebar && (
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          )}

          <div className="w-full">
           <Navbar></Navbar>
          </div>
        </div>
      </header>

      {/* === Desktop Fixed Sidebar (lg+) === */}
      {showSidebar && (
        <aside
          className="
            hidden lg:flex
            fixed left-0 top-[64px]
            h-[calc(100vh-64px)] w-72
            border-r bg-white z-30
          "
          aria-label="Dashboard sidebar"
        >
          <div className="w-full h-full overflow-y-auto">
            <DashboardSideber />
          </div>
        </aside>
      )}

      {/* === Main Content Wrapper === */}
      <div
        className={`flex-1 w-full ${
          showSidebar ? "lg:pl-64" : ""
        }`}
      >
        <div className="mt-3">
          <main className="flex-1 w-full overflow-x-hidden">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-0 sm:py-6">
              {children}
            </div>
          </main>
        </div>
      </div>

      {/* === Mobile Sidebar Overlay === */}
      {showSidebar && sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
          <div className="relative flex flex-col w-72 max-w-[80vw] h-full bg-white border-r">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Menu</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <DashboardSideber />
            </div>
          </div>
        </div>
      )}

      {/* === Mobile Bottom Navbar === */}
      <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden">
        <SmallNavbar />
      </div>

      {/* === Footer === */}
      <footer className="bg-white mt-14 w-full lg:pl-50">
        <div className="w-full">
          <Footer />
        </div>
      </footer>
    </div>
  );
}