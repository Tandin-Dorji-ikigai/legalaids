import { EMAIL_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        sendEmail: builder.mutation({
            query: (data) => ({
                url: EMAIL_URL,
                method: 'POST',
                body: data
            }),
        })
    })
})

export const { useSendEmailMutation } = adminApiSlice;