import { baseApi } from "@/redux/api/baseApi";

interface ContactAndSocial {
  address?: string;
  email?: string;
  phone?: string;
  facebookUrl: string[];
  instagramUrl: string[];
  youtubeUrl: string[];
  whatsappLink: string[];
}

interface MobileMfs {
  bKash: {
    bKashLogo: string;
    bKashNumber: string;
  };
  nagad: {
    nagadLogo: string;
    nagadNumber: string;
  };
  rocket: {
    rocketLogo: string;
    rocketNumber: string;
  };
  upay: {
    upayLogo: string;
    upayNumber: string;
  };
}

interface SliderImage {
  image: string;
  url: string;
}

interface PolicyInfo {
  title: string;
  description: string;
}

export interface ISettings {
  _id: string;
  privacyPolicy?: PolicyInfo;
  returnPolicy?: PolicyInfo;
  contactAndSocial: ContactAndSocial;
  mobileMfs: MobileMfs;
  enableHomepagePopup: boolean;
  popupTitle?: string;
  popupDescription?: string;
  popupDelay: number;
  popupImage?: string;
  sliderImages: SliderImage[];
  deliveryCharge: number;
  logo?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
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