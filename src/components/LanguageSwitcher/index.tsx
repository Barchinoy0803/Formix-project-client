import { FormControl, Select, MenuItem } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { setLanguage } from '../../redux/features/user.slice'
import { languages } from '../../constants'
import { memo } from 'react'

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()
  const dispatch = useDispatch()
  const currentLang = i18n.language

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
    dispatch(setLanguage(lng))
  }

  return (
    <FormControl size="small" sx={{ minWidth: 100 }}>
      <Select
        value={currentLang}
        onChange={(e) => changeLanguage(e.target.value as string)}
        aria-label="language selector"
      >
        {languages.map(({ code, label }) => (
          <MenuItem key={code} value={code}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default memo(LanguageSwitcher)
