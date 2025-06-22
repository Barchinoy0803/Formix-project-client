import { mainApi } from "./api";

const extendedApi = mainApi.injectEndpoints({
    endpoints: (build) => ({
        getAllForms: build.query({
            query: (params) => ({
                method: "GET",
                url: "/form",
                params
            }),
            providesTags: ['FORM']
        }),
        getAllUserForms: build.query({
            query: (params) => ({
                method: "GET",
                url: "/form/all-forms",
                params
            }),
            providesTags: ['FORM']
        }),
        getForms: build.query({
            query: (params) => ({
                method: "GET",
                url: "/form/forms",
                params
            }),
            providesTags: ['FORM']
        }),
        getOneForm: build.query({
            query: (id) => ({
                method: "GET",
                url: `/form/${id}`,
                id
            })
        }),
        createForm: build.mutation({
            query: (body) => ({
                method: "POST",
                url: "/form",
                body
            }),
            invalidatesTags: ['FORM']
        }),
        deleteForms: build.mutation({
            query: (body) => ({
                method: "DELETE",
                url: "/form",
                body
            }),
            invalidatesTags: ['FORM']
        }),
        updateForm: build.mutation({
            query: ({ id, body }) => ({
                method: "PATCH",
                url: `/form/${id}`,
                body
            }),
            invalidatesTags: ['FORM']
        }),
    }),
    overrideExisting: false
})

export const { useCreateFormMutation, useDeleteFormsMutation, useGetFormsQuery, useGetOneFormQuery, useUpdateFormMutation, useGetAllFormsQuery, useGetAllUserFormsQuery } = extendedApi