// src/components/footer.jsx
import { BiHome, BiMoviePlay, BiUser } from "react-icons/bi"
import { GiShoppingCart } from "react-icons/gi"
import { NavLink } from "react-router"
import { useContext } from "react"
import { cartContext } from "../context/cartContext"

const Footer = () => {
  const { cartCount } = useContext(cartContext)

  return (
    <footer className="bg-neutral-900/90 w-[90vw] fixed bottom-5 translate-x-1/2 right-1/2 flex justify-between items-center px-6 py-3 rounded-full z-10">
      <NavLink to={`/`} className={({ isActive }) => `text-white ${isActive && 'text-orange-600'}`}>
        <BiHome className="text-2xl" />
      </NavLink>
      <NavLink to={`/cart`} className={({ isActive }) => `text-white relative ${isActive && 'text-orange-600'}`}>
        <GiShoppingCart className="text-3xl" />
        {cartCount > 0 && (
          <span className="bg-red-600 text-white text-[10px] w-4 h-4 rounded-full absolute -top-1 -right-1 flex items-center justify-center">
            {cartCount > 9 ? "9+" : cartCount}
          </span>
        )}
      </NavLink>
      <NavLink to={`/videos`} className={({ isActive }) => `text-white ${isActive && 'text-orange-600'}`}>
        <BiMoviePlay className="text-2xl" />
      </NavLink>
      <NavLink to={`/account`} className={({ isActive }) => `text-white ${isActive && 'text-orange-600'}`}>
        <BiUser className="text-2xl" />
      </NavLink>
    </footer>
  )
}

export default Footer