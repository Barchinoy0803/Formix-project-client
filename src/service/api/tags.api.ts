import { mainApi } from "./api";

const extendedApi = mainApi.injectEndpoints({
    endpoints: (build) => ({
        getAllTags: build.query({
            query: (params) => ({
                method: "GET",
                url: "/tag",
            }),
            providesTags: ['TAG']
        }),
        createTag: build.mutation({
            query: (body) => ({
                method: "POST",
                url: "/tag",
                body
            }),
            invalidatesTags: ['TAG']
        }),
        deleteTag: build.mutation({
            query: (body) => ({
                method: "DELETE",
                url: "/tag",
                body
            }),
            invalidatesTags: ['TAG']
        }),
    }),
    overrideExisting: false
})

export const { useGetAllTagsQuery, useCreateTagMutation, useDeleteTagMutation } = extendedApi