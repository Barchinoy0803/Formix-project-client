import { NavLink } from "react-router-dom"
import { useTranslator } from "../../hooks/useTranslator"

const Navbar = () => {
  const { t } = useTranslator('auth')
  return (
    <nav>
        <NavLink to={'auth/register'}>{t('register')}</NavLink>
        <NavLink to={'auth/login'}>{t('login')}</NavLink>
    </nav>
  )
}

export default Navbar