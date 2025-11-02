/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";

const brandApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBrands: builder.query<any, void>({
      query: () => ({
        url: "/brand",
        method: "GET",
      }),
      transformResponse: (response: { data: any }) => response.data,
    }),
    getSingleBrand: builder.query<any, string>({
      query: (id) => ({
        url: `/brand/${id}`,
        method: "GET",
      }),
      transformResponse: (response: { data: any }) => response.data,
    }),
    createBrand: builder.mutation({
      query: (data) => ({
        url: "/brand/create-brand",
        method: "POST",
        body: data,
      }),
    }),
    updateBrand: builder.mutation<any, { id: string; body: any }>({
      query: (id) => ({
        url: `/brand/${id}`,
        method: "PATCH",
      }),
      transformResponse: (response: { data: any }) => response.data,
    }),
  }),
});

export const {
  useGetAllBrandsQuery,
  useGetSingleBrandQuery,
  useLazyGetSingleBrandQuery,
  useCreateBrandMutation,
} = brandApi;
