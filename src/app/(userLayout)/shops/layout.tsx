"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ShopBanner } from "../../../components/modules/shops/shop-banner";
import { ShopSidebar } from "../../../components/modules/shops/ShopSidebar";

export default function ShopLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const bannerData: Record<string, { title: string; subtitle: string }> = {
    "/shops/shop": {
      title: "Discover Amazing Shops",
      subtitle: "Explore our network of premium fashion retailers and find your favorite brands",
    },
    "/shops": {
      title: "Discover Amazing Shops",
      subtitle: "Explore our network of premium fashion retailers and find your favorite brands",
    },
    "/shops/offers": {
      title: "Special Offers",
      subtitle: "Grab the best prices today",
    },
    "/shops/contact": {
      title: "Contact Us",
      subtitle: "We`d love to hear from you",
    },
    "/shops/website": {
      title: "Our Website",
      subtitle: "Explore our full collection online",
    },
    "/shops/terms": {
      title: "Terms & Conditions",
      subtitle: "Last updated: December 2024",
    },
    "/shops/faq": {
      title: "FAQ",
      subtitle: "Answers to your common questions",
    },
  };

  
  const normalizedPath = pathname.replace(/\/$/, "");

  
  const matchedKey = Object.keys(bannerData)
    .sort((a, b) => b.length - a.length)
    .find((key) => normalizedPath.startsWith(key));

  const currentBanner = matchedKey
    ? bannerData[matchedKey]
    : { title: "Shop", subtitle: "" };

  const shouldHideSidebar = normalizedPath === "/shops";

  return (
    <div className="flex gap-4 sm:p-2 md:p-4 lg:p-6">
      <div className="flex-1 space-y-3">
        <ShopBanner
          title={currentBanner.title}
          subtitle={currentBanner.subtitle}
        />
       <div className="flex flex-col md:flex-row w-full gap-4">
  {!shouldHideSidebar && <ShopSidebar />}
  <div className="flex-1">{children}</div>
</div>
      </div>
    </div>
  );
}
