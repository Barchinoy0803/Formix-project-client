import { NavLink } from "react-router-dom"
import { useTranslator } from "../../hooks/useTranslator"
import { CiSearch } from "react-icons/ci";
import LanguageSwitcher from "../LanguageSwitcher";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchText } from "../../redux/features/template.slice";
import { validateToken } from "../../helpers";
import { Box } from "@mui/material";
import CustomDrawer from "../Drawer";


const Navbar = () => {
  const { t } = useTranslator('auth')
  const { t: dashboard } = useTranslator('dashboard')
  const dispatch = useDispatch()
  const [search, setSearch] = useState<string>("")
  const token = localStorage.getItem("token")

  const isValidUser = useMemo(() => {
    if(token){
      return validateToken(token)
    }
  }, [token])

  useEffect(() => {
    dispatch(setSearchText(search))
  }, [])

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 mb-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center h-16">

          <div className="flex items-center justify-center p-8">
            <div className="font-sans text-[28px] font-normal tracking-wider text-cyan-400 relative py-3">
              <span className="font-bold text-cyan-300 text-3xl mr-px relative">F</span>
              <span className="font-light tracking-wide">ORMIX</span>
              <div className="absolute bottom-0 left-0 w-6 h-1 bg-gradient-to-r from-cyan-300 to-cyan-400"></div>
              <div className="absolute top-0 right-0 w-6 h-px bg-cyan-400 opacity-50"></div>
            </div>
          </div>


          <div>
            <div className="flex gap-1 items-center justify-center bg-[#f1f3f4] rounded-3xl">
              <CiSearch className="mx-3 text-[20px]" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} className="w-[600px] h-[45px] outline-none" placeholder={dashboard('search')} />
            </div>
          </div>
          <div className="flex gap-2 items-center">
            {
              isValidUser ? <CustomDrawer />
                :
                <Box>
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
                </Box>
            }
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar