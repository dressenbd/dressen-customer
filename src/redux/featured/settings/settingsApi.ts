import { baseApi } from "@/redux/api/baseApi";

interface ContactAndSocial {
  address: string;
  email: string;
  phone: string;
  facebookUrl: string;
  instagramUrl: string;
  whatsappLink: string;
}

interface PolicyInfo {
  title: string;
  description: string;
}

export interface ISettings {
  _id: string;
  privacyPolicy: PolicyInfo;
  returnPolicy: PolicyInfo;
  contactAndSocial: ContactAndSocial;
  enableHomepagePopup: boolean;
  popupTitle: string;
  popupDescription: string;
  popupDelay: number;
  popupImage?: string;
  sliderImages: string[];
  logo?: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSettings: builder.query<ISettings, void>({
      query: () => ({ url: "/settings", method: "GET" }),
      transformResponse: (res: ApiResponse<ISettings>) => res.data,
      providesTags: [{ type: "Settings" as const, id: "SETTINGS" }],
      keepUnusedDataFor: 300, // 5 minutes cache
    }),
  }),
  overrideExisting: false,
});

export const { useGetSettingsQuery } = settingsApi;