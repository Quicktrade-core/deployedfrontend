import { useContext } from "react"
import { NavLink } from "react-router"
import { cartContext } from "../context/cartContext"
import { BiBell, BiSearch } from "react-icons/bi"
import logo from "/logo.png"

const Header = () => {
  const { cartItems } = useContext(cartContext)

  return (
    <header className="bg-white flex flex-col justify-center gap-3 px-4 h-[15vh] sticky top-0 z-10 dark:bg-neutral-900 dark:text-white">
      <div className="flex justify-between items-center relative">
        <NavLink to={`/`} className="flex items-center">
          <img src={logo} alt="" className="w-7 h-7 object-cover" />
          <span className="text-lg font-bold">QuickTrade</span>
        </NavLink>
        <NavLink to={`/notifications`}>
          <BiBell className="text-2xl" />
          <span className="bg-red-600 w-3 h-3 rounded-full absolute top-0 right-0"></span>
        </NavLink>
      </div>
      <div className="relative">
        <BiSearch className="absolute top-2 left-3 text-lg" />
        <input type="search" name="search" placeholder="search here" className="border border-neutral-300 outline-none rounded-xl ps-9 pe-2 py-1 w-full" />
      </div>
    </header>
  )
}

export default Header