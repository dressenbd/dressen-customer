import { baseApi } from "@/redux/api/baseApi";

export interface User {
  name: string;
  email: string;
  password: string;
  status?: string;
  orders?: number;
  walletPoint?: number;
  createdAt?: string;
  role?: string;
}

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<User[], void>({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
      transformResponse: (response: { data: User[] }) => response.data,
    }),
    getSingleUser: builder.query<User, string>({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
    }),
    updateUser: builder.mutation<
      Partial<User>,
      { id: string; userData: Partial<User> }
    >({
      query: ({ id, userData }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        body: userData,
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetSingleUserQuery,
  useUpdateUserMutation,
} = userApi;
