import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { validateToken } from "../../helpers";

export const mainApi = createApi({
    reducerPath: "mainApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        prepareHeaders: (headers, {endpoint}) => {
            const token = localStorage.getItem("token") || ""
            
            if (validateToken(token)) {
                headers.set("Authorization", `Bearer ${token}`)
            }else if(endpoint !== "login" && endpoint !== "register"){
                window.location.href = "/login"
            }
            return headers
        }
    }),
    endpoints: () => ({}),
    tagTypes: ['USER']
})
