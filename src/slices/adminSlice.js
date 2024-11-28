import { ADMIN_URL} from "../constants";
import { apiSlice } from "./apiSlice";

export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllAdmin: builder.query({
            query: () => ({
                url: ADMIN_URL,
            }),
        }),
        postAdmin: builder.mutation({
            query: (data) => ({
                url: ADMIN_URL,
                method: 'POST',
                body: data
            })
        })
    })
})

export const { useGetAllAdminQuery, usePostAdminMutation } = adminApiSlice;
