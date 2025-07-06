import { mainApi } from "./api";

const extendedApi = mainApi.injectEndpoints({
    endpoints: (build) => ({
        getAllTags: build.query({
            query: () => ({
                method: "GET",
                url: "/tag",
            }),
            providesTags: ['TAG']
        }),
        getOneTag: build.query({
            query: (id) => ({
              url: `/tag/${id}`,
              method: 'GET',
            }),
            providesTags: ['TAG'],
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
            query: (id) => ({
                url: `/tag/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['TAG'],
        }),
    }),
    overrideExisting: false
})

export const { useGetAllTagsQuery, useGetOneTagQuery, useCreateTagMutation, useDeleteTagMutation } = extendedApi