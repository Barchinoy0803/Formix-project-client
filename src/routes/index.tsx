import { memo } from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import Auth from '../pages/auth'
import Private from './private'

const MainRouter = () => {
    return (
        useRoutes([
            { path: '/', element: <Navigate to={'/signIn'} /> },
            { path: '/:authType', element: <Auth /> },
            { path: '/dashboard', element: <Private /> },
        ])
    )
}

export default memo(MainRouter)