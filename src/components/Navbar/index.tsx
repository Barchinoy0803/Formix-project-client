import { NavLink } from "react-router-dom"
import { useTranslator } from "../../hooks/useTranslator"
import { CiSearch } from "react-icons/ci";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchText } from "../../redux/features/template.slice";


const Navbar = () => {
  const { t } = useTranslator('auth')
  const dispatch = useDispatch()
  const [search, setSearch] = useState<string>("")

  useEffect(() => {
    dispatch(setSearchText(search))
  }, [])


  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 mb-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <span className="text-[24px] font-bold text-[#47aed6]">Formify</span>
          </div>
          <div>
            <div className="flex gap-1 items-center justify-center bg-[#f1f3f4] rounded-3xl">
              <CiSearch className="mx-3 text-[20px]" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} className="w-[600px] h-[45px] outline-none" placeholder="Search" />
            </div>
          </div>
          <div className="flex space-x-4">
            <NavLink
              to="auth/register"
              className={({ isActive }) =>
                `px-4 py-2 rounded-md text-md font-medium transition-colors duration-200 ${isActive
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-700 hover:text-[#47aed6] hover:bg-blue-50'
                }`
              }
            >
              {t('register')}
            </NavLink>
            <NavLink
              to="auth/login"
              className={({ isActive }) =>
                `px-4 py-2 rounded-md text-md font-medium transition-colors duration-200 ${isActive
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-700 hover:text-[#47aed6] hover:bg-blue-50'
                }`
              }
            >
              {t('login')}
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar