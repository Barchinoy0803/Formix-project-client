import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  token: string | null
  email: string | null
  userRole: string
  lang: string
  isDarkMode: boolean
}

const initialState: UserState = {
  token: null,
  email: null,
  userRole: '',
  lang: '',
  isDarkMode: false
}

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload
    },
    setEmail(state, action: PayloadAction<string | null>) {
      state.email = action.payload
    },
    resetUserState() {
      return initialState
    },
    setUserRole(state, action: PayloadAction<string>) {
      state.userRole = action.payload
    },
    setLanguage(state, action: PayloadAction<string>) {
      state.lang = action.payload
    },
    setDarkMode(state, action: PayloadAction<boolean>) {
      state.isDarkMode = action.payload
    }
  },
})

export const { setToken, setEmail, resetUserState, setUserRole, setLanguage, setDarkMode } = userSlice.actions
export default userSlice.reducer
