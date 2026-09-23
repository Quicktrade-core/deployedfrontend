import { Link, useNavigate } from "react-router"
import Scrolltotop from "../components/scrolltotop"
import { FaAngleLeft, FaAngleRight, FaArrowLeft } from "react-icons/fa"
import { PiPassword } from "react-icons/pi"
import { BiChat, BiUpload } from "react-icons/bi"
import { TbLockPassword, TbUpload } from "react-icons/tb"
import { BsChat } from "react-icons/bs"

const SecurityPage = () => {
  const navigate = useNavigate()
  const style = `bg-white flex justify-between items-center p-3 dark:bg-neutral-800`
  const topStyle = `bg-white flex justify-between items-center p-3 rounded-t-xl dark:bg-neutral-800`
  const bottomStyle = `bg-white flex justify-between items-center p-3 rounded-b-xl dark:bg-neutral-800`

  const routes = [
    { id: 1, title: `Change 4-digit PIN`, path: `/login`, icon: <TbLockPassword className="text-xl" /> },
    { id: 2, title: `File reports / upload proof`, path: `/login`, icon: <TbUpload className="text-xl" /> },
    { id: 3, title: `Chat with SecOps`, path: `/login`, icon: <BsChat className="text-xl" /> }
  ]

  return (
    <main className="bg-white min-h-screen dark:bg-neutral-900 dark:text-white">
      <Scrolltotop />
      <button onClick={() => { navigate(-1) }} className="fixed top-5 left-5 z-20 cursor-pointer">
        <FaArrowLeft className="text-xl" />
      </button>
      <div className="bg-white sticky top-0 flex justify-center py-4 z-10 dark:bg-neutral-800">
        <span className="text-lg font-bold">Security & Support</span>
      </div>
      <div className="bg-neutral-200 py-10 px-4 rounded-xl h-screen dark:bg-neutral-900">
        {routes.map(route => (
          <Link key={route.id} to={route.path} className={route.id === 1 ? topStyle : route.id === 3 ? bottomStyle : style}>
            <div className="flex items-center gap-3">
              {route.icon}
              {route.title}
            </div>
            <FaAngleRight className="text-lg" />
          </Link>
        ))}
      </div>
    </main>
  )
}

export default SecurityPage