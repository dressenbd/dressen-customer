/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";

const shopApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllShops: builder.query<any, void>({
      query: () => ({
        url: "/shop",
        method: "GET",
      }),
      transformResponse: (response: { data: any }) => response.data,
    }),
    createShop: builder.mutation({
      query: (data) => ({
        url: "/shop/create-shop",
        method: "POST",
        body: data,
      }),
    }),
    getSingleShop: builder.query<any, string>({
      query: (id) => ({
        url: `/shop/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllShopsQuery, useGetSingleShopQuery,useCreateShopMutation } = shopApi;
