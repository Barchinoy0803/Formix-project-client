export const validateToken = (token: string): boolean => {
    const payload = token.split(".")[1]
    if (payload) {
        try {
            const exp = JSON.parse(atob(payload)).exp
            const now = new Date().getTime() / 1000
            if (exp > now) {
                return true
            }

            localStorage.removeItem("token")
        } catch (error) {
            localStorage.removeItem("token")
        }
    }
    return false
}
