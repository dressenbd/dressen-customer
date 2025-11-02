// src/redux/featured/category/categoryApi.ts
import { baseApi } from "@/redux/api/baseApi";

/** ---- Remote API types (flexible: name/label + id/slug/_id তিনটাই সাপোর্ট) ---- */
export type RemoteSubCategory = {
  _id?: string;
  slug?: string;
  id?: string;
  name?: string;
  label?: string;
};

export type RemoteCategory = {
  _id?: string;
  slug?: string;
  id?: string;
  name?: string;
  label?: string;
  children?: RemoteSubCategory[];
  subCategories?: string[];
};

/** Helper: stable tag id নির্বাচন */
const idOf = (o?: { _id?: string; slug?: string; id?: string } | null) =>
  (o?.slug ?? o?._id ?? o?.id ?? "unknown") as string;

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /** GET /category => RemoteCategory[] | { data: RemoteCategory[] } */
    getAllCategory: builder.query<RemoteCategory[], void>({
      query: () => ({ url: "/category", method: "GET" }),
      transformResponse: (
        res: RemoteCategory[] | { data: RemoteCategory[] }
      ): RemoteCategory[] => {
        if (Array.isArray(res)) return res;
        return Array.isArray(res?.data) ? res.data : [];
      },
      providesTags: (result) =>
        result && result.length
          ? [
              { type: "Category" as const, id: "LIST" },
              ...result.map((c) => ({ type: "Category" as const, id: idOf(c) })),
            ]
          : [{ type: "Category" as const, id: "LIST" }],
      keepUnusedDataFor: 120,
    }),

    /** GET /category/:id => RemoteCategory | { data: RemoteCategory } */
    getSingleCategory: builder.query<RemoteCategory, string>({
      query: (id) => ({ url: `/category/${id}`, method: "GET" }),
      transformResponse: (
        res: RemoteCategory | { data: RemoteCategory }
      ): RemoteCategory => {
        if (res && typeof res === "object" && "data" in res) {
          return (res as { data: RemoteCategory }).data;
        }
        return (res as RemoteCategory) ?? {};
      },
      providesTags: (_r, _e, id) => [{ type: "Category" as const, id }],
    }),

    /** POST /category/create-category => RemoteCategory */
    createCategory: builder.mutation<RemoteCategory, Partial<RemoteCategory>>({
      query: (body) => ({
        url: "/category/create-category",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Category" as const, id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllCategoryQuery,
  useGetSingleCategoryQuery,
  useCreateCategoryMutation,
} = categoryApi;
