import { CENSUS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const censusApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCensus: builder.query({
            query: (cid) => ({
                url: CENSUS_URL + `/citizendetails/${cid}`,
            }),
        }),
    })
})

export const { useGetCensusQuery } = censusApiSlice;

