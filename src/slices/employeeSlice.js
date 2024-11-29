import { EMPLOYEE_URL} from "../constants";
import { apiSlice } from "./apiSlice";

export const employeeApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllEmployee: builder.query({
            query: () => ({
                url: EMPLOYEE_URL,
            }),
        }),
        postEmployee: builder.mutation({
            query: (data) => ({
                url: EMPLOYEE_URL,
                method: 'POST',
                body: data
            })
        }),
        getEmployeeById: builder.query({
            query: (cid) => ({
                url: EMPLOYEE_URL + `/cid/${cid}`,
            }),
        })
    })
})

export const { useGetAllEmployeeQuery, usePostEmployeeMutation, useGetEmployeeByIdQuery } = employeeApiSlice;
