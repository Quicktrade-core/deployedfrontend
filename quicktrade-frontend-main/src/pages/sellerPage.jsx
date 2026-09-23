import { Link, NavLink, Outlet, useNavigate } from "react-router"
import Scrolltotop from "../components/scrolltotop"
import { FaAngleLeft, FaArrowLeft, FaEye, FaStar } from "react-icons/fa"
import { MdPerson, MdVerified } from "react-icons/md"
import { BsChat } from "react-icons/bs"
import image from "../assets/profile_image.png"
import { useState } from "react"
import { product_list, video_list } from "../assets/assets"
import Products from "../components/products"
import Reels from "../components/reels"
import Stores from "../components/stores"

const SellerPage = () => {
  const navigate = useNavigate()
  const [id, setId] = useState(1)
  const [following, setFollowing] = useState(false)

  const routes = [
    { id: 1, title: `Products`, path: `/seller` },
    { id: 2, title: `Reels`, path: `reels` },
    { id: 3, title: `Stores`, path: `stores` }
  ]

  const data = [
    { id: 1, title: `Posts`, value: 86 },
    { id: 2, title: `Followers`, value: 320 },
    { id: 3, title: `Following`, value: 64 }
  ]

  return (
    <main className="bg-white min-h-screen dark:bg-neutral-900 dark:text-white">
      <Scrolltotop />
      <button onClick={() => { navigate(-1) }} className="fixed top-5 left-5 z-20 cursor-pointer">
        <FaArrowLeft className="text-xl" />
      </button>
      <div className="bg-white sticky top-0 flex justify-center items-center h-[10vh] z-10 dark:bg-neutral-800">
        <span className="text-lg font-bold">Seller's Profile</span>
      </div>
      <div className="flex flex-col items-center gap-5 py-5">
        <div className="flex flex-col items-center">
          <img src={image} alt="" className="w-25" />
          <p className="text-xl font-bold">Jenny Wilson</p>
          <p className="flex items-center gap-2">High ranking seller <MdVerified className="text-blue-400 text-lg" /></p>
        </div>
        <div className="flex gap-10">
          {data.map(info => (
            <p key={info.id} className="flex flex-col items-center leading-tight">
              <span>{info.value}</span>
              <span>{info.title}</span>
            </p>
          ))}
        </div>
        <div className="flex justify-center items-center gap-5 w-full">
          <button onClick={() => { setFollowing(previous => !previous) }} className={`${following ? 'bg-neutral-800' : 'bg-gradient-to-r from-orange-600 to-orange-400'} text-white w-2/5 flex justify-center items-center gap-2 px-4 py-1 rounded-full cursor-pointer`}>
            <MdPerson className="text-2xl" /> { following ? `Following` : `Follow` }
          </button>
          <button className="bg-white text-neutral-900 border border-neutral-800 w-2/5 flex justify-center items-center gap-2 px-4 py-1 rounded-full cursor-pointer dark:border-none">
            <BsChat className="text-xl" /> Message
          </button>
        </div>
      </div>
      <div className="bg-neutral-200 dark:bg-neutral-900">
        <div className="bg-white sticky top-[10vh] flex justify-between items-center gap-4 px-4 z-10 dark:bg-neutral-900">
          {routes.map(route => (
            <NavLink key={route.id} to={route.path} end className={({ isActive }) => `w-1/3 py-4 text-center ${isActive && 'border-b-2 border-b-orange-400'}`}>{route.title}</NavLink>
          ))}
        </div>
        <Outlet />
      </div>
    </main>
  )
}

export default SellerPage