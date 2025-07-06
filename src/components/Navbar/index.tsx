import { NavLink } from 'react-router-dom'
import { useTranslator } from '../../hooks/useTranslator'
import { CiSearch } from 'react-icons/ci'
import LanguageSwitcher from '../LanguageSwitcher'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchResults, setSearchText } from '../../redux/features/template.slice'
import { validateToken } from '../../helpers'
import { Box, Divider } from '@mui/material'
import CustomDrawer from '../Drawer'
import { useGetTemplatesQuery } from '../../service/api/template.api'
import { RootState } from '../../redux'
import ModeSwitcher from '../ModeSwitcher'

const Navbar = () => {
  const { t } = useTranslator('auth')
  const { t: dashboard } = useTranslator('dashboard')
  const dispatch = useDispatch()
  const [search, setSearch] = useState('')
  const { token } = useSelector((state: RootState) => state.users)
  const { data } = useGetTemplatesQuery({ search })

  const isValidUser = useMemo(() => {
    if (token) return validateToken(token)
    return false
  }, [token])

  useEffect(() => {
    dispatch(setSearchResults(data))
  }, [data])

  useEffect(() => {
    dispatch(setSearchText(search))
  }, [search])

  return (
    <nav className="mb-6">
      <Box className="max-w-7xl mx-auto">
        <Box className="flex justify-between items-center h-16">
          <NavLink to="/" className="flex items-center p-8">
            <Box className="font-sans text-[28px] tracking-wider text-cyan-400 dark:text-cyan-300 relative py-3">
              <span className="font-bold mr-px">F</span>
              <span className="font-light">ORMIX</span>
              <Box className="absolute bottom-0 left-0 w-6 h-1 bg-gradient-to-r from-cyan-300 to-cyan-400 dark:from-cyan-400 dark:to-cyan-500" />
            </Box>
          </NavLink>

          <Box>
            <Box className="flex gap-1 items-center bg-[#f1f3f4] dark:bg-gray-700 rounded-3xl px-3">
              <CiSearch className="text-[20px] dark:text-gray-200" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-[600px] h-[45px] outline-none bg-transparent text-gray-700 dark:text-red placeholder-gray-500 dark:placeholder-gray-400"
                placeholder={dashboard('search')}
              />
            </Box>
          </Box>

          <Box className="flex gap-2 items-center">
            {isValidUser ? (
              <CustomDrawer />
            ) : (
              <Box>
                <NavLink
                  to="auth/register"
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-md text-md font-medium transition-colors duration-200 ${
                      isActive
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'text-gray-700 dark:text-gray-200 hover:text-[#47aed6] hover:bg-blue-50 dark:hover:bg-gray-800'
                    }`
                  }
                >
                  {t('register')}
                </NavLink>
                <NavLink
                  to="auth/login"
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-md text-md font-medium transition-colors duration-200 ${
                      isActive
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'text-gray-700 dark:text-gray-200 hover:text-[#47aed6] hover:bg-blue-50 dark:hover:bg-gray-800'
                    }`
                  }
                >
                  {t('login')}
                </NavLink>
              </Box>
            )}
            <LanguageSwitcher />
            <ModeSwitcher />
          </Box>
        </Box>
      </Box>
      <Divider/>
    </nav>
  )
}

export default Navbar
