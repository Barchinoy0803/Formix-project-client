import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export interface UserState {
    token: null | string,
    email: string
}

const initialState: UserState = {
    token: localStorage.getItem("token") || null,
    email: localStorage.getItem("email") || ""
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
        }
    },
})

export const { setToken, setEmail, resetUserState } = UsersState.actions
export default UsersState.reducer
