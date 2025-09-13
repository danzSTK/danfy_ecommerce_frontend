import {
  ILoginRequest,
  ILoginResponse,
  IUser,
} from "@/interfaces/AuthInterface";
import { api } from "../api";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ILoginResponse, ILoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    getUser: builder.query<IUser, string>({
      query: (userId) => ({
        url: `/user/${userId}`,
        method: "GET",
      }),
    }),

    refreshToken: builder.mutation<ILoginResponse, { refreshToken: string }>({
      query: (refreshData) => ({
        url: "/auth/refresh-token",
        method: "POST",
        body: refreshData,
      }),
    }),

  }),
});

export const {
  useLoginMutation,
  useGetUserQuery,
  useRefreshTokenMutation,
  useLazyGetUserQuery,
} = authApi;
