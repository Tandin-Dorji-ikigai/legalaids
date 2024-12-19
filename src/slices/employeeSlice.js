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
        }),
        enableEmployee: builder.mutation({
            query: (id) => ({
              url: EMPLOYEE_URL + `/enable/${id}`,
              method: 'PUT',
            }),
        }),
        disableEmployee: builder.mutation({
            query: (id) => ({
              url: EMPLOYEE_URL + `/disable/${id}`,
              method: 'PUT',
            }),
        }),
    })
})

export const { useGetAllEmployeeQuery, usePostEmployeeMutation, useGetEmployeeByIdQuery, useDisableEmployeeMutation, useEnableEmployeeMutation } = employeeApiSlice;
