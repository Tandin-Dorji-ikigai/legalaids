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
        })
    })
})

export const { useGetAllLawyerQuery, usePostLawyerMutation, useGetLawyerByIdQuery } = lawyerApiSlice;
