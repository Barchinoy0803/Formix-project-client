import { memo } from 'react'
import { useRoutes } from 'react-router-dom'
import Private from './private'
import Auth from '../pages/auth'
import Register from '../pages/auth/register'
import OtpVerification from '../pages/auth/otp-verification'
import Login from '../pages/auth/login'

const MainRouter = () => {
    return (
        useRoutes([
            {
                path: '/auth', element: <Auth />, 
                children: [
                    {
                        path: 'register', element: <Register/>
                    },
                    {
                        path: 'email-verification', element: <OtpVerification/>
                    },
                    {
                        path: 'login', element: <Login/>
                    }
                ]
            },
            {
                path: '/dashboard', element: <Private />
            },
        ])
    )
}

export default memo(MainRouter)