import { memo } from 'react'
import { Navigate } from 'react-router-dom'
import { validateToken } from '../../helpers'
import Home from '../../pages/Home'

const Private = () => {
    const token = localStorage.getItem("token") || ""
    return validateToken(token) ? <Home/> : <Navigate to={"/auth/login"}/>
}

export default memo(Private)
