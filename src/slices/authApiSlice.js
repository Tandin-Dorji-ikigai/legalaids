import { AUTH_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: AUTH_URL + '/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: AUTH_URL + '/logout',
                method: 'POST',
            }),
        }),
        verifyOTP: builder.mutation({
            query: (data) => ({
                url: AUTH_URL + '/verify-otp',
                method: 'POST',
                body: data,
            }),
        })
    }),
});

export const { useLoginMutation, useLogoutMutation, useVerifyOTPMutation } = authApiSlice;
