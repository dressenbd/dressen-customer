/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect } from "react";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import TopBrands from "@/components/modules/all-product-brand/TopBrands";
import AdidasCollection from "@/components/modules/all-product-brand/AdidasCollection";
import DiscountBanner from "@/components/modules/all-product-brand/DiscountBanner";
import SaveMoreSection from "@/components/modules/all-product-brand/SaveMoreSection";
import AppPromo from "@/components/modules/all-product-brand/AppPromo";

import { useGetAllBrandsQuery } from "@/redux/featured/brand/brandApi";
import { useGetAllProductsQuery } from "@/redux/featured/product/productApi";
import { useAppDispatch } from "@/redux/hooks";
import { setBrands } from "@/redux/featured/brand/brandSlice";
import { setProducts } from "@/redux/featured/product/productSlice"; // make sure you have this slice
import { Slider } from "@/components/modules/all-product-brand/slider";

export default function Page() {
  useScrollToTop();
  const dispatch = useAppDispatch();

  // Fetch brands
  const { data: brandsData, isLoading: brandsLoading, error: brandsError } = useGetAllBrandsQuery();

  useEffect(() => {
    if (brandsData) {
      dispatch(setBrands(brandsData));
    }
  }, [brandsData, dispatch]);

  // Fetch products
  const { data: productsData, isLoading: productsLoading, error: productsError } = useGetAllProductsQuery();

  useEffect(() => {
    if (productsData) {
      dispatch(setProducts(productsData));
    }
  }, [productsData, dispatch]);

  return (
    <div>
      <Slider />
      <TopBrands />
      <AdidasCollection />
      <DiscountBanner />
      <SaveMoreSection />
      <AppPromo />
    </div>
  );
}
