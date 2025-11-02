import { baseApi } from "@/redux/api/baseApi";
import type { ISlide } from "@/types/slide";

export const slideApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHeroSlides: builder.query<ISlide[], void>({
      query: () => ({ url: "/slides/hero", method: "GET" }),
      transformResponse: (res: { data: ISlide[] } | ISlide[]): ISlide[] =>
        Array.isArray(res) ? res : res.data,
      providesTags: (result) =>
        result
          ? [{ type: "Slide" as const, id: "LIST" },
             ...result.map((s) => ({ type: "Slide" as const, id: s._id }))]
          : [{ type: "Slide" as const, id: "LIST" }],
      keepUnusedDataFor: 120,
    }),
  }),
  overrideExisting: false,
});

export const { useGetHeroSlidesQuery } = slideApi;
