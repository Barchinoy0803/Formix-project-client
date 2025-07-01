import { NavLink } from "react-router-dom"
import { useTranslator } from "../../hooks/useTranslator"
import { Dispatch, SetStateAction } from "react";
import { CiSearch } from "react-icons/ci";
import LanguageSwitcher from "../LanguageSwitcher";


interface NavbarProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>
}

const Navbar = ({ search, setSearch }: NavbarProps) => {
  const { t } = useTranslator('auth')
  const { t:dashboard } = useTranslator('dashboard')
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
              <input value={search} onChange={(e) => setSearch(e.target.value)} className="w-[600px] h-[45px] outline-none" placeholder={dashboard('search')} />
            </div>
          </div>
          <div className="flex gap-1">
            <LanguageSwitcher />
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