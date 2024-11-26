import { USER_URL } from "../constants";
import { ROLE_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        postUser: builder.mutation({
            query: (data) => ({
                url: USER_URL,
                method: 'POST',
                body: data
            }),
        }),
        getAllUser: builder.query({
            query: () => ({
                url: USER_URL,
            }),
        }),
        getAllRole: builder.query({
            query: () => ({
                url: ROLE_URL,
            }),
        })
    })
})

export const { usePostUserMutation, useGetAllUserQuery, useGetAllRoleQuery } = adminApiSlice;