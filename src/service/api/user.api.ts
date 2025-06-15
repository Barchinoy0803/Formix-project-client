import { Login, Register } from "../../types/api";
import { mainApi } from "./api";

const extendedApi = mainApi.injectEndpoints({
    endpoints: (build) => ({
        getUsers: build.query({
            query: (params) => ({
                method: "GET",
                url: "/user",
                params
            }),
            providesTags: ['USER']
        }),
        register: build.mutation<Register['Response'], Register['Request']>({
            query: (body) => ({
                method: "POST",
                url: "/user-auth/register",
                body
            }),
        }),
        activate: build.mutation({
            query: (body) => ({
                method: "POST",
                url: "/user-auth/activate",
                body
            }),
        }),
        login: build.mutation<Login['Response'], Login['Request']>({
            query: (body) => ({
                method: "POST",
                url: "/user-auth/login",
                body
            }),
            invalidatesTags: ['USER']
        }),
        deleteUsers: build.mutation({
            query: (body) => ({
                method: "DELETE",
                url: "/user",
                body
            }),
            invalidatesTags: ['USER']
        }),
        updateUserRole: build.mutation({
            query: (body) => ({
                method: "PATCH",
                url: "/user/update-role",
                body
            }),
            invalidatesTags: ['USER']
        }),
    }),
    overrideExisting: false
})

export const { useGetUsersQuery, useLoginMutation, useRegisterMutation, useDeleteUsersMutation, useUpdateUserRoleMutation, useActivateMutation } = extendedApi