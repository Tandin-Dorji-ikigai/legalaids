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
        })

    })
})

export const { useGetAllEmployeeQuery, usePostEmployeeMutation } = employeeApiSlice;
