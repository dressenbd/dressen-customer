/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";

const shopApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTerms: builder.query<any, void>({
      query: () => ({
        url: "/terms",
        method: "GET",
      }),
      transformResponse: (response: { data: any }) => response.data,
    }),
    createTerms: builder.mutation({
      query: (data) => ({
        url: "/terms/create-terms",
        method: "POST",
        body: data,
      }),
    }),
    getSingleTerms: builder.query<any, string>({
      query: (id) => ({
        url: `/terms/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllTermsQuery,
  useGetSingleTermsQuery,
  useCreateTermsMutation,
} = shopApi;
