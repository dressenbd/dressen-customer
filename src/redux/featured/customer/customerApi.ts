/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";

const customerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getSingleCustomer: builder.query<any, string>({
      query: (id) => ({
        url: `/customer/my-info/${id}`,
        method: "GET",
      }),
      providesTags: ["Customer"],
      transformResponse: (response: { data: any }) => response.data,
    }),
    createCustomer: builder.mutation({
      query: (data) => ({
        url: "/customer/create-customer",
        method: "POST",
        body: data,
      }),
    }),

    updateCustomer: builder.mutation<any, { id: string; body: any }>({
      
      query: ({ id, body }) => ({
        
        url: `/customer/update-customer/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Customer"],
    }),
  }),
});

export const {
  useGetSingleCustomerQuery,
  useUpdateCustomerMutation,
  useCreateCustomerMutation,
} = customerApi;
