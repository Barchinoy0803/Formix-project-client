import { memo } from 'react'
import { Outlet } from 'react-router-dom'

const Auth = () => {

    return (
        <div className='flex flex-col w-full items-center justify-center h-screen'>
            <div className='flex w-full'>
                <div className='w-1/2 flex flex-col justify-center max-[430px]:items-stretch p-2.5 items-center max-[860px]:w-full'>
                   <Outlet/>
                </div>
                <div className="w-1/2 h-screen bg-gradient-to-br from-[#7985f7] via-[#576FC7] to-[#9153ED] max-[860px]:hidden"></div>
            </div>
        </div>
    )
}

export default memo(Auth)