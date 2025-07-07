import { IconButton } from '@mui/material'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux'
import { setDarkMode } from '../../redux/features/user.slice'

const ModeSwitcher = () => {
  const dispatch = useDispatch()
  const isDarkMode = useSelector((s: RootState) => s.users.isDarkMode)

 useEffect(() => {
  const root = document.documentElement
  root.classList.toggle('dark', isDarkMode)
  root.dataset.theme = isDarkMode ? 'dark' : 'light'
}, [isDarkMode])


  const toggleMode = () => {
    dispatch(setDarkMode(!isDarkMode))
  }

  return (
    <IconButton onClick={toggleMode}>
      {isDarkMode ? (
        <LightModeIcon fontSize="medium" color="warning"/>
      ) : (
        <DarkModeIcon fontSize="medium" color="info"/>
      )}
    </IconButton>
  )
}

export default memo(ModeSwitcher)
