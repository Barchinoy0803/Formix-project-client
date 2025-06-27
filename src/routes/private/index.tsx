import { memo } from 'react'
import { Navigate } from 'react-router-dom'
import { validateToken } from '../../helpers'
import Dashboard from '../../pages/Dashboard'

const Private = () => {
    const token = localStorage.getItem("token") || ""
    return validateToken(token) ? <Dashboard/> : <Navigate to={"/auth/login"}/>
}

export default memo(Private)
