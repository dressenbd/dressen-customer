"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Home,
  Gift,
  Phone,
  Globe,
  FileText,
  HelpCircle,
  MapPin,
  PhoneCall,
  Menu,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function ShopSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navLinks = [
    { href: "/shops/shop", label: "Shop", icon: Home },
    { href: "/shops/offers", label: "Offers", icon: Gift },
    { href: "/shops/contact", label: "Contact", icon: Phone },
    { href: "/shops/website", label: "Website", icon: Globe },
  ];

  const infoLinks = [
    { href: "/shops/terms", label: "Terms & Conditions", icon: FileText },
    { href: "/shops/faq", label: "FAQ", icon: HelpCircle },
  ];

  const SidebarContent = () => (
    <Card className="w-full p-4 flex flex-col gap-4 h-fit">
      {/* Profile */}
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
          <span className="text-gray-400 text-lg">👤</span>
        </div>
        <span className="mt-2 text-[#0F172A] bg-[#FFF7ED] font-semibold text-sm pt-[3px] pb-[3px] pl-[11px] pr-[11px] rounded-[9999px]">
          SINCE 2023
        </span>
        <h2 className="text-xl mt-2 font-bold">Marny Rose</h2>
        <p className="text-sm text-[#64748B]">7 Products</p>
        <p className="text-sm text-[#64748B] mt-2">
          Voluptatem odio qui esse maiores.
        </p>
      </div>

      {/* Main Nav */}
      <div className="grid grid-cols-2 gap-2">
        {navLinks.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link key={href} href={href} onClick={() => setOpen(false)}>
              <Button
                variant="outline"
                className={`w-full flex items-center gap-1 focus-visible:ring-0 focus-visible:ring-offset-0  ${
                  isActive ? "bg-[#FA9650] text-[#2e2e2e]" : "text-gray-700"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Button>
            </Link>
          );
        })}
      </div>

      {/* Info Links */}
      <div className="flex flex-col gap-2">
        {infoLinks.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link key={href} href={href} onClick={() => setOpen(false)}>
              <Button
                variant="outline"
                className={`w-full justify-start focus-visible:ring-0 focus-visible:ring-offset-0  ${
                  isActive ? "bg-[#FA9650] text-[#2e2e2e]" : "text-gray-700"
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {label}
              </Button>
            </Link>
          );
        })} 
      </div>



      <Separator />

{/* Contact Info */}
<div className="text-sm space-y-4">
  <p className="font-semibold text-[#0F172A]">Contact Information</p>

  {/* Address */}
  <div className="flex gap-3">
    <MapPin className="w-9 text-[#94A3B8] mt-0.5" />
    <div>
      <p className="text-xs text-[#94A3B8] font-medium">Address</p>
      <p className="text-sm text-[#0F172A]">
        Quis aliquid aliquam. Ut rerum recusandae. Labons voluptatibus. 23196.
        Quis qui dolore ea.
      </p>
    </div>
  </div>

  {/* Phone */}
  <div className="flex gap-3">
    <PhoneCall className="w-4 h-4 text-[#94A3B8] mt-0.5" />
    <div>
      <p className="text-xs text-[#94A3B8] font-medium">Phone</p>
      <p className="text-sm text-[#0F172A]">532409738646</p>
    </div>
  </div>
</div>

    </Card>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block max-w-[318px]">
        <SidebarContent />
      </div>
    </>
  );
}
