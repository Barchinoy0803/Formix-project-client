import { memo } from 'react'
import CustomDrawer from '../../components/Drawer'
import { Outlet } from 'react-router-dom'
import LanguageSwitcher from '../../components/LanguageSwitcher'

const Home = () => {
  return (
    <div className='flex flex-col gap-3 container mx-auto p-8'>
      <div className='flex items-center justify-between'>
        <CustomDrawer />
        <LanguageSwitcher />
      </div>
      <Outlet />
    </div>
  )
}

export default memo(Home)
