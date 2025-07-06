import { memo } from 'react'
import { Outlet } from 'react-router-dom'

const Auth = () => {

    return (
        <div className='flex flex-col w-full items-center justify-center h-screen'>
            <Outlet/>
        </div>
    )
}

export default memo(Auth)