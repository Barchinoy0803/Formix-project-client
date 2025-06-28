import { memo, useState } from 'react'
import CustomDrawer from '../../components/Drawer'
import { Outlet, useLocation } from 'react-router-dom'
import LanguageSwitcher from '../../components/LanguageSwitcher'
import { CiSearch } from "react-icons/ci"

const Dashboard = () => {
    const [search, setSearch] = useState('')
    const location = useLocation()

    const showSearch = ['/dashboard/templates', '/dashboard/forms', '/dashboard/analyze'].includes(location.pathname)

    return (
        <div className='flex flex-col gap-3'>
            <div className='flex justify-center bg-white shadow-sm border-b border-gray-200 mb-8 items-center'>
                <div className='container mx-auto flex items-center justify-between p-4'>
                    <CustomDrawer />
                    {showSearch && (
                        <div className="flex gap-1 items-center justify-center bg-[#f1f3f4] rounded-3xl">
                            <CiSearch className="mx-3 text-[20px]" />
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-[600px] h-[45px] outline-none"
                                placeholder="Search"
                            />
                        </div>
                    )}
                    <LanguageSwitcher />
                </div>
            </div>
            <Outlet context={{ search }} />
        </div>
    )
}

export default memo(Dashboard)
