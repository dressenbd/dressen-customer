/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboard: builder.query<any, void>({
      query: () => ({
        url: "/dashboard",
        method: "GET",
      }),
      transformResponse: (response: { data: any }) => response.data,
    }),
    createDashboard: builder.mutation({
      query: (data) => ({
        url: "/dashboard",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetDashboardQuery } = dashboardApi;
