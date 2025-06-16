import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export interface UserState {
    token: null | string,
    email: string,
    userRole: string
}

const initialState: UserState = {
    token: localStorage.getItem("token") || null,
    email: localStorage.getItem("email") || "",
    userRole: localStorage.getItem("role") || ""
}

export const UsersState = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload
            localStorage.setItem("token", state.token)
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload
            localStorage.setItem("email", state.email)
        },
        resetUserState: (state) => {
            state.email = ""
            localStorage.setItem("email", state.email)
        },
        setUserRole: (state, action: PayloadAction<string>) => {
            state.userRole = action.payload
            localStorage.setItem("role", state.userRole)
        }

    },
})

export const { setToken, setEmail, resetUserState, setUserRole } = UsersState.actions
export default UsersState.reducer
