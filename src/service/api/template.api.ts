import { mainApi } from "./api";

const extendedApi = mainApi.injectEndpoints({
    endpoints: (build) => ({
        getTemplates: build.query({
            query: (params) => ({
                method: "GET",
                url: "/template",
                params
            }),
            providesTags: ['USER']
        }),
        getAllUserTemplates: build.query({
            query: (params) => ({
                method: "GET",
                url: "/template/owner",
                params
            }),
            providesTags: ['USER']
        }),
        createTemplate: build.mutation({
            query: (body) => ({
                method: "POST",
                url: "/template",
                body
            }),
        }),
        deleteTemplate: build.mutation({
            query: (body) => ({
                method: "DELETE",
                url: "/template",
                body
            }),
            invalidatesTags: ['USER']
        }),
        updateTemplate: build.mutation({
            query: ({id, body}) => ({
                method: "PATCH",
                url: `/template/${id}`,
                body
            }),
            invalidatesTags: ['USER']
        }),
    }),
    overrideExisting: false
})

export const { useGetTemplatesQuery, useCreateTemplateMutation, useDeleteTemplateMutation, useGetAllUserTemplatesQuery, useUpdateTemplateMutation } = extendedApi