import { NavLink } from "react-router-dom"

const Navbar = () => {
  return (
    <nav>
        <NavLink to={'auth/register'}>Register</NavLink>
        <NavLink to={'auth/login'}>Login</NavLink>
    </nav>
  )
}

export default Navbar