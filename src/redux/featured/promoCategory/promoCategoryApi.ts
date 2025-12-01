import { baseApi } from "@/redux/api/baseApi";
import type { IProduct } from "@/types/product";

export type PromoCategory = {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  isActive: boolean;
  startDate: Date;
  endDate: Date;
};

interface ApiResponse<T> {
  success?: boolean;
  message?: string;
  data: T;
}

export const promoCategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getActivePromoCategories: builder.query<PromoCategory[], void>({
      query: () => ({ url: "promo-category/active", method: "GET" }),
      transformResponse: (res: ApiResponse<PromoCategory[]> | PromoCategory[]) => {
        if (Array.isArray(res)) return res;
        return res?.data || [];
      },
      keepUnusedDataFor: 60,
    }),

    getAllPromoProducts: builder.query<IProduct[], void>({
      query: () => ({
        url: "product/promo-products",
        method: "GET",
      }),
      transformResponse: (res: ApiResponse<IProduct[]> | IProduct[]) => {
        if (Array.isArray(res)) return res;
        return res?.data || [];
      },
      providesTags: [{ type: "Product" as const, id: "PROMO_ALL" }],
      keepUnusedDataFor: 30,
    }),

    getProductsByPromoCategory: builder.query<IProduct[], string>({
      query: (promoCategoryId) => ({
        url: `product/promo-category/${promoCategoryId}`,
        method: "GET",
      }),
      transformResponse: (res: ApiResponse<IProduct[]> | IProduct[]) => {
        if (Array.isArray(res)) return res;
        return res?.data || [];
      },
      providesTags: (_result, _error, id) => [{ type: "Product" as const, id: `PROMO_${id}` }],
      keepUnusedDataFor: 30,
    }),
  }),
});

export const {
  useGetActivePromoCategoriesQuery,
  useGetAllPromoProductsQuery,
  useGetProductsByPromoCategoryQuery,
} = promoCategoryApi;
