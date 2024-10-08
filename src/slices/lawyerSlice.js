import { LAWYER_URL} from "../constants";
import { apiSlice } from "./apiSlice";

export const lawyerApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllLawyer: builder.query({
            query: () => ({
                url: LAWYER_URL,
            }),
        }),
    })
})

export const { useGetAllLawyerQuery } = lawyerApiSlice;
