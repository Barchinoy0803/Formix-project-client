import { ReactNode, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { RootState } from './redux'

interface Props {
  children: ReactNode
}

const AppThemeProvider = ({ children }: Props) => {
  const isDarkMode = useSelector((s: RootState) => s.users.isDarkMode)
  const theme = useMemo(
    () => createTheme({ palette: { mode: isDarkMode ? 'dark' : 'light' } }),
    [isDarkMode],
  )
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

export default AppThemeProvider
