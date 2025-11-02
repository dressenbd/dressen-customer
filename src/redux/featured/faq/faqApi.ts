/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";

const faqApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFaq: builder.query<any, void>({
      query: () => ({
        url: "/faq",
        method: "GET",
      }),
      transformResponse: (response: { data: any }) => response.data,
    }),
    getSingleFaq: builder.query<any, string>({
      query: (id) => ({
        url: `/faq/${id}`,
        method: "GET",
      }),
      transformResponse: (response: { data: any }) => response.data,
    }),
    createFaq: builder.mutation({
      query: (data) => ({
        url: "/faq/create-faq",
        method: "POST",
        body: data,
      }),
    }),
    updateFaq: builder.mutation<any, { id: string; body: any }>({
      query: (id) => ({
        url: `/faq/${id}`,
        method: "PATCH",
      }),
      transformResponse: (response: { data: any }) => response.data,
    }),
  }),
});

export const {
  useGetAllFaqQuery,
  useGetSingleFaqQuery,
  useLazyGetSingleFaqQuery,
  useCreateFaqMutation,
} = faqApi;
