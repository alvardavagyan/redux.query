import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { InputUser, IUser } from "./types";

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3004" }),
    tagTypes: ["Users"],
    endpoints: builder => ({
        getUsers: builder.query<IUser[], null>({
            query: () => "/users",
            providesTags: ["Users"]
        }),
        addUser: builder.mutation<IUser, InputUser>({
            query: (param) => ({
                url: "/users",
                method: "POST",
                body: param
            }),
            invalidatesTags: ["Users"]
        }),
        deleteUser: builder.mutation<void, string>({
            query: (id) => ({
                url: `/users/${id}`,
                method: "DELETE",
                body: id
            }),
            invalidatesTags: ["Users"]
        }),
        editUser: builder.mutation<IUser, { id: string, updatedUser: InputUser }>({
            query: ({ id, updatedUser }) => ({
                url: `/users/${id}`,
                method: "PUT",
                body: updatedUser
            }),
            invalidatesTags: ["Users"]
        })
    })
})
export const { useGetUsersQuery, useAddUserMutation, useDeleteUserMutation, useEditUserMutation } = usersApi