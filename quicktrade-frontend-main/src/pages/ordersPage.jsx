import { MdLogout, MdPerson, MdSecurity, MdSettings } from "react-icons/md"
import { BiBell, BiBox, BiCreditCard, BiInfoCircle } from "react-icons/bi"
import { FaAngleRight, FaArrowLeft, FaEye } from "react-icons/fa"
import { Link, useNavigate } from "react-router"
import { useState } from "react"
import image from "../assets/profile_image.png"
import Scrolltotop from "../components/scrolltotop"

const OrdersPage = () => {
  const navigate = useNavigate()
  const [status, setStatus] = useState(`All`)

  const orders = [
    { id: `1`, orderId: `#100100`, date: `2 Feb 2026, 10:27 AM`, amount: `$245.92`, status: `Processing` },
    { id: `2`, orderId: `#100130`, date: `3 June 2026, 8:48 AM`, amount: `$120.95`, status: `Cancelled` },
    { id: `3`, orderId: `#100140`, date: `9 Aug 2026, 4:16 PM`, amount: `$212.49`, status: `Cancelled` },
    { id: `4`, orderId: `#100150`, date: `20 Aug 2026, 9:10 AM`, amount: `$88.62`, status: `Delivered` },
    { id: `5`, orderId: `#100160`, date: `2 Feb 2026, 10:27 AM`, amount: `$245.92`, status: `Delivered` },
    { id: `6`, orderId: `#100170`, date: `28 Feb 2026, 6:02 PM`, amount: `$165.25`, status: `Delivered` },
  ]

  const toggle = [
    { id: `1`, title: `All`, status: `All` },
    { id: `2`, title: `Active`, status: `Processing` },
    { id: `3`, title: `Delivered`, status: `Delivered` },
    { id: `4`, title: `Cancelled`, status: `Cancelled` }
  ]

  const statusStyle = {
    Processing: `bg-orange-200 text-orange-500`,
    Delivered: `bg-green-200 text-green-500`,
    Cancelled: `bg-red-200 text-red-500`
  }

  const filteredOrders = status === `All` ? orders : orders.filter(order => order.status === status)

  return (
    <main className="bg-neutral-200 min-h-screen dark:bg-neutral-900 dark:text-white">
      <Scrolltotop />
      <button onClick={() => { navigate(-1) }} className="fixed top-5 left-5 z-20 cursor-pointer">
        <FaArrowLeft className="text-xl" />
      </button>
      <div className="bg-white sticky top-0 flex flex-col gap-5 p-4 z-10 dark:bg-neutral-800">
        <div className="flex justify-center">
          <span className="text-xl font-bold">My Orders</span>
        </div>
        <div className="flex gap-5">
          {toggle.map(item => (
            <button key={item.id} onClick={() => { setStatus(item.status) }} className={`w-1/4 pb-2 cursor-pointer ${item.status === status && 'border-b border-b-orange-600'}`}>{item.title}</button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-5 px-4 py-10">
        {filteredOrders.map(order => (
          <div key={order.id} className="bg-white flex flex-col gap-3 p-3 rounded-xl dark:bg-neutral-800">
            <div className="flex justify-between items-center">
              <p className="font-bold flex items-center gap-3">Order ID {order.orderId}</p>
              <Link to={`/order/${order.id}`} className="bg-neutral-200 flex items-center gap-2 px-2 py-1 rounded-lg dark:bg-white dark:text-neutral-900">
                <FaEye className="text-xl" />
                <span className="font-semibold">View</span>
              </Link>
            </div>
            <div className="flex justify-between items-end">
              <div className="">
                <p>{order.amount}</p>
                <p>{order.date}</p>
              </div>
              <span className={`${statusStyle[order.status]} px-2`}>{order.status}</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

export default OrdersPage