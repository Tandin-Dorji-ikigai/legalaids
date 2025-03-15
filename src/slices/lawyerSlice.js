import { LAWYER_URL} from "../constants";
import { apiSlice } from "./apiSlice";

export const lawyerApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllLawyer: builder.query({
            query: () => ({
                url: LAWYER_URL,
            }),
        }),
        postLawyer: builder.mutation({
            query: (data) => ({
                url: LAWYER_URL,
                method: 'POST',
                body: data
            })
        }),
        getLawyerById: builder.query({
            query: (cid) => ({
                url: LAWYER_URL + `/cid/${cid}`,
            }),
        }),
        enableLawyer: builder.mutation({
            query: (id) => ({
              url: LAWYER_URL + `/enable/${id}`,
              method: 'PUT',
            }),
        }),
        disableLawyer: builder.mutation({
            query: (id) => ({
              url: LAWYER_URL + `/disable/${id}`,
              method: 'PUT',
            }),
        }),
        updateLawyer: builder.mutation({
            query: ({ id, ...data }) => ({
                url: LAWYER_URL + `/updatepass/${id}`,
                method: 'PUT',
                body: data,
            }),
        }),
    })
})

export const { useGetAllLawyerQuery, usePostLawyerMutation, useGetLawyerByIdQuery, useDisableLawyerMutation, useEnableLawyerMutation, useUpdateLawyerMutation } = lawyerApiSlice;
