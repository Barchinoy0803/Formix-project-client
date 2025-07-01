import { memo } from 'react'
import { useRoutes } from 'react-router-dom'
import Private from './private'
import Auth from '../pages/auth'
import Register from '../pages/auth/register'
import OtpVerification from '../pages/auth/otp-verification'
import Login from '../pages/auth/login'
import Forms from '../pages/Forms'
import Templates from '../pages/Templates'
import UserManagment from '../pages/UserManagment'
import Template from '../pages/Template'
import Survey from '../pages/Survey'
import Home from '../pages/Home'

const MainRouter = () => {
    return (
        useRoutes([
            { path: '/', element: <Home /> },
            {
                path: '/auth', element: <Auth />,
                children: [
                    {
                        path: 'register', element: <Register />
                    },
                    {
                        path: 'email-verification', element: <OtpVerification />
                    },
                    {
                        path: 'login', element: <Login />
                    }
                ]
            },
            {
                path: '/dashboard', element: <Private />,
                children: [
                    {
                        path: 'forms', element: <Forms />
                    },
                    {
                        path: 'form/:id', element: <Survey />
                    },
                    {
                        path: 'survey/:id', element: <Survey />
                    },
                    {
                        path: 'templates', element: <Templates />,
                    },
                    {
                        path: 'template/:id', element: <Template />,
                    },
                    {
                        path: 'user-managment', element: <UserManagment />
                    }
                ]
            },
        ])
    )
}

export default memo(MainRouter)