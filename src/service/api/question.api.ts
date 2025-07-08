import { mainApi } from "./api";

const extendedApi = mainApi.injectEndpoints({
    endpoints: (build) => ({
        getQuestions: build.query({
            query: (params) => ({
                method: "GET",
                url: "/question",
                params
            }),
            providesTags: ['QUESTION']
        }),
        getTemplateQuestions: build.query({
            query: (templateId) => ({
                method: "GET",
                url: `/question/template/${templateId}`,
            }),
            providesTags: ['QUESTION']
        }),
        getOneQuestion: build.query({
            query: (id) => ({
                method: "GET",
                url: `/question/${id}`,
                id
            }),
            providesTags: ['QUESTION']
        }),

        getAnalyzes: build.query({
            query: (id) => ({
                method: "GET",
                url: `/analyze/${id}`,
                id
            }),
            providesTags: ['ANALYZE']
        }),

        createQuestion: build.mutation({
            query: (body) => ({
                method: "POST",
                url: "/question",
                body
            }),
            invalidatesTags: ['QUESTION']
        }),
        deleteQuestion: build.mutation({
            query: (body) => ({
                method: "DELETE",
                url: "/question",
                body
            }),
            invalidatesTags: ['QUESTION']
        }),
        updateQuestion: build.mutation({
            query: ({ id, body }) => ({
                method: "PATCH",
                url: `/question/${id}`,
                body
            }),
            invalidatesTags: ['QUESTION']
        }),
    }),
    overrideExisting: false
})

export const { useCreateQuestionMutation, useDeleteQuestionMutation, useGetOneQuestionQuery, useGetQuestionsQuery, useUpdateQuestionMutation, useGetTemplateQuestionsQuery, useGetAnalyzesQuery } = extendedApi