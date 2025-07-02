import { mainApi } from "./api";

const extendedApi = mainApi.injectEndpoints({
    endpoints: (build) => ({
        getComment: build.query({
            query: (params) => ({
                method: "GET",
                url: "/comment",
                params
            }),
            providesTags: ['COMMENT'],
        }),

        createComment: build.mutation({
            query: (body) => ({
                method: "POST",
                url: "/comment",
                body
            }),
            invalidatesTags: ['COMMENT'],
        }),

        deleteComment: build.mutation({
            query: (body) => ({
                method: "DELETE",
                url: "/comment",
                body
            }),
            invalidatesTags: ['COMMENT'],
        }),

        updateComment: build.mutation({
            query: ({ id, body }) => ({
                method: "PATCH",
                url: `/comment/${id}`,
                body
            }),
        }),
    }),
    overrideExisting: false
});

export const {

} = extendedApi;
