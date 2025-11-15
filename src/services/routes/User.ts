import { ICretedUserRequest, IUser } from "@/interfaces/Auth.interface";
import { api } from "../api";

export const UserAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserById: builder.query<IUser, string>({
      query: (userId) => ({
        url: `/user/${userId}`,
        method: "GET",
      }),
    }),

    registerUser: builder.mutation<IUser, ICretedUserRequest>({
      query: (userData) => ({
        url: "user/register",
        method: "POST",
        body: userData,
      }),
    }),

    verifyEmail: builder.mutation<{ message: string }, { token: string }>({
      query: ({ token }) => ({
        url: `user/verify-email?token=${token}`,
        method: "GET",
      }),
    }),

    resendVerificationEmail: builder.mutation<
      { message: string },
      { email: string }
    >({
      query: ({ email }) => ({
        url: "user/resend-verification-email",
        method: "POST",
        body: { email },
      }),
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useLazyGetUserByIdQuery,
  useRegisterUserMutation,
  useVerifyEmailMutation,
  useResendVerificationEmailMutation,
} = UserAPI;
