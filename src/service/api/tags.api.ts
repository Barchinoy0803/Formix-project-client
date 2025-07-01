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

export const { useGetAllTagsQuery, useCreateTagMutation, useDeleteTagMutation } = extendedApi