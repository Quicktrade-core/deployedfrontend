import { BiInfoCircle } from "react-icons/bi"
import { FaAngleLeft, FaArrowLeft } from "react-icons/fa"
import { Link, useNavigate } from "react-router"
import Scrolltotop from "../components/scrolltotop"

const NotificationsPage = () => {
  const navigate = useNavigate()

  const notifications = [
    { id: `1`, time: `30m`, title: `Your order has arrived`, content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde eligendi soluta nisi rerum voluptates harum odit facilis qui enim quae.` },
    { id: `2`, time: `4h`, title: `Payment verified`, content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde eligendi soluta nisi rerum voluptates harum odit facilis qui enim quae.` },
    { id: `3`, time: `1d`, title: `New promo just for you`, content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde eligendi soluta nisi rerum voluptates harum odit facilis qui enim quae.` },
    { id: `4`, time: `1d`, title: `Check out products near you`, content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde eligendi soluta nisi rerum voluptates harum odit facilis qui enim quae.` },
    { id: `5`, time: `2d`, title: `A new product just arrived`, content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde eligendi soluta nisi rerum voluptates harum odit facilis qui enim quae.` },
    { id: `6`, time: `2d`, title: `People are buying these products`, content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde eligendi soluta nisi rerum voluptates harum odit facilis qui enim quae.` }
  ]

  return (
    <main className="bg-neutral-200 min-h-screen dark:bg-neutral-900 dark:text-white">
      <Scrolltotop />
      <button onClick={() => { navigate(-1) }} className="fixed top-5 left-5 z-20 cursor-pointer">
        <FaArrowLeft className="text-xl" />
      </button>
      <div className="bg-white sticky top-0 flex justify-center py-4 dark:bg-neutral-800">
        <span className="text-xl font-bold">Notifications</span>
      </div>
      <div className="flex flex-col gap-5 px-4 py-10">
        {notifications.map(notification => (
          <div key={notification.id} className="bg-white flex flex-col gap-3 p-3 rounded-xl dark:bg-neutral-800">
            <div className="flex justify-between items-center">
              <p className="font-bold flex items-center gap-3">
                <BiInfoCircle className="text-orange-600 text-lg" />
                {notification.title}
              </p>
              <span className="font-semibold">{notification.time}</span>
            </div>
            <p className="leading-tight">{notification.content}</p>
          </div>
        ))}
      </div>
    </main>
  )
}

export default NotificationsPage