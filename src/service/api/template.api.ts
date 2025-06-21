import { mainApi } from "./api";

const extendedApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    getTemplates: build.query({
      query: (params) => ({
        method: "GET",
        url: "/template",
        params
      }),
      providesTags: [{ type: 'TEMPLATE', id: 'LIST' }],
    }),

    getAllUserTemplates: build.query({
      query: (params) => ({
        method: "GET",
        url: "/template/owner",
        params
      }),
      providesTags: [{ type: 'TEMPLATE', id: 'LIST' }],
    }),

    getOneTemplate: build.query({
      query: (id) => ({
        method: "GET",
        url: `/template/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: 'TEMPLATE', id }],
    }),

    createTemplate: build.mutation({
      query: (body) => ({
        method: "POST",
        url: "/template",
        body
      }),
      invalidatesTags: [{ type: 'TEMPLATE', id: 'LIST' }],
    }),

    deleteTemplate: build.mutation({
      query: (body) => ({
        method: "DELETE",
        url: "/template",
        body
      }),
      invalidatesTags: [{ type: 'TEMPLATE', id: 'LIST' }],
    }),

    updateTemplate: build.mutation({
      query: ({ id, body }) => ({
        method: "PATCH",
        url: `/template/${id}`,
        body
      }),
      invalidatesTags: ({ id }) => [
        { type: 'TEMPLATE', id },
        { type: 'TEMPLATE', id: 'LIST' }
      ],
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
    }),
  }),
  overrideExisting: false
});

export const {
  useGetTemplatesQuery,
  useCreateTemplateMutation,
  useDeleteTemplateMutation,
  useGetAllUserTemplatesQuery,
  useUpdateTemplateMutation,
  useFileUploadMutation,
  useGetOneTemplateQuery
} = extendedApi;
