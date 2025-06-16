import { memo } from 'react'
import CustomDrawer from '../../components/Drawer'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div className='flex flex-col gap-3 container mx-auto p-8'>
      <CustomDrawer />
      <Outlet />
    </div>
  )
}

export default memo(Home)
