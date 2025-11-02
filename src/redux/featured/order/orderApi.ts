// src/redux/featured/order/orderApi.ts
import { baseApi } from "@/redux/api/baseApi";
import type {
  IOrder,
  CreateOrderInput
} from "@/types/order";




type ApiResponse<T> = { success: boolean; message?: string; data: T };


export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query<IOrder[], void>({
      query: () => ({ url: "/order", method: "GET" }),
      transformResponse: (res: ApiResponse<IOrder[]>) => res.data,
      providesTags: (result) =>
        result
          ? [
              { type: "Order" as const, id: "LIST" },
              ...result.map((o) => ({ type: "Order" as const, id: o._id })),
            ]
          : [{ type: "Order" as const, id: "LIST" }],
      keepUnusedDataFor: 120,
    }),

    getSingleOrder: builder.query<IOrder, string>({
      query: (id) => ({ url: `/order/${id}`, method: "GET" }),
      transformResponse: (res: ApiResponse<IOrder>) => res.data,
      providesTags: (_res, _err, id) => [{ type: "Order" as const, id }],
    }),

    createOrder: builder.mutation<IOrder, CreateOrderInput>({
      query: (body) => ({ url: "/order/create-order", method: "POST", body }),
      transformResponse: (res: ApiResponse<IOrder>) => res.data,
      invalidatesTags: [{ type: "Order" as const, id: "LIST" }],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAllOrdersQuery,
  useGetSingleOrderQuery,
  useCreateOrderMutation,
} = orderApi;
