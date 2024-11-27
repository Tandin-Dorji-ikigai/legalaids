import { CASE_URL} from "../constants";
import { apiSlice } from "./apiSlice";

export const caseApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        postCase: builder.mutation({
            query: (data) => ({
                url: CASE_URL,
                method: 'POST',
                body: data
            }),
        }),
        getAllCase: builder.query({
            query: () => ({
                url: CASE_URL,
            }),
        }),
        getCase: builder.query({
            query: (id) => ({
                url: CASE_URL + `/appid/${id}`,
            }),
        }),
        getCaseId: builder.query({
            query: (id) => ({
                url: CASE_URL + `/${id}`,
            }),
        }),
        updateCase: builder.mutation({
            query: ({ id, ...data }) => ({
              url: CASE_URL + `/${id}`,
              method: 'PUT',
              body: data,
            }),
        }),
    })
})

export const { usePostCaseMutation, useGetAllCaseQuery, useGetCaseQuery, useUpdateCaseMutation, useGetCaseIdQuery } = caseApiSlice;
