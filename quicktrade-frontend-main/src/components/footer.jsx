// src/components/footer.jsx
import { BiHome, BiMoviePlay, BiUser } from "react-icons/bi";
import { GiShoppingCart } from "react-icons/gi";
import { MdConfirmationNumber } from "react-icons/md";
import { NavLink } from "react-router";
import { useContext } from "react";
import { cartContext } from "../context/cartContext";

const Footer = () => {
  const { cartCount, ticketCount } = useContext(cartContext);

  return (
    <footer className="bg-neutral-900/90 w-[92vw] fixed bottom-5 translate-x-1/2 right-1/2 flex justify-between items-center px-5 py-3 rounded-full z-20">
      {/* Home */}
      <NavLink
        to={`/`}
        className={({ isActive }) => (isActive ? "text-orange-600" : "text-white")}
      >
        <BiHome className="text-2xl" />
      </NavLink>

      {/* Cart */}
      <NavLink
        to={`/cart`}
        className={({ isActive }) =>
          isActive ? "text-orange-600 relative" : "text-white relative"
        }
      >
        <GiShoppingCart className="text-3xl" />
        {cartCount > 0 && (
          <span className="bg-red-600 text-white text-[10px] w-4 h-4 rounded-full absolute -top-1 -right-1 flex items-center justify-center">
            {cartCount > 9 ? "9+" : cartCount}
          </span>
        )}
      </NavLink>

      {/* Videos / Social */}
      <NavLink
        to={`/videos`}
        className={({ isActive }) => (isActive ? "text-orange-600" : "text-white")}
      >
        <BiMoviePlay className="text-2xl" />
      </NavLink>

      {/* Tickets */}
      <NavLink
        to={`/tickets`}
        className={({ isActive }) =>
          isActive ? "text-orange-600 relative" : "text-white relative"
        }
      >
        <MdConfirmationNumber className="text-2xl" />
        {ticketCount > 0 && (
          <span className="bg-orange-600 text-white text-[10px] w-4 h-4 rounded-full absolute -top-1 -right-1 flex items-center justify-center">
            {ticketCount > 9 ? "9+" : ticketCount}
          </span>
        )}
      </NavLink>

      {/* Profile */}
      <NavLink
        to={`/account`}
        className={({ isActive }) => (isActive ? "text-orange-600" : "text-white")}
      >
        <BiUser className="text-2xl" />
      </NavLink>
    </footer>
  );
};

export default Footer;