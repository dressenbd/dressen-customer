/* eslint-disable @typescript-eslint/no-explicit-any */
// redux/featured/reviews/reviews.ts
import { baseApi } from "@/redux/api/baseApi";

export const reviewsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query<any, void>({
      query: () => ({
        url: "/become-seller-reviews",
        method: "GET",
      }),
    transformResponse: (response: { data: any }) =>  response.data,
    }),
  }),
});

export const { useGetReviewsQuery } = reviewsApi;
