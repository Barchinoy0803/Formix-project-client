import { mainApi } from "./api";

const extendedApi = mainApi.injectEndpoints({
    endpoints: (build) => ({
        getForms: build.query({
            query: (params) => ({
                method: "GET",
                url: "/form",
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

export const { useCreateFormMutation, useDeleteFormsMutation, useGetFormsQuery, useGetOneFormQuery, useUpdateFormMutation } = extendedApi