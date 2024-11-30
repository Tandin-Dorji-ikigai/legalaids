import { COUNCIL_URL} from "../constants";
import { apiSlice } from "./apiSlice";

export const councilApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllCouncil: builder.query({
            query: () => ({
                url: COUNCIL_URL,
            }),
        }),
        postCouncil: builder.mutation({
            query: (data) => ({
                url: COUNCIL_URL,
                method: 'POST',
                body: data
            })
        }),
        getCouncilById: builder.query({
            query: (cid) => ({
                url: COUNCIL_URL+ `/cid/${cid}`,
            }),
        }),
        enableCouncil: builder.mutation({
            query: (id) => ({
              url: COUNCIL_URL + `/enable/${id}`,
              method: 'PUT',
            }),
        }),
        disableCouncil: builder.mutation({
            query: (id) => ({
              url: COUNCIL_URL + `/disable/${id}`,
              method: 'PUT',
            }),
        }),
    })
})

export const { useGetAllCouncilQuery, usePostCouncilMutation, useLazyGetCouncilByIdQuery, useDisableCouncilMutation, useEnableCouncilMutation } = councilApiSlice;
