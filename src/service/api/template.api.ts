import { mainApi } from "./api";

const extendedApi = mainApi.injectEndpoints({
    endpoints: (build) => ({
        getTemplates: build.query({
            query: (params) => ({
                method: "GET",
                url: "/template",
                params
            }),
            providesTags: ['TEMPLATE']
        }),
        getOneTemplate: build.query({
           query: (id) => ({
            method: "GET",
            url: `/template/${id}`,
            id
           }) 
        }),
        getAllUserTemplates: build.query({
            query: (params) => ({
                method: "GET",
                url: "/template/owner",
                params
            }),
            providesTags: ['TEMPLATE']
        }),
        createTemplate: build.mutation({
            query: (body) => ({
                method: "POST",
                url: "/template",
                body
            }),
            invalidatesTags: ['TEMPLATE']
        }),
        deleteTemplate: build.mutation({
            query: (body) => ({
                method: "DELETE",
                url: "/template",
                body
            }),
            invalidatesTags: ['TEMPLATE']
        }),
        updateTemplate: build.mutation({
            query: ({ id, body }) => ({
                method: "PATCH",
                url: `/template/${id}`,
                body
            }),
            invalidatesTags: ['TEMPLATE']
        }),
        fileUpload: build.mutation({
            query: ({ body }) => ({
                method: "POST",
                url: `/file-upload`,
                body,
                headers: {
                    'X-skip-Content-Type': 'true'
                }
            }),
        })
    }),
    overrideExisting: false
})

export const { useGetTemplatesQuery, useCreateTemplateMutation, useDeleteTemplateMutation, useGetAllUserTemplatesQuery, useUpdateTemplateMutation, useFileUploadMutation, useGetOneTemplateQuery } = extendedApi