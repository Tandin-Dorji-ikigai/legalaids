import { DOC_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const docApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllDoc: builder.query({
            query: () => ({
                url: DOC_URL,
            })
        }),
        postDoc: builder.mutation({
            query: (data) => ({
                url: DOC_URL,
                method: 'POST',
                body: data
            })
        }),
        getDoc: builder.query({
            query: (filename) => ({
                url: DOC_URL+ `/file/${filename}`,
            })
        }),
    })
})

export const { useGetAllDocQuery, usePostDocMutation, useGetDocQuery} = docApiSlice;