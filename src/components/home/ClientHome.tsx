"use client";

import MainMenu from "@/components/layout/MainMenu";
import CategorySidebar from "@/components/home/CategorySidebar";
import BannerSlider from "@/components/home/BannerSlider";
import FloatingEdgeBar from "@/components/home/FloatingEdgeBar";
import FeatureMoreBar from "@/components/home/FeatureMoreBar";
import CategoryRail from "@/components/home/CategoryRail";
import CategoryProductCards from "@/components/home/CategoryProductCards";
import ProductSixGrid from "@/components/home/ProductSixGrid";
import MobileBottomNav from "@/components/home/MobileBottomNav";
import {
  useGetTodaysDealsQuery,
  useGetTopReviewedProductsQuery,
} from "@/redux/featured/product/productApi";
// import Discount from "../modules/category/Discount";
import TopReviewed from "../modules/category/TopReviewed";
import HomepagePopup from "./HomepagePopup";

export default function ClientHome() {
  // const {data: discounted,
  //   isLoading: discountLoading,
  //   isError: discountError,
  //  } = useGetDiscountedProductsQuery()

   const {
  data: topReviewed,
  isLoading: topLoading,
  isError: topError,
} = useGetTopReviewedProductsQuery();
  
 return (
    <main className="bg-white w-full">
      <HomepagePopup />
      <MainMenu />

      {/* Hero */}
      <section className="container mx-auto w-full px-3 sm:px-4 lg:px-6 mt-4">
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-12 md:col-span-3 lg:col-span-2">
            <CategorySidebar />
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-8">
            <BannerSlider />
          </div>
          <div className="hidden lg:flex col-span-12 md:col-span-3 lg:col-span-2 items-center justify-center">
            <FloatingEdgeBar />
          </div>
        </div>
      </section>

      {/* Category / category rails */}
      <section className="mt-4">
        
        <CategoryRail />
        <div className="mt-3">
          <CategoryProductCards />
        </div>
      </section>


      {/* Customer dont want this section */}
      {/* FEATURED / MORE
      <section className="mt-4">
        <FeatureMoreBar
          left={{ label: "FEATURED", href: "/featured" }}
          right={{ label: "More...", href: "/more" }}
        />
        <CategoryRail />
        <div className="mt-3">
          <CategoryProductCards />
        </div>
      </section> */}

      {/* ✅ DISCOUNTED PRODUCTS — এখন Discount.tsx ব্যবহার করছি
      <section className="mt-6">
        <FeatureMoreBar
          left={{ label: "DISCOUNTED PRODUCTS", href: "/discounts" }}
          right={{ label: "More...", href: "/discounts" }}
        />
        <div className="mt-3">
          <Discount
            data={discounted}
            loading={discountLoading}
            error={discountError}
            title="Discounted Products"
            limit={6}
          />
        </div>
      </section> */}

      {/* TODAY'S DEAL */}
      <section className="mt-6">
        <FeatureMoreBar
          left={{ label: "TODAY'S DEAL", href: "/deals" }}
          right={{ label: "More...", href: "/deals" }}
        />
        <div className="mt-3">
          <ProductSixGrid title="Today's Deal" useQuery={useGetTodaysDealsQuery} />
        </div>
      </section>

      {/* TOP REVIEWED */}
     <section className="mt-6">
  <FeatureMoreBar
    left={{ label: "TOP REVIEWED", href: "/reviews" }}
    right={{ label: "More...", href: "/reviews" }}
  />
  <div className="mt-3">
    <TopReviewed
      data={topReviewed}
      loading={topLoading}
      error={topError}
      title="Top Reviewed Products"
      limit={6}
    />
  </div>
</section>

      <MobileBottomNav />
    </main>
  );
}