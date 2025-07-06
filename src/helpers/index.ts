import { store } from '../redux'
import { jwtDecode } from "jwt-decode"
import { setToken } from '../redux/features/user.slice'

export const validateToken = (token: string): boolean => {
    if(!token) return false
    const payload = token.split(".")[1]
    if (payload) {
        try {
            const exp = JSON.parse(atob(payload)).exp
            const now = new Date().getTime() / 1000
            if (exp > now) {
                return true
            }

            removeToken()
        } catch (error) {
            removeToken()
        }
    }
    return false
}

export const getUserId = () => {
    const token = getToken()
    const data = jwtDecode(token!) as any
    return data.id
}

export const getToken = () => store.getState().users.token

export const removeToken = () => store.dispatch(setToken(null))