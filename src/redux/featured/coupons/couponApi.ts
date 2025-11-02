/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";

const couponApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCoupons: builder.query<any, void>({
      query: () => ({
        url: "/coupon",
        method: "GET",
      }),
      transformResponse: (response: { data: any }) => response.data,
    }),
    getSingleCoupon: builder.query<any, string>({
      query: (id) => ({
        url: `/coupon/${id}`,
        method: "GET",
      }),
      transformResponse: (response: { data: any }) => response.data,
    }),
    createCoupon: builder.mutation({
      query: (data) => ({
        url: "/coupon/create-coupon",
        method: "POST",
        body: data,
      }),
    }),
    updateCoupon: builder.mutation<any, { id: string; body: any }>({
      query: (id) => ({
        url: `/coupon/${id}`,
        method: "PATCH",
      }),
      transformResponse: (response: { data: any }) => response.data,
    }),
  }),
});

export const {
  useGetAllCouponsQuery,
  useGetSingleCouponQuery,
  useLazyGetSingleCouponQuery,
  useCreateCouponMutation,
} = couponApi;
