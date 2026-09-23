import { Link, useNavigate } from "react-router"
import Scrolltotop from "../components/scrolltotop"
import { FaAngleLeft, FaAngleRight, FaArrowLeft, FaMoon } from "react-icons/fa"
import { BsToggleOff, BsToggleOn } from "react-icons/bs"
import { useContext, useState } from "react"
import { MdDelete, MdPrivacyTip } from "react-icons/md"
import { GrSystem } from "react-icons/gr"
import { themeContext } from "../context/themeContext"

const SettingsPage = () => {
  const navigate = useNavigate()
  const  { darkMode, toggleDarkMode } = useContext(themeContext)

  const routes = [
    { id: 1, title: `App version / privacy`, path: `/login`, icon: <MdPrivacyTip className="text-lg" /> },
    { id: 2, title: `Delete account`, path: `/login`, icon: <MdDelete className="text-xl text-red-600" /> }
  ]

  return (
    <main className="bg-white min-h-screen dark:bg-neutral-900 dark:text-white">
      <Scrolltotop />
      <button onClick={() => { navigate(-1) }} className="fixed top-5 left-5 z-20 cursor-pointer">
        <FaArrowLeft className="text-xl" />
      </button>
      <div className="bg-white sticky top-0 flex justify-center py-4 z-10 dark:bg-neutral-800">
        <span className="text-lg font-bold">System Settings</span>
      </div>
      <div className="bg-neutral-200 py-10 px-4 h-screen dark:bg-neutral-900">
        <div className="bg-white flex justify-between items-center p-3 rounded-t-xl dark:bg-neutral-800">
          <div className="flex items-center gap-3">
           <FaMoon className="text-lg" />
           <span>Dark mode</span>
          </div>
          <button onClick={toggleDarkMode} className="cursor-pointer">
            { darkMode ? <BsToggleOn className="text-xl" /> : <BsToggleOff className="text-xl" /> }
          </button>
        </div>
        {routes.map(route => (
          <Link key={route.id} to={route.path} className={`bg-white flex justify-between items-center p-3 dark:bg-neutral-800 ${route.id === 2 && 'rounded-b-xl'}`}>
            <div className="flex items-center gap-3">
              {route.icon}
              <span className={route.id === 2 && `text-red-600`}>{route.title}</span>
            </div>
            <FaAngleRight className={`${route.id === 2 ? 'text-red-600 text-lg' : 'text-lg'}`} />
          </Link>
        ))}
      </div>
    </main>
  )
}

export default SettingsPage