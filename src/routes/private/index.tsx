import { memo } from 'react'
import { Navigate } from 'react-router-dom'
import { validateToken } from '../../helpers'
import Dashboard from '../../pages/Dashboard'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux'

const Private = () => {
    const {token} = useSelector((state: RootState) => state.users);
    
    return validateToken(token!) ? <Dashboard /> : <Navigate to={"/auth/login"} />
}

export default memo(Private)
